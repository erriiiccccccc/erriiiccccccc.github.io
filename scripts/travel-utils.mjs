import { createRequire } from 'module'
import { feature } from 'topojson-client'

const require = createRequire(import.meta.url)

// world-atlas: simplified country polygons (110m scale = fast, accurate enough)
const topology      = require('world-atlas/countries-50m.json')
const worldCountries = require('world-countries')

// Build GeoJSON feature list
const GEO_FEATURES = feature(topology, topology.objects.countries).features

// Build numeric ISO 3166-1 → English name map, and a name → full record map.
// countriesList names come straight out of NAME_MAP, so every name is guaranteed
// to resolve back through BY_NAME — no manual lookup tables needed anymore.
const NAME_MAP = {}
const BY_NAME  = {}
for (const c of worldCountries) {
  if (c.ccn3) NAME_MAP[parseInt(c.ccn3)] = c.name.common
  BY_NAME[c.name.common] = c
}

// world-countries `region` collapses the Americas into one bucket; split it back
// out so the "continents / of 7" stat uses the 7-continent model.
function continentOf(region, subregion) {
  if (region === 'Americas')  return /south/i.test(subregion || '') ? 'South America' : 'North America'
  if (region === 'Antarctic') return 'Antarctica'
  return region || 'Other' // Europe, Asia, Africa, Oceania
}

// Per-country metadata derived entirely from world-countries: ISO alpha-2 (the
// client loads flags on the fly from flagcdn.com/<iso>.svg), continent, and
// centroid lat/lng (for furthest-flung).
function metaFor(name) {
  const c = BY_NAME[name]
  if (!c) return { name, iso: null, continent: 'Other', latlng: null }
  return {
    name,
    iso:       (c.cca2 || '').toLowerCase() || null,
    continent: continentOf(c.region, c.subregion),
    latlng:    Array.isArray(c.latlng) ? c.latlng : null,
  }
}

// ── Point-in-polygon (ray casting) ───────────────────────────────────────────
function pointInRing(x, y, ring) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      inside = !inside
  }
  return inside
}

function pointInPolygon(x, y, coords) {
  // coords[0] = outer ring, coords[1+] = holes
  if (!pointInRing(x, y, coords[0])) return false
  for (let i = 1; i < coords.length; i++)
    if (pointInRing(x, y, coords[i])) return false
  return true
}

function findCountry(lat, lon) {
  for (const feat of GEO_FEATURES) {
    const g = feat.geometry
    if (!g) continue
    const hit = g.type === 'Polygon'
      ? pointInPolygon(lon, lat, g.coordinates)
      : g.type === 'MultiPolygon'
        ? g.coordinates.some(p => pointInPolygon(lon, lat, p))
        : false
    if (hit) return NAME_MAP[parseInt(feat.id)] || null
  }
  return null // ocean / unmapped territory
}

// ── KML fetch + parse ─────────────────────────────────────────────────────────
const MAP_ID  = '1Jqq0FtlUJEB3a12Xt-tvC5XGCQ9Qqf8'
const KML_URL = `https://www.google.com/maps/d/u/0/kml?mid=${MAP_ID}&forcekml=1`

async function fetchKML() {
  const r = await fetch(KML_URL)
  if (!r.ok) throw new Error(`KML fetch failed: ${r.status}`)
  return r.text()
}

function parsePoints(kmlText) {
  const points = []
  const re = /<coordinates>\s*([-\d.]+),([-\d.]+),?[\d.]*\s*<\/coordinates>/g
  for (const m of kmlText.matchAll(re)) {
    const lon = parseFloat(m[1]), lat = parseFloat(m[2])
    if (!isNaN(lat) && !isNaN(lon)) points.push({ lat, lon })
  }
  return points
}

// ── Main export ───────────────────────────────────────────────────────────────
// Pure data scrape — no filesystem writes, so it runs identically at build time,
// in the dev middleware, and on Vercel's read-only serverless filesystem.
export async function fetchTravelStats() {
  const logs = []
  const log  = msg => { console.log(msg); logs.push(msg) }

  log('Fetching KML...')
  const kmlText = await fetchKML()
  const points  = parsePoints(kmlText)
  log(`Found ${points.length} placemarks — running point-in-polygon...`)

  const countries = new Set()
  for (const { lat, lon } of points) {
    const name = findCountry(lat, lon)
    if (name) countries.add(name)
  }

  const countriesList = [...countries].sort()
  log(`Countries (${countriesList.length}): ${countriesList.join(', ')}`)

  // Derive iso / continent / lat-lng for each country.
  const countryData = countriesList.map(metaFor)

  return {
    countries:     countriesList.length || null,
    countriesList,
    countryData,
    landmarks:     points.length || null,
    worldPct:      countriesList.length ? Math.round(countriesList.length / 195 * 100) : null,
    updatedAt:     new Date().toISOString(),
    logs,
  }
}

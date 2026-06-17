// Travel-stats panel logic + markup.
// Split layout: a big map on the left that stretches to match the right column,
// and on the right an action row (reload + last-updated), a grid of aligned
// stat boxes, and a wall of full-bleed flag chips for every country visited.
//
// The scrape pipeline only gives us countries / placemarks / worldPct. Everything
// else interesting (continents, New 7 Wonders, furthest-flung) is derived here
// client-side from small lookup tables, so the JSON stays untouched.
//
// In DEV the refresh button hits a Vite middleware that re-runs KML scraping.
// In PROD the JSON is generated at build time (daily cron) and served static —
// there is no live endpoint, so refresh just re-reads the same file.
import { svgIcon } from '../ui/icons.js'

const BASE = import.meta.env.BASE_URL || '/'
const IS_DEV = import.meta.env.DEV
const MAP_EMBED = 'https://www.google.com/maps/d/u/0/embed?mid=1Jqq0FtlUJEB3a12Xt-tvC5XGCQ9Qqf8&ehbc=2E312F'

// name → continent, for deriving the continents stat.
const COUNTRY_CONTINENT = {
  'China': 'Asia',        'Denmark': 'Europe',
  'France': 'Europe',     'Germany': 'Europe',
  'Hong Kong': 'Asia',    'Hungary': 'Europe',
  'Iceland': 'Europe',    'Ireland': 'Europe',
  'Italy': 'Europe',      'Latvia': 'Europe',
  'Malaysia': 'Asia',     'Malta': 'Europe',
  'Morocco': 'Africa',    'Portugal': 'Europe',
  'Singapore': 'Asia',    'Spain': 'Europe',
  'Sweden': 'Europe',     'Switzerland': 'Europe',
  'Thailand': 'Asia',     'Türkiye': 'Asia',
  'Turkey': 'Asia',       'United Kingdom': 'Europe',
  'Netherlands': 'Europe', 'Belgium': 'Europe',
  'Austria': 'Europe',    'Greece': 'Europe',
  'Norway': 'Europe',     'Finland': 'Europe',
  'Japan': 'Asia',        'United States': 'North America',
}
const continentOf = (name) => COUNTRY_CONTINENT[name] || 'Other'

// name → ISO-3166-1 alpha-2, for the flag SVGs vendored in public/flags/<iso>.svg
const COUNTRY_ISO = {
  'China': 'cn',          'Denmark': 'dk',
  'France': 'fr',         'Germany': 'de',
  'Hong Kong': 'hk',      'Hungary': 'hu',
  'Iceland': 'is',        'Ireland': 'ie',
  'Italy': 'it',          'Latvia': 'lv',
  'Malaysia': 'my',       'Malta': 'mt',
  'Morocco': 'ma',        'Portugal': 'pt',
  'Singapore': 'sg',      'Spain': 'es',
  'Sweden': 'se',         'Switzerland': 'ch',
  'Thailand': 'th',       'Türkiye': 'tr',
  'Turkey': 'tr',         'United Kingdom': 'gb',
  'Netherlands': 'nl',    'Belgium': 'be',
  'Austria': 'at',        'Greece': 'gr',
  'Norway': 'no',         'Finland': 'fi',
  'Japan': 'jp',          'United States': 'us',
}

// Rough centroids (lat, lng) for the furthest-flung calc. Home is Malaysia.
const COUNTRY_LATLNG = {
  'China': [35.0, 103.0],     'Denmark': [56.0, 10.0],
  'France': [46.6, 2.2],      'Germany': [51.0, 9.0],
  'Hong Kong': [22.3, 114.2], 'Hungary': [47.2, 19.5],
  'Iceland': [64.9, -19.0],   'Ireland': [53.4, -8.0],
  'Italy': [41.9, 12.6],      'Latvia': [56.9, 24.6],
  'Malaysia': [4.2, 101.9],   'Malta': [35.9, 14.4],
  'Morocco': [31.8, -7.0],    'Portugal': [39.5, -8.0],
  'Singapore': [1.35, 103.8], 'Spain': [40.2, -3.6],
  'Sweden': [62.0, 15.0],     'Switzerland': [46.8, 8.2],
  'Thailand': [15.0, 101.0],  'Türkiye': [39.0, 35.0],
  'Turkey': [39.0, 35.0],     'United Kingdom': [54.0, -2.0],
  'Netherlands': [52.2, 5.3], 'Belgium': [50.6, 4.6],
  'Austria': [47.6, 14.1],    'Greece': [39.0, 22.0],
  'Norway': [64.5, 12.0],     'Finland': [64.0, 26.0],
  'Japan': [36.2, 138.2],     'United States': [39.8, -98.6],
}
const HOME = 'Malaysia'

// New 7 Wonders of the World — flip `seen` to true as Eric ticks them off.
const WONDERS = [
  { name: 'Great Wall of China',  seen: false },
  { name: 'Petra',                seen: false },
  { name: 'Christ the Redeemer',  seen: false },
  { name: 'Machu Picchu',         seen: false },
  { name: 'Chichén Itzá',         seen: false },
  { name: 'Colosseum',            seen: false },
  { name: 'Taj Mahal',            seen: false },
]

// Great-circle distance (km) between two [lat,lng] points.
function haversineKm(a, b) {
  const R = 6371
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(b[0] - a[0])
  const dLng = toRad(b[1] - a[1])
  const lat1 = toRad(a[0])
  const lat2 = toRad(b[0])
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

// Furthest visited country from home → { name, km } | null
function furthestFrom(list) {
  const home = COUNTRY_LATLNG[HOME]
  if (!home) return null
  let best = null
  for (const name of list) {
    if (name === HOME) continue
    const ll = COUNTRY_LATLNG[name]
    if (!ll) continue
    const km = haversineKm(home, ll)
    if (!best || km > best.km) best = { name, km }
  }
  return best
}

let _inFlight = null

function q(id) { return document.getElementById(id) }

export const TRAVEL_HTML = `
  <div class="travel-split">
    <div class="travel-map-col">
      <!-- Click-to-load Google Maps embed — avoids loading Google's tracking
           iframe on panel open; user opts in explicitly. -->
      <div id="tp-map-slot">
        <div class="tp-map-consent">
          <span>Show Eric's travel map?<br>
            <small>Loads an embed from Google Maps which may set cookies.</small>
          </span>
          <button id="tp-map-load" type="button">Load map</button>
        </div>
      </div>
    </div>

    <div class="travel-info-col">
      <!-- TEST: photo overlay card. To remove, delete this figure + the
           .tp-photo* rules in overlay.css. -->
      <figure class="tp-photo" style="background-image:url('${BASE}islandphoto/pirateislandphoto.jpeg')">
        <figcaption class="tp-photo-cap">
          <span class="tp-photo-eyebrow">From the log</span>
          <span class="tp-photo-line">Reeled one in off the coast</span>
        </figcaption>
      </figure>

      <div class="tp-actions">
        <button id="travel-refresh" class="tp-btn" type="button">${svgIcon('compass', 14)} Reload</button>
        <span id="travel-status" class="tp-status" aria-live="polite">Loading…</span>
      </div>

      <div class="tp-stats" id="tp-stats"></div>

      <div class="tp-cloud-head">
        <span class="tp-cloud-title">Countries visited</span>
        <span class="tp-cloud-count" id="tp-cloud-count">–</span>
      </div>
      <div class="tp-flags" id="tp-flags" aria-label="Countries visited"></div>
    </div>
  </div>
`

function statBox({ label, value, sub, link }) {
  if (link) {
    return `
      <button type="button" class="tp-box tp-box--link" data-scroll="flags" aria-label="Jump to the countries visited">
        <p class="tp-label">${label}</p>
        <p class="tp-value">${value ?? '–'}</p>
        <p class="tp-sub">${sub ?? ''} ${svgIcon('arrowRight', 11)}</p>
      </button>`
  }
  return `
    <div class="tp-box">
      <p class="tp-label">${label}</p>
      <p class="tp-value">${value ?? '–'}</p>
      <p class="tp-sub">${sub ?? ''}</p>
    </div>`
}

function renderStats(stats) {
  const list = stats.countriesList || []
  const continents = list.length ? new Set(list.map(continentOf)).size : null
  const wonders = WONDERS.filter(w => w.seen).length
  const furthest = list.length ? furthestFrom(list) : null

  const boxes = [
    { label: 'Countries',     value: stats.countries ?? (list.length || '–'), sub: 'visited', link: true },
    { label: 'Continents',    value: continents ?? '–',                       sub: 'of 7' },
    { label: 'Places pinned', value: stats.landmarks != null ? stats.landmarks.toLocaleString('en-GB') : '–', sub: 'on the map' },
    { label: '% of world',    value: stats.worldPct != null ? `${stats.worldPct}%` : '–', sub: 'explored' },
    { label: 'New 7 Wonders', value: `${wonders}/7`,                          sub: 'seen' },
    { label: 'Furthest flung', value: furthest ? furthest.name : '–',
      sub: furthest ? `${(Math.round(furthest.km / 10) * 10).toLocaleString('en-GB')} km from home` : '' },
  ]

  const grid = q('tp-stats')
  if (grid) grid.innerHTML = boxes.map(statBox).join('')

  renderFlags(list)

  const status = q('travel-status')
  if (status) {
    if (stats.error) {
      status.textContent = `Error: ${stats.error}`
    } else if (stats.updatedAt) {
      const dt = new Date(stats.updatedAt)
      const formatted = isNaN(dt.getTime())
        ? stats.updatedAt
        : dt.toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false,
          })
      status.textContent = `Updated ${formatted}`
    } else {
      status.textContent = 'No data yet'
    }
  }
}

function renderFlags(list) {
  const wall  = q('tp-flags')
  const count = q('tp-cloud-count')
  if (count) count.textContent = list.length || '–'
  if (!wall) return
  if (!list.length) { wall.innerHTML = ''; return }

  wall.innerHTML = list
    .slice()
    .sort((a, b) => a.localeCompare(b))
    .map(name => {
      const iso = COUNTRY_ISO[name]
      if (!iso) {
        return `<span class="tp-flag tp-flag--plain" title="${name}"><span class="tp-flag-name">${name}</span></span>`
      }
      const url = `${BASE}flags/${iso}.svg`
      return `<span class="tp-flag" title="${name}" style="background-image:url('${url}')"><span class="tp-flag-name">${name}</span></span>`
    })
    .join('')
}

function renderEmpty(message) {
  const grid = q('tp-stats')
  if (grid) {
    grid.innerHTML = [
      { label: 'Countries',     value: '–', sub: 'visited' },
      { label: 'Continents',    value: '–', sub: 'of 7' },
      { label: 'Places pinned', value: '–', sub: 'on the map' },
      { label: '% of world',    value: '–', sub: 'explored' },
      { label: 'New 7 Wonders', value: '–', sub: 'seen' },
      { label: 'Furthest flung', value: '–', sub: '' },
    ].map(statBox).join('')
  }
  const status = q('travel-status')
  if (status && message) status.textContent = message
}

async function loadStats(forceRefresh = false) {
  const status = q('travel-status')
  if (status) status.textContent = forceRefresh ? 'Refreshing…' : 'Loading…'

  if (_inFlight) _inFlight.abort()
  _inFlight = new AbortController()

  try {
    const url = (forceRefresh && IS_DEV)
      ? '/api/refresh-travel-stats'
      : `${import.meta.env.BASE_URL || './'}travel-stats.json?_=${Date.now()}`

    const r = await fetch(url, { signal: _inFlight.signal })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const stats = await r.json()
    if (stats.error) throw new Error(stats.error)
    renderStats(stats)
  } catch (err) {
    if (err.name === 'AbortError') return
    renderEmpty(`Error: ${err.message}`)
    console.error('[TravelStats]', err)
  } finally {
    _inFlight = null
  }
}

function loadMapEmbed() {
  const slot = q('tp-map-slot')
  if (!slot) return
  const iframe = document.createElement('iframe')
  iframe.src            = MAP_EMBED
  iframe.width          = '100%'
  iframe.height         = '100%'
  iframe.loading        = 'lazy'
  iframe.referrerPolicy = 'no-referrer-when-downgrade'
  iframe.title          = "Eric's travel map (Google My Maps embed)"
  iframe.style.cssText  = 'border:none;border-radius:14px;display:block;width:100%;height:100%;min-height:300px;'
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups')
  slot.replaceChildren(iframe)

  try { localStorage.setItem('phf-travel-map-loaded', '1') } catch {}
}

export function initTravelStats() {
  const mapBtn = q('tp-map-load')
  if (mapBtn) {
    mapBtn.onclick = loadMapEmbed
    try {
      if (localStorage.getItem('phf-travel-map-loaded') === '1') loadMapEmbed()
    } catch {}
  }

  // Clicking the Countries stat scrolls the right column down to the flags wall.
  const infoCol = document.querySelector('.travel-info-col')
  const stats = q('tp-stats')
  if (stats) {
    stats.addEventListener('click', (e) => {
      if (!e.target.closest('[data-scroll="flags"]')) return
      const head = document.querySelector('.tp-cloud-head')
      if (head) head.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (infoCol) infoCol.scrollTo({ top: infoCol.scrollHeight, behavior: 'smooth' })
    })
  }

  const btn = q('travel-refresh')
  if (btn) {
    if (!IS_DEV) {
      btn.title = 'Re-fetch the latest published stats. Live scraping only runs in dev / nightly build.'
    }
    btn.onclick = async () => {
      btn.disabled = true
      try { await loadStats(true) } finally { btn.disabled = false }
    }
  }

  renderEmpty()
  loadStats(false)
}

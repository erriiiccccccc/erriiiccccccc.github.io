// The Pirate Ship's Travel Log.
//
// Left: the Storybook globe (TravelGlobe.js), every visited country painted
// in its flag and every map pin glowing, with the fishing postcard tucked in
// the corner. Right: the six numbers, then every country as its own shape
// filled with its flag. Point at a country on either side and the globe
// turns to it and lights it up. Only the country list scrolls.
//
// Data flow: /api/refresh-travel-stats (Vite middleware in dev, Vercel
// serverless fn in prod) re-reads Eric's Google My Maps pins live. In prod its
// response is edge-cached (s-maxage), so it's a shared store: normal page
// loads read it too, meaning anyone's refresh becomes the data everyone sees.
// The baked travel-stats.json is the instant first paint and the fallback on
// hosts with no API (plain GitHub Pages). Each country arrives with its iso,
// continent, centre, pin count and outline, so a new country just works.
import { svgIcon } from '../ui/icons.js'

const BASE = import.meta.env.BASE_URL || '/'
const REFRESH_ENDPOINT = '/api/refresh-travel-stats'
const MAP_URL = 'https://www.google.com/maps/d/viewer?mid=1Jqq0FtlUJEB3a12Xt-tvC5XGCQ9Qqf8'

// Furthest flung is measured from where Eric grew up.
const HOME = 'Malaysia'
// Where the globe looks first: where he lives now.
const START = 'United Kingdom'

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

const REDUCE_MQ = window.matchMedia?.('(prefers-reduced-motion: reduce)')
const reduced = () => !!REDUCE_MQ?.matches || document.body.classList.contains('reduced-motion')
const esc = (s) => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]))

// Great-circle distance (km) between two [lat,lng] points.
function haversineKm(a, b) {
  const R = 6371
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(b[0] - a[0])
  const dLng = toRad(b[1] - a[1])
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

// Furthest visited country from home → { name, km } | null
function furthestFrom(data) {
  const home = data.find(c => c.name === HOME)?.latlng
  if (!home) return null
  let best = null
  for (const c of data) {
    if (c.name === HOME || !c.latlng) continue
    const km = haversineKm(home, c.latlng)
    if (!best || km > best.km) best = { name: c.name, km }
  }
  return best
}

let _inFlight = null
/** Last successful stats: instant paint on reopen without waiting on fetch. */
let _cachedStats = null

// ── The globe: built once, in idle time, then reused every opening ──────────
let _globe = null
let _globeLoad = null
/** A renderer for the globe made at startup (main.js), when making a WebGL context costs nothing visible. */
let _bootRenderer = null
export function adoptGlobeRenderer(renderer) { _bootRenderer = renderer }

function loadGlobe() {
  if (!_globeLoad) {
    _globeLoad = import('./TravelGlobe.js').then(async ({ TravelGlobe }) => {
      const g = new TravelGlobe({ renderer: _bootRenderer })
      g.reduced = reduced
      _globe = g
      return g
    })
  }
  return _globeLoad
}

/**
 * Idle warm-up, called after the world is revealed: fetch the baked stats,
 * paint the globe and compile its shaders off-screen, so the first visit to
 * the Pirate Ship opens straight onto a finished planet.
 */
/**
 * Get the Pirate Ship's globe ready before anyone opens it.
 * @param {() => Promise<void>} quiet resolves at a quiet moment: creating the globe's own WebGL context
 *   (about 0.1 s) and its first draw can't be split, so each waits for one
 */
export async function warmTravel(quiet = () => Promise.resolve()) {
  try {
    if (!_cachedStats) {
      const r = await fetch(`${BASE}travel-stats.json`)
      if (r.ok) { const s = await r.json(); if (!s.error) _cachedStats = s }
    }
    await quiet()
    const g = await loadGlobe()
    if (_cachedStats) await g.setData(_cachedStats)
    await idle()
    await quiet()
    await g.warm()
    if (!g.stage) g.flyTo(START, true)
  } catch (err) {
    console.warn('[TravelLog] warm-up skipped:', err.message)
  }
}
const idle = () => new Promise(res => (window.requestIdleCallback || (fn => setTimeout(fn, 60)))(res, { timeout: 1500 }))

function q(id) { return document.getElementById(id) }

export const TRAVEL_HTML = `
  <div class="tl">
    <div class="tl-globe">
      <div class="tl-stage" id="tl-stage">
        <div class="tl-tag" id="tl-tag" aria-live="polite"><b></b><span></span></div>
        <figure class="tl-card">
          <img src="${BASE}islandphoto/pirate-postcard.webp" alt="Eric on a boat holding up a fish he caught" width="450" height="600" decoding="async">
          <span class="tl-stamp" aria-hidden="true"><i><svg viewBox="0 0 24 14"><path d="M2 7c3-5 10-6 15-2l5-3-1.5 5L22 12l-5-3c-5 4-12 3-15-2z" fill="#fff"/><circle cx="6" cy="6" r="0.9" fill="#0b6f86"/></svg></i></span>
          <svg class="tl-postmark" viewBox="0 0 64 34" aria-hidden="true" fill="none" stroke="#2a2238" stroke-width="1.2"><circle cx="17" cy="17" r="14"/><circle cx="17" cy="17" r="10.5" stroke-width="0.7"/><path d="M33 9q4-3 8 0t8 0t8 0M33 15q4-3 8 0t8 0t8 0M33 21q4-3 8 0t8 0t8 0M33 27q4-3 8 0t8 0t8 0" stroke-linecap="round"/></svg>
        </figure>
      </div>
      <div class="tl-foot">
        <span class="tl-live" id="travel-status" aria-live="polite">Loading…</span>
        <button id="travel-refresh" class="tl-refresh" type="button" aria-label="Check the map for new pins" title="Check the map for new pins">${svgIcon('refresh', 13, 2)}</button>
        <a class="tl-maplink" href="${MAP_URL}" target="_blank" rel="noopener">Open the full map ${svgIcon('external', 12, 2)}</a>
      </div>
    </div>

    <div class="tl-log">
      <div class="tl-nums" id="tp-stats"></div>
      <div class="tl-cc-head"><span>Countries visited</span><span class="tl-cc-count" id="tp-cloud-count">·</span></div>
      <div class="tl-cc" id="tp-flags" role="list" aria-label="Countries visited"></div>
    </div>
  </div>
`

function statBox({ label, value, sub, word }) {
  return `
    <div class="tl-num">
      <p class="tl-v${word ? ' is-word' : ''}">${value ?? '·'}</p>
      <p class="tl-l">${label}</p>
      <p class="tl-s">${sub ?? ''}</p>
    </div>`
}

function renderStats(stats) {
  const list = stats.countriesList || []
  // Prefer the rich per-country records; fall back to bare names if an older
  // cached JSON (pre-countryData) is served.
  const data = (stats.countryData && stats.countryData.length)
    ? stats.countryData
    : list.map(name => ({ name, iso: null, continent: 'Other', latlng: null }))
  const continents = data.length ? new Set(data.map(c => c.continent)).size : null
  const wonders = WONDERS.filter(w => w.seen).length
  const furthest = data.length ? furthestFrom(data) : null

  const boxes = [
    { label: 'Countries',      value: stats.countries ?? (list.length || '·'), sub: 'visited' },
    { label: 'Continents',     value: continents ?? '·',                       sub: 'of 7' },
    { label: 'Places pinned',  value: stats.landmarks != null ? stats.landmarks.toLocaleString('en-GB') : '·', sub: 'on the map' },
    { label: '% of world',     value: stats.worldPct != null ? `${stats.worldPct}%` : '·', sub: 'explored' },
    { label: 'New 7 Wonders',  value: `${wonders}/7`,                          sub: 'seen' },
    { label: 'Furthest flung', value: furthest ? esc(furthest.name) : '·', word: true,
      sub: furthest
        ? `${(Math.round(furthest.km / 10) * 10).toLocaleString('en-GB')} km from <span class="tl-home" tabindex="0" data-tip="${esc(HOME)}">home</span>`
        : '' },
  ]

  const grid = q('tp-stats')
  if (grid) grid.innerHTML = boxes.map(statBox).join('')

  _cachedStats = stats
  renderCountries(data)
  setUpdatedStatus(stats)
  if (_globe) _globe.setData(stats)
}

function setStatus(text, live = false) {
  const status = q('travel-status')
  if (!status) return
  status.textContent = text
  status.classList.toggle('is-live', live)
}

function setUpdatedStatus(stats) {
  if (stats.error) { setStatus(`Couldn't read the map: ${stats.error}`); return }
  if (!stats.updatedAt) { setStatus('No data yet'); return }
  const dt = new Date(stats.updatedAt)
  const formatted = isNaN(dt.getTime())
    ? stats.updatedAt
    : dt.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false })
  setStatus(`Updated ${formatted}`, true)
}

/** Each country as its own shape, filled with its flag. */
function countryTile(c) {
  const name = esc(c.name)
  const id = `tlcp-${c.iso || c.name.replace(/\W/g, '')}`
  const pins = c.pins === 1 ? '1 pin' : `${c.pins ?? 0} pins`
  const flag = c.iso ? `https://flagcdn.com/w160/${c.iso}.webp` : ''
  const art = c.shape
    ? `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><path d="${c.shape}"/></clipPath></defs>${
        flag ? `<image href="${flag}" width="100" height="100" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>` : `<path d="${c.shape}" fill="#f4d58d"/>`
      }<path d="${c.shape}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.8" vector-effect="non-scaling-stroke"/></svg>`
    : `<span class="tl-c-flat" style="${flag ? `background-image:url('${flag}')` : ''}"></span>`
  return `<button class="tl-c" type="button" role="listitem" data-name="${name}" aria-label="${name}, ${pins}">${art}<small>${name}</small></button>`
}

function renderCountries(data) {
  const wall  = q('tp-flags')
  const count = q('tp-cloud-count')
  if (count) count.textContent = data.length || '·'
  if (!wall) return
  const sorted = data.slice().sort((a, b) => a.name.localeCompare(b.name))
  wall.innerHTML = sorted.map(countryTile).join('')
  markTile(_globe?.countries[_globe.sel]?.name ?? null)
}

function markTile(name) {
  q('tp-flags')?.querySelectorAll('.tl-c').forEach(b => b.classList.toggle('is-on', b.dataset.name === name))
}

function renderEmpty(message) {
  const grid = q('tp-stats')
  if (grid) {
    grid.innerHTML = [
      { label: 'Countries',      value: '·', sub: 'visited' },
      { label: 'Continents',     value: '·', sub: 'of 7' },
      { label: 'Places pinned',  value: '·', sub: 'on the map' },
      { label: '% of world',     value: '·', sub: 'explored' },
      { label: 'New 7 Wonders',  value: '·', sub: 'seen' },
      { label: 'Furthest flung', value: '·', sub: '', word: true },
    ].map(statBox).join('')
  }
  if (message) setStatus(message)
}

async function loadStats(forceRefresh = false) {
  setStatus(forceRefresh ? 'Checking the map…' : 'Loading…')

  if (_inFlight) _inFlight.abort()
  const ctrl = _inFlight = new AbortController()

  const readStatic = () =>
    fetch(`${BASE}travel-stats.json?_=${Date.now()}`, { signal: ctrl.signal })
  const readJson = async (r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const stats = await r.json()
    if (stats.error) throw new Error(stats.error)
    return stats
  }

  try {
    if (forceRefresh) {
      // Refresh button: force a genuinely fresh scrape. The timestamp busts the
      // edge cache so this never returns a cached copy. If the endpoint is
      // missing (static host) or errors, fall back to the baked JSON.
      let stats
      let live = false
      try {
        stats = await readJson(await fetch(`${REFRESH_ENDPOINT}?_=${Date.now()}`, { signal: ctrl.signal }))
        live = true
      } catch (err) {
        if (err.name === 'AbortError') return
        stats = await readJson(await readStatic())
      }
      renderStats(stats)
      // Re-warm the shared edge cache under the PLAIN url (the one page loads
      // read), so this refresh becomes what every visitor sees next.
      if (live) fetch(REFRESH_ENDPOINT).catch(() => {})
    } else {
      // Normal load: paint from what we have, then upgrade to the live
      // edge-cached API data (shared by all visitors, at most a few minutes
      // old). On hosts with no API the upgrade fails quietly.
      let current = _cachedStats
      if (!current) {
        try {
          current = await readJson(await readStatic())
          renderStats(current)
        } catch (err) {
          if (err.name === 'AbortError') return
        }
      }
      if (current) setStatus('Checking for the latest…', true)
      try {
        const fresh = await readJson(await fetch(REFRESH_ENDPOINT, { signal: ctrl.signal }))
        const isNewer = !current?.updatedAt ||
          new Date(fresh.updatedAt || 0) >= new Date(current.updatedAt)
        renderStats(isNewer ? fresh : current)
      } catch (err) {
        if (err.name === 'AbortError') return
        if (!current) throw err // both sources failed → show the error
        setUpdatedStatus(current) // API unreachable → static timestamp is final
      }
    }
  } catch (err) {
    if (err.name === 'AbortError') return
    renderEmpty(`Couldn't read the map: ${err.message}`)
    console.error('[TravelStats]', err)
  } finally {
    if (_inFlight === ctrl) _inFlight = null
  }
}

export function initTravelStats(root) {
  const stage = q('tl-stage')
  const tag   = q('tl-tag')
  const wall  = q('tp-flags')

  // The globe joins as soon as it's ready (usually already warm).
  let gone = false
  loadGlobe().then(async g => {
    if (gone || !stage?.isConnected) return
    if (_cachedStats) await g.setData(_cachedStats)
    if (gone || !stage.isConnected) return
    g.onSelect = markTile
    g.mount(stage, tag)
    if (g.sel < 0) g.flyTo(START, true)
    else { g.select(-1); g.flyTo(START, true) }
    stage.classList.add('is-ready')
  }).catch(err => console.warn('[TravelLog] globe unavailable:', err.message))

  // Point at a country in the list: the globe turns to it and lights it up.
  const hoverable = window.matchMedia?.('(hover: hover)').matches
  wall?.addEventListener('click', e => {
    const b = e.target.closest('.tl-c')
    if (b) _globe?.flyTo(b.dataset.name)
  })
  if (hoverable) {
    wall?.addEventListener('pointerover', e => {
      const b = e.target.closest('.tl-c')
      if (b && b.dataset.name !== _globe?.countries[_globe.sel]?.name) _globe?.flyTo(b.dataset.name)
    })
  }
  wall?.addEventListener('focusin', e => {
    const b = e.target.closest('.tl-c')
    if (b) _globe?.flyTo(b.dataset.name)
  })

  const btn = q('travel-refresh')
  if (btn) {
    btn.onclick = async () => {
      btn.disabled = true
      btn.classList.add('is-spinning')
      try { await loadStats(true) } finally { btn.disabled = false; btn.classList.remove('is-spinning') }
    }
  }

  if (root) {
    root._disposeIsland = () => {
      gone = true
      if (_globe?.stage === stage) _globe.unmount()
      if (_globe) _globe.onSelect = null
    }
  }

  // Reopen: paint cached stats immediately, then check for newer
  if (_cachedStats) renderStats(_cachedStats)
  else renderEmpty()
  loadStats(false)
}

// Travel-stats panel logic.
// In DEV the refresh button hits a Vite middleware that re-runs KML scraping.
// In PROD the JSON is generated at build time (daily cron) and served as a
// static file — there is no live endpoint, so the button can only re-read
// the same file (cache-busted). We surface that to the user clearly.

const IS_DEV = import.meta.env.DEV
const MAP_EMBED = 'https://www.google.com/maps/d/u/0/embed?mid=1Jqq0FtlUJEB3a12Xt-tvC5XGCQ9Qqf8&ehbc=2E312F'

let _inFlight = null   // AbortController for the active fetch (cancel on re-init)

function q(id) { return document.getElementById(id) }

function setText(id, text) {
  const el = q(id)
  if (el) el.textContent = text
}

function renderStats(stats) {
  setText('tp-countries', stats.countries ?? '—')
  setText('tp-landmarks', stats.landmarks ?? '—')
  setText('tp-world-pct', stats.worldPct != null ? `${stats.worldPct}%` : '—')

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

  const debug = q('tp-debug')
  if (debug) {
    const lines = stats.logs?.length
      ? stats.logs
      : [
          `updatedAt:     ${stats.updatedAt ?? '—'}`,
          `landmarks:     ${stats.landmarks ?? '—'}`,
          `countries:     ${stats.countries ?? '—'}`,
          `countriesList: ${(stats.countriesList || []).join(', ') || '—'}`,
          `worldPct:      ${stats.worldPct ?? '—'}%`,
        ]
    debug.textContent = lines.join('\n')
  }
}

async function loadStats(forceRefresh = false) {
  const status = q('travel-status')
  const debug  = q('tp-debug')
  if (status) status.textContent = forceRefresh ? 'Refreshing…' : 'Loading…'
  if (debug && forceRefresh && IS_DEV) {
    debug.textContent = 'Fetching live stats — this takes ~30s…\n(watch terminal for progress)'
  }

  // Cancel any in-flight request from a previous open
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
    if (status) status.textContent = `Error: ${err.message}`
    if (debug)  debug.textContent  = `Error: ${err.message}`
    // Render skeleton so the boxes don't show stale values from a previous run
    setText('tp-countries', '—')
    setText('tp-landmarks', '—')
    setText('tp-world-pct', '—')
    console.error('[TravelStats]', err)
  } finally {
    _inFlight = null
  }
}

function loadMapEmbed() {
  const slot = q('tp-map-slot')
  if (!slot) return
  const iframe = document.createElement('iframe')
  iframe.src           = MAP_EMBED
  iframe.width         = '100%'
  iframe.height        = '270'
  iframe.loading       = 'lazy'
  iframe.referrerPolicy = 'no-referrer-when-downgrade'
  iframe.title         = "Eric's travel map (Google My Maps embed)"
  iframe.style.cssText = 'border:none;border-radius:8px;display:block;margin:0.6rem 0;'
  // Sandbox: allow scripts (Google Maps needs them) and same-origin (their JS
  // talks to google domains), but block top-nav, forms, popups by default.
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups')
  slot.replaceChildren(iframe)

  try { localStorage.setItem('phf-travel-map-loaded', '1') } catch {}
}

export function initTravelStats() {
  // Map consent button → load Google iframe
  const mapBtn = q('tp-map-load')
  if (mapBtn) {
    mapBtn.onclick = loadMapEmbed
    // Auto-load if user previously consented
    try {
      if (localStorage.getItem('phf-travel-map-loaded') === '1') loadMapEmbed()
    } catch {}
  }

  // Debug pre-toggle
  const toggle = q('tp-debug-toggle')
  const debug  = q('tp-debug')
  if (toggle && debug) {
    toggle.onclick = () => {
      const open = debug.classList.toggle('tp-debug--open')
      toggle.textContent = open ? '▲' : '▼'
      toggle.setAttribute('aria-expanded', String(open))
    }
    toggle.setAttribute('aria-controls', 'tp-debug')
    toggle.setAttribute('aria-expanded', 'false')
  }

  // Refresh button. In production it's just a "reload from cached JSON"
  // (the daily cron is the real refresher), so soften the copy and tooltip.
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

  loadStats(false)
}

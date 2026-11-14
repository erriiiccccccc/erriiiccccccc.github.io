// Island registry. Panel modules are eager so pressing E never pays for a
// cold dynamic-import + parse hitch. meadow_island → AboutOverlay in main.js.
import { ARCTIC_HTML, initArctic } from '../islands/arctic.js'
import { PROJECTS_HTML, initProjects } from '../islands/projects.js'
import { EXPERIENCE_HTML, initExperience } from '../islands/experience.js'
import { CONTACT_HTML, initContact } from '../islands/contact.js'
import { TRAVEL_HTML, initTravelStats, warmTravel } from '../travel/TravelStats.js'

export const ISLANDS = {
  meadow_island: {
    iconKey: 'leaf',
    name: 'Meadow Island',
    section: 'About Me',
    color: '#4CAF50',
    html: `
      <p>Hey, I'm <strong>Eric Ng Min Chern</strong>. I'm an AI Audit Technology Analyst at Barclays
      in London, with a First in Computer Science from the University of Edinburgh. Originally from Malaysia.</p>
      <p>Before that I interned at Barclays and BlackRock, built real products for real businesses,
      and I love making things that are useful, interactive, or just a bit unexpected.</p>
      <div class="tag-row">
        <span class="tag">AI Audit @ Barclays</span>
        <span class="tag">CS First @ Edinburgh</span>
        <span class="tag">Full-Stack Dev</span>
        <span class="tag">London</span>
      </div>
    `,
  },

  arctic_island: {
    iconKey: 'snowflake',
    name: 'Arctic Island',
    section: 'Ask Hui Sin',
    shell: 'frost',
    color: '#64B5F6',
    variant: 'huisin',
    html: ARCTIC_HTML,
    init: initArctic,
  },

  mountain_island: {
    iconKey: 'mountain',
    name: 'Mountain Island',
    section: 'Projects',
    shell: 'cinema',
    color: '#FF8A65',
    variant: 'projects',
    html: PROJECTS_HTML,
    init: initProjects,
  },

  lava_island: {
    iconKey: 'flame',
    name: 'Lava Island',
    section: 'Experience',
    shell: 'eruption',
    color: '#E53935',
    variant: 'exp',
    html: EXPERIENCE_HTML,
    init: initExperience,
  },

  desert_island: {
    iconKey: 'sun',
    name: 'Desert Island',
    section: 'Contact',
    shell: 'mirage',
    color: '#FB923C',
    variant: 'contact',
    html: CONTACT_HTML,
    init: initContact,
  },

  pirate_ship: {
    iconKey: 'compass',
    name: 'Pirate Ship',
    section: 'Travel Log',
    shell: 'night',
    color: '#0097A7',
    lightColor: '#FFFFFF',
    noGlow: true,
    variant: 'travel',
    html: TRAVEL_HTML,
    init: initTravelStats,
  },
}

/** Detached panel body templates — cloned on each open (no innerHTML parse). */
const _panelCache = new Map()

function htmlToBody(island) {
  const html = typeof island.html === 'function' ? island.html() : (island.html || '')
  const wrap = document.createElement('div')
  wrap.className = 'wp-body'
  wrap.innerHTML = html
  return wrap
}

export function hasPanelCached(key) {
  return !!key && _panelCache.has(key)
}

/** Ensure a template exists; returns true if already (or newly) cached. */
export function ensurePanelCached(key, island) {
  if (!key || !island || key === 'meadow_island') return false
  if (!_panelCache.has(key)) _panelCache.set(key, htmlToBody(island))
  return _panelCache.has(key)
}

/** Clone a cached body (builds + caches on miss). */
export function takePanelBody(key, island) {
  ensurePanelCached(key, island)
  const tmpl = _panelCache.get(key)
  return tmpl ? tmpl.cloneNode(true) : htmlToBody(island)
}

/** Idle after reveal: pre-parse every world panel once. */
export function prebuildIslandPanels() {
  for (const [key, island] of Object.entries(ISLANDS)) {
    if (key === 'meadow_island') continue
    ensurePanelCached(key, island)
  }
  warmPanelImages()
  // The Pirate globe paints and compiles in idle time, so its first opening is instant
  ;(window.requestIdleCallback || (fn => setTimeout(fn, 400)))(() => warmTravel(), { timeout: 4000 })
}

/**
 * Fetch and decode every photo and logo the panels show, one at a time in
 * idle time, so the first opening of an island doesn't pay for the network,
 * the decode and the GPU upload in the middle of its entrance.
 */
function warmPanelImages() {
  const urls = new Set()
  for (const tmpl of _panelCache.values()) {
    tmpl.querySelectorAll('img[src], img[data-src]').forEach(img => {
      urls.add(img.getAttribute('src') || img.getAttribute('data-src'))
    })
    tmpl.querySelectorAll('[style*="url("]').forEach(el => {
      const m = el.getAttribute('style').match(/url\(['"]?([^'")]+)['"]?\)/)
      if (m) urls.add(m[1])
    })
  }
  const queue = [...urls].filter(Boolean)
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 120))
  const next = () => {
    const src = queue.shift()
    if (!src) return
    const img = new Image()
    img.decoding = 'async'
    img.src = src
    img.decode().catch(() => {}).finally(() => idle(next, { timeout: 2000 }))
  }
  idle(next, { timeout: 2000 })
}

/** @deprecated name kept for call sites — now idle-prebuilds panel DOM. */
export function prefetchAllIslands() {
  prebuildIslandPanels()
  return Promise.resolve()
}

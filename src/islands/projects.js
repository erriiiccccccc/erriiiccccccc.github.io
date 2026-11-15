// Mountain Island: the Game Hub. One project at a time, like a console home
// screen: its demo plays across the whole panel behind the title, a rail of
// tiles runs along the bottom, and the arrow keys flick between them. Every
// project leads with its outcome line.
//
//   ← →        previous / next project (also: wheel, swipe, the rail, 1 to 9)
//   L          The Index: every project as one typographic list
//   Watch demo hides the words so the demo has the screen; Esc brings them back
//
// Media: two stacked layers cross-fade. Only the project on screen has a
// video element, the poster shows until it's actually playing, and neighbours'
// posters are warmed so a flick never lands on black. Projects without a
// recording get a drawn, moving cover (projectCovers.js).
// Reduced motion: posters instead of autoplay, no parallax, instant swaps.
import { svgIcon } from '../ui/icons.js'
import { sfx } from '../audio/sfx.js'
import { PROJECTS } from './projectsData.js'
import { coverHtml } from './projectCovers.js'

const N = PROJECTS.length
const pad = (n) => String(n).padStart(2, '0')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const calm = () => document.body.classList.contains('reduced-motion') || (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
const FINE = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? true

const svg = (d, s = 16) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`
const ICON = {
  hub: svg('<rect x="3" y="4" width="18" height="11" rx="2"/><path d="M4 19h3M10.5 19h3M17 19h3"/>'),
  list: svg('<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>'),
  eye: svg('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
}

/** Dark or light text on an accent, whichever reads better. */
function inkOn(hex) {
  const n = parseInt(hex.slice(1), 16)
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
  const L = 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255)
  return L > 0.3 ? '#0c0a12' : '#ffffff'
}

const thumb = (p) => p.thumb ? `<img src="${p.thumb}" alt="" loading="lazy" decoding="async">` : coverHtml(p.cover, { still: true })

const tilesHtml = PROJECTS.map((p, i) => `
  <button type="button" class="gh-tile" role="tab" id="gh-tab-${i}" aria-selected="false" aria-controls="gh-info" tabindex="-1" data-i="${i}" style="--ta:${p.accent}">
    <span class="gh-tile-media">${thumb(p)}</span>
    <span class="gh-tile-name">${esc(p.title)}</span>
    <span class="gh-prog" aria-hidden="true"></span>
  </button>`).join('')

const rowsHtml = PROJECTS.map((p, i) => `
  <li>
    <button type="button" class="gh-row" data-i="${i}" style="--ta:${p.accent};--k:${i}">
      <span class="gh-row-n">${pad(i + 1)}</span>
      <span class="gh-row-thumb">${thumb(p)}</span>
      <span class="gh-row-main"><b class="gh-row-t">${esc(p.title)}</b><span class="gh-row-o">${esc(p.outcome)}</span></span>
      <span class="gh-row-m">${esc(p.role)} · ${esc(p.year)}</span>
      <span class="gh-row-go">${svgIcon('arrowRight', 18)}</span>
    </button>
  </li>`).join('')

export const PROJECTS_HTML = `
  <div class="gh" data-island-dispose data-view="hub">
    <div class="gh-stage" aria-hidden="true">
      <div class="gh-bg"></div><div class="gh-bg"></div>
      <div class="gh-shade"></div><div class="gh-tint"></div>
    </div>

    <div class="gh-top">
      <p class="gh-keys" aria-hidden="true"><kbd>←</kbd><kbd>→</kbd><span>switch</span><kbd>L</kbd><span>list</span></p>
      <div class="gh-switch" role="group" aria-label="How the projects are shown">
        <button type="button" class="gh-switch-b" data-view="hub" aria-pressed="true">${ICON.hub}<span>Hub</span></button>
        <button type="button" class="gh-switch-b" data-view="index" aria-pressed="false">${ICON.list}<span>List</span></button>
      </div>
    </div>

    <div class="gh-hub">
      <div class="gh-mid">
        <section class="gh-info" id="gh-info" role="tabpanel" tabindex="-1"></section>
        <div class="gh-count" aria-hidden="true"><span class="gh-n"><b>01</b></span><i>/ ${pad(N)}</i></div>
      </div>
      <div class="gh-dock">
        <button type="button" class="gh-step" data-step="-1" aria-label="Previous project">${svgIcon('chevronLeft', 20)}</button>
        <div class="gh-rail" role="tablist" aria-label="Projects" aria-orientation="horizontal">${tilesHtml}</div>
        <button type="button" class="gh-step" data-step="1" aria-label="Next project">${svgIcon('chevronRight', 20)}</button>
      </div>
    </div>

    <div class="gh-index" inert>
      <ol class="gh-list">${rowsHtml}</ol>
    </div>
    <div class="gh-float" aria-hidden="true"></div>
    <button type="button" class="gh-back" hidden>${ICON.eye}<span>Show details</span></button>
    <p class="sr-only" id="gh-say" aria-live="polite"></p>
  </div>
`

function infoHtml(p) {
  const badges = [
    p.badge && `<span class="gh-badge gh-badge--win">${svgIcon('trophy', 12)}${esc(p.badge)}</span>`,
    p.href && `<span class="gh-badge gh-badge--live">Live</span>`,
    p.id === 'medmatch' && `<span class="gh-badge">Piloting</span>`,
  ].filter(Boolean).join('')
  const here = p.id === 'erics-world'
  const cta = [
    p.href && !here && `<a class="gh-btn gh-btn--primary" href="${esc(p.href)}" target="_blank" rel="noopener noreferrer">Visit site ${svgIcon('external', 15)}</a>`,
    here && `<span class="gh-pill gh-pill--here">You're in it right now</span>`,
    p.repo && `<a class="gh-btn" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">${svgIcon('github', 16)} Source</a>`,
    p.demo && `<button type="button" class="gh-btn gh-btn--ghost" data-clean>${ICON.eye} Watch demo</button>`,
    !p.href && !p.repo && `<span class="gh-pill">No public link</span>`,
  ].filter(Boolean).join('')
  return `
    <div class="gh-badges">${badges}</div>
    <h3 class="gh-title">${esc(p.title)}</h3>
    <p class="gh-meta">${esc(p.role)} · ${esc(p.year)}</p>
    <p class="gh-outcome">${esc(p.outcome)}</p>
    <p class="gh-blurb">${esc(p.blurb)}</p>
    <ul class="gh-tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    <div class="gh-cta">${cta}</div>`
}

export function initProjects(root) {
  const gh = root.querySelector('.gh')
  if (!gh) return
  const ac = new AbortController()
  const { signal } = ac
  const $ = (s) => gh.querySelector(s)
  const layers = [...gh.querySelectorAll('.gh-bg')]
  const stage = $('.gh-stage'), hub = $('.gh-hub'), mid = $('.gh-mid'), info = $('.gh-info'), rail = $('.gh-rail'), num = $('.gh-n'), say = $('#gh-say')
  const index = $('.gh-index'), float = $('.gh-float'), back = $('.gh-back')
  const tiles = [...rail.children], rows = [...gh.querySelectorAll('.gh-row')]
  const panel = gh.closest('#world-panel')
  let cur = -1, front = 0, view = 'hub', clean = false, dead = false

  // The panel's header floats over the hub: keep our top controls clear of it.
  const head = gh.closest('.wp-card')?.querySelector('.wp-header')
  const ro = new ResizeObserver(() => { if (head) gh.style.setProperty('--gh-top', `${head.offsetHeight}px`); fit() })
  if (head) ro.observe(head)
  ro.observe(gh)

  // Short screens: nothing is cut mid-sentence. When the words don't fit under the top bar, the tags
  // step out first, then the story line. The title and the outcome line always stay whole.
  function fit() {
    gh.classList.remove('fit-1', 'fit-2')
    if (window.matchMedia('(max-width: 760px)').matches) return        // phones scroll the words instead
    for (const c of ['fit-1', 'fit-2']) { if (info.offsetHeight <= mid.clientHeight) break; gh.classList.add(c) }
  }

  const video = () => layers[front].querySelector('video')
  const playing = () => view === 'hub' && !document.hidden && !dead

  // ── Media ───────────────────────────────────────────────────────────────────
  function addVideo(box, p) {
    const v = document.createElement('video')
    v.muted = true; v.loop = true; v.playsInline = true
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '')
    v.preload = 'auto'
    v.poster = p.poster
    // The 2560 clip when the stage is big enough to show it; the 1280 one on phones, in small windows,
    // and for anyone on data saver. Either way the clip is never stretched far past its own size.
    const lite = navigator.connection?.saveData || stage.clientWidth * Math.min(window.devicePixelRatio || 1, 2) < 1400
    v.src = lite ? p.demoSm : p.demo
    v.addEventListener('playing', () => v.classList.add('is-on'), { once: true })
    const tile = tiles[PROJECTS.indexOf(p)]
    v.addEventListener('timeupdate', () => { if (v.duration) tile.style.setProperty('--prog', (v.currentTime / v.duration).toFixed(3)) })
    box.appendChild(v)
    return v
  }
  function media(p) {
    const box = document.createElement('div')
    box.className = 'gh-media'
    if (p.demo) {
      box.innerHTML = `<img src="${p.poster}" alt="" decoding="async">`
      if (!calm()) addVideo(box, p)                 // reduced motion: the still, until "Watch demo"
    } else {
      box.innerHTML = coverHtml(p.cover, { still: calm() })
    }
    return box
  }

  // ── Choosing a project ──────────────────────────────────────────────────────
  function select(i, { dir = 0, quiet = false, focus = false } = {}) {
    i = ((i % N) + N) % N
    if (i === cur) return
    if (!dir) dir = cur < 0 || i > cur ? 1 : -1
    const p = PROJECTS[i]
    cur = i
    gh.style.setProperty('--pa', p.accent)
    gh.style.setProperty('--pa-ink', inkOn(p.accent))
    gh.style.setProperty('--dir', dir)

    // the new media goes into the back layer, the two cross-fade, the old one is emptied
    const next = layers[1 - front], old = layers[front]
    clearTimeout(next._t)
    next.replaceChildren(media(p))
    tiles.forEach(t => t.style.setProperty('--prog', 0))
    next.classList.add('on'); old.classList.remove('on')
    old._t = setTimeout(() => { if (!old.classList.contains('on')) old.replaceChildren() }, calm() ? 0 : 800)
    front = 1 - front
    if (playing()) video()?.play().catch(() => {})

    info.innerHTML = infoHtml(p)
    info.setAttribute('aria-labelledby', `gh-tab-${i}`)
    info.classList.remove('is-in'); void info.offsetWidth; info.classList.add('is-in')
    fit()

    // the big number rolls in the direction you moved
    num.querySelectorAll('b').forEach(b => { b.className = `out ${dir > 0 ? 'out-up' : 'out-down'}`; setTimeout(() => b.remove(), 420) })
    const b = document.createElement('b')
    b.textContent = pad(i + 1)
    b.className = dir > 0 ? 'in-up' : 'in-down'
    num.appendChild(b)

    tiles.forEach((t, k) => { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1 })
    rows.forEach((r, k) => r.classList.toggle('is-cur', k === i))
    const t = tiles[i]
    rail.scrollTo({ left: t.offsetLeft - rail.clientWidth / 2 + t.offsetWidth / 2, behavior: calm() ? 'auto' : 'smooth' })
    if (focus) t.focus({ preventScroll: true })
    say.textContent = `Project ${i + 1} of ${N}: ${p.title}. ${p.outcome}`
    if (!quiet) sfx.click()

    // warm the neighbours' posters, so the next flick has a picture straight away
    for (const k of [i + 1, i - 1]) { const q = PROJECTS[((k % N) + N) % N]; if (q.poster) new Image().src = q.poster }
  }
  const step = (d) => select(cur + d, { dir: d, focus: document.activeElement?.classList?.contains('gh-tile') })

  // ── Watch demo: the words step aside ────────────────────────────────────────
  function setClean(on) {
    if (on === clean) return
    clean = on
    gh.classList.toggle('is-clean', on)
    back.hidden = !on
    if (on) {
      const p = PROJECTS[cur]
      if (p.demo && !video()) addVideo(layers[front].querySelector('.gh-media'), p).play().catch(() => {})   // reduced motion: you asked for it
      back.focus({ preventScroll: true })
    } else if (panel?.contains(document.activeElement) || document.activeElement === document.body) {
      info.querySelector('[data-clean]')?.focus({ preventScroll: true })
    }
  }

  // ── Hub ⇄ The Index ─────────────────────────────────────────────────────────
  function setView(v) {
    if (v === view) return
    view = v
    setClean(false)
    gh.dataset.view = v
    gh.querySelectorAll('.gh-switch-b').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'))
    hub.inert = v === 'index'
    index.inert = v !== 'index'
    if (v === 'index') {
      video()?.pause()
      gh.classList.remove('is-list-in'); void gh.offsetWidth; gh.classList.add('is-list-in')
      rows[cur]?.scrollIntoView({ block: 'nearest' })
      rows[cur]?.focus({ preventScroll: true })
    } else {
      hideFloat()
      if (playing()) video()?.play().catch(() => {})
      tiles[cur].focus({ preventScroll: true })
    }
    sfx.toggle(v === 'index')
  }

  // The Index: a preview that trails the pointer (mouse only; rows carry a thumbnail anyway)
  let fx = 0, fy = 0, tx = 0, ty = 0, fRaf = 0, fRow = null
  function hideFloat() { float.classList.remove('is-on'); fRow = null; cancelAnimationFrame(fRaf); fRaf = 0 }
  function floatTick() {
    const dx = tx - fx, dy = ty - fy
    fx += dx * 0.16; fy += dy * 0.16
    float.style.setProperty('--fx', `${fx.toFixed(1)}px`)
    float.style.setProperty('--fy', `${fy.toFixed(1)}px`)
    float.style.setProperty('--fr', `${Math.max(-7, Math.min(7, dx * 0.05)).toFixed(2)}deg`)
    fRaf = Math.abs(dx) + Math.abs(dy) > 0.3 && float.classList.contains('is-on') ? requestAnimationFrame(floatTick) : 0
  }
  if (FINE) {
    index.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || calm()) return
      const row = e.target.closest('.gh-row')
      if (!row) return hideFloat()
      const o = gh.getBoundingClientRect(), fw = float.offsetWidth, fh = float.offsetHeight
      tx = Math.min(o.width - fw - 16, Math.max(16, e.clientX - o.left + 28))
      ty = Math.min(o.height - fh - 16, Math.max(16, e.clientY - o.top - fh / 2))
      if (row !== fRow) {
        if (!fRow) { fx = tx; fy = ty }
        fRow = row
        float.style.setProperty('--ta', row.style.getPropertyValue('--ta'))
        float.innerHTML = thumb(PROJECTS[+row.dataset.i])
        float.classList.add('is-on')
      }
      if (!fRaf) fRaf = requestAnimationFrame(floatTick)
    }, { signal })
    index.addEventListener('pointerleave', hideFloat, { signal })
  }

  // ── Pointer, wheel and touch ────────────────────────────────────────────────
  gh.addEventListener('click', (e) => {
    const tile = e.target.closest('.gh-tile')
    if (tile) return select(+tile.dataset.i, { focus: true })
    const stepB = e.target.closest('.gh-step')
    if (stepB) return step(+stepB.dataset.step)
    const sw = e.target.closest('.gh-switch-b')
    if (sw) return setView(sw.dataset.view)
    const row = e.target.closest('.gh-row')
    if (row) { select(+row.dataset.i, { quiet: true }); return setView('hub') }
    if (e.target.closest('[data-clean]')) return setClean(true)
    if (e.target.closest('.gh-back')) return setClean(false)
    if (clean && !e.target.closest('.gh-dock')) setClean(false)        // tap the demo to get the words back
  }, { signal })

  let wheelAt = 0
  gh.addEventListener('wheel', (e) => {
    if (view !== 'hub') return
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    if (Math.abs(d) < 14) return
    e.preventDefault()
    const now = performance.now()
    if (now - wheelAt < 520) return                    // one flick per gesture, even on an inertial trackpad
    wheelAt = now
    step(d > 0 ? 1 : -1)
  }, { signal, passive: false })

  let sw = null
  gh.addEventListener('pointerdown', (e) => {
    sw = e.pointerType !== 'mouse' && view === 'hub' && !e.target.closest('a, button, .gh-rail') ? { x: e.clientX, y: e.clientY } : null
  }, { signal })
  gh.addEventListener('pointerup', (e) => {
    if (!sw) return
    const dx = e.clientX - sw.x, dy = e.clientY - sw.y
    sw = null
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1)
  }, { signal })

  gh.addEventListener('pointercancel', () => { sw = null }, { signal })

  // a little depth: the picture leans away from the pointer
  let mRaf = 0
  if (FINE) gh.addEventListener('pointermove', (e) => {
    if (mRaf || calm() || view !== 'hub') return
    mRaf = requestAnimationFrame(() => {
      mRaf = 0
      const o = gh.getBoundingClientRect()
      stage.style.setProperty('--mx', ((e.clientX - o.left) / o.width * 2 - 1).toFixed(3))
      stage.style.setProperty('--my', ((e.clientY - o.top) / o.height * 2 - 1).toFixed(3))
    })
  }, { signal })

  // ── Keys. Captured at the document so ← → flick projects here instead of hopping islands. ──
  const moveRow = (d) => {
    const i = rows.indexOf(document.activeElement)
    rows[Math.max(0, Math.min(N - 1, (i < 0 ? cur : i) + d))].focus()
  }
  document.addEventListener('keydown', (e) => {
    if (dead || !gh.isConnected || !panel?.classList.contains('is-open') || e.altKey || e.ctrlKey || e.metaKey) return
    const ae = document.activeElement
    if (ae && ae !== document.body && !panel.contains(ae)) return     // something over the panel has the keyboard
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(ae?.tagName || '')) return
    const k = e.key
    let did = true
    if (k === 'Escape') { if (clean) setClean(false); else did = false }
    else if (k === 'l' || k === 'L') setView(view === 'hub' ? 'index' : 'hub')
    else if (view === 'hub') {
      if (k === 'ArrowRight') step(1)
      else if (k === 'ArrowLeft') step(-1)
      else if (k === 'Home') select(0, { dir: -1 })
      else if (k === 'End') select(N - 1, { dir: 1 })
      else if (/^[1-9]$/.test(k) && +k <= N) select(+k - 1)
      else did = false
    } else {
      if (k === 'ArrowDown') moveRow(1)
      else if (k === 'ArrowUp') moveRow(-1)
      else if (k === 'Home') rows[0].focus()
      else if (k === 'End') rows[N - 1].focus()
      else if (k !== 'ArrowLeft' && k !== 'ArrowRight') did = false   // ← → do nothing in the list (and don't hop islands)
    }
    if (did) { e.preventDefault(); e.stopPropagation() }
  }, { signal, capture: true })

  document.addEventListener('visibilitychange', () => { const v = video(); if (v) playing() ? v.play().catch(() => {}) : v.pause() }, { signal })

  // Teardown runs after the panel's exit has played, so nothing blanks while it's still on screen.
  root._disposeIsland = () => {
    dead = true
    ac.abort()
    ro.disconnect()
    cancelAnimationFrame(fRaf); cancelAnimationFrame(mRaf)
    layers.forEach(l => { clearTimeout(l._t); l.querySelectorAll('video').forEach(v => { v.pause(); v.removeAttribute('src'); v.load() }) })
  }

  select(0, { quiet: true })
}

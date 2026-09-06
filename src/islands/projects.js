// Mountain Island — editorial horizontal collage (justified mosaic rows).
// Shared horizontal scroll; projects grow on hover/focus and open a detail sheet.
import { svgIcon } from '../ui/icons.js'
import { GALLERY, PROJECT_BY_ID } from './projectsData.js'
import { layoutCollage, shouldRelayout } from './projectsLayout.js'

const REDUCE = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
const COARSE = window.matchMedia?.('(pointer: coarse)').matches ?? false
const DRAG_THRESHOLD = 12

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function cardHtml(item) {
  const isProject = item.type === 'project'
  const ar = item.aspectRatio
  const accent = item.accent || '#FF8A65'
  const tag = isProject ? 'button' : 'div'
  const attrs = isProject
    ? `type="button" class="pj-card pj-card--project" data-id="${escapeHtml(item.id)}" style="--pc:${accent};--ar:${ar}" aria-label="${escapeHtml(item.title)}. Dive in for details."`
    : `class="pj-card pj-card--art" data-id="${escapeHtml(item.id)}" style="--pc:${accent};--ar:${ar}" aria-hidden="true"`

  const media = item.mediaType === 'video'
    ? `<img class="pj-card-poster" alt="${escapeHtml(item.alt || '')}" loading="lazy" decoding="async" data-src="${escapeHtml(item.poster)}" />
       <video class="pj-card-video" muted loop playsinline preload="none" poster="${escapeHtml(item.poster || '')}" data-src="${escapeHtml(item.src)}"></video>`
    : `<img class="pj-card-poster" alt="${escapeHtml(item.alt || '')}" loading="lazy" decoding="async" data-src="${escapeHtml(item.src || item.poster)}" />`

  const teaser = isProject
    ? `<span class="pj-card-teaser">
         <span class="pj-card-title">${escapeHtml(item.title)}</span>
         <span class="pj-card-sub">${escapeHtml(item.subtitle)}</span>
         <span class="pj-card-cta">dive in ${svgIcon('arrowRight', 14)}</span>
       </span>`
    : `<span class="pj-card-label">${escapeHtml(item.title)}</span>`

  const badge = item.badge
    ? `<span class="pj-card-badge">${svgIcon('trophy', 12)} ${escapeHtml(item.badge)}</span>`
    : ''

  const ph = isProject
    ? `<span class="pj-card-ph" aria-hidden="true">${svgIcon('mountain', 36)}</span>`
    : ''

  return `<${tag} ${attrs}>
    <span class="pj-card-media">
      ${ph}
      ${media}
    </span>
    ${badge}
    ${teaser}
  </${tag}>`
}

export const PROJECTS_HTML = `
  <div class="pj-collage" data-island-dispose>
    <div class="pj-scroller" tabindex="0" aria-label="Project gallery. Scroll horizontally. Use arrow keys to move between projects.">
      <div class="pj-track"></div>
    </div>
    <div class="pj-sheet-scrim" hidden aria-hidden="true"></div>
    <aside class="pj-sheet" hidden aria-modal="true" role="dialog" aria-labelledby="pj-sheet-title">
      <button type="button" class="pj-sheet-close" aria-label="Close details">${svgIcon('close', 18)}</button>
      <div class="pj-sheet-media"></div>
      <div class="pj-sheet-body">
        <p class="pj-sheet-kicker"></p>
        <h3 id="pj-sheet-title" class="pj-sheet-title"></h3>
        <p class="pj-sheet-sub"></p>
        <p class="pj-sheet-blurb"></p>
        <div class="pj-sheet-tags"></div>
        <div class="pj-sheet-links"></div>
      </div>
    </aside>
  </div>
`

function hydrateImages(root) {
  root.querySelectorAll('img.pj-card-poster[data-src]').forEach((img) => {
    const url = img.getAttribute('data-src')
    if (!url) return
    img.onload = () => {
      const card = img.closest('.pj-card')
      if (!card) return
      card.classList.add('has-media')
      // Art: lock tile width to the photo’s real aspect — never crop
      if (card.classList.contains('pj-card--art') && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const ar = img.naturalWidth / img.naturalHeight
        card.style.setProperty('--ar', String(ar))
      }
    }
    img.onerror = () => img.closest('.pj-card')?.classList.add('has-fallback')
    img.src = url
  })
}

export function initProjects(root) {
  const collage = root.querySelector('.pj-collage')
  const scroller = root.querySelector('.pj-scroller')
  const track = root.querySelector('.pj-track')
  const sheet = root.querySelector('.pj-sheet')
  const scrim = root.querySelector('.pj-sheet-scrim')
  if (!collage || !scroller || !track || !sheet) return

  const ac = new AbortController()
  const { signal } = ac
  let layoutState = null
  let sheetOpen = false
  let lastFocus = null
  let drag = null
  let momentumId = 0
  let vel = 0
  const nearIds = new Set()

  const pauseAllVideos = () => {
    collage.querySelectorAll('video').forEach((v) => {
      try {
        v.pause()
        v.currentTime = 0
      } catch { /* ignore */ }
    })
  }

  let clearSpotlight = () => {}
  let clearTimer = 0

  const dispose = () => {
    cancelAnimationFrame(momentumId)
    pauseAllVideos()
    clearSpotlight()
    ac.abort()
    ro.disconnect()
    io.disconnect()
  }
  root._disposeIsland = dispose

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.getAttribute('data-id')
        if (!id) continue
        if (entry.isIntersecting) nearIds.add(id)
        else {
          nearIds.delete(id)
          const video = entry.target.querySelector('video.pj-card-video')
          if (video) {
            video.pause()
            try { video.currentTime = 0 } catch { /* ignore */ }
            entry.target.classList.remove('is-playing')
          }
        }
      }
    },
    { root: scroller, rootMargin: '200px', threshold: 0.01 },
  )

  const ensureVideoSrc = (video) => {
    if (!video || video.getAttribute('src')) return
    const url = video.getAttribute('data-src')
    if (url) video.src = url
  }

  const playCardVideo = (card) => {
    if (REDUCE || sheetOpen) return
    const video = card.querySelector('video.pj-card-video')
    if (!video) return
    const id = card.getAttribute('data-id')
    if (id && !nearIds.has(id)) return
    ensureVideoSrc(video)
    video.muted = true
    video.playsInline = true
    video.play()?.catch(() => {})
    card.classList.add('is-playing')
  }

  const stopCardVideo = (card) => {
    const video = card.querySelector('video.pj-card-video')
    if (!video) return
    video.pause()
    try { video.currentTime = 0 } catch { /* ignore */ }
    card.classList.remove('is-playing')
  }

  // ── Detail sheet (defined before layout bind so click handlers are safe) ──
  const sheetEls = {
    media: sheet.querySelector('.pj-sheet-media'),
    kicker: sheet.querySelector('.pj-sheet-kicker'),
    title: sheet.querySelector('.pj-sheet-title'),
    sub: sheet.querySelector('.pj-sheet-sub'),
    blurb: sheet.querySelector('.pj-sheet-blurb'),
    tags: sheet.querySelector('.pj-sheet-tags'),
    links: sheet.querySelector('.pj-sheet-links'),
    close: sheet.querySelector('.pj-sheet-close'),
  }

  const closeSheet = () => {
    if (!sheetOpen) return
    sheetOpen = false
    sheet.hidden = true
    scrim.hidden = true
    collage.classList.remove('is-sheet-open')
    sheetEls.media.innerHTML = ''
    if (lastFocus?.focus) lastFocus.focus()
    lastFocus = null
  }

  const openSheet = (id) => {
    const p = PROJECT_BY_ID[id]
    if (!p) return
    clearSpotlight()
    lastFocus = document.activeElement
    sheetOpen = true
    collage.classList.add('is-sheet-open')
    pauseAllVideos()

    sheet.style.setProperty('--pc', p.accent)
    sheetEls.kicker.textContent = 'Project'
    sheetEls.title.textContent = p.title
    sheetEls.sub.textContent = p.subtitle
    sheetEls.blurb.textContent = p.blurb
    sheetEls.tags.innerHTML = (p.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')
      + (p.badge ? `<span class="tag tag--accent">${svgIcon('trophy', 13)} ${escapeHtml(p.badge)}</span>` : '')

    const links = [
      p.href ? `<a class="pj-btn pj-btn--primary" href="${escapeHtml(p.href)}" target="_blank" rel="noopener noreferrer">${svgIcon('external', 15)} Visit live</a>` : '',
      p.repo ? `<a class="pj-btn" href="${escapeHtml(p.repo)}" target="_blank" rel="noopener noreferrer">${svgIcon('github', 15)} Source</a>` : '',
    ].filter(Boolean).join('')
    sheetEls.links.innerHTML = links

    const poster = p.poster || p.src
    if (p.mediaType === 'video' && p.src) {
      sheetEls.media.innerHTML = `
        <img class="pj-sheet-poster" alt="${escapeHtml(p.alt || '')}" src="${escapeHtml(poster)}" />
        <video class="pj-sheet-video" muted loop playsinline preload="metadata" poster="${escapeHtml(poster)}" src="${escapeHtml(p.src)}"></video>`
      const v = sheetEls.media.querySelector('video')
      if (v && !REDUCE) v.play().catch(() => {})
    } else {
      sheetEls.media.innerHTML = `<img class="pj-sheet-poster" alt="${escapeHtml(p.alt || '')}" src="${escapeHtml(poster)}" />`
      const img = sheetEls.media.querySelector('img')
      if (img) img.onerror = () => { img.style.opacity = '0' }
    }

    sheet.hidden = false
    scrim.hidden = false
    requestAnimationFrame(() => sheetEls.close?.focus())
  }

  sheetEls.close?.addEventListener('click', closeSheet, { signal })
  scrim?.addEventListener('click', closeSheet, { signal })

  // ── Spotlight hover — FLIP enlarge + make-way (max 2 row-slots) ───────────
  const PUSH_PAD = 10
  const PUSH_MAX = 72
  const FLIP_MS = 520
  const FLIP_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
  const flipTransition = () => `transform ${FLIP_MS}ms ${FLIP_EASE}`

  let spotlight = null // { card, ghost, pushed: [{ el, tx }] }
  let flipGen = 0

  const cancelScheduledClear = () => {
    if (clearTimer) { clearTimeout(clearTimer); clearTimer = 0 }
  }

  /** Two frames so the invert paint commits before Play. */
  const afterPaint = (fn) => {
    requestAnimationFrame(() => requestAnimationFrame(fn))
  }

  const resetCardBox = (card) => {
    card.classList.remove('is-spotlight', 'is-flipping')
    card.style.position = ''
    card.style.left = ''
    card.style.top = ''
    card.style.width = ''
    card.style.height = ''
    card.style.zIndex = ''
    card.style.transform = ''
    card.style.transformOrigin = ''
    card.style.transition = ''
  }

  /** Instant teardown (dispose / relayout / sheet open). */
  const hardClearSpotlight = () => {
    cancelScheduledClear()
    flipGen += 1
    if (!spotlight) return
    const { card, ghost, pushed } = spotlight
    ;(pushed || []).forEach(({ el }) => {
      el.style.transition = ''
      el.style.transform = ''
      el.classList.remove('is-pushed', 'is-flipping')
    })
    resetCardBox(card)
    ghost?.remove()
    spotlight = null
    collage.classList.remove('has-spotlight')
  }

  clearSpotlight = hardClearSpotlight

  /** Reverse FLIP back to resting layout. */
  const flipLeave = () => {
    cancelScheduledClear()
    if (!spotlight || spotlight.leaving) return
    const { card, ghost, pushed } = spotlight
    const gen = ++flipGen

    if (REDUCE) {
      hardClearSpotlight()
      return
    }

    const expRect = card.getBoundingClientRect()

    ;(pushed || []).forEach(({ el, tx }) => {
      el.style.transition = 'none'
      el.style.transform = `translate3d(${tx}px, 0, 0)`
    })
    resetCardBox(card)
    ghost?.remove()
    const restRect = card.getBoundingClientRect()

    const dx = expRect.left - restRect.left
    const dy = expRect.top - restRect.top
    const sx = expRect.width / Math.max(1, restRect.width)
    const sy = expRect.height / Math.max(1, restRect.height)

    card.style.transition = 'none'
    card.style.transformOrigin = '0 0'
    card.style.zIndex = '12'
    card.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
    card.classList.add('is-flipping')
    void card.offsetWidth

    spotlight = { card, ghost: null, pushed: pushed || [], leaving: true }

    afterPaint(() => {
      if (gen !== flipGen) return
      card.style.transition = flipTransition()
      card.style.transform = 'translate(0px, 0px) scale(1, 1)'
      ;(pushed || []).forEach(({ el }) => {
        el.style.transition = flipTransition()
        el.style.transform = 'translate3d(0px, 0px, 0)'
      })
      window.setTimeout(() => {
        if (gen !== flipGen) return
        ;(pushed || []).forEach(({ el }) => {
          el.style.transform = ''
          el.style.transition = ''
          el.classList.remove('is-pushed', 'is-flipping')
        })
        card.classList.remove('is-flipping')
        card.style.transform = ''
        card.style.transformOrigin = ''
        card.style.transition = ''
        card.style.zIndex = ''
        if (spotlight?.card === card) {
          spotlight = null
          collage.classList.remove('has-spotlight')
        }
      }, FLIP_MS + 48)
    })
  }

  const scheduleClear = (card) => {
    cancelScheduledClear()
    clearTimer = setTimeout(() => {
      clearTimer = 0
      if (spotlight?.card === card && card.matches(':hover')) return
      if (spotlight?.card === card) flipLeave()
    }, 120)
  }

  const activateSpotlight = (card) => {
    if (COARSE || sheetOpen) return
    if (drag?.moved) return
    cancelScheduledClear()
    if (spotlight?.card === card && !spotlight.leaving) return

    if (spotlight) hardClearSpotlight()

    const row = card.parentElement
    if (!row?.classList.contains('pj-row') || !track.contains(card)) return

    const metrics = [...track.querySelectorAll('.pj-card')].map((el) => {
      const r = el.parentElement
      return {
        el,
        left: el.offsetLeft + r.offsetLeft,
        top: r.offsetTop,
        w: el.offsetWidth,
        h: el.offsetHeight,
      }
    })
    const self = metrics.find((m) => m.el === card)
    if (!self || self.w < 8 || self.h < 8) return

    const rowH = layoutState?.rowHeight || self.h
    const gap = layoutState?.gap ?? 10
    const rows = layoutState?.rowCount || track.querySelectorAll('.pj-row').length

    // Max 2 slots; modest width growth
    const expH = rows >= 2 ? rowH * 2 + gap : Math.round(self.h * 1.06)
    let expW = self.w * (expH / self.h)
    expW = Math.min(expW, scroller.clientWidth * 0.28)
    expW = Math.max(expW, self.w * 1.08)

    const centerX = self.left + self.w / 2
    let expLeft = centerX - expW / 2
    const maxLeft = Math.max(0, track.offsetWidth - expW)
    expLeft = Math.max(0, Math.min(expLeft, maxLeft))
    const expRight = expLeft + expW
    const expTop = 0

    const firstLeft = self.left
    const firstTop = self.top
    const firstW = self.w
    const firstH = self.h

    const pushed = []
    metrics.forEach((m) => {
      if (m.el === card) return
      const oL = m.left
      const oR = m.left + m.w
      if (oR < expLeft - 4 || oL > expRight + 4) return
      const oCenter = oL + m.w / 2
      let tx = 0
      if (oCenter < centerX) tx = Math.min(0, expLeft - PUSH_PAD - oR)
      else tx = Math.max(0, expRight + PUSH_PAD - oL)
      tx = Math.max(-PUSH_MAX, Math.min(PUSH_MAX, tx))
      if (Math.abs(tx) < 1) return
      pushed.push({ el: m.el, tx })
    })

    const ghost = document.createElement('span')
    ghost.className = 'pj-card-ghost'
    ghost.setAttribute('aria-hidden', 'true')
    ghost.style.width = `${firstW}px`
    card.before(ghost)

    const gen = ++flipGen
    card.classList.add('is-spotlight', 'is-flipping')
    collage.classList.add('has-spotlight')

    // Last layout (absolute at expanded box)
    card.style.position = 'absolute'
    card.style.left = `${expLeft}px`
    card.style.top = `${expTop}px`
    card.style.width = `${expW}px`
    card.style.height = `${expH}px`
    card.style.zIndex = '12'
    card.style.transformOrigin = '0 0'

    const dx = firstLeft - expLeft
    const dy = firstTop - expTop
    const sx = firstW / expW
    const sy = firstH / expH

    if (REDUCE) {
      card.style.transform = 'translate(0,0) scale(1)'
      pushed.forEach(({ el, tx }) => {
        el.classList.add('is-pushed')
        el.style.transform = `translate3d(${tx}px, 0, 0)`
      })
      spotlight = { card, ghost, pushed }
      return
    }

    // Invert — paint still matches First
    card.style.transition = 'none'
    card.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
    pushed.forEach(({ el }) => {
      el.classList.add('is-pushed', 'is-flipping')
      el.style.transition = 'none'
      el.style.transform = 'translate3d(0px, 0px, 0)'
    })
    void card.offsetWidth

    spotlight = { card, ghost, pushed }

    // Play — double rAF so invert is on screen before easing to Last
    afterPaint(() => {
      if (gen !== flipGen || spotlight?.card !== card) return
      card.style.transition = flipTransition()
      card.style.transform = 'translate(0px, 0px) scale(1, 1)'
      pushed.forEach(({ el, tx }) => {
        el.style.transition = flipTransition()
        el.style.transform = `translate3d(${tx}px, 0, 0)`
      })
      window.setTimeout(() => {
        if (gen !== flipGen) return
        card.classList.remove('is-flipping')
        pushed.forEach(({ el }) => el.classList.remove('is-flipping'))
      }, FLIP_MS + 48)
    })
  }

  const bindCards = () => {
    track.querySelectorAll('.pj-card').forEach((card) => {
      const isProject = card.classList.contains('pj-card--project')

      // Art is decorative only — no spotlight / zoom. Projects get make-way hover.
      if (!isProject) return

      card.addEventListener('pointerenter', () => {
        activateSpotlight(card)
        playCardVideo(card)
      }, { signal })

      card.addEventListener('pointerleave', (e) => {
        const next = e.relatedTarget?.closest?.('.pj-card--project')
        if (next && track.contains(next)) {
          stopCardVideo(card)
          return
        }
        scheduleClear(card)
        stopCardVideo(card)
      }, { signal })

      card.addEventListener('focus', () => {
        activateSpotlight(card)
        playCardVideo(card)
      }, { signal })
      card.addEventListener('blur', () => {
        scheduleClear(card)
        stopCardVideo(card)
      }, { signal })
      card.addEventListener('click', (e) => {
        e.preventDefault()
        hardClearSpotlight()
        openSheet(card.getAttribute('data-id'))
      }, { signal })
    })
  }

  const renderLayout = (layout) => {
    clearSpotlight()
    layoutState = layout
    const { rows, contentWidth, rowHeight, gap } = layout
    track.style.width = `${contentWidth}px`
    track.style.setProperty('--pj-row-h', `${rowHeight}px`)
    track.style.setProperty('--pj-gap', `${gap}px`)

    track.innerHTML = rows.map((row) => {
      const cards = row.items.map(cardHtml).join('')
      return `<div class="pj-row" style="height:${rowHeight}px;padding-left:${row.lead}px;padding-right:${row.trail}px;gap:${gap}px">${cards}</div>`
    }).join('')

    hydrateImages(track)
    io.disconnect()
    track.querySelectorAll('.pj-card').forEach((el) => io.observe(el))
    bindCards()
  }

  const measureAndLayout = () => {
    const rect = scroller.getBoundingClientRect()
    const next = layoutCollage(GALLERY, {
      width: rect.width || scroller.clientWidth,
      height: rect.height || scroller.clientHeight,
    })
    if (!shouldRelayout(layoutState, next) && track.children.length) return
    const scrollRatio = scroller.scrollWidth
      ? scroller.scrollLeft / Math.max(1, scroller.scrollWidth)
      : 0
    renderLayout(next)
    requestAnimationFrame(() => {
      scroller.scrollLeft = scrollRatio * scroller.scrollWidth
    })
  }

  const ro = new ResizeObserver(() => {
    if (signal.aborted) return
    requestAnimationFrame(measureAndLayout)
  })
  ro.observe(scroller)

  // ── Scroll / drag (art + empty track only — never on project cards) ────────
  // Capture phase so trackpad wheel still works while hovering project cards.
  collage.addEventListener('wheel', (e) => {
    if (sheetOpen) return
    if (!collage.contains(e.target)) return
    const max = scroller.scrollWidth - scroller.clientWidth
    if (max <= 0) return

    // Prefer native horizontal; otherwise map vertical trackpad/mouse to X
    let dx = e.deltaX
    let dy = e.deltaY
    // deltaMode 1 = lines (mouse wheels) — scale up
    if (e.deltaMode === 1) { dx *= 16; dy *= 16 }
    if (e.deltaMode === 2) { dx *= scroller.clientWidth; dy *= scroller.clientHeight }

    const dominant = Math.abs(dx) > Math.abs(dy) ? dx : dy
    if (!dominant) return

    const atStart = scroller.scrollLeft <= 0
    const atEnd = scroller.scrollLeft >= max - 1
    if ((dominant < 0 && atStart) || (dominant > 0 && atEnd)) return

    e.preventDefault()
    // Only drop spotlight on a deliberate scroll, not trackpad jitter
    if (spotlight && Math.abs(dominant) > 24) clearSpotlight()
    scroller.scrollLeft += dominant
  }, { signal, passive: false, capture: true })

  const stopMomentum = () => {
    cancelAnimationFrame(momentumId)
    momentumId = 0
    vel = 0
  }

  const tickMomentum = () => {
    if (Math.abs(vel) < 0.25) {
      stopMomentum()
      return
    }
    scroller.scrollLeft += vel
    vel *= 0.92
    momentumId = requestAnimationFrame(tickMomentum)
  }

  scroller.addEventListener('pointerdown', (e) => {
    if (sheetOpen || e.button !== 0) return
    if (e.target.closest('.pj-sheet, .pj-sheet-scrim')) return
    // Project cards own their click — do not start drag / capture
    if (e.target.closest('.pj-card--project')) return
    stopMomentum()
    drag = {
      id: e.pointerId,
      x: e.clientX,
      scroll: scroller.scrollLeft,
      moved: false,
      captured: false,
      lastX: e.clientX,
      lastT: performance.now(),
    }
  }, { signal })

  scroller.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return
    const dx = e.clientX - drag.x
    if (!drag.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      drag.moved = true
      try {
        scroller.setPointerCapture(e.pointerId)
        drag.captured = true
      } catch { /* ignore */ }
      scroller.classList.add('is-dragging')
    }
    scroller.scrollLeft = drag.scroll - dx
    const now = performance.now()
    const dt = Math.max(8, now - drag.lastT)
    vel = ((drag.lastX - e.clientX) / dt) * 14
    drag.lastX = e.clientX
    drag.lastT = now
  }, { signal })

  const endDrag = (e) => {
    if (!drag || (e.pointerId != null && e.pointerId !== drag.id)) return
    const didDrag = drag.moved
    drag = null
    scroller.classList.remove('is-dragging')
    if (didDrag && !REDUCE && Math.abs(vel) > 0.4) {
      momentumId = requestAnimationFrame(tickMomentum)
    } else {
      vel = 0
    }
  }

  scroller.addEventListener('pointerup', endDrag, { signal })
  scroller.addEventListener('pointercancel', endDrag, { signal })

  // ── Keyboard ──────────────────────────────────────────────────────────────
  const projectCards = () => [...track.querySelectorAll('.pj-card--project')]

  const focusCard = (i) => {
    const cards = projectCards()
    if (!cards.length) return
    const idx = ((i % cards.length) + cards.length) % cards.length
    const el = cards[idx]
    el.focus({ preventScroll: true })
    el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: REDUCE ? 'auto' : 'smooth' })
  }

  collage.addEventListener('keydown', (e) => {
    if (sheetOpen) return
    const cards = projectCards()
    const active = document.activeElement
    const i = cards.indexOf(active)

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      focusCard(i < 0 ? 0 : i + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      focusCard(i < 0 ? 0 : i - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusCard(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusCard(cards.length - 1)
    } else if ((e.key === 'Enter' || e.key === ' ') && active?.classList?.contains('pj-card--project')) {
      e.preventDefault()
      openSheet(active.getAttribute('data-id'))
    }
  }, { signal })

  // Capture so sheet Esc wins over the global panel-close handler
  document.addEventListener('keydown', (e) => {
    if (!sheetOpen || e.key !== 'Escape') return
    e.preventDefault()
    e.stopPropagation()
    closeSheet()
  }, { signal, capture: true })

  if (COARSE) collage.classList.add('is-coarse')
  if (REDUCE) collage.classList.add('is-reduce')

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      measureAndLayout()
    })
  })
}

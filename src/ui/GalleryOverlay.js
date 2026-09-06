// The Doodle Wall — what you find when you look through the telescope.
//
// A collage of drawings anyone has left, plus one big invitation to add your
// own. The wall is deliberately dumb: fetch, render, done. Everything about
// storage lives in gallery/galleryApi.js.
import { svgIcon } from './icons.js'
import { fetchDoodles, reportDoodle } from '../gallery/galleryApi.js'

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))
}

function ago(ts) {
  const s = Math.max(0, (Date.now() - Number(ts)) / 1000)
  if (s < 90)      return 'just now'
  if (s < 3600)    return `${Math.round(s / 60)}m ago`
  if (s < 86400)   return `${Math.round(s / 3600)}h ago`
  if (s < 2592000) return `${Math.round(s / 86400)}d ago`
  return `${Math.round(s / 2592000)}mo ago`
}

export class GalleryOverlay {
  constructor() {
    /** Set by main.js — opens the drawing pad. */
    this.onDraw  = null
    /** Fired whenever the wall closes for real. */
    this.onClose = null

    this._items   = []
    this._loaded  = false
    this._offline = false
    this._newId   = null
    this._lastFocus = null
    // Just-posted drawings, held until the server actually lists them. The GET
    // is edge-cached for ~10s, so the refetch right after a post comes back
    // without the new drawing and would otherwise wipe it off the wall.
    this._pending = new Map()

    this._build()
  }

  _build() {
    const el = document.createElement('div')
    el.id        = 'gallery-overlay'
    el.className = 'overlay-modal'
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-labelledby', 'dg-title')

    el.innerHTML = `
      <div class="overlay-inner dg-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="dg-title">
            ${svgIcon('telescope', 18)} The Doodle Wall
          </span>
          <button class="overlay-x" id="dg-close" type="button" aria-label="Close the wall">✕</button>
        </div>
        <p class="overlay-sub">
          Scribbles left by whoever wandered past the telescope.
          <span class="dg-offline" id="dg-offline" hidden>offline here, only you can see these</span>
        </p>

        <div class="dg-body">
          <div class="dg-wall" id="dg-wall" aria-live="polite">
            <div class="dg-state" id="dg-state">loading the wall...</div>
            <div class="dg-grid" id="dg-grid"></div>
          </div>

          <aside class="dg-cta">
            <div class="dg-cta-art" aria-hidden="true">
              <span class="dg-cta-paper"></span>
              ${svgIcon('pencil', 30)}
            </div>
            <h3 class="dg-cta-title">Draw your one</h3>
            <p class="dg-cta-sub">Blank paper, a few pens, no rules. Takes a minute.</p>
            <button class="dg-cta-btn" id="dg-draw" type="button">Grab a pen</button>
            <p class="dg-cta-foot">sign it, or stay a ghost</p>
          </aside>
        </div>
      </div>

      <div class="dg-light" id="dg-light" hidden>
        <button class="dg-light-x" id="dg-light-x" type="button" aria-label="Close preview">✕</button>
        <figure class="dg-light-fig">
          <img id="dg-light-img" alt="">
          <figcaption id="dg-light-cap"></figcaption>
        </figure>
      </div>
    `

    document.body.appendChild(el)
    this._el     = el
    this._grid   = el.querySelector('#dg-grid')
    this._state  = el.querySelector('#dg-state')
    this._light  = el.querySelector('#dg-light')
    this._lightImg = el.querySelector('#dg-light-img')
    this._lightCap = el.querySelector('#dg-light-cap')

    el.querySelector('#dg-close').addEventListener('click', () => this.close())
    el.querySelector('#dg-draw').addEventListener('click', () => this.onDraw?.())
    el.addEventListener('click', e => { if (e.target === el) this.close() })

    el.querySelector('#dg-light-x').addEventListener('click', () => this._closeLight())
    this._light.addEventListener('click', e => { if (e.target === this._light) this._closeLight() })

    // One delegated handler for the whole grid — cards come and go on refresh
    this._grid.addEventListener('click', e => this._onGridClick(e))
  }

  // ── Rendering ─────────────────────────────────────────────────────────────

  _render() {
    if (!this._loaded) {
      this._state.textContent = 'loading the wall...'
      this._state.hidden = false
      this._grid.replaceChildren()
      return
    }

    if (!this._items.length) {
      this._state.innerHTML = `<strong>nothing here yet.</strong><br>be the first one on the wall.`
      this._state.hidden = false
      this._grid.replaceChildren()
      return
    }

    this._state.hidden = true
    this._grid.innerHTML = this._items.map(d => {
      const who = d.name ? esc(d.name) : 'anonymous'
      return `
        <figure class="dg-card${d.id === this._newId ? ' is-new' : ''}" data-id="${esc(d.id)}">
          <button class="dg-card-open" type="button" data-open="${esc(d.id)}"
                  aria-label="Open ${who}'s drawing">
            <img src="${esc(d.url)}" alt="Drawing by ${who}" loading="lazy" decoding="async">
          </button>
          <figcaption class="dg-card-meta">
            <span class="dg-card-who${d.name ? '' : ' is-anon'}">${who}</span>
            <span class="dg-card-when">${ago(d.at)}</span>
          </figcaption>
          <button class="dg-flag" type="button" data-flag="${esc(d.id)}"
                  title="Report this" aria-label="Report this drawing">${svgIcon('flag', 13)}</button>
        </figure>
      `
    }).join('')
  }

  _onGridClick(e) {
    const flag = e.target.closest('[data-flag]')
    if (flag) {
      e.stopPropagation()
      this._handleFlag(flag)
      return
    }
    const open = e.target.closest('[data-open]')
    if (open) this._openLight(open.dataset.open)
  }

  async _handleFlag(btn) {
    // Two taps: the first arms it, so a stray click never nukes someone's art
    if (btn.dataset.armed !== '1') {
      btn.dataset.armed = '1'
      btn.classList.add('is-armed')
      btn.textContent = 'sure?'
      setTimeout(() => {
        if (btn.dataset.armed !== '1') return
        btn.dataset.armed = '0'
        btn.classList.remove('is-armed')
        btn.innerHTML = svgIcon('flag', 13)
      }, 3200)
      return
    }

    const id = btn.dataset.flag
    btn.disabled = true
    btn.textContent = 'sent'
    await reportDoodle(id)
    const card = btn.closest('.dg-card')
    if (card) {
      card.classList.add('is-gone')
      setTimeout(() => {
        this._pending.delete(id)
        this._items = this._items.filter(d => d.id !== id)
        this._render()
      }, 260)
    }
  }

  // ── Lightbox ──────────────────────────────────────────────────────────────

  _openLight(id) {
    const d = this._items.find(x => x.id === id)
    if (!d) return
    const who = d.name ? d.name : 'anonymous'
    this._lightImg.src = d.url
    this._lightImg.alt = `Drawing by ${who}`
    this._lightCap.textContent = `${who}  ·  ${ago(d.at)}`
    this._light.hidden = false
    queueMicrotask(() => this._el.querySelector('#dg-light-x')?.focus())
  }

  _closeLight() {
    this._light.hidden = true
    this._lightImg.removeAttribute('src')
  }

  _isLightOpen() { return !this._light.hidden }

  // ── Data ──────────────────────────────────────────────────────────────────

  async refresh() {
    const { items, offline } = await fetchDoodles()

    // Anything the server now knows about stops being pending.
    for (const d of items) this._pending.delete(d.id)
    const stillPending = [...this._pending.values()]
      .filter(d => !items.some(x => x.id === d.id))

    this._items   = [...stillPending, ...items].sort((a, b) => b.at - a.at)
    this._offline = offline
    this._loaded  = true
    this._el.querySelector('#dg-offline').hidden = !offline
    this._render()
  }

  /** Called after a post so the new drawing shows up without a full reload. */
  addLocal(item) {
    this._newId = item.id
    this._pending.set(item.id, item)
    this._items = [item, ...this._items.filter(d => d.id !== item.id)]
    this._loaded = true
    this._render()
    // Then reconcile with the server so ordering and flags stay honest
    this.refresh().catch(() => {})
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  open() {
    this._lastFocus = document.activeElement
    this._el.classList.add('is-open')
    queueMicrotask(() => this._el.querySelector('#dg-close')?.focus())
    this.refresh().catch(() => {
      this._loaded = true
      this._render()
    })
  }

  close() {
    // Esc / ✕ peels the lightbox off first, the wall stays put
    if (this._isLightOpen()) { this._closeLight(); return }
    if (!this.isOpen()) return
    this._el.classList.remove('is-open')
    this._newId = null
    if (this._lastFocus?.focus) this._lastFocus.focus()
    this.onClose?.()
  }

  isOpen() { return this._el.classList.contains('is-open') }
}

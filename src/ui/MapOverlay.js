import { ISLANDS } from '../data/content.js'

// Escape user/data text before injecting via innerHTML — defense-in-depth even
// though `content.js` is currently author-controlled.
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))
}

export class MapOverlay {
  constructor(onTeleport) {
    this._onTeleport = onTeleport
    this._visited    = new Set()
    this._lastFocus  = null
    this._build()
  }

  _build() {
    const el = document.createElement('div')
    el.id        = 'map-overlay'
    el.className = 'overlay-modal'
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-labelledby', 'map-title')

    const cardsHTML = Object.entries(ISLANDS).map(([key, isl]) => `
      <div class="map-card" data-island="${esc(key)}" style="--ic:${esc(isl.color)}">
        <div class="map-visited-badge" aria-hidden="true">✓ visited</div>
        <div class="map-card-icon" aria-hidden="true">${esc(isl.icon)}</div>
        <div class="map-card-name">${esc(isl.name)}</div>
        <div class="map-card-section">${esc(isl.section)}</div>
        <button class="map-card-btn" type="button" data-teleport="${esc(key)}"
                aria-label="Teleport to ${esc(isl.name)}">Teleport</button>
      </div>
    `).join('')

    el.innerHTML = `
      <div class="overlay-inner map-overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="map-title">🗺&nbsp; World Map</span>
          <button class="overlay-x" id="map-close" type="button" aria-label="Close map">✕</button>
        </div>
        <p class="overlay-sub">Walk to explore, or teleport directly to any island</p>
        <div class="map-grid">${cardsHTML}</div>
      </div>
    `

    el.querySelector('#map-close').addEventListener('click', () => this.close())
    el.addEventListener('click', e => { if (e.target === el) this.close() })

    el.querySelectorAll('[data-teleport]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation()
        this.close()
        this._onTeleport(btn.dataset.teleport)
      })
    })

    document.body.appendChild(el)
    this._el = el
  }

  open() {
    this._lastFocus = document.activeElement
    this._el.classList.add('is-open')
    queueMicrotask(() => this._el.querySelector('#map-close')?.focus())
  }
  close() {
    this._el.classList.remove('is-open')
    if (this._lastFocus && typeof this._lastFocus.focus === 'function') this._lastFocus.focus()
  }
  isOpen() { return this._el.classList.contains('is-open') }
  toggle() { this.isOpen() ? this.close() : this.open() }

  markVisited(name) {
    if (this._visited.has(name)) return
    this._visited.add(name)
    const card = this._el.querySelector(`[data-island="${name}"]`)
    if (card) card.classList.add('visited')
  }
}

import { svgIcon } from './icons.js'

const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0

export class UI {
  constructor() {
    // ── Approach prompt (bottom-center capsule) ─────────────────────────────────
    this._popup = document.createElement('div')
    this._popup.id = 'island-popup'
    this._popup.className = 'hidden'
    this._popup.innerHTML = `
      <div class="pu-halo" aria-hidden="true"></div>
      <div class="pu-inner">
        <span class="pu-icon"></span>
        <div class="pu-names">
          <div class="pu-island"></div>
          <div class="pu-section"></div>
        </div>
        <div class="pu-key">
          <span class="pu-pulse" aria-hidden="true"></span>
          <span class="pu-keycap"></span>
          <span class="pu-key-label"></span>
        </div>
      </div>
    `
    document.body.appendChild(this._popup)

    // Tappable / clickable — fires onPopupTap callback
    this._popup.addEventListener('click', () => { this.onPopupTap?.() })
    this._popup.addEventListener('touchend', e => {
      e.preventDefault()   // prevent ghost click on canvas behind
      this.onPopupTap?.()
    }, { passive: false })

    // ── Fullscreen world panel ──────────────────────────────────────────────────
    this._panel    = document.getElementById('world-panel')
    this._icon     = document.getElementById('wp-icon')
    this._eyebrow  = document.getElementById('wp-eyebrow')
    this._title    = document.getElementById('wp-title')
    this._content  = document.getElementById('wp-content')
    this._halo     = this._panel.querySelector('.wp-halo')
    this._closeBtn = document.getElementById('wp-close')
    this._closeBtn.innerHTML = svgIcon('close', 18, 2)
    this._closeBtn.addEventListener('click', () => this._requestClose())

    // Click the dimmed backdrop (outside the card) to dismiss
    this._panel.addEventListener('click', e => {
      if (e.target === this._panel || (e.target.classList && e.target.classList.contains('wp-scrim'))) {
        this._requestClose()
      }
    })

    this._closeTimer = null

    // ── Callbacks (set from main.js) ────────────────────────────────────────────
    this.onPopupTap   = null   // approach prompt tapped
    this.onClosePanel = null   // ✕ / backdrop / Esc — keeps game state in sync

    // Hide legacy HUD elements
    const badge = document.getElementById('landmark-badge')
    const hint  = document.getElementById('hint-text')
    if (badge) badge.style.display = 'none'
    if (hint)  hint.style.display  = 'none'
  }

  // ── Approach prompt ──────────────────────────────────────────────────────────
  showPopup(island) {
    this._popup.querySelector('.pu-icon').innerHTML      = svgIcon(island.iconKey, 22)
    this._popup.querySelector('.pu-island').textContent  = island.name
    this._popup.querySelector('.pu-section').textContent = island.section
    this._popup.style.setProperty('--ic', island.color)

    const keycap = this._popup.querySelector('.pu-keycap')
    const label  = this._popup.querySelector('.pu-key-label')
    if (IS_TOUCH) {
      // A "tap target" glyph instead of a keyboard key
      keycap.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/></svg>`
      keycap.classList.add('pu-keycap--tap')
      label.textContent = 'Tap'
    } else {
      keycap.textContent = 'E'
      keycap.classList.remove('pu-keycap--tap')
      label.textContent = 'Explore'
    }

    this._popup.classList.remove('hidden')
  }

  hidePopup() {
    this._popup.classList.add('hidden')
  }

  // ── World panel ──────────────────────────────────────────────────────────────
  openPanel(island) {
    if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null }

    this._icon.innerHTML      = svgIcon(island.iconKey, 26)
    this._eyebrow.textContent = island.section
    this._title.textContent   = island.name
    this._content.innerHTML   = typeof island.html === 'function' ? island.html() : island.html
    this._content.scrollTop   = 0
    this._panel.style.setProperty('--ic', island.color)

    // Per-island layout variant → card modifier class (e.g. 'wide', 'projects')
    const card = this._panel.querySelector('.wp-card')
    card.className = 'wp-card' + (island.variant ? ` wp--${island.variant}` : '')

    this._panel.classList.remove('hidden', 'is-closing')
    void this._panel.offsetWidth   // reflow so the open transition plays
    this._panel.classList.add('is-open')

    // Run the island's custom JS (carousel, form, travel stats…) after mount
    island.init?.(this._content)
  }

  // ✕ / backdrop / Esc → route through main so islandUIState resyncs + popup returns
  _requestClose() {
    if (this.onClosePanel) this.onClosePanel()
    else this.closePanel()
  }

  closePanel() {
    if (!this._panel.classList.contains('is-open')) {
      this._panel.classList.add('hidden')
      return
    }
    this._panel.classList.remove('is-open')
    this._panel.classList.add('is-closing')
    this._closeTimer = setTimeout(() => {
      this._panel.classList.add('hidden')
      this._panel.classList.remove('is-closing')
      this._closeTimer = null
    }, 320)
  }

  isPanelOpen() {
    return this._panel.classList.contains('is-open')
  }
}

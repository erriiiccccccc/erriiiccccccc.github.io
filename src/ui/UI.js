const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0

export class UI {
  constructor() {
    // ── Island popup ──────────────────────────────────────────────────────────
    this._popup = document.createElement('div')
    this._popup.id = 'island-popup'
    this._popup.className = 'hidden'
    this._popup.innerHTML = `
      <div class="pu-top">
        <span class="pu-icon"></span>
        <div class="pu-names">
          <div class="pu-island"></div>
          <div class="pu-section"></div>
        </div>
      </div>
      <div class="pu-cta"></div>
    `
    document.body.appendChild(this._popup)

    // Tappable / clickable — fires onPopupTap callback
    this._popup.addEventListener('click', () => { this.onPopupTap?.() })
    this._popup.addEventListener('touchend', e => {
      e.preventDefault()   // prevent ghost click on canvas behind
      this.onPopupTap?.()
    }, { passive: false })

    // ── Detail panel (HTML) ────────────────────────────────────────────────────
    this._panel      = document.getElementById('detail-panel')
    this._header     = document.getElementById('detail-header')
    this._icon       = document.getElementById('detail-icon')
    this._islandLbl  = document.getElementById('detail-island-label')
    this._title      = document.getElementById('detail-title')
    this._content    = document.getElementById('detail-content')
    this._closeBtn   = document.getElementById('detail-close')
    this._closeBtn.addEventListener('click', () => this.closePanel())

    // ── Callback ──────────────────────────────────────────────────────────────
    /** Set from main.js to handle popup tap / touch */
    this.onPopupTap = null

    // Hide legacy elements
    const badge = document.getElementById('landmark-badge')
    const hint  = document.getElementById('hint-text')
    if (badge) badge.style.display = 'none'
    if (hint)  hint.style.display  = 'none'
  }

  // ── Popup ──────────────────────────────────────────────────────────────────
  showPopup(island) {
    this._popup.querySelector('.pu-icon').textContent    = island.icon
    this._popup.querySelector('.pu-island').textContent  = island.name
    this._popup.querySelector('.pu-section').textContent = island.section
    this._popup.style.setProperty('--ic', island.color)

    // CTA text — keyboard hint on desktop, tap affordance on mobile
    const cta = this._popup.querySelector('.pu-cta')
    if (IS_TOUCH) {
      cta.innerHTML = '<span class="pu-tap-hint">Tap to explore →</span>'
    } else {
      cta.innerHTML = '<kbd>E</kbd> to explore'
    }

    this._popup.classList.remove('hidden')
  }

  hidePopup() {
    this._popup.classList.add('hidden')
  }

  // ── Detail panel ───────────────────────────────────────────────────────────
  openPanel(island) {
    this._icon.textContent       = island.icon
    this._islandLbl.textContent  = island.name
    this._title.textContent      = island.section
    this._content.innerHTML      = island.html
    this._panel.style.setProperty('--ic', island.color)

    // Tint the header with the island color (parse hex → rgba)
    if (this._header) {
      const hex = island.color.replace('#', '')
      const r   = parseInt(hex.slice(0, 2), 16)
      const g   = parseInt(hex.slice(2, 4), 16)
      const b   = parseInt(hex.slice(4, 6), 16)
      this._header.style.background =
        `linear-gradient(135deg, rgba(${r},${g},${b},0.18) 0%, rgba(${r},${g},${b},0.04) 55%, transparent 100%)`
    }

    this._panel.classList.remove('hidden')
  }

  closePanel() {
    this._panel.classList.add('hidden')
  }

  isPanelOpen() {
    return !this._panel.classList.contains('hidden')
  }
}

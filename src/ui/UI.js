import { svgIcon } from './icons.js'
import { takePanelBody, hasPanelCached } from '../data/content.js'
import { isPerfEnabled, perfMark, perfMeasure } from '../loading/perfLog.js'

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

    this._popup.addEventListener('click', () => { this.onPopupTap?.() })
    this._popup.addEventListener('touchend', e => {
      e.preventDefault()
      this.onPopupTap?.()
    }, { passive: false })

    // ── Secondary prompt (stacks above the island capsule) ─────────────────────
    // For things worth finding *on* an island, so the island's own prompt keeps
    // its meaning and this one reads as the extra.
    this._sub = document.createElement('div')
    this._sub.id = 'sub-popup'
    this._sub.className = 'hidden'
    this._sub.innerHTML = `
      <div class="sp-inner">
        <span class="sp-spark" aria-hidden="true"></span>
        <span class="sp-icon"></span>
        <div class="sp-names">
          <div class="sp-title"></div>
          <div class="sp-sub"></div>
        </div>
        <div class="sp-key">
          <span class="sp-keycap"></span>
        </div>
      </div>
    `
    document.body.appendChild(this._sub)
    this._sub.addEventListener('click', () => { this.onSubPopupTap?.() })
    this._sub.addEventListener('touchend', e => {
      e.preventDefault()
      this.onSubPopupTap?.()
    }, { passive: false })

    this._panel    = document.getElementById('world-panel')
    this._icon     = document.getElementById('wp-icon')
    this._eyebrow  = document.getElementById('wp-eyebrow')
    this._title    = document.getElementById('wp-title')
    this._content  = document.getElementById('wp-content')
    this._halo     = this._panel.querySelector('.wp-halo')
    this._closeBtn = document.getElementById('wp-close')
    this._closeBtn.innerHTML = svgIcon('close', 18, 2)
    this._closeBtn.addEventListener('click', () => this._requestClose())

    this._panel.addEventListener('click', e => {
      if (e.target === this._panel || (e.target.classList && e.target.classList.contains('wp-scrim'))) {
        this._requestClose()
      }
    })

    this._closeTimer = null
    this._openGen = 0
    this.onPopupTap    = null
    this.onSubPopupTap = null
    this.onClosePanel  = null

    const badge = document.getElementById('landmark-badge')
    const hint  = document.getElementById('hint-text')
    if (badge) badge.style.display = 'none'
    if (hint)  hint.style.display  = 'none'
  }

  showPopup(island) {
    this._popup.querySelector('.pu-icon').innerHTML      = svgIcon(island.iconKey, 22)
    this._popup.querySelector('.pu-island').textContent  = island.name
    this._popup.querySelector('.pu-section').textContent = island.section
    this._popup.style.setProperty('--ic', island.color)

    const keycap = this._popup.querySelector('.pu-keycap')
    const label  = this._popup.querySelector('.pu-key-label')
    if (IS_TOUCH) {
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

  /**
   * Secondary prompt for a point of interest sitting on the active island.
   * @param {{ iconKey: string, title: string, sub: string, color: string, keycap: string }} cfg
   */
  showSubPopup({ iconKey, title, sub, color, keycap }) {
    this._sub.querySelector('.sp-icon').innerHTML   = svgIcon(iconKey, 18)
    this._sub.querySelector('.sp-title').textContent = title
    this._sub.querySelector('.sp-sub').textContent   = sub
    this._sub.style.setProperty('--ic', color)

    const cap = this._sub.querySelector('.sp-keycap')
    if (IS_TOUCH) {
      cap.textContent = 'Tap'
      cap.classList.add('sp-keycap--tap')
    } else {
      cap.textContent = keycap
      cap.classList.remove('sp-keycap--tap')
    }

    this._sub.classList.remove('hidden')
  }

  hideSubPopup() {
    this._sub.classList.add('hidden')
  }

  /**
   * @param {object} island
   * @param {string} cacheKey ISLANDS registry key (e.g. arctic_island)
   */
  openPanel(island, cacheKey) {
    if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null }
    this._openGen += 1
    const gen = this._openGen

    this._icon.innerHTML      = svgIcon(island.iconKey, 26)
    this._eyebrow.textContent = island.section
    this._title.textContent   = island.name
    this._panel.style.setProperty('--ic', island.color)

    const card = this._panel.querySelector('.wp-card')
    card.className = 'wp-card' + (island.variant ? ` wp--${island.variant}` : '')

    const key = cacheKey || island.section
    const init = island.init
    this._content.scrollTop = 0

    const perfKey = `panel_open_${key}`
    if (isPerfEnabled()) perfMark(`${perfKey}_start`)

    if (hasPanelCached(key)) {
      // Warm cache: mount body same frame as chrome (clone = no HTML parse hitch)
      const body = takePanelBody(key, island)
      this._content.replaceChildren(body)
      this._panel.classList.remove('hidden', 'is-closing')
      void this._panel.offsetWidth
      this._panel.classList.add('is-open')
      requestAnimationFrame(() => {
        if (gen !== this._openGen) return
        init?.(this._content)
        if (isPerfEnabled()) {
          perfMark(`${perfKey}_end`)
          perfMeasure(perfKey, `${perfKey}_start`, `${perfKey}_end`)
        }
      })
      return
    }

    // Cold path: chrome first, parse+cache next frame, init the frame after
    this._content.replaceChildren()
    this._panel.classList.remove('hidden', 'is-closing')
    void this._panel.offsetWidth
    this._panel.classList.add('is-open')

    requestAnimationFrame(() => {
      if (gen !== this._openGen) return
      const body = takePanelBody(key, island)
      this._content.replaceChildren(body)
      this._content.scrollTop = 0
      requestAnimationFrame(() => {
        if (gen !== this._openGen) return
        init?.(this._content)
      })
    })
  }

  _requestClose() {
    if (this.onClosePanel) this.onClosePanel()
    else this.closePanel()
  }

  closePanel() {
    if (!this._panel.classList.contains('is-open')) {
      this._panel.classList.add('hidden')
      return
    }
    // Tear down island listeners/observers immediately (videos, IO, etc.)
    this._content._disposeIsland?.()
    this._content._disposeIsland = null
    this._panel.classList.remove('is-open')
    this._panel.classList.add('is-closing')
    this._closeTimer = setTimeout(() => {
      this._panel.classList.add('hidden')
      this._panel.classList.remove('is-closing')
      // Drop live nodes; templates stay in the island cache for the next open
      this._content.replaceChildren()
      this._closeTimer = null
    }, 320)
  }

  isPanelOpen() {
    return this._panel.classList.contains('is-open')
  }
}

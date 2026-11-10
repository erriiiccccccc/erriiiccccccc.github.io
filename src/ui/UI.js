import { svgIcon } from './icons.js'
import { takePanelBody, hasPanelCached } from '../data/content.js'
import { isPerfEnabled, perfMark, perfMeasure } from '../loading/perfLog.js'
import { ShellDirector } from './panelShells.js'

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
    this._card     = this._panel.querySelector('.wp-card')
    this._icon     = document.getElementById('wp-icon')
    this._eyebrow  = document.getElementById('wp-eyebrow')
    this._title    = document.getElementById('wp-title')
    this._content  = document.getElementById('wp-content')
    this._halo     = this._panel.querySelector('.wp-halo')
    this._closeBtn = document.getElementById('wp-close')
    this._prevBtn  = document.getElementById('wp-prev')
    this._nextBtn  = document.getElementById('wp-next')
    this._closeBtn.innerHTML = svgIcon('close', 18, 2)
    this._prevBtn.innerHTML  = svgIcon('chevronLeft', 18, 2)
    this._nextBtn.innerHTML  = svgIcon('chevronRight', 18, 2)
    this._closeBtn.addEventListener('click', () => this._requestClose())
    this._prevBtn.addEventListener('click', () => this.onHop?.(-1))
    this._nextBtn.addEventListener('click', () => this.onHop?.(1))
    this._panel.classList.toggle('is-touch', IS_TOUCH)
    // Focus lands on the card itself (not a button) so keyboard and screen
    // reader users are inside the dialog without a focus ring popping on ✕.
    this._card.tabIndex = -1

    this._panel.addEventListener('click', e => {
      if (e.target === this._panel || (e.target.classList && e.target.classList.contains('wp-scrim'))) {
        this._requestClose()
      }
    })

    this._shells = new ShellDirector(this._panel)
    this._shell  = 'card'
    this._order  = []      // island keys in hop order, set by main.js once the world loads
    this._openGen = 0
    this.onPopupTap    = null
    this.onSubPopupTap = null
    this.onClosePanel  = null
    /** (dir: -1 | 1) => void, the ‹ › buttons and arrow keys */
    this.onHop         = null
    /** (phase: 'open' | 'close', shell: string, card: HTMLElement) => void, world-side effects */
    this.onShell       = null

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
      label.textContent = 'Dive in'
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
  /** Island keys in the order ‹ › walks them; also drives the "02 / 06" label. */
  setIslandOrder(keys) {
    this._order = keys.slice()
  }

  openPanel(island, cacheKey) {
    this._openGen += 1
    const gen = this._openGen
    const key = cacheKey || island.section

    // Chrome: eyebrow says where you are, the title says what this is.
    const pos   = this._order.indexOf(key)
    const total = this._order.length
    const pad   = n => String(n).padStart(2, '0')
    this._icon.innerHTML      = svgIcon(island.iconKey, 14, 2)
    this._eyebrow.textContent = pos >= 0 ? `${pad(pos + 1)} / ${pad(total)} · ${island.name}` : island.name
    this._title.textContent   = island.section
    this._panel.style.setProperty('--ic', island.color)
    this._panel.classList.toggle('no-hop', total < 2 || pos < 0)

    this._shell = island.shell || 'card'
    this._panel.dataset.shell = this._shell
    this._card.className = 'wp-card' + (island.variant ? ` wp--${island.variant}` : '')

    const init = island.init
    this._content.scrollTop = 0

    const perfKey = `panel_open_${key}`
    if (isPerfEnabled()) perfMark(`${perfKey}_start`)

    if (hasPanelCached(key)) {
      // Warm cache: mount body same frame as chrome (clone = no HTML parse hitch)
      const body = takePanelBody(key, island)
      this._content.replaceChildren(body)
      this._show(gen)
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
    this._show(gen)

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

  /** Reveal the panel and run its shell's entrance. */
  _show(gen) {
    this._panel.classList.remove('hidden', 'is-closing')
    this._panel.classList.add('is-open')
    this._shells.enter(this._shell)
    this.onShell?.('open', this._shell, this._card)
    requestAnimationFrame(() => {
      if (gen === this._openGen) this._card.focus({ preventScroll: true })
    })
  }

  _requestClose() {
    if (this.onClosePanel) this.onClosePanel()
    else this.closePanel()
  }

  closePanel() {
    if (!this._panel.classList.contains('is-open')) {
      // Already on its way out: let that exit finish rather than cut it.
      if (!this._panel.classList.contains('is-closing')) this._panel.classList.add('hidden')
      return
    }
    const gen = this._openGen
    // Island teardown (videos, observers) waits until the exit has played, so
    // nothing blanks out while the panel is still on screen.
    const dispose = this._content._disposeIsland
    this._content._disposeIsland = null
    this._panel.classList.remove('is-open')
    this._panel.classList.add('is-closing')
    if (this._card.contains(document.activeElement)) document.activeElement.blur()
    this.onShell?.('close', this._shell, this._card)
    this._shells.exit(this._shell).then(() => {
      dispose?.()
      if (gen !== this._openGen) return     // reopened while closing: the new open owns the panel
      this._panel.classList.add('hidden')
      this._panel.classList.remove('is-closing')
      this._shells.stop()
      // Drop live nodes; templates stay in the island cache for the next open
      this._content.replaceChildren()
    })
  }

  isPanelOpen() {
    return this._panel.classList.contains('is-open')
  }
}

import { svgIcon } from './icons.js'
import { takePanelBody, hasPanelCached } from '../data/content.js'
import { isPerfEnabled, perfMark, perfMeasure } from '../loading/perfLog.js'
import { ShellDirector } from './panelShells.js'

const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0
/** Shells whose card fills the screen with an opaque background (see overlay.css): while one is fully
 *  in, the world behind it isn't drawn (main.js reads ui.worldCovered). */
const COVERS_WORLD = new Set(['cinema'])

// Which keycap and which arrival each island's title card gets
const PROMPT_LOOK = {
  meadow_island: 'meadow', lava_island: 'lava', desert_island: 'desert',
  arctic_island: 'arctic', mountain_island: 'mountain', pirate_ship: 'pirate',
}
const pad2 = n => String(n).padStart(2, '0')
const escHtml = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
/** One span per letter: --i its order, --o its distance from the middle. */
function letterSpans(text) {
  const chars = [...text], mid = (chars.length - 1) / 2
  return chars.map((ch, i) => `<span class="tc-ch" style="--i:${i};--o:${(i - mid).toFixed(1)}">${escHtml(ch)}</span>`).join('')
}
/**
 * Restart a CSS arrival: the class comes off now and back on next frame. (Reading offsetWidth in
 * between restarts it at once, but forces a layout of the whole page on the spot, which showed up as a
 * stall in the first frame of the zoom into the world.)
 */
function replay(el, cls) {
  el.classList.remove(cls)
  cancelAnimationFrame(el._replayRaf)
  el._replayRaf = requestAnimationFrame(() => el.classList.add(cls))
}

export class UI {
  constructor() {
    /** true while a full-screen shell is fully in (see COVERS_WORLD) */
    this.worldCovered = false
    // ── Island prompt: the title card across the lower third ────────────────
    this._popup = document.createElement('div')
    this._popup.id = 'island-popup'
    this._popup.className = 'hidden'
    this._popup.setAttribute('role', 'button')
    this._popup.innerHTML = `
      <div class="tc-wash" aria-hidden="true"></div>
      <div class="tc-in">
        <div class="tc-eb"></div>
        <div class="tc-ti"><span class="tc-rule l" aria-hidden="true"></span><span class="tc-word"></span><span class="tc-rule r" aria-hidden="true"></span></div>
        <div class="tc-key"><span class="tc-cap"></span><span class="tc-lab"></span></div>
      </div>
    `
    this._popKey = null
    document.body.appendChild(this._popup)

    this._popup.addEventListener('click', () => { this.onPopupTap?.() })
    this._popup.addEventListener('touchend', e => {
      e.preventDefault()
      this.onPopupTap?.()
    }, { passive: false })

    // ── Secondary prompt: one quieter line above, for things found *on* an
    // island, so the island's own card keeps its weight.
    this._sub = document.createElement('div')
    this._sub.id = 'sub-popup'
    this._sub.className = 'hidden'
    this._sub.setAttribute('role', 'button')
    this._sub.innerHTML = `
      <div class="tc-wash" aria-hidden="true"></div>
      <div class="tc-in">
        <div class="tc-ti"><span class="tc-rule l" aria-hidden="true"></span><span class="tc-word"></span><span class="tc-rule r" aria-hidden="true"></span></div>
        <div class="tc-key"><span class="tc-cap"></span></div>
      </div>
    `
    this._subTitle = null
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

  /**
   * Show the island's title card. Arriving at a different island plays its
   * full arrival; coming back to the same one (closing its panel) just fades in.
   * @param {object} island  ISLANDS entry
   * @param {string} key     ISLANDS registry key (e.g. lava_island)
   */
  showPopup(island, key) {
    const p = this._popup
    const pos = this._order.indexOf(key), total = this._order.length
    const fresh = key !== this._popKey
    if (fresh) {
      p.dataset.look = PROMPT_LOOK[key] || 'meadow'
      p.style.setProperty('--ic', island.color)
      p.style.setProperty('--n', [...island.section].length)
      p.querySelector('.tc-eb').textContent = pos >= 0 ? `${pad2(pos + 1)} / ${pad2(total)} · ${island.name}` : island.name
      p.querySelector('.tc-word').innerHTML = letterSpans(island.section)
      p.querySelector('.tc-cap').textContent = IS_TOUCH ? 'Tap' : 'E'
      p.querySelector('.tc-lab').textContent = 'Dive in'
      p.setAttribute('aria-label', `${island.name}: ${IS_TOUCH ? 'tap' : 'press E'} to dive into ${island.section}`)
    }
    this._popKey = key
    p.classList.remove('hidden', 'is-pressed')
    if (fresh) replay(p, 'tc-spawn')
  }

  /** The key sinks the moment E is pressed, then the card fades with it held down. */
  pressPopup() {
    if (this._popup.classList.contains('hidden')) return
    this._popup.classList.add('is-pressed')
    clearTimeout(this._pressT)
    this._pressT = setTimeout(() => this._popup.classList.remove('is-pressed'), 260)
  }

  hidePopup() {
    this._popup.classList.add('hidden')
  }

  /**
   * Secondary prompt for a point of interest sitting on the active island.
   * @param {{ iconKey: string, title: string, sub: string, color: string, keycap: string }} cfg
   */
  showSubPopup({ title, sub, color, keycap }) {
    const p = this._sub
    const fresh = title !== this._subTitle || p.classList.contains('hidden')
    if (title !== this._subTitle) {
      p.style.setProperty('--ic', color)
      p.querySelector('.tc-word').innerHTML = letterSpans(title)
      p.querySelector('.tc-cap').textContent = IS_TOUCH ? 'Tap' : keycap
      p.setAttribute('aria-label', `${title}, ${sub}: ${IS_TOUCH ? 'tap' : 'press ' + keycap}`)
      this._subTitle = title
    }
    p.classList.remove('hidden')
    if (fresh) replay(p, 'tc-spawn')
  }

  /** F pressed: its key sinks too. */
  pressSubPopup() {
    if (this._sub.classList.contains('hidden')) return
    this._sub.classList.add('is-pressed')
    clearTimeout(this._subPressT)
    this._subPressT = setTimeout(() => this._sub.classList.remove('is-pressed'), 260)
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
    this.worldCovered = false            // a hop may swap a full-screen shell for one the world shows around
    this._openGen += 1
    const gen = this._openGen
    const key = cacheKey || island.section

    // Chrome: eyebrow says where you are, the title says what this is.
    const pos   = this._order.indexOf(key)
    const total = this._order.length
    const pad   = n => String(n).padStart(2, '0')
    this._icon.innerHTML      = svgIcon(island.iconKey, 14, 2)
    // the "02 / 06 ·" counter is its own span, so narrow phones can drop it and keep the island's name whole
    this._eyebrow.textContent = ''
    if (pos >= 0) {
      const count = document.createElement('span')
      count.className = 'wp-count'
      count.textContent = `${pad(pos + 1)} / ${pad(total)} · `
      this._eyebrow.append(count)
    }
    this._eyebrow.append(island.name)
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
    // Once a full-screen shell has finished coming in, nothing of the world shows behind it.
    const shell = this._shell
    this.worldCovered = false
    this._shells.enter(shell).then(done => {
      if (done && gen === this._openGen && COVERS_WORLD.has(shell) && this.isPanelOpen()) this.worldCovered = true
    })
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
    this.worldCovered = false            // the world shows again from the first frame of the exit
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

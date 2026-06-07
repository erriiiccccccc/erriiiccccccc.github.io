const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0

export class IntroOverlay {
  constructor() {
    this._lastFocus = null
    this._onKey    = null
    this._onClick  = null
    this._onTouch  = null
    this._build()
  }

  _build() {
    const el = document.createElement('div')
    el.id        = 'intro-overlay'
    el.className = 'overlay-modal'
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-labelledby', 'intro-title')

    el.innerHTML = `
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="intro-title">How to Play</span>
          <button class="overlay-x" id="intro-close" type="button" aria-label="Close intro">✕</button>
        </div>

        <div class="intro-welcome">
          <div class="intro-welcome-icon">🌍</div>
          <h2 class="intro-welcome-title">Welcome to My World</h2>
          <p class="intro-welcome-sub">A little interactive portfolio — explore 6 islands.</p>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${IS_TOUCH ? '' : 'active'}" type="button" role="tab"
                  aria-selected="${!IS_TOUCH}" aria-controls="intro-desktop" id="intro-tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${IS_TOUCH ? 'active' : ''}" type="button" role="tab"
                  aria-selected="${IS_TOUCH}" aria-controls="intro-mobile" id="intro-tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="intro-desktop" class="help-section ${IS_TOUCH ? 'help-hidden' : ''}">
          <div class="help-desktop-layout">

            <div class="help-kb-cluster">
              <p class="help-cluster-label">Movement</p>
              <div class="help-kb-wasd">
                <div class="help-kb-row help-kb-row--top">
                  <div class="hkey hkey--sq">W</div>
                </div>
                <div class="help-kb-row">
                  <div class="hkey hkey--sq">A</div>
                  <div class="hkey hkey--sq">S</div>
                  <div class="hkey hkey--sq">D</div>
                </div>
              </div>
              <div class="help-kb-mods">
                <div class="help-kb-mod-col">
                  <div class="hkey hkey--wide">Shift</div>
                  <span class="help-kb-mod-label">Sprint</span>
                </div>
                <div class="help-kb-mod-col help-kb-mod-col--grow">
                  <div class="hkey hkey--space">Space</div>
                  <span class="help-kb-mod-label">Jump</span>
                </div>
              </div>
            </div>

            <div class="help-divider"></div>

            <div class="help-kb-controls">
              <div class="help-mob-row">
                <div class="help-mob-badge">E</div>
                <span>Open island</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Esc</div>
                <span>Close panel</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">RMB drag</div>
                <span>Rotate camera</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Scroll</div>
                <span>Zoom in / out</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">M</div>
                <span>World Map</span>
              </div>
            </div>

          </div>
          <p class="help-tip">Walk toward a glowing island and press <kbd>E</kbd> to explore it.</p>
        </div>

        <!-- ── MOBILE TAB ───────────────────────────────────────── -->
        <div id="intro-mobile" class="help-section ${IS_TOUCH ? '' : 'help-hidden'}">
          <div class="help-mobile-layout">

            <div class="help-joy-diagram">
              <div class="help-joy-ring">
                <div class="help-joy-thumb"></div>
                <div class="help-joy-arr help-joy-arr--u"></div>
                <div class="help-joy-arr help-joy-arr--d"></div>
                <div class="help-joy-arr help-joy-arr--l"></div>
                <div class="help-joy-arr help-joy-arr--r"></div>
              </div>
              <p class="help-joy-label">Touch left side<br>to move</p>
            </div>

            <div class="help-divider"></div>

            <div class="help-mobile-controls">
              <div class="help-mob-row">
                <div class="help-mob-badge">Drag right</div>
                <span>Rotate camera</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">↑ button</div>
                <span>Jump</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">E button</div>
                <span>Open island</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Tap popup</div>
                <span>Open island</span>
              </div>
              <div class="help-mob-row">
                <div class="help-mob-badge">Map button</div>
                <span>World Map</span>
              </div>
            </div>

          </div>
          <p class="help-tip">Walk toward a glowing island and tap the prompt to explore it.</p>
        </div>

        <div class="intro-press-hint" aria-hidden="true">press anything to start</div>
      </div>
    `

    const desk = el.querySelector('#intro-desktop')
    const mob  = el.querySelector('#intro-mobile')
    if (desk) { desk.setAttribute('role', 'tabpanel'); desk.setAttribute('aria-labelledby', 'intro-tab-desktop') }
    if (mob)  { mob.setAttribute('role',  'tabpanel'); mob.setAttribute('aria-labelledby',  'intro-tab-mobile') }

    el.querySelector('#intro-close').addEventListener('click', () => this.close())

    const tabs = [...el.querySelectorAll('.help-tab')]
    function selectTab(tab) {
      tabs.forEach(t => {
        const active = t === tab
        t.classList.toggle('active', active)
        t.setAttribute('aria-selected', String(active))
        t.tabIndex = active ? 0 : -1
      })
      el.querySelectorAll('.help-section').forEach(s => s.classList.add('help-hidden'))
      const panel = el.querySelector(`#intro-${tab.dataset.tab}`)
      if (panel) panel.classList.remove('help-hidden')
    }
    tabs.forEach(tab => {
      tab.addEventListener('click', () => selectTab(tab))
      tab.addEventListener('keydown', e => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
        const dir  = e.key === 'ArrowRight' ? 1 : -1
        const next = tabs[(tabs.indexOf(tab) + dir + tabs.length) % tabs.length]
        next.focus()
        selectTab(next)
      })
    })

    document.body.appendChild(el)
    this._el = el
  }

  open() {
    this._lastFocus = document.activeElement
    this._el.classList.add('is-open')
    queueMicrotask(() => this._el.querySelector('#intro-close')?.focus())

    this._onKey = (e) => {
      // don't intercept tab/arrow navigation within the overlay
      if (e.target.closest('#intro-overlay') && (e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return
      this.close()
    }
    this._onClick = (e) => {
      if (e.target === this._el) this.close()
    }
    this._onTouch = (e) => {
      if (e.target === this._el) this.close()
    }

    document.addEventListener('keydown',    this._onKey,   { once: false })
    this._el.addEventListener('click',      this._onClick, { once: false })
    this._el.addEventListener('touchstart', this._onTouch, { once: false, passive: true })
  }

  close() {
    this._el.classList.remove('is-open')
    localStorage.setItem('phf-intro-ts', String(Date.now()))

    if (this._onKey)   document.removeEventListener('keydown',    this._onKey)
    if (this._onClick) this._el.removeEventListener('click',      this._onClick)
    if (this._onTouch) this._el.removeEventListener('touchstart', this._onTouch)
    this._onKey = this._onClick = this._onTouch = null

    if (this._lastFocus && typeof this._lastFocus.focus === 'function') this._lastFocus.focus()
  }

  isOpen() { return this._el.classList.contains('is-open') }
}

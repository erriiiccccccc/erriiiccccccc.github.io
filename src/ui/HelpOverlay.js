const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0

export class HelpOverlay {
  constructor() {
    this._lastFocus = null
    this._build()
  }

  _build() {
    const el = document.createElement('div')
    el.id        = 'help-overlay'
    el.className = 'overlay-modal'
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-labelledby', 'help-title')

    el.innerHTML = `
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="help-title">How to Play</span>
          <button class="overlay-x" id="help-close" type="button" aria-label="Close help">✕</button>
        </div>

        <div class="help-tabs" role="tablist" aria-label="Control reference">
          <button class="help-tab ${IS_TOUCH ? '' : 'active'}" type="button" role="tab"
                  aria-selected="${!IS_TOUCH}" aria-controls="help-desktop" id="tab-desktop"
                  data-tab="desktop">Desktop</button>
          <button class="help-tab ${IS_TOUCH ? 'active' : ''}" type="button" role="tab"
                  aria-selected="${IS_TOUCH}" aria-controls="help-mobile" id="tab-mobile"
                  data-tab="mobile">Mobile</button>
        </div>

        <!-- ── DESKTOP TAB ──────────────────────────────────────── -->
        <div id="help-desktop" class="help-section ${IS_TOUCH ? 'help-hidden' : ''}">
          <div class="help-desktop-layout">

            <!-- Keyboard cluster -->
            <div class="help-kb-cluster">
              <p class="help-cluster-label">Movement</p>

              <!-- WASD keys -->
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

              <!-- Modifier row with labels -->
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

            <!-- Divider -->
            <div class="help-divider"></div>

            <!-- Other controls (same style as mobile) -->
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
        <div id="help-mobile" class="help-section ${IS_TOUCH ? '' : 'help-hidden'}">
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

      </div>
    `

    // Mark sections with role/labelledby up-front
    const desk = el.querySelector('#help-desktop')
    const mob  = el.querySelector('#help-mobile')
    if (desk) { desk.setAttribute('role', 'tabpanel'); desk.setAttribute('aria-labelledby', 'tab-desktop') }
    if (mob)  { mob.setAttribute('role',  'tabpanel'); mob.setAttribute('aria-labelledby',  'tab-mobile') }

    el.querySelector('#help-close').addEventListener('click', () => this.close())
    el.addEventListener('click', e => { if (e.target === el) this.close() })

    const tabs = [...el.querySelectorAll('.help-tab')]
    function selectTab(tab) {
      tabs.forEach(t => {
        const active = t === tab
        t.classList.toggle('active', active)
        t.setAttribute('aria-selected', String(active))
        t.tabIndex = active ? 0 : -1
      })
      el.querySelectorAll('.help-section').forEach(s => s.classList.add('help-hidden'))
      const panel = el.querySelector(`#help-${tab.dataset.tab}`)
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
    queueMicrotask(() => this._el.querySelector('#help-close')?.focus())
  }
  close() {
    this._el.classList.remove('is-open')
    if (this._lastFocus && typeof this._lastFocus.focus === 'function') this._lastFocus.focus()
  }
  isOpen() { return this._el.classList.contains('is-open') }
  toggle() { this.isOpen() ? this.close() : this.open() }
}

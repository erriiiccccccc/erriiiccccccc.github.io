// SettingsOverlay — quality / reduced-motion / hints toggles.
// Persists to localStorage; restores on construction. Callbacks fire
// once on construction (with the restored value) so main.js can apply them.

const LS_KEY = 'phf-settings-v1'

function readSaved() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null
    return parsed
  } catch {
    return null
  }
}

function writeSaved(state) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)) } catch { /* quota / private mode */ }
}

export class SettingsOverlay {
  constructor() {
    const saved = readSaved() ?? {}
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    this._quality       = ['low', 'auto', 'high'].includes(saved.quality) ? saved.quality : 'auto'
    this._reducedMotion = typeof saved.reducedMotion === 'boolean' ? saved.reducedMotion : prefersReduced
    this._hintsVisible  = typeof saved.hintsVisible  === 'boolean' ? saved.hintsVisible  : true

    // Reflect persisted reduced-motion to body class so CSS can react globally
    if (this._reducedMotion) document.body.classList.add('reduced-motion')

    // Callbacks — set these from main.js after construction; we then fire them
    // synchronously inside `applyRestored()` so initial state matches saved.
    this.onQualityChange       = null
    this.onReducedMotionChange = null
    this.onHintsChange         = null

    this._lastFocus = null
    this._build()
  }

  /** Call from main.js after wiring callbacks to push initial values. */
  applyRestored() {
    this.onQualityChange?.(this._quality)
    this.onReducedMotionChange?.(this._reducedMotion)
    this.onHintsChange?.(this._hintsVisible)
  }

  _persist() {
    writeSaved({
      quality:       this._quality,
      reducedMotion: this._reducedMotion,
      hintsVisible:  this._hintsVisible,
    })
  }

  _build() {
    const rm = this._reducedMotion
    const hv = this._hintsVisible
    const el = document.createElement('div')
    el.id        = 'settings-overlay'
    el.className = 'overlay-modal'
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-labelledby', 'settings-title')

    const qBtn = (val, label) => `
      <button class="sopt${this._quality === val ? ' active' : ''}"
              type="button"
              data-q="${val}"
              aria-pressed="${this._quality === val}">${label}</button>`

    el.innerHTML = `
      <div class="overlay-inner">
        <div class="overlay-header">
          <span class="overlay-title" id="settings-title">⚙&nbsp; Settings</span>
          <button class="overlay-x" id="settings-close" type="button" aria-label="Close settings">✕</button>
        </div>
        <div class="settings-row">
          <span class="settings-label" id="settings-q-label">Graphics Quality</span>
          <div class="settings-opts" role="group" aria-labelledby="settings-q-label">
            ${qBtn('low',  'Low')}
            ${qBtn('auto', 'Auto')}
            ${qBtn('high', 'High')}
          </div>
        </div>
        <div class="settings-row">
          <span class="settings-label">Reduced Motion</span>
          <button class="stoggle${rm ? ' active' : ''}" id="motion-toggle" type="button" aria-pressed="${rm}">${rm ? 'ON' : 'OFF'}</button>
        </div>
        <div class="settings-row">
          <span class="settings-label">Control Hints</span>
          <button class="stoggle${hv ? ' active' : ''}" id="hints-toggle" type="button" aria-pressed="${hv}">${hv ? 'ON' : 'OFF'}</button>
        </div>
        <div class="settings-row">
          <span class="settings-label">Audio</span>
          <button class="stoggle" disabled type="button" aria-disabled="true" style="opacity:.35;cursor:default">OFF</button>
          <span class="settings-note">Coming soon</span>
        </div>
      </div>
    `

    el.querySelector('#settings-close').addEventListener('click', () => this.close())
    el.addEventListener('click', e => { if (e.target === el) this.close() })

    el.querySelectorAll('[data-q]').forEach(btn => {
      btn.addEventListener('click', () => {
        el.querySelectorAll('[data-q]').forEach(b => {
          const active = b === btn
          b.classList.toggle('active', active)
          b.setAttribute('aria-pressed', String(active))
        })
        this._quality = btn.dataset.q
        this._persist()
        this.onQualityChange?.(this._quality)
      })
    })

    const motionBtn = el.querySelector('#motion-toggle')
    motionBtn.addEventListener('click', () => {
      this._reducedMotion = !this._reducedMotion
      motionBtn.textContent = this._reducedMotion ? 'ON' : 'OFF'
      motionBtn.classList.toggle('active', this._reducedMotion)
      motionBtn.setAttribute('aria-pressed', String(this._reducedMotion))
      document.body.classList.toggle('reduced-motion', this._reducedMotion)
      this._persist()
      this.onReducedMotionChange?.(this._reducedMotion)
    })

    const hintsBtn = el.querySelector('#hints-toggle')
    hintsBtn.addEventListener('click', () => {
      this._hintsVisible = !this._hintsVisible
      hintsBtn.textContent = this._hintsVisible ? 'ON' : 'OFF'
      hintsBtn.classList.toggle('active', this._hintsVisible)
      hintsBtn.setAttribute('aria-pressed', String(this._hintsVisible))
      this._persist()
      this.onHintsChange?.(this._hintsVisible)
    })

    document.body.appendChild(el)
    this._el = el
  }

  open() {
    this._lastFocus = document.activeElement
    this._el.classList.add('is-open')
    // Move focus inside for keyboard users
    queueMicrotask(() => this._el.querySelector('#settings-close')?.focus())
  }
  close() {
    this._el.classList.remove('is-open')
    if (this._lastFocus && typeof this._lastFocus.focus === 'function') {
      this._lastFocus.focus()
    }
  }
  isOpen() { return this._el.classList.contains('is-open') }
  toggle() { this.isOpen() ? this.close() : this.open() }

  get quality()       { return this._quality }
  get reducedMotion() { return this._reducedMotion }
  get hintsVisible()  { return this._hintsVisible }
}

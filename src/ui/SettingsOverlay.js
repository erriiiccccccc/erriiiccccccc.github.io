// SettingsOverlay — quality / reduced-motion / hints toggles.
// Persists to localStorage; restores on construction. Callbacks fire
// once on construction (with the restored value) so main.js can apply them.
import { svgIcon } from './icons.js'

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
    this._soundOn       = typeof saved.soundOn       === 'boolean' ? saved.soundOn       : true
    this._volume        = typeof saved.volume        === 'number'  ? Math.max(0, Math.min(1, saved.volume)) : 0.7

    // Reflect persisted reduced-motion to body class so CSS can react globally
    if (this._reducedMotion) document.body.classList.add('reduced-motion')

    // Callbacks — set these from main.js after construction; we then fire them
    // synchronously inside `applyRestored()` so initial state matches saved.
    this.onQualityChange       = null
    this.onReducedMotionChange = null
    this.onHintsChange         = null
    this.onSoundChange         = null
    this.onVolumeChange        = null

    this._lastFocus = null
    this._build()
  }

  /** Call from main.js after wiring callbacks to push initial values. */
  applyRestored() {
    this.onQualityChange?.(this._quality)
    this.onReducedMotionChange?.(this._reducedMotion)
    this.onHintsChange?.(this._hintsVisible)
    this.onSoundChange?.(this._soundOn)
    this.onVolumeChange?.(this._volume)
  }

  _persist() {
    writeSaved({
      quality:       this._quality,
      reducedMotion: this._reducedMotion,
      hintsVisible:  this._hintsVisible,
      soundOn:       this._soundOn,
      volume:        this._volume,
    })
  }

  _build() {
    const rm = this._reducedMotion
    const hv = this._hintsVisible
    const sd = this._soundOn
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
          <span class="overlay-title overlay-title--icon" id="settings-title">${svgIcon('settings', 18)} Options</span>
          <button class="overlay-x" id="settings-close" type="button" aria-label="Close settings">✕</button>
        </div>
        <div class="settings-row">
          <span class="settings-label" id="settings-q-label">Graphics</span>
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
          <span class="settings-label">Sound</span>
          <button class="stoggle${sd ? ' active' : ''}" id="sound-toggle" type="button" aria-pressed="${sd}">${sd ? 'ON' : 'OFF'}</button>
        </div>
        <div class="settings-row">
          <label class="settings-label" for="volume-range">Volume</label>
          <input class="svol" id="volume-range" type="range" min="0" max="100" step="1"
                 value="${Math.round(this._volume * 100)}" aria-valuetext="${Math.round(this._volume * 100)}%">
          <span class="svol-val" id="volume-val">${Math.round(this._volume * 100)}%</span>
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

    const soundBtn = el.querySelector('#sound-toggle')
    soundBtn.addEventListener('click', () => {
      this._soundOn = !this._soundOn
      soundBtn.textContent = this._soundOn ? 'ON' : 'OFF'
      soundBtn.classList.toggle('active', this._soundOn)
      soundBtn.setAttribute('aria-pressed', String(this._soundOn))
      this._persist()
      this.onSoundChange?.(this._soundOn)
    })

    const vol = el.querySelector('#volume-range')
    const volVal = el.querySelector('#volume-val')
    const paintVol = () => vol.style.setProperty('--fill', `${vol.value}%`)
    paintVol()
    vol.addEventListener('input', () => {
      this._volume = Number(vol.value) / 100
      volVal.textContent = `${vol.value}%`
      vol.setAttribute('aria-valuetext', `${vol.value}%`)
      paintVol()
      this.onVolumeChange?.(this._volume)
    })
    vol.addEventListener('change', () => this._persist())

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
  get soundOn()       { return this._soundOn }
}

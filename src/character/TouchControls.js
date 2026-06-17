import { svgIcon } from '../ui/icons.js'

/**
 * TouchControls — floating dynamic joystick + action buttons for mobile.
 *
 * JOYSTICK: a faded ghost ring sits at the bottom-left as a hint.
 * When the user touches anywhere in the left ~52% of the screen
 * (excluding buttons), the joystick base appears at that exact touch point
 * and the thumb tracks within JOY_RADIUS. On release the base disappears.
 *
 * CAMERA: dragging anywhere in the right ~58% of the screen (not on buttons)
 * rotates the camera. Accumulated deltas are consumed via popCamDelta().
 *
 * BUTTONS: Jump, Interact (E), and Map — fixed bottom-right.
 */
export class TouchControls {
  constructor() {
    this._joyX = 0
    this._joyY = 0
    this._joyTouchId  = null
    this._joyOrigin   = { x: 0, y: 0 }
    this.JOY_RADIUS   = 52

    this._camTouchId   = null
    this._camLastX     = 0
    this._camLastY     = 0
    this._pendingCamDx = 0
    this._pendingCamDy = 0

    this._pendingJump     = false
    this._pendingInteract = false
    this._pendingMap      = false

    this._buildUI()
    this._bindEvents()
  }

  // ── DOM ──────────────────────────────────────────────────────────────────────
  _buildUI() {
    const el = document.createElement('div')
    el.id = 'touch-controls'
    el.innerHTML = `
      <!-- Faded ghost hint — shows where to press for joystick -->
      <div id="joy-hint">
        <div id="joy-hint-inner"></div>
        <div class="joy-hint-arrow joy-hint-arrow--up"></div>
        <div class="joy-hint-arrow joy-hint-arrow--dn"></div>
        <div class="joy-hint-arrow joy-hint-arrow--lt"></div>
        <div class="joy-hint-arrow joy-hint-arrow--rt"></div>
      </div>
      <!-- Floating joystick — positioned dynamically at touch point -->
      <div id="joy-base"><div id="joy-thumb"></div></div>
      <!-- Action buttons -->
      <div id="touch-btns">
        <button class="touch-btn touch-btn--map"  id="touch-map-btn"  aria-label="World Map">${svgIcon('map', 20)}</button>
        <button class="touch-btn touch-btn--jump" id="touch-jump-btn" aria-label="Jump">↑</button>
        <button class="touch-btn touch-btn--e"    id="touch-e-btn"    aria-label="Explore">E</button>
      </div>
    `
    document.body.appendChild(el)

    this._el        = el
    this._joyHint   = el.querySelector('#joy-hint')
    this._joyBase   = el.querySelector('#joy-base')
    this._joyThumb  = el.querySelector('#joy-thumb')
  }

  // ── Events ───────────────────────────────────────────────────────────────────
  _bindEvents() {
    // ── Joystick: touch anywhere on left 52%, not on buttons ──────────────────
    document.addEventListener('touchstart', e => {
      for (const t of e.changedTouches) {
        if (this._joyTouchId !== null) continue
        if (e.target.closest('#touch-btns, #touch-buttons')) continue
        if (t.clientX > window.innerWidth * 0.52) continue

        this._joyTouchId  = t.identifier
        this._joyOrigin.x = t.clientX
        this._joyOrigin.y = t.clientY
        this._placeJoystick(t.clientX, t.clientY)
      }
    }, { passive: true })

    // ── Camera: touch on right ~58% of screen, not on buttons ─────────────────
    document.addEventListener('touchstart', e => {
      for (const t of e.changedTouches) {
        if (this._camTouchId !== null) continue
        if (t.identifier === this._joyTouchId) continue
        if (e.target.closest('#touch-btns, #touch-buttons')) continue
        if (t.clientX > window.innerWidth * 0.42) {
          this._camTouchId = t.identifier
          this._camLastX   = t.clientX
          this._camLastY   = t.clientY
        }
      }
    }, { passive: true })

    // ── Move ──────────────────────────────────────────────────────────────────
    document.addEventListener('touchmove', e => {
      for (const t of e.changedTouches) {
        if (t.identifier === this._joyTouchId) {
          const dx   = t.clientX - this._joyOrigin.x
          const dy   = t.clientY - this._joyOrigin.y
          const dist = Math.min(Math.hypot(dx, dy), this.JOY_RADIUS)
          const ang  = Math.atan2(dy, dx)
          this._joyX = (dist / this.JOY_RADIUS) * Math.cos(ang)
          this._joyY = (dist / this.JOY_RADIUS) * Math.sin(ang)
          this._joyThumb.style.transform =
            `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`
        } else if (t.identifier === this._camTouchId) {
          this._pendingCamDx += t.clientX - this._camLastX
          this._pendingCamDy += t.clientY - this._camLastY
          this._camLastX      = t.clientX
          this._camLastY      = t.clientY
        }
      }
    }, { passive: true })

    // ── End / cancel ──────────────────────────────────────────────────────────
    const onEnd = e => {
      for (const t of e.changedTouches) {
        if (t.identifier === this._joyTouchId) {
          this._joyTouchId = null
          this._joyX = 0; this._joyY = 0
          this._joyThumb.style.transform = ''
          this._hideJoystick()
        }
        if (t.identifier === this._camTouchId) {
          this._camTouchId = null
        }
      }
    }
    document.addEventListener('touchend',    onEnd, { passive: true })
    document.addEventListener('touchcancel', onEnd, { passive: true })

    // ── Action buttons ────────────────────────────────────────────────────────
    this._btn('#touch-jump-btn', () => { this._pendingJump     = true })
    this._btn('#touch-e-btn',    () => { this._pendingInteract = true })
    this._btn('#touch-map-btn',  () => { this._pendingMap      = true })
  }

  _btn(selector, fn) {
    const b = this._el.querySelector(selector)
    if (!b) return
    b.addEventListener('touchstart', e => { e.preventDefault(); fn() }, { passive: false })
    b.addEventListener('click', e => e.stopPropagation())
  }

  _placeJoystick(cx, cy) {
    const r   = this.JOY_RADIUS + 4    // half of base size
    const pad = 8
    const x   = Math.max(pad + r, Math.min(window.innerWidth  * 0.52 - pad - r, cx)) - r
    const y   = Math.max(pad + r, Math.min(window.innerHeight - pad - r, cy))        - r
    const diameter = (r + 4) * 2
    this._joyBase.style.left   = x + 'px'
    this._joyBase.style.top    = y + 'px'
    this._joyBase.style.width  = diameter + 'px'
    this._joyBase.style.height = diameter + 'px'
    this._joyBase.classList.add('active')
    this._joyHint.classList.add('joy-hint--hidden')
  }

  _hideJoystick() {
    this._joyBase.classList.remove('active')
    this._joyHint.classList.remove('joy-hint--hidden')
  }

  // ── Public API ───────────────────────────────────────────────────────────────

  /** Normalized joystick x: -1 (left) … 1 (right) */
  get joyX() { return this._joyX }

  /**
   * Normalized joystick y.
   * Screen +Y = down = backward. So joyY < 0 means the thumb is pushed up = forward.
   */
  get joyY() { return this._joyY }

  /** Consume accumulated camera drag delta since last call */
  popCamDelta() {
    const dx = this._pendingCamDx; const dy = this._pendingCamDy
    this._pendingCamDx = 0; this._pendingCamDy = 0
    return { dx, dy }
  }

  takeJump()     { if (!this._pendingJump)     return false; this._pendingJump     = false; return true }
  takeInteract() { if (!this._pendingInteract) return false; this._pendingInteract = false; return true }
  takeMap()      { if (!this._pendingMap)      return false; this._pendingMap      = false; return true }
}

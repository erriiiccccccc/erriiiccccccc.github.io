import * as THREE from 'three'

// ─── Spherical orbit camera (Genshin / Fortnite style) ───────────────────────
//
// The pivot is the character's world position.
// The camera sits on a sphere of radius DIST centred on that pivot.
// (yaw, pitch) are the two spherical angles.
// Camera always looks at the pivot → character is always centred on screen.
//
// Tweak these three numbers:
const DIST        = 16     // orbit radius (world units from character)
const PITCH_DEF   = 0.38   // default pitch in radians (~22° above horizon)
const PITCH_MIN   = 0.05   // max looking up   (~3°)
const PITCH_MAX   = 1.1    // max looking down  (~63°)

// Exponential lerp: each frame move (1 - exp(-k * dt)) toward target — lower k = slower.
const LERP_ORBIT_INTRO   = 3.5   // loading shot → gameplay orbit (position + look pivot)
const LERP_ORBIT_PLAY    = 12    // full gameplay follow
const INTRO_CLOSE_SQ     = 22    // camera “close enough” to start easing into play lerp (dist² to target)
const INTRO_K_BLEND_SEC  = 0.9   // seconds to ramp k from intro → play (avoids one-frame k jump at reveal)

// Exponential lerp peaks in velocity on frame 1 — it can't ease IN. Without this,
// the camera arrival would lurch off the line ~5× faster than the planet's gentle
// glide-in (handing off from triggerArrival). So for the first INTRO_LAUNCH_SEC we
// ramp k up from INTRO_LAUNCH_K0×intro → full, giving a soft start that roughly
// matches the planet's arrival speed, then the natural exp ease-out settles it.
const INTRO_LAUNCH_SEC   = 0.55  // seconds to ramp the intro k from launch floor → full
const INTRO_LAUNCH_K0    = 0.4   // fraction of intro k at the very first frame

const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const ORBIT_FOV = 65
const WORLD_UP = new THREE.Vector3(0, 1, 0)

function smoothUnit(t) {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

export class Camera {
  constructor(aspect) {
    this.camera = new THREE.PerspectiveCamera(ORBIT_FOV, aspect, 0.1, 2000)
    /** A close-up in progress: { getShot, phase: 'in' | 'hold' | 'out', t, dur, fromP, fromL, fromF } */
    this._shot = null
    this._lookNow = new THREE.Vector3()

    this._camPos      = new THREE.Vector3()
    this._pivot       = new THREE.Vector3()
    this._pivotSmooth = new THREE.Vector3()

    // Start camera far out in space so the intro is a zoom-in, not a crawl
    // out from inside the planet. Approximate charY = 25 (PLANET_RADIUS).
    const approxCharY = 25
    const introDistH  = Math.cos(PITCH_DEF) * DIST * 3
    const introDistV  = Math.sin(PITCH_DEF) * DIST * 3
    this.camera.position.set(0, approxCharY + introDistV, introDistH)
    this._pivotSmooth.set(0, approxCharY + 0.75, 0)

    // Spherical angles
    this._yaw   = 0          // driven by heading
    this._pitch = PITCH_DEF  // driven by RMB drag

    this._yawTarget   = 0
    this._pitchTarget = PITCH_DEF

    // Zoom
    this._dist       = DIST
    this._distTarget = DIST
    // Extra height added to the look pivot. Used by the About/explore view to
    // raise the framing so the (taller-than-default) model isn't cut off.
    this._pivotYExtra = 0
    // When a modal is open we suspend mouse / wheel input so the user can
    // interact with the modal without rotating / zooming the planet behind it.
    this._inputEnabled = true

    window.addEventListener('wheel', e => {
      if (!this._inputEnabled) return
      this._distTarget = Math.max(3, Math.min(60, this._distTarget + e.deltaY * 0.02))
    }, { passive: true })

    // Right-click orbit
    this._rmbDown  = false
    this._lastMx   = 0
    this._lastMy   = 0
    this._snapTimer = 0

    window.addEventListener('mousedown', e => {
      if (e.button !== 2 || !this._inputEnabled) return
      this._rmbDown = true
      this._lastMx  = e.clientX
      this._lastMy  = e.clientY
      this._snapTimer = 0
    })
    window.addEventListener('mouseup', e => {
      if (e.button === 2) this._rmbDown = false
    })
    window.addEventListener('mousemove', e => {
      if (!this._rmbDown || !this._inputEnabled) return
      const dx = e.clientX - this._lastMx
      const dy = e.clientY - this._lastMy
      this._yawTarget   -= dx * 0.005
      this._pitchTarget  = Math.max(PITCH_MIN, Math.min(PITCH_MAX, this._pitchTarget + dy * 0.004))
      this._lastMx = e.clientX
      this._lastMy = e.clientY
      this._snapTimer = 0
    })
    // Suppress the native context menu only over the canvas — leaves it intact
    // over input fields / future text content if the design ever adds them.
    window.addEventListener('contextmenu', e => {
      if (e.target && e.target.id === 'canvas') e.preventDefault()
    })

    /** 0→1 after INTRO_CLOSE_SQ crossed; ramps orbit lerp from intro to play without a step. */
    this._introKBlend = 0
    /** Seconds since the camera arrival began — drives the soft launch ramp. */
    this._introElapsed = 0
    this.characterRevealReady = false
  }

  resize(aspect) {
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }

  /** Enable/disable mouse + wheel input. Use to suspend input while modals are open. */
  setInputEnabled(enabled) {
    this._inputEnabled = !!enabled
    if (!enabled) this._rmbDown = false
  }

  /** Apply touch camera drag (equivalent to RMB drag). Call each frame with accumulated delta. */
  applyTouchDelta(dx, dy) {
    if (!this._inputEnabled) return
    this._yawTarget   -= dx * 0.005
    this._pitchTarget  = Math.max(PITCH_MIN, Math.min(PITCH_MAX, this._pitchTarget + dy * 0.004))
    this._snapTimer    = 0
  }

  // ── Close-ups ────────────────────────────────────────────────────────────
  // The camera leaves its orbit and glides to a fixed shot of something the
  // character is using (the Jukebox, the whiteboard). `getShot` is asked every
  // frame for { pos, look, fov } in world space, so a shot pinned to the
  // planet holds still while the planet turns under a walking character.

  get inShot() { return !!this._shot }
  // A shot may carry its own `up` (world space): a prop standing on the curve
  // of the planet isn't level with the world, so the camera rolls to match it.

  /** Glide from wherever the camera is to the shot. */
  setShot(getShot, dur = 0.9) {
    this._shot = {
      getShot, phase: 'in', t: 0, dur: Math.max(0.01, dur),
      fromP: this.camera.position.clone(), fromL: this._lookNow.clone(), fromF: this.camera.fov, fromU: this.camera.up.clone(),
    }
  }

  /** Swap to another shot (e.g. the studio), gliding from the current view. */
  changeShot(getShot, dur = 0.6) { this.setShot(getShot, dur) }

  /** Glide back to the orbit behind the character. */
  clearShot(dur = 0.7) {
    if (!this._shot) return
    this._shot = {
      getShot: null, phase: 'out', t: 0, dur: Math.max(0.01, dur),
      fromP: this.camera.position.clone(), fromL: this._lookNow.clone(), fromF: this.camera.fov, fromU: this.camera.up.clone(),
    }
  }

  // Call once after construction to centre the planet on screen during loading.
  // When update() starts running (sceneStarted) it will smoothly lerp away from here.
  setLoadingView() {
    this.camera.position.set(0, 0, 52)
    this.camera.lookAt(0, 0, 0)
    this._pivotSmooth.set(0, 0, 0)
    this._introKBlend = 0
    this._introElapsed = 0
    this.characterRevealReady = false
  }

  // charY = actual world-space Y of character (feet), passed from main.js
  update(dt, _R, charY, _b, _c, _pg, heading = 0, moving = false) {
    // ── Snap yaw back behind character while moving ──────────────────────────
    if (moving && !this._rmbDown) {
      this._snapTimer += dt
      if (this._snapTimer > 0.3) {
        // Shortest-path interpolation back to heading
        let diff = heading - this._yawTarget
        // wrap to [-π, π]
        while (diff >  Math.PI) diff -= Math.PI * 2
        while (diff < -Math.PI) diff += Math.PI * 2
        this._yawTarget   += diff * (1 - Math.exp(-4 * dt))
        this._pitchTarget += (PITCH_DEF - this._pitchTarget) * (1 - Math.exp(-3 * dt))
      }
    } else {
      if (!moving) this._snapTimer = 0
      // While not moving, yaw target drifts to match heading so snap starts from correct angle
      if (!this._rmbDown && !moving) {
        let diff = heading - this._yawTarget
        while (diff >  Math.PI) diff -= Math.PI * 2
        while (diff < -Math.PI) diff += Math.PI * 2
        this._yawTarget += diff * (1 - Math.exp(-2 * dt))
      }
    }

    // ── Smooth all values ────────────────────────────────────────────────────
    this._yaw   += (this._yawTarget   - this._yaw)   * (1 - Math.exp(-14 * dt))
    this._pitch += (this._pitchTarget - this._pitch)  * (1 - Math.exp(-14 * dt))
    this._dist  += (this._distTarget  - this._dist)   * (1 - Math.exp(-8  * dt))

    // ── Pivot = character world position (centre of character body) ──────────
    const pivotY = charY + 0.75 + this._pivotYExtra  // 0.75 = half of default height
    this._pivot.set(0, pivotY, 0)

    // ── Spherical → Cartesian ────────────────────────────────────────────────
    // pitch = angle above the horizon
    // yaw   = rotation around world-Y through the pivot
    const hDist = Math.cos(this._pitch) * this._dist   // horizontal reach
    const vDist = Math.sin(this._pitch) * this._dist   // vertical rise

    this._camPos.set(
      this._pivot.x - Math.sin(this._yaw) * hDist,
      this._pivot.y + vDist,
      this._pivot.z + Math.cos(this._yaw) * hDist
    )

    const distSq = this.camera.position.distanceToSquared(this._camPos)
    // Once close, ease k up over INTRO_K_BLEND_SEC (hysteresis: keep blending if already started).
    if (distSq < INTRO_CLOSE_SQ || this._introKBlend > 0) {
      this._introKBlend = Math.min(1, this._introKBlend + dt / INTRO_K_BLEND_SEC)
    }

    // Soft launch: for the first INTRO_LAUNCH_SEC, scale k from a low floor up to
    // full so the camera eases IN from the planet's glide speed instead of lurching
    // (exp lerp peaks on frame 1). Once intro→play blending starts this is long past 1.
    this._introElapsed += dt
    const launch = THREE.MathUtils.lerp(
      INTRO_LAUNCH_K0, 1,
      smoothUnit(this._introElapsed / INTRO_LAUNCH_SEC)
    )

    const kOrbit = THREE.MathUtils.lerp(
      LERP_ORBIT_INTRO,
      LERP_ORBIT_PLAY,
      smoothUnit(this._introKBlend)
    ) * launch

    // ── Close-up shot: glide in, hold, or glide back out to the orbit ──
    if (this._shot) {
      const sh = this._shot
      sh.t = Math.min(1, sh.t + dt / sh.dur)
      const k = easeInOutCubic(sh.t)
      let toP, toL, toF, toU = WORLD_UP
      if (sh.phase === 'out') {
        toP = this._camPos; toL = this._pivot; toF = ORBIT_FOV
      } else {
        const s = sh.getShot()
        toP = s.pos; toL = s.look; toF = s.fov ?? 40
        if (s.up) toU = s.up
      }
      this.camera.position.lerpVectors(sh.fromP, toP, k)
      this._lookNow.lerpVectors(sh.fromL, toL, k)
      this.camera.up.lerpVectors(sh.fromU, toU, k).normalize()
      const fov = sh.fromF + (toF - sh.fromF) * k
      if (Math.abs(fov - this.camera.fov) > 0.01) { this.camera.fov = fov; this.camera.updateProjectionMatrix() }
      this.camera.lookAt(this._lookNow)
      if (sh.t >= 1) {
        if (sh.phase === 'in') sh.phase = 'hold'
        else if (sh.phase === 'out') { this._shot = null; this._pivotSmooth.copy(this._pivot); this.camera.up.copy(WORLD_UP) }
      }
      // keep the orbit's own smoothing settled so the hand-back is seamless
      this._pivotSmooth.copy(this._pivot)
      this.characterRevealReady = this._introKBlend > 0
      return
    }

    // ── Smooth pivot follow ─
    const pf = 1 - Math.exp(-kOrbit * dt)
    this._pivotSmooth.lerp(this._pivot, pf)

    // ── Apply ────────────────────────────────────────────────────────────────
    const cf = 1 - Math.exp(-kOrbit * dt)
    this.camera.position.lerp(this._camPos, cf)
    this.camera.lookAt(this._pivotSmooth)
    this._lookNow.copy(this._pivotSmooth)

    this.characterRevealReady = this._introKBlend > 0
  }
}

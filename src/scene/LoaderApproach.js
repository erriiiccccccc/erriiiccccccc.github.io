import * as THREE from 'three'
import { buildSatellite, buildStrayWorld, buildAsteroidCluster } from './LoaderFlybys.js'

// ─── The loading screen as a flight in ─────────────────────────────────────────
//
// While world.glb downloads, the camera flies toward the planet from far out in space, past
// satellites, asteroids and a stray little world, with meteors and a comet crossing the sky behind.
// How far along it is follows the real download, so the trip is as long as the wait.
//
// The planet is there from the first frame, but the real one is a 15 MB file that can't be drawn
// until all of it has arrived. Until then a picture of it stands in: public/loader-planet.webp,
// taken by scripts/capture-loader-planet.mjs from exactly where the loading camera ends up, with the
// loading view's own lights. The picture is a flat plane at the planet's centre sized so that, seen
// from that spot, it lines up pixel for pixel with the real planet. The camera always finishes the
// trip at that spot before the real planet is switched in, so the hand-over can't be seen.
//
// The rest is code (no files): the fly-by builders from LoaderFlybys, a few lines for meteors and
// the comet, and dust that streaks only while the camera is moving. The stars and the rest of the
// sky ride along with the camera during the trip, so they stay put on screen like a real backdrop.
//
// Reduced motion: no flight. The picture of the planet sits where the planet will be.

/** The loading view's camera distance (Camera.setLoadingView): where every trip ends. */
export const LOADER_EYE = 52
/** The stand-in picture is square, taken from (0, 0, LOADER_EYE) looking at the origin with this vertical fov. */
// (tight around the planet, which reaches about 18 degrees off centre, so the picture is sharp up to a 4K screen)
export const STAND_IN_FOV = 44

const FAR = 920                                   // where a full trip starts
const L = Math.log(FAR / LOADER_EYE)
const distAt = (u) => LOADER_EYE * Math.exp(L * (1 - u))      // u: 0 far out, 1 parked
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t) }

// What the camera passes. `u` is how far along the trip it goes by, `r` how far off the line it
// passes (wide enough to clear the planet), `a` which way it leaves the screen, in degrees
// (0 right, 90 up). Nothing leaves through the top or bottom middle, where the title and bar are,
// or up and to the left, where the sun is.
const TRAFFIC = [
  { u: 0.14, build: buildAsteroidCluster, scale: 1.4, r: 28, a: 195 },
  { u: 0.25, build: buildSatellite,       scale: 2.6, r: 27, a: 25 },
  { u: 0.36, build: buildAsteroidCluster, scale: 1.0, r: 23, a: 320 },
  { u: 0.47, build: buildStrayWorld,      scale: 1.35, r: 31, a: 345 },
  { u: 0.58, build: buildSatellite,       scale: 2.4, r: 26, a: 215 },
  { u: 0.67, build: buildAsteroidCluster, scale: 1.25, r: 25, a: 14 },
  { u: 0.76, build: buildSatellite,       scale: 2.4, r: 25, a: 185 },
]
// Meteors, in the sky behind the planet (sky space: as seen from the loading camera at z = LOADER_EYE).
const METEORS = [
  { u: 0.17, x: -95, y: 48, dx: 0.84, dy: -0.54 },
  { u: 0.41, x: 98, y: 52, dx: -0.8, dy: -0.6 },
  { u: 0.63, x: -88, y: -26, dx: 0.93, dy: 0.36 },
]
const COMET = { u: 0.29, x0: 128, y0: 58, x1: 18, y1: 24, secs: 2.6 }
const DUST_N = 240

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  r.addColorStop(0, 'rgba(255,255,255,1)')
  r.addColorStop(0.25, 'rgba(255,240,215,0.55)')
  r.addColorStop(1, 'rgba(255,220,180,0)')
  g.fillStyle = r
  g.fillRect(0, 0, 64, 64)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export class LoaderApproach {
  /**
   * @param {{ renderer?: THREE.WebGLRenderer, prepare?: (obj: THREE.Object3D) => Promise<void>, camera: THREE.PerspectiveCamera, skyGroups: THREE.Object3D[], reducedMotion?: boolean, standInUrl: string }} o
   *   prepare: compile an object's shaders in the background (gpuPrep); the picture waits for it
   */
  constructor({ renderer, prepare, camera, skyGroups, reducedMotion = false, standInUrl }) {
    this.cam = camera
    this.reducedMotion = reducedMotion
    this.group = new THREE.Group()                // world space: the stand-in, the traffic, the dust
    this.sky = new THREE.Group()                  // sky space: meteors and the comet, riding with the camera
    this._skyGroups = [...skyGroups, this.sky]
    this.group.add(this.sky)

    this._u = null                                // set on the first frame (how far the download already is)
    this._v = 0
    this._final = null                            // the last stretch: an exact ease to the parking spot
    this._parked = false
    this._parkedCbs = []
    this._time = 0
    this._standInAlpha = 0

    // ── the stand-in: a picture of the real planet, on a plane at its centre ──
    const size = 2 * LOADER_EYE * Math.tan(THREE.MathUtils.degToRad(STAND_IN_FOV / 2))
    // A one-pixel stand-in for the picture until it arrives: a material with a texture is a different
    // shader from one without, so this way the right one is compiled before the first frame, and the
    // picture only swaps in (compiling it when the picture arrived cost a stall mid-flight).
    const placeholder = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1)
    placeholder.colorSpace = THREE.SRGBColorSpace
    placeholder.needsUpdate = true
    this._standInMat = new THREE.MeshBasicMaterial({ map: placeholder, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })
    this._standIn = new THREE.Mesh(new THREE.PlaneGeometry(size, size), this._standInMat)
    this._standIn.renderOrder = 1                 // over the stars and the sun's glow, which are drawn first
    this._standIn.visible = false
    this.group.add(this._standIn)
    this._loadStandIn(standInUrl, renderer, prepare)

    if (reducedMotion) return

    // ── traffic ──
    this._traffic = TRAFFIC.map((t, i) => {
      const { obj } = t.build()
      obj.scale.multiplyScalar(t.scale)
      const a = THREE.MathUtils.degToRad(t.a)
      const pass = t.r / 0.62                     // how far ahead of the camera it is as it leaves the screen
      obj.position.set(Math.cos(a) * t.r, Math.sin(a) * t.r, Math.max(LOADER_EYE + 12, distAt(t.u) - pass))
      obj.rotation.set(0.6 + i * 0.9, i * 1.7, 0.3 + i * 0.4)
      const mats = []
      obj.traverse(o => {
        if (!o.material) return
        for (const m of (Array.isArray(o.material) ? o.material : [o.material])) {
          if (mats.includes(m)) continue                // parts share materials: each one once
          m.transparent = true; m._base = m.opacity; m.opacity = 0; mats.push(m)
          // the loading view's lights are dim (the sun comes up with the world): lift them so they read
          if (m.emissive) { m.emissive.add(m.color.clone().multiplyScalar(m.vertexColors ? 0.1 : 0.32)); m.emissiveIntensity = Math.max(1, m.emissiveIntensity) }
        }
      })
      obj.visible = false
      this.group.add(obj)
      return { obj, mats, spin: new THREE.Vector3(0.12 + (i % 3) * 0.06, 0.18 - (i % 2) * 0.1, 0.07), z: obj.position.z }
    })

    // ── dust, along the whole path ──
    const pos = new Float32Array(DUST_N * 6), col = new Float32Array(DUST_N * 8)
    this._dust = []
    let seed = 7
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
    for (let i = 0; i < DUST_N; i++) {
      const a = rnd() * Math.PI * 2, r = 6 + Math.pow(rnd(), 0.7) * 58
      this._dust.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z: LOADER_EYE + 8 + rnd() * (FAR + 40 - LOADER_EYE) })
    }
    const dg = new THREE.BufferGeometry()
    dg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    dg.setAttribute('color', new THREE.BufferAttribute(col, 4))
    this._dustLines = new THREE.LineSegments(dg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
    this._dustLines.frustumCulled = false
    this.group.add(this._dustLines)

    // ── meteors and the comet ──
    this._glow = glowTexture()
    const streak = () => {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
      g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(8), 4))
      const line = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
      line.frustumCulled = false
      const head = new THREE.Sprite(new THREE.SpriteMaterial({ map: this._glow, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }))
      line.visible = head.visible = false
      this.sky.add(line, head)
      return { line, head, t: -1 }
    }
    this._meteors = METEORS.map(m => ({ ...m, ...streak() }))
    this._comet = { ...COMET, ...streak() }
    this._comet.head.scale.setScalar(7)
  }

  /**
   * The picture is decoded off the main thread (createImageBitmap) and sent to the GPU at once. As an
   * <img> it was decoded on the main thread at its first draw: a 75 ms stall in the middle of the flight.
   */
  async _loadStandIn(url, renderer, prepare) {
    try {
      let tex
      if (typeof createImageBitmap === 'function') {
        const blob = await (await fetch(url)).blob()
        const bmp = await createImageBitmap(blob, { imageOrientation: 'flipY', premultiplyAlpha: 'none', colorSpaceConversion: 'none' })
        tex = new THREE.Texture(bmp)
        tex.flipY = false                                // flipped while decoding: WebGL ignores flipY for bitmaps
      } else {
        tex = await new THREE.TextureLoader().loadAsync(url)
      }
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = 4
      tex.needsUpdate = true
      renderer?.initTexture(tex)
      this._standInTex = tex
      const placeholder = this._standInMat.map
      this._standInMat.map = tex                         // same shader as the placeholder's: nothing to compile
      placeholder?.dispose()
      if (!this._handedOver) this._standIn.visible = true
    } catch { /* no picture: the trip still runs, and the real planet appears when it's ready */ }
  }

  get parked() { return this._parked }

  /** Runs `cb` on the first frame the camera is at the end of the trip (now, if it already is). */
  whenParked(cb) {
    if (this._parked || this.reducedMotion) { cb(); return }
    this._parkedCbs.push(cb)
  }

  /** The real planet is drawn from now on: the picture goes. */
  handOver() {
    this._handedOver = true
    this._standIn.visible = false
    this._bar?.classList.remove('is-working')
  }

  /** Jump to the end of the trip (a failsafe). */
  park() {
    this._u = 1; this._v = 0; this._final = null
    this._place()
    this._arrive()
  }

  /**
   * @param {number} dt seconds since the last frame
   * @param {number} dl how much of world.glb has arrived, 0 to 1
   */
  update(dt, dl) {
    this._time += dt
    if (this._standIn.visible && this._standInAlpha < 1) {
      this._standInAlpha = Math.min(1, this._standInAlpha + dt / 0.35)
      this._standInMat.opacity = this._standInAlpha
    }
    if (this.reducedMotion) { if (this._u == null) { this._u = 1; this._place(); this._arrive() } return }
    if (this._parked) return

    // where the camera is heading: nearly all the way while the file downloads (the unpacking that
    // follows has one hitch three.js can't split, and it should land on almost no motion), the rest after
    const goal = dl >= 1 ? 1 : 0.97 * (0.4 * dl + 0.6 * dl * dl * (3 - 2 * dl))
    if (this._u == null) this._u = clamp(goal - 0.32, 0, 0.85)       // a fast or cached load starts closer in

    const u0 = this._u
    if (goal >= 1) {
      // the last stretch: an exact ease from wherever it is (and however fast it's going) to the parking spot
      // (roughly as long as the world takes to unpack after the download, so it parks about when the
      // planet is ready; never longer than 1.35 s, so a fast or cached load is a quick swoop, not a wait)
      if (!this._final) this._final = { t: 0, p0: this._u, m0: this._v, T: clamp((1 - this._u) * 1.7, 0.85, 1.35) }
      const f = this._final
      f.t = Math.min(f.T, f.t + dt)
      const s = f.t / f.T, s2 = s * s, s3 = s2 * s
      this._u = Math.min(1, (2 * s3 - 3 * s2 + 1) * f.p0 + (s3 - 2 * s2 + s) * f.T * f.m0 + (-2 * s3 + 3 * s2))
      if (f.t >= f.T) this._u = 1
    } else {
      // a critically damped spring toward the download, so it never jumps when the download does
      const w = 2.2
      this._v += (w * w * (goal - this._u) - 2 * w * this._v) * dt
      this._u = Math.min(0.985, this._u + this._v * dt)
    }
    const du = dt > 0 ? (this._u - u0) / dt : 0
    if (this._final) this._v = du
    this._sharpen()

    this._place()
    this._flyby(dt, du)
    if (this._u >= 1) this._arrive()
  }

  /** Camera and sky, for the current point of the trip. */
  _place() {
    const d = distAt(this._u)
    this.cam.position.set(0, 0, d)
    this.cam.lookAt(0, 0, 0)
    const off = d - LOADER_EYE
    for (const g of this._skyGroups) g.position.z = off
  }

  /** Near the end, sample the picture without mipmaps: they blur it next to the real planet it's about to become. */
  _sharpen() {
    const t = this._standInTex
    if (!t || this._u < 0.9 || t.minFilter === THREE.LinearFilter) return
    t.minFilter = THREE.LinearFilter
    t.needsUpdate = true
  }

  _arrive() {
    if (this._parked) return
    this._parked = true
    this._u = 1
    this._place()
    this._sharpen()
    // nothing of the trip is left on screen once it's parked
    if (this._traffic) for (const t of this._traffic) t.obj.visible = false
    if (this._dustLines) this._dustLines.visible = false
    if (this._meteors) for (const m of [...this._meteors, this._comet]) m.line.visible = m.head.visible = false
    // The browser is about to be busy for a second (the world's first draw and the play warm-up), and
    // nothing can be drawn while it is. A light keeps running along the bar meanwhile: it's a CSS
    // animation, which the browser runs on its own and keeps going through the pause.
    this._bar = document.getElementById('ldr-bar-track')
    if (!this.reducedMotion) this._bar?.classList.add('is-working')
    const cbs = this._parkedCbs.splice(0)
    for (const cb of cbs) cb()
  }

  _flyby(dt, du) {
    const camZ = this.cam.position.z
    const speed = Math.abs(du) * L * camZ          // world units a second, along the path

    for (const t of this._traffic) {
      const ahead = camZ - t.z
      const a = smooth(500, 290, ahead) * (ahead > 2 ? 1 : 0)
      t.obj.visible = a > 0.002
      if (!t.obj.visible) continue
      for (const m of t.mats) m.opacity = m._base * a
      t.obj.rotation.x += t.spin.x * dt
      t.obj.rotation.y += t.spin.y * dt
      t.obj.rotation.z += t.spin.z * dt
    }

    // dust: a streak behind each grain, as long as the camera is fast
    const streakLen = Math.min(60, speed * 0.05)
    const bright = smooth(25, 140, speed)
    const pos = this._dustLines.geometry.attributes.position.array
    const col = this._dustLines.geometry.attributes.color.array
    for (let i = 0; i < DUST_N; i++) {
      const p = this._dust[i], ahead = camZ - p.z
      const a = bright * smooth(2, 18, ahead) * (1 - smooth(120, 260, ahead))
      pos[i * 6] = p.x; pos[i * 6 + 1] = p.y; pos[i * 6 + 2] = p.z
      pos[i * 6 + 3] = p.x; pos[i * 6 + 4] = p.y; pos[i * 6 + 5] = p.z - streakLen
      col[i * 8] = 1; col[i * 8 + 1] = 0.97; col[i * 8 + 2] = 0.92; col[i * 8 + 3] = 0.55 * a
      col[i * 8 + 4] = 1; col[i * 8 + 5] = 0.97; col[i * 8 + 6] = 0.92; col[i * 8 + 7] = 0
    }
    this._dustLines.geometry.attributes.position.needsUpdate = true
    this._dustLines.geometry.attributes.color.needsUpdate = true
    this._dustLines.visible = bright > 0.002

    // meteors start as the camera passes their point of the trip; the comet takes its time
    for (const m of this._meteors) this._streak(m, dt, 0.62, (k) => {
      const e = 1 - Math.pow(1 - k, 3), len = 34, tx = m.x + m.dx * 70 * e, ty = m.y + m.dy * 70 * e
      return { hx: tx, hy: ty, tx: tx - m.dx * len * Math.min(1, k * 3), ty: ty - m.dy * len * Math.min(1, k * 3), a: Math.sin(k * Math.PI), warm: false }
    })
    const c = this._comet
    this._streak(c, dt, c.secs, (k) => {
      const hx = c.x0 + (c.x1 - c.x0) * k, hy = c.y0 + (c.y1 - c.y0) * k
      const dx = c.x1 - c.x0, dy = c.y1 - c.y0, n = Math.hypot(dx, dy)
      return { hx, hy, tx: hx - dx / n * 26, ty: hy - dy / n * 26, a: Math.sin(k * Math.PI) * 0.9, warm: true }
    })
  }

  _streak(s, dt, secs, at) {
    if (s.t < 0) { if (this._u >= s.u && this._u < s.u + 0.2) s.t = 0; else return }
    s.t += dt
    const k = s.t / secs
    if (k >= 1) { s.line.visible = s.head.visible = false; s.t = 99; return }
    const { hx, hy, tx, ty, a, warm } = at(k)
    const Z = -60                                  // behind the planet's centre: the stand-in hides them where they cross it
    const p = s.line.geometry.attributes.position.array, c = s.line.geometry.attributes.color.array
    p[0] = hx; p[1] = hy; p[2] = Z; p[3] = tx; p[4] = ty; p[5] = Z
    c[0] = 1; c[1] = warm ? 0.9 : 0.98; c[2] = warm ? 0.75 : 0.92; c[3] = a
    c[4] = 1; c[5] = warm ? 0.85 : 0.98; c[6] = warm ? 0.65 : 0.92; c[7] = 0
    s.line.geometry.attributes.position.needsUpdate = true
    s.line.geometry.attributes.color.needsUpdate = true
    s.head.position.set(hx, hy, Z)
    s.head.material.opacity = a
    if (!warm) s.head.scale.setScalar(3)
    s.line.visible = s.head.visible = a > 0.01
  }

  /** The world has started: take everything out and give the sky back. */
  clear() {
    for (const g of this._skyGroups) g.position.z = 0
    this.group.parent?.remove(this.group)
    this.group.traverse(o => {
      o.geometry?.dispose?.()
      const mats = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : []
      for (const m of mats) { m.map?.dispose?.(); m.dispose?.() }
    })
    this._glow?.dispose()
    this._parkedCbs.length = 0
  }
}

// The Doodle Wall's whiteboard, standing on Meadow where the telescope was.
//
// A wooden easel holding a whiteboard, built from primitives with flatShading
// like the Jukebox, so it loads nothing and stays in the storybook family.
// The board shows the approved drawings one at a time: every few seconds the
// eraser scrubs across and the next drawing appears behind it.
//
// The board's face is one small canvas texture. It's only repainted while
// the eraser is moving (about a second in every five), so it costs nothing
// the rest of the time.
//
// Up close (the Doodle Wall's close-up), the cycling pauses: show() wipes any
// drawing onto it, and startDrawing() turns the face into a canvas you draw
// on directly (strokes come in as face UVs from a raycast).
//
// Units: the character stands about 2.2 tall. The group's origin is the point
// it stands on and the board faces +Z, so a caller drops it onto a surface
// point, turns +Y to the surface normal and then +Z towards the viewer.
import * as THREE from 'three'
import { GroundRing } from './GroundRing.js'

const BW = 2.0, BH = 1.5          // drawing surface, 4:3 like the drawings
const FACE_W = 768, FACE_H = 576
const HOLD = 4.5                  // seconds a drawing stays up
const WIPE = 1.1                  // seconds the eraser takes to cross

function mat(color, { rough = 0.75, metal = 0, map = null } = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, flatShading: !map, map })
}

export class DoodleBoard {
  /** @param {number} zoneRadius  radius of the circle you stand in to use it */
  constructor(zoneRadius = 1.5) {
    this.group = new THREE.Group()
    this.group.name = 'doodle-board'

    this._imgs = []
    this._cur = 0
    this._shown = null        // the image on the board right now
    this._wipe = null         // { from: Image, to: Image, p }
    this._wait = 2.5
    this._held = false        // close-up: no cycling
    this._drawing = false
    this._strokes = []
    this._cache = new Map()
    this._ghosts = Array.from({ length: 8 }, (_, i) => ({
      x: ((i * 197) % 100) / 100 * FACE_W, y: ((i * 61) % 100) / 100 * FACE_H, r: 30 + (i * 37) % 70, a: i * 0.8,
    }))

    // the face
    this._cv = document.createElement('canvas')
    this._cv.width = FACE_W; this._cv.height = FACE_H
    this._ctx = this._cv.getContext('2d')
    this._tex = new THREE.CanvasTexture(this._cv)
    this._tex.colorSpace = THREE.SRGBColorSpace
    this._tex.anisotropy = 4
    this._paint()

    const wood = mat(0x9b6b43), woodDark = mat(0x6d4a2f)
    const frame = mat(0xc9ced6, { rough: 0.35, metal: 0.3 }), backing = mat(0xe9ebee)
    this._mats = [wood, woodDark, frame, backing]
    const add = (parent, geo, m, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const o = new THREE.Mesh(geo, m)
      o.position.set(x, y, z); o.rotation.set(rx, ry, rz)
      o.castShadow = true; o.receiveShadow = true
      parent.add(o)
      return o
    }

    // The easel, every piece running between two real joints so it stands up:
    // two front legs splayed at the floor and leaning in towards the top,
    // a back leg hinged just behind their tops and angled down to the ground
    // behind, a cross bar between the front legs and a stay from that bar
    // back to the rear leg. All of it sits behind the board.
    const stick = (a, b, th, m) => {
      const dir = b.clone().sub(a), len = dir.length()
      const o = new THREE.Mesh(new THREE.BoxGeometry(th, len, th), m)
      o.position.copy(a).add(b).multiplyScalar(0.5)
      o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
      o.castShadow = true; o.receiveShadow = true
      this.group.add(o)
      return o
    }
    const V = (x, y, z) => new THREE.Vector3(x, y, z)
    const legAt = (side, y) => V(side * (1.0 - (y / 2.95) * 0.82), y, 0.1 - (y / 2.95) * 0.24)   // on a front leg at height y
    for (const side of [-1, 1]) stick(legAt(side, 0), legAt(side, 2.95), 0.1, wood)
    const hinge = V(0, 2.8, -0.16), foot = V(0, 0, -1.15)
    stick(hinge, foot, 0.09, woodDark)
    stick(legAt(-1, 2.8), legAt(1, 2.8), 0.07, woodDark)                         // top bar the back leg hangs from
    stick(legAt(-1, 0.55), legAt(1, 0.55), 0.08, woodDark)                       // cross bar
    const rearAt = (y) => hinge.clone().lerp(foot, (2.8 - y) / 2.8)
    stick(V(0, 0.55, legAt(1, 0.55).z), rearAt(0.55), 0.06, woodDark)            // stay to the back leg
    const cy = 1.78, tilt = -0.09
    add(this.group, new THREE.BoxGeometry(2.3, 0.1, 0.24), wood, 0, cy - BH / 2 - 0.1, 0.2, tilt)

    // the board: backing, face, aluminium frame, leaning back a touch
    const panel = new THREE.Group()
    panel.position.set(0, cy, 0.12)
    panel.rotation.x = tilt
    this.group.add(panel)
    add(panel, new THREE.BoxGeometry(BW + 0.1, BH + 0.1, 0.06), backing, 0, 0, -0.02)
    this._faceMat = new THREE.MeshStandardMaterial({ map: this._tex, roughness: 0.35, metalness: 0 })
    const face = new THREE.Mesh(new THREE.PlaneGeometry(BW, BH), this._faceMat)
    face.position.z = 0.012; face.receiveShadow = true
    panel.add(face)
    /** The drawing surface, for raycasts and for framing a close-up. */
    this.face = face
    const fw = 0.07
    add(panel, new THREE.BoxGeometry(BW + fw * 2, fw, 0.08), frame, 0,  BH / 2 + fw / 2, 0)
    add(panel, new THREE.BoxGeometry(BW + fw * 2, fw, 0.08), frame, 0, -BH / 2 - fw / 2, 0)
    add(panel, new THREE.BoxGeometry(fw, BH, 0.08), frame, -BW / 2 - fw / 2, 0, 0)
    add(panel, new THREE.BoxGeometry(fw, BH, 0.08), frame,  BW / 2 + fw / 2, 0, 0)

    // markers on the tray
    ;[0xe53935, 0x1e88e5, 0x222222].forEach((c, i) => {
      const m = new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, flatShading: true })
      this._mats.push(m)
      const pen = add(panel, new THREE.CylinderGeometry(0.035, 0.035, 0.32, 6), m, -0.55 + i * 0.2, -BH / 2 - 0.07, 0.1, 0, 0, Math.PI / 2)
      pen.castShadow = false
    })

    // the eraser, resting on the tray until it's time to wipe
    this._eraser = new THREE.Group()
    const felt = mat(0x3a3a46), grip = mat(0x1e88e5)
    this._mats.push(felt, grip)
    add(this._eraser, new THREE.BoxGeometry(0.32, 0.12, 0.06), felt, 0, 0, 0)
    add(this._eraser, new THREE.BoxGeometry(0.3, 0.1, 0.08), grip, 0, 0, 0.06)
    this._rest = new THREE.Vector3(0.55, -BH / 2 - 0.04, 0.1)
    this._eraser.position.copy(this._rest)
    panel.add(this._eraser)

    // the circle you stand in to open the Doodle Wall
    this.ring = new GroundRing(zoneRadius)
    this.group.add(this.ring.group)
  }

  conformRing(heightAt) { this.ring.conform(heightAt) }

  _load(src) {
    if (this._cache.has(src)) return this._cache.get(src)
    const im = new Image()
    im.crossOrigin = 'anonymous'
    im.decoding = 'async'
    im.src = src
    const p = im.decode().then(() => im, () => null)
    this._cache.set(src, p)
    return p
  }

  /** The drawings to cycle through, as image URLs (CORS-enabled). */
  setDrawings(urls) {
    Promise.all(urls.map(u => this._load(u))).then(ok => {
      this._imgs = ok.filter(Boolean)
      this._cur = 0
      if (!this._held) { this._shown = this._imgs[0] || null; this._wipe = null; this._paint() }
    })
  }

  // ── Close-up ──────────────────────────────────────────────────────────────
  /** Pause (true) or resume (false) the cycling, for the close-up. */
  hold(on) {
    this._held = !!on
    if (!on) { this.stopDrawing(); this._wait = HOLD }
  }

  /** Wipe a drawing onto the board. */
  async show(src) {
    const im = await this._load(src)
    if (!im || im === this._shown || this._drawing) return
    this._wipe = { from: this._shown, to: im, p: 0 }
  }

  get isDrawing() { return this._drawing }
  get hasInk() { return this._strokes.some(s => s.pts.length > 1) }

  startDrawing() { this._drawing = true; this._strokes = []; this._wipe = null; this._paint() }
  stopDrawing() { if (!this._drawing) return; this._drawing = false; this._strokes = []; this._paint() }
  clearDrawing() { this._strokes = []; this._paint() }

  /** Add a point at face UV (u, v), starting a new stroke when `fresh`. */
  ink(u, v, fresh, color) {
    if (!this._drawing) return
    const pt = [u * FACE_W, (1 - v) * FACE_H]
    if (fresh || !this._strokes.length) this._strokes.push({ color, pts: [pt] })
    else this._strokes[this._strokes.length - 1].pts.push(pt)
    this._paint()
  }

  /** The drawing as a PNG data URL (transparent, 900 x 675, like the wall's). */
  drawingDataUrl() {
    const c = document.createElement('canvas')
    c.width = 900; c.height = 675
    const x = c.getContext('2d'), k = 900 / FACE_W
    this._inkOnto(x, k)
    return c.toDataURL('image/png')
  }

  _inkOnto(ctx, k = 1) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'
    for (const s of this._strokes) {
      ctx.strokeStyle = s.color; ctx.lineWidth = 7 * k
      ctx.beginPath()
      s.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x * k, y * k) : ctx.moveTo(x * k, y * k)))
      if (s.pts.length === 1) ctx.lineTo(s.pts[0][0] * k + 0.1, s.pts[0][1] * k)
      ctx.stroke()
    }
  }

  // ── painting ──────────────────────────────────────────────────────────────
  _bg() {
    const c = this._ctx
    c.fillStyle = '#f6f7f4'; c.fillRect(0, 0, FACE_W, FACE_H)
    // faint ghosts of old marker, so it reads as a used whiteboard
    c.strokeStyle = 'rgba(120,130,150,.07)'; c.lineWidth = 11; c.lineCap = 'round'
    for (const g of this._ghosts) { c.beginPath(); c.arc(g.x, g.y, g.r, g.a, g.a + 2.2); c.stroke() }
    const sheen = c.createLinearGradient(0, 0, FACE_W, FACE_H)
    sheen.addColorStop(0, 'rgba(255,255,255,.5)'); sheen.addColorStop(0.4, 'rgba(255,255,255,0)'); sheen.addColorStop(1, 'rgba(200,210,225,.18)')
    c.fillStyle = sheen; c.fillRect(0, 0, FACE_W, FACE_H)
  }

  _pic(im) {
    if (!im) return
    const pad = 34, w = FACE_W - pad * 2, h = FACE_H - pad * 2
    const s = Math.min(w / im.naturalWidth, h / im.naturalHeight)
    const dw = im.naturalWidth * s, dh = im.naturalHeight * s, x = (FACE_W - dw) / 2, y = (FACE_H - dh) / 2
    // stamped a few times a pixel apart, so thin pen lines read as marker from across the island
    for (const [ox, oy] of [[0, 0], [1.4, 0], [0, 1.4], [1.4, 1.4]]) this._ctx.drawImage(im, x + ox, y + oy, dw, dh)
  }

  _paint() {
    const c = this._ctx
    this._bg()
    const w = this._wipe
    if (this._drawing) {
      this._inkOnto(c)
    } else if (!w) {
      this._pic(this._shown)
    } else {
      // the eraser has cleared everything left of it; the next drawing comes up behind it
      const ex = w.p * FACE_W
      c.save(); c.beginPath(); c.rect(ex, 0, FACE_W - ex, FACE_H); c.clip()
      this._pic(w.from); c.restore()
      if (w.p > 0.5) {
        c.save(); c.globalAlpha = (w.p - 0.5) * 2
        c.beginPath(); c.rect(0, 0, ex, FACE_H); c.clip()
        this._pic(w.to); c.restore()
      }
    }
    this._tex.needsUpdate = true
  }

  /**
   * @param {number}  dt
   * @param {boolean} reducedMotion  swaps instead of wiping
   */
  update(dt, reducedMotion = false, inZone = false) {
    this.ring.update(dt, { lit: inZone, near: inZone, reducedMotion, bpm: 70 })
    // the cycling, unless the close-up is holding the board
    if (!this._wipe && !this._held && this._imgs.length > 1) {
      this._wait -= dt
      if (this._wait <= 0) {
        this._cur = (this._cur + 1) % this._imgs.length
        this._wipe = { from: this._shown, to: this._imgs[this._cur], p: 0 }
      }
    }
    const w = this._wipe
    if (!w) return
    if (reducedMotion) w.p = 1
    w.p = Math.min(1, w.p + dt / WIPE)
    this._eraser.position.set(-BW / 2 + 0.16 + w.p * (BW - 0.32), Math.sin(w.p * 40) * 0.2, 0.045)
    if (w.p >= 1) {
      this._shown = w.to
      this._wipe = null
      this._wait = HOLD
      this._eraser.position.copy(this._rest)
    }
    this._paint()
  }

  dispose() {
    this.group.traverse(o => { if (o.isMesh) o.geometry.dispose() })
    for (const m of this._mats) m.dispose()
    this._faceMat.dispose()
    this._tex.dispose()
    this.ring.dispose()
    this.group.removeFromParent()
  }
}

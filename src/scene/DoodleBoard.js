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
// Units: the character stands about 2.2 tall. The group's origin is the point
// it stands on and the board faces +Z, so a caller drops it onto a surface
// point, turns +Y to the surface normal and then +Z towards the viewer.
import * as THREE from 'three'

const BW = 2.0, BH = 1.5          // drawing surface, 4:3 like the drawings
const FACE_W = 768, FACE_H = 576
const HOLD = 4.5                  // seconds a drawing stays up
const WIPE = 1.1                  // seconds the eraser takes to cross

function mat(color, { rough = 0.75, metal = 0, map = null } = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, flatShading: !map, map })
}

export class DoodleBoard {
  constructor() {
    this.group = new THREE.Group()
    this.group.name = 'doodle-board'

    this._imgs = []
    this._cur = 0
    this._wipe = null
    this._wait = 2.5
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

    // the easel: two front legs leaning in, one back leg, a cross bar, a ledge
    add(this.group, new THREE.BoxGeometry(0.1, 2.9, 0.1), wood, -0.78, 1.38, -0.06, 0.05, 0, -0.13)
    add(this.group, new THREE.BoxGeometry(0.1, 2.9, 0.1), wood,  0.78, 1.38, -0.06, 0.05, 0,  0.13)
    add(this.group, new THREE.BoxGeometry(0.09, 2.7, 0.09), woodDark, 0, 1.25, -0.7, -0.42, 0, 0)
    add(this.group, new THREE.BoxGeometry(1.9, 0.08, 0.08), woodDark, 0, 0.55, 0.02)
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
  }

  /** The drawings to show, as image URLs (CORS-enabled). */
  setDrawings(urls) {
    const list = urls.map(src => {
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.decoding = 'async'
      im.src = src
      return im
    })
    Promise.all(list.map(im => im.decode().then(() => im, () => null))).then(ok => {
      this._imgs = ok.filter(Boolean)
      this._cur = 0
      this._wipe = null
      this._paint()
    })
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

  _drawing(im) {
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
    if (!w) {
      this._drawing(this._imgs[this._cur])
    } else {
      // the eraser has cleared everything left of it; the next drawing comes up behind it
      const ex = w.p * FACE_W
      c.save(); c.beginPath(); c.rect(ex, 0, FACE_W - ex, FACE_H); c.clip()
      this._drawing(this._imgs[w.from]); c.restore()
      if (w.p > 0.5) {
        c.save(); c.globalAlpha = (w.p - 0.5) * 2
        c.beginPath(); c.rect(0, 0, ex, FACE_H); c.clip()
        this._drawing(this._imgs[w.to]); c.restore()
      }
    }
    this._tex.needsUpdate = true
  }

  /**
   * @param {number}  dt
   * @param {boolean} reducedMotion  swaps instead of wiping
   */
  update(dt, reducedMotion = false) {
    if (this._imgs.length < 2) return
    if (!this._wipe) {
      this._wait -= dt
      if (this._wait > 0) return
      if (reducedMotion) {
        this._cur = (this._cur + 1) % this._imgs.length
        this._wait = HOLD
        this._paint()
        return
      }
      this._wipe = { from: this._cur, to: (this._cur + 1) % this._imgs.length, p: 0 }
    }
    const w = this._wipe
    w.p = Math.min(1, w.p + dt / WIPE)
    this._eraser.position.set(-BW / 2 + 0.16 + w.p * (BW - 0.32), Math.sin(w.p * 40) * 0.2, 0.045)
    if (w.p >= 1) {
      this._cur = w.to
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
    this.group.removeFromParent()
  }
}

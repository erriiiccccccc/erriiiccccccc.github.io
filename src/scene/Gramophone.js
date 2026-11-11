// The meadow's Jukebox, as a gramophone.
//
// A brass horn on a little wooden cabinet with a record turning under the
// arm, built from primitives with flatShading like every prop here: no model
// file, nothing to load. Around it, a dotted circle on the grass marks where
// its music reaches. When music is playing and you're inside, the circle
// lights up gold with a light running round it in time with the beat, the
// horn glows, and notes drift up out of the bell. Each dash sits on the
// actual ground (see conformRing), so the circle follows the island's curve.
//
// Units: the character stands about 2.2 tall. The group's origin is the point
// it stands on; +Y is up, +Z is the front.
import * as THREE from 'three'
import { GroundRing } from './GroundRing.js'

const NOTE_POOL = 18

function mat(color, { emissive = null, intensity = 0, rough = 0.75, metal = 0, side = THREE.FrontSide } = {}) {
  return new THREE.MeshStandardMaterial({
    color, roughness: rough, metalness: metal, flatShading: true, side,
    emissive: emissive ?? 0x000000, emissiveIntensity: intensity,
  })
}

function noteTexture(ch, color) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const x = c.getContext('2d')
  x.font = '96px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = color; x.shadowBlur = 18; x.fillStyle = color; x.fillText(ch, 64, 70)
  x.shadowBlur = 0; x.globalAlpha = 0.55; x.fillStyle = '#fff8e8'; x.fillText(ch, 64, 70)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export class Gramophone {
  /** @param {number} zoneRadius  radius of the music circle, world units */
  constructor(zoneRadius = 3.3) {
    this.group = new THREE.Group()
    this.group.name = 'jukebox'
    this.zoneRadius = zoneRadius
    this._t = 0
    this._lit = 0
    this._noteClock = 0
    this._mats = []
    this._geos = []

    const add = (parent, geo, m, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const o = new THREE.Mesh(geo, m)
      o.position.set(x, y, z); o.rotation.set(rx, ry, rz)
      o.castShadow = true; o.receiveShadow = true
      parent.add(o)
      return o
    }
    const M = (...a) => { const m = mat(...a); this._mats.push(m); return m }

    const wood = M(0x8a5a3a), woodD = M(0x5e3b26), dark = M(0x1f1a26), label = M(0xf3e8d8)
    const brass = M(0xd8a64a, { rough: 0.35, metal: 0.5 })
    this._inner = M(0xffd27a, { emissive: 0xffb347, intensity: 0.2, side: THREE.DoubleSide, rough: 0.5 })

    // cabinet
    add(this.group, new THREE.BoxGeometry(1.3, 0.9, 1.1), wood, 0, 0.45, 0)
    add(this.group, new THREE.BoxGeometry(1.38, 0.08, 1.18), woodD, 0, 0.92, 0)
    add(this.group, new THREE.BoxGeometry(1.38, 0.1, 1.18), woodD, 0, 0.05, 0)
    add(this.group, new THREE.BoxGeometry(0.5, 0.32, 0.04), woodD, 0, 0.45, 0.56)
    // record and tone arm
    this._record = add(this.group, new THREE.CylinderGeometry(0.5, 0.5, 0.04, 18), dark, 0, 0.98, 0.05)
    add(this._record, new THREE.CylinderGeometry(0.16, 0.16, 0.012, 12), label, 0, 0.026, 0)
    add(this.group, new THREE.BoxGeometry(0.5, 0.05, 0.05), brass, 0.3, 1.06, -0.25, 0, 0.6, 0)
    // the horn: a post, a curved neck, then a big flared bell facing forward
    add(this.group, new THREE.CylinderGeometry(0.07, 0.07, 0.7, 8), brass, -0.38, 1.3, -0.35)
    add(this.group, new THREE.CylinderGeometry(0.08, 0.12, 0.5, 8), brass, -0.33, 1.68, -0.3, 0.35, 0, 0.2)
    this._bell = new THREE.Group()
    this._bell.position.set(-0.22, 1.95, -0.1)
    this._bell.rotation.set(0.95, 0, 0.35)
    this.group.add(this._bell)
    const flare = add(this._bell, new THREE.CylinderGeometry(0.95, 0.14, 1.2, 12, 1, true), brass, 0, 0.5, 0)
    flare.receiveShadow = false
    const glow = add(this._bell, new THREE.CylinderGeometry(0.9, 0.13, 1.16, 12, 1, true), this._inner, 0, 0.5, 0)
    glow.castShadow = false
    this._source = new THREE.Object3D()
    this._source.position.set(0, 1.15, 0)
    this._bell.add(this._source)

    // the music circle
    this.ring = new GroundRing(zoneRadius)
    this.group.add(this.ring.group)

    // notes in the air
    this._noteTex = [noteTexture('♪', '#FBBF24'), noteTexture('♫', '#A78BFA'), noteTexture('♩', '#FBBF24'), noteTexture('♬', '#C4B5FD')]
    this._notes = []
    for (let i = 0; i < NOTE_POOL; i++) {
      const m = new THREE.SpriteMaterial({ map: this._noteTex[i % 4], transparent: true, depthWrite: false, opacity: 0 })
      this._mats.push(m)
      const s = new THREE.Sprite(m)
      s.visible = false
      this.group.add(s)
      this._notes.push({ s, life: 0, vx: 0, vz: 0, ph: 0, dur: 2.4 })
    }
    this._v = new THREE.Vector3()
  }

  /**
   * @param {number} dt
   * @param {{ playing: boolean, inZone: boolean, near: boolean, reducedMotion: boolean, bpm?: number }} s
   */
  update(dt, { playing = false, inZone = false, near = false, reducedMotion = false, bpm = 96 } = {}) {
    this._t += dt
    const lit = playing && inZone
    const k = Math.min(1, dt * 4)
    this._lit += ((lit ? 1 : 0) - this._lit) * k

    this.ring.update(dt, { lit, near, reducedMotion, bpm })

    // the gramophone itself: the record turns, the horn glows and pulses
    if (!reducedMotion) this._record.rotation.y += dt * (playing ? 3.0 : 0.25)
    this._inner.emissiveIntensity = 0.2 + this._lit * (0.35 + 0.2 * Math.sin(this._t * 6))
    this._bell.scale.setScalar(reducedMotion ? 1 : 1 + this._lit * 0.02 * Math.sin(this._t * 9))

    // notes drift up out of the bell while lit
    if (lit && !reducedMotion) {
      this._noteClock -= dt
      if (this._noteClock <= 0) { this._spawnNote(); this._noteClock = 0.32 + Math.random() * 0.25 }
    }
    for (const n of this._notes) {
      if (n.life <= 0) continue
      n.life -= dt / n.dur
      const age = 1 - n.life
      n.s.position.x += (n.vx + Math.sin(this._t * 2 + n.ph) * 0.25) * dt
      n.s.position.z += n.vz * dt
      n.s.position.y += dt * 1.1
      n.s.material.opacity = Math.min(1, age * 5) * Math.min(1, n.life * 2.5)
      n.s.material.rotation = Math.sin(this._t * 3 + n.ph) * 0.3
      n.s.scale.setScalar(0.25 + age * 0.3)
      if (n.life <= 0) n.s.visible = false
    }
  }

  /**
   * Sit every dash on the real ground. `heightAt(x, z)` gets a point in this
   * group's space and returns the ground's height there (same space), or null.
   */
  conformRing(heightAt) { this.ring.conform(heightAt) }

  _spawnNote() {
    const n = this._notes.find(x => x.life <= 0)
    if (!n) return
    this._source.updateWorldMatrix(true, false)
    this._v.setFromMatrixPosition(this._source.matrixWorld)
    this.group.worldToLocal(this._v)
    n.s.position.set(this._v.x + (Math.random() - 0.5) * 0.4, this._v.y, this._v.z + (Math.random() - 0.5) * 0.4)
    n.vx = (Math.random() - 0.5) * 0.5
    n.vz = (Math.random() - 0.5) * 0.5 + 0.15
    n.ph = Math.random() * 6
    n.life = 1
    n.dur = 2.2 + Math.random() * 0.8
    n.s.visible = true
    n.s.scale.setScalar(0.01)
  }

  dispose() {
    this.group.traverse(o => { if (o.isMesh && !this._geos.includes(o.geometry)) o.geometry.dispose() })
    for (const g of this._geos) g.dispose()
    for (const m of this._mats) m.dispose()
    for (const t of this._noteTex) t.dispose()
    this.ring.dispose()
    this.group.removeFromParent()
  }
}

// A dotted circle on the ground around a prop: where you can use it.
//
// Dashes lying on the grass, each with a soft glow. At rest it's a quiet
// white; when lit it turns gold, a light runs round it (one lap every two
// beats) and the dashes breathe. The dashes don't spin: each one sits on the
// real ground (see conform), so the circle follows the island's curve.
//
// Lives in the prop's own space: add `ring.group` to the prop's group.
import * as THREE from 'three'

let _glowTex = null
function glowTexture() {
  if (_glowTex) return _glowTex
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,214,140,1)'); g.addColorStop(0.4, 'rgba(251,191,36,.45)'); g.addColorStop(1, 'rgba(167,139,250,0)')
  x.fillStyle = g; x.fillRect(0, 0, 64, 64)
  _glowTex = new THREE.CanvasTexture(c)
  return _glowTex
}

export class GroundRing {
  /**
   * @param {number} radius  world units
   * @param {object} [o]
   * @param {number} [o.dashes]  how many dashes round the circle
   */
  constructor(radius, { dashes = Math.round(radius * 12) } = {}) {
    this.radius = radius
    this.group = new THREE.Group()
    this._t = 0
    this._lit = 0
    this._geo = new THREE.PlaneGeometry(0.28, 0.085)
    this._mats = []
    this._dashes = []
    for (let i = 0; i < dashes; i++) {
      const a = (i / dashes) * Math.PI * 2
      const m = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, depthWrite: false })
      const d = new THREE.Mesh(this._geo, m)
      d.rotation.set(-Math.PI / 2, 0, -a)
      d.position.set(Math.cos(a) * radius, 0.06, Math.sin(a) * radius)
      d.renderOrder = 2
      const gm = new THREE.SpriteMaterial({ map: glowTexture(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })
      const g = new THREE.Sprite(gm)
      g.position.copy(d.position)
      g.scale.setScalar(0.9)
      this._mats.push(m, gm)
      this.group.add(d, g)
      this._dashes.push({ d, g, a })
    }
  }

  /**
   * @param {number}  dt
   * @param {{ lit: boolean, near: boolean, reducedMotion: boolean, bpm?: number }} s
   */
  update(dt, { lit = false, near = false, reducedMotion = false, bpm = 96 } = {}) {
    this._t += dt
    this._lit += ((lit ? 1 : 0) - this._lit) * Math.min(1, dt * 4)
    const base = lit ? 0.75 : near ? 0.85 : 0.6
    const lap = reducedMotion ? 0 : this._t * (bpm / 60) / 2
    const breathe = reducedMotion ? 1 : 1 + this._lit * 0.25 * Math.max(0, Math.sin(this._t * Math.PI * (bpm / 60)))
    for (const { d, g, a } of this._dashes) {
      const chase = Math.pow(Math.max(0, Math.cos(((a / (Math.PI * 2) - lap) % 1) * Math.PI * 2)), 6)
      const m = d.material
      m.opacity += (Math.min(1, base + this._lit * chase * 0.5) - m.opacity) * Math.min(1, dt * 8)
      m.color.setRGB(1, 1 - this._lit * 0.17, 1 - this._lit * 0.45)
      d.scale.set(breathe, breathe, 1)
      g.material.opacity = this._lit * (0.25 + chase * 0.75)
    }
  }

  /**
   * Sit every dash on the real ground. `heightAt(x, z)` takes a point in the
   * ring's space and returns the ground height there (same space), or null.
   */
  conform(heightAt) {
    for (const { d, g } of this._dashes) {
      const h = heightAt(d.position.x, d.position.z)
      if (h == null) { d.visible = g.visible = false; continue }
      d.position.y = h + 0.06
      g.position.y = h + 0.12
    }
  }

  dispose() {
    this._geo.dispose()
    for (const m of this._mats) m.dispose()
    this.group.removeFromParent()
  }
}

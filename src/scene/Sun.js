import * as THREE from 'three'

// One of several bodies scattered around the sky. This one sits front-left, so
// it greets you near spawn. Added to `scene` (world space) so it stays fixed
// while the planet rotates underfoot.
const SUN_POS = new THREE.Vector3(-44, 48, -166)

// Soft radial-gradient texture for the glow sprites (generated once, no assets).
function makeGlowTexture(inner = 'rgba(255,250,210,1)', outer = 'rgba(255,180,80,0)') {
  const size = 256
  const cv = document.createElement('canvas')
  cv.width = cv.height = size
  const ctx = cv.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0.0, inner)
  g.addColorStop(0.25, inner)
  g.addColorStop(1.0, outer)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// A low-poly sun with a warm bloom glow: faceted core, soft camera-facing glow
// sprites, layered additive halos, and a slow breathing pulse.
export class Sun {
  constructor() {
    this.group = new THREE.Group()
    this._pos  = SUN_POS.clone()
    this._t    = 0

    // Pulsing wrapper so the breathing scale never fights the face's local layout
    this._core = new THREE.Group()
    this._core.position.copy(this._pos)
    this.group.add(this._core)

    // ── Glow sprites (camera-facing bloom) ──────────────────────────────────
    // A tight warm core flare + a wide soft halo. These are what give the sun
    // its "lit" feel; they always face the camera so it reads round from anywhere.
    this._glows = []
    const flare = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture('rgba(255,248,200,0.95)', 'rgba(255,170,70,0)'),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }))
    flare.scale.setScalar(46)
    const wide = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture('rgba(255,200,110,0.55)', 'rgba(255,120,40,0)'),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }))
    wide.scale.setScalar(95)
    this._core.add(wide, flare)
    this._glows.push({ sprite: flare, base: 46 }, { sprite: wide, base: 95 })

    // Faceted disc core — near-white hot so it's the brightest point, no dark disc
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(6, 2),
      new THREE.MeshBasicMaterial({ color: 0xFFFBEC, flatShading: true })
    )
    this._core.add(core)

    // Front-facing additive shell sitting right on the core surface. This lifts
    // the centre's brightness up to (and past) the surrounding glow ring, so the
    // middle reads as the hottest part instead of a dark disc.
    const hot = new THREE.Mesh(
      new THREE.SphereGeometry(6.1, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0xFFF0C0, transparent: true, opacity: 0.55,
        depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.FrontSide,
      })
    )
    this._core.add(hot)

    // Layered additive halos hugging the disc (BackSide shells)
    this._halos = [
      this._halo(7.6,  0xFFEFA0, 0.40),
      this._halo(10,   0xFFCC55, 0.20),
      this._halo(15,   0xFFAA33, 0.09),
    ]
    this._haloBase = this._halos.map(h => h.material.opacity)
    this._halos.forEach(h => this._core.add(h))
  }

  _halo(radius, color, opacity) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, 18, 18),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity,
        depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide,
      })
    )
  }

  update(dt, time, reducedMotion = false) {
    if (reducedMotion) return
    this._t = time
    // Slow breathing pulse on the whole sun
    const pulse = 1 + Math.sin(time * 0.6) * 0.035
    this._core.scale.setScalar(pulse)
    // Glow sprites shimmer slightly out of phase with the breath
    const glowPulse = 1 + Math.sin(time * 0.6 + 0.4) * 0.06
    for (const g of this._glows) g.sprite.scale.setScalar(g.base * glowPulse)
    // Halo shimmer
    for (let i = 0; i < this._halos.length; i++) {
      const shimmer = 0.85 + 0.15 * Math.sin(time * (0.5 + i * 0.18) + i)
      this._halos[i].material.opacity = this._haloBase[i] * shimmer
    }
  }
}

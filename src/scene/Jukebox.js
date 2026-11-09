// The meadow jukebox.
//
// A little Wurlitzer built out of Three.js primitives with flatShading, the
// same way every prop in this world is made: no model file, no texture, so it
// costs nothing to load and stays inside the low-poly storybook family. The
// telescope came out of the GLB; this one is assembled here, which means it
// can be moved or resized without a world re-export.
//
// The group's origin is the point it stands on, so a caller can drop it
// straight onto a surface point and rotate +Y to the surface normal.
import * as THREE from 'three'

const WOOD   = 0x8D6E63     // warm cabinet
const TRIM   = 0x2A1F3D     // deep purple-brown, reads as shadow at distance
const GLASS  = 0x7C3AED     // accent / magic
const WARM   = 0xFBBF24     // island gold, for the side tubes
const LABEL  = 0xF3E8D8     // record label

function mat(color, { emissive = null, intensity = 0, rough = 0.7 } = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive:          emissive ?? 0x000000,
    emissiveIntensity: intensity,
    roughness:         rough,
    metalness:         0.0,
    flatShading:       true,
  })
}

export class Jukebox {
  /** @param {number} [scale] world units; the character stands about 2.2 tall */
  constructor(scale = 1) {
    this.group = new THREE.Group()
    this.group.name = 'jukebox'

    this._t = 0

    const add = (geo, material, x, y, z) => {
      const m = new THREE.Mesh(geo, material)
      m.position.set(x, y, z)
      m.castShadow    = true
      m.receiveShadow = true
      this.group.add(m)
      return m
    }

    const woodMat  = mat(WOOD)
    const trimMat  = mat(TRIM, { rough: 0.85 })
    const labelMat = mat(LABEL, { rough: 0.9 })
    this._glassMat = mat(GLASS, { emissive: GLASS, intensity: 0.9, rough: 0.35 })
    this._tubeMat  = mat(WARM,  { emissive: WARM,  intensity: 0.8, rough: 0.4 })

    // Plinth, cabinet, and a half-round crown. The crown is a whole cylinder
    // laid on its side: the bottom half is buried in the cabinet, which is
    // cheaper than a theta-limited arc and reads identically.
    add(new THREE.BoxGeometry(1.60, 0.18, 0.95), trimMat, 0, 0.09, 0)
    add(new THREE.BoxGeometry(1.50, 1.52, 0.85), woodMat, 0, 0.94, 0)

    const crown = add(new THREE.CylinderGeometry(0.75, 0.75, 0.85, 12), woodMat, 0, 1.70, 0)
    crown.rotation.x = Math.PI / 2

    // The lit front: one glowing panel with a few dark slats under it for the
    // speaker. Both sit just proud of the cabinet face so they never z-fight.
    // The panel sits low enough to leave the record showing in the arch above it.
    add(new THREE.BoxGeometry(1.12, 0.58, 0.06), this._glassMat, 0, 1.20, 0.44)
    for (let i = 0; i < 4; i++) {
      add(new THREE.BoxGeometry(1.02, 0.06, 0.05), trimMat, 0, 0.44 + i * 0.13, 0.44)
    }

    // Side tubes flanking the panel, the bit that makes it read as a jukebox
    // from across a field. They ride on the front face, not inside the box.
    for (const x of [-0.66, 0.66]) {
      const tube = add(new THREE.CylinderGeometry(0.075, 0.075, 1.45, 6), this._tubeMat, x, 1.00, 0.45)
      tube.castShadow = false
    }

    // A record turning in the arch. It lives inside a tipped-over wrapper so
    // that spinning it is a plain rotation about its own axis, not an Euler
    // puzzle: the wrapper lays the disc on its face, the disc turns on Y.
    // z clears the crown's own front face (its half-length, 0.425) so the disc
    // sits in the arch instead of inside it.
    const sleeve = new THREE.Group()
    sleeve.rotation.x = Math.PI / 2
    sleeve.position.set(0, 1.72, 0.44)
    this.group.add(sleeve)

    this._record = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.05, 16), trimMat)
    this._record.castShadow = true
    sleeve.add(this._record)

    const label = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.07, 12), labelMat)
    this._record.add(label)

    this.group.scale.setScalar(scale)
  }

  /**
   * @param {number}  dt
   * @param {boolean} reducedMotion
   */
  update(dt, reducedMotion = false) {
    this._t += dt
    // Slow breathing glow, so it looks switched on rather than painted on.
    const pulse = 0.5 + 0.5 * Math.sin(this._t * 1.3)
    const calm  = reducedMotion ? 0 : 1
    this._glassMat.emissiveIntensity = 0.75 + pulse * 0.35 * calm
    this._tubeMat.emissiveIntensity  = 0.65 + (1 - pulse) * 0.40 * calm
    if (!reducedMotion) this._record.rotation.y += dt * 0.9
  }

  dispose() {
    this.group.traverse(o => {
      if (!o.isMesh) return
      o.geometry.dispose()
      o.material.dispose()
    })
    this.group.removeFromParent()
  }
}

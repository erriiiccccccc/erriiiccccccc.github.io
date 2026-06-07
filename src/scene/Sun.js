import * as THREE from 'three'

// Same direction as the DirectionalLight in Lighting.js
const SUN_DIR  = new THREE.Vector3(30, 40, 20).normalize()
const SUN_DIST = 170

// Add this group to planetGroup — it rotates with the planet
export class Sun {
  constructor() {
    this.group = new THREE.Group()
    const pos  = SUN_DIR.clone().multiplyScalar(SUN_DIST)

    // Core — bright white-yellow disc
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(6, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xFFFDE0 })
    )
    core.position.copy(pos)
    this.group.add(core)

    // Layered halos
    this.group.add(this._halo(pos, 9.5,  0xFFEE88, 0.28))
    this.group.add(this._halo(pos, 16,   0xFFAA33, 0.10))
    this.group.add(this._halo(pos, 30,   0xFF8800, 0.045))
    this.group.add(this._halo(pos, 55,   0xFF6600, 0.015))
  }

  _halo(pos, radius, color, opacity) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 16, 16),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
        blending:   THREE.AdditiveBlending,
        side:       THREE.BackSide,
      })
    )
    mesh.position.copy(pos)
    return mesh
  }
}

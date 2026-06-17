import * as THREE from 'three'

// A handful of tiny tumbling low-poly rocks drifting through the mid-distance for
// subtle parallax life. Each drifts slowly; when it strays past the shell it wraps
// back to the far side. Added to `scene` (world space).

const COUNT     = 11
const SHELL_MIN = 70
const SHELL_MAX = 110

// Jitter an icosahedron's vertices into an irregular lump.
function lumpGeo(radius) {
  const geo = new THREE.IcosahedronGeometry(radius, 0)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const f = 0.7 + Math.random() * 0.6
    pos.setXYZ(i, pos.getX(i) * f, pos.getY(i) * f, pos.getZ(i) * f)
  }
  geo.computeVertexNormals()
  return geo
}

function randomShellPos(out) {
  const r     = SHELL_MIN + Math.random() * (SHELL_MAX - SHELL_MIN)
  const theta = Math.random() * Math.PI * 2
  const phi   = Math.acos(2 * Math.random() - 1)
  return out.set(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

const ROCK_COLORS = [0x6E6258, 0x7A6A5C, 0x5C5650, 0x83705F]

export class Asteroids {
  constructor() {
    this.group  = new THREE.Group()
    this._rocks = []

    for (let i = 0; i < COUNT; i++) {
      const radius = 0.7 + Math.random() * 1.4
      const mesh = new THREE.Mesh(
        lumpGeo(radius),
        new THREE.MeshStandardMaterial({
          color: ROCK_COLORS[i % ROCK_COLORS.length],
          flatShading: true, roughness: 1, metalness: 0,
          emissive: 0x0A0A0E, emissiveIntensity: 0.5,
        })
      )
      mesh.castShadow = mesh.receiveShadow = false
      randomShellPos(mesh.position)

      this._rocks.push({
        mesh,
        // gentle linear drift
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 2.4,
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 2.4
        ),
        // tumble
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        ),
      })
      this.group.add(mesh)
    }
  }

  update(dt, time, reducedMotion = false) {
    if (reducedMotion) return
    for (const r of this._rocks) {
      const p = r.mesh.position
      p.addScaledVector(r.vel, dt)
      r.mesh.rotation.x += r.spin.x * dt
      r.mesh.rotation.y += r.spin.y * dt
      r.mesh.rotation.z += r.spin.z * dt
      // Wrap to the opposite side of the shell when it drifts too far out
      if (p.lengthSq() > SHELL_MAX * SHELL_MAX * 1.6) {
        randomShellPos(p).multiplyScalar(-1).clampLength(SHELL_MIN, SHELL_MAX)
      }
    }
  }
}

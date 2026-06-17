import * as THREE from 'three'

// Distant low-poly worlds hanging in deep space: a banded ringed gas giant, a
// small cratered moon, and a warm accent world. Each slowly spins on a tilted
// axis. Added to `scene` (world space). flatShading per the brand bible.

// Paint horizontal colour bands into a geometry's vertex colours by latitude (y).
function bandColors(geo, stops) {
  const pos = geo.attributes.position
  const colors = new Float32Array(pos.count * 3)
  geo.computeBoundingBox()
  const { min, max } = geo.boundingBox
  const span = (max.y - min.y) || 1
  const c = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) - min.y) / span        // 0 bottom → 1 top
    // pick the nearest band stop
    let chosen = stops[0][1]
    for (const [edge, hex] of stops) { if (t >= edge) chosen = hex }
    c.set(chosen)
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
}

// Random darker facets → cratered look, no extra geometry needed.
function speckle(geo, base, dark, amount = 0.25) {
  const pos = geo.attributes.position
  const colors = new Float32Array(pos.count * 3)
  const b = new THREE.Color(base), d = new THREE.Color(dark), c = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    c.copy(Math.random() < amount ? d : b)
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
}

export class CelestialBodies {
  constructor() {
    this.group   = new THREE.Group()
    this._bodies = []

    // ── Gas giant (banded) + ring ────────────────────────────────────────────
    {
      const geo = new THREE.IcosahedronGeometry(16, 3)
      bandColors(geo, [
        [0.0, 0x8C5A3C], [0.18, 0xC78B52], [0.36, 0xE0B070],
        [0.55, 0xC78B52], [0.72, 0xD9A05E], [0.88, 0xB07840],
      ])
      const planet = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        vertexColors: true, flatShading: true, roughness: 0.9, metalness: 0,
        emissive: 0x2A1505, emissiveIntensity: 0.4,
      }))

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(20, 30, 48),
        new THREE.MeshBasicMaterial({
          color: 0xE8C896, transparent: true, opacity: 0.35,
          side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
        })
      )
      ring.rotation.x = Math.PI / 2

      // Around the far/back side of the planet — discovered as you explore.
      this._add({ x: -28, y: 52, z: 199 }, [planet, ring], 0.18, [0.4, 1, 0.15])
    }

    // ── Moon (cratered grey) ──────────────────────────────────────────────────
    {
      const geo = new THREE.IcosahedronGeometry(7, 2)
      speckle(geo, 0xBFC4CC, 0x7C828C, 0.3)
      const moon = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        vertexColors: true, flatShading: true, roughness: 1, metalness: 0,
        emissive: 0x161A22, emissiveIntensity: 0.6,
      }))
      // Off to the right — comes into view as you turn that way.
      this._add({ x: 136, y: 38, z: -85 }, [moon], 0.12, [0.2, 1, 0.3])
    }

    // ── Warm accent world ─────────────────────────────────────────────────────
    {
      const geo = new THREE.IcosahedronGeometry(11, 2)
      speckle(geo, 0xE0683C, 0xA8401E, 0.22)
      const world = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        vertexColors: true, flatShading: true, roughness: 0.85, metalness: 0,
        emissive: 0x301005, emissiveIntensity: 0.45,
      }))
      // Around the left/back side — another one to find while wandering.
      this._add({ x: -169, y: 30, z: 6 }, [world], 0.22, [0.1, 1, 0.5])
    }
  }

  // Wrap meshes in a tilted spin pivot at a fixed sky position.
  _add(pos, meshes, speed, axis) {
    const pivot = new THREE.Group()
    pivot.position.set(pos.x, pos.y, pos.z)
    for (const m of meshes) { m.castShadow = false; m.receiveShadow = false; pivot.add(m) }
    const ax = new THREE.Vector3(axis[0], axis[1], axis[2]).normalize()
    this._bodies.push({ pivot, ax, speed })
    this.group.add(pivot)
  }

  update(dt, time, reducedMotion = false) {
    if (reducedMotion) return
    for (const b of this._bodies) b.pivot.rotateOnAxis(b.ax, b.speed * dt)
  }
}

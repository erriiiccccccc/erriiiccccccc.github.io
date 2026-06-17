import * as THREE from 'three'

// Occasional sky traffic: every ~12-28s one craft (UFO, rocket, or satellite)
// cruises across the sky along a gentle Bezier arc, then despawns. Suppressed
// entirely under reduced-motion. Added to `scene` (world space).

const SHELL = 80                 // nominal flight radius
const TYPES = ['ufo', 'ufo', 'rocket', 'satellite']   // UFO weighted (the hero)

// ── craft builders ────────────────────────────────────────────────────────────

function buildUFO() {
  const g = new THREE.Group()
  const mat = (c) => new THREE.MeshStandardMaterial({ color: c, flatShading: true, roughness: 0.5, metalness: 0.4 })

  // saucer = two cones base-to-base
  const lower = new THREE.Mesh(new THREE.ConeGeometry(2.6, 1.0, 18), mat(0x9AA6B8))
  lower.rotation.x = Math.PI
  lower.position.y = -0.3
  const upper = new THREE.Mesh(new THREE.ConeGeometry(2.2, 0.7, 18), mat(0xB9C3D2))
  upper.position.y = 0.2
  // glass dome
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x8FE3FF, transparent: true, opacity: 0.55, flatShading: true, emissive: 0x2A6E88, emissiveIntensity: 0.5 })
  )
  dome.position.y = 0.45
  g.add(lower, upper, dome)

  // ring of blinking lights
  const lights = []
  const lightGeo = new THREE.SphereGeometry(0.22, 8, 8)
  const N = 8
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    const m = new THREE.Mesh(lightGeo, new THREE.MeshBasicMaterial({
      color: 0xFFE066, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    m.position.set(Math.cos(a) * 2.5, -0.15, Math.sin(a) * 2.5)
    g.add(m); lights.push(m)
  }

  // tractor beam
  const beam = new THREE.Mesh(
    new THREE.ConeGeometry(2.4, 7, 18, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x9EE6FF, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
  )
  beam.position.y = -4
  beam.rotation.x = Math.PI    // wide end downward
  g.add(beam)

  g.userData.tick = (t) => {
    for (let i = 0; i < lights.length; i++) {
      lights[i].material.opacity = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 6 - i * 0.9))
    }
    beam.material.opacity = 0.09 + 0.06 * (0.5 + 0.5 * Math.sin(t * 2.5))
  }
  g.userData.flat = true       // saucers stay level (just bank slightly)
  return g
}

function buildRocket() {
  const g = new THREE.Group()
  // The parts model a rocket pointing +Y; flight orients the group's +Z toward
  // velocity, so tilt an inner wrapper so the nose aligns with +Z. (Setting the
  // rotation on `g` itself would be clobbered by lookAt every frame.)
  const inner = new THREE.Group()
  inner.rotation.x = Math.PI / 2
  g.add(inner)
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.7, 3.2, 14),
    new THREE.MeshStandardMaterial({ color: 0xF2F2F5, flatShading: true, roughness: 0.6 })
  )
  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.55, 1.3, 14),
    new THREE.MeshStandardMaterial({ color: 0xE8503A, flatShading: true, roughness: 0.6 })
  )
  nose.position.y = 2.25
  inner.add(body, nose)

  // fins
  const finMat = new THREE.MeshStandardMaterial({ color: 0xE8503A, flatShading: true, roughness: 0.6 })
  for (let i = 0; i < 3; i++) {
    const fin = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.2, 4), finMat)
    const a = (i / 3) * Math.PI * 2
    fin.position.set(Math.cos(a) * 0.7, -1.4, Math.sin(a) * 0.7)
    fin.rotation.y = -a
    inner.add(fin)
  }

  // exhaust flame
  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.45, 1.6, 12),
    new THREE.MeshBasicMaterial({ color: 0xFFB24A, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
  )
  flame.rotation.x = Math.PI
  flame.position.y = -2.4
  inner.add(flame)

  g.userData.tick = (t) => {
    const f = 0.7 + 0.3 * Math.sin(t * 30)
    flame.scale.set(0.8 + 0.4 * Math.random(), f + 0.4 * Math.random(), 0.8 + 0.4 * Math.random())
    flame.material.opacity = 0.7 + 0.3 * Math.random()
  }
  g.userData.flat = false
  return g
}

function buildSatellite() {
  const g = new THREE.Group()
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 1.1, 1.6),
    new THREE.MeshStandardMaterial({ color: 0xC9B07A, flatShading: true, roughness: 0.7, metalness: 0.3 })
  )
  g.add(body)
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x2C5FAE, flatShading: true, roughness: 0.4, metalness: 0.5, emissive: 0x0A1A3A, emissiveIntensity: 0.4 })
  for (const sx of [-1, 1]) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 1.2), panelMat)
    panel.position.x = sx * 2.0
    g.add(panel)
  }
  // dish
  const dish = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xE8E8EC, flatShading: true, roughness: 0.5 })
  )
  dish.position.set(0, 0.7, 0.4)
  g.add(dish)

  g.userData.tumble = new THREE.Vector3(0.2, 0.35, 0.1)
  g.userData.tick = null
  g.userData.flat = true
  return g
}

const BUILDERS = { ufo: buildUFO, rocket: buildRocket, satellite: buildSatellite }

// ── flight path ─────────────────────────────────────────────────────────────

const _v = new THREE.Vector3()
function spherePoint(r, theta, phi, out) {
  return out.set(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

export class Flyers {
  constructor() {
    this.group      = new THREE.Group()
    this._active    = []
    this._nextSpawn = 2 + Math.random() * 4
  }

  _spawn() {
    const type    = TYPES[(Math.random() * TYPES.length) | 0]
    const craft   = BUILDERS[type]()
    const scale   = type === 'ufo' ? 1.0 : type === 'rocket' ? 0.9 : 0.8
    craft.scale.setScalar(scale)

    // Arc: enter one side of the upper sky, exit the other, bowing outward + up.
    const r      = SHELL * (0.8 + Math.random() * 0.5)
    const phi    = 0.5 + Math.random() * 0.7
    const tStart = Math.random() * Math.PI * 2
    const tEnd   = tStart + (Math.PI * 0.6 + Math.random() * Math.PI * 0.7) * (Math.random() < 0.5 ? 1 : -1)
    const start  = spherePoint(r, tStart, phi, new THREE.Vector3())
    const end    = spherePoint(r, tEnd, phi, new THREE.Vector3())
    const ctrl   = start.clone().add(end).multiplyScalar(0.5).multiplyScalar(1.25)
    ctrl.y += 20 + Math.random() * 25

    const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end)

    this.group.add(craft)
    this._active.push({
      craft, curve, type,
      age: 0,
      life: 10 + Math.random() * 8,
      bob: Math.random() * Math.PI * 2,
    })
  }

  update(dt, time, reducedMotion = false) {
    if (reducedMotion) return

    this._nextSpawn -= dt
    if (this._nextSpawn <= 0) {
      this._spawn()
      this._nextSpawn = 7 + Math.random() * 10
    }

    for (let i = this._active.length - 1; i >= 0; i--) {
      const f = this._active[i]
      f.age += dt
      const t = f.age / f.life

      if (t >= 1) {
        this._dispose(f)
        this._active.splice(i, 1)
        continue
      }

      const ud = f.craft.userData
      f.curve.getPoint(t, f.craft.position)

      if (ud.flat) {
        // stay level, gentle bob + slow bank
        f.craft.position.y += Math.sin(time * 1.5 + f.bob) * 0.8
        f.craft.rotation.z = Math.sin(time * 0.8 + f.bob) * 0.15
        f.craft.rotation.y += dt * 0.4
        if (ud.tumble) {
          f.craft.rotation.x += ud.tumble.x * dt
          f.craft.rotation.y += ud.tumble.y * dt
          f.craft.rotation.z += ud.tumble.z * dt
        }
      } else {
        // orient toward direction of travel
        f.curve.getPoint(Math.min(1, t + 0.01), _v)
        f.craft.lookAt(_v)
      }

      // fade in/out at the ends so craft don't pop
      const fade = Math.min(1, t / 0.08, (1 - t) / 0.08)
      this._setOpacity(f.craft, fade)

      if (ud.tick) ud.tick(time, dt)
    }
  }

  _setOpacity(craft, k) {
    craft.traverse(o => {
      if (!o.isMesh) return
      const m = o.material
      // Solid hull meshes get a master visibility toggle near the very edges;
      // keep them fully opaque otherwise so they don't turn glassy mid-flight.
      if (m.transparent) {
        if (m.userData.baseOpacity === undefined) m.userData.baseOpacity = m.opacity
        m.opacity = m.userData.baseOpacity * k
      } else {
        o.visible = k > 0.02
      }
    })
  }

  _dispose(f) {
    this.group.remove(f.craft)
    f.craft.traverse(o => {
      if (o.isMesh) { o.geometry.dispose(); o.material.dispose() }
    })
  }
}

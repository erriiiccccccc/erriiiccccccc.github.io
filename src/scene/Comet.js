import * as THREE from 'three'

// The rare wish-comet: slower and far brighter than a shooting star, with a long
// persistent glowing tail and a soft glowing head. Shows up only occasionally as
// a "moment". One at a time. Suppressed under reduced-motion. World space.

const TRAIL_LEN  = 60
const TRAIL_DIST = 60          // physical tail length in world units
const FAR_R      = 150

const TAIL_VERT = `
  attribute float alpha;
  attribute float mixv;
  varying float vAlpha;
  varying float vMix;
  void main() {
    vAlpha = alpha; vMix = mixv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const TAIL_FRAG = `
  varying float vAlpha;
  varying float vMix;
  void main() {
    vec3 head = vec3(1.0, 0.97, 0.85);   // warm white
    vec3 tail = vec3(0.45, 0.85, 1.0);   // cyan
    gl_FragColor = vec4(mix(head, tail, vMix), vAlpha);
  }
`

const _head = new THREE.Vector3()
const _dir  = new THREE.Vector3()

function spherePoint(r, theta, phi, out) {
  return out.set(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

export class Comet {
  constructor() {
    this.group      = new THREE.Group()
    this._active    = null
    this._nextSpawn = 15 + Math.random() * 20   // first one comes fairly soon-ish

    this._tailMat = new THREE.ShaderMaterial({
      vertexShader: TAIL_VERT, fragmentShader: TAIL_FRAG,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    })
  }

  _spawn() {
    const phi   = 0.4 + Math.random() * 0.5
    const tA    = Math.random() * Math.PI * 2
    const tB    = tA + (Math.PI * 0.7 + Math.random() * Math.PI * 0.6) * (Math.random() < 0.5 ? 1 : -1)
    const start = spherePoint(FAR_R, tA, phi, new THREE.Vector3())
    const end   = spherePoint(FAR_R, tB, phi, new THREE.Vector3())
    const ctrl  = start.clone().add(end).multiplyScalar(0.5)
    ctrl.y += 30
    const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end)

    // tail line
    const positions = new Float32Array(TRAIL_LEN * 3)
    const alphas    = new Float32Array(TRAIL_LEN)
    const mixv      = new Float32Array(TRAIL_LEN)
    for (let j = 0; j < TRAIL_LEN; j++) mixv[j] = j / (TRAIL_LEN - 1)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1))
    geo.setAttribute('mixv',     new THREE.BufferAttribute(mixv, 1))
    const line = new THREE.Line(geo, this._tailMat)

    // glowing head: bright core + soft halo
    const head = new THREE.Group()
    head.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xFFFDF0, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })
    ))
    head.add(new THREE.Mesh(
      new THREE.SphereGeometry(3.0, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xCFE8FF, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide })
    ))

    this.group.add(line, head)
    this._active = { curve, line, geo, head, age: 0, life: 5.5 }
  }

  update(dt, time, reducedMotion = false) {
    if (reducedMotion) return

    if (!this._active) {
      this._nextSpawn -= dt
      if (this._nextSpawn <= 0) {
        this._spawn()
        this._nextSpawn = 35 + Math.random() * 35
      }
      return
    }

    const c = this._active
    c.age += dt
    const t = Math.min(1, c.age / c.life)

    c.curve.getPoint(t, _head)
    c.curve.getTangent(t, _dir)            // unit direction of travel
    c.head.position.copy(_head)

    const env = Math.min(1, t / 0.12, (1 - t) / 0.18)   // fade in/out

    const pos = c.geo.attributes.position.array
    const alp = c.geo.attributes.alpha.array
    for (let j = 0; j < TRAIL_LEN; j++) {
      const frac = j / (TRAIL_LEN - 1)
      const back = frac * TRAIL_DIST
      pos[j * 3]     = _head.x - _dir.x * back
      pos[j * 3 + 1] = _head.y - _dir.y * back
      pos[j * 3 + 2] = _head.z - _dir.z * back
      alp[j] = Math.pow(1 - frac, 1.5) * env
    }
    c.geo.attributes.position.needsUpdate = true
    c.geo.attributes.alpha.needsUpdate    = true
    c.head.scale.setScalar(env)

    if (t >= 1) {
      this.group.remove(c.line, c.head)
      c.geo.dispose()
      c.head.traverse(o => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose() } })
      this._active = null
    }
  }
}

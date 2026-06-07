import * as THREE from 'three'

const SKY_R      = 155
const TRAIL_LEN  = 28    // number of trail segments
const TRAIL_DIST = 22    // physical length of trail in world units

function randomOnUpperSky() {
  const theta = Math.random() * Math.PI * 2
  const phi   = 0.05 + Math.random() * 0.55   // upper hemisphere, not directly above
  return new THREE.Vector3(
    SKY_R * Math.sin(phi) * Math.cos(theta),
    SKY_R * Math.cos(phi),
    SKY_R * Math.sin(phi) * Math.sin(theta)
  )
}

function randomDir() {
  const angle = Math.random() * Math.PI * 2
  return new THREE.Vector3(
    Math.cos(angle),
    -0.12 - Math.random() * 0.25,
    Math.sin(angle)
  ).normalize()
}

export class ShootingStars {
  constructor() {
    this.group      = new THREE.Group()
    this._active    = []
    this._nextSpawn = 4 + Math.random() * 6

    this._shaderMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha      = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(1.0, 0.97, 0.88, vAlpha);
        }
      `,
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    })
  }

  _spawn() {
    const origin   = randomOnUpperSky()
    const dir      = randomDir()
    const lifetime = 0.7 + Math.random() * 0.7
    const speed    = 70  + Math.random() * 60

    const positions = new Float32Array(TRAIL_LEN * 3)
    const alphas    = new Float32Array(TRAIL_LEN)

    // Init all trail points at origin
    for (let i = 0; i < TRAIL_LEN; i++) {
      positions[i*3]   = origin.x
      positions[i*3+1] = origin.y
      positions[i*3+2] = origin.z
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1))

    const line = new THREE.Line(geo, this._shaderMat.clone())
    this.group.add(line)

    this._active.push({ line, geo, origin: origin.clone(), dir, progress: 0, lifetime, speed })
  }

  update(dt) {
    this._nextSpawn -= dt
    if (this._nextSpawn <= 0) {
      this._spawn()
      this._nextSpawn = 5 + Math.random() * 12
    }

    for (let i = this._active.length - 1; i >= 0; i--) {
      const s = this._active[i]
      s.progress += dt

      const t           = s.progress / s.lifetime
      const headDist    = s.speed * s.progress
      const pos         = s.geo.attributes.position.array
      const alp         = s.geo.attributes.alpha.array

      // Global fade-in/out envelope
      const globalAlpha = t < 0.12
        ? t / 0.12
        : t > 0.72
          ? (1 - t) / 0.28
          : 1.0

      const headX = s.origin.x + s.dir.x * headDist
      const headY = s.origin.y + s.dir.y * headDist
      const headZ = s.origin.z + s.dir.z * headDist

      // Compute trail analytically: each point is offset back along dir
      for (let j = 0; j < TRAIL_LEN; j++) {
        const frac = j / (TRAIL_LEN - 1)
        const back = frac * TRAIL_DIST
        pos[j*3]   = headX - s.dir.x * back
        pos[j*3+1] = headY - s.dir.y * back
        pos[j*3+2] = headZ - s.dir.z * back
        alp[j]     = Math.pow(1 - frac, 1.6) * globalAlpha * 0.95
      }

      s.geo.attributes.position.needsUpdate = true
      s.geo.attributes.alpha.needsUpdate    = true

      if (s.progress >= s.lifetime) {
        this.group.remove(s.line)
        s.geo.dispose()
        s.line.material.dispose()
        this._active.splice(i, 1)
      }
    }
  }
}

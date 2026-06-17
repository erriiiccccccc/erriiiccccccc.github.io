import * as THREE from 'three'

// Soft, dreamy gradient cloud billboards parked far out in deep space. Cheapest,
// highest-impact way to kill the "endless black" feel: a few large additive quads
// that wash the void with color and depth. Added to `scene` (world space).

const CLOUDS = [
  // [radius, size, colorA, colorB, opacity]
  [230, 200, 0x7C3AED, 0x3B1E66, 0.16],   // purple
  [240, 230, 0xFF6FB5, 0x4A1E55, 0.12],   // pink
  [225, 180, 0x3A6BFF, 0x141E55, 0.13],   // blue
  [245, 260, 0x9B5CFF, 0x2A1550, 0.10],   // violet
  [220, 150, 0xFFA24A, 0x4A2510, 0.08],   // warm ember
]

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = `
  uniform vec3  colorA;
  uniform vec3  colorB;
  uniform float opacity;
  uniform float time;
  varying vec2  vUv;

  // cheap value noise for a wispy edge
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    vec2  c = vUv - 0.5;
    float d = length(c) * 2.0;                 // 0 centre → 1 edge
    float falloff = smoothstep(1.0, 0.1, d);   // soft round vignette

    // drifting wisps break the perfect circle
    float n = noise(vUv * 3.0 + vec2(time * 0.02, time * 0.015));
    falloff *= 0.6 + 0.4 * n;

    float breath = 0.85 + 0.15 * sin(time * 0.25);
    vec3  col = mix(colorB, colorA, falloff);
    gl_FragColor = vec4(col, falloff * opacity * breath);
  }
`

export class Nebula {
  constructor() {
    this.group = new THREE.Group()
    this._mats = []

    for (const [radius, size, cA, cB, op] of CLOUDS) {
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          colorA:  { value: new THREE.Color(cA) },
          colorB:  { value: new THREE.Color(cB) },
          opacity: { value: op },
          time:    { value: Math.random() * 100 },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
        side:        THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat)

      // Scatter across the celestial sphere, then face origin (where the camera is)
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) * 0.7,           // squash vertically — band-like
        radius * Math.sin(phi) * Math.sin(theta)
      )
      mesh.lookAt(0, 0, 0)
      mesh.rotation.z = Math.random() * Math.PI * 2

      mesh.userData.spin = (Math.random() - 0.5) * 0.01   // very slow roll
      this.group.add(mesh)
      this._mats.push(mat)
    }
  }

  update(dt, time, reducedMotion = false) {
    if (reducedMotion) return
    for (const mat of this._mats) mat.uniforms.time.value = time
    for (const mesh of this.group.children) mesh.rotation.z += mesh.userData.spin * dt
  }
}

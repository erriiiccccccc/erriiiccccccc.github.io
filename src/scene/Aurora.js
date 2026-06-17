import * as THREE from 'three'

// A soft curtain of polar light arcing around the planet's horizon — a shifting
// green→purple ribbon that undulates and shimmers. Built from an open partial
// cylinder so it wraps the globe. Added to `scene` (world space).

const RADIUS = 48
const HEIGHT = 34
const ARC    = Math.PI * 1.15      // ~210° of wrap

const VERT = `
  uniform float time;
  uniform float motion;            // 0 = frozen (reduced motion), 1 = full
  varying vec2  vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // gentle horizontal wave that grows toward the top edge → classic curtain sway
    float sway = sin(uv.x * 9.0 + time * 0.8) * 1.6
               + sin(uv.x * 4.0 - time * 0.5) * 2.4;
    float k = uv.y * motion;
    vec3 outward = normalize(vec3(p.x, 0.0, p.z));
    p += outward * sway * k;
    p.y += sin(uv.x * 6.0 + time * 0.6) * 2.0 * k;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const FRAG = `
  uniform float time;
  uniform float motion;
  varying vec2  vUv;
  void main() {
    // vertical gradient: teal/green at the base → purple → fade out at the top
    vec3 green  = vec3(0.30, 0.85, 0.55);
    vec3 purple = vec3(0.55, 0.30, 0.95);
    vec3 col = mix(green, purple, smoothstep(0.0, 1.0, vUv.y));

    // vertical curtains scrolling sideways
    float curtains = 0.6 + 0.4 * sin(vUv.x * 24.0 + time * motion * 1.5)
                         * sin(vUv.x * 10.0 - time * motion * 0.7);

    // fade top & bottom edges, plus the arc ends
    float vFade = smoothstep(0.0, 0.18, vUv.y) * (1.0 - smoothstep(0.55, 1.0, vUv.y));
    float xFade = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 1.0, vUv.x));

    float a = vFade * xFade * curtains * 0.2;
    gl_FragColor = vec4(col, a);
  }
`

export class Aurora {
  constructor() {
    this.group = new THREE.Group()
    this._mat = new THREE.ShaderMaterial({
      uniforms: {
        time:   { value: Math.random() * 100 },
        motion: { value: 1 },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
      side:        THREE.DoubleSide,
    })

    const geo = new THREE.CylinderGeometry(
      RADIUS, RADIUS, HEIGHT, 96, 12, true,
      -ARC / 2, ARC
    )
    const mesh = new THREE.Mesh(geo, this._mat)
    mesh.position.y = 14          // lift so the band sits above the horizon
    this.group.add(mesh)
  }

  update(dt, time, reducedMotion = false) {
    this._mat.uniforms.motion.value = reducedMotion ? 0 : 1
    if (!reducedMotion) this._mat.uniforms.time.value = time
  }
}

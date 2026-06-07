import * as THREE from 'three'

export class Starfield {
  constructor() {
    const COUNT = 1800
    const positions  = new Float32Array(COUNT * 3)
    const phases     = new Float32Array(COUNT)
    const speeds     = new Float32Array(COUNT)
    const baseSizes  = new Float32Array(COUNT)
    const colors     = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const r     = 160 + Math.random() * 60
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      positions[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i*3+2] = r * Math.cos(phi)

      phases[i]    = Math.random() * Math.PI * 2
      speeds[i]    = 0.6 + Math.random() * 2.8
      baseSizes[i] = 1.2 + Math.random() * 2.8

      // Color variety: mostly white, some blue-white, some warm gold
      const roll = Math.random()
      if (roll < 0.15) {
        colors[i*3] = 0.75; colors[i*3+1] = 0.88; colors[i*3+2] = 1.0
      } else if (roll < 0.27) {
        colors[i*3] = 1.0;  colors[i*3+1] = 0.93; colors[i*3+2] = 0.65
      } else {
        colors[i*3] = 1.0;  colors[i*3+1] = 1.0;  colors[i*3+2] = 1.0
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('phase',    new THREE.BufferAttribute(phases, 1))
    geo.setAttribute('speed',    new THREE.BufferAttribute(speeds, 1))
    geo.setAttribute('baseSize', new THREE.BufferAttribute(baseSizes, 1))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

    this._mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float phase;
        attribute float speed;
        attribute float baseSize;
        attribute vec3  color;
        varying float vAlpha;
        varying vec3  vColor;
        uniform float time;
        void main() {
          float twinkle = 0.5 + 0.5 * sin(time * speed + phase);
          vAlpha = 0.55 + 0.45 * twinkle;
          vColor = color;
          gl_PointSize = baseSize * (0.75 + 0.25 * twinkle);
          gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying vec3  vColor;
        void main() {
          vec2  uv = gl_PointCoord - vec2(0.5);
          float d  = length(uv);
          if (d > 0.5) discard;
          float a  = pow(1.0 - d * 2.0, 1.4) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `,
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    })

    this.points = new THREE.Points(geo, this._mat)
  }

  update(time) {
    this._mat.uniforms.time.value = time
  }
}

// ASCII character on the About screen.
//
// While the About screen is open, the character is drawn on his own into an
// offscreen target, and that image is composited back over the world by a
// fullscreen shader. Everywhere outside a fluid blob that follows the pointer
// the composite is a plain copy, so he looks exactly as before. Inside the
// blob he turns into ASCII.
//
// The ASCII follows the shape-aware approach (Acerola, and Codrops' "Beyond
// the luminance ramp"): the image is cut into cells; each cell's brightness
// picks a fill glyph from a density ramp ( .,:-=+*#%@), and where a Sobel
// filter over the cells finds a strong edge (his outline, the folds of his
// clothes), a directional glyph (| / - \) follows the edge instead. Glyphs keep
// his own colours, so he still reads as a lit 3D figure, just made of type.
//
// Cost: one extra fullscreen pass while the About screen is open. The
// character is drawn once either way (into the target instead of the screen).
import * as THREE from 'three'

const CHAR_LAYER = 3
const FILL  = ' .,:-=+*#%@'          // dark to bright
const EDGE  = '|/-\\'                // indexed by edge direction
const GLYPHS = FILL + EDGE
const CELL_CSS   = 8                 // glyph cell size in CSS pixels
const RADIUS_CSS = 92                // blob radius at rest (the trail adds to it)

function makeGlyphAtlas() {
  const S = 64
  const c = document.createElement('canvas')
  c.width = S * GLYPHS.length
  c.height = S
  const g = c.getContext('2d')
  g.fillStyle = '#fff'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.font = `700 ${S * 0.86}px "JetBrains Mono", "Cascadia Mono", Consolas, "Courier New", monospace`
  for (let i = 0; i < GLYPHS.length; i++) g.fillText(GLYPHS[i], i * S + S / 2, S / 2 + S * 0.04)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.NoColorSpace
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.generateMipmaps = true
  return tex
}

const VERT = /* glsl */`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`

const FRAG = /* glsl */`
  uniform sampler2D tChar;
  uniform sampler2D tGlyph;
  uniform vec2  uRes;
  uniform float uCell;
  uniform float uRadius;
  uniform float uAmount;
  uniform float uTime;
  uniform vec2  uBlob[4];
  uniform float uBlobW[4];
  varying vec2 vUv;

  const float NFILL  = ${FILL.length}.0;
  const float NGLYPH = ${GLYPHS.length}.0;
  const float PI = 3.14159265;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  // Average of four taps inside a cell (premultiplied colour + coverage).
  vec4 cellAvg(vec2 cell) {
    vec2 b = cell * uCell;
    return 0.25 * (texture2D(tChar, (b + uCell * vec2(0.25, 0.25)) / uRes)
                 + texture2D(tChar, (b + uCell * vec2(0.75, 0.25)) / uRes)
                 + texture2D(tChar, (b + uCell * vec2(0.25, 0.75)) / uRes)
                 + texture2D(tChar, (b + uCell * vec2(0.75, 0.75)) / uRes));
  }
  // What the edge filter looks at: coverage lifted by brightness, so both his
  // outline and the light and shade inside it register as edges.
  float height(vec2 cell) {
    vec4 c = texture2D(tChar, (cell + 0.5) * uCell / uRes);
    float l = dot(c.rgb / max(c.a, 1e-4), vec3(0.2126, 0.7152, 0.0722));
    return c.a * (0.35 + 1.0 - exp(-l * 1.6));
  }

  void main() {
    vec2 px   = vUv * uRes;
    vec4 base = texture2D(tChar, vUv);          // him, exactly as rendered
    vec4 outc = base;

    // Fluid blob: four metaballs (the pointer and three trailing followers),
    // with a slow noise pushing the surface in and out.
    float field = 0.0;
    for (int i = 0; i < 4; i++) {
      vec2 d = px - uBlob[i];
      field += uBlobW[i] * uRadius * uRadius / (dot(d, d) + 1.0);
    }
    float n = vnoise(px / (uRadius * 0.45) + vec2(uTime * 0.35, -uTime * 0.27));
    float m = smoothstep(0.82, 1.12, field * (0.78 + 0.44 * n)) * uAmount;

    if (m > 0.002) {
      vec2 cell = floor(px / uCell);
      vec4 c    = cellAvg(cell);
      float cov = c.a;
      vec3 col  = c.rgb / max(c.a, 1e-4);
      float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
      // Contrast curve: lifts his dark clothes into the middle of the ramp
      // so they get real glyphs, not just dots, while his face stays densest.
      float tone = clamp(pow(lum, 0.42) * 1.3, 0.0, 1.0);

      // Fill glyph from the density ramp. Near the blob's edge a few cells
      // flicker to the next glyph, so the boundary shimmers as it moves.
      float idx = floor(clamp(tone, 0.0, 0.999) * NFILL);
      if (m < 0.9 && hash(cell + floor(uTime * 14.0)) > 0.75) idx = min(NFILL - 1.0, idx + 1.0);
      if (cov > 0.05 && idx < 1.0) idx = 1.0;   // inside him, never a blank cell

      // Sobel over neighbouring cells: a strong edge gets a directional glyph.
      float tl = height(cell + vec2(-1,  1)), t = height(cell + vec2(0,  1)), tr = height(cell + vec2(1,  1));
      float l  = height(cell + vec2(-1,  0)),                                 r  = height(cell + vec2(1,  0));
      float bl = height(cell + vec2(-1, -1)), b = height(cell + vec2(0, -1)), br = height(cell + vec2(1, -1));
      float gx = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
      float gy = (tl + 2.0 * t + tr) - (bl + 2.0 * b + br);
      float mag = length(vec2(gx, gy));
      bool edge = mag > 0.55 && cov > 0.04;
      if (edge) {
        // The gradient points across the edge; the glyph runs along it.
        float q = floor(mod(atan(gy, gx) + PI / 8.0, PI) / (PI / 4.0));
        float e = q < 0.5 ? 0.0 : q < 1.5 ? 3.0 : q < 2.5 ? 2.0 : 1.0;   // | \\ - /
        idx = NFILL + e;
      }

      vec2 luv = fract(px / uCell);
      float g  = texture2D(tGlyph, vec2((idx + luv.x) / NGLYPH, luv.y)).r;
      g *= step(0.04, cov);

      // Glyphs keep his hue at a readable brightness (a navy hoodie becomes
      // bright navy type), scaled by the tone; edges a touch brighter. Every
      // cell inside his silhouette gets a dark backing, so he reads as a
      // figure made of type and nothing behind him shows through the gaps.
      float mx = max(max(col.r, col.g), col.b);
      vec3 hue = mix(col / max(mx, 1e-3), vec3(1.0), 0.08);
      vec3 glyphCol = hue * (0.28 + 0.85 * tone) * (edge ? 1.3 : 1.0);
      vec3 bgCol = vec3(0.012, 0.010, 0.025) + col * 0.15;
      float aBg = 0.9 * cov;
      float a   = g + aBg * (1.0 - g);
      vec3 straight = (glyphCol * g + bgCol * aBg * (1.0 - g)) / max(a, 1e-4);
      vec4 ascii = vec4(straight * a, a);

      outc = mix(base, ascii, m);
    }

    gl_FragColor = vec4(outc.rgb / max(outc.a, 1e-4), outc.a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    gl_FragColor.rgb *= gl_FragColor.a;
  }
`

export class AsciiCharacter {
  /**
   * @param {THREE.WebGLRenderer} renderer
   * @param {THREE.Object3D} subject the character's group
   */
  constructor(renderer, subject) {
    this.renderer = renderer
    this.subject  = subject
    this.on       = false          // character currently lives on CHAR_LAYER
    this.amount   = 0
    this._size    = new THREE.Vector2()
    this._clear   = new THREE.Color()
    this._pointer = { x: 0, y: 0, active: false, seen: false }
    this._blob    = [0, 1, 2, 3].map(() => new THREE.Vector2(-9999, -9999))
    this._time    = 0

    this.rt = new THREE.WebGLRenderTarget(2, 2, { type: THREE.HalfFloatType, samples: 4 })

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        tChar:   { value: this.rt.texture },
        tGlyph:  { value: makeGlyphAtlas() },
        uRes:    { value: new THREE.Vector2(2, 2) },
        uCell:   { value: CELL_CSS },
        uRadius: { value: RADIUS_CSS },
        uAmount: { value: 0 },
        uTime:   { value: 0 },
        uBlob:   { value: this._blob },
        uBlobW:  { value: [1, 0.55, 0.38, 0.25] },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.OneFactor,
      blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    })
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material)
    quad.frustumCulled = false
    this.quadScene  = new THREE.Scene()
    this.quadScene.add(quad)
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const move = (e) => {
      this._pointer.x = e.clientX
      this._pointer.y = e.clientY
      this._pointer.active = e.pointerType !== 'touch' || e.buttons > 0 || e.type === 'pointerdown'
      if (!this._pointer.seen) {
        this._pointer.seen = true
        const p = this._toBuffer()
        this._blob.forEach(b => b.copy(p))   // start the blob where the pointer is
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', move, { passive: true })
    window.addEventListener('pointerup', (e) => { if (e.pointerType === 'touch') this._pointer.active = false })
    document.documentElement.addEventListener('pointerleave', () => { this._pointer.active = false })
    window.addEventListener('blur', () => { this._pointer.active = false })
  }

  _toBuffer() {
    const dpr = this.renderer.getPixelRatio()
    return new THREE.Vector2(this._pointer.x * dpr, (window.innerHeight - this._pointer.y) * dpr)
  }

  /** Put the character on his own layer (lights reach both), or back. */
  _setLayer(on) {
    if (on === this.on) return
    this.on = on
    if (on && !this._lightsDone) {
      this._lightsDone = true
      this._sceneRoot().traverse(o => { if (o.isLight) o.layers.enable(CHAR_LAYER) })
    }
    this.subject.traverse(o => {
      if (o.isLight) return
      if (on) o.layers.set(CHAR_LAYER)
      else o.layers.set(0)
    })
  }

  _sceneRoot() {
    let r = this.subject
    while (r.parent) r = r.parent
    return r
  }

  /**
   * Draw the frame. `wanted` is true while the About screen is open. Returns
   * false when the effect is idle (the caller then renders normally).
   */
  render(scene, camera, dt, wanted) {
    // Blob fades in with the pointer over the page, out when it leaves.
    const target = wanted && this._pointer.active ? 1 : 0
    this.amount += (target - this.amount) * (1 - Math.exp(-dt * (target ? 6 : 10)))
    if (!wanted && this.amount < 0.01) {
      this.amount = 0
      this._setLayer(false)
      return false
    }
    this._setLayer(true)

    const r = this.renderer
    r.getDrawingBufferSize(this._size)
    if (this.rt.width !== this._size.x || this.rt.height !== this._size.y) this.rt.setSize(this._size.x, this._size.y)

    // Trail: each follower chases the one ahead, slower down the chain.
    const p = this._toBuffer()
    const rates = [22, 12, 8, 5]
    this._blob.forEach((b, i) => b.lerp(i ? this._blob[i - 1] : p, 1 - Math.exp(-dt * rates[i])))
    this._time += dt

    const dpr = r.getPixelRatio()
    const u = this.material.uniforms
    u.uRes.value.copy(this._size)
    u.uCell.value   = Math.round(CELL_CSS * dpr)
    u.uRadius.value = RADIUS_CSS * dpr
    u.uAmount.value = this.amount
    u.uTime.value   = this._time

    // 1. The world without him.
    r.render(scene, camera)

    // 2. Him alone, onto a transparent target.
    const mask = camera.layers.mask
    const bg = scene.background
    r.getClearColor(this._clear)
    const clearA = r.getClearAlpha()
    const shadowAuto = r.shadowMap.autoUpdate
    r.shadowMap.autoUpdate = false     // reuse this frame's shadow map
    camera.layers.set(CHAR_LAYER)
    scene.background = null
    r.setRenderTarget(this.rt)
    r.setClearColor(0x000000, 0)
    r.clear()
    r.render(scene, camera)
    r.setRenderTarget(null)
    r.setClearColor(this._clear, clearA)
    scene.background = bg
    camera.layers.mask = mask
    r.shadowMap.autoUpdate = shadowAuto

    // 3. Him back on top: a plain copy, ASCII inside the blob.
    const autoClear = r.autoClear
    r.autoClear = false
    r.render(this.quadScene, this.quadCamera)
    r.autoClear = autoClear
    return true
  }
}

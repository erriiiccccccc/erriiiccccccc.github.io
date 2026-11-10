// ASCII lens on the About screen.
//
// While the About screen is open, a fluid lens follows the pointer anywhere on
// the screen (the pointer plus three trailing followers as metaballs, with a
// slow wobble on its surface). Everything inside it, him, the planet, the sky,
// turns into ASCII with its colours flipped, like looking through a terminal.
// The HTML panels sit above the canvas, so they stay readable.
//
// The type is a real bitmap font: every glyph is hand-drawn on a 5 x 7 pixel
// grid and drawn at a whole-number scale with nearest sampling, so every
// stroke is a hard pixel, never smoothed or blurred.
//
// Three passes while the lens is up:
//   1. the scene renders as usual into an offscreen target;
//   2. a small pass picks one glyph per cell for the whole screen (one
//      fragment per cell, ~5k cells, so the matching is cheap);
//   3. a fullscreen pass draws the scene, and inside the lens the cell glyphs.
//
// Glyph choice is shape matching (the approach behind Codrops' "Beyond the
// luminance ramp"): every glyph is measured as ink in a 2 x 3 grid; flat
// cells take the nearest glyph on a density ramp, cells with structure take
// the glyph whose ink pattern best matches the image.
import * as THREE from 'three'

// 5 x 7 bitmap font. '#' is ink. Rows top to bottom.
const FONT5x7 = {
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
  '.': ['.....', '.....', '.....', '.....', '.....', '.....', '..#..'],
  ',': ['.....', '.....', '.....', '.....', '.....', '..#..', '.#...'],
  "'": ['..#..', '..#..', '.....', '.....', '.....', '.....', '.....'],
  '`': ['.#...', '..#..', '.....', '.....', '.....', '.....', '.....'],
  '"': ['.#.#.', '.#.#.', '.....', '.....', '.....', '.....', '.....'],
  ':': ['.....', '..#..', '.....', '.....', '.....', '..#..', '.....'],
  ';': ['.....', '..#..', '.....', '.....', '..#..', '..#..', '.#...'],
  '-': ['.....', '.....', '.....', '.###.', '.....', '.....', '.....'],
  '_': ['.....', '.....', '.....', '.....', '.....', '.....', '#####'],
  '~': ['.....', '.....', '.#...', '#.#.#', '...#.', '.....', '.....'],
  '^': ['..#..', '.#.#.', '#...#', '.....', '.....', '.....', '.....'],
  '=': ['.....', '.....', '#####', '.....', '#####', '.....', '.....'],
  '+': ['.....', '..#..', '..#..', '#####', '..#..', '..#..', '.....'],
  '*': ['.....', '#.#.#', '.###.', '#####', '.###.', '#.#.#', '.....'],
  '!': ['..#..', '..#..', '..#..', '..#..', '..#..', '.....', '..#..'],
  '/': ['....#', '....#', '...#.', '..#..', '.#...', '#....', '#....'],
  '\\': ['#....', '#....', '.#...', '..#..', '...#.', '....#', '....#'],
  '(': ['...#.', '..#..', '.#...', '.#...', '.#...', '..#..', '...#.'],
  ')': ['.#...', '..#..', '...#.', '...#.', '...#.', '..#..', '.#...'],
  '<': ['....#', '...#.', '..#..', '.#...', '..#..', '...#.', '....#'],
  '>': ['#....', '.#...', '..#..', '...#.', '..#..', '.#...', '#....'],
  '?': ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'],
  'i': ['..#..', '.....', '.##..', '..#..', '..#..', '..#..', '.###.'],
  'l': ['.##..', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  'r': ['.....', '.....', '#.##.', '##..#', '#....', '#....', '#....'],
  't': ['.#...', '.#...', '###..', '.#...', '.#...', '.#..#', '..##.'],
  'c': ['.....', '.....', '.###.', '#....', '#....', '#...#', '.###.'],
  'v': ['.....', '.....', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  'x': ['.....', '.....', '#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
  'z': ['.....', '.....', '#####', '...#.', '..#..', '.#...', '#####'],
  's': ['.....', '.....', '.####', '#....', '.###.', '....#', '####.'],
  'u': ['.....', '.....', '#...#', '#...#', '#...#', '#..##', '.##.#'],
  'n': ['.....', '.....', '#.##.', '##..#', '#...#', '#...#', '#...#'],
  'o': ['.....', '.....', '.###.', '#...#', '#...#', '#...#', '.###.'],
  'a': ['.....', '.....', '.###.', '....#', '.####', '#...#', '.####'],
  'e': ['.....', '.....', '.###.', '#...#', '#####', '#....', '.###.'],
  'L': ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  'J': ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
  'T': ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  'Y': ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  'V': ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  'X': ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  'C': ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  'O': ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  'Q': ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  '#': ['.#.#.', '.#.#.', '#####', '.#.#.', '#####', '.#.#.', '.#.#.'],
  '%': ['##...', '##..#', '...#.', '..#..', '.#...', '#..##', '...##'],
  '&': ['.##..', '#..#.', '#.#..', '.#...', '#.#.#', '#..#.', '.##.#'],
  '@': ['.###.', '#...#', '....#', '.##.#', '#.#.#', '#.#.#', '.###.'],
  '$': ['..#..', '.####', '#.#..', '.###.', '..#.#', '####.', '..#..'],
  'W': ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '#.#.#', '.#.#.'],
  'M': ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  'B': ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  '8': ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
}
const RAMP = ' .:-=+*o#%@'
// Cell in font pixels: the 5 x 7 glyph plus a 1 px gap right and 1 px above
// and below, so neighbouring glyphs never touch.
const FW = 6, FH = 9
const RADIUS_CSS = 100            // lens radius at rest (the trail stretches it)

/** Ink of every glyph in a 2 x 3 grid, from the bitmaps (each pixel split exactly). */
function measureGlyphs() {
  const all = Object.entries(FONT5x7).map(([ch, rows]) => {
    const v = [0, 0, 0, 0, 0, 0]
    const S = 6                                   // supersample: 30 x 42
    for (let y = 0; y < 7 * S; y++) {
      const row = Math.min(2, Math.floor(y / (7 * S / 3)))
      for (let x = 0; x < 5 * S; x++) {
        if (rows[Math.floor(y / S)][Math.floor(x / S)] === '#') v[(x < 2.5 * S ? 0 : 3) + row] += 1
      }
    }
    const area = (2.5 * S) * (7 * S / 3)
    return { ch, rows, v: v.map(n => n / area) }
  })
  const peak = Math.max(...all.flatMap(m => m.v))
  all.forEach(m => { m.v = m.v.map(n => n / peak) })
  const ramp = all
    .map((k, i) => ({ i, ch: k.ch, ink: k.v.reduce((s, n) => s + n, 0) / 6 }))
    .filter(r => RAMP.includes(r.ch))
    .sort((a, b) => a.ink - b.ink)
  const shapes = []
  for (const k of all) shapes.push(new THREE.Vector3(k.v[0], k.v[1], k.v[2]), new THREE.Vector3(k.v[3], k.v[4], k.v[5]))
  return { glyphs: all, shapes, rampIdx: ramp.map(r => r.i), rampInk: ramp.map(r => r.ink) }
}

/** The atlas: every glyph's pixels as hard squares at scale `s`, one cell each. */
function bitmapAtlas(glyphs, s) {
  const cw = FW * s, ch = FH * s
  const cv = document.createElement('canvas')
  cv.width = cw * glyphs.length
  cv.height = ch
  const g = cv.getContext('2d')
  g.fillStyle = '#fff'
  glyphs.forEach((gl, i) => {
    gl.rows.forEach((row, y) => {
      for (let x = 0; x < 5; x++) if (row[x] === '#') g.fillRect(i * cw + x * s, (y + 1) * s, s, s)
    })
  })
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.NoColorSpace
  tex.flipY = false
  tex.generateMipmaps = false
  tex.minFilter = THREE.NearestFilter
  tex.magFilter = THREE.NearestFilter
  return tex
}

const VERT = /* glsl */`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`

// Black point and curve shared by both passes: the dark sky stays empty, lit
// things (him, the planet, the sun, stars) get type.
const TONE = /* glsl */`
  float tone(float l) { return clamp((pow(l, 0.5) - 0.13) / 0.87 * 1.3, 0.0, 1.0); }
`

// Pass 2: one fragment per cell. Writes (glyph index, cell colour).
const pickFrag = (N, R) => /* glsl */`
  uniform sampler2D tScene;
  uniform vec3  uShape[${N * 2}];
  uniform float uRampIdx[${R}];
  uniform float uRampInk[${R}];
  uniform vec2  uRes;
  uniform vec2  uCell;
  const int N = ${N};
  const int R = ${R};
  ${TONE}
  float ink(vec2 p) {
    vec3 c = texture2D(tScene, p / uRes).rgb;
    return tone(dot(c, vec3(0.2126, 0.7152, 0.0722))) * 0.5;
  }
  float cellPatch(vec2 o, float col, float row) {
    vec2 c = o + uCell * vec2((col + 0.5) / 2.0, 1.0 - (row + 0.5) / 3.0);
    vec2 dx = vec2(uCell.x * 0.12, 0.0);
    return 0.5 * (ink(c - dx) + ink(c + dx));
  }
  void main() {
    vec2 cell = floor(gl_FragCoord.xy);
    vec2 o = cell * uCell;
    vec3 sl = vec3(cellPatch(o, 0.0, 0.0), cellPatch(o, 0.0, 1.0), cellPatch(o, 0.0, 2.0));
    vec3 sr = vec3(cellPatch(o, 1.0, 0.0), cellPatch(o, 1.0, 1.0), cellPatch(o, 1.0, 2.0));
    float mu = (sl.x + sl.y + sl.z + sr.x + sr.y + sr.z) / 6.0;
    float spread = max(max(max(sl.x, sl.y), max(sl.z, sr.x)), max(sr.y, sr.z))
                 - min(min(min(sl.x, sl.y), min(sl.z, sr.x)), min(sr.y, sr.z));
    float idx = 0.0;
    if (spread < 0.08) {
      float best = 1e9;
      for (int i = 0; i < R; i++) {
        float d = abs(uRampInk[i] - mu);
        if (d < best) { best = d; idx = uRampIdx[i]; }
      }
    } else {
      vec3 el = clamp(mu + (sl - mu) * 2.2, 0.0, 1.0);
      vec3 er = clamp(mu + (sr - mu) * 2.2, 0.0, 1.0);
      float best = 1e9;
      for (int i = 0; i < N; i++) {
        vec3 a = el - uShape[i * 2], b = er - uShape[i * 2 + 1];
        float d = dot(a, a) + dot(b, b);
        if (d < best) { best = d; idx = float(i); }
      }
    }
    vec3 c = 0.25 * (texture2D(tScene, (o + uCell * vec2(0.25, 0.25)) / uRes).rgb
                   + texture2D(tScene, (o + uCell * vec2(0.75, 0.25)) / uRes).rgb
                   + texture2D(tScene, (o + uCell * vec2(0.25, 0.75)) / uRes).rgb
                   + texture2D(tScene, (o + uCell * vec2(0.75, 0.75)) / uRes).rgb);
    gl_FragColor = vec4(idx, c);
  }
`

// Pass 3: the screen. Plain scene outside the lens; inside, the type with its
// colours flipped.
const drawFrag = (N) => /* glsl */`
  uniform sampler2D tScene;
  uniform sampler2D tCells;
  uniform sampler2D tGlyph;
  uniform vec2  uRes;
  uniform vec2  uCell;
  uniform vec2  uGrid;
  uniform float uRadius;
  uniform float uAmount;
  uniform float uTime;
  uniform vec2  uBlob[4];
  uniform float uBlobW[4];
  varying vec2 vUv;
  const float NF = ${N}.0;
  ${TONE}

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    vec2 px = vUv * uRes;
    vec3 outc = texture2D(tScene, vUv).rgb;

    // The lens: metaballs (pointer + trailing followers), wobbling surface.
    float field = 0.0;
    for (int i = 0; i < 4; i++) {
      vec2 d = px - uBlob[i];
      field += uBlobW[i] * uRadius * uRadius / (dot(d, d) + 1.0);
    }
    float n = vnoise(px / (uRadius * 0.6) + vec2(uTime * 0.4, -uTime * 0.3));
    float m = smoothstep(0.85, 1.1, field * (0.82 + 0.36 * n)) * uAmount;
    float cm = 0.0;

    if (m > 0.002) {
      vec2 cell = floor(px / uCell);
      vec4 info = texture2D(tCells, (cell + 0.5) / uGrid);
      float idx = info.r;
      vec3 col  = info.gba;

      // Cells flip one by one at the lens edge, scrambling like text decoding.
      float h = hash(cell);
      cm = smoothstep(h * 0.6, h * 0.6 + 0.4, m);
      if (cm > 0.02 && cm < 0.98) idx = floor(hash(cell + floor(uTime * 18.0)) * NF);

      // Pixel-exact lookup into the bitmap atlas (drawn at this cell size).
      vec2 lp = floor(mod(px, uCell));
      vec2 guv = vec2((idx * uCell.x + lp.x + 0.5) / (uCell.x * NF), (uCell.y - 1.0 - lp.y + 0.5) / uCell.y);
      float g = texture2D(tGlyph, guv).r;

      // Type in the scene's hues at a readable brightness on near-black.
      float tn = tone(dot(col, vec3(0.2126, 0.7152, 0.0722)));
      float mx = max(max(col.r, col.g), col.b);
      vec3 hue = mix(col / max(mx, 1e-3), vec3(1.0), 0.2);
      vec3 glyphCol = hue * (0.35 + 0.9 * tn);
      vec3 ascii = mix(vec3(0.004, 0.003, 0.01), glyphCol, g);
      outc = mix(outc, ascii, cm);
    }

    gl_FragColor = vec4(outc, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    // Colour flip inside the lens: a negative, like a terminal window.
    gl_FragColor.rgb = mix(gl_FragColor.rgb, 1.0 - gl_FragColor.rgb, cm);
  }
`

export class AsciiScreen {
  /** @param {THREE.WebGLRenderer} renderer */
  constructor(renderer) {
    this.renderer = renderer
    this.amount   = 0
    this._time    = 0
    this._pointer = { x: 0, y: 0, active: false, seen: false }
    this._blob    = [0, 1, 2, 3].map(() => new THREE.Vector2(-9999, -9999))
    this._size    = new THREE.Vector2()
    this._cellPx  = new THREE.Vector2()
    this._scale   = 0

    const m = measureGlyphs()
    this.glyphs = m.glyphs
    const N = m.glyphs.length
    const R = m.rampIdx.length

    this.sceneRT = new THREE.WebGLRenderTarget(2, 2, { type: THREE.HalfFloatType, samples: 4 })
    this.cellRT  = new THREE.WebGLRenderTarget(2, 2, {
      type: THREE.HalfFloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, depthBuffer: false,
    })

    this.pick = new THREE.ShaderMaterial({
      uniforms: {
        tScene:   { value: this.sceneRT.texture },
        uShape:   { value: m.shapes },
        uRampIdx: { value: m.rampIdx },
        uRampInk: { value: m.rampInk },
        uRes:     { value: new THREE.Vector2(2, 2) },
        uCell:    { value: this._cellPx },
      },
      vertexShader: VERT,
      fragmentShader: pickFrag(N, R),
      depthTest: false, depthWrite: false, toneMapped: false,
    })
    this.draw = new THREE.ShaderMaterial({
      uniforms: {
        tScene:  { value: this.sceneRT.texture },
        tCells:  { value: this.cellRT.texture },
        tGlyph:  { value: null },
        uRes:    { value: new THREE.Vector2(2, 2) },
        uCell:   { value: this._cellPx },
        uGrid:   { value: new THREE.Vector2(1, 1) },
        uRadius: { value: RADIUS_CSS },
        uAmount: { value: 0 },
        uTime:   { value: 0 },
        uBlob:   { value: this._blob },
        uBlobW:  { value: [1, 0.35, 0.22, 0.14] },
      },
      vertexShader: VERT,
      fragmentShader: drawFrag(N),
      depthTest: false, depthWrite: false,
    })

    const quad = (mat) => {
      const s = new THREE.Scene()
      const q = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat)
      q.frustumCulled = false
      s.add(q)
      return s
    }
    this.pickScene = quad(this.pick)
    this.drawScene = quad(this.draw)
    this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const move = (e) => {
      this._pointer.x = e.clientX
      this._pointer.y = e.clientY
      this._pointer.active = e.pointerType !== 'touch' || e.buttons > 0 || e.type === 'pointerdown'
      if (!this._pointer.seen) {
        this._pointer.seen = true
        const p = this._toBuffer()
        this._blob.forEach(b => b.copy(p))       // start the lens where the pointer is
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

  _resize() {
    const r = this.renderer
    r.getDrawingBufferSize(this._size)
    const dpr = r.getPixelRatio()
    // Whole-number font scale only (that's what keeps every stroke sharp):
    // 2 device px per font pixel at 1x, 3 at 1.5x and 2x, so cells stay about
    // 12 x 18 CSS px.
    const s = Math.max(2, Math.round(dpr * 1.6))
    if (this.sceneRT.width !== this._size.x || this.sceneRT.height !== this._size.y) {
      this.sceneRT.setSize(this._size.x, this._size.y)
    }
    const cw = FW * s, ch = FH * s
    const cols = Math.ceil(this._size.x / cw), rows = Math.ceil(this._size.y / ch)
    if (this.cellRT.width !== cols || this.cellRT.height !== rows) this.cellRT.setSize(cols, rows)
    if (s !== this._scale) {
      this._scale = s
      this._cellPx.set(cw, ch)
      this.draw.uniforms.tGlyph.value?.dispose()
      this.draw.uniforms.tGlyph.value = bitmapAtlas(this.glyphs, s)
    }
    this.draw.uniforms.uGrid.value.set(cols, rows)
    this.pick.uniforms.uRes.value.copy(this._size)
    this.draw.uniforms.uRes.value.copy(this._size)
    this.draw.uniforms.uRadius.value = RADIUS_CSS * dpr
  }

  /**
   * Draw the frame. `wanted` is true while the About screen is open. Returns
   * false when the lens is down (the caller then renders normally).
   */
  render(scene, camera, dt, wanted) {
    const target = wanted && this._pointer.active ? 1 : 0
    this.amount += (target - this.amount) * (1 - Math.exp(-dt * (target ? 6 : 10)))
    if (this.amount < 0.005 && !target) { this.amount = 0; return false }

    this._resize()
    // Trail: each follower chases the one ahead, slower down the chain.
    const p = this._toBuffer()
    const rates = [24, 14, 9, 6]
    this._blob.forEach((b, i) => b.lerp(i ? this._blob[i - 1] : p, 1 - Math.exp(-dt * rates[i])))
    this._time += dt
    const u = this.draw.uniforms
    u.uAmount.value = this.amount
    u.uTime.value = this._time

    const r = this.renderer
    r.setRenderTarget(this.sceneRT)
    r.render(scene, camera)
    r.setRenderTarget(this.cellRT)
    r.render(this.pickScene, this.cam)
    r.setRenderTarget(null)
    r.render(this.drawScene, this.cam)
    return true
  }
}

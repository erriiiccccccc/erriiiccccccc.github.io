// ASCII character on the About screen.
//
// While the About screen is open, the character is drawn on his own into an
// offscreen target, and that image is composited back over the world by a
// fullscreen shader. Outside a small fluid blob that follows the pointer the
// composite is a plain copy, so he looks exactly as before. Inside the blob he
// fades away and only type is left: he becomes ASCII art.
//
// How the glyphs are chosen (shape matching, the approach behind Codrops'
// "Beyond the luminance ramp" and "ASCII characters are not pixels"): a plain
// brightness ramp only knows how dark a cell is. Here every cell is read as a
// 2 x 3 grid of patches, and every glyph in the set is measured the same way
// from the real font (how much ink falls in each of its six patches). Each
// cell then gets the glyph whose ink pattern is closest to the image, so a
// diagonal edge picks / or \, a lit top picks " or ^, a solid area @ or #, a
// soft gradient : then o. Edges and form come out of the type itself.
//
// Cells are text-shaped (taller than wide, like a terminal), glyphs keep his
// colours, and cells at the blob's edge scramble through random glyphs before
// they settle, like text decoding, while he fades out underneath.
//
// Cost: one extra fullscreen pass while the About screen is open; the match
// loop only runs inside the blob.
import * as THREE from 'three'

const CHAR_LAYER = 3
// Candidates; the set actually used is measured and thinned at startup.
const CANDIDATES = ` .'\`,:;-_~"^=+*!/\\()<>?ilrtcvxzsunoaeLJTYVXCOQ0#%&@$WMB8`
const RAMP = ` .:-=+*oa#%@`          // fill glyphs for flat cells
const CELL_W_CSS = 7                  // a terminal-shaped cell, in CSS pixels
const CELL_H_CSS = 12
const RADIUS_CSS = 24                 // blob radius at rest (the trail adds to it): about 60 px across
const GW = 40, GH = 68                // glyph cell in the atlas, same aspect as above

/**
 * Draw the glyphs, measure each one's ink in a 2 x 3 grid, drop near
 * duplicates, and pack the survivors into an atlas texture plus two vec3s of
 * shape per glyph (left column, right column; top to bottom).
 */
function buildGlyphs() {
  const font = `600 ${Math.round(GH * 0.82)}px "JetBrains Mono", "Cascadia Mono", Consolas, "Courier New", monospace`
  const probe = document.createElement('canvas')
  probe.width = GW; probe.height = GH
  const pg = probe.getContext('2d', { willReadFrequently: true })
  const measured = []
  for (const ch of CANDIDATES) {
    pg.clearRect(0, 0, GW, GH)
    pg.fillStyle = '#fff'
    pg.font = font
    pg.textAlign = 'center'
    pg.textBaseline = 'middle'
    pg.fillText(ch, GW / 2, GH / 2 + GH * 0.03)
    const d = pg.getImageData(0, 0, GW, GH).data
    const v = [0, 0, 0, 0, 0, 0]          // [L top, L mid, L bot, R top, R mid, R bot]
    for (let y = 0; y < GH; y++) {
      const row = Math.min(2, Math.floor(y / (GH / 3)))
      for (let x = 0; x < GW; x++) {
        const col = x < GW / 2 ? 0 : 1
        v[col * 3 + row] += d[(y * GW + x) * 4 + 3] / 255
      }
    }
    const area = (GW / 2) * (GH / 3)
    measured.push({ ch, v: v.map(n => n / area) })
  }
  // Normalise so the inkiest patch of any glyph is 1, then drop glyphs whose
  // shape is nearly identical to one already kept.
  const peak = Math.max(...measured.flatMap(m => m.v))
  measured.forEach(m => { m.v = m.v.map(n => n / peak) })
  measured.sort((a, b) => a.v.reduce((s, n) => s + n, 0) - b.v.reduce((s, n) => s + n, 0))
  const kept = []
  for (const m of measured) {
    if (kept.every(k => k.v.reduce((s, n, i) => s + (n - m.v[i]) ** 2, 0) > 0.004)) kept.push(m)
  }

  const c = document.createElement('canvas')
  c.width = GW * kept.length
  c.height = GH
  const g = c.getContext('2d')
  g.fillStyle = '#fff'
  g.font = font
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  kept.forEach((k, i) => g.fillText(k.ch, i * GW + GW / 2, GH / 2 + GH * 0.03))
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.NoColorSpace
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.generateMipmaps = true

  const shapes = []
  for (const k of kept) {
    shapes.push(new THREE.Vector3(k.v[0], k.v[1], k.v[2]), new THREE.Vector3(k.v[3], k.v[4], k.v[5]))
  }
  // The density ramp for flat cells: classic fill glyphs, ordered by the ink
  // they really carry in this font (measured, not assumed).
  const ramp = kept
    .map((k, i) => ({ i, ch: k.ch, ink: k.v.reduce((s, n) => s + n, 0) / 6 }))
    .filter(r => RAMP.includes(r.ch))
    .sort((a, b) => a.ink - b.ink)
  return {
    tex, shapes, count: kept.length, chars: kept.map(k => k.ch).join(''),
    rampIdx: ramp.map(r => r.i), rampInk: ramp.map(r => r.ink), ramp: ramp.map(r => r.ch).join(''),
  }
}

const VERT = /* glsl */`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`

const frag = (N, R) => /* glsl */`
  uniform sampler2D tChar;
  uniform sampler2D tGlyph;
  uniform vec3  uShape[${N * 2}];
  uniform float uRampIdx[${R}];
  uniform float uRampInk[${R}];
  uniform vec2  uRes;
  uniform vec2  uCell;
  uniform float uRadius;
  uniform float uAmount;
  uniform float uTime;
  uniform vec2  uBlob[4];
  uniform float uBlobW[4];
  varying vec2 vUv;

  const int   N  = ${N};
  const int   R  = ${R};
  const float NF = ${N}.0;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  // Ink the image wants at a point: coverage times a tone curve on brightness,
  // scaled into the glyphs' range so the whole set gets used: shadow is
  // sparse ( . : ; ), mid tones are letters ( o a e + ), only highlights hit
  // the densest glyphs ( # @ ).
  float ink(vec2 p) {
    vec4 c = texture2D(tChar, p / uRes);
    float l = dot(c.rgb / max(c.a, 1e-4), vec3(0.2126, 0.7152, 0.0722));
    // glyph ink tops out near 0.45 (normalised to the inkiest patch of any
    // glyph), so the image is scaled into that range
    return c.a * clamp(pow(l, 0.6) * 1.25, 0.0, 1.0) * 0.46;
  }
  // One of the cell's six patches (two taps across it).
  float cellPatch(vec2 o, float col, float row) {
    vec2 c = o + uCell * vec2((col + 0.5) / 2.0, 1.0 - (row + 0.5) / 3.0);
    vec2 dx = vec2(uCell.x * 0.12, 0.0);
    return 0.5 * (ink(c - dx) + ink(c + dx));
  }

  void main() {
    vec2 px   = vUv * uRes;
    vec4 base = texture2D(tChar, vUv);          // him, exactly as rendered
    vec4 outc = base;

    // Fluid blob: the pointer plus three trailing followers as metaballs,
    // with a slow noise pushing the surface in and out.
    float field = 0.0;
    for (int i = 0; i < 4; i++) {
      vec2 d = px - uBlob[i];
      field += uBlobW[i] * uRadius * uRadius / (dot(d, d) + 1.0);
    }
    float n = vnoise(px / (uRadius * 0.6) + vec2(uTime * 0.4, -uTime * 0.3));
    float m = smoothstep(0.8, 1.15, field * (0.8 + 0.4 * n)) * uAmount;

    if (m > 0.002) {
      vec2 cell = floor(px / uCell);
      vec2 o    = cell * uCell;
      vec4 c    = texture2D(tChar, (o + uCell * 0.5) / uRes);
      float cov = 0.25 * (texture2D(tChar, (o + uCell * vec2(0.25, 0.25)) / uRes).a
                        + texture2D(tChar, (o + uCell * vec2(0.75, 0.25)) / uRes).a
                        + texture2D(tChar, (o + uCell * vec2(0.25, 0.75)) / uRes).a
                        + texture2D(tChar, (o + uCell * vec2(0.75, 0.75)) / uRes).a);

      // Per-cell switch: each cell flips at its own moment as the blob's edge
      // passes, so he dissolves cell by cell instead of fading as one sheet.
      float h  = hash(cell);
      float cm = smoothstep(h * 0.65, h * 0.65 + 0.3, m);

      // Read the cell as six patches.
      vec3 sl = vec3(cellPatch(o, 0.0, 0.0), cellPatch(o, 0.0, 1.0), cellPatch(o, 0.0, 2.0));
      vec3 sr = vec3(cellPatch(o, 1.0, 0.0), cellPatch(o, 1.0, 1.0), cellPatch(o, 1.0, 2.0));
      float mu = (sl.x + sl.y + sl.z + sr.x + sr.y + sr.z) / 6.0;
      float spread = max(max(max(sl.x, sl.y), max(sl.z, sr.x)), max(sr.y, sr.z))
                   - min(min(min(sl.x, sl.y), min(sl.z, sr.x)), min(sr.y, sr.z));
      float idx = 0.0;
      if (spread < 0.08) {
        // Flat cell: the density ramp, nearest by ink.
        float best = 1e9;
        for (int i = 0; i < R; i++) {
          float d = abs(uRampInk[i] - mu);
          if (d < best) { best = d; idx = uRampIdx[i]; }
        }
      } else {
        // Structure in the cell: shape match, with the differences between
        // patches amplified so the glyph follows the edge, not the average.
        vec3 el = clamp(mu + (sl - mu) * 2.2, 0.0, 1.0);
        vec3 er = clamp(mu + (sr - mu) * 2.2, 0.0, 1.0);
        float best = 1e9;
        for (int i = 0; i < N; i++) {
          vec3 a = el - uShape[i * 2], b = er - uShape[i * 2 + 1];
          float d = dot(a, a) + dot(b, b);
          if (d < best) { best = d; idx = float(i); }
        }
      }
      // Cells mid-flip scramble through random glyphs, like text decoding.
      if (cm > 0.02 && cm < 0.98) idx = floor(hash(cell + floor(uTime * 18.0)) * NF);

      // Explicit gradients: fract() jumps at every cell border, and letting
      // the GPU derive the mip level from that draws a grid line there.
      vec2 luv = fract(px / uCell);
      float g  = textureGrad(tGlyph, vec2((idx + luv.x) / NF, luv.y),
                             vec2(1.0 / (uCell.x * NF), 0.0), vec2(0.0, 1.0 / uCell.y)).r;
      g *= smoothstep(0.02, 0.12, cov);

      // Type in his own colours at a readable brightness.
      vec3 col = c.rgb / max(c.a, 1e-4);
      float mx = max(max(col.r, col.g), col.b);
      float tone = clamp(pow(dot(col, vec3(0.2126, 0.7152, 0.0722)), 0.45) * 1.35, 0.0, 1.0);
      vec3 glyphCol = mix(col / max(mx, 1e-3), vec3(1.0), 0.12) * (0.4 + 0.75 * tone);

      // He fades out cell by cell and turns see-through: only the type is
      // left, with the world showing between the letters.
      float aBg = 0.0;
      float a   = g + aBg * (1.0 - g);
      vec3  bg  = vec3(0.01, 0.008, 0.02);
      vec4 ascii = vec4(glyphCol * g + bg * aBg * (1.0 - g), a);
      outc = base * (1.0 - cm) + ascii * cm;
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

    const glyphs = buildGlyphs()
    this.glyphSet = glyphs.chars
    this.rampSet  = glyphs.ramp
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        tChar:   { value: this.rt.texture },
        tGlyph:  { value: glyphs.tex },
        uShape:  { value: glyphs.shapes },
        uRampIdx: { value: glyphs.rampIdx },
        uRampInk: { value: glyphs.rampInk },
        uRes:    { value: new THREE.Vector2(2, 2) },
        uCell:   { value: new THREE.Vector2(CELL_W_CSS, CELL_H_CSS) },
        uRadius: { value: RADIUS_CSS },
        uAmount: { value: 0 },
        uTime:   { value: 0 },
        uBlob:   { value: this._blob },
        uBlobW:  { value: [1, 0.35, 0.22, 0.14] },
      },
      vertexShader: VERT,
      fragmentShader: frag(glyphs.count, glyphs.rampIdx.length),
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
    const rates = [24, 14, 9, 6]
    this._blob.forEach((b, i) => b.lerp(i ? this._blob[i - 1] : p, 1 - Math.exp(-dt * rates[i])))
    this._time += dt

    const dpr = r.getPixelRatio()
    const u = this.material.uniforms
    u.uRes.value.copy(this._size)
    u.uCell.value.set(Math.round(CELL_W_CSS * dpr), Math.round(CELL_H_CSS * dpr))
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

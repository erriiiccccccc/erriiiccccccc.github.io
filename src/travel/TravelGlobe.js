// The Pirate Ship's Storybook globe.
//
// A low-poly, golden-hour planet with every visited country painted in its
// own flag and each map pin glowing where Eric has been. Drag to spin it,
// point at a country (on the globe or in the list) to light it up: the
// country brightens with a white outline, the rest dims a touch, and a label
// with its pin count rides along on top.
//
// One instance lives for the whole visit. Its canvas is built, painted and
// shader-compiled in idle time (warm()), then moved into the panel each time
// it opens and parked again on close, so the first opening never pays for
// the paint, the texture upload or the shader compile mid-entrance.
//
// Data comes from the travel feed (scripts/travel-utils.mjs): per country the
// iso code, centre, pin count and mainland outline, plus one dot per ~10 km
// of pins. Flags load from flagcdn (CORS-enabled, ~600 B each).
import * as THREE from 'three'
import { geoEquirectangular, geoPath, geoContains } from 'd3-geo'
import { feature } from 'topojson-client'
import atlas from 'world-atlas/countries-110m.json'

const TEX_W = 2048, TEX_H = 1024
const SUN   = new THREE.Vector3(-0.7, 0.3, 0.65).normalize()
const TILT  = 0.32                      // the globe leans back a little
const flagUrl = (iso) => `https://flagcdn.com/w160/${iso}.webp`

// Storybook palette: teal sea, meadow land, warm light, golden rim
const LOOK = {
  ocean: ['#1d8fb4', '#14719a'], land: '#55a957', border: 'rgba(20,60,30,0.4)',
  amb: 0.26, sun: [1.0, 0.84, 0.6], night: 0.3, glow: 0.2, term: 0.55,
  rim: [0.98, 0.75, 0.36], rimWarm: [1.0, 0.6, 0.3], rimStr: 0.75,
  pins: [1.0, 0.92, 0.6], pinSize: 0.8,
}

/** Lon/lat on the unit sphere, matching three's SphereGeometry UVs. */
function ll2v(lon, lat, r = 1) {
  const phi = (lon + 180) / 360 * Math.PI * 2, th = (90 - lat) * Math.PI / 180
  return new THREE.Vector3(-Math.cos(phi) * Math.sin(th) * r, Math.cos(th) * r, Math.sin(phi) * Math.sin(th) * r)
}

/** Faceted icosphere with flat normals and UVs from position (seam fixed). */
function facetedGeometry() {
  const g = new THREE.IcosahedronGeometry(1, 4)
  const p = g.attributes.position, uv = new Float32Array(p.count * 2)
  for (let i = 0; i < p.count; i += 3) {
    const us = []
    for (let k = 0; k < 3; k++) {
      const x = p.getX(i + k), y = p.getY(i + k), z = p.getZ(i + k)
      us.push([(Math.atan2(z, -x) / (2 * Math.PI) + 1) % 1, 1 - Math.acos(Math.max(-1, Math.min(1, y))) / Math.PI])
    }
    const hi = Math.max(...us.map(u => u[0])), lo = Math.min(...us.map(u => u[0]))
    if (hi - lo > 0.5) us.forEach(u => { if (u[0] < 0.5) u[0] += 1 })
    us.forEach((u, k) => { uv[(i + k) * 2] = u[0]; uv[(i + k) * 2 + 1] = u[1] })
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  g.computeVertexNormals()
  return g
}

const GLOBE_VERT = /* glsl */`
  varying vec2 vUv; varying vec3 vN; varying vec3 vW;
  void main() {
    vUv = uv; vN = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }`
const GLOBE_FRAG = /* glsl */`
  uniform sampler2D map; uniform sampler2D mask; uniform sampler2D selMap;
  uniform vec3 sun; uniform float amb; uniform vec3 sunCol; uniform float nightAmb; uniform float glow;
  uniform vec3 rim; uniform float rimStr; uniform float term; uniform float selAmt;
  varying vec2 vUv; varying vec3 vN; varying vec3 vW;
  void main() {
    vec3 N = normalize(vN); vec3 V = normalize(cameraPosition - vW);
    vec3 alb = texture2D(map, vUv).rgb; float visited = texture2D(mask, vUv).g;
    float ndl = dot(N, sun);
    float day = smoothstep(-term, term, ndl);
    vec3 col = mix(alb * nightAmb + alb * visited * glow, alb * (amb + sunCol * max(ndl, 0.0) * 1.15), day);
    float fr = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    col += rim * fr * rimStr * (0.35 + 0.65 * day) * 0.55;
    // spotlight: the chosen country lifts, its outline turns white, the rest dims a touch
    vec2 sl = texture2D(selMap, vUv).rg;
    col = mix(col, col * 0.82, selAmt * (1.0 - sl.r));
    col = mix(col, col * 1.22 + vec3(0.035), selAmt * sl.r);
    col = mix(col, vec3(1.0), selAmt * sl.g * 0.92);
    gl_FragColor = vec4(col, 1.0);
  }`

// Additive glows write alpha = brightness, so on the page they only ever
// add light and never darken what's behind the canvas.
const ATMO_FRAG = /* glsl */`
  uniform vec3 cool; uniform vec3 warm; uniform vec3 sun; uniform float str;
  varying vec3 vN; varying vec3 vW;
  void main() {
    vec3 V = normalize(cameraPosition - vW); float f = dot(normalize(vN), V);
    float i = pow(max(0.0, -f - 0.18), 2.2) * 2.2;
    float sd = dot(normalize(vN), sun) * 0.5 + 0.5;
    vec3 o = mix(cool, warm, smoothstep(0.55, 0.95, sd)) * i * str * (0.25 + 0.75 * sd);
    gl_FragColor = vec4(o, max(o.r, max(o.g, o.b)));
  }`
const PIN_VERT = /* glsl */`
  attribute float seed; uniform float size; uniform float px; uniform float time; uniform vec3 sun;
  varying float vA; varying float vDay;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0); vec3 n = normalize(w.xyz);
    vA = smoothstep(0.0, 0.25, dot(n, normalize(cameraPosition - w.xyz)));
    vDay = smoothstep(-0.1, 0.3, dot(n, sun));
    gl_Position = projectionMatrix * viewMatrix * w;
    gl_PointSize = size * px * (5.5 + 1.5 * sin(time * 1.6 + seed * 30.0));
  }`
const PIN_FRAG = /* glsl */`
  uniform vec3 col; varying float vA; varying float vDay;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d); a = a * a + smoothstep(0.12, 0.0, d);
    vec3 o = min(col * a * (1.0 - vDay * 0.75) * vA, vec3(1.0));
    gl_FragColor = vec4(o, max(o.r, max(o.g, o.b)));
  }`
const WORLD_VERT = /* glsl */`
  varying vec3 vN; varying vec3 vW;
  void main() {
    vN = normalize(mat3(modelMatrix) * normal); vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }`

const additive = { blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor, transparent: true, depthWrite: false }
const COUNTRIES = feature(atlas, atlas.objects.countries).features.map(f => f.geometry).filter(Boolean)

export class TravelGlobe {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.className = 'tl-canvas'
    this.canvas.setAttribute('aria-label', 'Globe of the countries Eric has visited. Drag to spin it.')
    this.canvas.setAttribute('role', 'img')

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.setClearColor(0x000000, 0)
    this.scene  = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
    this.camera.position.set(0, 0, 4.6)
    this.world = new THREE.Group(); this.scene.add(this.world)
    this.spin  = new THREE.Group(); this.world.add(this.spin)

    this.proj = geoEquirectangular().scale(TEX_W / (2 * Math.PI)).translate([TEX_W / 2, TEX_H / 2])

    // the planet
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: null }, mask: { value: null }, selMap: { value: null }, sun: { value: SUN },
        amb: { value: LOOK.amb }, sunCol: { value: new THREE.Color(...LOOK.sun) }, nightAmb: { value: LOOK.night },
        glow: { value: LOOK.glow }, rim: { value: new THREE.Color(...LOOK.rim) }, rimStr: { value: LOOK.rimStr },
        term: { value: LOOK.term }, selAmt: { value: 0 },
      },
      vertexShader: GLOBE_VERT, fragmentShader: GLOBE_FRAG,
    })
    this.globe = new THREE.Mesh(facetedGeometry(), this.mat)
    this.spin.add(this.globe)

    // the halo
    this.world.add(new THREE.Mesh(new THREE.SphereGeometry(1.14, 64, 32), new THREE.ShaderMaterial({
      uniforms: {
        cool: { value: new THREE.Color(...LOOK.rim) }, warm: { value: new THREE.Color(...LOOK.rimWarm) },
        sun: { value: SUN }, str: { value: LOOK.rimStr },
      },
      vertexShader: WORLD_VERT, fragmentShader: ATMO_FRAG, side: THREE.BackSide, ...additive,
    })))

    // the pins
    this.pinMat = new THREE.ShaderMaterial({
      uniforms: {
        col: { value: new THREE.Color(...LOOK.pins) }, size: { value: LOOK.pinSize }, sun: { value: SUN },
        time: { value: 0 }, px: { value: 1 },
      },
      vertexShader: PIN_VERT, fragmentShader: PIN_FRAG, ...additive,
    })
    this.pins = new THREE.Points(new THREE.BufferGeometry(), this.pinMat)
    this.spin.add(this.pins)

    // spotlight mask: the chosen country filled (r) and outlined (g)
    this.selCv = document.createElement('canvas')
    this.selCv.width = TEX_W; this.selCv.height = TEX_H
    this.selCtx = this.selCv.getContext('2d')
    this.selTex = new THREE.CanvasTexture(this.selCv)
    this.selTex.wrapS = THREE.RepeatWrapping
    this.mat.uniforms.selMap.value = this.selTex

    this.countries = []
    this._sig = ''
    this.sel = -1; this._selTarget = 0
    this.yaw = -2; this.pitch = 0; this._vy = 0; this._idle = 0; this._fly = null
    this._drag = null
    this._raf = 0; this._last = 0
    this.reduced = () => false
    this.onSelect = null

    this._ray = new THREE.Raycaster(); this._mv = new THREE.Vector2()
    this._v = new THREE.Vector3(); this._n = new THREE.Vector3(); this._e = new THREE.Vector3()

    this._bindInput()
    this._ro = new ResizeObserver(() => this._resize())
  }

  /** Load stats into the globe; repaints only when the countries or pins change. */
  async setData(stats) {
    const list = (stats?.countryData || []).filter(c => c.geom && c.centre)
    const dots = stats?.pinDots || []
    const sig = list.map(c => c.name + c.pins).join('|') + '#' + dots.length
    if (sig === this._sig) return
    this._sig = sig
    const prev = this.countries[this.sel]?.name

    const flags = await Promise.all(list.map(c => new Promise(res => {
      if (!c.iso) return res(null)
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.onload = () => res(im); im.onerror = () => res(null)
      im.src = flagUrl(c.iso)
    })))
    if (sig !== this._sig) return   // newer data arrived while flags loaded

    this.countries = list
    this._paint(flags)
    const pos = new Float32Array(dots.length * 3), seed = new Float32Array(dots.length)
    dots.forEach(([lon, lat], i) => { ll2v(lon, lat, 1.004).toArray(pos, i * 3); seed[i] = (i * 0.618) % 1 })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('seed', new THREE.BufferAttribute(seed, 1))
    this.pins.geometry.dispose()
    this.pins.geometry = g
    // keep the same country lit if it's still there
    this.sel = -2
    this.select(prev ? this.countries.findIndex(c => c.name === prev) : -1)
  }

  _paint(flags) {
    const cv = document.createElement('canvas'); cv.width = TEX_W; cv.height = TEX_H
    const ctx = cv.getContext('2d'), path = geoPath(this.proj, ctx)
    const sea = ctx.createLinearGradient(0, 0, 0, TEX_H)
    sea.addColorStop(0, LOOK.ocean[1]); sea.addColorStop(0.5, LOOK.ocean[0]); sea.addColorStop(1, LOOK.ocean[1])
    ctx.fillStyle = sea; ctx.fillRect(0, 0, TEX_W, TEX_H)
    ctx.fillStyle = LOOK.land
    ctx.beginPath(); for (const g of COUNTRIES) path(g); ctx.fill()
    ctx.strokeStyle = LOOK.border; ctx.lineWidth = 0.8; ctx.stroke()

    // each visited country: its flag, clipped to its outline. The flag is
    // stretched sideways by 1/cos(latitude) so it looks right once wrapped.
    this.countries.forEach((c, i) => {
      const im = flags[i]
      ctx.save(); ctx.beginPath(); path(c.geom); ctx.clip()
      if (im) {
        const [[x0, y0], [x1, y1]] = path.bounds(c.geom)
        const cos = Math.max(0.25, Math.cos(c.centre[1] * Math.PI / 180)), a = im.naturalWidth / im.naturalHeight
        const h = Math.max(y1 - y0, ((x1 - x0) * cos) / a) * 1.04, w = (h * a) / cos
        ctx.globalAlpha = 0.9
        ctx.drawImage(im, (x0 + x1) / 2 - w / 2, (y0 + y1) / 2 - h / 2, w, h)
      } else {
        ctx.fillStyle = '#f4d58d'; ctx.fill()
      }
      ctx.restore()
      ctx.beginPath(); path(c.geom); ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 1.2; ctx.stroke()
    })
    const tex = new THREE.CanvasTexture(cv)
    tex.wrapS = THREE.RepeatWrapping
    tex.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy())
    this.mat.uniforms.map.value?.dispose()
    this.mat.uniforms.map.value = tex

    // visited mask (g) for the night-side glow
    const mc = document.createElement('canvas'); mc.width = TEX_W / 2; mc.height = TEX_H / 2
    const mctx = mc.getContext('2d')
    const mp = geoPath(geoEquirectangular().scale(TEX_W / 2 / (2 * Math.PI)).translate([TEX_W / 4, TEX_H / 4]), mctx)
    mctx.fillStyle = '#000'; mctx.fillRect(0, 0, mc.width, mc.height)
    mctx.fillStyle = '#0f0'; mctx.beginPath(); for (const c of this.countries) mp(c.geom); mctx.fill()
    this.mat.uniforms.mask.value?.dispose()
    this.mat.uniforms.mask.value = new THREE.CanvasTexture(mc)
  }

  /** Paint and compile off-screen so the first opening is instant. */
  warm() {
    this._resize(560, 560)
    this.renderer.compile(this.scene, this.camera)
    this.renderer.render(this.scene, this.camera)
  }

  /** Put the canvas into the panel and start turning. */
  mount(stage, tag) {
    this.stage = stage; this.tag = tag
    stage.prepend(this.canvas)
    this._ro.observe(stage)
    this._resize()
    this._last = performance.now()
    cancelAnimationFrame(this._raf)
    this._raf = requestAnimationFrame(t => this._frame(t))
  }

  /** Stop and park the canvas (the GL context and textures are kept). */
  unmount() {
    cancelAnimationFrame(this._raf); this._raf = 0
    this._ro.disconnect()
    this.canvas.remove()
    this.stage = this.tag = null
    this._drag = null
  }

  _resize(w, h) {
    const box = this.stage?.getBoundingClientRect()
    w = Math.max(1, Math.round(w ?? box?.width ?? 1)); h = Math.max(1, Math.round(h ?? box?.height ?? 1))
    this.renderer.setSize(w, h, false)
    this.canvas.style.width = w + 'px'; this.canvas.style.height = h + 'px'
    const aspect = w / h
    this.camera.aspect = aspect
    // fit the planet and its halo to the shorter side
    this.camera.fov = aspect >= 1 ? 30 : THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(15)) / aspect))
    this.camera.updateProjectionMatrix()
    this.pinMat.uniforms.px.value = this.renderer.getPixelRatio() * Math.max(0.7, Math.min(1.3, Math.min(w, h) / 520))
  }

  // ── Selection ──────────────────────────────────────────────────────────────
  select(i) {
    if (i === this.sel) return
    this.sel = i
    const ctx = this.selCtx, path = geoPath(this.proj, ctx)
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, TEX_W, TEX_H)
    const c = this.countries[i]
    if (c) {
      ctx.fillStyle = '#f00'; ctx.beginPath(); path(c.geom); ctx.fill()
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = '#0f0'; ctx.lineWidth = 4; ctx.lineJoin = 'round'
      ctx.beginPath(); path(c.geom); ctx.stroke()
      ctx.globalCompositeOperation = 'source-over'
      this.mat.uniforms.selAmt.value = 0
      if (this.tag) {
        this.tag.querySelector('b').textContent = c.name
        this.tag.querySelector('span').textContent = c.pins === 1 ? '1 pin' : `${c.pins} pins`
      }
    }
    this.selTex.needsUpdate = true
    this._selTarget = c ? 1 : 0
    this.onSelect?.(c ? c.name : null)
  }

  /** Turn the globe to face a country and light it up. */
  flyTo(name, instant = false) {
    const i = this.countries.findIndex(c => c.name === name)
    if (i < 0) return
    const c = this.countries[i]
    const v = ll2v(c.centre[0], 0, 1)
    let to = -Math.atan2(v.x, v.z)
    while (to - this.yaw > Math.PI) to -= 2 * Math.PI
    while (to - this.yaw < -Math.PI) to += 2 * Math.PI
    const pt = Math.max(-0.9, Math.min(0.9, c.centre[1] * Math.PI / 180 - TILT))
    if (instant || this.reduced()) { this.yaw = to; this.pitch = pt; this._fly = null; this._idle = -1.2 }
    else this._fly = { from: this.yaw, to, pf: this.pitch, pt, t: 0 }
    this._vy = 0; this._idle = Math.min(this._idle, 0)
    this.select(i)
  }

  // ── Input ──────────────────────────────────────────────────────────────────
  _bindInput() {
    const cv = this.canvas
    cv.addEventListener('pointerdown', e => {
      this._drag = { x: e.clientX, y: e.clientY, moved: 0, touch: e.pointerType !== 'mouse' }
      cv.setPointerCapture?.(e.pointerId)
      cv.classList.add('is-dragging')
      this._fly = null
    })
    const end = e => {
      if (this._drag && this._drag.moved < 6) this._pick(e)   // a tap, not a drag
      this._drag = null
      cv.classList.remove('is-dragging')
    }
    cv.addEventListener('pointerup', end)
    cv.addEventListener('pointercancel', () => { this._drag = null; cv.classList.remove('is-dragging') })
    cv.addEventListener('pointermove', e => {
      const d = this._drag
      if (d) {
        const dx = e.clientX - d.x, dy = e.clientY - d.y
        d.x = e.clientX; d.y = e.clientY; d.moved += Math.abs(dx) + Math.abs(dy)
        const k = 3.2 / Math.max(200, cv.clientWidth)
        this.yaw += dx * k; this._vy = dx * k * 60
        if (!d.touch) this.pitch = Math.max(-0.9, Math.min(0.9, this.pitch + dy * k))
        this._idle = 0
      } else if (e.pointerType === 'mouse') {
        this._pick(e)
      }
    })
  }

  /** Light up whichever visited country is under the pointer. */
  _pick(e) {
    const r = this.canvas.getBoundingClientRect()
    this._mv.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    this._ray.setFromCamera(this._mv, this.camera)
    const hit = this._ray.intersectObject(this.globe)[0]
    if (!hit) return
    const p = this.spin.worldToLocal(hit.point.clone()).normalize()
    const lon = ((Math.atan2(p.z, -p.x) * 180 / Math.PI + 360) % 360) - 180
    const lat = 90 - Math.acos(p.y) * 180 / Math.PI
    const i = this.countries.findIndex(c => geoContains(c.geom, [lon, lat]))
    if (i >= 0) this.select(i)
  }

  // ── Loop ───────────────────────────────────────────────────────────────────
  _frame(now) {
    // the panel swapped its content without a close (an island hop): park
    if (!this.canvas.isConnected) { this.unmount(); return }
    this._raf = requestAnimationFrame(t => this._frame(t))
    const dt = Math.min(0.05, (now - this._last) / 1000); this._last = now
    const reduced = this.reduced()
    if (this._fly) {
      const f = this._fly
      f.t = Math.min(1, f.t + dt / 1.1)
      const k = 1 - Math.pow(1 - f.t, 3)
      this.yaw = f.from + (f.to - f.from) * k; this.pitch = f.pf + (f.pt - f.pf) * k
      if (f.t >= 1) { this._fly = null; this._idle = -1.2 }
    } else if (!this._drag) {
      this.yaw += this._vy * dt; this._vy *= Math.pow(0.04, dt); this._idle += dt
      // a slow, eased-in drift whenever nobody is touching it
      if (!reduced && this._idle > 0.8) this.yaw += dt * 0.13 * Math.min(1, (this._idle - 0.8) / 1.5)
    }
    this.spin.rotation.y = this.yaw
    this.world.rotation.x = TILT + this.pitch
    const s = this.mat.uniforms.selAmt
    s.value += (this._selTarget - s.value) * Math.min(1, dt * 9)
    if (!reduced) this.pinMat.uniforms.time.value = now / 1000
    this.renderer.render(this.scene, this.camera)
    this._placeTag()
  }

  /** Keep the label sitting on the chosen country as the globe turns. */
  _placeTag() {
    const tag = this.tag
    if (!tag) return
    const c = this.countries[this.sel]
    if (!c) { tag.style.opacity = '0'; return }
    const v = this._v.copy(ll2v(c.centre[0], c.centre[1], 1)).applyMatrix4(this.spin.matrixWorld)
    const facing = this._n.copy(v).normalize().dot(this._e.copy(this.camera.position).sub(v).normalize())
    v.project(this.camera)
    const x = (v.x * 0.5 + 0.5) * this.canvas.clientWidth, y = (-v.y * 0.5 + 0.5) * this.canvas.clientHeight
    tag.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, calc(-100% - 16px))`
    tag.style.opacity = facing > 0.2 && this.mat.uniforms.selAmt.value > 0.3 ? '1' : '0'
  }
}

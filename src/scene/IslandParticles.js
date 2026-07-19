import * as THREE from 'three'

// ── motionType: 0=fall  1=swirl  2=sweep  3=fountain ─────────────────────────
// ── shapeType:  0=circle  1=oval  2=disc  3=rect ─────────────────────────────
// Rename mountain_island → sakura_island and lava_island → manhattan_island
// in both CONFIGS and content.js once the new GLB nodes are named.
const CONFIGS = {
  arctic_island: {
    count: 35, color: [0.82, 0.92, 1.00], pixelSize: 2.5,
    motionType: 0, shapeType: 0,
    spread: 4.0, fallTop: 5.2, fallBot: 0.3,
    driftAmp: 0.12, windDrift: 0.0,   // barely drifts → nearly straight down
    speedMid: 0.38, speedVar: 0.12,
  },
  desert_island: {
    count: 50, color: [0.95, 0.76, 0.42], pixelSize: 1.6,
    motionType: 1, shapeType: 0,
    spread: 4.0, swirlSpd: 2.0, bobAmp: 0.20,
    speedMid: 1.0, speedVar: 0.45,
  },
  meadow_island: {
    count: 25, color: [0.80, 1.00, 0.45], pixelSize: 2.8,
    motionType: 2, shapeType: 1,
    spread: 3.5,
    driftAmp: 5.0,  // total sweep width in local X
    bobAmp:   0.55, // float height above surface
    speedMid: 0.38, speedVar: 0.14,
  },
  mountain_island: {
    count: 40, color: [1.00, 0.70, 0.78], pixelSize: 3.5,
    motionType: 0, shapeType: 1,
    spread: 4.5, fallTop: 5.5, fallBot: 0.3,
    driftAmp: 1.2, windDrift: 2.5,  // sakura leans progressively to one side
    speedMid: 0.43, speedVar: 0.17,
  },
  lava_island: {
    count: 28, color: [0.62, 0.88, 0.62], pixelSize: 4.6,
    motionType: 0, shapeType: 3,
    spread: 4.0, fallTop: 7.0, fallBot: 0.3,
    driftAmp: 0.65, windDrift: 0.6,
    speedMid: 0.27, speedVar: 0.11,
  },
  pirate_ship: {
    count: 20, color: [1.00, 0.86, 0.18], pixelSize: 3.6,
    motionType: 3, shapeType: 2,
    spread: 2.5, speedMid: 0.65, speedVar: 0.30,
  },
}

// ── Vertex shader ─────────────────────────────────────────────────────────────
// Positions are in planet-local space (the group is a child of planetGroup).
// uCenter is the island's local-space position, so particles stay anchored
// to the island regardless of planet rotation.
const VERT = /* glsl */ `
  attribute vec2  aBase;       // (x,z) spread within island-local plane
  attribute float aPhase;      // per-particle time offset 0..2π
  attribute float aSpeed;      // per-particle speed multiplier
  attribute float aSize;       // screen-space size in pixels
  attribute float aBaseAlpha;  // per-particle opacity variation

  uniform float uTime;
  uniform float uOpacity;    // system fade 0→1
  uniform vec3  uCenter;     // island center in planet-local space

  uniform int   uMotion;

  // FALL / SWEEP
  uniform float uFallTop;    // units above surface where particles spawn
  uniform float uFallBot;    // units below surface before cycle resets (keep small)
  uniform float uDriftAmp;   // oscillation amplitude (FALL) or sweep width (SWEEP)
  uniform float uWindDrift;  // progressive +X lean per cycle (0=straight, 2.5=sakura diagonal)

  // SWIRL / SWEEP
  uniform float uSwirlSpd;
  uniform float uBobAmp;     // vertical bob (SWIRL) or float height above surface (SWEEP)

  varying float vAlpha;

  void main() {
    float t   = mod(uTime * aSpeed + aPhase / 6.28318, 1.0);
    vec3  pos = uCenter;   // start at island center in planet-local space
    float a   = aBaseAlpha * uOpacity;

    if (uMotion == 0) {
      // ── FALL ──────────────────────────────────────────────────────────────
      // Particles descend in local +Y → -Y (world gravity when island is near top).
      // windDrift = 0 → nearly vertical (snow).
      // windDrift > 0 → leans progressively in +X as particle falls (sakura/bills).
      float range = uFallTop + uFallBot;
      pos.y += uFallTop - t * range;
      pos.x += aBase.x + sin(uTime * aSpeed * 0.80 + aPhase)        * uDriftAmp
               + t * uWindDrift;
      pos.z += aBase.y + cos(uTime * aSpeed * 0.55 + aPhase * 1.40) * uDriftAmp * 0.6;

    } else if (uMotion == 1) {
      // ── SWIRL ─────────────────────────────────────────────────────────────
      // Orbits around local Y (dust devil). Each particle keeps its initial
      // radius (encoded in aBase length) as it rotates.
      float r     = length(aBase);
      float angle = atan(aBase.y, aBase.x) + uTime * uSwirlSpd * aSpeed;
      pos.x += sin(angle) * r;
      pos.z += cos(angle) * r;
      pos.y += sin(uTime * 2.4 * aSpeed + aPhase) * uBobAmp;

    } else if (uMotion == 2) {
      // ── SWEEP ─────────────────────────────────────────────────────────────
      // Particles stream across the island in local +X (wind direction fixed
      // in island space). Z position is from aBase.y, giving multiple streams.
      // Soft edge fade so particles appear/disappear naturally at both sides.
      float windT = mod(uTime * aSpeed + aPhase / 6.28318, 1.0);
      pos.x += (windT - 0.5) * uDriftAmp * 2.0;  // sweeps -driftAmp..+driftAmp
      pos.z += aBase.y + sin(uTime * aSpeed * 0.45 + aPhase * 1.2) * uDriftAmp * 0.18;
      pos.y += uBobAmp + sin(uTime * aSpeed * 0.80 + aPhase) * uBobAmp * 0.70;
      a     *= smoothstep(0.0, 0.12, windT) * smoothstep(1.0, 0.88, windT);

    } else {
      // ── FOUNTAIN ──────────────────────────────────────────────────────────
      // Coins erupt upward on a sine arc then fall back. Alpha follows height
      // so they materialise going up and dissolve coming down — gold rain.
      float rise   = sin(t * 3.14159);
      float spread = t * (1.0 - t) * 7.5;
      pos.y += rise * 4.5;
      pos.x += aBase.x + sin(aPhase) * spread;
      pos.z += aBase.y + cos(aPhase) * spread;
      a     *= rise;
    }

    vAlpha       = clamp(a, 0.0, 1.0);
    vec4 mvPos   = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize;
    gl_Position  = projectionMatrix * mvPos;
  }
`

// ── Fragment shader ───────────────────────────────────────────────────────────
const FRAG = /* glsl */ `
  uniform vec3  uColor;
  uniform int   uShape;
  varying float vAlpha;

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float alpha;

    if (uShape == 0) {
      // CIRCLE — soft round dot (snow, sand)
      float d = length(uv);
      if (d > 0.5) discard;
      alpha = smoothstep(0.5, 0.05, d);

    } else if (uShape == 1) {
      // OVAL — tall narrow shape (sakura petal, leaf/seed)
      float d = length(vec2(uv.x * 2.2, uv.y));
      if (d > 0.48) discard;
      alpha = smoothstep(0.48, 0.08, d);

    } else if (uShape == 2) {
      // DISC — flat horizontal ellipse (coin side-on)
      float d    = length(vec2(uv.x, uv.y * 3.5));
      if (d > 0.5) discard;
      float base = smoothstep(0.5, 0.15, d);
      float hl   = smoothstep(0.28, 0.0, length(vec2(uv.x - 0.08, uv.y * 3.0 - 0.08)));
      alpha = clamp(base + hl * 0.38, 0.0, 1.0);

    } else {
      // RECT — dollar bill / confetti
      if (abs(uv.x) > 0.44 || abs(uv.y) > 0.22) discard;
      float ex = (0.44 - abs(uv.x)) * 7.0;
      float ey = (0.22 - abs(uv.y)) * 7.0;
      alpha = clamp(min(ex, ey), 0.0, 1.0);
    }

    gl_FragColor = vec4(uColor, alpha * vAlpha);
  }
`

const _tmpCenter = new THREE.Vector3()

// ── IslandParticles ───────────────────────────────────────────────────────────
// Add this group to planetGroup (not scene) so particles rotate with the island.
export class IslandParticles {
  constructor() {
    this._systems = {}
    this._group   = new THREE.Group()
    this._scale   = 1

    for (const [name, cfg] of Object.entries(CONFIGS)) {
      const sys = this._buildSystem(cfg)
      this._systems[name] = sys
      this._group.add(sys.points)
    }
  }

  get group() { return this._group }

  /** 0–1 quality scale: reduces peak opacity / effective density feel. */
  setScale(scale) {
    this._scale = Math.max(0, Math.min(1, scale ?? 1))
    if (this._scale < 0.05) {
      for (const sys of Object.values(this._systems)) sys.points.visible = false
    }
  }

  _buildSystem(cfg) {
    const N = cfg.count

    const dummy      = new Float32Array(N * 3)
    const aBase      = new Float32Array(N * 2)
    const aPhase     = new Float32Array(N)
    const aSpeed     = new Float32Array(N)
    const aSize      = new Float32Array(N)
    const aBaseAlpha = new Float32Array(N)

    for (let i = 0; i < N; i++) {
      const ang = Math.random() * Math.PI * 2
      const r   = Math.sqrt(Math.random()) * cfg.spread
      aBase[i * 2]     = Math.cos(ang) * r
      aBase[i * 2 + 1] = Math.sin(ang) * r
      aPhase[i]     = Math.random() * Math.PI * 2
      aSpeed[i]     = Math.max(0.05, cfg.speedMid + (Math.random() * 2 - 1) * cfg.speedVar)
      aSize[i]      = cfg.pixelSize * (0.55 + Math.random() * 0.90)
      aBaseAlpha[i] = 0.45 + Math.random() * 0.55
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position',   new THREE.BufferAttribute(dummy,      3))
    geo.setAttribute('aBase',      new THREE.BufferAttribute(aBase,      2))
    geo.setAttribute('aPhase',     new THREE.BufferAttribute(aPhase,     1))
    geo.setAttribute('aSpeed',     new THREE.BufferAttribute(aSpeed,     1))
    geo.setAttribute('aSize',      new THREE.BufferAttribute(aSize,      1))
    geo.setAttribute('aBaseAlpha', new THREE.BufferAttribute(aBaseAlpha, 1))

    const uniforms = {
      uTime:    { value: 0 },
      uOpacity: { value: 0 },
      uCenter:  { value: new THREE.Vector3(0, 26, 0) },  // updated each frame
      uColor:   { value: new THREE.Vector3(...cfg.color) },
      uMotion:  { value: cfg.motionType },
      uShape:   { value: cfg.shapeType  },
      // FALL
      uFallTop:  { value: cfg.fallTop   ?? 5.0 },
      uFallBot:  { value: cfg.fallBot   ?? 0.3 },
      uDriftAmp: { value: cfg.driftAmp  ?? 0.8 },
      uWindDrift:{ value: cfg.windDrift ?? 0.0 },
      // SWIRL / SWEEP
      uSwirlSpd: { value: cfg.swirlSpd  ?? 1.8 },
      uBobAmp:   { value: cfg.bobAmp    ?? 0.22},
    }

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geo, mat)
    points.frustumCulled = false
    points.visible = false
    return { points, uniforms }
  }

  // islandDirs: { [name]: THREE.Vector3 } — unit vectors in planet-local space.
  // charWorldY: world Y of island surface (used to scale the local dir to surface).
  // This group must be a child of planetGroup so it rotates with the planet.
  update(dt, activeIsland, charWorldY, reducedMotion, islandDirs) {
    if (reducedMotion || this._scale < 0.05) {
      for (const sys of Object.values(this._systems)) sys.points.visible = false
      return
    }

    const t = performance.now() * 0.001
    const peak = this._scale

    for (const [name, sys] of Object.entries(this._systems)) {
      const { points, uniforms } = sys
      const isActive = name === activeIsland

      uniforms.uOpacity.value += ((isActive ? peak : 0) - uniforms.uOpacity.value) * Math.min(1, dt * 2.5)

      if (uniforms.uOpacity.value < 0.01) {
        points.visible = false
        continue
      }

      // Compute island center in planet-local space.
      // islandDirs[name] is the normalised local-space unit vector to the island.
      // Scaling by charWorldY gives the approx surface position in local space.
      // (charWorldY ≈ surface radius when island is near top, so this is accurate
      //  when the island is active and only used when visible.)
      if (islandDirs && islandDirs[name]) {
        const dir = islandDirs[name]
        uniforms.uCenter.value.set(
          dir.x * charWorldY,
          dir.y * charWorldY,
          dir.z * charWorldY,
        )
      } else {
        uniforms.uCenter.value.set(0, charWorldY, 0)
      }

      points.visible          = true
      uniforms.uTime.value    = t
    }
  }
}

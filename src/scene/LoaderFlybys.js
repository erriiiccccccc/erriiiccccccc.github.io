import * as THREE from 'three'

// ─── Space junk for the loading screen ───────────────────────────────────────
//
// Cheap, fully procedural things to fly past on the way in: a satellite, a UFO, a stray little
// planet, a clump of asteroids. Code only (no assets), so they cost nothing to load. Styles mirror
// the in-game decor (CelestialBodies / Asteroids) so they read as the same universe.
// LoaderApproach places them along the camera's path; each builder returns { obj, radius }.

const ROCK_COLORS = [0x6E6258, 0x7A6A5C, 0x5C5650, 0x83705F]

// A few "stray world" palettes [base, dark] — red (matches the in-game accent
// world), sandy, icy, grey — picked at random so no two drift-bys look alike.
const WORLD_PALETTES = [
  [0xE0683C, 0xA8401E], // warm red — the "red planet"
  [0xD9A05E, 0xB07840], // sandy gold
  [0x7FA6C8, 0x4E6E8E], // icy blue
  [0xBFC4CC, 0x7C828C], // cratered grey
]

const pick = (arr) => arr[(Math.random() * arr.length) | 0]

// Random darker facets → speckled, cratered look (from CelestialBodies).
function speckle(geo, base, dark, amount = 0.24) {
  const pos = geo.attributes.position
  const colors = new Float32Array(pos.count * 3)
  const b = new THREE.Color(base), d = new THREE.Color(dark), c = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    c.copy(Math.random() < amount ? d : b)
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
}

// Jitter an icosahedron into an irregular lump (from Asteroids).
function lumpGeo(radius) {
  const geo = new THREE.IcosahedronGeometry(radius, 0)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const f = 0.7 + Math.random() * 0.6
    pos.setXYZ(i, pos.getX(i) * f, pos.getY(i) * f, pos.getZ(i) * f)
  }
  geo.computeVertexNormals()
  return geo
}

// ── Builders: each returns { obj, radius } ──
export function buildSatellite() {
  const g = new THREE.Group()
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xC9CDD6, flatShading: true, roughness: 0.55, metalness: 0.35,
    emissive: 0x1A1D26, emissiveIntensity: 0.6,
  })
  g.add(new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 2.2), bodyMat))
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x2B6CFF, flatShading: true, roughness: 0.4, metalness: 0.2,
    emissive: 0x0A1840, emissiveIntensity: 0.9,
  })
  for (const s of [-1, 1]) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 1.7), panelMat)
    panel.position.x = s * 2.6
    g.add(panel)
    const strut = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.12), bodyMat)
    strut.position.x = s * 1.2
    g.add(strut)
  }
  const dish = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.55, 10, 1, true), bodyMat)
  dish.rotation.x = Math.PI / 2
  dish.position.z = 1.5
  g.add(dish)
  return { obj: g, radius: 3.6 }
}

export function buildUFO() {
  const g = new THREE.Group()
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x9AA3B2, flatShading: true, roughness: 0.45, metalness: 0.45,
    emissive: 0x14171F, emissiveIntensity: 0.6,
  })
  const saucer = new THREE.Mesh(new THREE.SphereGeometry(2.6, 18, 12), hullMat)
  saucer.scale.set(1, 0.34, 1)
  g.add(saucer)
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1.25, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({
      color: 0x7CF5D0, flatShading: true, transparent: true, opacity: 0.82,
      emissive: 0x1B5A4A, emissiveIntensity: 1.0,
    })
  )
  dome.position.y = 0.45
  g.add(dome)
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xFFD36B })
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), lightMat)
    l.position.set(Math.cos(a) * 1.85, -0.32, Math.sin(a) * 1.85)
    g.add(l)
  }
  return { obj: g, radius: 2.9 }
}

export function buildStrayWorld() {
  const radius = 3.4 + Math.random() * 3
  const [base, dark] = pick(WORLD_PALETTES)
  const geo = new THREE.IcosahedronGeometry(radius, 2)
  speckle(geo, base, dark, 0.22)
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    vertexColors: true, flatShading: true, roughness: 0.85, metalness: 0,
    emissive: 0x180A04, emissiveIntensity: 0.45,
  }))
  return { obj: mesh, radius }
}

export function buildAsteroidCluster() {
  const g = new THREE.Group()
  const n = 4 + ((Math.random() * 3) | 0)
  for (let i = 0; i < n; i++) {
    const r = 0.6 + Math.random() * 1.3
    const m = new THREE.Mesh(lumpGeo(r), new THREE.MeshStandardMaterial({
      color: ROCK_COLORS[i % ROCK_COLORS.length], flatShading: true,
      roughness: 1, metalness: 0, emissive: 0x0A0A0E, emissiveIntensity: 0.5,
    }))
    m.position.set((Math.random() - 0.5) * 7, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 7)
    g.add(m)
  }
  return { obj: g, radius: 5.5 }
}

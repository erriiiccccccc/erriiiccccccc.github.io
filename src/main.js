import * as THREE from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Starfield } from './scene/Starfield.js'
import { LoaderFlybys } from './scene/LoaderFlybys.js'
import { Lighting } from './scene/Lighting.js'
import { Character } from './character/Character.js'
import { Controls } from './character/Controls.js'
import { TouchControls } from './character/TouchControls.js'
import { AnimationController } from './character/AnimationController.js'
import { Camera } from './scene/Camera.js'
import { ShootingStars } from './scene/ShootingStars.js'
import { SkyDecor } from './scene/SkyDecor.js'
import { IslandParticles } from './scene/IslandParticles.js'
import { ISLANDS } from './data/content.js'
import { UI } from './ui/UI.js'
import { svgIcon } from './ui/icons.js'
import { MapOverlay } from './ui/MapOverlay.js'
import { HelpOverlay } from './ui/HelpOverlay.js'
import { IntroOverlay } from './ui/IntroOverlay.js'
import { SettingsOverlay } from './ui/SettingsOverlay.js'
import { AboutOverlay } from './ui/AboutOverlay.js'
import gsap from 'gsap'

const ISLAND_NAMES = Object.keys(ISLANDS)
const ISLAND_COLOR_HEX = {}
for (const name of ISLAND_NAMES) {
  const c = ISLANDS[name].lightColor || ISLANDS[name].color
  ISLAND_COLOR_HEX[name] = parseInt(c.slice(1), 16)
}

// --- Renderer ---
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
  stencil: false,
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0

// --- Scene ---
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0d0820)

// --- Camera ---
const camSystem = new Camera(window.innerWidth / window.innerHeight)
scene.add(camSystem.camera)
camSystem.setLoadingView()   // planet centred during loading; update() lerps away from here

// --- Planet Group ---
const planetGroup = new THREE.Group()
scene.add(planetGroup)

// --- Lighting ---
const lighting = new Lighting()
scene.add(lighting.sceneGroup)

// --- UI ---
const ui = new UI()

// ─── Touch device detection ───────────────────────────────────────────────────
const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0

// ─── Teleport system ─────────────────────────────────────────────────────────
const islandDirs    = {}   // name → THREE.Vector3 in planetGroup-local space (set on GLB load)
const visitedIslands = new Set()

let   isTeleporting    = false
let   teleportProgress = 0
const TELEPORT_DURATION = 1.1   // seconds for full planet slerp
const _teleStartQ  = new THREE.Quaternion()
const _teleTargetQ = new THREE.Quaternion()
const _worldUp     = new THREE.Vector3(0, 1, 0)

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function startTeleport(name) {
  if (!islandDirs[name] || isTeleporting || !planetModel) return
  if (islandUIState === 'detail') {
    islandUIState = 'near'
    ui.closePanel()
  }
  _teleStartQ.copy(planetGroup.quaternion)
  _teleTargetQ.setFromUnitVectors(islandDirs[name], _worldUp)
  isTeleporting    = true
  teleportProgress = 0
  // Brief purple flash — skip if user prefers reduced motion
  const flash = document.getElementById('teleport-flash')
  if (flash && !reducedMotion) {
    flash.classList.add('active')
    setTimeout(() => flash.classList.remove('active'), 220)
  }
}

// ─── Overlay modals ───────────────────────────────────────────────────────────
const mapOverlay      = new MapOverlay(startTeleport)
const helpOverlay     = new HelpOverlay()
const introOverlay    = new IntroOverlay()
const settingsOverlay = new SettingsOverlay()
const aboutOverlay    = new AboutOverlay()
aboutOverlay.onStartClose = () => {
  // 1. Lights snap off first (quick) — character goes dark while still zoomed in.
  aboutLightsOn = false
  // 2. Once they're gone: pan out, then turn him away and drop him. The turn
  //    runs while he's STILL frozen (presentationMode true) so GSAP owns the
  //    rotation; he's only released to fall when the turn finishes. Releasing
  //    mid-turn lets the per-frame logic snap his rotation = the "teleport".
  setTimeout(() => {
    camSystem._distTarget = _savedCamDist
    if (fbxInScene && modelLoaded) {
      gsap.killTweensOf(modelGroup.rotation)
      gsap.to(modelGroup.rotation, {
        y: Math.PI - heading, duration: 0.4, ease: 'power2.inOut',
        onComplete: releaseFromPresentation,
      })
    } else {
      releaseFromPresentation()
    }
  }, 200)
}
aboutOverlay.onClose = () => {
  // HUD cleanup only — the character's turn + fall is sequenced by the exit
  // tween above, not by the overlay's fixed close timer.
  if (islandUIState === 'detail') {
    islandUIState = 'near'
    if (activeIslandName) ui.showPopup(ISLANDS[activeIslandName])
  }
}
// Clicking Eric (drawn in the canvas behind the overlay) shouldn't dismiss — only
// truly empty space does. Raycast the click against the character to tell apart.
const _aboutPointer = new THREE.Vector2()
const _aboutRay     = new THREE.Raycaster()
aboutOverlay.shouldCloseFromBackdrop = (e) => {
  if (!modelGroup || !modelGroup.visible) return true
  _aboutPointer.x =  (e.clientX / window.innerWidth)  * 2 - 1
  _aboutPointer.y = -(e.clientY / window.innerHeight) * 2 + 1
  _aboutRay.setFromCamera(_aboutPointer, camSystem.camera)
  return _aboutRay.intersectObject(modelGroup, true).length === 0
}

// Release the presentation freeze: character falls from mid-air back to the
// planet (gravity acts on jumpOffset, still held at presentationJumpOffset).
function releaseFromPresentation() {
  if (!presentationMode) return
  presentationMode = false
  isGrounded   = false
  jumpVelocity = 0
}

// Wire settings callbacks
let reducedMotion = settingsOverlay.reducedMotion
settingsOverlay.onQualityChange = (q) => {
  const dpr = q === 'low' ? 1 : q === 'high' ? Math.min(window.devicePixelRatio, 2) : Math.min(window.devicePixelRatio, 1.5)
  renderer.setPixelRatio(dpr)
  renderer.shadowMap.enabled = q !== 'low'
}
settingsOverlay.onReducedMotionChange = (rm) => {
  reducedMotion = rm
  document.body.classList.toggle('reduced-motion', rm)
}
// Controls-hint visibility is contextual (driven each frame in the render loop):
// shown when the player is idle, hidden while moving or while a panel is open.
const controlsHintEl = document.getElementById('controls-hint')
const HINT_IDLE_SHOW = 5   // seconds idle before the hint fades back in
let   hintsEnabled   = true
let   hintShown      = true
settingsOverlay.onHintsChange = (visible) => {
  hintsEnabled = visible
  if (!controlsHintEl) return
  controlsHintEl.setAttribute('aria-hidden', String(!visible))
  if (!visible) { controlsHintEl.classList.add('faded'); hintShown = false }
}
// Push initial values now that callbacks are wired (restores saved settings)
settingsOverlay.applyRestored()

// ─── HUD corner buttons ───────────────────────────────────────────────────────
const hudBtnsEl = document.createElement('div')
hudBtnsEl.id = 'hud-buttons'
hudBtnsEl.classList.add('hud-hidden') // hidden during the loader; startScene fades it in
hudBtnsEl.innerHTML = `
  <button class="hud-btn" type="button" id="btn-map"      aria-label="Island map (M)" title="Island Map (M)">${svgIcon('map', 18)}</button>
  <button class="hud-btn" type="button" id="btn-help"     aria-label="How to play"    title="How to Play">${svgIcon('help', 18)}</button>
  <button class="hud-btn" type="button" id="btn-settings" aria-label="Options"        title="Options">${svgIcon('settings', 18)}</button>
`
document.body.appendChild(hudBtnsEl)
hudBtnsEl.querySelector('#btn-map').addEventListener('click', () => mapOverlay.toggle())
hudBtnsEl.querySelector('#btn-help').addEventListener('click', () => helpOverlay.toggle())
hudBtnsEl.querySelector('#btn-settings').addEventListener('click', () => settingsOverlay.toggle())

// ─── Modal-open detection: pause game inputs while any overlay is up ─────────
function isAnyOverlayOpen() {
  return mapOverlay.isOpen() || helpOverlay.isOpen()
      || settingsOverlay.isOpen() || aboutOverlay.isOpen()
}
function closeAnyOpenOverlay() {
  if (aboutOverlay.isOpen())    { aboutOverlay.close();    return true }
  if (settingsOverlay.isOpen()) { settingsOverlay.close(); return true }
  if (helpOverlay.isOpen())     { helpOverlay.close();     return true }
  if (mapOverlay.isOpen())      { mapOverlay.close();      return true }
  return false
}

// ─── HUD top-left: island progress + social links ─────────────────────────────
const hudLeftEl = document.createElement('div')
hudLeftEl.id = 'hud-left'
hudLeftEl.classList.add('hud-hidden') // hidden during the loader; startScene fades it in
const HUD_SOCIALS = [
  ['github',    'GitHub',    'https://github.com/erriiiccccccc'],
  ['linkedin',  'LinkedIn',  'https://www.linkedin.com/in/erriiiccccccc/'],
  ['instagram', 'Instagram', 'https://www.instagram.com/ericccc____/'],
  ['mail',      'Email',     'mailto:ericng8766@gmail.com'],
]
hudLeftEl.innerHTML = `
  <div class="hud-progress" aria-live="polite" aria-label="Islands discovered">
    <div class="hp-top">
      <span class="hp-ic">${svgIcon('globe', 14)}</span>
      <span class="hp-count"><b id="ic-count">0</b> <span class="hp-total">/ 6</span></span>
      <span class="hp-label">Islands</span>
    </div>
    <div class="hp-pips" id="hp-pips" aria-hidden="true">${Array.from({ length: 6 }, () => '<span class="hp-pip"></span>').join('')}</div>
  </div>
  <div class="hud-socials">
    ${HUD_SOCIALS.map(([icon, name, href]) =>
      `<a class="hud-social" href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-label="${name}" title="${name}">${svgIcon(icon, 16)}</a>`
    ).join('')}
  </div>
`
document.body.appendChild(hudLeftEl)
const icCountEl = document.getElementById('ic-count')
const hpPips = [...hudLeftEl.querySelectorAll('.hp-pip')]

// ─── Discovery toast ─────────────────────────────────────────────────────────
const discoverToastEl = document.createElement('div')
discoverToastEl.id = 'discover-toast'
discoverToastEl.setAttribute('role', 'status')
discoverToastEl.setAttribute('aria-live', 'polite')
document.body.appendChild(discoverToastEl)

let _allDiscoveredShown = false
function showDiscoverToast(html, durationMs = 4500) {
  discoverToastEl.innerHTML = html
  discoverToastEl.classList.add('show')
  setTimeout(() => discoverToastEl.classList.remove('show'), durationMs)
}

// ─── Teleport flash overlay ───────────────────────────────────────────────────
const teleportFlashEl = document.createElement('div')
teleportFlashEl.id = 'teleport-flash'
document.body.appendChild(teleportFlashEl)

// ─── Mobile touch controls ────────────────────────────────────────────────────
const touchCtrl = IS_TOUCH ? new TouchControls() : null
if (touchCtrl) {
  const tcEl = document.getElementById('touch-controls')
  if (tcEl) tcEl.classList.add('active', 'hud-hidden') // hidden during the loader too
}

const PLANET_RADIUS = 25

// ─── Island spotlight ─────────────────────────────────────────────────────────
const islandSpot = new THREE.SpotLight(0xffffff, 0, PLANET_RADIUS * 3, Math.PI / 6, 0.5, 2)
islandSpot.position.set(0, PLANET_RADIUS * 1.8, 0)
islandSpot.target.position.set(0, PLANET_RADIUS, 0)
scene.add(islandSpot)
scene.add(islandSpot.target)
const _islandSpotColor = new THREE.Color()

// ─── Tracking sun — one position per island, each a different dramatic sun angle ──
// Sun lerps to the active island's position so every visit feels like a unique time of day.
const _SUN_DIRS = [
  new THREE.Vector3( 55,  30, -25),
  new THREE.Vector3( 20,  45,  55),
  new THREE.Vector3(-55,  35,  20),
  new THREE.Vector3(-25,  28, -55),
  new THREE.Vector3( 35,  50,  35),
  new THREE.Vector3(-35,  38, -40),
]
const _sunTargetPos  = new THREE.Vector3()
const _warmGoldColor = new THREE.Color(0xFFD080)
// Character materials with a self-glow (emissive), brightened in the explore view
const _charMats = []
// Scratch vectors for the About presentation sun
const _presFront  = new THREE.Vector3()
const _presSunPos = new THREE.Vector3()
const _ZERO_VEC   = new THREE.Vector3(0, 0, 0)
const _UP_VEC     = new THREE.Vector3(0, 1, 0)
const _camDir     = new THREE.Vector3()
const _camRight   = new THREE.Vector3()
const _sun2Off    = new THREE.Vector3()

// Asset base — Vite-provided so paths work whether the site is served at the
// root (github.io) or under a sub-path (e.g. project pages, local preview).
const ASSET_BASE = (import.meta.env.BASE_URL || './').replace(/\/?$/, '/')

// --- Planet (GLB) ---

const gltfLoader = new GLTFLoader()
gltfLoader.load(ASSET_BASE + 'world.glb', (gltf) => {
  const model = gltf.scene

  // Scale model so its bounding sphere matches PLANET_RADIUS
  const box = new THREE.Box3().setFromObject(model)
  const sphere = new THREE.Sphere()
  box.getBoundingSphere(sphere)
  const scale = PLANET_RADIUS / sphere.radius
  model.scale.setScalar(scale)

  // Re-center after scale
  const box2 = new THREE.Box3().setFromObject(model)
  const center = box2.getCenter(new THREE.Vector3())
  model.position.sub(center)

  const foundNames = import.meta.env.DEV ? [] : null
  let _terrainLayerCount = 0
  model.traverse(obj => {
    if (obj.isMesh) {
      obj.castShadow = true
      obj.receiveShadow = true
      // Tag mesh as walkable (layer 1) or obstacle (layer 2) based on Blender name.
      // Any mesh with "(terrain)" in its name is walkable; everything else is an obstacle.
      if (obj.name && obj.name.toLowerCase().includes('(terrain)')) {
        obj.layers.enable(1)
        _terrainLayerCount++
      } else {
        obj.layers.enable(2)
      }
    }
    if (foundNames && obj.name) foundNames.push(obj.name)
    const nm = obj.name
    if (nm && ISLANDS[nm] && !islandObjects[nm]) {
      islandObjects[nm] = obj
      islandMeshes[nm] = []
      obj.traverse(c => {
        if (c.isMesh) {
          c.material = c.material.clone()
          c.material.emissive = new THREE.Color(0x000000)
          c.material._origColor = c.material.color.clone()
          c.material.color.multiplyScalar(0.35)
          c.material._isFloor = true   // floor mesh — gets emissive glow
          islandMeshes[nm].push(c)
        }
      })
    }
  })
  if (import.meta.env.DEV) {
    console.log('[GLB] all named objects:', foundNames)
    console.log('[GLB] islands matched:', Object.keys(islandObjects))
  }

  // Activate terrain-layer raycasting once at least one "(terrain)" mesh is found
  if (_terrainLayerCount > 0) {
    surfaceRay.layers.set(1)
    terrainLayerActive = true
    if (import.meta.env.DEV) console.log('[terrain] layer system active —', _terrainLayerCount, 'walkable meshes tagged')
  }

  planetGroup.add(model)
  planetModel = model

  // Compute each island's unit direction in planetGroup local space.
  // Use bounding-box centre of the island's meshes — NOT getWorldPosition() on the
  // parent Object3D, whose Blender pivot may sit at the planet centre for every island.
  planetGroup.updateMatrixWorld(true)
  const _islandBox = new THREE.Box3()
  const _islandCtr = new THREE.Vector3()
  for (const nm of ISLAND_NAMES) {
    if (islandMeshes[nm] && islandMeshes[nm].length) {
      _islandBox.makeEmpty()
      for (const mesh of islandMeshes[nm]) _islandBox.expandByObject(mesh)
      _islandBox.getCenter(_islandCtr)          // world-space centre
      planetGroup.worldToLocal(_islandCtr)      // → planetGroup local
      if (_islandCtr.lengthSq() > 0.0001) {
        islandDirs[nm] = _islandCtr.clone().normalize()
      } else if (import.meta.env.DEV) {
        console.warn('[teleport] zero-length dir for', nm, '— island meshes at origin?')
      }
    }
  }
  if (import.meta.env.DEV) console.log('[teleport] islandDirs:', Object.fromEntries(
    Object.entries(islandDirs).map(([k,v]) => [k, [v.x.toFixed(2), v.y.toFixed(2), v.z.toFixed(2)]])
  ))

  // ── Spatial second pass: claim side/cliff meshes that sit inside an island's
  //    footprint but weren't children of the named GLB node (sibling geometry).
  {
    const _bnds = {}
    const _sc   = new THREE.Vector3()
    for (const nm of ISLAND_NAMES) {
      if (!islandMeshes[nm]?.length) continue
      const b = new THREE.Box3()
      for (const m of islandMeshes[nm]) b.expandByObject(m)
      b.expandByScalar(3.0)   // grow to capture side/cliff geometry
      _bnds[nm] = b
    }
    const _claimed = new Set()
    for (const nm of ISLAND_NAMES) (islandMeshes[nm] || []).forEach(m => _claimed.add(m))
    planetModel.traverse(obj => {
      if (!obj.isMesh || _claimed.has(obj)) return
      new THREE.Box3().setFromObject(obj).getCenter(_sc)
      for (const nm of ISLAND_NAMES) {
        if (!_bnds[nm]?.containsPoint(_sc)) continue
        obj.material = obj.material.clone()
        obj.material.emissive = new THREE.Color(0x000000)
        obj.material._origColor = obj.material.color.clone()
        obj.material.color.multiplyScalar(0.35)
        obj.material._isFloor = false  // side/cliff mesh — colour only, no emissive
        islandMeshes[nm].push(obj)
        _claimed.add(obj)
        break
      }
    })
    if (import.meta.env.DEV) console.log('[islands] mesh counts after spatial pass:',
      Object.fromEntries(ISLAND_NAMES.map(nm => [nm, islandMeshes[nm]?.length ?? 0])))
  }

  // Build reverse-lookup: any mesh → its island name.
  // Covers both hierarchy children and spatially-claimed siblings (rocks, props, etc.)
  for (const nm of ISLAND_NAMES) {
    for (const m of (islandMeshes[nm] || [])) meshToIsland.set(m, nm)
  }

  // GLB fully loaded — trigger colour phase then scene
  if (!_loaderTriggered) {
    _loaderTriggered = true

    // ── Screenshot mode (DEV only): visit /?screenshot to capture loading-preview.png
    //    (the social/OG image). Hide the character so only the real planet is framed. ──
    if (import.meta.env.DEV && window.location.search.includes('screenshot')) {
      modelGroup.visible      = false
      character.group.visible = false
      renderer.render(scene, camSystem.camera)
      requestAnimationFrame(() => {
        renderer.render(scene, camSystem.camera)
        const link = document.createElement('a')
        link.download = 'loading-preview.png'
        link.href = renderer.domElement.toDataURL('image/png')
        link.click()
        document.getElementById('ldr-label').textContent = '✓ SAVED — move to public/ then remove ?screenshot'
        document.getElementById('ldr-pct').textContent = 'ok'
        modelGroup.visible      = true
        character.group.visible = true
      })
      return
    }

    // Force the GPU to upload the planet's (large) textures + compile its shaders
    // NOW, on a static loading frame — so the hitch lands here instead of stuttering
    // the planet's slide-in. (The 77 MB world.glb is texture-heavy; this matters.)
    renderer.compile(scene, camSystem.camera)
    triggerArrival(model)
  }
},
(xhr) => {
  // Real download progress (maps 0-100% download → 0-92% on bar; reveal fills 92→100)
  if (xhr.total > 0) {
    setLoaderProgress(Math.min(92, (xhr.loaded / xhr.total) * 92))
  }
},
err => console.error('GLB load error:', err))

// ─── Surface raycaster ───────────────────────────────────────────────────────
let planetModel = null
const surfaceRay  = new THREE.Raycaster()
const obstacleRay = new THREE.Raycaster()
obstacleRay.layers.set(2)   // only intersects obstacle-layer meshes
const _rayOrigin = new THREE.Vector3(0, PLANET_RADIUS * 2, 0)
const _rayDir    = new THREE.Vector3(0, -1, 0)
let terrainLayerActive = false  // true once ≥1 "(terrain)" mesh is found in the GLB

// Walk up from a hit mesh to find its island ancestor
function getIslandAncestor(obj) {
  let cur = obj
  while (cur) {
    if (ISLANDS[cur.name]) return cur.name
    cur = cur.parent
  }
  return null
}

// Raycasts straight down through the character; sets activeIslandName from first hit
function sampleSurfaceHeight() {
  if (!planetModel) return PLANET_RADIUS
  surfaceRay.set(_rayOrigin, _rayDir)
  const hits = surfaceRay.intersectObject(planetModel, true)
  if (hits.length > 0) {
    activeIslandName = meshToIsland.get(hits[0].object) ?? getIslandAncestor(hits[0].object)
    return hits[0].point.y
  }
  activeIslandName = null
  return PLANET_RADIUS
}

// ─── Island state ────────────────────────────────────────────────────────────
const islandObjects = {}  // name → Object3D  (used for future dot-product if needed)
const islandMeshes  = {}  // name → [Mesh, ...]
const meshToIsland  = new Map()  // Mesh → islandName (built after GLB spatial pass)

let islandUIState    = 'exploring'  // 'exploring' | 'near' | 'detail'
let activeIslandName = null         // set by sampleSurfaceHeight (see animate raycast cache)

// --- Starfield ---
const stars = new Starfield()
scene.add(stars.points)

// --- Loader flybys ---
// Procedural space junk (satellite / UFO / stray world / asteroids) drifting past
// while world.glb streams in. Updated in the !sceneStarted branch; cleared the
// moment the real planet arrives.
const loaderFlybys = new LoaderFlybys(camSystem.camera)
scene.add(loaderFlybys.group)

// --- Shooting Stars ---
const shootingStars = new ShootingStars()
scene.add(shootingStars.group)

// --- Sky decor (sun, planets, nebula, flyers, asteroids, comet, aurora) ---
const skyDecor = new SkyDecor()
scene.add(skyDecor.group)

// --- Island Particles ---
const islandParticles = new IslandParticles()
planetGroup.add(islandParticles.group)

// --- Procedural Character (fallback while FBX loads) ---
const character = new Character()
character.group.position.set(0, PLANET_RADIUS + 0.9, 0)
scene.add(character.group)

// --- 3D Model ---
const modelGroup = new THREE.Group()
modelGroup.position.set(0, PLANET_RADIUS + 0.9, 0)
scene.add(modelGroup)
let fbxInScene = false

// ─── Animation controller ────────────────────────────────────────────────────
const animCtrl  = new AnimationController()
let   modelLoaded = false

// ─── Load character model + animations ──────────────────────────────────────
const fbxLoader      = new FBXLoader()
const LOCO_BASE      = ASSET_BASE + 'locomotionNEW/'
const gltfCharLoader = new GLTFLoader()

gltfCharLoader.load(LOCO_BASE + 'ericlowpolyskeleton.glb', gltf => {
  const root = gltf.scene

  // Scale to 2.2 units tall, feet at y=0
  const box = new THREE.Box3().setFromObject(root)
  root.scale.setScalar(2.2 / box.getSize(new THREE.Vector3()).y)
  const box2 = new THREE.Box3().setFromObject(root)
  root.position.y = -box2.min.y

  root.traverse(c => {
    if (!c.isMesh) return
    c.castShadow = true
    const m = c.material
    if (m && m.isMeshStandardMaterial) {
      // The Tripo material is roughness 0.9 (dead matte) — light can't make any
      // highlight, so he reads flat. Bring it down for a soft sheen that lets
      // the key/rim lights give him form and pop.
      m.roughness = 0.62
      // Re-inject his own base texture as a gentle self-glow. This lifts his
      // colours off the dark background and counters the ACES tone-mapping +
      // flat-fill wash, making him brighter and more saturated — without any
      // harsh light that would expose the mesh's surface bumps.
      if (m.map) {
        m.emissiveMap = m.map
        m.emissive.setRGB(1, 1, 1)
        m.emissiveIntensity = 0.16
        _charMats.push(m)   // tracked so the explore view can brighten his glow
      }
      m.needsUpdate = true
    }
  })

  modelGroup.add(root)
  fbxInScene = true
  character.group.visible = false

  // Load walk + run clips (separate Tripo GLBs, same rig) in parallel, then
  // hand all three to the controller. Bone names match, so they bind directly.
  const loadGLB = p => new Promise((res, rej) => gltfCharLoader.load(p, res, undefined, rej))
  const clipOf  = r => (r.status === 'fulfilled' ? (r.value.animations[0] || null) : null)
  Promise.allSettled([
    loadGLB(LOCO_BASE + 'walk.glb'),
    loadGLB(LOCO_BASE + 'run.glb'),
    loadGLB(LOCO_BASE + 'idleagree.glb'),
    loadGLB(LOCO_BASE + 'idlecall.glb'),
    loadGLB(LOCO_BASE + 'idlegreet.glb'),
  ]).then(([w, r, a, c, g]) => {
    const walkClip = clipOf(w)
    const runClip  = clipOf(r)
    if (!walkClip) console.warn('[AnimCtrl] walk.glb had no animation')
    if (!runClip)  console.warn('[AnimCtrl] run.glb had no animation')
    // Random idle variations played while standing still on the globe
    const emotes = [clipOf(a), clipOf(c), clipOf(g)].filter(Boolean)

    // idle is the static bind pose (built by the controller); walk/run animate
    animCtrl.loadGlbClips(root, { idle: null, walk: walkClip, run: runClip, emotes })
    modelLoaded = true

    // Traverse bones for About overlay mouse tracking
    root.traverse(obj => {
      if (!obj.isBone && obj.type !== 'Bone') return
      const lower = obj.name.toLowerCase()
      for (const [k, ps] of Object.entries(_ABOUT_BONE_PATTERNS)) {
        if (!_aboutBones[k] && ps.some(p => lower.includes(p))) {
          _aboutBones[k] = obj
          _aboutBase[k] = { x: obj.rotation.x, y: obj.rotation.y }
        }
      }
    })
  })

}, undefined, err => console.error('ericlowpolyskeleton.glb load error:', err))

// ─── Controls ────────────────────────────────────────────────────────────────
const controls = new Controls()

// ─── Jump key ────────────────────────────────────────────────────────────────
const JUMP_VEL = 5.0
const GRAVITY  = 22
let jumpOffset   = 0
let jumpVelocity = 0
let isGrounded   = true

// ─── About overlay: single-renderer presentation mode ────────────────────────
// When true, render loop skips overwriting modelGroup position/rotation so
// GSAP can animate the character freely inside the main scene.
let presentationMode       = false
let presentationJumpOffset = 0
// True only during the E-press rise: GSAP owns the character's yaw so he turns
// to face the camera WHILE flying up (one fluid motion instead of fly-then-spin).
// The per-frame rotation lock below is suppressed while this is true.
let presentationTurning    = false
let _savedCamDist          = 16
// Drives the About sun/lights independently of presentationMode so they can
// rise with the character on the way up, and fade out the instant the exit
// pan-out begins (before presentationMode is released ~350 ms later).
let aboutLightsOn          = false

// Bone refs for mouse tracking (populated after GLB loads)
const _aboutBones = { head: null, neck: null, spine: null, leftEye: null, rightEye: null }
// Bind-pose rotations of tracked bones (for static-model mode, no anim to reset them)
const _aboutBase = {}
// True: head tracking sets bones ABSOLUTELY (bindBase + offset). The explore
// view always shows the static bind-pose idle, so the head's animated value IS
// the bind pose — absolute is correct and never accumulates. (Additive '+=' here
// compounds every frame, because the mixer writes .quaternion but not .rotation,
// and twists the upper body into spaghetti.)
const STATIC_MODEL = true
// Head-tracking axis signs for the Tripo rig. mouse-left turns head left,
// mouse-down looks down.
const TRACK_YAW_SIGN   = 1
const TRACK_PITCH_SIGN = 1
const _aboutOffsets = {
  head:     { x: 0, y: 0 },
  neck:     { x: 0, y: 0 },
  spine:    { x: 0, y: 0 },
  leftEye:  { x: 0, y: 0 },
  rightEye: { x: 0, y: 0 },
}
let _aboutMX = 0, _aboutMY = 0
document.addEventListener('mousemove', e => {
  _aboutMX =  (e.clientX / window.innerWidth)  * 2 - 1
  _aboutMY = -(e.clientY / window.innerHeight) * 2 + 1
})

const _ABOUT_BONE_PATTERNS = {
  head:     ['head'],
  neck:     ['neck'],
  spine:    ['spine1', 'spine2', 'spine'],
  leftEye:  ['lefteye', 'eye.l', 'eye_l', 'eyel', 'left_eye'],
  rightEye: ['righteye', 'eye.r', 'eye_r', 'eyer', 'right_eye'],
}
const _ABOUT_TRACK_CFG = {
  head:  { yaw: 0.35, pitch: 0.22, lerp: 0.08, yc: 0.45, pc: 0.30 },
  neck:  { yaw: 0.18, pitch: 0.10, lerp: 0.06, yc: 0.25, pc: 0.18 },
  spine: { yaw: 0.06, pitch: 0.03, lerp: 0.04, yc: 0.12, pc: 0.08 },
  eyes:  { yaw: 0.55, pitch: 0.35, lerp: 0.14, yc: 0.35, pc: 0.25 },
}

function _applyAboutTracking() {
  const { clamp, lerp } = THREE.MathUtils
  const mx = _aboutMX, my = _aboutMY
  const parts = [
    { key: 'head',  bone: _aboutBones.head,  cfg: _ABOUT_TRACK_CFG.head  },
    { key: 'neck',  bone: _aboutBones.neck,  cfg: _ABOUT_TRACK_CFG.neck  },
    { key: 'spine', bone: _aboutBones.spine, cfg: _ABOUT_TRACK_CFG.spine },
  ]
  for (const { key, bone, cfg } of parts) {
    if (!bone) continue
    const off = _aboutOffsets[key]
    // Per-rig axis signs (tuned for the Tripo rig), applied in both static and
    // animated modes — only the apply step (absolute vs additive) differs.
    const yawSign   = TRACK_YAW_SIGN
    const pitchSign = TRACK_PITCH_SIGN
    off.y = lerp(off.y, clamp(yawSign   * mx * cfg.yaw,   -cfg.yc, cfg.yc), cfg.lerp)
    off.x = lerp(off.x, clamp(pitchSign * my * cfg.pitch, -cfg.pc, cfg.pc), cfg.lerp)
    if (STATIC_MODEL) {
      const base = _aboutBase[key] || { x: 0, y: 0 }
      bone.rotation.y = base.y + off.y
      bone.rotation.x = base.x + off.x
    } else {
      bone.rotation.y += off.y
      bone.rotation.x += off.x
    }
  }
  const ec = _ABOUT_TRACK_CFG.eyes
  for (const key of ['leftEye', 'rightEye']) {
    const bone = _aboutBones[key]
    if (!bone) continue
    const off = _aboutOffsets[key]
    off.y = lerp(off.y, clamp( mx * ec.yaw,   -ec.yc, ec.yc), ec.lerp)
    off.x = lerp(off.x, clamp(-my * ec.pitch, -ec.pc, ec.pc), ec.lerp)
    bone.rotation.y += off.y
    bone.rotation.x += off.x
  }
}

let spaceHeld = false
document.addEventListener('keydown', e => {
  if (e.key !== ' ' && e.key !== 'Spacebar') return
  // Don't fight text inputs / overlays
  const t = e.target
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  if (isAnyOverlayOpen() || ui.isPanelOpen()) return
  e.preventDefault()
  spaceHeld = true
  tryJump()
})
document.addEventListener('keyup', e => {
  if (e.key === ' ' || e.key === 'Spacebar') spaceHeld = false
})

function tryJump() {
  if (!isGrounded || !modelLoaded) return

  // triggerJump picks the right variant (idle/walk/run jump) automatically
  if (!animCtrl.triggerJump()) return

  jumpVelocity = JUMP_VEL
  isGrounded   = false
}

// ─── Shared "open island panel" logic ────────────────────────────────────────
function openIslandPanel() {
  if (islandUIState !== 'near' || !activeIslandName) return
  islandUIState = 'detail'
  ui.hidePopup()

  if (activeIslandName === 'meadow_island') {
    // 1. Character jumps up from the planet — the same one the player sees
    if (modelLoaded) {
      animCtrl.triggerJump()
      jumpVelocity = JUMP_VEL * 2.5
      isGrounded   = false

      // Turn to face the camera WHILE rising, so the lift and the flip read as
      // ONE motion instead of "fly up, then spin". presentationTurning hands
      // yaw ownership to GSAP for the duration of the rise — the per-frame
      // rotation lock is suppressed while it's true. power2.out front-loads the
      // turn so he's essentially facing camera by the time he reaches the top,
      // then a gentle settle. (camera sits at yaw _yaw behind char → -_yaw faces it)
      if (fbxInScene) {
        presentationTurning = true
        gsap.killTweensOf(modelGroup.rotation)
        gsap.to(modelGroup.rotation, { y: -camSystem._yaw, duration: 0.5, ease: 'power2.out' })
      }
    }

    // 2. Camera starts zooming in immediately (same frame as the jump)
    _savedCamDist = camSystem._distTarget
    camSystem._distTarget = 2.5  // closer = character bigger on screen

    // 3. ~360 ms later (near apex of the jump): freeze character floating in
    //    mid-air. The turn (started on E press) is already settling, so we just
    //    hand the freeze to presentationMode and open the CSS overlay.
    setTimeout(() => {
      presentationMode       = true
      presentationJumpOffset = jumpOffset
      isGrounded             = true   // triggers idle-breathing crossfade
      presentationTurning    = false  // presentationMode now owns the transform

      // Clear tracking offsets so there's no jump on first frame
      for (const v of Object.values(_aboutOffsets)) { v.x = 0; v.y = 0 }

      aboutOverlay.open()
      // Lights come on only now — after he's up at the top, not on E press
      aboutLightsOn = true
    }, 360)

    return
  }

  ui.openPanel(ISLANDS[activeIslandName])
}

function closeIslandPanel() {
  if (islandUIState !== 'detail') return
  islandUIState = 'near'
  ui.closePanel()
  if (activeIslandName) ui.showPopup(ISLANDS[activeIslandName])
}

// Popup tap / click callback (works for both mouse and touch)
ui.onPopupTap = openIslandPanel
// ✕ / backdrop click inside the world panel → run the canonical close so
// islandUIState resyncs and the approach prompt returns.
ui.onClosePanel = closeIslandPanel

// ─── Island interaction keys + global ESC + M for map ────────────────────────
document.addEventListener('keydown', e => {
  const t = e.target
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  const key = e.key.toLowerCase()

  // ESC always closes the topmost layer (overlays first, then detail panel)
  if (e.key === 'Escape') {
    if (closeAnyOpenOverlay()) { e.preventDefault(); return }
    if (islandUIState === 'detail') { closeIslandPanel(); e.preventDefault(); return }
  }

  if (isAnyOverlayOpen()) return  // suppress gameplay keys while a modal is up

  if (key === 'e') {
    if (islandUIState === 'detail') closeIslandPanel()
    else openIslandPanel()
  }
  // While a detail panel is open, only Esc / E / X act — ignore the map key
  if (key === 'm' && !ui.isPanelOpen()) mapOverlay.toggle()
})

// ─── Resize ──────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camSystem.resize(window.innerWidth / window.innerHeight)
})

// ─── Modal-open watcher: suspends camera / keyboard input while overlays up ──
// True whenever a modal overlay OR the island detail panel is open — i.e. the
// player is "viewing" something and all world movement must freeze.
function isInputLocked() {
  return isAnyOverlayOpen() || ui.isPanelOpen()
}

let _wasInputLocked = false
function syncOverlayInputGate() {
  const locked = isInputLocked()
  if (locked === _wasInputLocked) return
  _wasInputLocked = locked
  controls.setEnabled(!locked)       // WASD / sprint
  camSystem.setInputEnabled(!locked) // scroll zoom + RMB look + touch camera drag
  if (locked) spaceHeld = false
}

// ─── Loader ──────────────────────────────────────────────────────────────────
const loaderEl   = document.getElementById('loader')
const ldrPct     = document.getElementById('ldr-pct')
const ldrBarFill = document.getElementById('ldr-bar-fill')
const ldrLabel   = document.getElementById('ldr-label')
const canvasEl   = document.getElementById('canvas')
let   _loaderElapsed   = 0
let   _loaderTriggered = false

// Cycle flavour text under the progress bar (restyled in CSS — sentence case now)
const LDR_MSGS = [
  'Warping spacetime', 'Sculpting islands', 'Placing stars',
  'Calibrating orbit', 'Summoning Eric', 'Painting atmosphere',
]
let _msgIdx = 0
const _ldrMsgInterval = setInterval(() => {
  _msgIdx = (_msgIdx + 1) % LDR_MSGS.length
  if (ldrLabel) {
    ldrLabel.style.opacity = '0'
    setTimeout(() => {
      if (ldrLabel) { ldrLabel.textContent = LDR_MSGS[_msgIdx]; ldrLabel.style.opacity = '1' }
    }, 200)
  }
}, 1600)

let ldrProgress = 0
let sceneStarted = false
let scenePlayTime = 0 // seconds after gameplay starts; failsafe for character reveal

let wasCharReveal = false
/** Teleport-in intro: -1 idle, else seconds elapsed while playing */
let teleportInAge = -1
const TELEPORT_IN_SEC = 0.82

function easeOutBack(t) {
  const c1 = 1.60158
  const c3 = c1 + 1
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
}

function setLoaderProgress(p) {
  ldrProgress = Math.min(p, 100)
  if (ldrPct)     ldrPct.textContent     = Math.floor(ldrProgress) + '%'
  if (ldrBarFill) ldrBarFill.style.width = ldrProgress + '%'
}

/*
  Loader / intro timing reference (tune here + overlay.css #loader transition)
  ─────────────────────────────────────────────────────────────────────────────
  Until GLB loads:     variable (network); bar uses xhr (→92%) or timed fallback.
  Live scene:          deep-space + stars + procedural flybys (LoaderFlybys) render
                       every frame in the !sceneStarted branch of animate().
  Arrival (GLB done):  flybys cleared; the REAL planet eases in from off-screen
                       right to centre (expo.out + slight spin), bar 92→100.
  Before zoom (gap):   LDR_GAP_BEFORE_PLAY_MS — then sceneStarted + loader fade-out.
  Loader fade:         1400ms opacity (overlay.css); display:none 1400ms after fade starts.
  Zoom to orbit:       no fixed duration — exponential lerp in Camera.update (~exp(-12*dt)).
  Character visible:   when camera within ~4.5u of target OR scenePlayTime > CHAR_REVEAL_FAILSAFE_SEC.
  Teleport-in:         TELEPORT_IN_SEC after character reveal.
*/
const LDR_ARRIVE_SPEED         = 55   // units/sec — matches the flushed-out flybys' exit speed; constant glide in
const LDR_GAP_BEFORE_PLAY_MS    = 160  // pause after arrival before zoom + fade
const CHAR_REVEAL_FAILSAFE_SEC  = 2.2

// Called when world.glb finishes. The planet IS the real model (so it always
// matches), and it eases in from just off the RIGHT edge of the screen to centre
// with a soft decelerating glide + a touch of spin — so the world arrives rather
// than just popping into being. Bar fills 92→100 over the same beat.
function triggerArrival(model) {
  // Any flybys still on screen peel off to the left first (natural exit), and the
  // planet follows them in — rather than them blinking out as the world appears.
  const hadFlybys = loaderFlybys.flushOut()
  const baseX = model.position.x // natural centred position

  // Reduced motion: no slide/spin — just place it and go.
  if (reducedMotion) {
    loaderFlybys.clear()
    model.position.x = baseX
    model.rotation.y = 0
    setLoaderProgress(100)
    startScene()
    return
  }

  // Start just off the right edge of the frustum at the planet's depth (z≈0).
  const halfH = Math.tan(THREE.MathUtils.degToRad(camSystem.camera.fov) / 2) * camSystem.camera.position.z
  const halfW = halfH * (window.innerWidth / window.innerHeight)
  const startX = baseX + halfW + 30       // planet radius (~25) + small margin clears the edge
  model.position.x = startX
  model.rotation.y = -0.45

  // Move at a CONSTANT speed (like a flyby) for most of the way, then a short
  // settle so it parks smoothly instead of dead-stopping. The settle starts at
  // exactly the glide speed (no jerk): power2.out's initial velocity = 2·d/t.
  const dist       = startX - baseX
  const settleDist = dist * 0.18
  const dLinear    = (dist - settleDist) / LDR_ARRIVE_SPEED
  const dSettle    = (2 * settleDist)    / LDR_ARRIVE_SPEED

  const prog = { p: ldrProgress }
  // Small lead so the flybys get clear of frame before the world sweeps in.
  const tl = gsap.timeline({ delay: hadFlybys ? 0.25 : 0, onComplete: startScene })
  tl.to(model.position, { x: baseX + settleDist, duration: dLinear, ease: 'none' }, 0)
    .to(model.position, { x: baseX,              duration: dSettle, ease: 'power2.out' })
  tl.to(model.rotation, { y: 0, duration: dLinear + dSettle, ease: 'sine.out' }, 0)
  tl.to(prog, {
    p: 100, duration: Math.min(0.9, dLinear), ease: 'none',
    onUpdate: () => setLoaderProgress(prog.p),
  }, 0)
}

function startScene() {
  setLoaderProgress(100)
  loaderFlybys.clear()   // safety net: bin any straggler before the scene takes over

  // Zoom + loader fade start together after a short beat
  setTimeout(() => {
    sceneStarted = true
    if (loaderEl) loaderEl.classList.add('fade-out')

    // HUD fades in with the world — staggered (left card → corner buttons →
    // key hints → mobile joystick) so it feels like the UI "boots up".
    const hudRevealEls = [hudLeftEl, hudBtnsEl, controlsHintEl, document.getElementById('touch-controls')]
    hudRevealEls.forEach((el, i) => {
      if (el) setTimeout(() => el.classList.remove('hud-hidden'), 500 + i * 150)
    })
    setTimeout(() => {
      if (loaderEl) loaderEl.style.display = 'none'
      // Loader gone — stop the flavour-text interval so we don't churn the DOM forever
      clearInterval(_ldrMsgInterval)
    }, 1400)

    // Greet on every visit: first-timers get "Welcome to Eric's World!", returning
    // visitors get a warmer "Welcome back" refresher (flagged via 'phf-intro-seen').
    // Opens on a timer (no input needed) — kept short so it lands as the world settles.
    const _introReturning = !!localStorage.getItem('phf-intro-seen')
    setTimeout(() => introOverlay.open(_introReturning), 900)
  }, LDR_GAP_BEFORE_PLAY_MS)
}

// ─── Render loop ─────────────────────────────────────────────────────────────
const clock   = new THREE.Clock()
let   time    = 0
let   idleTimer = 0
const WALK_SPEED = 0.7
const TURN_SPEED = 2.4
const SPRINT_MULT = 1.8
const DAMP = 5.0
let heading  = 0
let walkVel  = 0
const _walkAxis = new THREE.Vector3()
const _walkQ    = new THREE.Quaternion()
const _autoQ    = new THREE.Quaternion()
const _savedQ   = new THREE.Quaternion()

// Obstacle collision — max height the character can step over without jumping
const MAX_STEP        = 1.5
const CLIMB_SPEED     = 5.0   // units/sec when stepping up
const STEP_DOWN_SPEED = 9.0   // units/sec when stepping down
let lastSurfY  = PLANET_RADIUS
let smoothSurfY = PLANET_RADIUS

/** 0 = none, 1 = procedural mesh, 2 = FBX skinned (avoids shader-compile hitch on reveal) */
let _charGpuPrewarmStage = 0

function prewarmCharacterDraw(useFbx) {
  const svM = modelGroup.visible
  const svC = character.group.visible
  camSystem.camera.updateMatrixWorld(true)
  planetGroup.updateMatrixWorld(true)
  character.group.updateMatrixWorld(true)
  modelGroup.updateMatrixWorld(true)
  if (useFbx && fbxInScene && modelGroup.children.length > 0) {
    renderer.compile(modelGroup, camSystem.camera, scene)
    modelGroup.visible = true
    character.group.visible = false
  } else {
    renderer.compile(character.group, camSystem.camera, scene)
    modelGroup.visible = false
    character.group.visible = true
  }
  renderer.render(scene, camSystem.camera)
  renderer.render(scene, camSystem.camera)
  modelGroup.visible = svM
  character.group.visible = svC
}

function animate() {
  requestAnimationFrame(animate)
  const dt = Math.min(clock.getDelta(), 0.05)
  time += dt

  // Pause input the moment any overlay opens/closes
  syncOverlayInputGate()

  if (!sceneStarted) {
    // Fallback: slow timed progress so the bar always moves even if
    // the server doesn't send Content-Length (no xhr.total).
    // Real progress from the GLB xhr callback overrides this whenever available.
    _loaderElapsed += dt
    const fallback = Math.min(92, _loaderElapsed * 22)
    if (ldrProgress < fallback) setLoaderProgress(fallback)
    // Wide planet shot — hide character so he never reads as floating in frame
    if (!(import.meta.env.DEV && window.location.search.includes('screenshot'))) {
      character.group.visible = false
      modelGroup.visible = false
    }
    // Drift procedural flybys across the screen while we wait on world.glb
    loaderFlybys.update(dt, reducedMotion)
    renderer.render(scene, camSystem.camera)
    return
  }

  scenePlayTime += dt

  // While viewing a panel/overlay, freeze every world input (keys are already
  // cleared by the gate; this also silences touch movement + idle auto-rotate).
  const uiLocked = isInputLocked()

  const keys   = controls.keys
  const sprint = keys.has('shift')
  const speed  = WALK_SPEED * (sprint ? SPRINT_MULT : 1.0)

  // ── Touch joystick input ── (zeroed while a panel is open)
  const tJX = uiLocked ? 0 : (touchCtrl?.joyX ?? 0)   // -1 … 1 (left / right)
  const tJY = uiLocked ? 0 : (touchCtrl?.joyY ?? 0)   // -1 … 1 (up/forward = negative screen-Y)

  // Touch map button (drain the flag, but ignore while locked)
  if (touchCtrl?.takeMap() && !uiLocked) mapOverlay.toggle()

  // Touch camera orbit
  if (touchCtrl && !uiLocked) {
    const { dx, dy } = touchCtrl.popCamDelta()
    if (dx || dy) camSystem.applyTouchDelta(dx, dy)
  }

  // Touch interact button — still allowed to CLOSE an open island panel, but
  // never while a different modal overlay is up.
  if (touchCtrl?.takeInteract() && !isAnyOverlayOpen()) {
    if (islandUIState === 'detail') closeIslandPanel()
    else openIslandPanel()
  }

  // Touch jump (ignored while locked)
  if (touchCtrl?.takeJump() && !uiLocked) tryJump()

  // ── Movement intent (keyboard + joystick) — always computed ──
  const tFwd = tJY < -0.15
  const tBwd = tJY >  0.15
  const tLft = tJX < -0.15
  const tRgt = tJX >  0.15
  // Movement is allowed in the air — keeps forward momentum through the jump
  const fwd    = keys.has('w') || keys.has('arrowup')    || tFwd
  const bwd    = keys.has('s') || keys.has('arrowdown')  || tBwd
  const lft    = keys.has('a') || keys.has('arrowleft')  || tLft
  const rgt    = keys.has('d') || keys.has('arrowright') || tRgt
  const moving = fwd || bwd || lft || rgt

  if (moving || uiLocked) idleTimer = 0; else idleTimer += dt

  // Contextual controls hint — hide while moving / in a panel, fade back when idle
  if (controlsHintEl && hintsEnabled) {
    if (moving || uiLocked) {
      if (hintShown) { hintShown = false; controlsHintEl.classList.add('faded') }
    } else if (idleTimer > HINT_IDLE_SHOW && !hintShown) {
      hintShown = true; controlsHintEl.classList.remove('faded')
    }
  }

  let needSurfaceRay = true
  let surfY

  if (isTeleporting) {
    // ── Teleport slerp — overrides planet movement ──
    teleportProgress = Math.min(1, teleportProgress + dt / TELEPORT_DURATION)
    planetGroup.quaternion.slerpQuaternions(_teleStartQ, _teleTargetQ, easeInOutCubic(teleportProgress))
    if (teleportProgress >= 1) isTeleporting = false
    walkVel *= Math.exp(-DAMP * dt)   // bleed velocity so we don't lurch on landing
  } else {
    // ── Normal planet rotation from movement ──
    if (lft) heading -= TURN_SPEED * dt * (tLft ? Math.min(1, Math.abs(tJX) * 1.35) : 1)
    if (rgt) heading += TURN_SPEED * dt * (tRgt ? Math.min(1, Math.abs(tJX) * 1.35) : 1)

    const walkTarget = fwd ? speed : bwd ? -speed : 0
    walkVel += (walkTarget - walkVel) * (1 - Math.exp(-DAMP * dt))

    if (Math.abs(walkVel) > 0.001) {
      _savedQ.copy(planetGroup.quaternion)
      _walkAxis.set(Math.cos(heading), 0, Math.sin(heading))
      _walkQ.setFromAxisAngle(_walkAxis, walkVel * dt)
      planetGroup.quaternion.premultiply(_walkQ)

      if (isGrounded) {
        surfY = sampleSurfaceHeight()
        needSurfaceRay = false
        if (surfY - smoothSurfY > MAX_STEP) {
          planetGroup.quaternion.copy(_savedQ)
          needSurfaceRay = true
        }
        // Obstacle layer check: block if a non-terrain mesh sits above the walkable floor
        if (terrainLayerActive && !needSurfaceRay) {
          obstacleRay.set(_rayOrigin, _rayDir)
          const obstHits = obstacleRay.intersectObject(planetModel, true)
          if (obstHits.length > 0 && obstHits[0].point.y > surfY + 0.25) {
            planetGroup.quaternion.copy(_savedQ)
            needSurfaceRay = true
          }
        }
      }
    }

    if (idleTimer > 5 && !reducedMotion && !presentationMode && !uiLocked) {
      _autoQ.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.003)
      planetGroup.quaternion.premultiply(_autoQ)
      needSurfaceRay = true
    }
  }

  // Jump physics (skip when presentation mode holds the character in place)
  if (!isGrounded && !presentationMode) {
    jumpVelocity -= GRAVITY * dt
    jumpOffset   += jumpVelocity * dt
    if (jumpOffset <= 0) {
      jumpOffset = 0; jumpVelocity = 0; isGrounded = true
      // If space is still held, queue another jump on next frame
      if (spaceHeld) tryJump()
    }
  } else if (presentationMode) {
    jumpOffset = presentationJumpOffset  // hold frozen height
  }

  if (needSurfaceRay) surfY = sampleSurfaceHeight()
  lastSurfY = surfY

  // Smooth surface following — prevents snap on step-on/step-off
  if (!isGrounded || isTeleporting) {
    smoothSurfY = surfY        // airborne or teleporting: snap for accurate landing
  } else if (surfY > smoothSurfY) {
    smoothSurfY = Math.min(surfY, smoothSurfY + CLIMB_SPEED * dt)
  } else {
    smoothSurfY = Math.max(surfY, smoothSurfY - STEP_DOWN_SPEED * dt)
  }

  const charWorldY = smoothSurfY + jumpOffset

  const charRotY = Math.PI - heading
  // World transform (y / rot / scale) applied after camera + teleport-in, below

  // ── Animation update ──
  if (modelLoaded) {
    // No random idle emotes while exploring — the inspected character stays calm
    animCtrl.emotesEnabled = !presentationMode && !aboutOverlay.isOpen()
    // AnimationController owns all state decisions — just feed it inputs
    animCtrl.update(dt, moving, sprint, !isGrounded)
    // Mouse tracking for About overlay: applied AFTER mixer so offsets sit on
    // top of the animation pose rather than fighting it
    if (aboutOverlay.isOpen() && !IS_TOUCH) _applyAboutTracking()
  } else {
    // Procedural fallback while GLB/FBX loads
    character.update(dt, moving, time, !isGrounded)
  }

  // ── Island HUD state (activeIslandName from sampleSurfaceHeight) ──
  if (islandUIState !== 'detail') {
    if (activeIslandName) {
      if (islandUIState !== 'near' || ui._lastIsland !== activeIslandName) {
        islandUIState    = 'near'
        ui._lastIsland   = activeIslandName
        ui.showPopup(ISLANDS[activeIslandName])
      }
      // Track visited islands
      if (!visitedIslands.has(activeIslandName)) {
        visitedIslands.add(activeIslandName)
        mapOverlay.markVisited(activeIslandName)
        if (icCountEl) icCountEl.textContent = String(visitedIslands.size)
        hpPips.forEach((p, i) => p.classList.toggle('hp-pip--on', i < visitedIslands.size))
        if (visitedIslands.size === ISLAND_NAMES.length && !_allDiscoveredShown) {
          _allDiscoveredShown = true
          showDiscoverToast(`<span class="dt-row">${svgIcon('trophy', 16)}<span><strong>All 6 islands found!</strong> You've seen everything.</span></span>`, 5000)
        }
      }
    } else if (islandUIState === 'near') {
      islandUIState  = 'exploring'
      ui._lastIsland = null
      ui.hidePopup()
    }
  } else {
    // Auto-close detail panel if player walks off
    if (!activeIslandName || activeIslandName !== ui._lastIsland) {
      islandUIState  = 'exploring'
      ui._lastIsland = null
      ui.closePanel()
      ui.hidePopup()
    }
  }

  // ── Island highlight: dim when inactive, full colour + glow when active ──
  const LERP_K = 3.5
  const lerpF  = 1 - Math.exp(-LERP_K * dt)
  for (let i = 0; i < ISLAND_NAMES.length; i++) {
    const name   = ISLAND_NAMES[i]
    const meshes = islandMeshes[name]
    if (!meshes || !meshes.length) continue
    const isActive       = name === activeIslandName
    const targetEmissive = (isActive && !ISLANDS[name].noGlow) ? 0.45 : 0
    const targetBright   = isActive ? 1.0 : 0.50
    for (let j = 0; j < meshes.length; j++) {
      const m  = meshes[j]
      const oc = m.material._origColor
      // Base colour: dim ↔ original
      if (oc) {
        m.material.color.r += (oc.r * targetBright - m.material.color.r) * lerpF
        m.material.color.g += (oc.g * targetBright - m.material.color.g) * lerpF
        m.material.color.b += (oc.b * targetBright - m.material.color.b) * lerpF
      }
      // Emissive glow only on floor meshes
      if (m.material._isFloor) {
        m.material.emissiveIntensity += (targetEmissive - m.material.emissiveIntensity) * lerpF
        if (isActive) {
          m.material.emissive.setHex(ISLAND_COLOR_HEX[name])
        } else if (m.material.emissiveIntensity < 0.002) {
          m.material.emissive.set(0, 0, 0)
        }
      }
    }
  }

  // ── Island spotlight ──
  const spotTarget = activeIslandName ? 6.0 : 0
  islandSpot.intensity += (spotTarget - islandSpot.intensity) * lerpF
  if (activeIslandName) {
    _islandSpotColor.setHex(ISLAND_COLOR_HEX[activeIslandName])
    islandSpot.color.lerp(_islandSpotColor, lerpF)
  }

  // ── Tracking sun ──
  // Intensity: soft glow everywhere, brightens to full golden-hour on island arrival
  const sunTargetInt = activeIslandName ? 5.0 : 4.0
  lighting.sunLight.intensity += (sunTargetInt - lighting.sunLight.intensity) * lerpF
  const sunLerpF = 1 - Math.exp(-1.2 * dt)
  if (activeIslandName) {
    const idx = ISLAND_NAMES.indexOf(activeIslandName)
    if (idx >= 0) {
      _sunTargetPos.copy(_SUN_DIRS[idx])
      lighting.sunLight.position.lerp(_sunTargetPos, sunLerpF)
    }
    // Color: mostly warm gold, with a subtle hint of the island's accent color
    _islandSpotColor.setHex(ISLAND_COLOR_HEX[activeIslandName])
    _warmGoldColor.set(0xFFD080).lerp(_islandSpotColor, 0.18)
    lighting.sunLight.color.lerp(_warmGoldColor, lerpF)
  } else {
    // No island: sun tracks ahead of the character's heading — orbits as you turn
    const headingLerpF = 1 - Math.exp(-2.5 * dt)
    _sunTargetPos.set(Math.sin(heading) * 55, 50, -Math.cos(heading) * 55)
    lighting.sunLight.position.lerp(_sunTargetPos, headingLerpF)
    lighting.sunLight.color.lerp(_warmGoldColor.set(0xFFE8C0), lerpF)
  }

  // ── About presentation: reuse the dominant scene sun (no extra lights) ──
  // The explore view mostly lights him from WITHIN — his own texture as a strong
  // self-glow (emissive) — so he reads bright and colourful with no creepy
  // directional shadows. The two suns are kept gentle, just for a hint of form.
  {
    const onLights = aboutLightsOn
    const emiTarget = onLights ? 1.15 : 0.16   // self-glow: his OWN colour carries the brightness
    for (let i = 0; i < _charMats.length; i++) {
      const m = _charMats[i]
      m.emissiveIntensity += (emiTarget - m.emissiveIntensity) * lerpF
    }
    // Raise the camera framing so his head isn't cut off (taller-than-default model)
    camSystem._pivotYExtra += ((onLights ? 0.7 : 0) - camSystem._pivotYExtra) * lerpF
  }

  if (aboutLightsOn) {
    // "Front" = horizontal direction from character toward the camera
    _presFront.copy(camSystem.camera.position).sub(modelGroup.position)
    _presFront.y = 0
    if (_presFront.lengthSq() < 1e-4) _presFront.set(0, 0, 1)
    _presFront.normalize()
    // Camera's horizontal right axis — used to split the two suns left/right
    camSystem.camera.getWorldDirection(_camDir)
    _camRight.crossVectors(_camDir, _UP_VEC).normalize()

    // Aim point: his chest. Both suns point here.
    _presSunPos.set(modelGroup.position.x, modelGroup.position.y + 1.4, modelGroup.position.z)

    const FWD = 8, UP = 8, SIDE = 5.5   // front-top angle + how far the pair straddle
    const SUN_PWR = 0.7                 // minimal — just a hint of form; the self-glow does the work

    // Main sun: front-top, offset to one side
    _sunTargetPos.copy(_presSunPos)
      .addScaledVector(_presFront, FWD)
      .addScaledVector(_camRight, -SIDE)
    _sunTargetPos.y = modelGroup.position.y + UP
    lighting.sunLight.position.lerp(_sunTargetPos, sunLerpF)
    lighting.sunLight.target.position.lerp(_presSunPos, sunLerpF)
    lighting.sunLight.target.updateMatrixWorld()
    lighting.sunLight.intensity += (SUN_PWR - lighting.sunLight.intensity) * lerpF

    // Second sun: exact same light, mirrored to the opposite side — even fill,
    // no dark side.
    const sun2 = lighting.presentationSun2
    _sun2Off.copy(_presSunPos)
      .addScaledVector(_presFront, FWD)
      .addScaledVector(_camRight, SIDE)
    _sun2Off.y = modelGroup.position.y + UP
    sun2.position.lerp(_sun2Off, sunLerpF)
    sun2.target.position.copy(_presSunPos)
    sun2.target.updateMatrixWorld()
    sun2.color.copy(lighting.sunLight.color)   // exact same sun
    sun2.intensity += (SUN_PWR - sun2.intensity) * lerpF
  } else {
    // Return the sun's aim to the world origin for normal planet lighting
    lighting.sunLight.target.position.lerp(_ZERO_VEC, sunLerpF)
    lighting.sunLight.target.updateMatrixWorld()
    // Fade the second sun out
    lighting.presentationSun2.intensity += (0 - lighting.presentationSun2.intensity) * lerpF
  }

  stars.update(time, 0)
  if (!reducedMotion) shootingStars.update(dt)
  skyDecor.update(dt, time, reducedMotion)
  islandParticles.update(dt, activeIslandName, charWorldY, reducedMotion, islandDirs)
  camSystem.update(dt, PLANET_RADIUS, charWorldY, -1, null, planetGroup, heading, moving)

  const charReveal =
    camSystem.characterRevealReady || scenePlayTime > CHAR_REVEAL_FAILSAFE_SEC

  let teleportScale = 1
  let teleportLift = 0
  let teleportTwist = 0

  if (charReveal && !wasCharReveal) teleportInAge = 0
  wasCharReveal = charReveal

  if (!charReveal) {
    teleportInAge = -1
    character.group.scale.setScalar(1)
    modelGroup.scale.setScalar(1)
    character.group.visible = false
    modelGroup.visible = false
  } else {
    const fbxLoaded = fbxInScene
    character.group.visible = !fbxLoaded
    modelGroup.visible = true

    if (teleportInAge >= 0) {
      teleportInAge += dt
      const t = Math.min(1, teleportInAge / TELEPORT_IN_SEC)
      const e = easeOutBack(t)
      teleportScale = Math.max(0.04, e)
      teleportLift = (1 - t) * (1 - t) * 2.4
      teleportTwist = Math.sin(t * Math.PI * 3.25) * (1 - t) * 1.05
      if (t >= 1) {
        teleportInAge = -1
        teleportScale = 1
        teleportLift = 0
        teleportTwist = 0
      }
    }
  }

  if (!presentationMode) {
    modelGroup.position.set(0, charWorldY + teleportLift, 0)
    modelGroup.scale.setScalar(teleportScale)
    character.group.position.set(0, charWorldY + teleportLift, 0)
    character.group.scale.setScalar(teleportScale)
    // During the E-press rise GSAP owns the yaw (turn-to-face-camera), so don't
    // fight it. Position/scale still update so he flies up normally.
    if (!presentationTurning) {
      modelGroup.rotation.y      = charRotY + teleportTwist
      character.group.rotation.y = charRotY + teleportTwist
    }
  }

  if (planetModel) {
    if (fbxInScene && _charGpuPrewarmStage < 2) {
      prewarmCharacterDraw(true)
      _charGpuPrewarmStage = 2
    } else if (!fbxInScene && _charGpuPrewarmStage < 1) {
      prewarmCharacterDraw(false)
      _charGpuPrewarmStage = 1
    }
  }

  renderer.render(scene, camSystem.camera)
}
animate()

import * as THREE from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Starfield } from './scene/Starfield.js'
import { Lighting } from './scene/Lighting.js'
import { Character } from './character/Character.js'
import { Controls } from './character/Controls.js'
import { TouchControls } from './character/TouchControls.js'
import { AnimationController } from './character/AnimationController.js'
import { Camera } from './scene/Camera.js'
import { ShootingStars } from './scene/ShootingStars.js'
import { ISLANDS } from './data/content.js'
import { UI } from './ui/UI.js'
import { MapOverlay } from './ui/MapOverlay.js'
import { HelpOverlay } from './ui/HelpOverlay.js'
import { IntroOverlay } from './ui/IntroOverlay.js'
import { SettingsOverlay } from './ui/SettingsOverlay.js'
import { initTravelStats } from './travel/TravelStats.js'

const ISLAND_NAMES = Object.keys(ISLANDS)
const ISLAND_COLOR_HEX = {}
for (const name of ISLAND_NAMES) {
  ISLAND_COLOR_HEX[name] = parseInt(ISLANDS[name].color.slice(1), 16)
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
settingsOverlay.onHintsChange = (visible) => {
  const hint = document.getElementById('controls-hint')
  if (hint) {
    hint.style.opacity = visible ? '' : '0'
    hint.setAttribute('aria-hidden', String(!visible))
  }
}
// Push initial values now that callbacks are wired (restores saved settings)
settingsOverlay.applyRestored()

// ─── HUD corner buttons ───────────────────────────────────────────────────────
const hudBtnsEl = document.createElement('div')
hudBtnsEl.id = 'hud-buttons'
hudBtnsEl.innerHTML = `
  <button class="hud-btn" type="button" id="btn-map"      aria-label="Open world map (M)"     title="World Map (M)">🗺 <span class="hud-btn-label">Map</span></button>
  <button class="hud-btn" type="button" id="btn-help"     aria-label="Open help"               title="Help">? <span class="hud-btn-label">Help</span></button>
  <button class="hud-btn" type="button" id="btn-settings" aria-label="Open settings"           title="Settings">⚙ <span class="hud-btn-label">Settings</span></button>
`
document.body.appendChild(hudBtnsEl)
hudBtnsEl.querySelector('#btn-map').addEventListener('click', () => mapOverlay.toggle())
hudBtnsEl.querySelector('#btn-help').addEventListener('click', () => helpOverlay.toggle())
hudBtnsEl.querySelector('#btn-settings').addEventListener('click', () => settingsOverlay.toggle())

// ─── Modal-open detection: pause game inputs while any overlay is up ─────────
function isAnyOverlayOpen() {
  return mapOverlay.isOpen() || helpOverlay.isOpen() || settingsOverlay.isOpen()
}
function closeAnyOpenOverlay() {
  if (settingsOverlay.isOpen()) { settingsOverlay.close(); return true }
  if (helpOverlay.isOpen())     { helpOverlay.close();     return true }
  if (mapOverlay.isOpen())      { mapOverlay.close();      return true }
  return false
}

// ─── Island counter (top-left) ────────────────────────────────────────────────
const islandCounterEl = document.createElement('div')
islandCounterEl.id = 'island-counter'
islandCounterEl.setAttribute('aria-live', 'polite')
islandCounterEl.innerHTML = `<span class="ic-num" id="ic-count">0</span>&nbsp;/ 6 islands discovered`
document.body.appendChild(islandCounterEl)
const icCountEl = document.getElementById('ic-count')

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
  if (tcEl) tcEl.classList.add('active')
}

const PLANET_RADIUS = 25

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
  model.traverse(obj => {
    if (obj.isMesh) {
      obj.castShadow = true
      obj.receiveShadow = true
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
          islandMeshes[nm].push(c)
        }
      })
    }
  })
  if (import.meta.env.DEV) {
    console.log('[GLB] all named objects:', foundNames)
    console.log('[GLB] islands matched:', Object.keys(islandObjects))
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

  // GLB fully loaded — trigger colour phase then scene
  if (!_loaderTriggered) {
    _loaderTriggered = true

    // ── Screenshot mode (DEV only): visit /?screenshot to capture loading-preview.png ──
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

    triggerColorPhase()
  }
},
(xhr) => {
  // Real download progress (maps 0-100% download → 0-88% on bar)
  if (xhr.total > 0) {
    setLoaderProgress(Math.min(88, (xhr.loaded / xhr.total) * 88))
  }
},
err => console.error('GLB load error:', err))

// ─── Surface raycaster ───────────────────────────────────────────────────────
let planetModel = null
const surfaceRay = new THREE.Raycaster()
const _rayOrigin = new THREE.Vector3(0, PLANET_RADIUS * 2, 0)
const _rayDir    = new THREE.Vector3(0, -1, 0)

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
    activeIslandName = getIslandAncestor(hits[0].object)
    return hits[0].point.y
  }
  activeIslandName = null
  return PLANET_RADIUS
}

// ─── Island state ────────────────────────────────────────────────────────────
const islandObjects = {}  // name → Object3D  (used for future dot-product if needed)
const islandMeshes  = {}  // name → [Mesh, ...]

let islandUIState    = 'exploring'  // 'exploring' | 'near' | 'detail'
let activeIslandName = null         // set by sampleSurfaceHeight (see animate raycast cache)

// --- Starfield ---
const stars = new Starfield()
scene.add(stars.points)

// --- Shooting Stars ---
const shootingStars = new ShootingStars()
scene.add(shootingStars.group)

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
const LOCO_BASE      = ASSET_BASE + 'locomotion/'
const gltfCharLoader = new GLTFLoader()

gltfCharLoader.load(LOCO_BASE + 'ericmodel.glb', gltf => {
  const root = gltf.scene

  // Scale to 2.2 units tall, feet at y=0
  const box = new THREE.Box3().setFromObject(root)
  root.scale.setScalar(2.2 / box.getSize(new THREE.Vector3()).y)
  const box2 = new THREE.Box3().setFromObject(root)
  root.position.y = -box2.min.y

  root.traverse(c => { if (c.isMesh) c.castShadow = true })

  modelGroup.add(root)
  fbxInScene = true
  character.group.visible = false

  animCtrl.load(root, fbxLoader, LOCO_BASE).then(() => {
    modelLoaded = true
  })

}, undefined, err => console.error('ericmodel.glb load error:', err))

// ─── Controls ────────────────────────────────────────────────────────────────
const controls = new Controls()

// ─── Jump key ────────────────────────────────────────────────────────────────
const JUMP_VEL = 5.0
const GRAVITY  = 22
let jumpOffset   = 0
let jumpVelocity = 0
let isGrounded   = true

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
  ui.openPanel(ISLANDS[activeIslandName])
  if (activeIslandName === 'pirate_ship') Promise.resolve().then(initTravelStats)
}

function closeIslandPanel() {
  if (islandUIState !== 'detail') return
  islandUIState = 'near'
  ui.closePanel()
  if (activeIslandName) ui.showPopup(ISLANDS[activeIslandName])
}

// Popup tap / click callback (works for both mouse and touch)
ui.onPopupTap = openIslandPanel

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
  if (key === 'm') mapOverlay.toggle()
})

// ─── Resize ──────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camSystem.resize(window.innerWidth / window.innerHeight)
})

// ─── Modal-open watcher: suspends camera / keyboard input while overlays up ──
let _wasOverlayOpen = false
function syncOverlayInputGate() {
  const open = isAnyOverlayOpen()
  if (open === _wasOverlayOpen) return
  _wasOverlayOpen = open
  controls.setEnabled(!open)
  camSystem.setInputEnabled(!open)
  if (open) spaceHeld = false
}

// ─── Loader ──────────────────────────────────────────────────────────────────
const loaderEl   = document.getElementById('loader')
const ldrPct     = document.getElementById('ldr-pct')
const ldrBarFill = document.getElementById('ldr-bar-fill')
const ldrLabel   = document.getElementById('ldr-label')
const canvasEl   = document.getElementById('canvas')
let   _loaderElapsed   = 0
let   _loaderTriggered = false

// ── Build tile grid (5×5) ────────────────────────────────────────────────────
const COLS = 5, ROWS = 5
const tilesEl  = document.getElementById('ldr-tiles')
const tileData = []

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const t = document.createElement('div')
    t.className = 'ldr-tile'
    t.style.left   = `${(c / COLS) * 100}%`
    t.style.top    = `${(r / ROWS) * 100}%`
    t.style.width  = `${100 / COLS}%`
    t.style.height = `${100 / ROWS}%`
    tilesEl.appendChild(t)
    tileData.push({ el: t, c, r })
  }
}

// Sort once by distance from centre — used for both fade-in and colorization
const tilesByCenter = [...tileData].sort((a, b) => {
  const da = Math.hypot(a.c - (COLS - 1) / 2, a.r - (ROWS - 1) / 2)
  const db = Math.hypot(b.c - (COLS - 1) / 2, b.r - (ROWS - 1) / 2)
  return da - db
})

// Phase 0 — occluder tiles fade out centre-outward to reveal #ldr-preview-bg
setTimeout(() => {
  tilesByCenter.forEach((t, i) => {
    setTimeout(() => t.el.classList.add('visible'), i * 90)
  })
}, 200)

// Cycle flavour text
const LDR_MSGS = [
  'WARPING SPACETIME', 'GROWING BAOBABS', 'PLACING STARS',
  'CALIBRATING ORBIT', 'WAKING CHARACTER', 'RENDERING ATMOSPHERE',
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
  if (ldrPct)     ldrPct.textContent     = String(Math.floor(ldrProgress)).padStart(2, '0')
  if (ldrBarFill) ldrBarFill.style.width = ldrProgress + '%'
}

/*
  Loader / intro timing reference (tune here + overlay.css #loader transition)
  ─────────────────────────────────────────────────────────────────────────────
  Until GLB loads:     variable (network); bar uses xhr or fallback toward 88%.
  Tile occluder reveal: 200ms hold, then centre-out +90ms × 24 tiles (~2.36s full grid).
  Color phase:         2200ms — bar 88→100%, preview grayscale→color (CSS 2.2s filter).
  After color (gap):   LDR_GAP_AFTER_COLOR_MS — then startScene().
  Before zoom (gap):   LDR_GAP_BEFORE_PLAY_MS — then sceneStarted + loader fade-out.
  Loader fade:         1400ms opacity (overlay.css); display:none 1400ms after fade starts.
  Big world on canvas: from first paint until sceneStarted (camera at z=52, lookAt origin).
  Zoom to orbit:       no fixed duration — exponential lerp in Camera.update (~exp(-12*dt)).
  Character visible:   when camera within ~4.5u of target OR scenePlayTime > CHAR_REVEAL_FAILSAFE_SEC.
  Teleport-in:         TELEPORT_IN_SEC after character reveal.
*/
const LDR_COLOR_PHASE_MS        = 2200
const LDR_GAP_AFTER_COLOR_MS    = 120  // pause after bar hits 100% (was 400 — felt sluggish)
const LDR_GAP_BEFORE_PLAY_MS    = 80   // pause before zoom + fade (was 300)
const CHAR_REVEAL_FAILSAFE_SEC  = 2.2

// Called when GLB finishes — animates bar 88→100 while preview goes grayscale → color
function triggerColorPhase() {
  const startProg = ldrProgress
  const duration  = LDR_COLOR_PHASE_MS
  const startTime = performance.now()
  const previewBg = document.getElementById('ldr-preview-bg')
  if (previewBg) previewBg.classList.add('colored')

  function tick(now) {
    const t = Math.min((now - startTime) / duration, 1)
    setLoaderProgress(startProg + (100 - startProg) * t)

    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      setTimeout(startScene, LDR_GAP_AFTER_COLOR_MS)
    }
  }
  requestAnimationFrame(tick)
}

function startScene() {
  setLoaderProgress(100)
  const previewBg = document.getElementById('ldr-preview-bg')
  if (previewBg) previewBg.classList.add('colored')

  // Zoom + loader fade start together after a short beat
  setTimeout(() => {
    sceneStarted = true
    if (loaderEl) loaderEl.classList.add('fade-out')
    setTimeout(() => {
      if (loaderEl) loaderEl.style.display = 'none'
      // Loader gone — stop the flavour-text interval so we don't churn the DOM forever
      clearInterval(_ldrMsgInterval)
    }, 1400)

    // Auto-fade controls hint after 8 s of gameplay
    setTimeout(() => {
      const hint = document.getElementById('controls-hint')
      if (hint) hint.classList.add('faded')
    }, 8000)

    // Show intro overlay once per day (after scene settles)
    const _introLast = Number(localStorage.getItem('phf-intro-ts') || 0)
    if (Date.now() - _introLast > 24 * 60 * 60 * 1000) {
      setTimeout(() => introOverlay.open(), 2800)
    }
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
const MAX_STEP = 1.2
let lastSurfY  = PLANET_RADIUS

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
    const fallback = Math.min(88, _loaderElapsed * 22)
    if (ldrProgress < fallback) setLoaderProgress(fallback)
    // Wide planet shot — hide character so he never reads as floating in frame
    if (!(import.meta.env.DEV && window.location.search.includes('screenshot'))) {
      character.group.visible = false
      modelGroup.visible = false
    }
    renderer.render(scene, camSystem.camera)
    return
  }

  scenePlayTime += dt

  const keys   = controls.keys
  const sprint = keys.has('shift')
  const speed  = WALK_SPEED * (sprint ? SPRINT_MULT : 1.0)

  // ── Touch joystick input ──
  const tJX = touchCtrl?.joyX ?? 0   // -1 … 1 (left / right)
  const tJY = touchCtrl?.joyY ?? 0   // -1 … 1 (up/forward = negative screen-Y)

  // Touch map button
  if (touchCtrl?.takeMap()) mapOverlay.toggle()

  // Touch camera orbit
  if (touchCtrl) {
    const { dx, dy } = touchCtrl.popCamDelta()
    if (dx || dy) camSystem.applyTouchDelta(dx, dy)
  }

  // Touch interact button
  if (touchCtrl?.takeInteract()) {
    if (islandUIState === 'detail') closeIslandPanel()
    else openIslandPanel()
  }

  // Touch jump
  if (touchCtrl?.takeJump()) tryJump()

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

  if (moving) idleTimer = 0; else idleTimer += dt

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
        if (surfY - lastSurfY > MAX_STEP) {
          planetGroup.quaternion.copy(_savedQ)
          needSurfaceRay = true
        }
      }
    }

    if (idleTimer > 5 && !reducedMotion) {
      _autoQ.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.003)
      planetGroup.quaternion.premultiply(_autoQ)
      needSurfaceRay = true
    }
  }

  // Jump physics
  if (!isGrounded) {
    jumpVelocity -= GRAVITY * dt
    jumpOffset   += jumpVelocity * dt
    if (jumpOffset <= 0) {
      jumpOffset = 0; jumpVelocity = 0; isGrounded = true
      // If space is still held, queue another jump on next frame
      if (spaceHeld) tryJump()
    }
  }

  if (needSurfaceRay) surfY = sampleSurfaceHeight()
  lastSurfY = surfY
  const charWorldY = surfY + jumpOffset

  const charRotY = Math.PI - heading
  // World transform (y / rot / scale) applied after camera + teleport-in, below

  // ── Animation update ──
  if (modelLoaded) {
    // AnimationController owns all state decisions — just feed it inputs
    animCtrl.update(dt, moving, sprint, !isGrounded)
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
        if (visitedIslands.size === ISLAND_NAMES.length && !_allDiscoveredShown) {
          _allDiscoveredShown = true
          showDiscoverToast('🌟 <strong>All 6 islands discovered!</strong> Nicely explored.', 5000)
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

  // ── Island highlight (pulsing emissive) ──
  for (let i = 0; i < ISLAND_NAMES.length; i++) {
    const name = ISLAND_NAMES[i]
    const meshes = islandMeshes[name]
    if (!meshes || !meshes.length) continue
    const isActive = name === activeIslandName
    const targetI  = isActive ? (0.3 + 0.15 * Math.sin(time * 3)) : 0
    const colorHex = ISLAND_COLOR_HEX[name]
    for (let j = 0; j < meshes.length; j++) {
      const m = meshes[j]
      m.material.emissiveIntensity += (targetI - m.material.emissiveIntensity) * (1 - Math.exp(-8 * dt))
      m.material.emissive.setHex(isActive ? colorHex : 0x000000)
    }
  }

  stars.update(time, 0)
  if (!reducedMotion) shootingStars.update(dt)
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

  modelGroup.position.set(0, charWorldY + teleportLift, 0)
  modelGroup.rotation.y = charRotY + teleportTwist
  modelGroup.scale.setScalar(teleportScale)
  character.group.position.set(0, charWorldY + teleportLift, 0)
  character.group.rotation.y = charRotY + teleportTwist
  character.group.scale.setScalar(teleportScale)

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

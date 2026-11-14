import * as THREE from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'
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
import { ISLANDS, prefetchAllIslands } from './data/content.js'
import { UI } from './ui/UI.js'
import { svgIcon } from './ui/icons.js'
import { MapOverlay } from './ui/MapOverlay.js'
import { HelpOverlay } from './ui/HelpOverlay.js'
import { IntroOverlay } from './ui/IntroOverlay.js'
import { SettingsOverlay } from './ui/SettingsOverlay.js'
import { AboutOverlay } from './ui/AboutOverlay.js'
import { CloseUp } from './ui/CloseUp.js'
import { audio } from './jukebox/AudioEngine.js'
import { sfx } from './audio/sfx.js'
import { QuestMarker } from './scene/QuestMarker.js'
import { Gramophone } from './scene/Gramophone.js'
import { WorldJukebox } from './jukebox/worldPlayer.js'
import { HOUSE_LOOPS } from './jukebox/houseLoops.js'
import { fetchPattern } from './jukebox/jukeboxApi.js'
import { DoodleBoard } from './scene/DoodleBoard.js'
import { Pip } from './scene/Pip.js'
import { BOARD_DRAWINGS } from './data/doodleBoard.js'
import { LoadDirector } from './loading/LoadDirector.js'
import { perfMark, perfMeasure, perfNavBaseline, perfSummary, isPerfEnabled } from './loading/perfLog.js'
import {
  resolveQuality,
  applyGlassCss,
  ADAPTIVE_DPR_BUDGET_MS,
  ADAPTIVE_DPR_MIN,
  ADAPTIVE_DPR_SAMPLES,
} from './loading/quality.js'
import gsap from 'gsap'

perfNavBaseline()

// Accelerated mesh raycasts (three-mesh-bvh)
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
THREE.Mesh.prototype.raycast = acceleratedRaycast

// Titles are Instrument Serif. The stylesheet asks for it with display=optional (never block on a
// webfont), so start fetching it now: by the time a panel opens it's ready, even on a first visit.
document.fonts?.load("400 1em 'Instrument Serif'").catch(() => {})

const ISLAND_NAMES = Object.keys(ISLANDS)
const ISLAND_COLOR_HEX = {}
for (const name of ISLAND_NAMES) {
  const c = ISLANDS[name].lightColor || ISLANDS[name].color
  ISLAND_COLOR_HEX[name] = parseInt(c.slice(1), 16)
}

// --- Renderer ---
const canvas = document.getElementById('canvas')
/** @type {import('./loading/LoadDirector.js').LoadDirector | null} */
let loadDirector = null
let qualitySettings = resolveQuality('auto')
/** @type {THREE.WebGLRenderer} */
let renderer
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: qualitySettings.antialias,
    powerPreference: 'high-performance',
    stencil: false,
  })
} catch (err) {
  console.error('WebGL init failed:', err)
  showBootFatal('WebGL is unavailable in this browser. Try Chrome or Firefox, or enable hardware acceleration.')
  throw err
}
renderer.setPixelRatio(qualitySettings.dpr)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = qualitySettings.shadows
renderer.shadowMap.type = qualitySettings.shadowType === 'soft'
  ? THREE.PCFSoftShadowMap
  : THREE.BasicShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0
applyGlassCss(qualitySettings)

function showBootFatal(msg) {
  const label = document.getElementById('ldr-label')
  if (label) label.textContent = String(msg).slice(0, 160)
  const prog = document.getElementById('ldr-progress')
  if (prog && !document.getElementById('ldr-retry')) {
    const btn = document.createElement('button')
    btn.id = 'ldr-retry'
    btn.type = 'button'
    btn.textContent = 'Reload'
    btn.className = 'ldr-retry-btn'
    btn.onclick = () => location.reload()
    prog.appendChild(btn)
  }
}

canvas.addEventListener('webglcontextlost', (e) => {
  e.preventDefault()
  loadDirector?.markContextLost()
}, false)
canvas.addEventListener('webglcontextrestored', () => {
  loadDirector?.markContextRestored()
  renderer.setSize(window.innerWidth, window.innerHeight)
}, false)

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
  _teleDest        = name
  sfx.warp()
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

// The Meadow close-ups (the Jukebox, its studio, the Doodle Wall). Built up
// front (cheap DOM, no network); the world parts are wired in once the props
// exist. See openCloseUp() for the camera glide and Eric's walk.
const closeUp = new CloseUp({ canvas: renderer.domElement, camera: camSystem.camera })
let closeUpActive = false      // from F until the camera has glided back out
let closeUpWhich  = null       // 'jukebox' | 'studio' | 'board'

aboutOverlay.onStartClose = () => {
  sfx.close('card', 'meadow_island')
  gsap.killTweensOf(modelGroup.position)                       // a hop in progress
  endAboutEmote()
  if (audio.isPlaying(ABOUT_OWNER)) { audio.stop(ABOUT_OWNER); audio.setLevel(audio.fullLevel) }
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
    if (activeIslandName) ui.showPopup(ISLANDS[activeIslandName], activeIslandName)
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
let _adaptiveDprEnabled = qualitySettings.adaptiveDpr
let _adaptiveFrameSamples = 0
let _adaptiveFrameTotal = 0
let _currentDpr = qualitySettings.dpr

function applyQualityPreset(preset) {
  qualitySettings = resolveQuality(preset)
  _currentDpr = qualitySettings.dpr
  _adaptiveDprEnabled = qualitySettings.adaptiveDpr
  _adaptiveFrameSamples = 0
  _adaptiveFrameTotal = 0
  renderer.setPixelRatio(_currentDpr)
  renderer.shadowMap.enabled = qualitySettings.shadows
  renderer.shadowMap.type = qualitySettings.shadowType === 'soft'
    ? THREE.PCFSoftShadowMap
    : THREE.BasicShadowMap
  // Shadow map size on lights
  const mapSize = qualitySettings.shadowMapSize
  if (lighting.sunLight?.shadow?.mapSize) {
    lighting.sunLight.shadow.mapSize.set(mapSize, mapSize)
    lighting.sunLight.shadow.map?.dispose()
    lighting.sunLight.shadow.map = null
  }
  skyDecor.setSkyTier(qualitySettings.skyTier)
  islandParticles.setScale(qualitySettings.particleScale)
  applyGlassCss(qualitySettings)
}

settingsOverlay.onQualityChange = (q) => applyQualityPreset(q)
settingsOverlay.onReducedMotionChange = (rm) => {
  reducedMotion = rm
  document.body.classList.toggle('reduced-motion', rm)
  loadDirector?.setReducedMotion(rm)
}
// Controls-hint visibility is contextual (driven each frame in the render loop):
// shown when the player is idle, hidden while moving or while a panel is open.
const controlsHintEl = document.getElementById('controls-hint')
const HINT_IDLE_SHOW = 5   // seconds idle before the hint fades back in
let   hintsEnabled   = true
let   hintShown      = true
// Sound: the jukebox is the only thing in the world that makes any, so the
// toggle simply arms or silences its engine.
settingsOverlay.onSoundChange = (on) => {
  audio.setSoundOn(on)
  // Switched back on after the player has interacted: wake the context now
  // (browsers allow that once the page has had any gesture at all)
  if (on && (navigator.userActivation?.hasBeenActive ?? true)) sfx.unlock()
}
settingsOverlay.onVolumeChange = (v) => { sfx.setVolume(v); closeUp.showVolume(v) }
// The Jukebox's own knob moves the same volume. When it's let go with nothing playing, a click lets the new level be heard.
closeUp.onVolume = (v, save) => { settingsOverlay.setVolume(v, save); if (save && v > 0 && !closeUp.playingId) sfx.click() }

// Sound can only start inside a user gesture. Every key press or tap gives the
// shared context a chance to start (first time) or wake (after a tab switch).
const unlockAudio = () => sfx.unlock()
window.addEventListener('keydown', unlockAudio, true)
window.addEventListener('pointerdown', unlockAudio, true)

// A soft click on every button in the world's UI. The Jukebox and the studio
// make their own notes, so they're left alone. Bubble phase, so a toggle has
// already flipped its aria-pressed by the time we read it.
document.addEventListener('click', (e) => {
  const b = e.target.closest?.('button, [role="button"]')
  if (!b || b.disabled || b.closest('#cu-grid')) return   // the studio's pads make their own notes
  if (b.classList.contains('stoggle')) sfx.toggle(b.getAttribute('aria-pressed') === 'true')
  else sfx.click()
})
settingsOverlay.onHintsChange = (visible) => {
  hintsEnabled = visible
  if (!controlsHintEl) return
  controlsHintEl.setAttribute('aria-hidden', String(!visible))
  if (!visible) { controlsHintEl.classList.add('faded'); hintShown = false }
}
// applyRestored() runs after skyDecor / islandParticles exist (see below)

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
      || closeUpActive
}
function closeAnyOpenOverlay() {
  // Innermost first: pad sits on the wall, studio sits on the shelf, and both
  // of those sit on the world
  if (closeUp.isOpen())         { closeUp.back();          return true }
  if (closeUpActive)            return true   // gliding in or out: let it land
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

// Loader DOM + director must exist before world.glb XHR callbacks fire
const loaderEl   = document.getElementById('loader')
const ldrPct     = document.getElementById('ldr-pct')
const ldrBarFill = document.getElementById('ldr-bar-fill')
const ldrLabel   = document.getElementById('ldr-label')
let _lastStageLabel = ''
let _loaderElapsed = 0
let _loaderTriggered = false
/** After compile, next loading-loop render marks first meaningful frame. */
let _pendingMeaningfulFrame = false
let _arrivalDone = false
let _revealScheduled = false
let sceneStarted = false
let scenePlayTime = 0

// ── Loading sound: pops along the bar, a welcome as the world opens ──────────
// Sound is tried the moment the page loads. Browsers that allow autoplay for
// this site (Chrome once you've used it a lot, Safari or Firefox if allowed per
// site) start straight away: pops climb the scale along the bar and the
// welcome plays as the world opens. Everyone else gets sound on their first
// press or click (usually closing How to Play): it fades in from there, the
// pops catch up if the bar is still going, and the welcome plays then.
const ldrTrack    = document.getElementById('ldr-bar-track')
const POP_STEP    = 5          // a pop every 5% of the bar
let _popped       = 0          // pops already played
let _loaderShown  = 0          // last % on the bar
let _popClock     = 0          // performance.now() before which no new pop may start
let _welcomed     = false
/**
 * Play the pops the bar has passed, at least `gapMs` apart even when the bar
 * jumps several steps at once (so two pops never land on top of each other).
 * Returns how many were queued.
 */
function popTo(pct, gapMs) {
  const target = Math.floor(pct / POP_STEP)
  const now = performance.now()
  let n = 0
  while (_popped < target) {
    _popped++
    const at = Math.max(now, _popClock)
    sfx.loadPop((_popped * POP_STEP) / 100, (at - now) / 1000)
    _popClock = at + gapMs
    n++
  }
  return n
}
// The moment sound actually starts (at load, or on the first press).
sfx.onStart = () => {
  if (!sceneStarted) {
    const n = popTo(_loaderShown, 30)        // quick run up to where the bar is
    if (n > 3 && ldrTrack) {
      ldrTrack.style.setProperty('--sweep', `${n * 30}ms`)
      ldrTrack.classList.add('is-sweeping')
    }
  } else if (!_welcomed) {
    _welcomed = true
    sfx.welcome()
  }
}
if (settingsOverlay.soundOn) sfx.unlock()

function setLoaderProgress(p, label) {
  const shown = Math.min(100, Math.max(0, Math.floor(p)))
  _loaderShown = shown
  if (sfx.live && !sceneStarted) popTo(shown, 45)
  if (ldrPct)     ldrPct.textContent     = shown + '%'
  if (ldrBarFill) ldrBarFill.style.width = shown + '%'
  if (label && ldrLabel && label !== _lastStageLabel && !loadDirector?.isFatal) {
    _lastStageLabel = label
    ldrLabel.style.opacity = '0'
    setTimeout(() => {
      if (ldrLabel) { ldrLabel.textContent = label; ldrLabel.style.opacity = '1' }
    }, 160)
  }
}

loadDirector = new LoadDirector({
  reducedMotion,
  onProgress: (p, label) => setLoaderProgress(p, label),
  onFatal: (msg) => {
    showBootFatal(msg)
    setLoaderProgress(0, msg)
  },
  onReady: () => tryBeginReveal(),
})
loadDirector.markCriticalCode()
window.__PHF_LOAD_OWNED__ = true

// --- Planet (GLB) ---
/*
  ═══════════════════════════════════════════════════════════════════════════
  UPDATING THE GLOBE — redo optimisation (full guide: assets/README.md)
  ═══════════════════════════════════════════════════════════════════════════
  1. Export full-quality .glb from Blender (keep island names + "(terrain)").
  2. Overwrite:  assets/source/world.glb
  3. npm install   (once)
  4. npm run optimize:world              ← fidelity (recommended)
     npm run optimize:world -- balanced  ← smaller
     npm run optimize:world -- small     ← tiniest / softest (old aggressive)
  5. That writes public/world.glb (what the site loads below).
  6. npm run dev  → check islands / cliffs / textures
  7. npm run build  (+ optional: npm run smoke)

  Runtime must-haves for the optimised file (do not rip out):
  • MeshoptDecoder + KTX2Loader + public/basis/ transcoder
  • LoadDirector readiness (progress ≠ download alone)
  • Selective terrain shadows + FrontSide on opaque mats (perf)

  First aggressive pass used preset "small" (~81% size cut, visible quality loss).
  Prefer "fidelity" or "balanced" after the next globe export.
  ═══════════════════════════════════════════════════════════════════════════
*/
const gltfLoader = new GLTFLoader()
gltfLoader.setMeshoptDecoder(MeshoptDecoder)
const ktx2Loader = new KTX2Loader()
ktx2Loader.setTranscoderPath(ASSET_BASE + 'basis/')
ktx2Loader.detectSupport(renderer)
gltfLoader.setKTX2Loader(ktx2Loader)

/** Let the loader UI + flybys paint between heavy sync chunks. */
function yieldToMain() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => setTimeout(resolve, 0))
  })
}

/** Meshes that still need BVH after first reveal (non-terrain). */
const _deferredBvhMeshes = []

function scheduleDeferredBvh() {
  if (!_deferredBvhMeshes.length) return
  const chunk = () => {
    const start = performance.now()
    while (_deferredBvhMeshes.length && performance.now() - start < 4) {
      const mesh = _deferredBvhMeshes.pop()
      if (!mesh?.geometry || mesh.geometry.boundsTree) continue
      try { mesh.geometry.computeBoundsTree() } catch { /* ignore */ }
    }
    if (_deferredBvhMeshes.length) {
      if ('requestIdleCallback' in window) requestIdleCallback(chunk, { timeout: 200 })
      else setTimeout(chunk, 0)
    }
  }
  if ('requestIdleCallback' in window) requestIdleCallback(chunk, { timeout: 500 })
  else setTimeout(chunk, 0)
}

perfMark('world_download_start')

// Custom fetch → paint "Unpacking" → parse. Three's XHR path parses in the same
// turn as the last progress event, which freezes the loader mid-bar (~65%).
;(async () => {
  const url = ASSET_BASE + 'world.glb'
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const total = Number(res.headers.get('content-length')) || 0
    const reader = res.body?.getReader()
    let buffer

    if (reader) {
      const chunks = []
      let loaded = 0
      let sinceYield = 0
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value)
        loaded += value.byteLength
        sinceYield += value.byteLength
        if (total > 0) loadDirector?.setDownloadProgress(loaded, total)
        // Keep flybys alive during large downloads
        if (sinceYield > 512 * 1024) {
          sinceYield = 0
          await yieldToMain()
        }
      }
      if (total > 0) loadDirector?.setDownloadProgress(total, total)
      else loadDirector?.setDownloadProgress(loaded, loaded)
      loadDirector?.flush?.()
      await yieldToMain()
      const merged = new Uint8Array(loaded)
      let offset = 0
      for (const c of chunks) { merged.set(c, offset); offset += c.byteLength }
      buffer = merged.buffer
    } else {
      buffer = await res.arrayBuffer()
      loadDirector?.setDownloadProgress(1, 1)
      loadDirector?.flush?.()
      await yieldToMain()
    }

    const gltf = await new Promise((resolve, reject) => {
      gltfLoader.parse(buffer, ASSET_BASE, resolve, reject)
    })

    const model = gltf.scene
    loadDirector?.markWorldLoaded()
    loadDirector?.flush?.()
    await yieldToMain()

    // Scale model so its bounding sphere matches PLANET_RADIUS
    const box = new THREE.Box3().setFromObject(model)
    const sphere = new THREE.Sphere()
    box.getBoundingSphere(sphere)
    const scale = PLANET_RADIUS / sphere.radius
    model.scale.setScalar(scale)
    const box2 = new THREE.Box3().setFromObject(model)
    const center = box2.getCenter(new THREE.Vector3())
    model.position.sub(center)
    await yieldToMain()

    const foundNames = import.meta.env.DEV ? [] : null
    let _terrainLayerCount = 0
    model.traverse(obj => {
      if (obj.isMesh) {
        const nameLower = (obj.name || '').toLowerCase()
        const isTerrain = nameLower.includes('(terrain)')
        obj.castShadow = isTerrain
        obj.receiveShadow = true
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          for (const mat of mats) {
            if (mat && mat.opacity >= 0.99 && !mat.transparent) mat.side = THREE.FrontSide
          }
        }
        // BVH only for walkable terrain at boot — rest deferred (was a big freeze)
        if (obj.geometry && !obj.geometry.boundsTree) {
          if (isTerrain) {
            try { obj.geometry.computeBoundsTree() } catch { /* ignore */ }
          } else {
            _deferredBvhMeshes.push(obj)
          }
        }
        if (isTerrain) {
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
            c.material._isFloor = true
            islandMeshes[nm].push(c)
          }
        })
      }
    })
    if (import.meta.env.DEV) {
      console.log('[GLB] all named objects:', foundNames)
      console.log('[GLB] islands matched:', Object.keys(islandObjects))
    }
    if (_terrainLayerCount > 0) {
      surfaceRay.layers.set(1)
      terrainLayerActive = true
    }
    await yieldToMain()

    // CRITICAL: keep invisible until triggerArrival parks it off-screen.
    // Yields below let animate() render — a visible centered planet would flash
    // under the transparent loader (regression from chunked/async setup).
    model.visible = false
    planetGroup.add(model)
    planetModel = model

    planetGroup.updateMatrixWorld(true)
    const _islandBox = new THREE.Box3()
    const _islandCtr = new THREE.Vector3()
    for (const nm of ISLAND_NAMES) {
      if (islandMeshes[nm] && islandMeshes[nm].length) {
        _islandBox.makeEmpty()
        for (const mesh of islandMeshes[nm]) _islandBox.expandByObject(mesh)
        _islandBox.getCenter(_islandCtr)
        planetGroup.worldToLocal(_islandCtr)
        if (_islandCtr.lengthSq() > 0.0001) {
          islandDirs[nm] = _islandCtr.clone().normalize()
        }
      }
    }
    computeHopOrder()
    await yieldToMain()

    {
      const _bnds = {}
      const _sc   = new THREE.Vector3()
      for (const nm of ISLAND_NAMES) {
        if (!islandMeshes[nm]?.length) continue
        const b = new THREE.Box3()
        for (const m of islandMeshes[nm]) b.expandByObject(m)
        b.expandByScalar(3.0)
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
          obj.material._isFloor = false
          islandMeshes[nm].push(obj)
          _claimed.add(obj)
          break
        }
      })
    }

    for (const nm of ISLAND_NAMES) {
      for (const m of (islandMeshes[nm] || [])) meshToIsland.set(m, nm)
    }
    await yieldToMain()

    // ── Meadow points of interest ───────────────────────────────────────────
    // The doodle wall hangs off a node the GLB carries literally called
    // "telescope". If a future world export renames it we skip that marker
    // rather than break the island.
    {
      const scope = model.getObjectByName(TELESCOPE_NODE)
      if (scope) {
        // The whiteboard stands beside the telescope (which stays: it's part
        // of the meadow's decoration). The telescope sits where you spawn,
        // so the board stands a couple of steps away from it, and turns to
        // face the camera once you're on Meadow.
        const at = new THREE.Box3().setFromObject(scope).getCenter(new THREE.Vector3())
        _scopeRoot = scope
        scope.traverse(o => {
          if (!o.isMesh) return
          o.material = Array.isArray(o.material) ? o.material.map(m => m.clone()) : o.material.clone()
          for (const m of [].concat(o.material)) _scopeMats.push(m)
        })
        const skip = new Set(); scope.traverse(o => skip.add(o))
        const toCam = new THREE.Vector3(0, 0, 1)
          .applyQuaternion(planetGroup.getWorldQuaternion(new THREE.Quaternion()).invert())
        let spot = surfaceAt(MEADOW_ISLAND, at, skip)
        if (spot) {
          const back = toCam.clone().addScaledVector(spot.normal, -toCam.dot(spot.normal)).normalize()
          const behind = planetGroup.localToWorld(spot.position.clone().addScaledVector(back, -2.6))
          spot = surfaceAt(MEADOW_ISLAND, behind, skip) || spot
        }
        if (spot) {
          doodleBoard = new DoodleBoard(BOARD_ZONE)
          doodleBoard.setDrawings(BOARD_DRAWINGS)
          doodleBoard.group.position.copy(spot.position)
          doodleBoard.group.quaternion.copy(faceTowards(spot, spot.position.clone().addScaledVector(toCam, 10)))
          planetGroup.add(doodleBoard.group)
          closeUp.board = doodleBoard
        }
        addPoi({
          key:      'wall',
          target:   doodleBoard ? doodleBoard.group : scope,
          // no arrow overhead: the circle on the ground shows where to stand
          arrow:    false,
          ...(doodleBoard && {
            range:   BOARD_ZONE,
            measure: () => doodleBoard.group.getWorldPosition(_jbPos).distanceTo(modelGroup.position),
          }),
          island:   MEADOW_ISLAND,
          color:    0xFBBF24,
          iconKey:  'pencil',
          title:    'The Doodle Wall',
          sub:      'someone left drawings here',
          foundSub: 'look again',
          open:     () => openCloseUp('board'),
        })
      } else if (import.meta.env.DEV) {
        console.warn(`[world] no "${TELESCOPE_NODE}" node — doodle wall marker skipped`)
      }

      // The jukebox is not in the GLB at all, it is assembled from primitives
      // and dropped onto the meadow's surface, opposite the telescope so the
      // two prompts never overlap and the island has something at either end.
      // Somewhere near the old telescope where its whole music circle lands
      // on the meadow, clear of the whiteboard.
      const scopeAt = scope ? new THREE.Box3().setFromObject(scope).getCenter(new THREE.Vector3()) : null
      const spot = (scopeAt && ringSpot(MEADOW_ISLAND, scopeAt, JUKEBOX_ZONE, doodleBoard?.group, BOARD_ZONE))
        || dropOntoIsland(MEADOW_ISLAND, scopeAt, [0.36, 0.28, 0.2, 0])
      if (spot) {
        jukeboxProp = new Gramophone(JUKEBOX_ZONE, JUKEBOX_SIZE)
        jukeboxProp.group.position.copy(spot.position)
        jukeboxProp.group.quaternion.setFromUnitVectors(WORLD_UP, spot.normal)
        planetGroup.add(jukeboxProp.group)
        addPoi({
          key:      'jukebox',
          target:   jukeboxProp.group,
          island:   MEADOW_ISLAND,
          color:    0x7C3AED,          // purple, so it reads apart from the scope's gold
          iconKey:  'music',
          title:    'The Jukebox',
          sub:      'someone left loops here',
          foundSub: 'have another listen',
          open:     () => openCloseUp('jukebox'),
          // F works anywhere inside the music circle; no arrow overhead
          arrow:    false,
          range:    JUKEBOX_ZONE,
          measure:  () => jukeboxProp.group.getWorldPosition(_jbPos).distanceTo(modelGroup.position),
        })
      } else if (import.meta.env.DEV) {
        console.warn(`[world] could not find a spot on "${MEADOW_ISLAND}" — jukebox skipped`)
      }

      // Pip, the snow imp hiding on Arctic (an easter egg: no arrow, no marker)
      setupPip()

      // The props and markers were placed in planetGroup space, but the globe
      // itself (model) stays hidden and then slides in during the loader
      // arrival. Left as planetGroup siblings they float in empty space before
      // the planet lands. Moving them inside the model makes them appear and
      // arrive with it. attach() keeps their world transform, and the model is
      // still at its resting pose here. The surface and obstacle rays walk the
      // model's whole tree, so the props opt out of raycasting: they were never
      // walkable before the move, and the marker's halo Sprite throws without
      // a raycaster camera.
      const noRaycast = (root) => root.traverse(o => { o.raycast = () => {} })
      const adopt = (obj) => { model.attach(obj); noRaycast(obj) }
      if (jukeboxProp) adopt(jukeboxProp.group)
      if (pip && !pipFriend) adopt(pip.group)
      if (doodleBoard) adopt(doodleBoard.group)
      for (const poi of POIS) {
        adopt(poi.marker.group)
        adopt(poi.marker.anchor)
      }
    }
    await yieldToMain()

    if (_loaderTriggered) return
    _loaderTriggered = true

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

    loadDirector?.markSceneBuilt()
    loadDirector?.flush?.()
    await yieldToMain()

    try {
      renderer.compile(scene, camSystem.camera)
      loadDirector?.markShadersCompiled()
      loadDirector?.flush?.()
    } catch (compileErr) {
      console.error('Shader compile failed:', compileErr)
      loadDirector?.fail('Could not prepare graphics. Try reloading.')
      return
    }
    await yieldToMain()

    renderer.render(scene, camSystem.camera)
    _pendingMeaningfulFrame = true
    triggerArrival(model)
    // BVH for non-terrain meshes waits until after the intro zoom (see animate)
  } catch (err) {
    console.error('GLB load error:', err)
    loadDirector?.fail('Could not load the world. Check your connection, then retry.')
  }
})()

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

// ─── Points of interest: the props you can walk up to and open ──────────────
// A second, nested prompt that only appears once you're already standing on
// the island the prop belongs to. Every prop with an overlay of its own lives
// in POIS, so the F key and the sub-popup stay a single pair however many get
// added: the render loop picks the nearest one and that is the one F opens.
const TELESCOPE_NODE = 'telescope'
const MEADOW_ISLAND  = 'meadow_island'
/** @type {Array<{key,island,marker,range,near,found,iconKey,title,sub,foundSub,color,open}>} */
const POIS = []
const WORLD_UP = new THREE.Vector3(0, 1, 0)
let activePoi     = null   // the one you're closest to right now, or null
let _subPromptPoi = null   // whose prompt is currently on screen
/** @type {import('./scene/Gramophone.js').Gramophone | null} */
let jukeboxProp   = null
const JUKEBOX_ZONE = 2.2      // radius of the gramophone's music circle
const JUKEBOX_SIZE = 1.3      // the gramophone itself, a size up from the other props
const BOARD_ZONE   = 1.5      // radius of the whiteboard's circle (smaller than the jukebox's)
const worldJukebox = new WorldJukebox()
let doodleBoard   = null   // the Doodle Wall's whiteboard on Meadow
let _prevActiveIslandForLerp = null
let _islandLerpSettling = 0
let _forceIslandLerp = true

/**
 * Hang a quest marker over `target` and make F open something when you stand
 * next to it. Call once the prop is inside planetGroup and its world matrix
 * is up to date.
 * @param {object}         o
 * @param {string}         o.key       stable id, for the dev probe
 * @param {THREE.Object3D} o.target    the prop the marker floats above
 * @param {string}         o.island    only triggers while you're on this island
 * @param {number}         o.color     marker accent, hex
 * @param {string}         o.iconKey   icons.js key for the prompt
 * @param {string}         o.title     prompt title
 * @param {string}         o.sub       prompt line before the first open
 * @param {string}         o.foundSub  prompt line after it
 * @param {Function}       o.open      what F actually does
 * @param {number}         [o.range]   trigger radius, overriding the size-based one
 * @param {Function}       [o.measure] () => distance from you, instead of from the marker
 * @param {boolean}        [o.arrow]   false hides the floating arrow
 */
function addPoi({ key, target, island, color, iconKey, title, sub, foundSub, open, range, measure, arrow = true }) {
  const marker = new QuestMarker({ color })
  const r = marker.attachTo(target, planetGroup)
  if (!arrow) marker.group.visible = false   // the anchor still drives distance checks
  const poi = {
    key, island, marker, iconKey, title, sub, foundSub, open,
    color: `#${color.toString(16).padStart(6, '0').toUpperCase()}`,
    // Trigger radius scales off the prop so it survives a world re-export
    range: range ?? Math.max(2.6, r * 2.2),
    measure,
    near:  false,
    found: false,        // has it been opened at least once
  }
  POIS.push(poi)
  return poi
}

const _dropRay = new THREE.Raycaster()

// ── Pip: an easter egg on Arctic ─────────────────────────────────────────────
// It hides in a mound of snow. Catch it (F when you're next to it) and it hides
// somewhere else; the third time it comes with you. How far someone has got is
// remembered in this browser.
const ARCTIC_ISLAND = 'arctic_island'
const PIP_KEY = 'ew-pip-v1'
let pip = null, pipPoi = null, pipSpots = [], pipSpot = 0
let pipCaught = 0, pipFriend = false
try { const s = JSON.parse(localStorage.getItem(PIP_KEY) || '{}'); pipCaught = Math.max(0, Math.min(3, s.caught | 0)); pipFriend = !!s.friend } catch { /* no storage: it just starts over */ }
const savePip = () => { try { localStorage.setItem(PIP_KEY, JSON.stringify({ caught: pipCaught, friend: pipFriend })) } catch { /* fine */ } }
const _pipV = new THREE.Vector3()

/**
 * Open ground on an island: spots a small prop can sit, spread around it.
 * Rays come down from above in a ring; a hit only counts if the surface faces
 * up, and anything standing well above the lowest hits (a roof, a treetop) is
 * dropped. planetGroup-local { position, normal }.
 */
function groundSpots(islandName, want = 6) {
  const meshes = islandMeshes[islandName]
  if (!meshes?.length) return []
  planetGroup.updateMatrixWorld(true)
  const box = new THREE.Box3()
  for (const m of meshes) box.expandByObject(m)
  if (box.isEmpty()) return []
  const centre = box.getCenter(new THREE.Vector3())
  const size   = box.getSize(new THREE.Vector3())
  const reach  = Math.max(size.x, size.y, size.z) * 0.5
  const core   = new THREE.Vector3().setFromMatrixPosition(planetGroup.matrixWorld)
  const normal = centre.clone().sub(core).normalize()
  const t1 = new THREE.Vector3().crossVectors(normal, Math.abs(normal.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)).normalize()
  const t2 = new THREE.Vector3().crossVectors(normal, t1)
  const above = core.distanceTo(centre) + reach + 30
  const hits = []
  const RING = 24
  for (let k = 0; k < RING; k++) {
    const a = (k / RING) * Math.PI * 2, frac = [0.3, 0.46, 0.38][k % 3]
    const dir = centre.clone().addScaledVector(t1, Math.cos(a) * reach * frac).addScaledVector(t2, Math.sin(a) * reach * frac).sub(core).normalize()
    _dropRay.set(core.clone().addScaledVector(dir, above), dir.clone().negate())
    _dropRay.layers.enableAll()
    const hit = _dropRay.intersectObjects(meshes, true)[0]
    if (!hit || !hit.face) continue
    const n = hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
    if (n.dot(dir) < 0.8) continue                                   // the side of something, not ground
    hits.push({ world: hit.point.clone(), r: hit.point.distanceTo(core) })
  }
  if (hits.length < 2) return []
  const low = hits.map(h => h.r).sort((x, y) => x - y)[Math.floor(hits.length * 0.25)]
  const ground = hits.filter(h => h.r < low + 0.5)
  const out = [], step = Math.max(1, Math.floor(ground.length / want))
  for (let i = 0; i < ground.length && out.length < want; i += step) {
    const local = planetGroup.worldToLocal(ground[i].world.clone())
    out.push({ position: local, normal: local.clone().normalize() })
  }
  return out
}

function setupPip() {
  pip = new Pip()
  if (pipFriend) { pip.setFriend(); scene.add(pip.group); return }
  pipSpots = groundSpots(ARCTIC_ISLAND, 6)
  if (pipSpots.length < 2) {
    if (import.meta.env.DEV) console.warn('[world] no open snow found on Arctic: Pip skipped')
    pip = null
    return
  }
  planetGroup.add(pip.group)
  placePip(pipCaught % pipSpots.length)
  pipPoi = addPoi({
    key:      'pip',
    target:   pip.group,
    island:   ARCTIC_ISLAND,
    color:    0x7DD3FC,
    iconKey:  'snowflake',
    title:    'Something in the snow',
    sub:      'catch it!',
    foundSub: 'catch it again!',
    open:     catchPip,
    arrow:    false,                 // an easter egg: nothing points at it
    range:    3,
    measure:  () => pip.busy ? Infinity : pip.group.getWorldPosition(_pipV).distanceTo(modelGroup.position),
  })
}

/** Put Pip's mound on hiding spot `i` (planetGroup space), whatever it's parented to by now. */
function placePip(i) {
  pipSpot = i
  const spot = pipSpots[i], parent = pip.group.parent
  planetGroup.attach(pip.group)
  pip.group.position.copy(spot.position)
  pip.group.quaternion.setFromUnitVectors(WORLD_UP, spot.normal)
  pip.group.scale.setScalar(1)
  if (parent && parent !== planetGroup) parent.attach(pip.group)
}

function catchPip() {
  if (!pip || pipFriend || pip.busy) return
  pipCaught++
  savePip()
  pip.caught()
  sfx.pip()
  if (pipPoi) pipPoi.title = 'Pip'                 // now you know its name
  if (pipCaught >= 3) {
    showDiscoverToast(`<span class="dt-row">${svgIcon('snowflake', 16)}<span><strong>You caught Pip three times!</strong> It's coming with you now.</span></span>`, 5200)
    setTimeout(befriendPip, 1000)
    return
  }
  showDiscoverToast(`<span class="dt-row">${svgIcon('snowflake', 16)}<span><strong>You caught Pip!</strong> ${pipCaught} of 3. It's hiding somewhere else now.</span></span>`, 4200)
  setTimeout(() => {
    // the spot farthest from this one, so the hunt takes you across the island
    const here = pipSpots[pipSpot].position
    let best = -1, bestD = -1
    pipSpots.forEach((s, k) => { const d = s.position.distanceTo(here); if (k !== pipSpot && d > bestD) { best = k; bestD = d } })
    placePip(best)
    pip.reset()
  }, 1100)
}

function befriendPip() {
  pipFriend = true
  savePip()
  if (pipPoi) pipPoi.island = '__nowhere__'        // no more prompt: it's not hiding any more
  scene.add(pip.group)                             // out of the planet: it walks with him now
  pip.group.scale.setScalar(1)
  pip.group.quaternion.identity()
  pip.group.position.copy(modelGroup.position)
  pip.setFriend()
  sfx.pip()
}

/** Pip the friend: beside him and a step behind, catching up when he moves. */
function tickPipFriend(dt, moving) {
  const ry = modelGroup.rotation.y
  // his own right and back, on the ground at his feet
  _pipV.set(Math.cos(ry) * 1.15 - Math.sin(ry) * 0.6, 0, -Math.sin(ry) * 1.15 - Math.cos(ry) * 0.6).add(modelGroup.position)
  const k = 1 - Math.exp(-dt * (moving ? 5 : 8))
  pip.group.position.x += (_pipV.x - pip.group.position.x) * k
  pip.group.position.z += (_pipV.z - pip.group.position.z) * k
  pip.group.position.y = modelGroup.position.y
  pip.group.rotation.y = ry
  pip.group.scale.setScalar(modelGroup.scale.x)
  // he's the hero of About and of the close-ups: Pip waits out of shot
  pip.group.visible = modelGroup.visible && (_charRoot ? _charRoot.visible : true) && !presentationMode && !aboutOverlay.isOpen() && !isTeleporting
  pip.update(dt, { moving: moving && isGrounded, calm: reducedMotion })
}

/**
 * Find a spot to stand a procedural prop on, somewhere on `islandName`.
 *
 * The planet's core is planetGroup's origin, so the outward normal at any
 * point is just that point's direction from the core. That gives a tangent
 * plane to slide along, and a ray to fire back down at the island.
 *
 * @param {string}          islandName
 * @param {THREE.Vector3}  [awayFrom] world point to sit opposite, so two props
 *                                    on one island end up at either end of it
 * @returns {{ position: THREE.Vector3, normal: THREE.Vector3 }|null} planetGroup-local
 */
function dropOntoIsland(islandName, awayFrom = null, fracs = [0.55, 0.42, 0.30, 0.18, 0]) {
  const meshes = islandMeshes[islandName]
  if (!meshes?.length) return null
  planetGroup.updateMatrixWorld(true)

  const box = new THREE.Box3()
  for (const m of meshes) box.expandByObject(m)
  if (box.isEmpty()) return null

  const centre = box.getCenter(new THREE.Vector3())
  const size   = box.getSize(new THREE.Vector3())
  const reach  = Math.max(size.x, size.y, size.z) * 0.5

  const core   = new THREE.Vector3().setFromMatrixPosition(planetGroup.matrixWorld)
  const normal = centre.clone().sub(core).normalize()

  // A tangent direction pointing away from `awayFrom`, or any tangent at all.
  let slide = new THREE.Vector3()
  if (awayFrom) {
    slide.copy(centre).sub(awayFrom)
    slide.addScaledVector(normal, -slide.dot(normal))   // flatten onto the plane
  }
  if (slide.lengthSq() < 1e-4) {
    const seed = Math.abs(normal.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)
    slide.crossVectors(normal, seed)
  }
  slide.normalize()

  // Walk back in from the island's edge until the ray actually lands on it.
  const above = core.distanceTo(centre) + reach + 30
  for (const frac of fracs) {
    const target = centre.clone().addScaledVector(slide, reach * frac)
    const dir    = target.clone().sub(core).normalize()
    const from   = core.clone().addScaledVector(dir, above)
    _dropRay.set(from, dir.clone().negate())
    _dropRay.layers.enableAll()     // island floors may sit on the terrain layer
    const hit = _dropRay.intersectObjects(meshes, true)[0]
    if (!hit) continue
    const local = planetGroup.worldToLocal(hit.point.clone())
    return { position: local, normal: local.clone().normalize() }
  }
  return null
}

/**
 * The island's surface straight below a world point (towards the core),
 * ignoring `skip` (e.g. the prop being replaced). planetGroup-local result.
 */
function surfaceAt(islandName, worldPoint, skip = null) {
  const meshes = (islandMeshes[islandName] || []).filter(m => !skip?.has(m))
  if (!meshes.length) return null
  planetGroup.updateMatrixWorld(true)
  const core = new THREE.Vector3().setFromMatrixPosition(planetGroup.matrixWorld)
  const dir  = worldPoint.clone().sub(core).normalize()
  _dropRay.set(core.clone().addScaledVector(dir, core.distanceTo(worldPoint) + 40), dir.clone().negate())
  _dropRay.layers.enableAll()
  const hit = _dropRay.intersectObjects(meshes, true)[0]
  if (!hit) return null
  const local = planetGroup.worldToLocal(hit.point.clone())
  return { position: local, normal: local.clone().normalize() }
}

const _bp = new THREE.Vector3(), _bn = new THREE.Vector3(), _bf = new THREE.Vector3(), _bw = new THREE.Vector3(), _bq = new THREE.Quaternion()
const _jbPos = new THREE.Vector3()

// ─── Meadow close-ups: the camera glides in to the prop ──────────────────────
// Shots are in the prop's own space (x = to its right, z = in front) and turned
// into world space every frame, so they stay pinned to the planet. Eric fades
// out while the camera is in close (on a planet that turns under him he can't
// be placed exactly beside a prop, and the prop reads better on its own) and
// fades back in as it glides out.
// Every shot also carries the prop's own up: a prop stands on the curve of the
// planet, so with the world's up it would sit at a slant on screen.
const _shotP = new THREE.Vector3(), _shotL = new THREE.Vector3(), _shotU = new THREE.Vector3()
const _bx = new THREE.Vector3(), _bz = new THREE.Vector3(), _bc = new THREE.Vector3()
const CU = {
  jukebox: { pos: [2.3, 2.9, 8.4], look: [2.3, 1.85, 0], fov: 38 },
  studio:  { pos: [2.6, 2.9, 7.9], look: [2.6, 1.85, 0], fov: 38 },
}
// The board, frame, tray and markers around the face's centre (face units).
const BOARD_BOX = { w: 2.34, h: 1.8, cy: -0.06 }
const BOARD_FOV = 36
// the wide Jukebox shot's angle (slightly above, straight on), reused for the fitted one
const JB_DIR = new THREE.Vector3(0, 1.05, 8.4).normalize()
const JB_RIGHT = new THREE.Vector3(1, 0, 0)
const JB_UP = new THREE.Vector3(0, JB_DIR.z, -JB_DIR.y)
const _bsz = new THREE.Vector3()

/** The gramophone fitted into the free part of the screen, from the wide shot's angle. */
function fitPropShot(prop, f, fov) {
  const box = prop.localBounds()
  box.getCenter(_bc); box.getSize(_bsz)
  const aspect = camSystem.camera.aspect, t = Math.tan(THREE.MathUtils.degToRad(fov / 2)), fill = 0.9
  const d = Math.max(_bsz.x / (2 * t * aspect * f.w * fill), _bsz.y / (2 * t * f.h * fill))
  const vh = 2 * d * t, vw = vh * aspect
  _shotL.copy(_bc).addScaledVector(JB_RIGHT, -(f.cx - 0.5) * vw).addScaledVector(JB_UP, (f.cy - 0.5) * vh)
  _shotP.copy(_shotL).addScaledVector(JB_DIR, d)
  prop.group.localToWorld(_shotL); prop.group.localToWorld(_shotP)
  _shotU.copy(JB_UP).transformDirection(prop.group.matrixWorld)
  return { pos: _shotP, look: _shotL, fov, up: _shotU }
}
const cuProp = (which) => (which === 'board' ? doodleBoard : jukeboxProp)
function closeUpShot(which) {
  if (which === 'board') return boardShot()
  const prop = cuProp(which === 'studio' ? 'jukebox' : which), c = CU[which]
  // phones: the panel runs along the bottom, so fit the gramophone above it
  const f = closeUp.frameFor(which)
  if (f.below) return fitPropShot(prop, f, c.fov)
  prop.group.localToWorld(_shotP.set(...c.pos))
  prop.group.localToWorld(_shotL.set(...c.look))
  prop.group.updateWorldMatrix(true, false)
  prop.group.matrixWorld.extractBasis(_bx, _shotU, _bz)
  return { pos: _shotP, look: _shotL, fov: c.fov, up: _shotU.normalize() }
}

/**
 * The whiteboard, square on and level: the camera looks straight down the
 * face's normal with the face's own up, from just far enough back that the
 * board fills the free part of the screen (beside the panel, or above it on a
 * phone), whatever the window's shape.
 */
function boardShot() {
  const face = doodleBoard.face
  face.updateWorldMatrix(true, false)
  face.matrixWorld.extractBasis(_bx, _shotU, _bz)
  _bx.normalize(); _shotU.normalize(); _bz.normalize()
  _bc.setFromMatrixPosition(face.matrixWorld).addScaledVector(_shotU, BOARD_BOX.cy)
  const f = closeUp.frameFor('board'), aspect = camSystem.camera.aspect
  const t = Math.tan(THREE.MathUtils.degToRad(BOARD_FOV / 2)), fill = 0.94
  const d = Math.max(BOARD_BOX.w / (2 * t * aspect * f.w * fill), BOARD_BOX.h / (2 * t * f.h * fill))
  const vh = 2 * d * t, vw = vh * aspect
  _shotL.copy(_bc).addScaledVector(_bx, -(f.cx - 0.5) * vw).addScaledVector(_shotU, (f.cy - 0.5) * vh)
  _shotP.copy(_shotL).addScaledVector(_bz, d)
  return { pos: _shotP, look: _shotL, fov: BOARD_FOV, up: _shotU }
}

let charFade = 1, charFadeTo = 1   // Eric's opacity, eased towards charFadeTo
const _charFadeMats = []           // filled when his model loads
let _charRoot = null               // his model (hidden outright once faded, shadow and all)
// The telescope stands between the camera and the whiteboard on narrow
// screens, where the board shot is head-on, so it fades out for the board's
// close-up and back in after (it stays part of the meadow otherwise).
let scopeFade = 1, scopeFadeTo = 1
const _scopeMats = []
let _scopeRoot = null
function updateScopeFade(dt) {
  if (scopeFade === scopeFadeTo || !_scopeRoot) return
  scopeFade += (scopeFadeTo - scopeFade) * Math.min(1, dt * 7)
  if (Math.abs(scopeFade - scopeFadeTo) < 0.01) scopeFade = scopeFadeTo
  for (const m of _scopeMats) { m.transparent = scopeFade < 1; m.opacity = scopeFade; m.depthWrite = scopeFade > 0.6 }
  _scopeRoot.visible = scopeFade > 0.02
}

function updateCharFade(dt) {
  if (charFade === charFadeTo) return
  charFade += (charFadeTo - charFade) * Math.min(1, dt * 7)
  if (Math.abs(charFade - charFadeTo) < 0.01) charFade = charFadeTo
  for (const m of _charFadeMats) { m.transparent = charFade < 1; m.opacity = charFade; m.depthWrite = charFade > 0.6 }
  if (_charRoot) _charRoot.visible = charFade > 0.02
}

function openCloseUp(which) {
  const prop = cuProp(which)
  if (!prop || closeUpActive) return
  closeUpActive = true
  closeUpWhich = which
  syncOverlayInputGate()
  const quick = reducedMotion
  camSystem.setShot(() => closeUpShot(closeUpWhich), quick ? 0.01 : 0.9)
  charFadeTo = 0
  if (which === 'board') scopeFadeTo = 0
  setTimeout(() => { if (closeUpActive && closeUpWhich === which) closeUp.open(which) }, quick ? 0 : 560)
}

function exitCloseUp() {
  const playing = closeUp.playingId
  closeUp.close()
  camSystem.clearShot(reducedMotion ? 0.01 : 0.7)
  charFadeTo = 1
  scopeFadeTo = 1
  setTimeout(() => {
    closeUpActive = false
    closeUpWhich = null
    syncOverlayInputGate()
    // a record still playing becomes the world's: it fades as you walk away
    if (playing && audio.isPlaying(playing)) { audio.handOver('world'); worldJukebox.adopt() }
    closeUp.releaseRecord()
  }, reducedMotion ? 20 : 720)
}
closeUp.onExit = exitCloseUp
closeUp.onStudio = (open) => {
  closeUpWhich = open ? 'studio' : 'jukebox'
  camSystem.changeShot(() => closeUpShot(closeUpWhich), reducedMotion ? 0.01 : 0.6)
}
/** Play a record: the old one lifts off the platter, the new one drops on, then it plays. */
closeUp.onPlace = (rec, done) => { if (jukeboxProp) jukeboxProp.swapTo(rec.cover, done); else done() }

let _jbHeard = false   // you've stepped into the gramophone's circle (and not walked well out)
/**
 * A heightAt(x, z) for a prop: the height of the planet's surface under a
 * point in the prop's own space (props themselves don't take rays).
 */
function groundUnder(g) {
  g.updateMatrixWorld(true)
  planetGroup.updateMatrixWorld(true)
  const core = new THREE.Vector3().setFromMatrixPosition(planetGroup.matrixWorld)
  _dropRay.camera = camSystem.camera
  _dropRay.layers.enableAll()
  return (x, z) => {
    const w = g.localToWorld(new THREE.Vector3(x, 0, z))
    const dir = w.clone().sub(core).normalize()
    _dropRay.set(core.clone().addScaledVector(dir, core.distanceTo(w) + 6), dir.clone().negate())
    const hit = _dropRay.intersectObject(planetGroup, true)[0]
    return hit ? g.worldToLocal(hit.point.clone()).y : null
  }
}
/** Spin a prop about its own up axis so its front (+Z) points at the camera. */
function faceToCamera(g) {
  g.updateMatrixWorld(true)
  g.getWorldPosition(_bp)
  _bn.setFromMatrixPosition(planetGroup.matrixWorld)
  _bn.subVectors(_bp, _bn).normalize()
  _bw.subVectors(camSystem.camera.position, _bp).addScaledVector(_bn, -0)
  _bw.addScaledVector(_bn, -_bw.dot(_bn)).normalize()
  _bf.set(0, 0, 1).applyQuaternion(g.getWorldQuaternion(_bq))
  _bf.addScaledVector(_bn, -_bf.dot(_bn)).normalize()
  const angle = Math.atan2(_bn.dot(new THREE.Vector3().crossVectors(_bf, _bw)), _bf.dot(_bw))
  g.rotateY(angle)
}

/**
 * Try spots in rings around `aroundWorld` and return the one (planetGroup-
 * local, like dropOntoIsland) where a circle of `radius` lands on the island
 * most completely, keeping clear of `avoid` and of `aroundWorld` itself
 * (where you spawn), so the music starts when you walk in.
 */
function ringSpot(islandName, aroundWorld, radius, avoid = null, avoidRadius = 0) {
  const meshes = islandMeshes[islandName] || []
  if (!meshes.length) return null
  planetGroup.updateMatrixWorld(true)
  const core = new THREE.Vector3().setFromMatrixPosition(planetGroup.matrixWorld)
  const avoidAt = avoid ? avoid.getWorldPosition(new THREE.Vector3()) : null
  const onIsland = (w) => {
    const dir = w.clone().sub(core).normalize()
    _dropRay.set(core.clone().addScaledVector(dir, core.distanceTo(w) + 20), dir.clone().negate())
    _dropRay.layers.enableAll()
    const hit = _dropRay.intersectObjects(meshes, true)[0]
    return hit ? hit.point : null
  }
  const basis = (n) => {
    const t1 = new THREE.Vector3().crossVectors(n, Math.abs(n.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)).normalize()
    return [t1, new THREE.Vector3().crossVectors(n, t1)]
  }
  const n0 = aroundWorld.clone().sub(core).normalize()
  const [a1, a2] = basis(n0)
  let best = null
  for (const rr of [3.1, 3.6, 4.2]) {
    for (let k = 0; k < 16; k++) {
      const ang = (k / 16) * Math.PI * 2
      const guess = aroundWorld.clone().addScaledVector(a1, Math.cos(ang) * rr).addScaledVector(a2, Math.sin(ang) * rr)
      const at = onIsland(guess)
      if (!at) continue
      if (avoidAt && at.distanceTo(avoidAt) < radius + avoidRadius + 0.3) continue   // the two circles never touch
      if (at.distanceTo(aroundWorld) < radius + 0.5) continue   // you arrive outside the circle
      const n = at.clone().sub(core).normalize()
      const [t1, t2] = basis(n)
      let score = 0
      for (let j = 0; j < 16; j++) {
        const b = (j / 16) * Math.PI * 2
        if (onIsland(at.clone().addScaledVector(t1, Math.cos(b) * radius).addScaledVector(t2, Math.sin(b) * radius))) score++
      }
      if (!best || score > best.score) best = { score, at }
    }
  }
  if (!best) return null
  const local = planetGroup.worldToLocal(best.at.clone())
  return { position: local, normal: local.clone().normalize() }
}

/** The middle of an island, planetGroup-local. */
function islandCentreLocal(islandName) {
  const box = new THREE.Box3()
  for (const m of islandMeshes[islandName] || []) box.expandByObject(m)
  return box.isEmpty() ? null : planetGroup.worldToLocal(box.getCenter(new THREE.Vector3()))
}

/** Stand a prop on `spot` (+Y up the normal) with its front (+Z) towards `target`. */
function faceTowards(spot, target) {
  const q = new THREE.Quaternion().setFromUnitVectors(WORLD_UP, spot.normal)
  if (!target) return q
  const want = target.clone().sub(spot.position)
  want.addScaledVector(spot.normal, -want.dot(spot.normal))
  if (want.lengthSq() < 1e-4) return q
  want.normalize()
  const front = new THREE.Vector3(0, 0, 1).applyQuaternion(q)
  const angle = Math.atan2(spot.normal.dot(new THREE.Vector3().crossVectors(front, want)), front.dot(want))
  return new THREE.Quaternion().setFromAxisAngle(spot.normal, angle).multiply(q)
}

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

// --- Sky decor (critical atmosphere first; extras deferred after reveal) ---
const skyDecor = new SkyDecor(qualitySettings.skyTier)
scene.add(skyDecor.group)

// --- Island Particles ---
const islandParticles = new IslandParticles()
islandParticles.setScale(qualitySettings.particleScale)
planetGroup.add(islandParticles.group)

// Restore settings now that optional scene systems exist (avoids TDZ on skyDecor)
settingsOverlay.applyRestored()

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
    _charRoot = root
    ;(Array.isArray(c.material) ? c.material : [c.material]).forEach(mm => mm && _charFadeMats.push(mm))
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
    captureEmoteRig(root)                // the bones the About emotes pose, in their rest pose
    modelLoaded = true

    _footBones.L = root.getObjectByName('L_Foot')
    _footBones.R = root.getObjectByName('R_Foot')

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
  _jumpSounding = true
  sfx.jump()
}
let _jumpSounding = false   // a player jump is in the air (so the landing thumps)
let _teleDest     = null    // where the current warp lands (islands flown past stay quiet)
let _stepTimer    = 0       // seconds to the next footstep (stand-in character only)
let _sinceMoving  = 1       // seconds since movement input stopped

// Footsteps follow the animation, not a timer: each foot's height above the
// character's root is tracked, and a step plays on the frame the foot stops
// falling (its touchdown), as long as that's in the bottom third of its swing.
// It re-arms once the foot lifts again, so one contact is one step. The
// swing's floor and ceiling relax slowly, so walk and run each re-fit.
const _footBones = { L: null, R: null }
const _footSt    = { L: { down: true, lo: Infinity, hi: -Infinity, y: 0, falling: false },
                     R: { down: true, lo: Infinity, hi: -Infinity, y: 0, falling: false } }
const _footV     = new THREE.Vector3()
function stepFromFeet(dt, allowed, sprint) {
  for (const side of ['L', 'R']) {
    const st = _footSt[side]
    _footBones[side].getWorldPosition(_footV)
    modelGroup.worldToLocal(_footV)
    const y  = _footV.y
    const dy = y - st.y
    st.y = y
    st.lo = Math.min(y, st.lo + dt * 0.15)
    st.hi = Math.max(y, st.hi - dt * 0.15)
    const swing = st.hi - st.lo
    const wasFalling = st.falling
    st.falling = dy < -1e-4
    if (swing < 0.04) { st.down = true; continue }     // standing still
    if (!st.down && wasFalling && !st.falling && y < st.lo + swing * 0.35) {
      st.down = true
      if (allowed) sfx.footstep(activeIslandName, sprint, side === 'L' ? -1 : 1)
    } else if (st.down && y > st.lo + swing * 0.45) {
      st.down = false
    }
  }
}

// ─── Shared "open island panel" logic ────────────────────────────────────────
function openIslandPanel() {
  if (islandUIState !== 'near' || !activeIslandName) return
  islandUIState = 'detail'
  ui.hidePopup()

  if (activeIslandName === 'meadow_island') {
    sfx.open('card', 'meadow_island')
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

    // 2. Camera starts zooming in immediately (same frame as the jump). If a
    //    hop from the night shell is still easing the camera back, finish that
    //    first so the About zoom saves the real resting distance.
    if (_distRestoreTo != null) {
      gsap.killTweensOf(camSystem, '_distTarget')
      camSystem._distTarget = _distRestoreTo
      _distRestoreTo = null
    }
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

      _aboutBaseY = modelGroup.position.y
      refreshAboutCards()
      aboutOverlay.open()
      // Lights come on only now — after he's up at the top, not on E press
      aboutLightsOn = true
    }, 360)

    return
  }

  ui.openPanel(ISLANDS[activeIslandName], activeIslandName)
}

function closeIslandPanel() {
  if (islandUIState !== 'detail') return
  islandUIState = 'near'
  ui.closePanel()
  if (activeIslandName) ui.showPopup(ISLANDS[activeIslandName], activeIslandName)
}

// ─── Hopping between islands from inside a panel (‹ › and arrow keys) ───────
// The order walks the planet: start at the meadow, then always step to the
// nearest island not yet in the list, so › is a short hop to a neighbour and
// the "02 / 06" label counts the same way you'd walk it.
let HOP_ORDER  = []
let _hopTarget = null
let _hopLandedAt = 0   // when the hop's teleport finished; 0 while still flying
function computeHopOrder() {
  const left = ISLAND_NAMES.filter(n => islandDirs[n])
  if (!left.length) return
  const order = [left.includes('meadow_island') ? 'meadow_island' : left[0]]
  left.splice(left.indexOf(order[0]), 1)
  while (left.length) {
    const from = islandDirs[order[order.length - 1]]
    let best = 0
    for (let i = 1; i < left.length; i++) {
      if (islandDirs[left[i]].dot(from) > islandDirs[left[best]].dot(from)) best = i
    }
    order.push(left.splice(best, 1)[0])
  }
  HOP_ORDER = order
  ui.setIslandOrder(order)
}

function hopIsland(dir) {
  if (islandUIState !== 'detail' || isTeleporting || !HOP_ORDER.includes(activeIslandName)) return
  islandUIState = 'near'
  ui.closePanel()
  hopFrom(activeIslandName, dir)
}

/** Teleport to the island after (dir 1) or before (dir -1) `from` and open it on landing. */
function hopFrom(from, dir) {
  const i = HOP_ORDER.indexOf(from)
  if (i < 0 || isTeleporting || HOP_ORDER.length < 2) return
  const next = HOP_ORDER[(i + dir + HOP_ORDER.length) % HOP_ORDER.length]
  _hopTarget   = next
  _hopLandedAt = 0
  startTeleport(next)
}

// ── About: Character Select ─────────────────────────────────────────────────
// Emotes, posed in code. The clips that came with the rig are long idle variations (one runs 17
// seconds before anything happens), not gestures, so a wave, a nod, a jump and a cheer are done here:
// each one aims a few bones along a direction in the world, so nothing depends on the rig's own axes,
// and eases in and out of his rest pose.
let _aboutBaseY = 0          // his height while About holds him (set as it opens)
const _emoRest = new Map()   // bone -> its rest quaternion
let _emoBones = null
const _emo = { key: null, t: 0 }
const EMOTE_LEN = { wave: 1.9, nod: 1.1, jump: 0.75, cheer: 1.7 }
function captureEmoteRig(root) {
  const g = (n) => root.getObjectByName(n)
  const b = { rUp: g('R_Upperarm'), rFore: g('R_Forearm'), rHand: g('R_Hand'), lUp: g('L_Upperarm'), lFore: g('L_Forearm'), lHand: g('L_Hand'), head: g('Head') }
  if (Object.values(b).some(x => !x)) { if (import.meta.env.DEV) console.warn('[about] emote bones not found on this rig'); return }
  for (const bone of [b.rUp, b.rFore, b.lUp, b.lFore]) _emoRest.set(bone, bone.quaternion.clone())
  _emoBones = b
}
function aboutEmote(name) {
  if (!aboutOverlay.isOpen() || !presentationMode || !modelLoaded || !_emoBones) return
  endAboutEmote()
  _emo.key = name
  _emo.t = 0
  if (name === 'jump' || name === 'cheer') {
    const h = name === 'jump' ? 0.5 : 0.22
    gsap.killTweensOf(modelGroup.position)
    modelGroup.position.y = _aboutBaseY
    sfx.jump()
    gsap.timeline({ delay: name === 'cheer' ? 0.18 : 0 })
      .to(modelGroup.position, { y: _aboutBaseY + h, duration: 0.24, ease: 'power2.out' })
      .to(modelGroup.position, { y: _aboutBaseY, duration: 0.3, ease: 'power2.in', onComplete: () => sfx.land('meadow_island') })
      .to(modelGroup.position, { y: _aboutBaseY + h * 0.14, duration: 0.09, ease: 'power1.out' })
      .to(modelGroup.position, { y: _aboutBaseY, duration: 0.1, ease: 'power1.in' })
  }
}
/** Arms back to rest, at the end of an emote or when About closes on one. */
function endAboutEmote() {
  if (!_emo.key) return
  _emo.key = null
  for (const [bone, q] of _emoRest) bone.quaternion.copy(q)
  if (IS_TOUCH && _emoBones && _aboutBase.head) _emoBones.head.rotation.x = _aboutBase.head.x
}
const _eA = new THREE.Vector3(), _eB = new THREE.Vector3(), _eDir = new THREE.Vector3()
const _eSide = new THREE.Vector3(), _eFwd = new THREE.Vector3()
const _eQ = new THREE.Quaternion(), _eQ2 = new THREE.Quaternion(), _eQ3 = new THREE.Quaternion()
/** Turn `bone` so that the line from it to `child` lies along `dir` (a world direction), `w` of the way from its rest pose. */
function aimBone(bone, child, dir, w) {
  bone.quaternion.copy(_emoRest.get(bone))
  bone.updateWorldMatrix(true, true)
  bone.getWorldPosition(_eA)
  child.getWorldPosition(_eB)
  _eB.sub(_eA).normalize()
  _eQ.setFromUnitVectors(_eB, _eDir.copy(dir).normalize())      // the turn, in the world
  bone.getWorldQuaternion(_eQ2)
  _eQ.multiply(_eQ2)                                            // where that leaves the bone, in the world
  bone.parent.getWorldQuaternion(_eQ3).invert()
  _eQ3.multiply(_eQ)                                            // and in its parent's space
  bone.quaternion.slerp(_eQ3, w)
}
const _eUp = new THREE.Vector3(0, 1, 0)
const smooth = (x) => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x) }
function tickAboutEmote(dt) {
  if (!_emo.key || !_emoBones) return
  const b = _emoBones, len = EMOTE_LEN[_emo.key] || 1.5
  _emo.t += dt
  const t = _emo.t
  if (t >= len || !aboutOverlay.isOpen()) { endAboutEmote(); return }
  const w = smooth(t / 0.22) * smooth((len - t) / 0.3)          // in over 0.22 s, out over 0.3 s

  // his own right and forward, from where his shoulders are right now
  for (const [bone, q] of _emoRest) bone.quaternion.copy(q)
  b.rUp.updateWorldMatrix(true, false); b.lUp.updateWorldMatrix(true, false)
  b.rUp.getWorldPosition(_eA); b.lUp.getWorldPosition(_eB)
  _eSide.subVectors(_eA, _eB).normalize()                       // towards his right hand
  _eFwd.crossVectors(_eUp, _eSide).normalize()                  // the way he's facing
  const dir = (s, u, f) => new THREE.Vector3().addScaledVector(_eSide, s).addScaledVector(_eUp, u).addScaledVector(_eFwd, f)

  if (_emo.key === 'wave') {
    // right arm up and out, the forearm swinging side to side from the elbow
    aimBone(b.rUp, b.rFore, dir(0.85, 0.5, 0.25), w)
    aimBone(b.rFore, b.rHand, dir(0.12 + Math.sin(t * 15) * 0.5, 1, 0.2), w)
  } else if (_emo.key === 'cheer') {
    // both arms up in a V, pumping
    const pump = Math.sin(t * 13) * 0.1
    aimBone(b.rUp, b.rFore, dir(0.6, 0.8 + pump, 0.12), w)
    aimBone(b.rFore, b.rHand, dir(0.28, 1, 0.08), w)
    aimBone(b.lUp, b.lFore, dir(-0.6, 0.8 + pump, 0.12), w)
    aimBone(b.lFore, b.lHand, dir(-0.28, 1, 0.08), w)
  } else if (_emo.key === 'jump') {
    // arms swing out and up with the hop
    aimBone(b.rUp, b.rFore, dir(0.8, 0.5, 0.25), w)
    aimBone(b.rFore, b.rHand, dir(0.55, 0.85, 0.2), w)
    aimBone(b.lUp, b.lFore, dir(-0.8, 0.5, 0.25), w)
    aimBone(b.lFore, b.lHand, dir(-0.55, 0.85, 0.2), w)
  } else if (_emo.key === 'nod') {
    // two nods, on top of wherever the pointer has his head (the tracking set it just before this)
    const nod = Math.max(0, Math.sin(t / len * Math.PI * 4)) * 0.34 * w      // down is negative on this rig (the same way the pointer tips his head)
    if (IS_TOUCH && _aboutBase.head) b.head.rotation.x = _aboutBase.head.x - nod
    else b.head.rotation.x -= nod
  }
}
/** Where his head is on screen: the little "talking" dots sit beside it. */
const _aboutHeadV = new THREE.Vector3()
function tickAboutAnchor() {
  if (_aboutBones.head) { _aboutBones.head.getWorldPosition(_aboutHeadV); _aboutHeadV.y += 0.14 }
  else { modelGroup.getWorldPosition(_aboutHeadV); _aboutHeadV.y += 1.9 }
  const up = _aboutHeadV.y
  _aboutHeadV.project(camSystem.camera)
  const x = (_aboutHeadV.x * 0.5 + 0.5) * window.innerWidth, y = (-_aboutHeadV.y * 0.5 + 0.5) * window.innerHeight
  // the top of his hair, the same way (the bubble sits above it on phones)
  _aboutHeadV.unproject(camSystem.camera); _aboutHeadV.y = up + 0.5; _aboutHeadV.project(camSystem.camera)
  aboutOverlay.setAnchor(x, y, (-_aboutHeadV.y * 0.5 + 0.5) * window.innerHeight)
}
/** The quest log and the music card, as things stand right now. */
function refreshAboutCards() {
  const order = HOP_ORDER.length ? HOP_ORDER : ISLAND_NAMES
  aboutOverlay.setQuests(order.map(name => ({
    name, title: ISLANDS[name].section, where: ISLANDS[name].name, color: ISLANDS[name].color,
    found: visitedIslands.has(name), here: name === 'meadow_island',
  })))
  syncAboutMusic()
}
/** A quest was pressed: close About, let him drop, then warp there and open it. */
function warpFromAbout(name) {
  if (_aboutHopPending || !aboutOverlay.isOpen() || !islandDirs[name]) return
  _aboutHopPending = true
  aboutOverlay.close()
  setTimeout(() => {
    _aboutHopPending = false
    _hopTarget   = name
    _hopLandedAt = 0
    startTeleport(name)
  }, reducedMotion ? 380 : 680)
}
// Now playing: one of the Jukebox's own records, played here at a gentle level.
const ABOUT_OWNER = 'about'
let _aboutTrack = 0
function syncAboutMusic() {
  aboutOverlay.setMusic({ title: HOUSE_LOOPS[_aboutTrack].title, playing: audio.isPlaying(ABOUT_OWNER), soundOn: audio.soundOn })
}
async function aboutMusic(action) {
  const wasPlaying = audio.isPlaying(ABOUT_OWNER)
  if (action === 'next') _aboutTrack = (_aboutTrack + 1) % HOUSE_LOOPS.length
  if (action === 'toggle' && wasPlaying) { audio.stop(ABOUT_OWNER); audio.setLevel(audio.fullLevel); syncAboutMusic(); return }
  if (action === 'next' && !wasPlaying) { sfx.click(); syncAboutMusic(); return }      // nothing on: just flip to the next record
  const pattern = await fetchPattern(HOUSE_LOOPS[_aboutTrack])
  if (pattern && aboutOverlay.isOpen()) { audio.setLevel(0.55, true); audio.play(pattern, ABOUT_OWNER) }
  syncAboutMusic()
}

// The About screen (meadow) has its own chrome, so it hops through here: close
// it, let the character's drop finish (onStartClose: 200 ms + 400 ms turn),
// then fly on.
let _aboutHopPending = false
function hopFromAbout(dir) {
  if (_aboutHopPending || !aboutOverlay.isOpen()) return
  _aboutHopPending = true
  aboutOverlay.close()
  setTimeout(() => {
    _aboutHopPending = false
    hopFrom('meadow_island', dir)
  }, reducedMotion ? 380 : 680)
}

/** Called every frame: once a hop's teleport lands, open the island it landed on. */
function tickHop() {
  if (!_hopTarget || isTeleporting) return
  if (!_hopLandedAt) _hopLandedAt = performance.now()
  if (activeIslandName === _hopTarget && islandUIState === 'near' && !isAnyOverlayOpen()) {
    _hopTarget = null
    openIslandPanel()
  } else if (performance.now() - _hopLandedAt > 1500) {
    _hopTarget = null   // landed somewhere unexpected; just leave the player there
    if (activeIslandName && islandUIState === 'near') ui.showPopup(ISLANDS[activeIslandName], activeIslandName)
  }
}

// World-side half of each panel shell (the DOM half lives in ui/panelShells.js).
//   frost  the world slides left so the planet stays in view beside the pane
//   night  the camera pulls far back so the planet shrinks into space
//   eruption the ground gives a short shake as the embers burst
const _viewShift = { x: 0, appliedX: 0, w: 0, h: 0 }
let _nightSavedDist = null
let _distRestoreTo  = null   // where a closing night shell is still easing the camera back to
function applyViewShift() {
  const cam = camSystem.camera
  const w = window.innerWidth, h = window.innerHeight
  const x = Math.round(_viewShift.x * 10) / 10
  if (x === _viewShift.appliedX && w === _viewShift.w && h === _viewShift.h) return
  _viewShift.appliedX = x; _viewShift.w = w; _viewShift.h = h
  if (Math.abs(x) < 0.5) cam.clearViewOffset()
  else cam.setViewOffset(w, h, x, 0, w, h)
}
function shellWorldFx(phase, shell, card) {
  const open = phase === 'open'
  if (open) sfx.open(shell, activeIslandName)
  else      sfx.close(shell, activeIslandName)
  if (shell === 'frost') {
    // Centre the planet in the space the pane leaves free (desktop only).
    let target = 0
    if (open && window.innerWidth > 640) {
      const r = card.getBoundingClientRect()
      target = Math.max(0, (window.innerWidth - r.left) / 2)
    }
    gsap.to(_viewShift, {
      x: target,
      duration: reducedMotion ? 0 : (open ? 0.85 : 0.55),
      ease: open ? 'power3.out' : 'power2.inOut',
      overwrite: true,
    })
  } else if (_viewShift.x !== 0) {
    gsap.to(_viewShift, { x: 0, duration: reducedMotion ? 0 : 0.5, ease: 'power2.inOut', overwrite: true })
  }

  if (shell === 'night') {
    if (open) {
      if (_nightSavedDist == null) _nightSavedDist = camSystem._distTarget
      gsap.to(camSystem, { _distTarget: 58, duration: reducedMotion ? 0 : 1.3, ease: 'power2.inOut', overwrite: true })
    } else if (_nightSavedDist != null) {
      _distRestoreTo = _nightSavedDist
      gsap.to(camSystem, {
        _distTarget: _nightSavedDist, duration: reducedMotion ? 0 : 0.9, ease: 'power2.out', overwrite: true,
        onComplete: () => { _distRestoreTo = null },
      })
      _nightSavedDist = null
    }
  }

  if (shell === 'eruption' && open && !reducedMotion) {
    const cv = document.getElementById('canvas')
    cv?.animate([
      { transform: 'translate(0, 0)' },
      { transform: 'translate(-3px, 2px)' },
      { transform: 'translate(3px, -1px)' },
      { transform: 'translate(-2px, 1px)' },
      { transform: 'translate(1px, 0)' },
      { transform: 'translate(0, 0)' },
    ], { duration: 340, delay: 140, easing: 'linear' })
  }
}

// ─── Opening whatever point of interest you're standing next to ─────────────
function openPoi(poi = activePoi) {
  if (!poi || isAnyOverlayOpen() || ui.isPanelOpen()) return
  poi.found = true
  poi.marker.setDiscovered(true)
  _subPromptPoi = null
  ui.hideSubPopup()
  poi.open()
}

// Popup tap / click callback (works for both mouse and touch)
ui.onPopupTap    = openIslandPanel
ui.onSubPopupTap = () => openPoi()

if (import.meta.env.DEV) {
  // Dev-only probe for tuning the poi triggers. Stripped from the build.
  window.__ew = {
    get island() { return activeIslandName },
    get near()   { return activePoi?.key ?? null },
    get pois() {
      return POIS.map(p => ({
        key:    p.key,
        island: p.island,
        range:  +p.range.toFixed(2),
        dist:   +p.marker.distanceTo(modelGroup.position).toFixed(2),
        near:   p.near,
        found:  p.found,
      }))
    },
    // Force one open without walking to it: __ew.openPoi('wall')
    openPoi: (key) => openPoi(POIS.find(p => p.key === key)),
    // Warp to an island and open its panel: __ew.dive('lava_island')
    dive: (name) => {
      closeAnyOpenOverlay()
      if (islandUIState === 'detail') { islandUIState = 'near'; ui.closePanel() }
      if (activeIslandName === name) { openIslandPanel(); return }
      _hopTarget = name
      _hopLandedAt = 0
      startTeleport(name)
    },
    hop: (dir) => hopIsland(dir),
    sfx,
    worldJukebox,
    get jukebox() { return jukeboxProp },
    get me() { return modelGroup.position },
    get audioOwner() { return audio.owner },
    feet: () => ({ L: { ..._footSt.L }, R: { ..._footSt.R } }),
    get order() { return HOP_ORDER.slice() },
    // for taking pictures of the world: the scene, the camera, his model
    get scene() { return scene },
    get camera() { return camSystem.camera },
    get char() { return _charRoot },
    get cam() { return camSystem },
    get THREE() { return THREE },
    // Pip, for testing: __ew.pip.goto(1) turns the planet so hiding spot 1 is under you,
    // __ew.pip.here() puts its mound beside you, __ew.pip.forget() starts the hunt over
    pip: {
      get state() { return { caught: pipCaught, friend: pipFriend, spots: pipSpots.length, spot: pipSpot, near: !!pipPoi?.near, busy: !!pip?.busy } },
      get group() { return pip?.group },
      goto(i) {
        const w = planetGroup.localToWorld(pipSpots[i].position.clone()).normalize()
        planetGroup.quaternion.premultiply(new THREE.Quaternion().setFromUnitVectors(w, WORLD_UP))
      },
      here() {
        const spot = surfaceAt(ARCTIC_ISLAND, modelGroup.position.clone().add(new THREE.Vector3(1.25, 0, 0.5)))
        if (!spot) return false
        pipSpots.push(spot); placePip(pipSpots.length - 1); pip.reset()
        return true
      },
      catch: () => catchPip(),
      forget() { try { localStorage.removeItem(PIP_KEY) } catch { /* fine */ } },
    },
  }
}
// ✕ / backdrop click inside the world panel → run the canonical close so
// islandUIState resyncs and the approach prompt returns.
ui.onClosePanel = closeIslandPanel
ui.onHop        = hopIsland
aboutOverlay.onHop = hopFromAbout
aboutOverlay.onEmote = aboutEmote
aboutOverlay.onWarp  = warpFromAbout
aboutOverlay.onMusic = aboutMusic
aboutOverlay.onBlip  = (ch) => sfx.talk(ch)
ui.onShell      = shellWorldFx

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

  if (aboutOverlay.isOpen() && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
    e.preventDefault()
    hopFromAbout(e.key === 'ArrowLeft' ? -1 : 1)
    return
  }
  // About: keys 1 to 4 are his emotes, Space or Enter makes him talk (unless a button has the focus)
  if (!e.ctrlKey && !e.metaKey && !e.altKey && aboutOverlay.key(e.key)) { e.preventDefault(); return }
  if (aboutOverlay.isOpen() && (e.key === ' ' || e.key === 'Enter') && !t?.closest?.('button, a')) { e.preventDefault(); aboutOverlay.talk(); return }

  if (isAnyOverlayOpen()) return  // suppress gameplay keys while a modal is up

  if (islandUIState === 'detail' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.defaultPrevented) {
    const content = document.getElementById('wp-content')
    if (!content || !content.contains(document.activeElement)) {
      e.preventDefault()
      hopIsland(e.key === 'ArrowLeft' ? -1 : 1)
      return
    }
  }

  if (key === 'e') {
    if (islandUIState === 'detail') closeIslandPanel()
    else { ui.pressPopup(); openIslandPanel() }
  }
  // F opens whatever point of interest you're standing next to
  if (key === 'f') { ui.pressSubPopup(); openPoi() }
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

// ─── Arrival / reveal choreography (readiness owned by LoadDirector above) ───
let wasCharReveal = false
/** Teleport-in intro: -1 idle, else seconds elapsed while playing */
let teleportInAge = -1
const TELEPORT_IN_SEC = 0.82

function easeOutBack(t) {
  const c1 = 1.60158
  const c3 = c1 + 1
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
}

const LDR_ARRIVE_SPEED = 55

/** True while warmPlayView owns the camera/renders (loading animate must not fight it). */
let _warmingPlay = false
let _playWarmStarted = false
/** Bumped to cancel an in-flight warm after a deadline. */
let _playWarmToken = 0
/** Delay deferred BVH / sky until intro zoom has settled. */
let _postIntroDeferredDone = false
let _introOverlayOpened = false
/** @type {number[]|null} */
let _introFrameSamples = null
let _introFrameLogged = false

function tryBeginReveal() {
  if (_revealScheduled || loadDirector?.isFatal) return
  if (!loadDirector?.isReady || !_arrivalDone) return
  _revealScheduled = true

  // Let any run of pops still sounding finish before the welcome.
  const dwell = Math.max(loadDirector.minDwellMs, _popClock - performance.now() + 120)
  const start = () => {
    if (sfx.live) { _welcomed = true; sfx.welcome() }
    loadDirector.beginReveal()
    startScene()
  }
  if (dwell > 0) setTimeout(start, dwell)
  else start()
}

/**
 * Warm character shaders + play-camera shadow maps UNDER the loader so the
 * post-100% zoom is just a camera lerp (no compile/shadow first-hit spike).
 * Renders into an offscreen target so the settled arrival frame stays on screen
 * (no canvas hide / camera jump flash).
 * @param {number} warmToken invalidated if a deadline aborts the warm
 */
async function warmPlayView(warmToken) {
  if (!planetModel || loadDirector?.isFatal) return
  _warmingPlay = true
  loadDirector?.beginWarmingPlay()
  perfMark('play_warm_start')

  const stillActive = () => warmToken === _playWarmToken && !loadDirector?.hasPlayWarmed

  // Let the arrival settle paint before we hitch the main thread
  await yieldToMain()
  if (!stillActive()) {
    _warmingPlay = false
    return
  }

  planetModel.visible = true

  // Approximate play orbit (matches Camera.js DIST / PITCH_DEF / character pivot)
  const charY = PLANET_RADIUS + 0.9
  const pitch = 0.38
  const dist = 16
  const hDist = Math.cos(pitch) * dist
  const vDist = Math.sin(pitch) * dist
  const pivotY = charY + 0.75
  camSystem.camera.position.set(0, pivotY + vDist, hDist)
  camSystem.camera.lookAt(0, pivotY, 0)
  camSystem.camera.updateMatrixWorld(true)
  planetGroup.updateMatrixWorld(true)

  // Pose character at play height so shadow/compile warm matches gameplay
  const charWorldY = PLANET_RADIUS + 0.9
  character.group.position.set(0, charWorldY, 0)
  modelGroup.position.set(0, charWorldY, 0)

  // Headless/automation: rAF is starved and full shadow compiles can hang —
  // do a minimal warm so Ready isn't blocked (real browsers take the full path).
  const lightWarm = reducedMotion || !!navigator.webdriver

  // Keep character visible for shadow-map fills
  if (fbxInScene) {
    modelGroup.visible = true
    character.group.visible = false
  } else {
    modelGroup.visible = false
    character.group.visible = true
  }

  // Offscreen: shadow maps still update; the on-screen canvas keeps the last
  // arrival frame (no blank flash from hiding the canvas).
  const warmRT = new THREE.WebGLRenderTarget(4, 4)
  renderer.setRenderTarget(warmRT)
  lighting.sunLight.intensity = 4.0

  try {
    if (stillActive() && !lightWarm) {
      if (fbxInScene && _charGpuPrewarmStage < 2) {
        prewarmCharacterDraw(true)
        _charGpuPrewarmStage = 2
      } else if (!fbxInScene && _charGpuPrewarmStage < 1) {
        prewarmCharacterDraw(false)
        _charGpuPrewarmStage = 1
      }
      try {
        renderer.compile(scene, camSystem.camera)
      } catch (err) {
        console.warn('Play-view compile warning:', err)
      }
    } else if (stillActive() && lightWarm) {
      _charGpuPrewarmStage = fbxInScene ? 2 : 1
    }

    const warmPasses = lightWarm ? 1 : 3
    for (let i = 0; i < warmPasses && stillActive(); i++) {
      renderer.render(scene, camSystem.camera)
      await yieldToMain()
      if (stillActive()) renderer.setRenderTarget(warmRT)
    }
  } finally {
    renderer.setRenderTarget(null)
    warmRT.dispose()
    lighting.sunLight.intensity = 0
    character.group.visible = false
    modelGroup.visible = false
    // Restore loading camera without redrawing — screen still shows settled globe
    camSystem.setLoadingView()
  }

  if (stillActive()) {
    perfMark('play_warm_end')
    perfMeasure('play_warm_gpu', 'play_warm_start', 'play_warm_end')
  }
  if (warmToken === _playWarmToken) _warmingPlay = false
}

/** After planet arrival + first frame: warm play view, then Ready → reveal. */
async function maybeStartPlayWarm() {
  if (_playWarmStarted || loadDirector?.isFatal) return
  if (!_arrivalDone) return
  if (!loadDirector?.hasFirstFrame) return
  if (loadDirector?.hasPlayWarmed) {
    tryBeginReveal()
    return
  }
  _playWarmStarted = true
  const warmToken = ++_playWarmToken
  if (import.meta.env.DEV || new URLSearchParams(window.location.search).has('perf')) {
    console.log('[load] play warm start')
  }
  // Safety net if GPU warm hangs (should be rare outside headless)
  const warmMs = reducedMotion || navigator.webdriver ? 3000 : 20000
  const warmDeadline = new Promise(resolve => setTimeout(resolve, warmMs))
  try {
    await Promise.race([warmPlayView(warmToken), warmDeadline])
    if (!loadDirector?.hasPlayWarmed) {
      console.warn('[load] play warm deadline — continuing')
      _playWarmToken++
      _warmingPlay = false
      lighting.sunLight.intensity = 0
      renderer.setRenderTarget(null)
      camSystem.setLoadingView()
    }
    loadDirector?.markPlayWarmed()
    loadDirector?.flush?.()
  } catch (err) {
    console.error('Play warm failed:', err)
    _playWarmToken++
    _warmingPlay = false
    lighting.sunLight.intensity = 0
    renderer.setRenderTarget(null)
    camSystem.setLoadingView()
    // Don't block forever — mark warmed so reveal can proceed
    loadDirector?.markPlayWarmed()
  }
  tryBeginReveal()
}

// Called when world.glb finishes compile. Planet eases in from off-screen right.
function triggerArrival(model) {
  const hadFlybys = loaderFlybys.flushOut()
  const baseX = model.position.x

  const finishArrival = () => {
    if (_arrivalDone) return
    _arrivalDone = true
    if (import.meta.env.DEV || new URLSearchParams(window.location.search).has('perf')) {
      console.log('[load] arrival done → play warm')
    }
    // Next frame: let the centered globe paint before GPU warm hitches the thread
    requestAnimationFrame(() => maybeStartPlayWarm())
  }

  if (reducedMotion) {
    loaderFlybys.clear()
    model.position.x = baseX
    model.rotation.y = 0
    model.visible = true
    finishArrival()
    return
  }

  const viewH = Math.max(1, window.innerHeight || 1)
  const viewW = Math.max(1, window.innerWidth || 1)
  const halfH = Math.tan(THREE.MathUtils.degToRad(camSystem.camera.fov) / 2) * camSystem.camera.position.z
  const halfW = halfH * (viewW / viewH)
  const startX = baseX + (Number.isFinite(halfW) ? halfW : 40) + 30
  // Park off-screen BEFORE making visible — never show a centered pop-in.
  model.position.x = startX
  model.rotation.y = -0.45
  model.visible = true

  const dist       = Math.max(0.01, startX - baseX)
  const settleDist = dist * 0.18
  const dLinear    = Math.min(8, Math.max(0.05, (dist - settleDist) / LDR_ARRIVE_SPEED))
  const dSettle    = Math.min(4, Math.max(0.05, (2 * settleDist) / LDR_ARRIVE_SPEED))

  const delay = hadFlybys ? 0.25 : 0
  const tl = gsap.timeline({ delay, onComplete: finishArrival })
  tl.to(model.position, { x: baseX + settleDist, duration: dLinear, ease: 'none' }, 0)
    .to(model.position, { x: baseX,              duration: dSettle, ease: 'power2.out' })
  tl.to(model.rotation, { y: 0, duration: dLinear + dSettle, ease: 'sine.out' }, 0)
  // Failsafe outside GSAP — never block Ready if the tween stalls
  setTimeout(() => {
    if (!_arrivalDone) {
      console.warn('[load] arrival failsafe')
      model.position.x = baseX
      model.rotation.y = 0
      finishArrival()
    }
  }, Math.ceil((delay + dLinear + dSettle + 1.25) * 1000))
}

function startScene() {
  loaderFlybys.clear()
  sceneStarted = true
  loadDirector?.markLive()
  perfMark('loader_dismiss')
  perfMeasure('time_to_dismiss', 'module_eval', 'loader_dismiss')

  if (loaderEl) loaderEl.classList.add('fade-out')

  // Character + HUD reveal with the crossfade (no empty underlay)
  const hudRevealEls = [hudLeftEl, hudBtnsEl, controlsHintEl, document.getElementById('touch-controls')]
  hudRevealEls.forEach((el, i) => {
    if (el) setTimeout(() => el.classList.remove('hud-hidden'), (reducedMotion ? 80 : 200) + i * 120)
  })
  setTimeout(() => {
    if (loaderEl) loaderEl.style.display = 'none'
  }, reducedMotion ? 400 : 1400)

  // Intro overlay + deferred sky/BVH wait until zoom settles (see animate)

  // Prefetch island panel modules after reveal (eager modules → no-op today)
  const prefetch = () => { prefetchAllIslands() }
  if ('requestIdleCallback' in window) requestIdleCallback(prefetch, { timeout: 1800 })
  else setTimeout(prefetch, 800)

  if (isPerfEnabled()) setTimeout(() => perfSummary(), 100)
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

let _pageHidden = document.hidden
document.addEventListener('visibilitychange', () => {
  _pageHidden = document.hidden
  if (!_pageHidden) clock.getDelta() // drop accumulated time after resume
  sfx.setHidden(_pageHidden)
})

function animate() {
  requestAnimationFrame(animate)
  if (_pageHidden || loadDirector?.isFatal) return

  const dt = Math.min(clock.getDelta(), 0.05)
  time += dt

  // Pause input the moment any overlay opens/closes
  syncOverlayInputGate()

  if (!sceneStarted) {
    _loaderElapsed += dt
    // Soft download fallback when Content-Length is missing (never reaches 100 alone)
    loadDirector?.nudgeDownloadFallback(_loaderElapsed)
    loadDirector?.tick(dt)

    // warmPlayView owns camera + renders — don't overwrite mid-warm
    if (_warmingPlay) return

    if (!(import.meta.env.DEV && window.location.search.includes('screenshot'))) {
      character.group.visible = false
      modelGroup.visible = false
    }
    loaderFlybys.update(dt, reducedMotion)
    renderer.render(scene, camSystem.camera)

    if (_pendingMeaningfulFrame && planetModel && canvas.clientWidth > 0) {
      _pendingMeaningfulFrame = false
      loadDirector?.markFirstMeaningfulFrame()
      maybeStartPlayWarm()
    }
    return
  }

  scenePlayTime += dt
  loadDirector?.tick(dt)

  // ?perf=1: sample frame times for the first second after reveal
  if (isPerfEnabled() && scenePlayTime <= 1.05) {
    if (!_introFrameSamples) _introFrameSamples = []
    _introFrameSamples.push(dt * 1000)
    if (scenePlayTime > 1 && !_introFrameLogged) {
      _introFrameLogged = true
      const arr = _introFrameSamples
      const max = Math.max(...arr)
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length
      console.log(`[perf] first_1s_frames: n=${arr.length} avg=${avg.toFixed(1)}ms max=${max.toFixed(1)}ms`)
    }
  }

  // Adaptive DPR (auto quality only): ease toward 1 if frames are heavy
  if (_adaptiveDprEnabled && qualitySettings.preset === 'auto') {
    _adaptiveFrameTotal += dt * 1000
    _adaptiveFrameSamples++
    if (_adaptiveFrameSamples >= ADAPTIVE_DPR_SAMPLES) {
      const avg = _adaptiveFrameTotal / _adaptiveFrameSamples
      _adaptiveFrameSamples = 0
      _adaptiveFrameTotal = 0
      const target = avg > ADAPTIVE_DPR_BUDGET_MS
        ? Math.max(ADAPTIVE_DPR_MIN, _currentDpr - 0.15)
        : Math.min(qualitySettings.dpr, _currentDpr + 0.05)
      if (Math.abs(target - _currentDpr) > 0.04) {
        _currentDpr = target
        renderer.setPixelRatio(_currentDpr)
      }
    }
  }

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
      if (_jumpSounding) { _jumpSounding = false; sfx.land(activeIslandName) }
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
    tickAboutEmote(dt)
  } else {
    // Procedural fallback while GLB/FBX loads
    character.update(dt, moving, time, !isGrounded)
  }

  // ── Sound: a footstep the moment a foot touches down, ambience ducking ──
  const canStep = isGrounded && !isTeleporting && !uiLocked && !presentationMode
  _sinceMoving = moving ? 0 : _sinceMoving + dt
  if (_footBones.L && _footBones.R && modelLoaded) {
    // the last step as he stops still lands, so allow a beat after letting go
    stepFromFeet(dt, canStep && _sinceMoving < 0.35, sprint)
  } else if (moving && canStep) {
    // procedural stand-in character (model still loading): plain cadence
    _stepTimer -= dt
    if (_stepTimer <= 0) {
      sfx.footstep(activeIslandName, sprint)
      _stepTimer = sprint ? 0.27 : 0.38
    }
  } else {
    _stepTimer = 0.1
  }
  sfx.tick({ panelOpen: ui.isPanelOpen() || aboutOverlay.isOpen() })

  // ── Island HUD state (activeIslandName from sampleSurfaceHeight) ──
  if (islandUIState !== 'detail') {
    if (activeIslandName) {
      const isNewFind = !visitedIslands.has(activeIslandName)
      if (islandUIState !== 'near' || ui._lastIsland !== activeIslandName) {
        islandUIState    = 'near'
        ui._lastIsland   = activeIslandName
        // Mid-hop the planet spins past other islands; keep their prompts quiet
        if (!_hopTarget) {
          ui.showPopup(ISLANDS[activeIslandName], activeIslandName)
          if (!isNewFind) sfx.arrive(activeIslandName)
        }
      }
      // Track visited islands
      if (isNewFind) {
        visitedIslands.add(activeIslandName)
        // Islands a warp flies past are still marked found, but only the one
        // you land on plays its jingle.
        if (!(isTeleporting || _hopTarget) || activeIslandName === (_hopTarget || _teleDest)) {
          sfx.found(activeIslandName, visitedIslands.size, ISLAND_NAMES.length)
        }
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

  // ── Points of interest (nested prompt above the island one) ───────────────
  if (POIS.length) {
    // The character never moves in world space, the planet turns under it, so
    // a plain world-distance check is all the proximity test we need. Two props
    // on one island can overlap, so the closest one wins the prompt and the key.
    let nearest     = null
    let nearestDist = Infinity
    for (const poi of POIS) {
      const dist = poi.island === activeIslandName
        ? (poi.measure ? poi.measure() : poi.marker.distanceTo(modelGroup.position))
        : Infinity
      poi.near = dist < poi.range
      poi.marker.update(dt, poi.near, reducedMotion)
      if (poi.near && dist < nearestDist) { nearest = poi; nearestDist = dist }
    }
    activePoi = nearest
    // The gramophone's circle: step in and it plays a random loop from the
    // shelf, fading as you walk out. F opens the shelf (and stops it).
    if (jukeboxProp) {
      const d = activeIslandName === MEADOW_ISLAND
        ? jukeboxProp.group.getWorldPosition(_jbPos).distanceTo(modelGroup.position) : Infinity
      // Silent until you step inside; once in, walking out fades it over
      // about a step (0.8 units) and then it stops.
      if (d < JUKEBOX_ZONE) _jbHeard = true
      else if (d > JUKEBOX_ZONE + 0.8) _jbHeard = false
      const presence = !_jbHeard ? 0 : d < JUKEBOX_ZONE ? 1 : 1 - (d - JUKEBOX_ZONE) / 0.8
      worldJukebox.update(dt, presence, !isInputLocked() && !_pageHidden)
      jukeboxProp.update(dt, {
        playing: audio.playing, inZone: d < JUKEBOX_ZONE, near: d < JUKEBOX_ZONE * 1.4,
        reducedMotion, bpm: audio._pattern?.bpm,
      })
    }
    if (doodleBoard) {
      const db = activeIslandName === MEADOW_ISLAND
        ? doodleBoard.group.getWorldPosition(_jbPos).distanceTo(modelGroup.position) : Infinity
      doodleBoard.update(dt, reducedMotion, db < BOARD_ZONE)
    }
    if (pip && !pipFriend) {
      const awake = activeIslandName === ARCTIC_ISLAND
      let face = 0
      // it turns its face to the camera (which sits behind Eric), so whoever's playing sees its eyes, not its back
      if (awake) { pip.group.worldToLocal(_pipV.copy(camSystem.camera.position)); face = Math.atan2(_pipV.x, _pipV.z) }
      pip.update(dt, { awake, near: !!pipPoi?.near, calm: reducedMotion, face })
    }
    updateCharFade(dt)
    updateScopeFade(dt)
    // Once you're standing on Meadow, turn the props to face the camera.
    // Done here rather than at load because the planet turns after loading.
    if (activeIslandName === MEADOW_ISLAND && !isTeleporting) {
      if (doodleBoard && !doodleBoard.faced) {
        faceToCamera(doodleBoard.group)
        doodleBoard.conformRing(groundUnder(doodleBoard.group))
        doodleBoard.faced = true
      }
      if (jukeboxProp && !jukeboxProp.faced) {
        faceToCamera(jukeboxProp.group)
        jukeboxProp.conformRing(groundUnder(jukeboxProp.group))
        jukeboxProp.faced = true
      }
    }

    const wantSub = (activePoi && islandUIState === 'near' && !isInputLocked())
      ? activePoi
      : null
    if (wantSub !== _subPromptPoi) {
      _subPromptPoi = wantSub
      if (wantSub) {
        ui.showSubPopup({
          iconKey: wantSub.iconKey,
          title:   wantSub.title,
          sub:     wantSub.found ? wantSub.foundSub : wantSub.sub,
          color:   wantSub.color,
          keycap:  'F',
        })
      } else {
        ui.hideSubPopup()
      }
    }
  }

  // ── Island highlight: dim when inactive, full colour + glow when active ──
  // Throttle full mesh lerps unless the active island changed or still settling.
  const LERP_K = 3.5
  const lerpF  = 1 - Math.exp(-LERP_K * dt)
  if (activeIslandName !== _prevActiveIslandForLerp) {
    _islandLerpSettling = 0.55
    _prevActiveIslandForLerp = activeIslandName
  }
  if (_islandLerpSettling > 0) _islandLerpSettling -= dt
  if (_islandLerpSettling > 0 || _forceIslandLerp) {
    _forceIslandLerp = false
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
        if (oc) {
          m.material.color.r += (oc.r * targetBright - m.material.color.r) * lerpF
          m.material.color.g += (oc.g * targetBright - m.material.color.g) * lerpF
          m.material.color.b += (oc.b * targetBright - m.material.color.b) * lerpF
        }
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

  // While a detail panel / About is open, skip decorative GPU work so glass UI
  // isn't fighting a full sky + particle + shadow update every frame.
  const uiDetailOpen = islandUIState === 'detail' || aboutOverlay.isOpen()
  renderer.shadowMap.autoUpdate = !uiDetailOpen

  stars.update(time, 0)
  if (!uiDetailOpen) {
    if (!reducedMotion) shootingStars.update(dt)
    skyDecor.update(dt, time, reducedMotion)
    islandParticles.update(dt, activeIslandName, charWorldY, reducedMotion, islandDirs)
  }
  camSystem.update(dt, PLANET_RADIUS, charWorldY, -1, null, planetGroup, heading, moving)

  // Reveal with the loader crossfade (Ready already required a meaningful frame).
  // Camera can still be lerping in — character is visible so the scene never feels empty.
  const charReveal = sceneStarted

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

  // Character GPU warm runs under the loader (warmPlayView). Only catch a late
  // skinned-model load here — never re-compile mid zoom.
  if (planetModel && fbxInScene && _charGpuPrewarmStage < 2 && scenePlayTime > 2.5) {
    prewarmCharacterDraw(true)
    _charGpuPrewarmStage = 2
  }

  // After intro zoom settles: deferred BVH, sky extras, welcome overlay
  const introSettled =
    reducedMotion ||
    camSystem._introKBlend >= 1 ||
    scenePlayTime > 2.2
  if (introSettled && !_postIntroDeferredDone) {
    _postIntroDeferredDone = true
    scheduleDeferredBvh()
    const enableSky = () => skyDecor?.enableDeferred?.(qualitySettings.skyTier)
    if ('requestIdleCallback' in window) requestIdleCallback(enableSky, { timeout: 1500 })
    else setTimeout(enableSky, 200)
  }
  if (introSettled && !_introOverlayOpened) {
    _introOverlayOpened = true
    const returning = !!localStorage.getItem('phf-intro-seen')
    introOverlay.open(returning)
  }

  if (pip && pipFriend) tickPipFriend(dt, moving)
  tickHop()
  applyViewShift()
  if (aboutOverlay.isOpen()) tickAboutAnchor()
  renderer.render(scene, camSystem.camera)
}
animate()

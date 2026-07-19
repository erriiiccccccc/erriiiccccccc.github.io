/**
 * Readiness state machine for the loader → scene handoff.
 * Progress is weighted by real stages; 100% only when Ready.
 */

import { perfMark, perfMeasure } from './perfLog.js'

/** @typedef {'Booting'|'LoadingAssets'|'Unpacking'|'BuildingScene'|'Compiling'|'FirstFrame'|'WarmingPlay'|'Ready'|'Revealing'|'Live'|'Fatal'|'Degraded'} LoadState */

const WEIGHTS = {
  criticalCode: 0.08,
  download: 0.50,
  sceneBuilt: 0.10,
  shadersCompiled: 0.10,
  firstMeaningfulFrame: 0.08,
  playWarmed: 0.08,
  interactionShell: 0.06,
}

const STAGE_LABELS = {
  Booting: 'Starting up',
  LoadingAssets: 'Loading the world',
  Unpacking: 'Unpacking the world',
  BuildingScene: 'Building the world',
  Compiling: 'Preparing the world',
  FirstFrame: 'Lighting the stage',
  WarmingPlay: 'Settling into orbit',
  Ready: 'Ready',
  Revealing: 'Welcome in',
  Live: 'Live',
  Fatal: 'Something went wrong',
  Degraded: 'Recovering graphics',
}

const STALL_MS = 45_000
const MIN_DWELL_MS = 280

export class LoadDirector {
  /**
   * @param {{
   *   onProgress?: (p: number, label: string, state: LoadState) => void
   *   onReady?: () => void
   *   onFatal?: (message: string) => void
   *   onStateChange?: (state: LoadState) => void
   *   reducedMotion?: boolean
   * }} opts
   */
  constructor(opts = {}) {
    this.onProgress = opts.onProgress || null
    this.onReady = opts.onReady || null
    this.onFatal = opts.onFatal || null
    this.onStateChange = opts.onStateChange || null
    this.reducedMotion = !!opts.reducedMotion

    /** @type {LoadState} */
    this.state = 'Booting'
    this.fatalMessage = ''
    this.readyAt = 0
    this._downloadFrac = 0 // 0–1 of download weight
    this._flags = {
      criticalCode: false,
      criticalAssets: false,
      sceneBuilt: false,
      shadersCompiled: false,
      firstMeaningfulFrame: false,
      playWarmed: false,
      cameraPosed: false,
      interactionShell: false,
    }
    this._displayProgress = 0
    this._targetProgress = 0
    this._stallTimer = null
    this._readyFired = false
    this._revealStarted = false
    /** Bytes finished; GLB parse/decode still running on main thread. */
    this._awaitingParse = false

    this._armStallWatch()
    this._setState('Booting')
  }

  setReducedMotion(rm) {
    this.reducedMotion = !!rm
  }

  /** Call once WebGL renderer + shell are up. */
  markCriticalCode() {
    this._flags.criticalCode = true
    this._flags.interactionShell = true
    this._flags.cameraPosed = true
    perfMark('critical_code')
    this._setState('LoadingAssets')
    this._recompute()
  }

  /** @param {number} loaded @param {number} total */
  setDownloadProgress(loaded, total) {
    if (total > 0) {
      this._downloadFrac = Math.min(1, loaded / total)
      // Download finished → parse/decode still blocks the main thread.
      if (this._downloadFrac >= 1 && !this._flags.criticalAssets) {
        this._awaitingParse = true
        this._setState('Unpacking')
      }
    }
    this._recompute()
    this._armStallWatch()
  }

  /** Timed fallback when Content-Length is missing (never reaches Ready alone). */
  nudgeDownloadFallback(elapsedSec) {
    const soft = 1 - Math.exp(-elapsedSec * 0.12)
    this._downloadFrac = Math.max(this._downloadFrac, Math.min(0.85, soft))
    this._recompute()
  }

  markWorldLoaded() {
    this._flags.criticalAssets = true
    this._downloadFrac = 1
    this._awaitingParse = false
    perfMark('world_loaded')
    perfMeasure('world_download', 'critical_code', 'world_loaded')
    this._setState('BuildingScene')
    this._recompute()
    this._armStallWatch()
  }

  markSceneBuilt() {
    this._flags.sceneBuilt = true
    perfMark('scene_built')
    perfMeasure('scene_build', 'world_loaded', 'scene_built')
    this._setState('Compiling')
    this._recompute()
  }

  markShadersCompiled() {
    this._flags.shadersCompiled = true
    perfMark('shaders_compiled')
    perfMeasure('compile', 'scene_built', 'shaders_compiled')
    this._setState('FirstFrame')
    this._recompute()
  }

  markFirstMeaningfulFrame() {
    if (this._flags.firstMeaningfulFrame) return
    this._flags.firstMeaningfulFrame = true
    perfMark('first_meaningful_frame')
    perfMeasure('first_frame', 'shaders_compiled', 'first_meaningful_frame')
    // Stay on FirstFrame until beginWarmingPlay() — arrival may still be finishing
    this._recompute()
    this._maybeReady()
  }

  /** Enter play warm-up (character compile + shadow fills) under the loader. */
  beginWarmingPlay() {
    if (this._flags.playWarmed) return
    this._setState('WarmingPlay')
    this._recompute()
    this.flush()
  }

  /** Character + play-camera shadow warm finished — last gate before Ready. */
  markPlayWarmed() {
    if (this._flags.playWarmed) return
    this._flags.playWarmed = true
    perfMark('play_warmed')
    perfMeasure('play_warm', 'first_meaningful_frame', 'play_warmed')
    this._recompute()
    this._maybeReady()
  }

  markCameraPosed() {
    this._flags.cameraPosed = true
    this._recompute()
    this._maybeReady()
  }

  markInteractionShell() {
    this._flags.interactionShell = true
    this._recompute()
    this._maybeReady()
  }

  get hasFirstFrame() {
    return this._flags.firstMeaningfulFrame
  }

  get hasPlayWarmed() {
    return this._flags.playWarmed
  }

  /** @param {string} message */
  fail(message) {
    this.fatalMessage = message || 'Load failed'
    this._setState('Fatal')
    this._clearStallWatch()
    this.onFatal?.(this.fatalMessage)
    this._emitProgress()
  }

  markContextLost() {
    if (this.state === 'Fatal') return
    this._setState('Degraded')
  }

  markContextRestored() {
    if (this.state === 'Degraded') this._setState('Live')
  }

  beginReveal() {
    if (this.state !== 'Ready' && this.state !== 'Revealing') return
    this._revealStarted = true
    this._setState('Revealing')
  }

  markLive() {
    this._setState('Live')
    this._clearStallWatch()
    perfMark('live')
    perfMeasure('ready_to_live', 'ready', 'live')
  }

  get isReady() {
    return this._allReadyFlags()
  }

  get isFatal() {
    return this.state === 'Fatal'
  }

  get isLive() {
    return this.state === 'Live'
  }

  /** Smooth display progress toward target; call each frame. */
  tick(dt) {
    if (this._awaitingParse && !this._flags.criticalAssets) {
      const unpackCap = (WEIGHTS.criticalCode + WEIGHTS.download + WEIGHTS.sceneBuilt * 0.45) * 100
      this._targetProgress = Math.max(this._targetProgress, Math.min(unpackCap, this._displayProgress + dt * 14))
    }

    const k = 1 - Math.exp(-(this.reducedMotion ? 18 : 8) * dt)
    this._displayProgress += (this._targetProgress - this._displayProgress) * k
    if (!this._allReadyFlags()) {
      this._displayProgress = Math.min(this._displayProgress, 99.2)
    } else {
      this._displayProgress = Math.max(this._displayProgress, 100)
      this._targetProgress = 100
    }
    this._emitProgress()
  }

  /** Snap UI immediately after a stage mark (call after await yieldToMain). */
  flush() {
    this._displayProgress = this._targetProgress
    this._emitProgress()
  }

  get displayProgress() {
    return this._displayProgress
  }

  get label() {
    if (this.state === 'Fatal') return this.fatalMessage || STAGE_LABELS.Fatal
    if (
      this.state === 'Compiling' ||
      this.state === 'FirstFrame' ||
      this.state === 'BuildingScene' ||
      this.state === 'WarmingPlay' ||
      this.state === 'Unpacking'
    ) {
      return STAGE_LABELS[this.state]
    }
    if (this.state === 'LoadingAssets' && this._downloadFrac >= 0.98) {
      return 'Preparing the world'
    }
    return STAGE_LABELS[this.state] || 'Loading'
  }

  /** ms to wait after Ready before fading (visual polish only). */
  get minDwellMs() {
    return this.reducedMotion ? 0 : MIN_DWELL_MS
  }

  _allReadyFlags() {
    const f = this._flags
    return (
      f.criticalCode &&
      f.criticalAssets &&
      f.sceneBuilt &&
      f.shadersCompiled &&
      f.firstMeaningfulFrame &&
      f.playWarmed &&
      f.cameraPosed &&
      f.interactionShell
    )
  }

  _maybeReady() {
    if (this._readyFired || !this._allReadyFlags() || this.state === 'Fatal') return
    this._readyFired = true
    this._targetProgress = 100
    this._displayProgress = 100
    this.readyAt = performance.now()
    perfMark('ready')
    perfMeasure('time_to_ready', 'module_eval', 'ready')
    this._setState('Ready')
    this._clearStallWatch()
    this._emitProgress()
    this.onReady?.()
  }

  _recompute() {
    const f = this._flags
    let p = 0
    if (f.criticalCode) p += WEIGHTS.criticalCode
    p += WEIGHTS.download * this._downloadFrac
    if (f.sceneBuilt) p += WEIGHTS.sceneBuilt
    if (f.shadersCompiled) p += WEIGHTS.shadersCompiled
    if (f.firstMeaningfulFrame) p += WEIGHTS.firstMeaningfulFrame
    if (f.playWarmed) p += WEIGHTS.playWarmed
    if (f.interactionShell) p += WEIGHTS.interactionShell

    let pct = p * 100
    if (!this._allReadyFlags()) pct = Math.min(pct, 99)
    else pct = 100

    this._targetProgress = pct
    if (pct > this._displayProgress) {
      this._displayProgress += (pct - this._displayProgress) * 0.35
    }
    this._emitProgress()
  }

  _emitProgress() {
    const shown = this._allReadyFlags()
      ? 100
      : Math.min(99, Math.floor(this._displayProgress))
    this.onProgress?.(shown, this.label, this.state)
  }

  /** @param {LoadState} next */
  _setState(next) {
    if (this.state === next) return
    this.state = next
    this.onStateChange?.(next)
  }

  _armStallWatch() {
    this._clearStallWatch()
    this._stallTimer = setTimeout(() => {
      if (this._readyFired || this.state === 'Fatal' || this.state === 'Live' || this.state === 'Revealing') return
      this.fail('Still loading — check your connection, then retry.')
    }, STALL_MS)
  }

  _clearStallWatch() {
    if (this._stallTimer) {
      clearTimeout(this._stallTimer)
      this._stallTimer = null
    }
  }

  dispose() {
    this._clearStallWatch()
  }
}

import * as THREE from 'three'

// ─── States ──────────────────────────────────────────────────────────────────
export const ANIM_STATE = {
  IDLE:      'idle',
  WALK:      'walk',
  RUN:       'run',
  JUMP:      'jump',
  WALK_JUMP: 'walkJump',
  RUN_JUMP:  'runJump',
  EMOTE:     'emote',
}

const AIRBORNE = new Set([ANIM_STATE.JUMP, ANIM_STATE.WALK_JUMP, ANIM_STATE.RUN_JUMP])

// ─── Crossfade durations (seconds) ───────────────────────────────────────────
// Keys are FROM_TO using state names uppercased.
const FADE = {
  // Ground locomotion
  IDLE_TO_WALK:       0.20,
  WALK_TO_IDLE:       0.30,
  WALK_TO_RUN:        0.20,
  RUN_TO_WALK:        0.25,
  RUN_TO_IDLE:        0.10,  // short — runtostop bridge handles the visual
  IDLE_TO_RUN:        0.22,

  // Jump departures — crisp
  IDLE_TO_JUMP:       0.12,
  WALK_TO_WALKJUMP:   0.10,
  RUN_TO_RUNJUMP:     0.08,

  // Landing recovery — long enough to feel like weight
  JUMP_TO_IDLE:       0.38,
  JUMP_TO_WALK:       0.28,
  JUMP_TO_RUN:        0.22,
  WALKJUMP_TO_IDLE:   0.35,
  WALKJUMP_TO_WALK:   0.25,
  WALKJUMP_TO_RUN:    0.20,
  RUNJUMP_TO_IDLE:    0.32,
  RUNJUMP_TO_WALK:    0.25,
  RUNJUMP_TO_RUN:     0.18,

  // Emotes
  IDLE_TO_EMOTE:      0.20,
  EMOTE_TO_IDLE:      0.28,
}

const fadeDur = (from, to) =>
  FADE[`${from.toUpperCase()}_TO_${to.toUpperCase()}`] ?? 0.22

// ─── Emote config ─────────────────────────────────────────────────────────────
const EMOTE_DELAY_MIN = 9
const EMOTE_DELAY_MAX = 16

export class AnimationController {
  constructor() {
    this.mixer  = null
    this.ready  = false

    // Single source of truth — only this class writes _state
    this._state  = ANIM_STATE.IDLE
    this._action = null   // currently active AnimationAction

    // Pending 'finished' listener for one-shot chains (walkstart, runtostop, emotes)
    // Stored so we can cleanly remove it if something interrupts mid-play
    this._finishCb = null

    this._idleTimer  = 0
    this._emoteDelay = this._randEmoteDelay()

    // Random idle-variation clips (idleagree / idlecall / idlegreet). Played
    // occasionally while standing still on the globe. Suppressed in the explore
    // view via `emotesEnabled` so the inspected character just stands calmly.
    this._emotes = []
    this.emotesEnabled = true

    this._anims = {
      idle:        null,   // breathingidle.fbx   — loop
      walk:        null,   // walking.fbx          — loop
      run:         null,   // running.fbx          — loop
      jump:        null,   // idlejump.fbx         — once
      walkJump:    null,   // walkingjump.fbx      — once
      runJump:     null,   // runningjump.fbx      — once
      walkStart:   null,   // walkstart.fbx        — once, bridge into walk
      runToStop:   null,   // runtostop.fbx        — once, bridge into idle
      lookAround:  null,   // lookingaround.fbx    — once, idle emote
      lookAround2: null,   // lookingaround2.fbx   — once, idle emote
      wave:        null,   // wave.fbx             — once, idle emote
    }
  }

  get state()      { return this._state }
  get isAirborne() { return AIRBORNE.has(this._state) }
  get isReady()    { return this.ready }

  // ─── Load ──────────────────────────────────────────────────────────────────
  async load(root, fbxLoader, basePath, { skipAnims = false } = {}) {
    this.mixer = new THREE.AnimationMixer(root)

    // Static-model test mode: skip FBX clips entirely (e.g. when the model's
    // skeleton doesn't match the Mixamo animation rig). Model shows in its bind
    // pose and bone-driven features like About head-tracking still work.
    if (skipAnims) {
      this._state = ANIM_STATE.IDLE
      this.ready  = true
      return
    }

    const loadFBX = p => new Promise((res, rej) => fbxLoader.load(p, res, undefined, rej))

    const files = [
      ['breathingidle.fbx',  'idle'],
      ['walking.fbx',        'walk'],
      ['running.fbx',        'run'],
      ['idlejump.fbx',       'jump'],
      ['walkingjump.fbx',    'walkJump'],
      ['runningjump.fbx',    'runJump'],
      ['walkstart.fbx',      'walkStart'],
      ['runtostop.fbx',      'runToStop'],
      ['lookingaround.fbx',  'lookAround'],
      ['lookingaround2.fbx', 'lookAround2'],
      ['wave.fbx',           'wave'],
    ]

    await Promise.allSettled(
      files.map(([file, key]) =>
        loadFBX(basePath + file)
          .then(fbx => {
            this._stripRootMotion(fbx.animations)
            this._anims[key] = this.mixer.clipAction(fbx.animations[0])
          })
          .catch(err => console.warn(`[AnimCtrl] ${file} failed:`, err))
      )
    )

    // Boot straight into idle — no fade, it's the first frame
    if (this._anims.idle) {
      this._anims.idle.setLoop(THREE.LoopRepeat)
      this._anims.idle.play()
      this._action = this._anims.idle
    }

    this._state = ANIM_STATE.IDLE
    this.ready  = true
  }

  // ─── Load from pre-parsed GLB clips (Tripo rig) ──────────────────────────────
  // The Tripo locomotion exports are one clip per GLB and share the model's
  // skeleton/bone names, so the clips bind directly. Only idle/walk/run exist
  // for this rig — jump/bridge/emote states are absent and degrade gracefully
  // (the state machine no-ops on null actions).
  loadGlbClips(root, clips) {
    this.mixer = new THREE.AnimationMixer(root)

    // Idle = the model's clean bind pose, held static. The Tripo idle clip is
    // choppy, so instead we pin every bone at its bind transform (a 1s loop that
    // never moves). It still crossfades like a normal action.
    const idleClip = clips.idle || this._makeBindPoseClip(root)
    this._anims.idle = this.mixer.clipAction(idleClip)

    for (const key of ['walk', 'run']) {
      const clip = clips[key]
      if (!clip) continue
      this._stripRootMotion([clip])
      this._anims[key] = this.mixer.clipAction(clip)
    }

    // Random idle variations — strip root motion so they play in place
    if (Array.isArray(clips.emotes)) {
      this._stripRootMotion(clips.emotes)
      this._emotes = clips.emotes.map(c => this.mixer.clipAction(c))
    }

    this._anims.idle.setLoop(THREE.LoopRepeat)
    this._anims.idle.play()
    this._action = this._anims.idle

    this._state = ANIM_STATE.IDLE
    this.ready  = true
  }

  // Build a 1-second clip that holds every bone at its current (bind) transform,
  // so "idle" is a perfectly still pose that still crossfades cleanly.
  _makeBindPoseClip(root) {
    const tracks = []
    root.traverse(o => {
      if (!o.isBone) return
      const q = o.quaternion, p = o.position
      tracks.push(new THREE.QuaternionKeyframeTrack(
        `${o.name}.quaternion`, [0, 1],
        [q.x, q.y, q.z, q.w, q.x, q.y, q.z, q.w]
      ))
      tracks.push(new THREE.VectorKeyframeTrack(
        `${o.name}.position`, [0, 1],
        [p.x, p.y, p.z, p.x, p.y, p.z]
      ))
    })
    return new THREE.AnimationClip('idleStatic', 1, tracks)
  }

  // ─── Update ────────────────────────────────────────────────────────────────
  // Call every frame with current physics/input state.
  update(dt, moving, sprinting, airborne) {
    if (!this.ready || !this.mixer) return
    this.mixer.update(dt)

    // ── While airborne: jump owns the state completely ──
    if (AIRBORNE.has(this._state)) {
      // Wait for physics to confirm landing — then recover
      if (!airborne) this._land(moving, sprinting)
      return
    }

    // ── Emote: don't interrupt unless the player moves ──
    if (this._state === ANIM_STATE.EMOTE) {
      if (moving) this._interruptEmote(moving, sprinting)
      return
    }

    // ── Ground locomotion ──
    const desired = moving && sprinting ? ANIM_STATE.RUN
                  : moving              ? ANIM_STATE.WALK
                  :                       ANIM_STATE.IDLE

    if (desired !== this._state) {
      const from = this._state
      this._state = desired
      this._transitionGround(from, desired)
    }

    // ── Idle emote timer (suppressed in the explore view) ──
    if (this._state === ANIM_STATE.IDLE && this.emotesEnabled) {
      this._idleTimer += dt
      if (this._idleTimer >= this._emoteDelay) {
        this._idleTimer  = 0
        this._emoteDelay = this._randEmoteDelay()
        this._playEmote()
      }
    } else {
      this._idleTimer = 0
    }
  }

  // ─── Jump trigger ──────────────────────────────────────────────────────────
  // Call once on jump keydown. Picks the correct variant based on current
  // locomotion state. Returns false if already airborne (caller should bail).
  triggerJump() {
    if (!this.ready) return false
    if (AIRBORNE.has(this._state)) return false

    // Treat emote as idle for jump purposes
    const from = this._state === ANIM_STATE.EMOTE ? ANIM_STATE.IDLE : this._state
    this._clearFinishCb()

    if (from === ANIM_STATE.RUN) {
      const clip = this._anims.runJump ?? this._anims.jump
      this._crossFadeOnce(clip, fadeDur(ANIM_STATE.RUN, ANIM_STATE.RUN_JUMP), 1.2)
      this._state = ANIM_STATE.RUN_JUMP
    } else if (from === ANIM_STATE.WALK) {
      const clip = this._anims.walkJump ?? this._anims.jump
      this._crossFadeOnce(clip, fadeDur(ANIM_STATE.WALK, ANIM_STATE.WALK_JUMP), 1.3)
      this._state = ANIM_STATE.WALK_JUMP
    } else {
      this._crossFadeOnce(this._anims.jump, fadeDur(ANIM_STATE.IDLE, ANIM_STATE.JUMP), 1.4)
      this._state = ANIM_STATE.JUMP
    }

    return true
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  // Called exactly once when physics says we've touched down.
  _land(moving, sprinting) {
    this._clearFinishCb()
    const to  = moving && sprinting ? ANIM_STATE.RUN
              : moving              ? ANIM_STATE.WALK
              :                       ANIM_STATE.IDLE
    const dur = fadeDur(this._state, to)
    this._state = to
    this._crossFadeLoop(this._anims[to], dur)
  }

  // Ground state transitions — uses bridge animations where available.
  _transitionGround(from, to) {
    this._clearFinishCb()

    // RUN → IDLE: play runToStop once, then loop idle
    if (from === ANIM_STATE.RUN && to === ANIM_STATE.IDLE && this._anims.runToStop) {
      this._playOnceThenLoop(
        this._anims.runToStop, this._anims.idle,
        fadeDur(from, to), 0.20
      )
      return
    }

    // Everything else: direct crossfade
    this._crossFadeLoop(this._anims[to], fadeDur(from, to))
  }

  // Play a one-shot action, then automatically crossfade into a looping action
  // when the one-shot finishes. If something else interrupts before finish,
  // the _action guard in the callback prevents the loop from overriding it.
  _playOnceThenLoop(onceAction, loopAction, onceDur, loopDur) {
    const capturedOnce = onceAction
    this._crossFadeOnce(onceAction, onceDur, 1.0)

    this._finishCb = (e) => {
      if (e.action !== capturedOnce) return
      this._clearFinishCb()
      // Only loop if this one-shot is still what's playing (wasn't interrupted)
      if (this._action === capturedOnce) {
        this._crossFadeLoop(loopAction, loopDur)
      }
    }
    this.mixer.addEventListener('finished', this._finishCb)
  }

  // Pick a random idle emote and play it once, then return to idle.
  _playEmote() {
    const pool = this._emotes.filter(Boolean)
    if (!pool.length) return

    const emoteAction = pool[Math.floor(Math.random() * pool.length)]
    this._state = ANIM_STATE.EMOTE
    this._crossFadeOnce(emoteAction, FADE.IDLE_TO_EMOTE, 1.0)

    this._finishCb = (e) => {
      if (e.action !== emoteAction) return
      this._clearFinishCb()
      // Return to idle only if nothing else took over
      if (this._state === ANIM_STATE.EMOTE) {
        this._state = ANIM_STATE.IDLE
        this._crossFadeLoop(this._anims.idle, FADE.EMOTE_TO_IDLE)
      }
    }
    this.mixer.addEventListener('finished', this._finishCb)
  }

  // Interrupt a playing emote (player started moving)
  _interruptEmote(moving, sprinting) {
    this._clearFinishCb()
    const to = moving && sprinting ? ANIM_STATE.RUN : ANIM_STATE.WALK
    this._state = to
    this._crossFadeLoop(this._anims[to], 0.22)
  }

  // Remove and null the pending finish listener
  _clearFinishCb() {
    if (this._finishCb) {
      this.mixer.removeEventListener('finished', this._finishCb)
      this._finishCb = null
    }
  }

  // Fade into a looping action. Guards against re-triggering the same action.
  _crossFadeLoop(toAction, duration) {
    if (!toAction) return
    if (toAction === this._action) {
      if (!toAction.isRunning()) toAction.play()
      return
    }

    toAction.reset()
    toAction.setLoop(THREE.LoopRepeat)
    toAction.setEffectiveWeight(1)
    toAction.play()
    // warping=true keeps footstep phase stable during speed changes
    if (this._action) this._action.crossFadeTo(toAction, duration, true)
    this._action = toAction
  }

  // Fade into a one-shot action (jump, bridge, emote).
  // clampWhenFinished holds the last frame until something fades it out.
  _crossFadeOnce(toAction, duration, timeScale = 1.0) {
    if (!toAction) return

    toAction.reset()
    toAction.setLoop(THREE.LoopOnce, 1)
    toAction.clampWhenFinished = true
    toAction.timeScale = timeScale
    toAction.setEffectiveWeight(1)
    toAction.play()
    if (this._action) this._action.crossFadeTo(toAction, duration, true)
    this._action = toAction
  }

  // Strip hip root-motion translation so the character doesn't drift on the
  // planet while animations were authored with in-place locomotion.
  _stripRootMotion(clips) {
    for (const clip of clips) {
      clip.tracks = clip.tracks.filter(t => {
        const n = t.name.toLowerCase()
        // Strip root/hip translation so in-place clips never drift the character
        // across the planet (Mixamo "hips", Tripo "Hip"/"Root").
        const isRootPos = n.endsWith('.position') &&
          (n.includes('hips') || n.includes('hip') || n.includes('root'))
        return !isRootPos
      })
    }
  }

  _randEmoteDelay() {
    return EMOTE_DELAY_MIN + Math.random() * (EMOTE_DELAY_MAX - EMOTE_DELAY_MIN)
  }
}

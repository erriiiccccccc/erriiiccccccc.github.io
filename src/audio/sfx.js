// Sound effects and ambience for the world.
//
// Everything here is synthesised on the Jukebox's AudioContext (see
// jukebox/AudioEngine.js): oscillators for anything with a pitch, filtered
// noise for anything with a texture (wind, ice, embers, sand, waves). No sample
// files, so nothing extra to download and every sound can take its island's
// note.
//
// The world is in one key, G major pentatonic. Each island owns a note (the
// same ones the brand bible lists), and every event reuses it: arriving plays
// the note, diving in plays it with its fifth, a first find plays a little
// arpeggio, and finding all six rolls every island's note into one chord.
//
// Rules this file holds:
//   1. Nothing plays until the context is running, and the context is only
//      ever started from a user gesture (unlock()). Calls before that are
//      silently dropped, never queued.
//   2. The Sound switch in Options mutes all of it; the Volume slider scales
//      all of it, the Jukebox included.
//   3. Effects stay short and quiet. Only the ambience loops.
import { audio } from '../jukebox/AudioEngine.js'

/** Each island's note in Hz (G major pentatonic). */
export const ISLAND_NOTE = {
  meadow_island:   783.99,  // G5
  mountain_island: 587.33,  // D5
  arctic_island:   659.25,  // E5
  lava_island:     440.00,  // A4
  desert_island:   493.88,  // B4
  pirate_ship:     392.00,  // G4
}
/** What the ground sounds like underfoot on each island. */
const SURFACE = {
  meadow_island:   'grass',
  mountain_island: 'rock',
  arctic_island:   'snow',
  lava_island:     'rock',
  desert_island:   'sand',
  pirate_ship:     'wood',
}

const AMB_LEVEL = 0.35       // ambience bus at rest: about -44 dB, just under the footsteps
const rand = (a, b) => a + Math.random() * (b - a)

export class Sfx {
  constructor() {
    this.ctx      = null
    this.volume   = 0.7
    this._duck    = -1         // last ambience target, so we only ramp on change
    this._last    = new Map()  // per-sound throttle
  }

  // ── Setup ─────────────────────────────────────────────────────────────────

  /** Call from any user gesture. Builds or wakes the shared context. */
  unlock() {
    const ctx = audio.ensure()
    if (!ctx) return
    if (!this.ctx) {
      this.attach(ctx, audio.master)
      this._startAmbience()
    }
  }

  /** Wire the buses onto a context. Exposed so a test can use an OfflineAudioContext. */
  attach(ctx, destination) {
    this.ctx = ctx
    this.out = ctx.createGain()
    this.out.connect(destination)

    // One small room every effect sits in, so they read as one family.
    this.verbIn  = ctx.createGain()
    this.verb    = ctx.createConvolver()
    this.verb.buffer = this._impulse(1.7)
    this.verbOut = ctx.createGain()
    this.verbOut.gain.value = 0.32
    this.verbIn.connect(this.verb)
    this.verb.connect(this.verbOut)
    this.verbOut.connect(this.out)

    this.amb = ctx.createGain()
    this.amb.gain.value = 0
    this.amb.connect(this.out)

    this._noise = this._noiseBuffer()
    this.setVolume(this.volume)
  }

  /** 0 to 1. Scales everything, the Jukebox included (it shares the master). */
  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v))
    if (!this.ctx) return
    const g = this.ctx === audio.ctx ? audio.master.gain : this.out.gain
    const target = this.ctx === audio.ctx ? 0.9 * this.volume : this.volume
    g.setTargetAtTime(target, this.ctx.currentTime, 0.03)
  }

  get live() {
    return !!this.ctx && audio.soundOn && this.ctx.state === 'running'
  }

  // Offline contexts (the loudness test) are always "live".
  _ok() { return this.ctx && (this._offline || this.live) }

  /** Drop a sound if the same one fired less than `ms` ago. */
  _throttle(key, ms) {
    const now = performance.now()
    if (now - (this._last.get(key) ?? -1e9) < ms) return true
    this._last.set(key, now)
    return false
  }

  // ── Building blocks ───────────────────────────────────────────────────────

  _route(node, verb = 0.25, pan = 0, dest = this.out) {
    let tail = node
    if (pan && this.ctx.createStereoPanner) {
      const p = this.ctx.createStereoPanner()
      p.pan.value = pan
      node.connect(p)
      tail = p
    }
    tail.connect(dest)
    if (verb > 0) {
      const s = this.ctx.createGain()
      s.gain.value = verb
      tail.connect(s)
      s.connect(this.verbIn)
    }
  }

  /** A pitched blip: attack, then an exponential fall. `to` glides the pitch. */
  tone(freq, { at = 0, type = 'sine', a = 0.006, d = 0.5, gain = 0.08, to = null, verb = 0.25, pan = 0, dest } = {}) {
    const ctx = this.ctx
    const t = ctx.currentTime + at
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.setValueAtTime(freq, t)
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + a + d)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + a)
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d)
    o.connect(g)
    this._route(g, verb, pan, dest)
    o.start(t)
    o.stop(t + a + d + 0.05)
  }

  /**
   * Filtered noise with an envelope: attack, optional hold, then a fall.
   * `f` is the filter's centre/cutoff and `fTo` glides it over the sound.
   */
  noise({ at = 0, a = 0.004, hold = 0, d = 0.2, gain = 0.1, type = 'lowpass', f = 1000, fTo = null, q = 0.7, verb = 0.2, pan = 0, dest } = {}) {
    const ctx = this.ctx
    const t = ctx.currentTime + at
    const end = t + a + hold + d
    const src = ctx.createBufferSource()
    src.buffer = this._noise
    src.loop = true
    const fl = ctx.createBiquadFilter()
    fl.type = type
    fl.Q.value = q
    fl.frequency.setValueAtTime(f, t)
    if (fTo) fl.frequency.exponentialRampToValueAtTime(fTo, end)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + a)
    if (hold) g.gain.setValueAtTime(gain, t + a + hold)
    g.gain.exponentialRampToValueAtTime(0.0001, end)
    src.connect(fl).connect(g)
    this._route(g, verb, pan, dest)
    src.start(t, rand(0, 0.9))
    src.stop(end + 0.05)
  }

  /** Tiny high clicks scattered over `span` seconds: ice, embers, sizzle. */
  _crackle(n, span, { at = 0, lo = 3000, hi = 7000, gain = [0.04, 0.1], d = [0.008, 0.03], verb = 0.15 } = {}) {
    for (let i = 0; i < n; i++) {
      this.noise({
        at: at + Math.pow(Math.random(), 1.4) * span,
        a: 0.001, d: rand(d[0], d[1]), gain: rand(gain[0], gain[1]),
        type: 'bandpass', f: rand(lo, hi), q: 2.5, verb, pan: rand(-0.4, 0.4),
      })
    }
  }

  /** A soft bell: the note plus a quiet, quickly fading overtone. */
  _bell(f, { at = 0, gain = 0.07, d = 1.0, verb = 0.45 } = {}) {
    this.tone(f, { at, type: 'triangle', gain, d, verb })
    this.tone(f * 2, { at, gain: gain * 0.28, d: d * 0.45, verb })
  }

  _noiseBuffer() {
    const rate = this.ctx.sampleRate
    const buf = this.ctx.createBuffer(1, rate, rate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < rate; i++) data[i] = Math.random() * 2 - 1
    return buf
  }

  _impulse(seconds) {
    const rate = this.ctx.sampleRate
    const len = Math.floor(rate * seconds)
    const buf = this.ctx.createBuffer(2, len, rate)
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
    }
    return buf
  }

  // ── The world ─────────────────────────────────────────────────────────────

  /** Stepping onto an island: its note, once. */
  arrive(island) {
    if (!this._ok() || this._throttle('arrive:' + island, 1500)) return
    const f = ISLAND_NOTE[island] ?? 523.25
    this._bell(f, { gain: 0.06, d: 1.1 })
  }

  /** First time an island is found: a rising arpeggio on its note. All six: the whole chord. */
  found(island, count, total = 6) {
    if (!this._ok()) return
    const f = ISLAND_NOTE[island] ?? 523.25
    if (count < total) {
      ;[1, 1.5, 2].forEach((m, i) => this._bell(f * m, { at: i * 0.09, gain: 0.065, d: 0.9 }))
      this.tone(f * 4, { at: 0.27, gain: 0.012, d: 0.6, verb: 0.6 })
      return
    }
    const chord = Object.values(ISLAND_NOTE).sort((a, b) => a - b)
    chord.forEach((n, i) => this._bell(n, { at: i * 0.07, gain: 0.05, d: 2.2, verb: 0.6 }))
    this.tone(98, { a: 0.3, d: 2.4, gain: 0.07, verb: 0.4 })              // G2 underneath
    this.tone(196, { at: 0.42, a: 0.2, d: 2.0, gain: 0.035, verb: 0.5 })  // G3
    this._crackle(10, 1.2, { at: 0.5, lo: 6000, hi: 9000, gain: [0.01, 0.025], verb: 0.6 })
  }

  /** Teleport and hop: a swell of air that rises and falls with the 1.1 s warp. */
  warp() {
    if (!this._ok() || this._throttle('warp', 300)) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const src = ctx.createBufferSource()
    src.buffer = this._noise
    src.loop = true
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.Q.value = 1.4
    bp.frequency.setValueAtTime(320, t)
    bp.frequency.exponentialRampToValueAtTime(2600, t + 0.55)
    bp.frequency.exponentialRampToValueAtTime(420, t + 1.15)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.45)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2)
    src.connect(bp).connect(g)
    this._route(g, 0.35)
    src.start(t, rand(0, 0.5))
    src.stop(t + 1.25)
    this.tone(220, { a: 0.4, d: 0.5, gain: 0.018, to: 880, verb: 0.4 })
  }

  /** One footstep. The ground decides the sound; pitch and level wobble a little. */
  footstep(island, sprint) {
    if (!this._ok()) return
    this._foot = !this._foot
    const pan = this._foot ? -0.08 : 0.08
    const k = rand(0.85, 1.15)
    const v = (sprint ? 1.15 : 1) * rand(0.8, 1.1)
    switch (SURFACE[island] || 'grass') {
      case 'snow':
        this.noise({ a: 0.006, d: 0.09, gain: 0.12 * v, type: 'bandpass', f: 2400 * k, q: 0.9, verb: 0.05, pan })
        this._crackle(3, 0.06, { lo: 3500, hi: 6000, gain: [0.025, 0.05], verb: 0.02 })
        break
      case 'rock':
        this.noise({ a: 0.002, d: 0.05, gain: 0.18 * v, type: 'lowpass', f: 800 * k, verb: 0.08, pan })
        this.tone(130 * k, { a: 0.002, d: 0.04, gain: 0.05 * v, verb: 0.05, pan })
        break
      case 'sand':
        this.noise({ a: 0.012, d: 0.08, gain: 0.055 * v, type: 'highpass', f: 1800 * k, verb: 0.03, pan })
        break
      case 'wood':
        this.tone(175 * k, { type: 'triangle', a: 0.002, d: 0.07, gain: 0.05 * v, to: 140 * k, verb: 0.12, pan })
        this.noise({ a: 0.002, d: 0.03, gain: 0.03 * v, type: 'lowpass', f: 1200, verb: 0.05, pan })
        break
      default: // grass
        this.noise({ a: 0.006, d: 0.07, gain: 0.16 * v, type: 'lowpass', f: 1200 * k, verb: 0.04, pan })
    }
  }

  jump() {
    if (!this._ok()) return
    this.tone(260, { a: 0.01, d: 0.14, gain: 0.03, to: 540, verb: 0.15 })
    this.noise({ a: 0.01, d: 0.08, gain: 0.035, type: 'bandpass', f: 900, verb: 0.1 })
  }

  land(island) {
    if (!this._ok() || this._throttle('land', 120)) return
    this.tone(95, { a: 0.002, d: 0.14, gain: 0.06, to: 50, verb: 0.1 })
    this.noise({ a: 0.002, d: 0.1, gain: 0.05, type: 'lowpass', f: 450, verb: 0.08 })
    if (SURFACE[island] === 'snow') this._crackle(4, 0.08, { lo: 3500, hi: 6000, gain: [0.015, 0.03] })
  }

  // ── Panels ────────────────────────────────────────────────────────────────

  /** A panel opening. Each shell has its own texture, all over the island's note and fifth. */
  open(shell, island) {
    if (!this._ok() || this._throttle('open', 250)) return
    const f = ISLAND_NOTE[island] ?? 523.25
    switch (shell) {
      case 'cinema':   // Mountain: an old TV powering on
        this.tone(60, { a: 0.25, d: 0.7, gain: 0.07, verb: 0.1 })
        this.tone(120, { a: 0.25, d: 0.55, gain: 0.03, verb: 0.1 })
        this.noise({ at: 0.12, a: 0.05, d: 0.3, gain: 0.03, type: 'bandpass', f: 2000, fTo: 6000, q: 1.2, verb: 0.2 })
        this.tone(7800, { at: 0.1, a: 0.15, d: 0.5, gain: 0.004, verb: 0 })
        this.noise({ at: 0.38, a: 0.002, d: 0.07, gain: 0.12, type: 'lowpass', f: 900, verb: 0.2 })
        break
      case 'frost':    // Arctic: ice crackling over, a cold breath, a glassy shimmer
        this._crackle(16, 0.75, { lo: 3000, hi: 7500, gain: [0.03, 0.09] })
        this.noise({ a: 0.2, d: 0.6, gain: 0.03, type: 'bandpass', f: 1800, q: 0.6, verb: 0.3 })
        this.tone(f * 2, { at: 0.25, a: 0.25, d: 1.0, gain: 0.018, verb: 0.6 })
        this.tone(f * 3, { at: 0.35, a: 0.3, d: 0.9, gain: 0.01, verb: 0.6 })
        break
      case 'eruption': // Lava: a rumble from below, then embers fizzing up
        this.noise({ a: 0.08, d: 1.0, gain: 0.3, type: 'lowpass', f: 150, fTo: 90, verb: 0.15 })
        this.tone(48, { a: 0.05, d: 0.9, gain: 0.09, to: 36, verb: 0.1 })
        this.noise({ at: 0.05, a: 0.1, d: 0.5, gain: 0.05, type: 'bandpass', f: 400, fTo: 2400, q: 1, verb: 0.25 })
        this._crackle(22, 0.9, { at: 0.1, lo: 4000, hi: 8500, gain: [0.025, 0.07] })
        break
      case 'mirage':   // Desert: a hot wind shimmering past
        this.noise({ a: 0.35, hold: 0.2, d: 0.7, gain: 0.12, type: 'bandpass', f: 500, fTo: 1300, q: 3.5, verb: 0.3 })
        this.tone(f * 2, { at: 0.15, a: 0.4, d: 1.0, gain: 0.014, verb: 0.5 })
        this.tone(f * 2 * 1.006, { at: 0.15, a: 0.4, d: 1.0, gain: 0.014, verb: 0.5 })
        break
      case 'night':    // Pirate: a slow ocean swell as the world falls away
        this.noise({ a: 0.7, d: 1.1, gain: 0.15, type: 'lowpass', f: 280, fTo: 900, verb: 0.3 })
        this.noise({ at: 0.9, a: 0.5, d: 0.9, gain: 0.08, type: 'lowpass', f: 250, fTo: 700, verb: 0.3 })
        this.tone(f / 2, { at: 0.2, a: 0.5, d: 1.4, gain: 0.045, verb: 0.5 })
        break
      default:         // Meadow (About) and anything else: a little bloom
        this.tone(f * 4, { at: 0.2, gain: 0.012, d: 0.6, verb: 0.6 })
    }
    this._bell(f, { at: 0.05, gain: 0.045, d: 0.9 })
    this._bell(f * 1.5, { at: 0.13, gain: 0.032, d: 0.9 })
  }

  /** A panel closing: shorter, softer versions of the way in. */
  close(shell, island) {
    if (!this._ok() || this._throttle('close', 200)) return
    const f = ISLAND_NOTE[island] ?? 523.25
    switch (shell) {
      case 'cinema':   // the TV switching off
        this.tone(1400, { a: 0.003, d: 0.22, gain: 0.025, to: 90, verb: 0.1 })
        this.noise({ at: 0.24, a: 0.001, d: 0.03, gain: 0.05, type: 'lowpass', f: 1500, verb: 0.15 })
        break
      case 'frost':
        this._crackle(6, 0.25, { lo: 3500, hi: 7000, gain: [0.02, 0.05] })
        break
      case 'eruption':
        this.tone(70, { a: 0.003, d: 0.25, gain: 0.06, to: 45, verb: 0.1 })
        this.noise({ a: 0.003, d: 0.3, gain: 0.09, type: 'lowpass', f: 200, verb: 0.1 })
        this._crackle(5, 0.3, { at: 0.1, lo: 4000, hi: 8000, gain: [0.015, 0.04] })
        break
      case 'mirage':
        this.noise({ a: 0.05, d: 0.35, gain: 0.07, type: 'bandpass', f: 1200, fTo: 500, q: 3, verb: 0.25 })
        break
      case 'night':
        this.noise({ a: 0.15, d: 0.5, gain: 0.09, type: 'lowpass', f: 700, fTo: 250, verb: 0.25 })
        break
    }
    this.tone(f * 1.5, { type: 'triangle', d: 0.25, gain: 0.025, verb: 0.35 })
    this.tone(f, { at: 0.07, type: 'triangle', d: 0.4, gain: 0.028, verb: 0.35 })
  }

  // ── Interface ─────────────────────────────────────────────────────────────

  click() {
    if (!this._ok() || this._throttle('click', 40)) return
    this.tone(1900, { a: 0.002, d: 0.03, gain: 0.02, verb: 0 })
  }

  /** On rises, off falls. */
  toggle(on) {
    if (!this._ok()) return
    const [a, b] = on ? [1300, 1950] : [1950, 1300]
    this.tone(a, { a: 0.002, d: 0.04, gain: 0.02, verb: 0 })
    this.tone(b, { at: 0.045, a: 0.002, d: 0.05, gain: 0.02, verb: 0 })
  }

  // ── Ambience ──────────────────────────────────────────────────────────────

  /** Soft wind that wanders, and a low hum of space under it. Runs forever, very quietly. */
  _startAmbience() {
    const ctx = this.ctx
    const wind = ctx.createBufferSource()
    wind.buffer = this._noise
    wind.loop = true
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 420
    bp.Q.value = 0.6
    const wg = ctx.createGain()
    wg.gain.value = 0.03
    // two slow wobbles: one moves the wind's pitch, one its strength
    const lfo1 = ctx.createOscillator(); lfo1.frequency.value = 0.06
    const lfo1g = ctx.createGain();      lfo1g.gain.value = 200
    lfo1.connect(lfo1g).connect(bp.frequency)
    const lfo2 = ctx.createOscillator(); lfo2.frequency.value = 0.09
    const lfo2g = ctx.createGain();      lfo2g.gain.value = 0.014
    lfo2.connect(lfo2g).connect(wg.gain)
    wind.connect(bp).connect(wg).connect(this.amb)

    const hum = ctx.createGain()
    hum.gain.value = 0.012
    for (const fr of [55, 82.41]) {
      const o = ctx.createOscillator()
      o.frequency.value = fr
      o.connect(hum)
      o.start()
    }
    const lfo3 = ctx.createOscillator(); lfo3.frequency.value = 0.11
    const lfo3g = ctx.createGain();      lfo3g.gain.value = 0.005
    lfo3.connect(lfo3g).connect(hum.gain)
    hum.connect(this.amb)

    wind.start(0, rand(0, 0.9)); lfo1.start(); lfo2.start(); lfo3.start()
    this.amb.gain.setValueAtTime(0, ctx.currentTime)
    this.amb.gain.linearRampToValueAtTime(AMB_LEVEL, ctx.currentTime + 3)
    this._duck = AMB_LEVEL
  }

  /**
   * Call every frame. The ambience steps aside for the Jukebox and dips while
   * a panel is open; it only ramps when the target actually changes.
   */
  tick({ panelOpen = false } = {}) {
    if (!this.ctx || !this.amb || this._duck < 0) return
    const target = audio.playing ? 0 : panelOpen ? AMB_LEVEL * 0.45 : AMB_LEVEL
    if (target === this._duck) return
    this._duck = target
    this.amb.gain.setTargetAtTime(target, this.ctx.currentTime, 0.35)
  }

  /** Background tab: park the context; back again: wake it if Sound is on. */
  setHidden(hidden) {
    if (!this.ctx || this._offline) return
    if (hidden) { if (this.ctx.state === 'running') this.ctx.suspend().catch(() => {}) }
    else if (audio.soundOn && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {})
  }
}

export const sfx = new Sfx()

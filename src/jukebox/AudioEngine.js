// The jukebox's one and only AudioContext.
//
// Everything is synthesised: oscillators through an ADSR gain and a filter,
// drums from a short noise buffer, reverb from a procedurally generated noise
// impulse. No sample files, no audio assets, matching the world's "fully
// procedural, no external model files" rule.
//
// Three rules this file exists to hold:
//
//   1. The context is built lazily, inside a user gesture. Build one at module
//      load and Chrome hands back a suspended context that never wakes up.
//   2. Notes are scheduled ahead against ctx.currentTime by a 25ms setInterval
//      that queues everything due in the next 100ms. Scheduling from
//      requestAnimationFrame drifts audibly and stops dead in a hidden tab.
//   3. One engine, shared. The pad and the shelf both play through this, so
//      starting one stops the other for free. Two contexts would fight.
import { LANE_KEYS, STEPS, MOODS, noteFor, normalizePattern } from './pattern.js'

const LOOKAHEAD_MS   = 25     // how often the scheduler wakes up
const SCHEDULE_AHEAD = 0.10   // how far past `now` it queues, in seconds
const START_PAD      = 0.08   // headroom before the first step, in seconds

class AudioEngine {
  constructor() {
    this.ctx     = null
    /** Whoever asked for the current loop: 'studio', or a track id. */
    this.owner   = null
    this._on      = true      // the Sound toggle in Options
    this._pattern = null
    this._timer   = null
    this._step    = 0
    this._next    = 0
    this._queue   = []        // { step, time } — drives the UI playhead
    this._voices  = []        // { node, end } — live sources, so stop() can cut them
    this._irs     = new Map()
    this._noise   = null
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  /**
   * Get the context, building it on first use. MUST be reached from inside a
   * user gesture (a click, a key press) or the context stays suspended.
   * @returns {AudioContext|null} null when sound is off or unsupported
   */
  ensure() {
    if (!this._on) return null
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) return null
      try { this.ctx = new Ctx() } catch { return null }
      this._buildBuses()
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {})
    return this.ctx
  }

  get supported() {
    return !!(window.AudioContext || window.webkitAudioContext)
  }

  get soundOn() { return this._on }

  /** Wired to Options → Sound. Turning it off cuts whatever is playing. */
  setSoundOn(on) {
    this._on = !!on
    if (!this._on) this.suspend()
  }

  get playing() { return !!this._timer }

  /** The shelf's own level. */
  get fullLevel() { return 0.9 }

  /**
   * Set the output level (0..fullLevel). The world jukebox uses this to play
   * quieter and fade with distance; anything else leaves it at full.
   * @param {number}  v
   * @param {boolean} [now] jump there instead of easing
   */
  setLevel(v, now = false) {
    if (!this.master || !this.ctx) return
    const g = this.master.gain
    if (now) { g.cancelScheduledValues(this.ctx.currentTime); g.setValueAtTime(v, this.ctx.currentTime); this._level = v; return }
    if (Math.abs((this._level ?? 0.9) - v) < 0.004) return
    this._level = v
    g.setTargetAtTime(v, this.ctx.currentTime, 0.12)
  }

  /** True when `owner` is the one currently making noise. */
  isPlaying(owner) { return !!this._timer && this.owner === owner }

  // ── Buses ─────────────────────────────────────────────────────────────────

  _buildBuses() {
    const ctx = this.ctx

    this.master = ctx.createGain()
    this.master.gain.value = 0.9
    this.master.connect(ctx.destination)

    this.dry = ctx.createGain()
    this.dry.connect(this.master)

    // Reverb: a convolver fed a noise impulse we generate per mood, not a
    // loaded IR file. `_setMood` swaps the buffer and the send level.
    this.reverb    = ctx.createConvolver()
    this.revSend   = ctx.createGain()
    this.revSend.gain.value = 0
    this.revReturn = ctx.createGain()
    this.revReturn.gain.value = 0.9
    this.revSend.connect(this.reverb)
    this.reverb.connect(this.revReturn)
    this.revReturn.connect(this.master)

    // Delay with a feedback loop, for the night mood's long echoes.
    this.delay    = ctx.createDelay(1.5)
    this.delSend  = ctx.createGain()
    this.delSend.gain.value = 0
    this.delFb    = ctx.createGain()
    this.delFb.gain.value = 0
    this.delTone  = ctx.createBiquadFilter()
    this.delTone.type = 'lowpass'
    this.delTone.frequency.value = 2600
    this.delSend.connect(this.delay)
    this.delay.connect(this.delTone)
    this.delTone.connect(this.delFb)
    this.delFb.connect(this.delay)          // the loop
    this.delTone.connect(this.master)
  }

  /** Point the sends and the impulse at one mood's voicing. */
  _setMood(mood, bpm) {
    const v = (MOODS[mood] || MOODS.dreamy).voice
    this.reverb.buffer      = this._impulse(v.reverb.seconds)
    this.revSend.gain.value = v.reverb.send
    this.delSend.gain.value = v.delay.send
    this.delFb.gain.value   = v.delay.feedback
    if (v.delay.beats > 0) {
      this.delay.delayTime.value = Math.min(1.4, (60 / bpm) * v.delay.beats)
    }
    return v
  }

  /** Exponentially decaying stereo noise. Cached, a 2.6s one costs ~230KB. */
  _impulse(seconds) {
    const key = seconds.toFixed(2)
    const hit = this._irs.get(key)
    if (hit) return hit

    const rate = this.ctx.sampleRate
    const len  = Math.max(1, Math.floor(rate * seconds))
    const buf  = this.ctx.createBuffer(2, len, rate)
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6)
      }
    }
    this._irs.set(key, buf)
    return buf
  }

  /** One second of white noise, shared by every drum hit. */
  _noiseBuffer() {
    if (this._noise) return this._noise
    const rate = this.ctx.sampleRate
    const buf  = this.ctx.createBuffer(1, rate, rate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < rate; i++) data[i] = Math.random() * 2 - 1
    this._noise = buf
    return buf
  }

  // ── Transport ─────────────────────────────────────────────────────────────

  /**
   * Start looping `pattern`. Reached from a user gesture the first time.
   * @param {object} pattern
   * @param {string} owner  'studio', or the track id playing on the shelf
   * @returns {boolean} false when sound is off, unsupported, or the pattern is junk
   */
  play(pattern, owner) {
    const ctx = this.ensure()
    if (!ctx) return false

    const clean = normalizePattern(pattern)
    if (!clean) return false

    this.stop()
    this._pattern = clean
    this._voice   = this._setMood(clean.mood, clean.bpm)
    this.owner    = owner
    this._step    = 0
    this._queue   = []
    this._next    = ctx.currentTime + START_PAD
    this._timer   = setInterval(() => this._tick(), LOOKAHEAD_MS)
    this._tick()
    return true
  }

  /**
   * Swap the pattern under a running loop without restarting it, so editing
   * the grid while it plays never stutters or loses the phase.
   */
  update(pattern) {
    const clean = normalizePattern(pattern)
    if (!clean || !this._timer) return
    const moodChanged = clean.mood !== this._pattern.mood
    const bpmChanged  = clean.bpm  !== this._pattern.bpm
    this._pattern = clean
    if (moodChanged || bpmChanged) this._voice = this._setMood(clean.mood, clean.bpm)
  }

  /** @param {string} [owner] only stop if this owner is the one playing */
  stop(owner) {
    if (owner != null && this.owner !== owner) return
    if (this._timer) { clearInterval(this._timer); this._timer = null }
    this._cutVoices()
    this._queue = []
    this.owner  = null
  }

  /**
   * Overlay closed: silence everything and park the context. Never close() it,
   * a closed context cannot be resumed and the next open would be mute.
   */
  suspend() {
    this.stop()
    if (this.ctx && this.ctx.state === 'running') this.ctx.suspend().catch(() => {})
  }

  /**
   * Which step is sounding right now, or -1. Read this from rAF for the
   * playhead: the UI may drift a frame, the audio never does.
   */
  peekStep() {
    if (!this.ctx || !this._timer) return -1
    const now = this.ctx.currentTime
    while (this._queue.length > 1 && this._queue[1].time <= now) this._queue.shift()
    if (!this._queue.length) return -1
    return this._queue[0].time <= now ? this._queue[0].step : -1
  }

  /** One-shot note, for tapping a cell in the pad. */
  audition(lane, row, { mood = 'dreamy', root, bpm = 96 } = {}) {
    const ctx = this.ensure()
    if (!ctx) return
    const voice = this._timer ? this._voice : this._setMood(mood, bpm)
    const at = ctx.currentTime + 0.01
    if (lane === 'drums') this._drum(row, at)
    else this._note(lane, noteFor(lane, row, mood, root), at, voice)
  }

  // ── Scheduling ────────────────────────────────────────────────────────────

  _tick() {
    const ctx = this.ctx
    if (!ctx || !this._pattern) return

    // 16 steps to the bar, four to the beat.
    const stepDur = (60 / this._pattern.bpm) / 4
    const horizon = ctx.currentTime + SCHEDULE_AHEAD

    while (this._next < horizon) {
      this._scheduleStep(this._step, this._next)
      this._queue.push({ step: this._step, time: this._next })
      this._next += stepDur
      this._step  = (this._step + 1) % STEPS
    }

    // Let go of sources that have already finished sounding.
    const now = ctx.currentTime
    if (this._voices.length > 64) {
      this._voices = this._voices.filter(v => v.end > now)
    }
  }

  _scheduleStep(step, time) {
    const p = this._pattern
    for (const lane of LANE_KEYS) {
      for (const [s, row] of p.lanes[lane]) {
        if (s !== step) continue
        if (lane === 'drums') this._drum(row, time)
        else this._note(lane, noteFor(lane, row, p.mood, p.root), time, this._voice)
      }
    }
  }

  // ── Voices ────────────────────────────────────────────────────────────────

  _keep(node, end) { this._voices.push({ node, end }) }

  _cutVoices() {
    for (const { node } of this._voices) {
      try { node.stop() } catch { /* already stopped */ }
      try { node.disconnect() } catch { /* already gone */ }
    }
    this._voices = []
  }

  /** Route one voice's output to dry plus both sends. */
  _send(gain) {
    gain.connect(this.dry)
    gain.connect(this.revSend)
    gain.connect(this.delSend)
  }

  _note(lane, midi, time, voice) {
    const ctx  = this.ctx
    const conf = lane === 'bass' ? voice.bass : voice.lead
    const freq = 440 * Math.pow(2, (midi - 69) / 12)
    const end  = time + conf.decay + 0.05

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.Q.value = conf.q ?? 0.9
    if (conf.sweep) {
      // A filter that opens on the attack and closes again is what stops a saw
      // from reading as a buzz. Only `warm` asks for it.
      filter.frequency.setValueAtTime(conf.cutoff * 2.6, time)
      filter.frequency.exponentialRampToValueAtTime(conf.cutoff, time + conf.decay * 0.7)
    } else {
      filter.frequency.setValueAtTime(conf.cutoff, time)
    }

    const gain = ctx.createGain()
    // exponential ramps refuse to touch zero, hence the near-silent floor
    gain.gain.setValueAtTime(0.0001, time)
    gain.gain.exponentialRampToValueAtTime(conf.gain, time + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, end)

    const osc = ctx.createOscillator()
    osc.type = conf.type
    osc.frequency.setValueAtTime(freq, time)
    osc.connect(filter)
    filter.connect(gain)
    this._send(gain)
    osc.start(time)
    osc.stop(end)
    this._keep(osc, end)

    // Bells are one sine plus a quieter, shorter octave above it.
    if (conf.bell) {
      const partial = ctx.createOscillator()
      const pg      = ctx.createGain()
      const pEnd    = time + conf.decay * 0.45
      partial.type = 'sine'
      partial.frequency.setValueAtTime(freq * 2, time)
      pg.gain.setValueAtTime(0.0001, time)
      pg.gain.exponentialRampToValueAtTime(conf.gain * 0.26, time + 0.006)
      pg.gain.exponentialRampToValueAtTime(0.0001, pEnd)
      partial.connect(pg)
      this._send(pg)
      partial.start(time)
      partial.stop(pEnd)
      this._keep(partial, pEnd)
    }
  }

  /** row 0 kick, 1 snare, 2 hat. All three are noise or a swept sine. */
  _drum(row, time) {
    const ctx = this.ctx

    if (row === 0) {
      // Kick: a sine dropping fast from a click into a thud.
      const end = time + 0.30
      const osc = ctx.createOscillator()
      const g   = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(140, time)
      osc.frequency.exponentialRampToValueAtTime(44, time + 0.09)
      g.gain.setValueAtTime(0.0001, time)
      g.gain.exponentialRampToValueAtTime(0.85, time + 0.004)
      g.gain.exponentialRampToValueAtTime(0.0001, end)
      osc.connect(g)
      g.connect(this.dry)          // the kick stays out of the sends, it muddies
      osc.start(time)
      osc.stop(end)
      this._keep(osc, end)
      return
    }

    const src = ctx.createBufferSource()
    src.buffer = this._noiseBuffer()
    const filter = ctx.createBiquadFilter()
    const g      = ctx.createGain()

    if (row === 1) {
      // Snare: band-passed noise with a short body under it.
      const end = time + 0.19
      filter.type = 'bandpass'
      filter.frequency.value = 1900
      filter.Q.value = 0.7
      g.gain.setValueAtTime(0.0001, time)
      g.gain.exponentialRampToValueAtTime(0.34, time + 0.004)
      g.gain.exponentialRampToValueAtTime(0.0001, end)
      src.connect(filter); filter.connect(g)
      g.connect(this.dry); g.connect(this.revSend)
      src.start(time); src.stop(end)
      this._keep(src, end)
      return
    }

    // Hat: a tick of very high noise.
    const end = time + 0.055
    filter.type = 'highpass'
    filter.frequency.value = 7200
    g.gain.setValueAtTime(0.0001, time)
    g.gain.exponentialRampToValueAtTime(0.14, time + 0.002)
    g.gain.exponentialRampToValueAtTime(0.0001, end)
    src.connect(filter); filter.connect(g)
    g.connect(this.dry)
    src.start(time); src.stop(end)
    this._keep(src, end)
  }
}

/** The shared engine. The jukebox owns it; the pad and the shelf borrow it. */
export const audio = new AudioEngine()

// The shape of a loop, and the rules that make every loop listenable.
//
// A track is a pattern, not audio: sixteen steps across three lanes, stored as
// sparse [step, row] pairs and replayed in the browser by AudioEngine. About
// 1KB on the wire. Rendering to WAV would be megabytes a loop, would need an
// OfflineAudioContext and an encoder, and would throw away the one thing that
// makes a shelf of patterns interesting: you can open someone else's track and
// remix it.
//
// Version it from day one — `v` is the only field a future reader can trust
// before it has parsed anything else.

export const PATTERN_V  = 1
export const STEPS      = 16          // one bar, always looping
export const BPM_MIN    = 70
export const BPM_MAX    = 140
export const BPM_DEFAULT = 96
export const ROOT_DEFAULT = 57        // MIDI A3

/** Rows per lane, index 0 = lowest note / kick. */
export const LANE_ROWS = { lead: 8, bass: 5, drums: 3 }
export const LANE_KEYS = ['lead', 'bass', 'drums']
export const LANE_LABEL = { lead: 'lead', bass: 'bass', drums: 'drums' }

export const DRUM_NAMES = ['kick', 'snare', 'hat']

/** Every cell filled on every lane. Also the serialised-size worst case. */
const MAX_CELLS = STEPS * (LANE_ROWS.lead + LANE_ROWS.bass + LANE_ROWS.drums)

// Pentatonic only. There is no dissonant pair of rows to land on, which is the
// entire trick behind "no wrong notes" — someone who has never opened music
// software cannot make this sound bad.
const MINOR_PENT = [0, 3, 5, 7, 10]
const MAJOR_PENT = [0, 2, 4, 7, 9]

/**
 * Three moods, and a mood reskins exactly two things together: the scale and
 * the synth voicing. Nothing else about the instrument changes, so switching
 * mood on a finished loop always gives you the same loop in a new light.
 * `voice` is read by AudioEngine; everything else is read by the UI.
 */
export const MOODS = {
  dreamy: {
    label: 'dreamy',
    blurb: 'soft and far away',
    scale: MINOR_PENT,
    voice: {
      lead:   { type: 'triangle', cutoff: 2600, decay: 0.95, gain: 0.24 },
      bass:   { type: 'triangle', cutoff: 520,  decay: 0.60, gain: 0.30 },
      reverb: { seconds: 2.6, send: 0.38 },
      delay:  { beats: 0, feedback: 0, send: 0 },
    },
  },
  warm: {
    label: 'warm',
    blurb: 'sunlit and close',
    scale: MAJOR_PENT,
    voice: {
      lead:   { type: 'sawtooth', cutoff: 1500, decay: 0.50, gain: 0.16, sweep: true, q: 4.5 },
      bass:   { type: 'sawtooth', cutoff: 340,  decay: 0.50, gain: 0.22, q: 2.0 },
      reverb: { seconds: 0.75, send: 0.20 },
      delay:  { beats: 0, feedback: 0, send: 0 },
    },
  },
  night: {
    label: 'night',
    blurb: 'bells and long echoes',
    scale: MINOR_PENT,
    voice: {
      lead:   { type: 'sine', cutoff: 5200, decay: 1.60, gain: 0.22, bell: true },
      bass:   { type: 'sine', cutoff: 300,  decay: 0.75, gain: 0.34 },
      reverb: { seconds: 1.4,  send: 0.22 },
      delay:  { beats: 0.75, feedback: 0.42, send: 0.40 },   // dotted eighth
    },
  },
}
export const MOOD_KEYS = Object.keys(MOODS)

const NOTE_LETTERS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function clamp(n, lo, hi) { return n < lo ? lo : n > hi ? hi : n }

export function clampBpm(n) {
  const v = Math.round(Number(n))
  return Number.isFinite(v) ? clamp(v, BPM_MIN, BPM_MAX) : BPM_DEFAULT
}

/**
 * Row → MIDI note. Rows walk up the scale and wrap into the next octave, so a
 * lane taller than the five-note scale still only ever plays scale tones.
 */
export function noteFor(lane, row, mood = 'dreamy', root = ROOT_DEFAULT) {
  const scale  = (MOODS[mood] || MOODS.dreamy).scale
  const degree = scale[row % scale.length]
  const octave = Math.floor(row / scale.length) * 12
  // Bass is the same shape two octaves down, so the two lanes never fight.
  return root + degree + octave - (lane === 'bass' ? 24 : 0)
}

export function noteName(midi) {
  return `${NOTE_LETTERS[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`
}

/** Screen-reader label for one grid cell. */
export function cellLabel(lane, row, step, mood, root) {
  const what = lane === 'drums'
    ? DRUM_NAMES[row] || 'drum'
    : `note ${noteName(noteFor(lane, row, mood, root))}`
  return `${LANE_LABEL[lane]}, step ${step + 1}, ${what}`
}

export function emptyPattern(mood = 'dreamy', bpm = BPM_DEFAULT, root = ROOT_DEFAULT) {
  return { v: PATTERN_V, bpm: clampBpm(bpm), root, mood: MOODS[mood] ? mood : 'dreamy',
           lanes: { lead: [], bass: [], drums: [] } }
}

export function isEmptyPattern(p) {
  return !p || LANE_KEYS.every(l => !(p.lanes?.[l] || []).length)
}

export function countCells(p) {
  return LANE_KEYS.reduce((n, l) => n + (p?.lanes?.[l] || []).length, 0)
}

/**
 * Coerce anything at all into a pattern we are willing to play, or null.
 * Runs on every track that comes back off the shelf, so it assumes the input
 * is hostile: unknown moods fall back, out-of-range cells are dropped,
 * duplicates collapse.
 *
 * The lambda re-implements this rather than importing it, the way api/gallery
 * re-implements cleanName. Two small copies beat a shared build step.
 */
export function normalizePattern(raw) {
  let src = raw
  if (typeof src === 'string') {
    try { src = JSON.parse(src) } catch { return null }
  }
  if (!src || typeof src !== 'object' || Array.isArray(src)) return null

  const out = {
    v:    PATTERN_V,
    bpm:  clampBpm(src.bpm),
    root: Number.isFinite(Number(src.root)) ? clamp(Math.round(Number(src.root)), 36, 84) : ROOT_DEFAULT,
    mood: MOODS[src.mood] ? src.mood : 'dreamy',
    lanes: {},
  }

  let cells = 0
  for (const lane of LANE_KEYS) {
    const rows = LANE_ROWS[lane]
    const seen = new Set()
    const kept = []
    const list = Array.isArray(src.lanes?.[lane]) ? src.lanes[lane] : []
    for (const pair of list) {
      if (!Array.isArray(pair) || pair.length < 2) continue
      const step = Math.trunc(Number(pair[0]))
      const row  = Math.trunc(Number(pair[1]))
      if (!(step >= 0 && step < STEPS && row >= 0 && row < rows)) continue
      const key = step * 100 + row
      if (seen.has(key)) continue
      seen.add(key)
      kept.push([step, row])
      cells++
    }
    kept.sort((a, b) => a[0] - b[0] || a[1] - b[1])
    out.lanes[lane] = kept
  }

  return cells > MAX_CELLS ? null : out
}

// ── Surprise me ─────────────────────────────────────────────────────────────

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function chance(p)  { return Math.random() < p }

/**
 * A pleasant random loop. The single highest-value button on the pad: someone
 * with thirty seconds taps it, likes what they hear, and posts.
 *
 * It is not uniform noise. Drums get a real backbeat, the bass lands on the
 * downbeats, and the lead walks the scale in small steps off a rhythm skeleton
 * that favours the beat — so it comes out sounding written rather than rolled.
 */
export function surprise({ mood = 'dreamy', bpm = BPM_DEFAULT, root = ROOT_DEFAULT } = {}) {
  const p = emptyPattern(mood, bpm, root)

  // Drums: kick on the downbeats, snare on the backbeat, hats keeping time.
  const kicks = new Set([0, 8])
  if (chance(0.6)) kicks.add(pick([6, 10, 11, 14]))
  for (const s of kicks) p.lanes.drums.push([s, 0])
  for (const s of [4, 12]) p.lanes.drums.push([s, 1])
  const hatEvery = pick([2, 2, 4])
  for (let s = 0; s < STEPS; s += hatEvery) {
    if (chance(0.85)) p.lanes.drums.push([s, 2])
  }

  // Bass: root on 1, a second note somewhere in the back half.
  p.lanes.bass.push([0, 0])
  p.lanes.bass.push([8, pick([0, 0, 2, 3])])
  if (chance(0.45)) p.lanes.bass.push([pick([3, 6, 11, 14]), pick([1, 2, 4])])

  // Lead: 4 to 7 notes on a beat-leaning skeleton, walking the scale by small
  // intervals so the shape reads as a melody instead of a scatter.
  const skeleton = [0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15]
  const weight   = s => (s % 4 === 0 ? 3 : s % 2 === 0 ? 2 : 1)
  const wanted   = 4 + Math.floor(Math.random() * 4)
  const bag      = skeleton.flatMap(s => Array(weight(s)).fill(s))
  const steps    = [...new Set(Array.from({ length: wanted * 3 }, () => pick(bag)))]
    .sort((a, b) => a - b)
    .slice(0, wanted)

  let row = pick([0, 2, 3])
  for (const s of steps) {
    p.lanes.lead.push([s, row])
    row = clamp(row + pick([-2, -1, -1, 0, 1, 1, 2]), 0, LANE_ROWS.lead - 1)
  }

  return normalizePattern(p)
}

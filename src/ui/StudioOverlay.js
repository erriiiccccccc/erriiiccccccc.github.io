// The studio behind the jukebox.
//
// Sixteen steps, three lanes, one bar, always looping. Deliberately not a DAW.
//
// The pad's white paper and few pens become a pentatonic grid and three moods:
// there is no pair of cells you can fill that sounds wrong, which is the whole
// trick. Someone who has never opened music software should have something
// they like inside thirty seconds, and "surprise me" is there for the ones who
// only have thirty seconds.
//
// Cells are kept as a Set of packed step/row keys rather than a 16x16 array,
// which makes undo a cheap snapshot and serialising to the sparse [step, row]
// pattern a one-liner. Nothing here renders audio; it hands patterns to the
// shared AudioEngine and asks it what step is sounding.
import { svgIcon } from './icons.js'
import { audio } from '../jukebox/AudioEngine.js'
import { cleanName, postTune } from '../jukebox/jukeboxApi.js'
import {
  STEPS, LANE_KEYS, LANE_ROWS, MOODS, MOOD_KEYS,
  BPM_MIN, BPM_MAX, BPM_DEFAULT, ROOT_DEFAULT, PATTERN_V,
  cellLabel, surprise,
} from '../jukebox/pattern.js'

const UNDO_MAX = 40

/** step + row packed into one number. Rows never reach 16, so 4 bits is plenty. */
const packKey   = (step, row) => (step << 4) | row
const unpackKey = k => [k >> 4, k & 15]

export class StudioOverlay {
  constructor() {
    /** Called with the freshly posted item once a loop goes on the shelf. */
    this.onPosted = null
    /** Called when the studio closes so the shelf can take focus back. */
    this.onClose  = null

    this._cells = { lead: new Set(), bass: new Set(), drums: new Set() }
    this._mood  = 'dreamy'
    this._bpm   = BPM_DEFAULT
    this._undo  = []
    this._paint = null      // { mode: 'on' | 'off', lane } while a drag is live
    this._sending = false
    this._raf   = null

    this._build()
  }

  // ── DOM ───────────────────────────────────────────────────────────────────

  _build() {
    const el = document.createElement('div')
    el.id        = 'studio-overlay'
    el.className = 'overlay-modal'
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-labelledby', 'studio-title')

    const moods = MOOD_KEYS.map(k => `
      <button class="jb-mood${k === this._mood ? ' is-on' : ''}" type="button"
              data-mood="${k}" aria-pressed="${k === this._mood}">
        <span class="jb-mood-name">${MOODS[k].label}</span>
        <span class="jb-mood-blurb">${MOODS[k].blurb}</span>
      </button>
    `).join('')

    const ticks = Array.from({ length: STEPS }, (_, s) => `
      <span class="jb-tick${s % 4 === 0 ? ' is-beat' : ''}" data-tick="${s}"></span>
    `).join('')

    el.innerHTML = `
      <div class="overlay-inner studio-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="studio-title">
            ${svgIcon('music', 18)} Write Your Loop
          </span>
          <button class="overlay-x" id="st-close" type="button" aria-label="Back to the jukebox">✕</button>
        </div>
        <p class="overlay-sub">Tap the grid. Everything fits, that is the point.</p>

        <div class="st-stage">
          <div class="st-rail" role="toolbar" aria-label="Loop tools">
            <button class="st-play" id="st-play" type="button" aria-pressed="false">
              ${svgIcon('play', 16)}<span>Play</span>
            </button>

            <div class="st-rail-div" aria-hidden="true"></div>

            <div class="st-moods" role="group" aria-label="Mood">${moods}</div>

            <div class="st-rail-div" aria-hidden="true"></div>

            <label class="st-bpm">
              <span class="st-bpm-top">
                <span class="st-bpm-label">Tempo</span>
                <output class="st-bpm-val" id="st-bpm-val">${this._bpm}</output>
              </span>
              <input class="st-bpm-range" id="st-bpm" type="range"
                     min="${BPM_MIN}" max="${BPM_MAX}" step="1" value="${this._bpm}"
                     aria-label="Tempo in beats per minute">
            </label>

            <div class="st-rail-div" aria-hidden="true"></div>

            <div class="st-tools">
              <button class="st-tool st-tool--go" type="button" data-tool="surprise"
                      aria-label="Fill the grid with a random loop">${svgIcon('sparkles', 17)}<span>Surprise me</span></button>
              <button class="st-tool" type="button" data-tool="undo"
                      aria-label="Undo the last change">${svgIcon('undo', 17)}<span>Undo</span></button>
              <button class="st-tool st-tool--warn" type="button" data-tool="clear"
                      aria-label="Clear the grid">${svgIcon('trash', 17)}<span>Clear</span></button>
            </div>
          </div>

          <div class="st-grid-wrap">
            <div class="st-ticks" aria-hidden="true">
              <span class="st-ticks-gutter"></span>
              <div class="st-ticks-row">${ticks}</div>
            </div>
            <div class="st-grid" id="st-grid">${this._laneMarkup()}</div>
            <p class="st-grid-hint" id="st-hint">tap the grid, or hit surprise me</p>
          </div>
        </div>

        <div class="st-sign">
          <label class="st-name-field">
            <span class="st-name-label">Sign it</span>
            <input id="st-name" class="st-name" type="text" maxlength="24"
                   placeholder="your name" autocomplete="off" spellcheck="false">
          </label>
          <button class="st-anon" id="st-anon" type="button" aria-pressed="false">
            ${svgIcon('ghost', 15)}<span>post anonymously</span>
          </button>
          <button class="st-post" id="st-post" type="button">Put it on the shelf</button>
        </div>
        <p class="st-note" id="st-note">if you're really that shy, go anonymous.</p>
      </div>
    `

    document.body.appendChild(el)
    this._el = el

    this._grid   = el.querySelector('#st-grid')
    this._ticks  = [...el.querySelectorAll('[data-tick]')]
    this._hint   = el.querySelector('#st-hint')
    this._bpmEl  = el.querySelector('#st-bpm')
    this._bpmOut = el.querySelector('#st-bpm-val')
    this._playEl = el.querySelector('#st-play')
    this._nameEl = el.querySelector('#st-name')
    this._anonEl = el.querySelector('#st-anon')
    this._postEl = el.querySelector('#st-post')
    this._noteEl = el.querySelector('#st-note')

    this._wireTools()
    this._wirePointer()

    el.querySelector('#st-close').addEventListener('click', () => this.close())
    el.addEventListener('click', e => { if (e.target === el) this.close() })

    this._relabel()
  }

  /** Three lane blocks, tallest note at the top so the grid reads like pitch. */
  _laneMarkup() {
    return LANE_KEYS.map(lane => {
      const rows = []
      for (let row = LANE_ROWS[lane] - 1; row >= 0; row--) {
        const cells = Array.from({ length: STEPS }, (_, step) => `
          <button class="jb-cell${step % 4 === 0 ? ' is-beat' : ''}" type="button"
                  data-lane="${lane}" data-step="${step}" data-row="${row}"
                  aria-pressed="false"></button>
        `).join('')
        rows.push(cells)
      }
      return `
        <section class="jb-lane" data-lane="${lane}">
          <span class="jb-lane-name">${lane}</span>
          <div class="jb-lane-cells" role="group" aria-label="${lane} lane">${rows.join('')}</div>
        </section>
      `
    }).join('')
  }

  _wireTools() {
    const el = this._el

    this._playEl.addEventListener('click', () => this._togglePlay())

    el.querySelectorAll('[data-mood]').forEach(btn => {
      btn.addEventListener('click', () => this._setMood(btn.dataset.mood))
    })

    this._bpmEl.addEventListener('input', () => {
      this._bpm = Number(this._bpmEl.value)
      this._bpmOut.textContent = String(this._bpm)
      audio.update(this.pattern())
    })

    el.querySelector('[data-tool="surprise"]').addEventListener('click', () => this._surprise())
    el.querySelector('[data-tool="undo"]').addEventListener('click', () => this._undoStep())
    el.querySelector('[data-tool="clear"]').addEventListener('click', () => this._clear())

    this._anonEl.addEventListener('click', () => this._setAnon(this._anonEl.getAttribute('aria-pressed') !== 'true'))
    this._postEl.addEventListener('click', () => this._post())
    this._nameEl.addEventListener('input', () => { if (this._nameEl.value) this._setAnon(false) })

    // Ctrl+Z inside the studio only. Global keys are already gated on overlays.
    this._onKey = e => {
      if (!this.isOpen()) return
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); this._undoStep() }
    }
    document.addEventListener('keydown', this._onKey)
  }

  // ── Pointer → cells ───────────────────────────────────────────────────────

  _wirePointer() {
    const grid = this._grid

    const cellAt = (x, y) => document.elementFromPoint(x, y)?.closest?.('.jb-cell')

    grid.addEventListener('pointerdown', e => {
      if (e.button != null && e.button !== 0) return
      const cell = e.target.closest?.('.jb-cell')
      if (!cell) return
      e.preventDefault()
      grid.setPointerCapture(e.pointerId)

      // One drag is one undo step, the way one stroke is on the pad.
      this._pushUndo()
      const on = cell.getAttribute('aria-pressed') === 'true'
      this._paint = { mode: on ? 'off' : 'on' }
      this._apply(cell)
    })

    grid.addEventListener('pointermove', e => {
      if (!this._paint) return
      e.preventDefault()
      // Touch keeps firing at the element the drag started on, so hit-test the
      // point instead of trusting e.target.
      const cell = cellAt(e.clientX, e.clientY)
      if (cell) this._apply(cell)
    })

    const end = e => {
      if (!this._paint) return
      if (e?.pointerId != null && grid.hasPointerCapture?.(e.pointerId)) {
        grid.releasePointerCapture(e.pointerId)
      }
      this._paint = null
      // A drag that changed nothing should not eat an undo press.
      this._collapseUndo()
    }
    grid.addEventListener('pointerup', end)
    grid.addEventListener('pointercancel', end)

    // Stop the page/world from scrolling under a finger drag
    grid.addEventListener('touchstart', e => e.preventDefault(), { passive: false })
    grid.addEventListener('touchmove',  e => e.preventDefault(), { passive: false })
  }

  /** Paint one cell to the drag's mode, and blip it so you hear what you drew. */
  _apply(cell) {
    const { lane, step, row } = cell.dataset
    const key = packKey(Number(step), Number(row))
    const set = this._cells[lane]
    const want = this._paint.mode === 'on'
    if (set.has(key) === want) return

    if (want) { set.add(key); audio.audition(lane, Number(row), this._musicOpts()) }
    else set.delete(key)

    cell.setAttribute('aria-pressed', String(want))
    cell.classList.toggle('is-on', want)
    this._changed()
  }

  // ── State ─────────────────────────────────────────────────────────────────

  _musicOpts() {
    return { mood: this._mood, root: ROOT_DEFAULT, bpm: this._bpm }
  }

  /** The current grid, as a pattern ready to play or post. */
  pattern() {
    const lanes = {}
    for (const lane of LANE_KEYS) {
      lanes[lane] = [...this._cells[lane]]
        .map(unpackKey)
        .sort((a, b) => a[0] - b[0] || a[1] - b[1])
    }
    return { v: PATTERN_V, bpm: this._bpm, root: ROOT_DEFAULT, mood: this._mood, lanes }
  }

  /** Drop someone else's loop onto the grid, for remixing. */
  loadPattern(pattern) {
    if (!pattern) return
    this._pushUndo()          // so Ctrl+Z gets your own work back
    for (const lane of LANE_KEYS) {
      this._cells[lane] = new Set((pattern.lanes?.[lane] || []).map(([s, r]) => packKey(s, r)))
    }
    this._bpm  = pattern.bpm ?? BPM_DEFAULT
    this._mood = MOODS[pattern.mood] ? pattern.mood : 'dreamy'
    this._syncControls()
    this._repaint()
  }

  _setMood(mood) {
    if (!MOODS[mood]) return
    this._mood = mood
    this._el.querySelectorAll('[data-mood]').forEach(b => {
      const on = b.dataset.mood === mood
      b.classList.toggle('is-on', on)
      b.setAttribute('aria-pressed', String(on))
    })
    this._relabel()
    audio.update(this.pattern())
  }

  _setAnon(on) {
    this._anonEl.classList.toggle('is-on', on)
    this._anonEl.setAttribute('aria-pressed', String(on))
    this._nameEl.disabled = on
    if (on) this._nameEl.value = ''
    this._nameEl.placeholder = on ? 'anonymous' : 'your name'
  }

  /** Push the controls back into the DOM after a load. */
  _syncControls() {
    this._bpmEl.value = String(this._bpm)
    this._bpmOut.textContent = String(this._bpm)
    this._el.querySelectorAll('[data-mood]').forEach(b => {
      const on = b.dataset.mood === this._mood
      b.classList.toggle('is-on', on)
      b.setAttribute('aria-pressed', String(on))
    })
    this._relabel()
  }

  /** Mirror the cell sets onto the grid. Only ever called after a bulk change. */
  _repaint() {
    for (const cell of this._grid.querySelectorAll('.jb-cell')) {
      const { lane, step, row } = cell.dataset
      const on = this._cells[lane].has(packKey(Number(step), Number(row)))
      cell.setAttribute('aria-pressed', String(on))
      cell.classList.toggle('is-on', on)
    }
    this._changed()
  }

  /** Note names move with the mood, so the labels have to move with it too. */
  _relabel() {
    for (const cell of this._grid.querySelectorAll('.jb-cell')) {
      const { lane, step, row } = cell.dataset
      cell.setAttribute('aria-label',
        cellLabel(lane, Number(row), Number(step), this._mood, ROOT_DEFAULT))
    }
  }

  _isEmpty() {
    return LANE_KEYS.every(l => this._cells[l].size === 0)
  }

  /** Anything that edits the grid ends here: keep the hint and the loop honest. */
  _changed() {
    this._hint.classList.toggle('is-gone', !this._isEmpty())
    audio.update(this.pattern())
  }

  // ── Undo ──────────────────────────────────────────────────────────────────

  _snapshot() {
    return { lead: new Set(this._cells.lead), bass: new Set(this._cells.bass), drums: new Set(this._cells.drums) }
  }

  _pushUndo() {
    this._undo.push(this._snapshot())
    if (this._undo.length > UNDO_MAX) this._undo.shift()
  }

  /** Drop the top snapshot when the gesture that pushed it changed nothing. */
  _collapseUndo() {
    const top = this._undo[this._undo.length - 1]
    if (!top) return
    const same = LANE_KEYS.every(l =>
      top[l].size === this._cells[l].size && [...top[l]].every(k => this._cells[l].has(k)))
    if (same) this._undo.pop()
  }

  _undoStep() {
    const prev = this._undo.pop()
    if (!prev) return
    this._cells = prev
    this._repaint()
  }

  _clear() {
    if (this._isEmpty()) return
    this._pushUndo()
    for (const lane of LANE_KEYS) this._cells[lane].clear()
    this._repaint()
  }

  _surprise() {
    this._pushUndo()
    const p = surprise({ mood: this._mood, bpm: this._bpm, root: ROOT_DEFAULT })
    for (const lane of LANE_KEYS) {
      this._cells[lane] = new Set((p.lanes[lane] || []).map(([s, r]) => packKey(s, r)))
    }
    this._repaint()
    if (!audio.isPlaying('studio')) this._togglePlay()
  }

  // ── Playback ──────────────────────────────────────────────────────────────

  _togglePlay() {
    if (audio.isPlaying('studio')) { this._stop(); return }
    if (this._isEmpty()) { this._note('nothing to play yet. tap a few cells.', 'warn'); return }
    // First touch of the AudioContext, and it is inside this click.
    if (!audio.play(this.pattern(), 'studio')) {
      this._note(audio.soundOn ? 'no sound in this browser.' : 'sound is off in options.', 'warn')
      return
    }
    this._setPlayUI(true)
    this._followPlayhead()
  }

  _stop() {
    audio.stop('studio')
    this._setPlayUI(false)
    this._clearPlayhead()
  }

  _setPlayUI(on) {
    this._playEl.classList.toggle('is-on', on)
    this._playEl.setAttribute('aria-pressed', String(on))
    this._playEl.innerHTML = `${svgIcon(on ? 'pause' : 'play', 16)}<span>${on ? 'Stop' : 'Play'}</span>`
  }

  /**
   * The playhead is the one thing that reads from rAF: it only has to look
   * right, and it asks the engine which step is actually sounding rather than
   * counting frames of its own.
   */
  _followPlayhead() {
    cancelAnimationFrame(this._raf)
    const tick = () => {
      if (!audio.isPlaying('studio')) { this._setPlayUI(false); this._clearPlayhead(); return }
      const step = audio.peekStep()
      for (let i = 0; i < this._ticks.length; i++) {
        this._ticks[i].classList.toggle('is-now', i === step)
      }
      this._raf = requestAnimationFrame(tick)
    }
    this._raf = requestAnimationFrame(tick)
  }

  _clearPlayhead() {
    cancelAnimationFrame(this._raf)
    this._raf = null
    for (const t of this._ticks) t.classList.remove('is-now')
  }

  // ── Posting ───────────────────────────────────────────────────────────────

  _note(text, kind = '') {
    this._noteEl.textContent = text
    this._noteEl.className = `st-note${kind ? ` st-note--${kind}` : ''}`
  }

  async _post() {
    if (this._sending) return
    if (this._isEmpty()) { this._note('the grid is still empty!', 'warn'); return }

    const anon = this._anonEl.getAttribute('aria-pressed') === 'true'
    const name = anon ? '' : cleanName(this._nameEl.value)
    if (!anon && !name) { this._note('put a name on it, or go anonymous.', 'warn'); return }

    this._sending = true
    this._postEl.disabled = true
    this._postEl.textContent = 'sending'
    this._note('shelving it...')

    try {
      const { item, offline } = await postTune({ name, pattern: this.pattern() })
      this._stop()
      for (const lane of LANE_KEYS) this._cells[lane].clear()
      this._undo = []
      this._repaint()
      this._nameEl.value = ''
      this._setAnon(false)
      this.onPosted?.(item, offline)
      this.close()
    } catch (err) {
      this._note(err?.message === 'too-big'
        ? 'that loop is a bit too heavy. try a simpler one.'
        : 'could not shelve it. try again in a sec.', 'warn')
    } finally {
      this._sending = false
      this._postEl.disabled = false
      this._postEl.textContent = 'Put it on the shelf'
    }
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  open() {
    this._note("if you're really that shy, go anonymous.")
    this._el.classList.add('is-open')
    // Unfinished loops survive a close, so only repaint, never reset
    this._repaint()
    this._setPlayUI(false)
    queueMicrotask(() => this._el.querySelector('#st-close')?.focus())
  }

  close() {
    if (!this.isOpen()) return
    this._stop()
    this._el.classList.remove('is-open')
    this.onClose?.()
  }

  isOpen() { return this._el.classList.contains('is-open') }

  /** True when there is work someone would be sad to lose. */
  hasLoop() { return !this._isEmpty() }
}

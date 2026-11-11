// The Meadow close-ups: what opens when you press F at the Jukebox or the
// whiteboard. The camera glides in (main.js) and these screens fade up beside
// the prop, with the world still there behind them.
//
//   Jukebox    the gramophone on the left, its records on the right with no
//              box (vinyls with their sleeves on the label, readable over
//              anything thanks to a feathered wash). The list scrolls; "Make
//              your own" is always the row underneath. Each record can be
//              remixed or reported. Playing one hands off to main.js, which
//              swaps the record on the gramophone, then calls back to start it.
//   Studio     make your own record: a sixteen-step grid you drag across,
//              mood (the panel takes its colour), tempo, one of five sleeves,
//              a name (needed) and who made it (optional).
//   Whiteboard the board on the right, the Doodle Wall's drawings pinned on
//              the left. Tap one to wipe it onto the board, or draw on the
//              board itself and pin it up.
import * as THREE from 'three'
import { fetchTunes, fetchPattern, reportTune, postTune } from '../jukebox/jukeboxApi.js'
import { fetchDoodles, postDoodle, reportDoodle } from '../gallery/galleryApi.js'
import { BOARD_DRAWINGS } from '../data/doodleBoard.js'
import { MARKERS, ERASER_SIZE, FACE_W } from '../scene/DoodleBoard.js'
import { audio } from '../jukebox/AudioEngine.js'
import { HOUSE_LOOPS } from '../jukebox/houseLoops.js'
import { COVERS, coverUrl, cleanCover, DEFAULT_COVER } from '../jukebox/covers.js'
import { STEPS, LANE_ROWS, LANE_KEYS, BPM_MIN, BPM_MAX, MOOD_KEYS, surprise, emptyPattern } from '../jukebox/pattern.js'

const LANE_NAME  = { lead: 'melody', bass: 'bass', drums: 'beat' }
const LANE_COLOR = { lead: '#FBBF24', bass: '#E8935A', drums: '#F3E8D8' }
const PEN_NAMES = ['Black', 'Blue', 'Red', 'Green', 'Purple']
const SIZES = [{ px: 5, name: 'Thin' }, { px: 12, name: 'Thick' }]
// Lucide-style line icons (stroke = currentColor)
const ICON = {
  eraser: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 21-4.3-4.3a1 1 0 0 1 0-1.4l9.6-9.6a1 1 0 0 1 1.4 0l5.6 5.6a1 1 0 0 1 0 1.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>',
  undo: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',
}
const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

export class CloseUp {
  /**
   * @param {object} o
   * @param {HTMLCanvasElement} o.canvas  the game canvas (drawing on the board)
   * @param {THREE.Camera}      o.camera
   */
  constructor({ canvas, camera }) {
    this.canvas = canvas
    this.camera = camera
    this.board = null            // DoodleBoard, set by main once the world is built
    this.view = null             // 'jukebox' | 'studio' | 'board' | null
    /** Called when the player leaves (Back / Esc). */
    this.onExit = null
    /** (open: boolean) => void  the studio needs a slightly wider shot */
    this.onStudio = null
    /** (record, done) => void  main swaps the record on the platter, done() as it lands */
    this.onPlace = null
    /** () => void  the record list stopped a record */
    this.onStopRecord = null

    this._records = []
    this._loaded = false
    this._playing = null         // id of the record playing (or being put on)
    this._doodles = []
    this._current = null         // doodle id on the board
    this._tool = { pen: 0, size: SIZES[0].px, erase: false }   // what's in your hand at the board
    this._cursorKey = ''
    this._st = this._freshStudio()
    this._stPlaying = false
    this._paint = null
    this._ray = new THREE.Raycaster()
    this._mv = new THREE.Vector2()
    this._va = new THREE.Vector3(); this._vb = new THREE.Vector3()
    this._frames = new Map()
    this._inking = false

    this._build()
  }

  // ── DOM ───────────────────────────────────────────────────────────────────
  _build() {
    const el = document.createElement('div')
    el.id = 'closeup'
    el.innerHTML = `
      <section class="cu-screen" id="cu-jb" aria-label="The Jukebox">
        <button class="cu-back" type="button" data-exit>← Back</button>
        <div class="cu-col">
          <div class="cu-head"><div class="cu-eyebrow">Meadow · The Jukebox</div><h2 class="cu-h">Pick a record</h2></div>
          <div class="cu-recs" id="cu-recs" role="list" aria-label="Records"></div>
          <div class="cu-pinned" id="cu-pinned"></div>
        </div>
      </section>

      <section class="cu-screen" id="cu-studio" aria-label="Make your own record">
        <div class="cu-panel cu-studio">
          <span class="cu-tint warm"></span><span class="cu-tint dreamy"></span><span class="cu-tint night"></span>
          <div class="cu-top"><div><div class="cu-eyebrow">The Jukebox · Studio</div><h2 class="cu-h">Make your own record</h2></div>
            <button class="cu-txt" type="button" data-records>← Back to the records</button></div>
          <div class="cu-pressing">
            <div class="cu-bigvinyl" id="cu-bigvinyl"><span class="cu-disc"><span class="cu-lbl" id="cu-biglabel"></span></span><span class="cu-sheen"></span></div>
            <div class="cu-covers" id="cu-covers" role="group" aria-label="Sleeve"></div>
            <div class="cu-covername" id="cu-covername"></div>
            <input class="cu-field" id="cu-title" maxlength="24" placeholder="Name your record" aria-label="Record name (needed)" aria-describedby="cu-titlehelp" autocomplete="off">
            <div class="cu-help" id="cu-titlehelp" aria-live="polite"></div>
            <input class="cu-field cu-by" id="cu-by" maxlength="24" placeholder="Your name (or leave blank)" aria-label="Your name, optional" autocomplete="off">
          </div>
          <div class="cu-mix">
            <div class="cu-grid" id="cu-grid"></div>
          </div>
          <div class="cu-deck">
              <button class="cu-play" type="button" id="cu-stplay" aria-label="Play">▶</button>
              <span class="cu-moods" id="cu-moods" role="group" aria-label="Mood"></span>
              <label class="cu-tempo" title="Tempo"><span class="sr-only">Tempo</span><input type="range" id="cu-tempo" min="${BPM_MIN}" max="${BPM_MAX}" step="1"><span class="cu-bpm"><output id="cu-tempov"></output> bpm</span></label>
              <span class="cu-deckacts">
                <button class="cu-txt" type="button" id="cu-surprise">✦ Surprise me</button>
                <button class="cu-txt" type="button" id="cu-clear">Clear</button>
              </span>
          </div>
          <div class="cu-pressrow"><small>Name it, sign it if you like, then put it on the shelf.</small><button class="cu-press" type="button" id="cu-press">Put it on the shelf</button></div>
        </div>
      </section>

      <section class="cu-screen" id="cu-bd" aria-label="The Doodle Wall">
        <button class="cu-back cu-back--right" type="button" data-exit>Back →</button>
        <div class="cu-panel cu-wall" id="cu-wall">
          <div class="cu-head"><div class="cu-eyebrow">Meadow · The Doodle Wall</div><h2 class="cu-h">Left on the board</h2></div>
          <div class="cu-tiles" id="cu-tiles"></div>
          <div class="cu-wallfoot">
            <div class="cu-viewonly"><div class="cu-fold"><button class="cu-press" type="button" data-draw>✎ Draw on the board</button></div></div>
            <div class="cu-drawonly"><div class="cu-fold">
              <div class="cu-tools" id="cu-tools"></div>
              <input class="cu-field cu-sig" id="cu-sig" maxlength="24" placeholder="Sign it (or leave blank)" aria-label="Your name, optional" autocomplete="off">
              <div class="cu-drawacts"><button class="cu-txt" type="button" data-cancel>Cancel</button><button class="cu-press" type="button" data-pin>Pin it up</button></div>
            </div></div>
          </div>
        </div>
      </section>
      <div class="cu-toast" id="cu-toast" role="status" aria-live="polite"></div>
    `
    document.body.appendChild(el)
    this.el = el
    const $ = s => el.querySelector(s)
    this.$ = $

    el.addEventListener('click', e => this._click(e))
    $('#cu-title').addEventListener('input', () => { $('#cu-titlehelp').textContent = ''; $('#cu-title').removeAttribute('aria-invalid'); this._syncPress() })
    $('#cu-tempo').addEventListener('input', e => { this._st.bpm = +e.target.value; $('#cu-tempov').textContent = this._st.bpm; this._live() })
    // the grid: press and drag to paint notes on (or, starting on a lit pad, off)
    const grid = $('#cu-grid')
    grid.addEventListener('pointerdown', e => {
      const p = e.target.closest('[data-pad]'); if (!p) return
      e.preventDefault()
      this._paint = !p.classList.contains('on')
      this._setPad(p, this._paint)
      grid.setPointerCapture(e.pointerId)
    })
    grid.addEventListener('pointermove', e => {
      if (this._paint == null) return
      const hit = document.elementFromPoint(e.clientX, e.clientY)
      const p = hit && hit.closest && hit.closest('[data-pad]')
      if (p && p.classList.contains('on') !== this._paint) this._setPad(p, this._paint)
    })
    const end = () => { this._paint = null }
    grid.addEventListener('pointerup', end); grid.addEventListener('pointercancel', end)
    grid.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-pad]')) { e.preventDefault(); this._setPad(e.target, !e.target.classList.contains('on')) }
    })
    // drawing on the board itself: pointer → ray → the face's UV
    this.canvas.addEventListener('pointerdown', e => this._inkAt(e, true))
    this.canvas.addEventListener('pointermove', e => {
      if (this._inking) {
        const all = e.getCoalescedEvents?.()                     // fast strokes stay smooth
        for (const ce of (all && all.length ? all : [e])) this._inkAt(ce, false)
      }
      else this._hover(e)
    })
    window.addEventListener('pointerup', () => {
      if (!this._inking) return
      this._inking = false
      this.board?.endStroke()
      this._syncTools()
    })
    document.addEventListener('keydown', e => {
      if (this.view !== 'board' || !this.board?.isDrawing || e.target.matches?.('input, textarea')) return
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); this.board.undo(); this._syncTools() }
    })
  }

  isOpen() { return !!this.view }

  // ── Open / close ──────────────────────────────────────────────────────────
  /** Show a screen. main.js calls this as the camera glide lands. */
  open(which) {
    this.view = which
    document.body.classList.add('closeup-open')
    if (which === 'jukebox') { this._loadRecords(); this._renderRecords() }
    if (which === 'board') { this.board?.hold(true); this._loadDoodles() }
    this._show(which === 'board' ? 'cu-bd' : 'cu-jb')
  }

  /** Hide everything (main.js glides the camera back out). */
  close() {
    if (this._stPlaying) this._stopStudio()
    if (this.view === 'board' && this.board) { this.board.stopDrawing(); this.board.hold(false) }
    this.el.querySelector('#cu-wall').classList.remove('drawing')
    document.body.classList.remove('cu-drawing')
    this.canvas.style.cursor = ''; this._cursorKey = ''
    this.view = null
    this._show(null)
    document.body.classList.remove('closeup-open')
  }

  /** Esc / Back: the studio goes back to the records, anything else leaves. */
  back() {
    if (this.view === 'studio') { this._toRecords(); return }
    if (this.view === 'board' && this.board?.isDrawing) { this._endDraw(false); return }
    this.onExit?.()
  }

  /** The record that's playing, if one is (main hands it to the world on exit). */
  get playingId() { return this._playing }

  _show(id) {
    this.el.querySelectorAll('.cu-screen').forEach(s => s.classList.toggle('on', s.id === id))
  }

  _click(e) {
    const t = e.target.closest('button, .cu-state'); if (!t) return   // the round play circle sits outside the row button
    const d = t.dataset
    if ('exit' in d) this.onExit?.()
    else if ('records' in d) this._toRecords()
    else if ('rec' in d) this._pressRecord(d.rec)
    else if ('write' in d) this._toStudio(null)
    else if ('remix' in d) this._remix(d.remix)
    else if ('report' in d) this._report(t, d.report)
    else if ('mood' in d) { this._st.mood = d.mood; this._renderStudio(); this._live() }
    else if ('cover' in d) { this._st.cover = d.cover; this._renderStudio() }
    else if (t.id === 'cu-stplay') this._stPlaying ? this._stopStudio() : this._playStudio()
    else if (t.id === 'cu-surprise') { this._st.lanes = surprise({ mood: this._st.mood, bpm: this._st.bpm }).lanes; this._renderGrid(); this._live() }
    else if (t.id === 'cu-clear') { this._st.lanes = emptyPattern().lanes; this._renderGrid(); this._live() }
    else if (t.id === 'cu-press') this._pressIt()
    else if ('tile' in d) this._showDoodle(d.tile)
    else if ('flag' in d) this._reportDoodle(t, d.flag)
    else if ('draw' in d) this._startDraw()
    else if ('pen' in d) { this._tool.pen = +d.pen; this._tool.erase = false; this._renderTools() }
    else if ('size' in d) { this._tool.size = +d.size; this._tool.erase = false; this._renderTools() }
    else if ('erase' in d) { this._tool.erase = !this._tool.erase; this._renderTools() }
    else if ('undo' in d) { this.board?.undo(); this._syncTools() }
    else if ('wipe' in d) { this.board?.clearDrawing(); this._syncTools() }
    else if ('cancel' in d) this._endDraw(false)
    else if ('pin' in d) this._pinIt()
  }

  _toast(msg) {
    const t = this.$('#cu-toast')
    t.textContent = msg; t.classList.add('show')
    clearTimeout(this._toastT); this._toastT = setTimeout(() => t.classList.remove('show'), 2200)
  }

  // ── Records ───────────────────────────────────────────────────────────────
  async _loadRecords() {
    if (this._loaded) return
    this._loaded = true
    this._records = HOUSE_LOOPS.map(h => ({ ...h, cover: cleanCover(h.cover) }))
    this._renderRecords()
    const { items } = await fetchTunes()
    const seen = new Set(this._records.map(r => r.id))
    for (const t of items) if (!seen.has(t.id)) this._records.push({ ...t, title: t.title || 'untitled', cover: cleanCover(t.cover) })
    if (this.view === 'jukebox') this._renderRecords()
  }

  _renderRecords() {
    const $ = this.$
    $('#cu-recs').innerHTML = this._records.map((r, i) => {
      const on = this._playing === r.id
      const who = r.house ? 'the jukebox’s own' : `by ${esc(r.name || 'anonymous')}`
      return `<div class="cu-rec${on ? ' playing' : ''}" role="listitem" style="--n:${Math.min(i, 6)}">
        <button class="cu-recplay" type="button" data-rec="${esc(r.id)}" aria-label="${esc(r.title)}, ${on ? 'playing, press to stop' : 'press to play'}">
          <span class="cu-vinyl"><span class="cu-disc"><span class="cu-lbl" style="background-image:url(${coverUrl(r.cover)})"></span></span><span class="cu-sheen"></span></span>
          <span class="cu-info"><b>${esc(r.title)}</b><small>${who}</small><small class="cu-feel">${[esc(r.pattern?.mood || ''), (r.bpm || r.pattern?.bpm) ? `${r.bpm || r.pattern.bpm} bpm` : ''].filter(Boolean).join(' · ')}</small></span>
        </button>
        <span class="cu-acts">
          <button class="cu-mini" type="button" data-remix="${esc(r.id)}" aria-label="Remix ${esc(r.title)} in the studio">remix</button>
          ${r.house ? '' : `<button class="cu-mini cu-flag" type="button" data-report="${esc(r.id)}" aria-label="Report this record" title="Report this record">⚑</button>`}
        </span>
        <span class="cu-state" data-rec="${esc(r.id)}" aria-hidden="true">${on ? '<span class="cu-eq"><i></i><i></i><i></i></span>' : '▶'}</span></div>`
    }).join('')
    $('#cu-pinned').innerHTML = `<div class="cu-rec cu-blank"><button class="cu-recplay" type="button" data-write aria-label="Make your own record">
      <span class="cu-vinyl"><span class="cu-disc"><span class="cu-lbl"></span></span><span class="cu-sheen"></span></span>
      <span class="cu-info"><b>Make your own</b><small>pick a sleeve · set the pads</small></span></button>
      <span class="cu-acts"></span><span class="cu-state" data-write aria-hidden="true">＋</span></div>`
  }

  _rec(id) { return this._records.find(r => r.id === id) }

  async _pressRecord(id) {
    if (this._playing === id) { this.stopRecord(); return }
    const rec = this._rec(id); if (!rec) return
    audio.ensure()                       // inside the click, so sound is allowed to start
    const pattern = rec.pattern || await fetchPattern(rec)
    if (!pattern) { this._toast('That record wouldn’t load. Try another.'); return }
    if (audio.isPlaying(this._playing)) audio.stop(this._playing)
    this._playing = id
    this._renderRecords()
    // the record changes on the gramophone; the music starts as it lands
    const start = () => { if (this._playing === id) audio.play(pattern, id) }
    if (this.onPlace) this.onPlace({ ...rec, pattern }, start)
    else start()
  }

  /** Stop the record that's playing. */
  stopRecord() {
    if (this._playing) audio.stop(this._playing)
    this._playing = null
    this._renderRecords()
    this.onStopRecord?.()
  }

  /** main.js handed the record to the world (walked away with it playing). */
  releaseRecord() { this._playing = null }

  async _remix(id) {
    const rec = this._rec(id); if (!rec) return
    const pattern = rec.pattern || await fetchPattern(rec)
    if (!pattern) { this._toast('That record wouldn’t load.'); return }
    this._toStudio({ ...rec, pattern })
    this._toast(`${rec.title} is on the grid. Make it yours.`)
  }

  _report(btn, id) {
    if (!btn.classList.contains('ask')) {
      btn.classList.add('ask'); btn.textContent = 'report?'
      setTimeout(() => { if (btn.isConnected) { btn.classList.remove('ask'); btn.textContent = '⚑' } }, 2600)
      return
    }
    if (this._playing === id) this.stopRecord()
    reportTune(id)
    this._records = this._records.filter(r => r.id !== id)
    this._renderRecords()
    this._toast('Reported. Thanks for looking out.')
  }

  // ── Studio ────────────────────────────────────────────────────────────────
  _freshStudio() { return { mood: 'warm', bpm: 92, cover: DEFAULT_COVER, lanes: emptyPattern('warm', 92).lanes } }
  _pattern() { return { v: 1, bpm: this._st.bpm, root: 57, mood: this._st.mood, lanes: this._st.lanes } }

  _toStudio(from) {
    if (this._playing) { audio.stop(this._playing); this._playing = null; this.onStopRecord?.() }
    const $ = this.$
    if (from) {
      const p = from.pattern
      this._st = { mood: p.mood, bpm: p.bpm, cover: cleanCover(from.cover), lanes: JSON.parse(JSON.stringify(p.lanes)) }
      $('#cu-title').value = `${from.title} (remix)`.slice(0, 24)
    } else {
      this._st = this._freshStudio()
      $('#cu-title').value = ''
    }
    $('#cu-by').value = ''
    $('#cu-titlehelp').textContent = ''
    $('#cu-tempo').value = this._st.bpm; $('#cu-tempov').textContent = this._st.bpm
    this.view = 'studio'
    this._show(null)
    this.onStudio?.(true)
    this._renderStudio()
    clearTimeout(this._swapT); this._swapT = setTimeout(() => { if (this.view === 'studio') this._show('cu-studio') }, 260)
  }

  _toRecords() {
    if (this._stPlaying) this._stopStudio()
    this.view = 'jukebox'
    this._show(null)
    this.onStudio?.(false)
    this._renderRecords()
    clearTimeout(this._swapT); this._swapT = setTimeout(() => { if (this.view === 'jukebox') this._show('cu-jb') }, 260)
  }

  _renderStudio() {
    const $ = this.$, st = this._st
    $('#cu-moods').innerHTML = MOOD_KEYS.map(m => `<button class="cu-mood" type="button" data-mood="${m}" aria-pressed="${st.mood === m}">${m}</button>`).join('')
    $('#cu-covers').innerHTML = COVERS.map(c => `<button class="cu-cover" type="button" data-cover="${c.key}" aria-pressed="${st.cover === c.key}" aria-label="${c.name} sleeve" style="background-image:url(${coverUrl(c.key)})"></button>`).join('')
    $('#cu-covername').textContent = `${COVERS.find(c => c.key === st.cover).name} sleeve`
    $('#cu-biglabel').style.backgroundImage = `url(${coverUrl(st.cover)})`
    const studio = $('#cu-studio')
    studio.dataset.mood = st.mood
    studio.querySelectorAll('.cu-tint').forEach(t => t.classList.toggle('on', t.classList.contains(st.mood)))
    this._renderGrid()
    this._syncPlay()
    this._syncPress()
  }

  _renderGrid() {
    const st = this._st
    this.$('#cu-grid').innerHTML = LANE_KEYS.map(l => `<div class="cu-lane"><span>${LANE_NAME[l]}</span><div class="cu-pads" style="--lc:${LANE_COLOR[l]}">${
      Array.from({ length: LANE_ROWS[l] }, (_, k) => LANE_ROWS[l] - 1 - k).map(row => Array.from({ length: STEPS }, (_, s) =>
        `<button class="cu-pad${s % 4 === 0 ? ' beat' : ''}${st.lanes[l].some(([a, b]) => a === s && b === row) ? ' on' : ''}" type="button" data-pad="${l},${s},${row}" data-step="${s}" aria-label="${LANE_NAME[l]}, step ${s + 1}, row ${row + 1}"></button>`).join('')).join('')
    }</div></div>`).join('')
  }

  _setPad(el, on) {
    const [l, s, row] = el.dataset.pad.split(','), si = +s, ri = +row
    const L = this._st.lanes[l], k = L.findIndex(([a, b]) => a === si && b === ri)
    if (on && k < 0) { L.push([si, ri]); audio.audition(l, ri, { mood: this._st.mood, bpm: this._st.bpm }) }
    else if (!on && k >= 0) L.splice(k, 1)
    el.classList.toggle('on', on)
    this._live()
  }

  _live() { if (this._stPlaying) audio.update(this._pattern()) }

  _playStudio() {
    if (!audio.play(this._pattern(), 'studio')) { this._toast('Sound is off in Options.'); return }
    this._stPlaying = true
    this._syncPlay()
    const tick = () => {
      if (!this._stPlaying) return
      const s = audio.peekStep()
      if (s !== this._lastStep) {
        this._lastStep = s
        this.el.querySelectorAll('.cu-pad.now').forEach(p => p.classList.remove('now'))
        if (s >= 0) this.el.querySelectorAll(`.cu-pad[data-step="${s}"]`).forEach(p => p.classList.add('now'))
      }
      this._raf = requestAnimationFrame(tick)
    }
    tick()
  }

  _stopStudio() {
    audio.stop('studio')
    this._stPlaying = false
    cancelAnimationFrame(this._raf)
    this.el.querySelectorAll('.cu-pad.now').forEach(p => p.classList.remove('now'))
    this._syncPlay()
  }

  _syncPlay() {
    const b = this.$('#cu-stplay')
    b.textContent = this._stPlaying ? '■' : '▶'
    b.setAttribute('aria-label', this._stPlaying ? 'Stop' : 'Play')
    this.$('#cu-bigvinyl').classList.toggle('spin', this._stPlaying)
  }

  _syncPress() { this.$('#cu-press').setAttribute('aria-disabled', this.$('#cu-title').value.trim() ? 'false' : 'true') }

  async _pressIt() {
    const $ = this.$, title = $('#cu-title').value.trim()
    if (!title) { $('#cu-titlehelp').textContent = 'Give your record a name first.'; $('#cu-title').setAttribute('aria-invalid', 'true'); $('#cu-title').focus(); return }
    const btn = $('#cu-press')
    btn.disabled = true
    try {
      const { item, offline } = await postTune({ title, name: $('#cu-by').value, cover: this._st.cover, pattern: this._pattern() })
      const rec = { ...item, title: item.title || title, cover: cleanCover(item.cover || this._st.cover), pattern: item.pattern || this._pattern() }
      const houses = this._records.filter(r => r.house).length
      this._records.splice(houses, 0, rec)
      this._toRecords()
      this._toast(offline ? 'Saved on this device for now.' : 'It’s on the shelf!')
    } catch (err) {
      this._toast(err.message === 'empty' ? 'Set a few pads first, or hit Surprise me.' : 'Couldn’t put it on the shelf. Try again in a moment.')
    } finally { btn.disabled = false }
  }

  // ── The Doodle Wall ───────────────────────────────────────────────────────
  async _loadDoodles() {
    this._renderTiles()
    const { items } = await fetchDoodles()
    // The drawings Eric approved for the board always lead the wall, whatever
    // the store says (and locally, where dev keeps its own little store).
    // They can't be reported away.
    const kept = BOARD_DRAWINGS.map(url => {
      const id = (url.split('/doodles/art/')[1] || url).replace(/\.png$/, '').split('__')[0]
      const live = items.find(d => d.id === id || d.url === url)
      return { ...(live || { id, url, name: '', at: 0 }), kept: true }
    })
    this._doodles = [...kept, ...items.filter(d => !kept.some(k => k.id === d.id || k.url === d.url))]
    if (this.view === 'board') this._renderTiles()
  }

  _renderTiles() {
    const $ = this.$
    $('#cu-tiles').innerHTML = this._doodles.length
      ? this._doodles.map((d, i) => `<div class="cu-tile${d.id === this._current ? ' on' : ''}" style="--r:${(i % 2 ? 1 : -1) * 2.5}deg;--pin:${['#e53935', '#1e88e5', '#fbbf24'][i % 3]}">
          <button class="cu-tilebtn" type="button" data-tile="${esc(d.id)}" aria-label="Put ${esc(d.name || 'anonymous')}’s drawing on the board"><img src="${esc(d.url)}" alt="" loading="lazy" decoding="async"><small>${esc(d.name || 'anonymous')}</small></button>
          ${d.kept ? '' : `<button class="cu-mini cu-flag cu-tileflag" type="button" data-flag="${esc(d.id)}" aria-label="Report this drawing" title="Report this drawing">⚑</button>`}</div>`).join('')
      : `<p class="cu-empty">Nothing here yet. Be the first to draw on the board.</p>`
  }

  // ── The drawing tools: five markers, the eraser, two sizes, undo ─────────
  _renderTools() {
    const t = this._tool
    this.$('#cu-tools').innerHTML = `
      <div class="cu-toolrow" role="group" aria-label="Marker colour">
        ${MARKERS.map((c, i) => `<button class="cu-pen" type="button" data-pen="${i}" style="--c:${c};--i:${i}" aria-pressed="${!t.erase && t.pen === i}" aria-label="${PEN_NAMES[i]} marker" title="${PEN_NAMES[i]}"></button>`).join('')}
        <span class="cu-tsep" aria-hidden="true"></span>
        <button class="cu-tool" type="button" data-erase aria-pressed="${t.erase}" aria-label="Eraser" title="Eraser" style="--i:5">${ICON.eraser}</button>
      </div>
      <div class="cu-toolrow">
        <span class="cu-sizes" role="group" aria-label="Marker size">
          ${SIZES.map(z => `<button class="cu-size" type="button" data-size="${z.px}" aria-pressed="${!t.erase && t.size === z.px}" aria-label="${z.name} marker" title="${z.name}"><i style="--d:${z.px + 2}px;--c:${MARKERS[t.pen]}"></i></button>`).join('')}
        </span>
        <span class="cu-edits">
          <button class="cu-txt cu-undo" type="button" data-undo title="Undo (Ctrl+Z)">${ICON.undo}Undo</button>
          <button class="cu-txt" type="button" data-wipe>Wipe all</button>
        </span>
      </div>`
    this.board?.liftTool(t.erase ? { erase: true } : { pen: t.pen })
    this._cursorKey = ''
    this._syncTools()
  }

  _syncTools() {
    const can = !!this.board?.canUndo
    for (const b of this.el.querySelectorAll('#cu-tools [data-undo], #cu-tools [data-wipe]')) b.setAttribute('aria-disabled', String(!can))
  }

  /** Over the board while drawing: the pointer becomes a ring the size of the marker. */
  _hover(e) {
    if (this.view !== 'board' || !this.board?.isDrawing) { if (this._cursorKey) { this.canvas.style.cursor = ''; this._cursorKey = '' } return }
    const on = !!this._faceHit(e)
    const t = this._tool
    const d = Math.max(6, Math.min(120, Math.round((t.erase ? ERASER_SIZE : t.size) * this._facePx())))
    const key = on ? `${t.erase}|${t.pen}|${d}` : 'off'
    if (key === this._cursorKey) return
    this._cursorKey = key
    if (!on) { this.canvas.style.cursor = ''; return }
    const c = t.erase ? '#5b6170' : MARKERS[t.pen], sz = d + 4, h = sz / 2
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}"><circle cx="${h}" cy="${h}" r="${d / 2}" fill="${t.erase ? '#ffffff' : c}" fill-opacity="${t.erase ? 0.7 : 0.3}" stroke="${c}" stroke-width="1.5"/></svg>`
    this.canvas.style.cursor = `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${h} ${h}, crosshair`
  }

  /** Screen pixels per board pixel, right now. */
  _facePx() {
    const f = this.board.face, w = f.geometry.parameters.width
    f.updateWorldMatrix(true, false)
    const a = this._va.set(-w / 2, 0, 0).applyMatrix4(f.matrixWorld).project(this.camera).x
    const b = this._vb.set(w / 2, 0, 0).applyMatrix4(f.matrixWorld).project(this.camera).x
    return (Math.abs(b - a) / 2) * this.canvas.clientWidth / FACE_W
  }

  /**
   * The part of the screen a close-up's prop can have (0..1, y down), clear
   * of its panel and Back button: beside the panel on wide screens, above it
   * where the panel runs along the bottom (`below`). main.js frames the prop
   * into it. Measured from layout (offsets ignore the panels' slide-in), every
   * frame, so it follows a resize or a list that grows.
   * @param {'board'|'jukebox'|'studio'} which
   */
  frameFor(which) {
    const W = innerWidth, H = innerHeight
    const [ps, bs] = { board: ['#cu-wall', '#cu-bd .cu-back'], jukebox: ['#cu-jb .cu-col', '#cu-jb .cu-back'], studio: ['#cu-studio .cu-studio', null] }[which]
    const panel = this.$(ps), back = bs && this.$(bs)
    const pad = Math.round(Math.max(14, Math.min(W, H) * 0.035))
    const top = back ? back.offsetTop + back.offsetHeight + 10 : pad
    const pl = panel.offsetLeft, pr = pl + panel.offsetWidth
    let x0, x1, y0, y1, below = false
    if (panel.offsetWidth > W * 0.7) { x0 = pad; x1 = W - pad; y0 = top; y1 = panel.offsetTop - pad; below = true }   // along the bottom
    else if (pl + pr < W) { x0 = pr + pad; x1 = W - pad; y0 = top; y1 = H - pad }                                     // down the left
    else { x0 = pad; x1 = pl - pad; y0 = top; y1 = H - pad }                                                          // down the right
    const f = this._frames.get(which) || {}
    Object.assign(f, { below, cx: (x0 + x1) / 2 / W, cy: (y0 + y1) / 2 / H, w: Math.max(0.12, (x1 - x0) / W), h: Math.max(0.12, (y1 - y0) / H) })
    this._frames.set(which, f)
    return f
  }

  _showDoodle(id) {
    const d = this._doodles.find(x => x.id === id); if (!d || !this.board) return
    if (this.board.isDrawing) return
    this._current = id
    this.board.show(d.url)
    this._renderTiles()
  }

  _reportDoodle(btn, id) {
    if (!btn.classList.contains('ask')) {
      btn.classList.add('ask'); btn.textContent = 'report?'
      setTimeout(() => { if (btn.isConnected) { btn.classList.remove('ask'); btn.textContent = '⚑' } }, 2600)
      return
    }
    reportDoodle(id)
    this._doodles = this._doodles.filter(d => d.id !== id)
    this._renderTiles()
    this._toast('Reported. Thanks for looking out.')
  }

  _startDraw() {
    if (!this.board) return
    this.board.startDrawing()
    this._renderTools()
    const wall = this.$('#cu-wall')
    void wall.offsetHeight            // tools in place, hidden, before the switch, so they rise in
    wall.classList.add('drawing')
    document.body.classList.add('cu-drawing')
    this.$('#cu-sig').value = ''
    this._toast('Draw right on the board.')
  }

  _endDraw() {
    this.board?.stopDrawing()
    this.$('#cu-wall').classList.remove('drawing')
    document.body.classList.remove('cu-drawing')
    this.canvas.style.cursor = ''; this._cursorKey = ''
  }

  async _pinIt() {
    const board = this.board
    if (!board?.hasInk) { this._toast('Draw something first.'); return }
    const dataUrl = board.drawingDataUrl()
    const name = this.$('#cu-sig').value
    try {
      const { item, offline } = await postDoodle({ name, dataUrl })
      this._doodles.unshift(item)
      this._current = item.id
      this._endDraw()
      board.show(item.url)
      this._renderTiles()
      this._toast(offline ? 'Pinned up on this device for now.' : 'Pinned up. Thanks for drawing!')
    } catch {
      this._toast('Couldn’t pin it up. Try again in a moment.')
    }
  }

  /** Where the pointer meets the board's face, if it does. */
  _faceHit(e) {
    const r = this.canvas.getBoundingClientRect()
    this._mv.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    this._ray.setFromCamera(this._mv, this.camera)
    // the props opt out of world raycasts (so walking ignores them); test the
    // board's face directly instead
    const hits = []
    THREE.Mesh.prototype.raycast.call(this.board.face, this._ray, hits)
    const hit = hits.sort((a, b) => a.distance - b.distance)[0]
    return hit && hit.uv ? hit : null
  }

  _inkAt(e, fresh) {
    if (this.view !== 'board' || !this.board?.isDrawing) return
    if (fresh && e.button !== 0) return
    const hit = this._faceHit(e)
    if (!hit) return
    if (fresh) this._inking = true
    const t = this._tool
    this.board.ink(hit.uv.x, hit.uv.y, fresh, { color: MARKERS[t.pen], size: t.size, erase: t.erase })
  }
}

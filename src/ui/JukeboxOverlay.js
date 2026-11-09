// The Jukebox — what you find when you lift the lid on the meadow.
//
// A shelf of loops anyone has left, plus one big invitation to add your own.
// The doodle wall's twin, and just as dumb: fetch, render, done. Everything
// about storage lives in jukebox/jukeboxApi.js and everything about sound
// lives in jukebox/AudioEngine.js.
//
// The one thing it does that the wall does not: a card draws itself from the
// listing alone, and only fetches a pattern the first time someone presses
// play on it. A shelf of fifty loops still costs one request to open.
import { svgIcon } from './icons.js'
import { audio } from '../jukebox/AudioEngine.js'
import { fetchTunes, fetchPattern, reportTune } from '../jukebox/jukeboxApi.js'
import { STEPS } from '../jukebox/pattern.js'

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))
}

function ago(ts) {
  const s = Math.max(0, (Date.now() - Number(ts)) / 1000)
  if (s < 90)      return 'just now'
  if (s < 3600)    return `${Math.round(s / 60)}m ago`
  if (s < 86400)   return `${Math.round(s / 3600)}h ago`
  if (s < 2592000) return `${Math.round(s / 86400)}d ago`
  return `${Math.round(s / 2592000)}mo ago`
}

export class JukeboxOverlay {
  constructor() {
    /** Set by main.js — opens the studio. */
    this.onWrite = null
    /** Set by main.js — opens the studio seeded with someone else's loop. */
    this.onRemix = null
    /** Fired whenever the shelf closes for real. */
    this.onClose = null

    this._items   = []
    this._loaded  = false
    this._offline = false
    this._newId   = null
    this._playId  = null
    this._raf     = null
    this._lastFocus = null
    // Just-posted loops, held until the server actually lists them. The GET is
    // edge-cached for ~10s, so the refetch right after a post comes back
    // without the new track and would otherwise wipe it off the shelf.
    this._pending = new Map()

    this._build()
  }

  _build() {
    const el = document.createElement('div')
    el.id        = 'jukebox-overlay'
    el.className = 'overlay-modal'
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-labelledby', 'jb-title')

    el.innerHTML = `
      <div class="overlay-inner jb-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="jb-title">
            ${svgIcon('music', 18)} The Jukebox
          </span>
          <button class="overlay-x" id="jb-close" type="button" aria-label="Close the jukebox">✕</button>
        </div>
        <p class="overlay-sub">
          Loops left behind by whoever wandered past.
          <span class="jb-offline" id="jb-offline" hidden>offline here, only you can hear these</span>
        </p>

        <div class="jb-body">
          <div class="jb-shelf" id="jb-shelf" aria-live="polite">
            <div class="jb-state" id="jb-state">loading the shelf...</div>
            <div class="jb-grid" id="jb-grid"></div>
          </div>

          <aside class="jb-cta">
            <div class="jb-cta-art" aria-hidden="true">
              <span class="jb-cta-disc"></span>
              ${svgIcon('disc', 30)}
            </div>
            <h3 class="jb-cta-title">Make your own</h3>
            <p class="jb-cta-sub">Sixteen steps, no wrong notes. Takes a minute.</p>
            <button class="jb-cta-btn" id="jb-write" type="button">Start a loop</button>
            <p class="jb-cta-foot">sign it, or stay a ghost</p>
          </aside>
        </div>
      </div>
    `

    document.body.appendChild(el)
    this._el    = el
    this._grid  = el.querySelector('#jb-grid')
    this._state = el.querySelector('#jb-state')

    el.querySelector('#jb-close').addEventListener('click', () => this.close())
    el.querySelector('#jb-write').addEventListener('click', () => this.onWrite?.())
    el.addEventListener('click', e => { if (e.target === el) this.close() })

    // One delegated handler for the whole shelf — cards come and go on refresh
    this._grid.addEventListener('click', e => this._onGridClick(e))
  }

  // ── Rendering ─────────────────────────────────────────────────────────────

  _render() {
    if (!this._loaded) {
      this._state.textContent = 'loading the shelf...'
      this._state.hidden = false
      this._grid.replaceChildren()
      return
    }

    if (!this._items.length) {
      this._state.innerHTML = `<strong>nothing here yet.</strong><br>be the first one on the shelf.`
      this._state.hidden = false
      this._grid.replaceChildren()
      return
    }

    // 16 ticks per card: the loop draws itself across the card as it plays, so
    // a shelf with something running never looks like a static list.
    const steps = Array.from({ length: STEPS }, (_, s) =>
      `<span class="jb-step${s % 4 === 0 ? ' is-beat' : ''}" data-step="${s}"></span>`).join('')

    this._state.hidden = true
    this._grid.innerHTML = this._items.map(t => {
      const who     = t.name ? esc(t.name) : 'anonymous'
      const playing = t.id === this._playId
      return `
        <article class="jb-card${t.id === this._newId ? ' is-new' : ''}${playing ? ' is-playing' : ''}${t.pinned ? ' is-pinned' : ''}"
                 data-id="${esc(t.id)}">
          <button class="jb-play" type="button" data-play="${esc(t.id)}"
                  aria-pressed="${playing}" aria-label="${playing ? 'Stop' : 'Play'} ${who}'s loop">
            ${svgIcon(playing ? 'pause' : 'play', 15)}
          </button>
          <div class="jb-card-body">
            <span class="jb-card-top">
              <span class="jb-card-who${t.name ? '' : ' is-anon'}">${who}</span>
              ${t.pinned ? '<span class="jb-card-pin">eric</span>' : ''}
            </span>
            <span class="jb-card-meta">${t.bpm || 96} bpm  ·  ${ago(t.at)}</span>
            <span class="jb-card-steps" aria-hidden="true">${steps}</span>
          </div>
          <button class="jb-remix" type="button" data-remix="${esc(t.id)}"
                  aria-label="Open ${who}'s loop in the studio">remix</button>
          <button class="jb-flag" type="button" data-flag="${esc(t.id)}"
                  title="Report this" aria-label="Report this loop">${svgIcon('flag', 13)}</button>
        </article>
      `
    }).join('')
  }

  _onGridClick(e) {
    const flag = e.target.closest('[data-flag]')
    if (flag) {
      e.stopPropagation()
      this._handleFlag(flag)
      return
    }
    const remix = e.target.closest('[data-remix]')
    if (remix) { this._handleRemix(remix.dataset.remix); return }
    const play = e.target.closest('[data-play]')
    if (play) this._handlePlay(play.dataset.play)
  }

  async _handleFlag(btn) {
    // Two taps: the first arms it, so a stray click never nukes someone's loop
    if (btn.dataset.armed !== '1') {
      btn.dataset.armed = '1'
      btn.classList.add('is-armed')
      btn.textContent = 'sure?'
      setTimeout(() => {
        if (btn.dataset.armed !== '1') return
        btn.dataset.armed = '0'
        btn.classList.remove('is-armed')
        btn.innerHTML = svgIcon('flag', 13)
      }, 3200)
      return
    }

    const id = btn.dataset.flag
    btn.disabled = true
    btn.textContent = 'sent'
    if (this._playId === id) this._stop()
    await reportTune(id)
    const card = btn.closest('.jb-card')
    if (card) {
      card.classList.add('is-gone')
      setTimeout(() => {
        this._pending.delete(id)
        this._items = this._items.filter(t => t.id !== id)
        this._render()
      }, 260)
    }
  }

  // ── Playback ──────────────────────────────────────────────────────────────

  /**
   * Play, or stop if this one is already going. Only ever one at a time: the
   * engine enforces it, and the card state follows from `audio.owner`.
   */
  async _handlePlay(id) {
    if (this._playId === id) { this._stop(); return }

    const item = this._items.find(t => t.id === id)
    if (!item) return

    this._stop()
    this._markPlay(id, 'loading')

    const pattern = await fetchPattern(item)
    // Someone may have hit stop, or another card, while that was in flight.
    if (!pattern || this._playId !== id) {
      if (this._playId === id) { this._stop(); this._say('that one would not load.') }
      return
    }

    if (!audio.play(pattern, id)) {
      this._stop()
      this._say(audio.soundOn ? 'no sound in this browser.' : 'sound is off in options.')
      return
    }
    this._markPlay(id, 'playing')
    this._followPlayhead()
  }

  _stop() {
    if (this._playId) audio.stop(this._playId)
    this._markPlay(null)
    cancelAnimationFrame(this._raf)
    this._raf = null
  }

  /** Swap one card's button and highlight without re-rendering the shelf. */
  _markPlay(id, phase = 'playing') {
    this._playId = id
    for (const card of this._grid.querySelectorAll('.jb-card')) {
      const on  = card.dataset.id === id
      const btn = card.querySelector('[data-play]')
      card.classList.toggle('is-playing', on)
      card.classList.toggle('is-loading', on && phase === 'loading')
      if (btn.dataset.on !== String(on)) {
        btn.dataset.on = String(on)
        btn.innerHTML = svgIcon(on ? 'pause' : 'play', 15)
        btn.setAttribute('aria-pressed', String(on))
      }
      if (!on) card.querySelectorAll('.jb-step.is-now').forEach(s => s.classList.remove('is-now'))
    }
  }

  /**
   * Walk the 16 ticks across the playing card. rAF is fine here because it is
   * only ever decorative — the engine is the one that knows the time.
   */
  _followPlayhead() {
    cancelAnimationFrame(this._raf)
    const tick = () => {
      if (!this._playId || !audio.isPlaying(this._playId)) { this._stop(); return }
      const step  = audio.peekStep()
      const card  = this._grid.querySelector(`.jb-card[data-id="${CSS.escape(this._playId)}"]`)
      if (card) {
        const ticks = card.querySelectorAll('.jb-step')
        for (let i = 0; i < ticks.length; i++) ticks[i].classList.toggle('is-now', i === step)
      }
      this._raf = requestAnimationFrame(tick)
    }
    this._raf = requestAnimationFrame(tick)
  }

  _say(text) {
    this._state.textContent = text
    this._state.hidden = false
    setTimeout(() => { if (this._items.length) this._state.hidden = true }, 2600)
  }

  // ── Remix ─────────────────────────────────────────────────────────────────

  /**
   * Open someone else's loop in the studio as a starting point. It always
   * posts as a new track; nothing ever overwrites the original.
   */
  async _handleRemix(id) {
    const item = this._items.find(t => t.id === id)
    if (!item) return
    const pattern = await fetchPattern(item)
    if (!pattern) { this._say('that one would not load.'); return }
    this._stop()
    this.onRemix?.(pattern)
  }

  // ── Data ──────────────────────────────────────────────────────────────────

  async refresh() {
    const { items, offline } = await fetchTunes()

    // Anything the server now knows about stops being pending.
    for (const t of items) this._pending.delete(t.id)
    const stillPending = [...this._pending.values()]
      .filter(t => !items.some(x => x.id === t.id))

    // Pinned loops keep the top of the shelf however new the rest are.
    const byTime = (a, b) => b.at - a.at
    const all    = [...stillPending, ...items]
    this._items  = [...all.filter(t => t.pinned).sort(byTime),
                    ...all.filter(t => !t.pinned).sort(byTime)]
    this._offline = offline
    this._loaded  = true
    this._el.querySelector('#jb-offline').hidden = !offline
    this._render()
  }

  /** Called after a post so the new loop shows up without a full reload. */
  addLocal(item) {
    this._newId = item.id
    this._pending.set(item.id, item)
    this._items = [item, ...this._items.filter(t => t.id !== item.id)]
    this._loaded = true
    this._render()
    // Then reconcile with the server so ordering and flags stay honest
    this.refresh().catch(() => {})
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  open() {
    this._lastFocus = document.activeElement
    this._el.classList.add('is-open')
    queueMicrotask(() => this._el.querySelector('#jb-close')?.focus())
    this.refresh().catch(() => {
      this._loaded = true
      this._render()
    })
  }

  close() {
    if (!this.isOpen()) return
    // Nothing should keep playing behind a closed lid, and the context parks
    // itself so the next open starts from silence.
    this._stop()
    audio.suspend()
    this._el.classList.remove('is-open')
    this._newId = null
    if (this._lastFocus?.focus) this._lastFocus.focus()
    this.onClose?.()
  }

  isOpen() { return this._el.classList.contains('is-open') }
}

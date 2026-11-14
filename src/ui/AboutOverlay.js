// About Me: Character Select. A game's character screen around Eric himself.
//
//   left    Profile (who he is, in his words) and Emotes (buttons and keys
//           1 to 4 that make him move)
//   right   Quest log (the six islands, a tick on the ones found, press one
//           to warp there) and Now playing (a record from the Jukebox)
//   centre  click or tap Eric and he talks: a speech bubble by his head types
//           the line out, with a little gesture to go with it
//   bottom  the nameplate dock: name, role, the ways to reach him
//
// Pure CSS/DOM. The 3D character stays in the main scene: there is no second
// renderer here. main.js owns the camera, the animation and the sound, and
// feeds this the things only it knows (which islands are found, where his head
// is on screen, what's playing) through the set* methods and on* hooks below.
import { svgIcon } from './icons.js'

const BASE = import.meta.env.BASE_URL || '/'
const TOUCH = typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches

const svg = (d, s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`
const esc = (t) => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

/** The four emotes, in key order (1 to 4). */
const EMOTES = [
  { key: 'wave', label: 'Wave', icon: svg('<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>') },
  { key: 'nod',  label: 'Nod',  icon: svg('<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>') },
  { key: 'jump', label: 'Jump', icon: svg('<path d="m17 11-5-5-5 5"/><path d="m17 18-5-5-5 5"/>') },
  { key: 'call', label: 'Call', icon: svg('<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>') },
]

/** What he says when clicked, in order, in Eric's own words. `emote` plays with the line; `warp` puts a button in the bubble. */
const LINES = [
  { text: "Hey, I'm Eric. Welcome to my world!", emote: 'wave' },
  { text: 'I built this whole planet. Every island is a part of me.', emote: 'nod' },
  { text: "Start with Mountain if you want to see what I've made.", emote: 'call', warp: 'mountain_island', warpLabel: 'Take me to Mountain' },
]
const TYPE_MS = 26           // per letter
const BUBBLE_STAYS = 7000    // after the line has finished

export class AboutOverlay {
  constructor() {
    this._el = null

    /** Called immediately when close() is triggered (before fade-out finishes). */
    this.onStartClose = null
    /** Called after the 350 ms fade-out is complete. */
    this.onClose = null
    /** Optional predicate (event) → bool. Run on a click that lands on the empty
     *  backdrop; return false to keep the overlay open. main.js wires this to a
     *  raycast: false means the click landed on the character, and he talks. */
    this.shouldCloseFromBackdrop = null
    /** (dir: -1 | 1) => void, the ‹ › buttons; main.js closes it and flies on. */
    this.onHop = null
    /** (key: 'wave' | 'nod' | 'jump' | 'call') => void. An emote button, a key, or a line he says. */
    this.onEmote = null
    /** (islandName) => void. A quest was pressed: close and warp there. */
    this.onWarp = null
    /** ('toggle' | 'next') => void. The Now playing card. */
    this.onMusic = null
    /** () => void. One blip of his talking sound, every few letters. */
    this.onBlip = null

    this._line = 0
    this._typeT = 0
    this._hideT = 0
    this._typing = null
    this._build()
  }

  // ── Build DOM ────────────────────────────────────────────────────────
  _build() {
    const el = document.createElement('div')
    el.id = 'about-overlay'
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('aria-label', 'About Eric')

    el.innerHTML = `
      <div class="about-nav">
        <button class="wp-btn about-hop" type="button" data-dir="-1" aria-label="Previous island">${svgIcon('chevronLeft', 18, 2)}</button>
        <button class="wp-btn about-hop" type="button" data-dir="1" aria-label="Next island">${svgIcon('chevronRight', 18, 2)}</button>
        <kbd class="wp-esc" aria-hidden="true">Esc</kbd>
        <button class="wp-btn about-close" type="button" aria-label="Close">${svgIcon('close', 18, 2)}</button>
      </div>

      <!-- Warm spotlight grounding the character -->
      <div class="about-stage" aria-hidden="true"></div>

      <!-- Brand sign: the ERIC NG wordmark on a warm plaque, top-center -->
      <div class="about-brand">
        <img class="about-brand-img" src="${BASE}ericnglogo.png" alt="Eric Ng" width="1080" height="355" draggable="false">
      </div>

      <!-- What to do with him -->
      <div class="about-hint" aria-hidden="true">
        <span class="about-hint-dot"></span>
        ${TOUCH ? 'tap him to talk' : 'click him to talk · keys 1 to 4 make him move'}
      </div>

      <!-- What he says, by his head (main.js keeps --ax / --ay on his head) -->
      <div class="about-say" role="status" aria-live="polite">
        <p class="about-say-text"></p>
        <button type="button" class="about-say-go" hidden></button>
      </div>

      <div class="about-cards">
        <!-- Hero nameplate dock -->
        <div class="about-dock">
          <div class="about-dock-row about-dock-top">
            <div class="about-identity">
              <div class="about-chip" aria-hidden="true">${svgIcon('leaf', 26)}</div>
              <div class="about-id">
                <div class="about-eyebrow">About Me</div>
                <div class="about-name-row">
                  <h2 class="about-name">Eric Ng Min Chern</h2>
                  <span class="about-status"><span class="about-status-dot"></span>Now at Barclays</span>
                </div>
                <p class="about-role">AI Audit Technology Analyst at Barclays, London · First Class CS, University of Edinburgh</p>
              </div>
            </div>
            <div class="about-actions">
              <a class="about-icon" href="mailto:ericng8766@gmail.com" aria-label="Email Eric">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
              <a class="about-icon" href="https://linkedin.com/in/erriiiccccccc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a class="about-icon" href="https://github.com/erriiiccccccc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a class="about-cta" href="https://github.com/erriiiccccccc/erriiiccccccc.github.io" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                View Source
              </a>
            </div>
          </div>
        </div>
        <div class="about-side about-side--l">
          <section class="about-card about-profile" style="--k:0" aria-labelledby="about-h-profile">
            <h3 class="about-card-h" id="about-h-profile">Profile</h3>
            <p class="about-line">I build things for fun.</p>
            <dl class="about-rows">
              <div><dt>Now</dt><dd>AI Audit Technology Analyst at Barclays, London.</dd></div>
              <div><dt>From</dt><dd>Subang Jaya, Malaysia. Now in London.</dd></div>
              <div><dt>Likes</dt><dd>Badminton, basketball, exploring, char kuey teow.</dd></div>
            </dl>
          </section>
          <section class="about-card about-emotes" style="--k:1" aria-labelledby="about-h-emotes">
            <h3 class="about-card-h" id="about-h-emotes">Emotes <span>make him move</span></h3>
            <div class="about-emo-row">
              ${EMOTES.map((e, i) => `<button type="button" class="about-emo" data-emote="${e.key}" aria-keyshortcuts="${i + 1}">${e.icon}<span>${e.label}</span><kbd aria-hidden="true">${i + 1}</kbd></button>`).join('')}
            </div>
          </section>
        </div>
        <div class="about-side about-side--r">
          <section class="about-card about-quests" style="--k:0" aria-labelledby="about-h-quests">
            <h3 class="about-card-h" id="about-h-quests">Quest log <span class="about-frac"></span></h3>
            <ol class="about-quest-list"></ol>
          </section>
          <section class="about-card about-music" style="--k:1" aria-labelledby="about-h-music">
            <h3 class="about-card-h" id="about-h-music">Now playing <span class="about-np-off" hidden>sound is off</span></h3>
            <div class="about-np">
              <button type="button" class="about-np-btn" data-music="toggle" aria-label="Play" aria-pressed="false">${svgIcon('play', 15, 2)}</button>
              <div class="about-np-main"><b class="about-np-title">Meadow Morning</b><small>from the Jukebox</small></div>
              <button type="button" class="about-np-next" data-music="next" aria-label="Next record">${svg('<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>', 15)}</button>
            </div>
          </section>
        </div>
      </div>
    `

    document.body.appendChild(el)
    this._el = el
    const $ = (s) => el.querySelector(s)
    this._say = $('.about-say'); this._sayText = $('.about-say-text'); this._sayGo = $('.about-say-go')

    $('.about-close').addEventListener('click', () => this.close())
    el.querySelectorAll('.about-hop').forEach(b => {
      b.addEventListener('click', () => this.onHop?.(Number(b.dataset.dir)))
    })

    el.addEventListener('click', e => {
      const emo = e.target.closest('[data-emote]')
      if (emo) { this.emote(emo.dataset.emote); return }
      const quest = e.target.closest('[data-warp]')
      if (quest) { this.onWarp?.(quest.dataset.warp); return }
      const music = e.target.closest('[data-music]')
      if (music) { this.onMusic?.(music.dataset.music); return }
      // Only a click on the bare backdrop (not on any chrome) can dismiss, and even then the
      // predicate gets a say: a click that landed on the character makes him talk instead.
      if (e.target !== el) return
      if (this.shouldCloseFromBackdrop && !this.shouldCloseFromBackdrop(e)) { this.talk(); return }
      this.close()
    })
    // a hand cursor over him, so it's clear he can be clicked
    let lastHover = 0
    el.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch' || performance.now() - lastHover < 90) return
      lastHover = performance.now()
      el.classList.toggle('on-char', e.target === el && !!this.shouldCloseFromBackdrop && !this.shouldCloseFromBackdrop(e))
    })
  }

  // ── Emotes ───────────────────────────────────────────────────────────
  /** Play an emote and light its button (from a button, a key 1 to 4, or a line he says). */
  emote(key) {
    if (!this.isOpen() || !EMOTES.some(e => e.key === key)) return
    const btn = this._el.querySelector(`[data-emote="${key}"]`)
    btn.classList.remove('is-on'); void btn.offsetWidth; btn.classList.add('is-on')
    clearTimeout(btn._t); btn._t = setTimeout(() => btn.classList.remove('is-on'), 900)
    this.onEmote?.(key)
  }
  /** Keys 1 to 4. Returns true if the key was one of ours. */
  key(k) {
    const e = EMOTES[Number(k) - 1]
    if (!e || !this.isOpen()) return false
    this.emote(e.key)
    return true
  }

  // ── Talking ──────────────────────────────────────────────────────────
  /** He says his next line. A click while he's still typing finishes the line instead. */
  talk() {
    if (!this.isOpen()) return
    if (this._typing) { this._finishLine(); return }
    const line = LINES[this._line % LINES.length]
    this._line++
    const calm = document.body.classList.contains('reduced-motion') || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    clearTimeout(this._hideT)
    this._sayGo.hidden = true
    this._sayText.textContent = ''
    this._say.classList.remove('is-on'); void this._say.offsetWidth; this._say.classList.add('is-on')
    this._el.classList.add('is-talking')
    this.emote(line.emote)
    this._typing = { line, n: 0 }
    if (calm) { this._finishLine(); return }
    const tick = () => {
      const t = this._typing
      if (!t) return
      t.n++
      this._sayText.textContent = line.text.slice(0, t.n)
      if (t.n % 3 === 1 && /\S/.test(line.text[t.n - 1] || '')) this.onBlip?.()
      if (t.n >= line.text.length) { this._finishLine(); return }
      // a breath at the end of a sentence
      this._typeT = setTimeout(tick, /[.!?,]/.test(line.text[t.n - 1]) ? TYPE_MS * 7 : TYPE_MS)
    }
    this._typeT = setTimeout(tick, 120)
  }
  _finishLine() {
    const t = this._typing
    if (!t) return
    clearTimeout(this._typeT)
    this._typing = null
    this._sayText.textContent = t.line.text
    if (t.line.warp) {
      this._sayGo.textContent = t.line.warpLabel
      this._sayGo.dataset.warp = t.line.warp
      this._sayGo.hidden = false
    }
    clearTimeout(this._hideT)
    this._hideT = setTimeout(() => this._hush(), t.line.warp ? BUBBLE_STAYS * 1.6 : BUBBLE_STAYS)
  }
  _hush() {
    clearTimeout(this._typeT); clearTimeout(this._hideT)
    this._typing = null
    this._say.classList.remove('is-on')
    this._el.classList.remove('is-talking')
  }

  // ── What main.js tells it ────────────────────────────────────────────
  /** Where his head is on screen, in px: x, his face (y) and the top of his hair (yTop). Called every
   *  frame while open; the bubble hangs off it (beside his face on wide screens, above his head on phones). */
  setAnchor(x, y, yTop) {
    if (Math.abs(x - this._ax) < 0.5 && Math.abs(y - this._ay) < 0.5) return
    this._ax = x; this._ay = y
    this._el.style.setProperty('--ax', `${x.toFixed(1)}px`)
    this._el.style.setProperty('--ay', `${y.toFixed(1)}px`)
    this._el.style.setProperty('--at', `${yTop.toFixed(1)}px`)
  }

  /** @param {Array<{name, title, where, color, found, here}>} list the islands, in hop order */
  setQuests(list) {
    const found = list.filter(q => q.found).length
    this._el.querySelector('.about-frac').textContent = `${found} / ${list.length}`
    this._el.querySelector('.about-quest-list').innerHTML = list.map(q => {
      const state = q.here ? "You're here" : q.found ? 'Found' : 'Not found yet'
      const inner = `<span class="about-q-tick" aria-hidden="true">${q.found ? svg('<path d="M20 6 9 17l-5-5"/>', 12) : ''}</span>
        <span class="about-q-main"><b>${esc(q.title)}</b><small><span class="about-q-where">${esc(q.where)} · </span>${state}</small></span>
        <span class="about-q-go" aria-hidden="true">${q.here ? '' : svgIcon('arrowRight', 14)}</span>`
      return `<li>${q.here
        ? `<div class="about-quest is-here${q.found ? ' is-found' : ''}" style="--qc:${esc(q.color)}">${inner}</div>`
        : `<button type="button" class="about-quest${q.found ? ' is-found' : ''}" style="--qc:${esc(q.color)}" data-warp="${esc(q.name)}" aria-label="${esc(q.title)}, ${esc(q.where)}. ${state}. Warp there.">${inner}</button>`}</li>`
    }).join('')
  }

  /** @param {{title: string, playing: boolean, soundOn: boolean}} m the Now playing card */
  setMusic({ title, playing, soundOn }) {
    const btn = this._el.querySelector('.about-np-btn')
    this._el.querySelector('.about-np-title').textContent = title
    btn.innerHTML = svgIcon(playing ? 'pause' : 'play', 15, 2)
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false')
    btn.setAttribute('aria-label', playing ? `Pause ${title}` : `Play ${title}`)
    this._el.querySelector('.about-music').classList.toggle('is-playing', playing)
    this._el.querySelector('.about-np-off').hidden = soundOn
  }

  // ── Open: fade in the CSS overlay; main.js handles the 3D transition ─────────
  open() {
    if (this.isOpen()) return
    this._line = 0
    this._hush()
    this._el.classList.remove('is-closing', 'on-char')
    this._el.classList.add('is-open')
  }

  // ── Close: fire onStartClose immediately, then fade out and call onClose ─────
  close() {
    if (!this.isOpen() || this._el.classList.contains('is-closing')) return
    this._hush()
    this.onStartClose?.()
    this._el.classList.add('is-closing')
    setTimeout(() => {
      this._el.classList.remove('is-open', 'is-closing')
      this.onClose?.()
    }, 350)
  }

  isOpen() { return this._el.classList.contains('is-open') }
}

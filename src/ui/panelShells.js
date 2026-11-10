// Panel shells: one chrome, six entrances.
//
// Every island panel shares the same chrome (where you are, what this is, hop,
// close). What changes per island is the shell: its shape on screen and how it
// arrives. CSS owns each shell's resting layout (#world-panel[data-shell=...]);
// this file only choreographs the way in and the way out with the Web
// Animations API. When an entrance finishes, its animations are cancelled so the
// stylesheet is always the single source of truth for the final look.
//
//   card    plain glass card (fallback)
//   cinema  Mountain: world goes black, the screen powers on from a line of light
//   frost   Arctic:   a pane frosts over from the right edge, then clears
//   eruption Lava:    embers burst up from below and the card rides up on them
//   mirage  Desert:   far away and wavy in the heat, then glides into focus
//   night   Pirate:   the world falls away into a night sky
//
// Motion rules: enters 0.5 to 1.2 s with an ease-out, exits roughly half that
// with an ease-in, nothing loops, and reduced motion gets a short fade only.
//
// Performance rule: only opacity, transform and clip-path move. Animated
// filter: blur(), SVG displacement and blend modes made the first opening of
// an island drop to ~20 fps while the GPU built those effects, so the looks
// they gave (frost, heat haze) are faked with cheap layers instead.

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)')
const PHONE   = window.matchMedia('(max-width: 640px)')
// The OS setting, or the in-game Options toggle (SettingsOverlay mirrors it to body)
const reduced = () => REDUCED.matches || document.body.classList.contains('reduced-motion')

const EASE = {
  out:   'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  in:    'cubic-bezier(0.55, 0, 0.75, 0.2)',
  cut:   'cubic-bezier(0.7, 0, 0.2, 1)',
}

// Smallest circle (from the pane's right edge, or bottom edge on phones) that
// still covers the whole frost pane, so the wipe moves from its first frame.
const FROST_FULL = '130%'

// Heat haze: the card shimmers (alternating skew, vertical stretch) while it
// glides forward, the shimmer dying out as it arrives. Each step eases in-out.
const MIRAGE_IN = [
  [0,    0,    -26, 0.900, 0.860,  1.4],
  [0.14, 0.45, -21, 0.915, 0.950, -1.1],
  [0.28, 0.80, -15, 0.935, 0.900,  0.9],
  [0.44, 1,     -9, 0.955, 0.975, -0.55],
  [0.62, 1,     -4, 0.975, 0.960,  0.3],
  [0.80, 1,     -1, 0.992, 0.995, -0.1],
  [1,    1,      0, 1,     1,      0],
].map(([offset, opacity, y, sx, sy, sk]) => ({
  offset, opacity, easing: 'ease-in-out',
  transform: `translateY(${y}px) scale(${sx}, ${sy}) skewX(${sk}deg)`,
}))

export const isPhone = () => PHONE.matches

export class ShellDirector {
  constructor(panel) {
    this.panel   = panel
    this.scrim   = panel.querySelector('.wp-scrim')
    this.beam    = panel.querySelector('.wp-beam')
    this.card    = panel.querySelector('.wp-card')
    this.head    = panel.querySelector('.wp-header')
    this.content = panel.querySelector('.wp-content')
    this.sparks  = [...panel.querySelectorAll('.wp-embers i')]
    this.frost   = panel.querySelector('.wp-frost')
    this._anims  = []
    this._token  = 0
  }

  /** Cancel everything in flight and hand the look back to CSS. */
  stop() {
    this._token++
    for (const a of this._anims) a.cancel()
    this._anims = []
    for (const el of this._layers()) {
      if (!el) continue
      const s = el.style
      s.removeProperty('opacity'); s.removeProperty('transform'); s.removeProperty('clip-path')
    }
  }

  /**
   * Freeze whatever is mid-flight where it stands (inline styles), so an exit
   * that interrupts an entrance reverses from there instead of snapping open.
   */
  _freeze() {
    this._token++
    for (const a of this._anims) {
      try { if (a.playState !== 'finished') a.commitStyles() } catch { /* detached */ }
      a.cancel()
    }
    this._anims = []
  }

  _layers() { return [this.scrim, this.beam, this.card, this.head, this.content, this.frost] }

  /** Embers in play: fewer on phones (CSS hides the rest there too). */
  _embers(n) { return this.sparks.slice(0, Math.min(n, isPhone() ? 10 : this.sparks.length)) }

  /** The value a property is frozen at, or the resting value when nothing was in flight. */
  _cur(el, prop, resting) {
    const v = el?.style.getPropertyValue(prop)
    return v ? v : resting
  }

  /** @returns {Promise<boolean>} true if the entrance ran to the end */
  async enter(shell) {
    this.stop()
    const tok = this._token
    const run = reduced() ? this._fade(true) : (ENTER[shell] || ENTER.card).call(this)
    // Hold on the first pose for two frames. The first frame a panel is shown
    // the browser has to draw all of it, which can take 100 ms+; if the motion
    // were already running it would jump ahead by that much. Holding lets that
    // draw happen while nothing moves, then the motion starts from frame one.
    run.catch(() => {})   // cancelled during the hold: nothing to report
    const anims = this._anims.slice()
    anims.forEach(a => a.pause())
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
    if (tok !== this._token) return false
    anims.forEach(a => a.play())
    try { await run } catch { return false }
    if (tok !== this._token) return false
    this.stop()
    return true
  }

  /** @returns {Promise<boolean>} true if the exit ran to the end (fills hold it invisible) */
  async exit(shell) {
    this._freeze()
    const tok = this._token
    const run = reduced() ? this._fade(false) : (EXIT[shell] || EXIT.card).call(this)
    try { await run } catch { return false }
    return tok === this._token
  }

  // ── helpers ───────────────────────────────────────────────────────────────
  _a(el, keyframes, duration, { delay = 0, easing = EASE.out } = {}) {
    if (!el) return Promise.resolve()
    const a = el.animate(keyframes, { duration, delay, easing, fill: 'both' })
    this._anims.push(a)
    return a.finished
  }

  _rise(el, delay, duration = 440, dy = 10) {
    return this._a(el, [
      { opacity: 0, transform: `translateY(${dy}px)` },
      { opacity: 1, transform: 'none' },
    ], duration, { delay })
  }

  _fade(inward) {
    const k = inward ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }]
    return Promise.all([this._a(this.scrim, k, 180), this._a(this.card, k, 180)])
  }

}

// ── Entrances ─────────────────────────────────────────────────────────────────
const ENTER = {
  card() {
    return Promise.all([
      this._a(this.scrim, [{ opacity: 0 }, { opacity: 1 }], 420),
      this._a(this.card, [
        { opacity: 0, transform: 'translateY(14px) scale(0.96)' },
        { opacity: 1, transform: 'none' },
      ], 460),
    ])
  },

  // Mountain. The world drops to black, a thin line of light runs across the
  // middle of the screen, and the panel opens out of that line like a display
  // powering on. Content settles in last.
  cinema() {
    return Promise.all([
      this._a(this.scrim, [{ opacity: 0 }, { opacity: 1 }], 320, { easing: 'ease-out' }),
      this._a(this.beam, [
        { transform: 'scaleX(0)', opacity: 0 },
        { transform: 'scaleX(1)', opacity: 1, offset: 0.55 },
        { transform: 'scaleX(1)', opacity: 0 },
      ], 640, { delay: 120, easing: EASE.inOut }),
      this._a(this.card, [
        { clipPath: 'inset(49.7% 0 49.7% 0)' },
        { clipPath: 'inset(0% 0 0% 0)' },
      ], 680, { delay: 380, easing: EASE.cut }),
      this._rise(this.head, 860, 380, -6),
      this._rise(this.content, 930, 480, 12),
    ])
  },

  // Arctic. The pane grows out of the right edge (bottom edge on phones) as
  // solid frost, holds for a beat, then the frost clears off the content.
  // The frost layer is what reads as "frosted"; the text just surfaces under it.
  frost() {
    const at = isPhone() ? '50% 100%' : '100% 50%'
    const blurred = { opacity: 0, transform: 'translateX(14px)' }
    const clear   = { opacity: 1, transform: 'none' }
    return Promise.all([
      this._a(this.scrim, [{ opacity: 0 }, { opacity: 1 }], 520),
      this._a(this.card, [
        { clipPath: `circle(0% at ${at})` },
        { clipPath: `circle(${FROST_FULL} at ${at})` },
      ], 760, { easing: EASE.cut }),
      this._a(this.frost, [
        { opacity: 1 }, { opacity: 1, offset: 0.42 }, { opacity: 0 },
      ], 1150, { easing: EASE.inOut }),
      this._a(this.head,    [blurred, { ...blurred, offset: 0.42 }, clear], 1150, { easing: EASE.inOut }),
      this._a(this.content, [blurred, { ...blurred, offset: 0.48 }, clear], 1200, { easing: EASE.inOut }),
    ])
  },

  // Lava. A burst of embers shoots up from the bottom of the screen and the
  // card rides up on it, overshooting a hair before it settles. Each ember is
  // its own transform/opacity animation, so the burst stays on the compositor.
  // main.js adds a short ground shake as the burst goes off.
  eruption() {
    const H = window.innerHeight, W = Math.min(window.innerWidth, 900)
    return Promise.all([
      this._a(this.scrim, [{ opacity: 0 }, { opacity: 1 }], 520),
      // Each leg eases on its own (rise, overshoot, settle) so the card is
      // still travelling when the text arrives; never an empty box waiting.
      this._a(this.card, [
        { opacity: 0, transform: 'translateY(45vh) scale(0.96)', easing: 'cubic-bezier(0.2, 0.75, 0.35, 1)' },
        { opacity: 1, transform: 'translateY(-1.6vh) scale(1.005)', offset: 0.66, easing: 'cubic-bezier(0.45, 0, 0.55, 1)' },
        { opacity: 1, transform: 'none' },
      ], 760, { delay: 100, easing: 'linear' }),
      this._rise(this.head, 300, 380, 10),
      this._rise(this.content, 360, 440, 14),
      ...this._embers(22).map((el, i) => {
        const dx = ((i * 53) % 21 - 10) * 0.014 * W
        const h  = (0.5 + ((i * 29) % 40) / 100) * H
        return this._a(el, [
          { opacity: 0, transform: 'translate(0, 0) scale(1)' },
          { opacity: 1, transform: `translate(${(dx * 0.3).toFixed(1)}px, ${(-h * 0.3).toFixed(1)}px) scale(1)`, offset: 0.15 },
          { opacity: 0, transform: `translate(${dx.toFixed(1)}px, ${(-h).toFixed(1)}px) scale(0.3)` },
        ], 900 + (i * 41) % 400, { delay: (i * 23) % 220, easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)' })
      }),
    ])
  },

  // Desert. Starts small, high and wavering like heat over sand, then glides
  // forward and settles. The waver is a decaying skew/stretch wobble on the
  // transform, so the whole thing stays on the compositor.
  mirage() {
    return Promise.all([
      this._a(this.scrim, [{ opacity: 0 }, { opacity: 1 }], 650),
      this._a(this.card, MIRAGE_IN, 1050, { easing: 'linear' }),
      this._rise(this.head, 600, 420, 6),
      this._rise(this.content, 660, 480, 8),
    ])
  },

  // Pirate. main.js pulls the camera far out so the planet shrinks into space;
  // the night sky deepens over it and the log fades up on top.
  night() {
    return Promise.all([
      this._a(this.scrim, [{ opacity: 0 }, { opacity: 1 }], 1000, { delay: 200, easing: 'ease-out' }),
      this._a(this.card, [{ opacity: 0 }, { opacity: 1 }], 520, { delay: 640 }),
      this._rise(this.head, 640, 520, 8),
      this._rise(this.content, 720, 620, 14),
    ])
  },
}

// ── Exits (about half the length, ease-in) ───────────────────────────────────
// Each exit starts from where the panel actually is: the resting value when it
// was fully open, or the frozen mid-entrance value when the player closed it
// while it was still arriving (see _freeze / _cur).
const EXIT = {
  card() {
    return Promise.all([
      this._a(this.scrim, [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 260, { easing: EASE.in }),
      this._a(this.card, [
        { opacity: this._cur(this.card, 'opacity', '1'), transform: this._cur(this.card, 'transform', 'none') },
        { opacity: 0, transform: 'translateY(8px) scale(0.985)' },
      ], 240, { easing: EASE.in }),
    ])
  },

  // A TV switching off: the picture squashes into a bright line, the line
  // pulls in to a point, and the world is already fading back under it.
  // One continuous move, about 500 ms, transform and opacity only.
  cinema() {
    return Promise.all([
      this._a(this.head,    [{ opacity: this._cur(this.head, 'opacity', '1') }, { opacity: 0 }], 170, { easing: EASE.in }),
      this._a(this.content, [{ opacity: this._cur(this.content, 'opacity', '1') }, { opacity: 0 }], 170, { easing: EASE.in }),
      this._a(this.card, [
        { transform: this._cur(this.card, 'transform', 'none'), opacity: 1 },
        { transform: 'scaleY(0.004)', opacity: 1, offset: 0.92 },
        { transform: 'scaleY(0.004)', opacity: 0 },
      ], 260, { easing: 'cubic-bezier(0.45, 0, 0.8, 0.5)' }),
      this._a(this.beam, [
        { transform: 'scaleX(1)', opacity: 0 },
        { transform: 'scaleX(1)', opacity: 1, offset: 0.12 },
        { transform: 'scaleX(0.02)', opacity: 0.9, offset: 0.88 },
        { transform: 'scaleX(0)', opacity: 0 },
      ], 300, { delay: 205, easing: EASE.in }),
      this._a(this.scrim, [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 330, { delay: 190, easing: 'ease-out' }),
    ])
  },

  frost() {
    const at = isPhone() ? '50% 100%' : '100% 50%'
    const from = (el) => ({ opacity: this._cur(el, 'opacity', '1'), transform: this._cur(el, 'transform', 'none') })
    const blurred = { opacity: 0, transform: 'translateX(10px)' }
    return Promise.all([
      // Frosts over, then the frozen pane draws back into its edge. The circle
      // starts just big enough to cover the pane, so it shrinks from frame one.
      this._a(this.frost,   [{ opacity: this._cur(this.frost, 'opacity', '0') }, { opacity: 0.9 }], 110, { easing: 'ease-out' }),
      this._a(this.head,    [from(this.head), blurred], 150),
      this._a(this.content, [from(this.content), blurred], 150),
      this._a(this.card, [
        { clipPath: this._cur(this.card, 'clip-path', `circle(${FROST_FULL} at ${at})`) },
        { clipPath: `circle(0% at ${at})` },
      ], 380, { delay: 50, easing: 'cubic-bezier(0.35, 0, 0.65, 0.7)' }),
      this._a(this.scrim, [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 380, { delay: 60, easing: 'ease-in-out' }),
    ])
  },

  eruption() {
    const H = window.innerHeight
    return Promise.all([
      this._a(this.card, [
        { opacity: this._cur(this.card, 'opacity', '1'), transform: this._cur(this.card, 'transform', 'none') },
        { opacity: 0, transform: 'translateY(30vh) scale(0.97)' },
      ], 340, { easing: EASE.in }),
      this._a(this.scrim, [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 360, { delay: 60, easing: 'ease-in-out' }),
      // a last few embers drift up as it drops
      ...this._embers(8).map((el, i) => this._a(el, [
        { opacity: 0, transform: 'translate(0, 0)' },
        { opacity: 0.9, transform: `translate(0, ${(-0.06 * H).toFixed(1)}px)`, offset: 0.3 },
        { opacity: 0, transform: `translate(${(i - 4) * 10}px, ${(-0.18 * H).toFixed(1)}px)` },
      ], 600, { delay: 120 + i * 20, easing: 'ease-out' })),
    ])
  },

  mirage() {
    return Promise.all([
      this._a(this.scrim, [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 420, { easing: 'ease-in-out' }),
      this._a(this.card, [
        { opacity: this._cur(this.card, 'opacity', '1'), transform: this._cur(this.card, 'transform', 'none') },
        { opacity: 0.6, transform: 'translateY(-6px) scale(0.98, 0.96) skewX(0.6deg)', easing: 'ease-in-out' },
        { opacity: 0, transform: 'translateY(-16px) scale(0.95, 0.9) skewX(-0.8deg)' },
      ], 420, { easing: EASE.in }),
    ])
  },

  night() {
    return Promise.all([
      this._a(this.head,    [{ opacity: this._cur(this.head, 'opacity', '1') }, { opacity: 0 }], 200, { easing: EASE.in }),
      this._a(this.content, [{ opacity: this._cur(this.content, 'opacity', '1') }, { opacity: 0 }], 200, { easing: EASE.in }),
      this._a(this.card,    [{ opacity: this._cur(this.card, 'opacity', '1') }, { opacity: 0 }], 300, { delay: 80, easing: EASE.in }),
      this._a(this.scrim,   [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 560, { delay: 180, easing: 'ease-in-out' }),
    ])
  },
}

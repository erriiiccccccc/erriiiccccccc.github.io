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
//   slab    Lava:     a slab pushes up from below, its edge flaring as it lands
//   mirage  Desert:   far away and wavy in the heat, then glides into focus
//   night   Pirate:   the world falls away into a night sky
//
// Motion rules: enters 0.5 to 1.2 s with an ease-out, exits roughly half that
// with an ease-in, nothing loops, and reduced motion gets a short fade only.

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

const easeOutCubic = t => 1 - Math.pow(1 - t, 3)

export const isPhone = () => PHONE.matches

export class ShellDirector {
  constructor(panel) {
    this.panel   = panel
    this.scrim   = panel.querySelector('.wp-scrim')
    this.beam    = panel.querySelector('.wp-beam')
    this.card    = panel.querySelector('.wp-card')
    this.head    = panel.querySelector('.wp-header')
    this.content = panel.querySelector('.wp-content')
    this.edge    = panel.querySelector('.wp-edge')
    this.frost   = panel.querySelector('.wp-frost')
    this.map     = document.getElementById('wp-mirage-map')
    this.noise   = document.getElementById('wp-mirage-noise')
    this._anims  = []
    this._raf    = 0
    this._token  = 0
  }

  /** Cancel everything in flight and hand the look back to CSS. */
  stop() {
    this._token++
    cancelAnimationFrame(this._raf)
    for (const a of this._anims) a.cancel()
    this._anims = []
    for (const el of this._layers()) {
      if (!el) continue
      const s = el.style
      s.removeProperty('opacity'); s.removeProperty('transform')
      s.removeProperty('filter'); s.removeProperty('clip-path')
    }
    this.map?.setAttribute('scale', '0')
  }

  /**
   * Freeze whatever is mid-flight where it stands (inline styles), so an exit
   * that interrupts an entrance reverses from there instead of snapping open.
   */
  _freeze() {
    this._token++
    cancelAnimationFrame(this._raf)
    for (const a of this._anims) {
      try { if (a.playState !== 'finished') a.commitStyles() } catch { /* detached */ }
      a.cancel()
    }
    this._anims = []
  }

  _layers() { return [this.scrim, this.beam, this.card, this.head, this.content, this.edge, this.frost] }

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

  /** rAF tween for what WAAPI can't drive (SVG filter attributes). */
  _tween(duration, fn) {
    const tok = this._token
    return new Promise((resolve, reject) => {
      const t0 = performance.now()
      const step = (now) => {
        if (tok !== this._token) { reject(new Error('cancelled')); return }
        const t = Math.min(1, (now - t0) / duration)
        fn(t)
        if (t < 1) this._raf = requestAnimationFrame(step)
        else resolve()
      }
      this._raf = requestAnimationFrame(step)
    })
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

  /** Heavy filters are skipped on phones and on the low-quality glass setting. */
  _lowFx() {
    return isPhone() || document.documentElement.classList.contains('glass-solid')
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
  frost() {
    const at = isPhone() ? '50% 100%' : '100% 50%'
    const blurred = { opacity: 0.15, filter: 'blur(10px)' }
    const clear   = { opacity: 1, filter: 'blur(0px)' }
    return Promise.all([
      this._a(this.scrim, [{ opacity: 0 }, { opacity: 1 }], 520),
      this._a(this.card, [
        { clipPath: `circle(0% at ${at})` },
        { clipPath: `circle(150% at ${at})` },
      ], 760, { easing: EASE.cut }),
      this._a(this.frost, [
        { opacity: 1 }, { opacity: 1, offset: 0.42 }, { opacity: 0 },
      ], 1150, { easing: EASE.inOut }),
      this._a(this.head,    [blurred, { ...blurred, offset: 0.42 }, clear], 1150, { easing: EASE.inOut }),
      this._a(this.content, [blurred, { ...blurred, offset: 0.48 }, clear], 1200, { easing: EASE.inOut }),
    ])
  },

  // Lava. The slab pushes up from below the screen, overshoots by a hair and
  // settles; its molten top edge flares as it lands. main.js adds the ground
  // shake at the landing beat.
  slab() {
    return Promise.all([
      this._a(this.scrim, [{ opacity: 0 }, { opacity: 1 }], 480),
      this._a(this.card, [
        { transform: 'translateY(104%)' },
        { transform: 'translateY(-1.1%)', offset: 0.72 },
        { transform: 'translateY(0)' },
      ], 860, { easing: 'cubic-bezier(0.3, 0, 0.25, 1)' }),
      this._a(this.edge, [
        { opacity: 0.25 }, { opacity: 0.25, offset: 0.5 }, { opacity: 1, offset: 0.68 }, { opacity: 0.7 },
      ], 1200, { easing: 'ease-out' }),
      this._rise(this.head, 560, 420),
      this._rise(this.content, 630, 460),
    ])
  },

  // Desert. Starts small, high and wavering like heat over sand, then glides
  // forward and sharpens. The waver is an SVG displacement filter driven per
  // frame; the low-quality path keeps the glide and blur without it.
  mirage() {
    const card = this.card
    const useFilter = !this._lowFx()
    card.style.opacity = '0'
    return Promise.all([
      this._a(this.scrim, [{ opacity: 0 }, { opacity: 1 }], 650),
      this._rise(this.head, 600, 420, 6),
      this._rise(this.content, 660, 480, 8),
      this._tween(1050, (t) => {
        const e = easeOutCubic(t)
        card.style.opacity   = String(Math.min(1, t / 0.38))
        card.style.transform = `translateY(${(-26 * (1 - e)).toFixed(2)}px) scale(${(0.9 + 0.1 * e).toFixed(4)})`
        const blur = (9 * (1 - e)).toFixed(2)
        card.style.filter = useFilter ? `url(#wp-mirage) blur(${blur}px)` : `blur(${blur}px)`
        if (useFilter) {
          this.map.setAttribute('scale', (42 * (1 - e)).toFixed(1))
          this.noise.setAttribute('baseFrequency', `0.006 ${(0.045 + 0.02 * Math.sin(t * 22)).toFixed(4)}`)
        }
      }),
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

  cinema() {
    return Promise.all([
      this._a(this.head,    [{ opacity: this._cur(this.head, 'opacity', '1') }, { opacity: 0 }], 140, { easing: EASE.in }),
      this._a(this.content, [{ opacity: this._cur(this.content, 'opacity', '1') }, { opacity: 0 }], 140, { easing: EASE.in }),
      this._a(this.card, [
        { clipPath: this._cur(this.card, 'clip-path', 'inset(0% 0 0% 0)') },
        { clipPath: 'inset(49.7% 0 49.7% 0)' },
      ], 340, { delay: 90, easing: 'cubic-bezier(0.7, 0, 0.84, 0)' }),
      this._a(this.beam, [
        { transform: 'scaleX(1)', opacity: 0 },
        { transform: 'scaleX(1)', opacity: 0.85, offset: 0.25 },
        { transform: 'scaleX(0)', opacity: 0 },
      ], 380, { delay: 400, easing: EASE.in }),
      this._a(this.scrim, [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 340, { delay: 460, easing: 'ease-in-out' }),
    ])
  },

  frost() {
    const at = isPhone() ? '50% 100%' : '100% 50%'
    const from = (el) => ({ opacity: this._cur(el, 'opacity', '1'), filter: this._cur(el, 'filter', 'blur(0px)') })
    const blurred = { opacity: 0.2, filter: 'blur(8px)' }
    return Promise.all([
      this._a(this.frost,   [{ opacity: this._cur(this.frost, 'opacity', '0') }, { opacity: 1 }], 200, { easing: 'ease-out' }),
      this._a(this.head,    [from(this.head), blurred], 200),
      this._a(this.content, [from(this.content), blurred], 200),
      this._a(this.card, [
        { clipPath: this._cur(this.card, 'clip-path', `circle(150% at ${at})`) },
        { clipPath: `circle(0% at ${at})` },
      ], 380, { delay: 160, easing: EASE.in }),
      this._a(this.scrim, [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 380, { delay: 140, easing: 'ease-in-out' }),
    ])
  },

  slab() {
    return Promise.all([
      this._a(this.card, [
        { transform: this._cur(this.card, 'transform', 'translateY(0)') },
        { transform: 'translateY(104%)' },
      ], 380, { easing: 'cubic-bezier(0.5, 0, 0.75, 0)' }),
      this._a(this.scrim, [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 380, { easing: 'ease-in-out' }),
    ])
  },

  mirage() {
    const card = this.card
    const useFilter = !this._lowFx()
    const o0 = Math.min(1, parseFloat(card.style.opacity || '1'))
    card.style.opacity = String(o0)   // hold it where it is until the first tween frame
    return Promise.all([
      this._a(this.scrim, [{ opacity: this._cur(this.scrim, 'opacity', '1') }, { opacity: 0 }], 420, { easing: 'ease-in-out' }),
      this._tween(420, (t) => {
        const e = t * t
        card.style.opacity   = String(o0 * (1 - Math.min(1, t * 1.15)))
        card.style.transform = `translateY(${(-16 * e).toFixed(2)}px) scale(${(1 - 0.05 * e).toFixed(4)})`
        const blur = (6 * e).toFixed(2)
        card.style.filter = useFilter ? `url(#wp-mirage) blur(${blur}px)` : `blur(${blur}px)`
        if (useFilter) {
          this.map.setAttribute('scale', (30 * e).toFixed(1))
          this.noise.setAttribute('baseFrequency', `0.006 ${(0.045 + 0.02 * Math.sin(t * 22)).toFixed(4)}`)
        }
      }),
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

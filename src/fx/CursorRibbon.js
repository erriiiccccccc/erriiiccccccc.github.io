// A ribbon of light that trails the pointer and fades out behind it. About screen only.
//
// One 2D canvas laid over the scene and under the cards (it's the overlay's first child, so
// everything after it paints on top). It only draws while the pointer is moving or the trail is
// still fading: a still pointer costs nothing. No ribbon on touch screens (there is no pointer to
// follow) or with reduced motion.

const LIFE = 0.55          // seconds a point of the trail lasts
const MAX_DPR = 1.5

export class CursorRibbon {
  /** @param {HTMLElement} host the overlay to draw over; the canvas becomes its first child */
  constructor(host) {
    this._host = host
    this._pts = []           // { x, y, t }
    this._raf = 0
    this._on = false
    this._canvas = document.createElement('canvas')
    this._canvas.className = 'about-ribbon'
    this._canvas.setAttribute('aria-hidden', 'true')
    host.prepend(this._canvas)
    this._ctx = this._canvas.getContext('2d')
    this._move = (e) => {
      if (!this._on || e.pointerType === 'touch') return
      const now = performance.now() / 1000, last = this._pts[this._pts.length - 1]
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 3) { last.t = now; return }      // barely moved: keep the tip alive, add nothing
      this._pts.push({ x: e.clientX, y: e.clientY, t: now })
      if (this._pts.length > 80) this._pts.shift()
      if (!this._raf) this._raf = requestAnimationFrame(this._draw)
    }
    this._draw = () => {
      this._raf = 0
      const ctx = this._ctx, now = performance.now() / 1000
      this._fit()
      ctx.clearRect(0, 0, this._w, this._h)
      while (this._pts.length && now - this._pts[0].t > LIFE) this._pts.shift()
      const pts = this._pts
      if (pts.length < 2) { if (pts.length) this._raf = requestAnimationFrame(this._draw); return }
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'
      const k = Math.max(0.7, Math.min(1.25, this._w / 1440))
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i]
        const f = Math.max(0, 1 - (now - b.t) / LIFE) * (i / pts.length)      // young, and near the tip
        // through the midpoints, so a fast pointer leaves a curve, not corners
        const p0 = i > 1 ? { x: (pts[i - 2].x + a.x) / 2, y: (pts[i - 2].y + a.y) / 2 } : a
        const p1 = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
        // the glow: violet at the tail, gold at the tip
        ctx.strokeStyle = `rgba(${Math.round(167 + 88 * f)},${Math.round(139 + 60 * f)},${Math.round(250 - 190 * f)},${0.15 * f})`
        ctx.lineWidth = 22 * f * k
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.quadraticCurveTo(a.x, a.y, p1.x, p1.y); ctx.stroke()
        // the bright core
        ctx.strokeStyle = `rgba(255,244,214,${0.85 * f})`
        ctx.lineWidth = 3.2 * f * k
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.quadraticCurveTo(a.x, a.y, p1.x, p1.y); ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'
      this._raf = requestAnimationFrame(this._draw)
    }
  }

  _fit() {
    const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1), w = window.innerWidth, h = window.innerHeight
    const cw = Math.round(w * dpr), ch = Math.round(h * dpr)
    if (this._canvas.width !== cw || this._canvas.height !== ch) { this._canvas.width = cw; this._canvas.height = ch }
    this._w = w; this._h = h
    this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  /** Start following the pointer (the About screen opened). */
  start() {
    if (this._on) return
    const calm = document.body.classList.contains('reduced-motion') || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (calm || window.matchMedia?.('(hover: none)').matches) return
    this._on = true
    window.addEventListener('pointermove', this._move, { passive: true })
  }

  /** Stop and clear (the About screen closed). */
  stop() {
    if (!this._on) return
    this._on = false
    window.removeEventListener('pointermove', this._move)
    cancelAnimationFrame(this._raf); this._raf = 0
    this._pts.length = 0
    this._fit(); this._ctx.clearRect(0, 0, this._w, this._h)
  }
}

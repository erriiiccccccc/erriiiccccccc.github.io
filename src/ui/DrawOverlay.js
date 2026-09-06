// The drawing pad behind the telescope.
//
// White paper, a handful of pens, one eraser. Deliberately not a paint app.
//
// Strokes are kept as vectors ({ color, size, erase, points }) rather than
// pixel snapshots, which makes undo free and keeps memory flat no matter how
// long someone doodles. Completed strokes are baked into an offscreen canvas
// so the live stroke only ever costs one drawImage plus its own path.
import { svgIcon } from './icons.js'
import { cleanName, postDoodle, MAX_DATA_URL } from '../gallery/galleryApi.js'

const W = 900               // paper resolution, 4:3
const H = 675
const PAPER = '#FFFFFF'

const COLORS = [
  '#1B1B1F', '#E53935', '#FB923C', '#FBBF24', '#4CAF50',
  '#0EA5A5', '#64B5F6', '#7C3AED', '#EC4899', '#8D6E63',
]
const SIZES = [
  { key: 's', px: 4,  dot: 6 },
  { key: 'm', px: 9,  dot: 11 },
  { key: 'l', px: 20, dot: 17 },
]

export class DrawOverlay {
  constructor() {
    /** Called with the freshly posted item once a drawing goes up. */
    this.onPosted = null
    /** Called when the pad closes so the gallery can take focus back. */
    this.onClose  = null

    this._strokes = []
    this._current = null
    this._color   = COLORS[0]
    this._size    = SIZES[1]
    this._erase   = false
    this._sending = false

    this._build()
  }

  // ── DOM ───────────────────────────────────────────────────────────────────

  _build() {
    const el = document.createElement('div')
    el.id        = 'draw-overlay'
    el.className = 'overlay-modal'
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-labelledby', 'draw-title')

    const swatches = COLORS.map((c, i) => `
      <button class="dr-swatch${i === 0 ? ' is-on' : ''}" type="button"
              data-color="${c}" style="--sw:${c}"
              aria-label="Pen colour ${i + 1}" aria-pressed="${i === 0}"></button>
    `).join('')

    const sizes = SIZES.map(s => `
      <button class="dr-size${s.key === 'm' ? ' is-on' : ''}" type="button"
              data-size="${s.key}" aria-label="${s.key === 's' ? 'Thin' : s.key === 'm' ? 'Medium' : 'Thick'} pen"
              aria-pressed="${s.key === 'm'}">
        <span class="dr-size-dot" style="width:${s.dot}px;height:${s.dot}px"></span>
      </button>
    `).join('')

    el.innerHTML = `
      <div class="overlay-inner draw-inner">
        <div class="overlay-header">
          <span class="overlay-title overlay-title--icon" id="draw-title">
            ${svgIcon('pencil', 18)} Draw Your One
          </span>
          <button class="overlay-x" id="draw-close" type="button" aria-label="Back to the wall">✕</button>
        </div>
        <p class="overlay-sub">Anything you want. It goes straight up on the wall.</p>

        <div class="dr-stage">
          <div class="dr-rail" role="toolbar" aria-label="Drawing tools">
            <div class="dr-swatches">${swatches}</div>
            <div class="dr-rail-div" aria-hidden="true"></div>
            <div class="dr-sizes">${sizes}</div>
            <div class="dr-rail-div" aria-hidden="true"></div>
            <div class="dr-tools">
              <button class="dr-tool" type="button" data-tool="eraser" aria-pressed="false"
                      aria-label="Eraser">${svgIcon('eraser', 17)}<span>Erase</span></button>
              <button class="dr-tool" type="button" data-tool="undo"
                      aria-label="Undo last stroke">${svgIcon('undo', 17)}<span>Undo</span></button>
              <button class="dr-tool dr-tool--warn" type="button" data-tool="clear"
                      aria-label="Clear the paper">${svgIcon('trash', 17)}<span>Clear</span></button>
            </div>
          </div>

          <div class="dr-paper-wrap">
            <canvas class="dr-paper" id="dr-canvas" width="${W}" height="${H}"
                    aria-label="Drawing paper" role="img"></canvas>
            <p class="dr-paper-hint" id="dr-hint">start scribbling</p>
          </div>
        </div>

        <div class="dr-sign">
          <label class="dr-name-field">
            <span class="dr-name-label">Sign it</span>
            <input id="dr-name" class="dr-name" type="text" maxlength="24"
                   placeholder="your name" autocomplete="off" spellcheck="false">
          </label>
          <button class="dr-anon" id="dr-anon" type="button" aria-pressed="false">
            ${svgIcon('ghost', 15)}<span>post anonymously</span>
          </button>
          <button class="dr-post" id="dr-post" type="button">Put it on the wall</button>
        </div>
        <p class="dr-note" id="dr-note">if you're really that shy, go anonymous.</p>
      </div>
    `

    document.body.appendChild(el)
    this._el = el

    this._canvas = el.querySelector('#dr-canvas')
    this._ctx    = this._canvas.getContext('2d')
    this._hint   = el.querySelector('#dr-hint')
    this._nameEl = el.querySelector('#dr-name')
    this._anonEl = el.querySelector('#dr-anon')
    this._postEl = el.querySelector('#dr-post')
    this._noteEl = el.querySelector('#dr-note')

    // Offscreen bake of everything already finished
    this._base    = document.createElement('canvas')
    this._base.width  = W
    this._base.height = H
    this._baseCtx = this._base.getContext('2d')

    this._wireTools()
    this._wirePointer()

    el.querySelector('#draw-close').addEventListener('click', () => this.close())
    el.addEventListener('click', e => { if (e.target === el) this.close() })

    this._repaint()
  }

  _wireTools() {
    const el = this._el

    el.querySelectorAll('.dr-swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        this._color = btn.dataset.color
        this._setErase(false)
        el.querySelectorAll('.dr-swatch').forEach(b => {
          const on = b === btn
          b.classList.toggle('is-on', on)
          b.setAttribute('aria-pressed', String(on))
        })
      })
    })

    el.querySelectorAll('.dr-size').forEach(btn => {
      btn.addEventListener('click', () => {
        this._size = SIZES.find(s => s.key === btn.dataset.size) || SIZES[1]
        el.querySelectorAll('.dr-size').forEach(b => {
          const on = b === btn
          b.classList.toggle('is-on', on)
          b.setAttribute('aria-pressed', String(on))
        })
      })
    })

    el.querySelector('[data-tool="eraser"]').addEventListener('click', () => {
      this._setErase(!this._erase)
    })
    el.querySelector('[data-tool="undo"]').addEventListener('click', () => this._undo())
    el.querySelector('[data-tool="clear"]').addEventListener('click', () => this._clear())

    this._anonEl.addEventListener('click', () => this._setAnon(this._anonEl.getAttribute('aria-pressed') !== 'true'))
    this._postEl.addEventListener('click', () => this._post())
    this._nameEl.addEventListener('input', () => { if (this._nameEl.value) this._setAnon(false) })

    // Ctrl+Z inside the pad only. Global keys are already gated on overlays.
    this._onKey = e => {
      if (!this.isOpen()) return
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); this._undo() }
    }
    document.addEventListener('keydown', this._onKey)
  }

  _setErase(on) {
    this._erase = on
    const btn = this._el.querySelector('[data-tool="eraser"]')
    btn.classList.toggle('is-on', on)
    btn.setAttribute('aria-pressed', String(on))
    this._canvas.classList.toggle('is-erasing', on)
  }

  _setAnon(on) {
    this._anonEl.classList.toggle('is-on', on)
    this._anonEl.setAttribute('aria-pressed', String(on))
    this._nameEl.disabled = on
    if (on) this._nameEl.value = ''
    this._nameEl.placeholder = on ? 'anonymous' : 'your name'
  }

  // ── Pointer → strokes ─────────────────────────────────────────────────────

  _wirePointer() {
    const c = this._canvas

    const pt = e => {
      const r = c.getBoundingClientRect()
      return {
        x: (e.clientX - r.left) * (W / r.width),
        y: (e.clientY - r.top)  * (H / r.height),
      }
    }

    c.addEventListener('pointerdown', e => {
      if (e.button != null && e.button !== 0) return
      e.preventDefault()
      c.setPointerCapture(e.pointerId)
      this._current = {
        color:  this._erase ? PAPER : this._color,
        size:   this._erase ? this._size.px * 2.4 : this._size.px,
        points: [pt(e)],
      }
      this._hint.classList.add('is-gone')
      this._drawLive()
    })

    c.addEventListener('pointermove', e => {
      if (!this._current) return
      e.preventDefault()
      const p = pt(e)
      const last = this._current.points[this._current.points.length - 1]
      // Skip sub-pixel jitter so the point list stays small enough to replay
      if (Math.abs(p.x - last.x) < 0.7 && Math.abs(p.y - last.y) < 0.7) return
      this._current.points.push(p)
      this._drawLive()
    })

    const end = e => {
      if (!this._current) return
      if (e?.pointerId != null && c.hasPointerCapture?.(e.pointerId)) c.releasePointerCapture(e.pointerId)
      this._strokes.push(this._current)
      strokePath(this._baseCtx, this._current)
      this._current = null
      this._repaint()
    }
    c.addEventListener('pointerup', end)
    c.addEventListener('pointercancel', end)
    c.addEventListener('pointerleave', end)

    // Stop the page/world from scrolling under a finger drag
    c.addEventListener('touchstart', e => e.preventDefault(), { passive: false })
    c.addEventListener('touchmove',  e => e.preventDefault(), { passive: false })
  }

  _drawLive() {
    const ctx = this._ctx
    ctx.clearRect(0, 0, W, H)
    ctx.drawImage(this._base, 0, 0)
    if (this._current) strokePath(ctx, this._current)
  }

  /** Rebuild the baked layer from the stroke list, then blit it. */
  _repaint() {
    const b = this._baseCtx
    b.fillStyle = PAPER
    b.fillRect(0, 0, W, H)
    for (const s of this._strokes) strokePath(b, s)
    this._ctx.clearRect(0, 0, W, H)
    this._ctx.drawImage(this._base, 0, 0)
    this._hint.classList.toggle('is-gone', this._strokes.length > 0)
  }

  _undo() {
    if (!this._strokes.length) return
    this._strokes.pop()
    this._repaint()
  }

  _clear() {
    if (!this._strokes.length) return
    this._strokes = []
    this._repaint()
  }

  // ── Posting ───────────────────────────────────────────────────────────────

  _note(text, kind = '') {
    this._noteEl.textContent = text
    this._noteEl.className = `dr-note${kind ? ` dr-note--${kind}` : ''}`
  }

  async _post() {
    if (this._sending) return
    if (!this._strokes.length) { this._note('the paper is still blank!', 'warn'); return }

    const anon = this._anonEl.getAttribute('aria-pressed') === 'true'
    const name = anon ? '' : cleanName(this._nameEl.value)
    if (!anon && !name) { this._note('put a name on it, or go anonymous.', 'warn'); return }

    this._sending = true
    this._postEl.disabled = true
    this._postEl.textContent = 'sending'
    this._note('hanging it up...')

    try {
      const dataUrl = this._canvas.toDataURL('image/png')
      if (dataUrl.length > MAX_DATA_URL) throw new Error('too-big')

      const { item, offline } = await postDoodle({ name, dataUrl })
      this._strokes = []
      this._repaint()
      this._nameEl.value = ''
      this._setAnon(false)
      this.onPosted?.(item, offline)
      this.close()
    } catch (err) {
      this._note(err?.message === 'too-big'
        ? 'that drawing is a bit too heavy. try a simpler one.'
        : 'could not hang it up. try again in a sec.', 'warn')
    } finally {
      this._sending = false
      this._postEl.disabled = false
      this._postEl.textContent = 'Put it on the wall'
    }
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  open() {
    this._note("if you're really that shy, go anonymous.")
    this._el.classList.add('is-open')
    // Unfinished art survives a close, so only repaint, never reset
    this._repaint()
    queueMicrotask(() => this._el.querySelector('#draw-close')?.focus())
  }

  close() {
    if (!this.isOpen()) return
    this._el.classList.remove('is-open')
    this.onClose?.()
  }

  isOpen() { return this._el.classList.contains('is-open') }

  /** True when there is work someone would be sad to lose. */
  hasArt() { return this._strokes.length > 0 }
}

/**
 * Render one stroke. Midpoint quadratics keep fast scribbles from looking
 * like polygons without needing any smoothing pass over the point list.
 */
function strokePath(ctx, stroke) {
  const pts = stroke.points
  ctx.save()
  ctx.strokeStyle = stroke.color
  ctx.fillStyle   = stroke.color
  ctx.lineWidth   = stroke.size
  ctx.lineCap     = 'round'
  ctx.lineJoin    = 'round'

  if (pts.length < 2) {
    ctx.beginPath()
    ctx.arc(pts[0].x, pts[0].y, stroke.size / 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    return
  }

  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2
    const my = (pts[i].y + pts[i + 1].y) / 2
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my)
  }
  const last = pts[pts.length - 1]
  ctx.lineTo(last.x, last.y)
  ctx.stroke()
  ctx.restore()
}

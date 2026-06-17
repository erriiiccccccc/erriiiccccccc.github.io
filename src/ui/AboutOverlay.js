// About Me overlay — pure CSS/DOM; the 3D character stays in the main scene.
// No second renderer here. main.js handles presentation mode, camera zoom,
// and bone-based mouse tracking on the in-world modelGroup.
import { svgIcon } from './icons.js'

const BASE = import.meta.env.BASE_URL || '/'

export class AboutOverlay {
  constructor() {
    this._el = null

    /** Called immediately when close() is triggered (before fade-out finishes). */
    this.onStartClose = null
    /** Called after the 350 ms fade-out is complete. */
    this.onClose = null
    /** Optional predicate (event) → bool. Run on a click that lands on the empty
     *  backdrop; return false to keep the overlay open. main.js wires this to a
     *  raycast so clicking the character (drawn in the canvas behind) doesn't
     *  dismiss — only genuinely empty space does. */
    this.shouldCloseFromBackdrop = null

    this._build()
  }

  // ── Build DOM ────────────────────────────────────────────────────────────────
  _build() {
    const el = document.createElement('div')
    el.id = 'about-overlay'
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-modal', 'true')
    el.setAttribute('aria-label', 'About Eric')

    el.innerHTML = `
      <button class="about-close" type="button" aria-label="Close">${svgIcon('close', 18, 2)}</button>

      <!-- Warm spotlight grounding the character -->
      <div class="about-stage" aria-hidden="true"></div>

      <!-- Brand sign — the ERIC NG wordmark on a warm plaque, top-center -->
      <div class="about-brand">
        <img class="about-brand-img" src="${BASE}ericnglogo.png" alt="Eric Ng" width="1080" height="355" draggable="false">
      </div>

      <!-- Interact hint — floats below the brand sign -->
      <div class="about-hint" aria-hidden="true">
        <span class="about-hint-dot"></span>
        move your cursor — he's watching
      </div>

      <!-- Hero nameplate dock -->
      <div class="about-dock">
        <div class="about-dock-row about-dock-top">
          <div class="about-identity">
            <div class="about-chip" aria-hidden="true">${svgIcon('leaf', 26)}</div>
            <div class="about-id">
              <div class="about-eyebrow">About Me</div>
              <div class="about-name-row">
                <h2 class="about-name">Eric Ng Min Chern</h2>
                <span class="about-status"><span class="about-status-dot"></span>Open to Work</span>
              </div>
              <p class="about-role">Final-year CS @ University of Edinburgh · Graduating 2026 · Ex-Barclays &amp; BlackRock</p>
            </div>
          </div>
          <div class="about-actions">
            <a class="about-icon" href="mailto:ericng8766@gmail.com" aria-label="Email Eric">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
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
        <div class="about-dock-row about-dock-bottom">
          <p class="about-tagline">I build things that are useful, interactive, or just a bit unexpected — like this whole world, written from scratch in Three.js.</p>
          <div class="about-meta">
            <span><b>6</b> islands</span>
            <span class="about-meta-dot">·</span>
            <span><b>100%</b> procedural</span>
            <span class="about-meta-dot">·</span>
            <span>built in <b>Three.js</b></span>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(el)
    this._el = el

    el.querySelector('.about-close').addEventListener('click', () => this.close())
    // Only a click on the bare backdrop (not on any chrome) can dismiss — and even
    // then, the predicate gets a veto (e.g. the click landed on the character).
    el.addEventListener('click', e => {
      if (e.target !== el) return
      if (this.shouldCloseFromBackdrop && !this.shouldCloseFromBackdrop(e)) return
      this.close()
    })
  }

  // ── Open: fade in the CSS overlay; main.js handles the 3D transition ─────────
  open() {
    if (this.isOpen()) return
    this._el.classList.remove('is-closing')
    this._el.classList.add('is-open')
  }

  // ── Close: fire onStartClose immediately, then fade out and call onClose ─────
  close() {
    if (!this.isOpen()) return
    this.onStartClose?.()
    this._el.classList.add('is-closing')
    setTimeout(() => {
      this._el.classList.remove('is-open', 'is-closing')
      this.onClose?.()
    }, 350)
  }

  isOpen() { return this._el.classList.contains('is-open') }
}

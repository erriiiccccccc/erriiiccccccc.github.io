// Desert Island: Contact. A real email form (posted to Web3Forms, which relays
// to ericng8766@gmail.com) beside the photo of Eric and his friends in Morocco.
//
// What makes it more than a form:
//   - a strip of sky over the form shows the real time in London: the sun or
//     the moon where it actually is, stars at night, and an honest line about
//     when a reply is likely. The photo takes on the same light.
//   - "What's this about?" comes first. One tap reshapes the form: hiring adds
//     Company and Role, a project adds Timeline, and the prompt changes.
//   - the email row copies instead of opening a mail app; LinkedIn is the big
//     button for anyone who wants the full work history
//   - drafts survive closing the panel; Ctrl/Cmd + Enter sends; errors show
//     beside the field once you leave it
//   - on send, a paper plane lifts off the button and flies into the sky
//
// The Web3Forms access key is public by design (it only permits sending TO the
// verified inbox), so it lives in committed code.
import { svgIcon } from '../ui/icons.js'
import { sfx } from '../audio/sfx.js'

const BASE = import.meta.env.BASE_URL || '/'
const EMAIL = 'ericng8766@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/erriiiccccccc/'
const DRAFT_KEY = 'ew-contact-draft-v1'

const WEB3FORMS_KEY = 'a6074af4-eff5-4f1f-8ffe-b1f0fcf63f9a'
const CONFIGURED = !!WEB3FORMS_KEY && !WEB3FORMS_KEY.startsWith('YOUR_')
const MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '')

const svg = (d, s = 16) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`
const ICON = {
  copy: svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
  check: svg('<path d="M20 6 9 17l-5-5"/>'),
  plane: '<svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true"><path d="M22 2 2 10.5l7.2 2.4L19 6l-7.6 8.2.2 6.8 3.5-4.6 3.9 2.6z"/></svg>',
}

/** What it's about → what the form asks for. `hi` is the default. */
const INTENTS = [
  { v: 'hire',    label: "I'm hiring",     subject: 'Hiring',        ph: "What's the role, and who's the team? Links welcome." },
  { v: 'project', label: 'Got a project',  subject: 'A project',     ph: 'What are you building, and roughly what do you need?' },
  { v: 'collab',  label: "Let's collab",   subject: 'A collab',      ph: 'What do you have in mind?' },
  { v: 'hi',      label: 'Just saying hi', subject: 'Someone said hi', ph: 'Say hi, ask anything, tell me about your day.' },
]

const SOCIALS = [
  ['github',    'GitHub',    'erriiiccccccc', 'https://github.com/erriiiccccccc'],
  ['instagram', 'Instagram', '@ericccc____',  'https://www.instagram.com/ericccc____/'],
]
// two compact buttons side by side, so the photo keeps a clear band for the people in it
const socialRows = `<div class="ca-mini">${SOCIALS.map(([icon, label, handle, href]) => `
  <a class="contact-row contact-row--mini" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}: ${handle}">
    <span class="contact-ic">${svgIcon(icon, 18)}</span>
    <span class="contact-text">${label}</span>
    <span class="contact-go">${svgIcon('arrowRight', 15)}</span>
  </a>`).join('')}</div>`

const field = (name, label, attrs, { optional = false } = {}) => `
  <label class="cf-field">
    <span class="cf-label">${label}${optional ? ' <i>optional</i>' : ''}</span>
    <input class="cf-input" name="${name}" ${attrs}>
    <span class="cf-error" data-for="${name}" aria-live="polite"></span>
  </label>`

const formHTML = CONFIGURED ? `
  <form class="contact-form" id="contact-form" novalidate>
    <input type="hidden" name="access_key" value="${WEB3FORMS_KEY}">
    <input type="hidden" name="subject" value="Someone said hi, from Eric's World">
    <input type="hidden" name="from_name" value="Eric's World">
    <input type="checkbox" name="botcheck" class="cf-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <fieldset class="cf-intent">
      <legend class="cf-label">What's this about?</legend>
      <div class="cf-chips">
        ${INTENTS.map(i => `<label class="cf-chip"><input type="radio" name="intent" value="${i.v}"${i.v === 'hi' ? ' checked' : ''}><span>${i.label}</span></label>`).join('')}
      </div>
    </fieldset>
    <div class="cf-row">
      ${field('name', 'Name', 'type="text" required autocomplete="name" placeholder="Your name"')}
      ${field('email', 'Email', 'type="email" required autocomplete="email" placeholder="you@example.com"')}
    </div>
    <div class="cf-extra" data-for="hire" inert><div class="cf-extra-in"><div class="cf-row">
      ${field('company', 'Company', 'type="text" autocomplete="organization" placeholder="Where you work"', { optional: true })}
      ${field('role', 'Role', 'type="text" placeholder="The role you have in mind"', { optional: true })}
    </div></div></div>
    <div class="cf-extra" data-for="project" inert><div class="cf-extra-in">
      ${field('timeline', 'Timeline', 'type="text" placeholder="For example: live by March"', { optional: true })}
    </div></div>
    <label class="cf-field cf-field--msg">
      <span class="cf-label">Message</span>
      <textarea class="cf-input cf-textarea" name="message" required rows="4" placeholder="Say hi, ask anything, tell me about your day."></textarea>
      <span class="cf-error" data-for="message" aria-live="polite"></span>
    </label>
    <div class="cf-actions">
      <button class="cf-submit" type="submit">${svgIcon('send', 16)} <span>Send message</span></button>
      <div class="cf-foot">
        <span class="cf-draft" aria-hidden="true">${ICON.check} Draft saved</span>
        <span class="cf-kbd" aria-hidden="true"><kbd>${MAC ? '⌘' : 'Ctrl'}</kbd><kbd>Enter</kbd> sends</span>
      </div>
      <span class="cf-status" role="status" aria-live="polite"></span>
    </div>
  </form>
  <div class="cf-sent" hidden>
    <div class="cf-success-ic">${svgIcon('send', 26)}</div>
    <h4>Message sent!</h4>
    <p class="cf-sent-line">Thanks for reaching out. I'll get back to you soon.</p>
    <button type="button" class="cf-again">Send another</button>
  </div>` : `
  <div class="cf-notice">The contact form isn't configured yet. Reach me directly on the left.</div>`

export const CONTACT_HTML = `
  <div class="contact-split">
    <aside class="contact-aside">
      <div class="ca-stage">
      <div class="ca-photo" style="background-image:url('${BASE}islandphoto/travelislandphoto.jpeg')" role="img" aria-label="Eric and three friends on the walls of a kasbah in Morocco"></div>
      <div class="ca-tint" aria-hidden="true"></div>
      <div class="ca-scrim" aria-hidden="true"></div>
      <div class="ca-body">
        <span class="ca-eyebrow">Say hey</span>
        <h2 class="ca-title">Let's build something cool.</h2>
        <p class="ca-blurb">Got a project, a role, or just wanna say hi? Drop me a line.
        I read everything and reply fast.</p>
        <div class="ca-pills">
          <span class="ca-pill ca-pill--live"><span class="ca-dot"></span>Open to work</span>
          <span class="ca-pill">${svgIcon('mapPin', 13)}London, UK</span>
          <span class="ca-pill">${svgIcon('clock', 13)}Replies in ~a day</span>
        </div>
      </div>
      </div>
      <div class="ca-socials">
        <a class="ca-li" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">
          <span class="ca-li-ic">${svgIcon('linkedin', 20)}</span>
          <span class="ca-li-text"><b>LinkedIn</b><small>My full work history</small></span>
          ${svgIcon('external', 16)}
        </a>
        <button type="button" class="contact-row contact-row--copy" data-copy="${EMAIL}" aria-label="Copy my email address, ${EMAIL}">
          <span class="contact-ic">${svgIcon('mail', 18)}</span>
          <span class="contact-meta">
            <span class="contact-label">Email <i class="contact-hint">tap to copy</i></span>
            <span class="contact-text">${EMAIL}</span>
          </span>
          <span class="contact-go contact-go--copy">${ICON.copy}</span>
        </button>
        ${socialRows}
      </div>
    </aside>

    <div class="contact-main">
      <div class="sky" role="img" aria-label="The sky over London right now">
        <div class="sky-stars" aria-hidden="true"></div>
        <i class="sky-sun" aria-hidden="true"></i><i class="sky-moon" aria-hidden="true"></i>
        <svg class="sky-dunes" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
          <path class="sky-dune sky-dune--3" d="M0 22 Q 90 6 190 18 T 400 12 V40 H0 Z"/>
          <path class="sky-dune sky-dune--2" d="M0 30 Q 120 14 250 26 T 400 22 V40 H0 Z"/>
          <path class="sky-dune sky-dune--1" d="M0 37 Q 140 26 270 34 T 400 32 V40 H0 Z"/>
        </svg>
        <p class="sky-text"><b class="sky-time">London</b><span class="sky-line"></span></p>
      </div>
      ${formHTML}
    </div>
    <div class="cf-toast" role="status" aria-live="polite"></div>
  </div>
`

const calm = () => document.body.classList.contains('reduced-motion') || (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)

// ── The true sky ─────────────────────────────────────────────────────────────
/** London's clock right now: hour as a decimal, its UTC offset, day of year, weekday (0 = Sunday). */
function londonNow() {
  const d = new Date()
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: 'numeric', minute: 'numeric', weekday: 'short', hour12: false }).formatToParts(d)
  const get = (t) => parts.find(p => p.type === t)?.value
  const h = Number(get('hour')) % 24, m = Number(get('minute'))
  const offset = (h - d.getUTCHours() + 24) % 24
  return {
    h: h + m / 60,
    offset: offset > 12 ? 0 : offset,
    doy: Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5),
    dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')),
  }
}
const hex = (c) => { const n = parseInt(c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255] }
const mix = (a, b, t) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})` }

function startSky(wrap) {
  const sky = wrap.querySelector('.sky'), sun = sky.querySelector('.sky-sun'), moon = sky.querySelector('.sky-moon')
  const timeEl = sky.querySelector('.sky-time'), lineEl = sky.querySelector('.sky-line'), tint = wrap.querySelector('.ca-tint')
  // stars: fixed, scattered once
  let dots = ''
  for (let i = 0; i < 40; i++) dots += `<i style="left:${((i * 97.3) % 100).toFixed(1)}%;top:${((i * 53.7) % 70).toFixed(1)}%;--o:${(0.4 + (i % 3) * 0.25).toFixed(2)};--s:${i % 5 === 0 ? 2 : 1}px"></i>`
  sky.querySelector('.sky-stars').innerHTML = dots

  function paint() {
    const now = londonNow(), h = now.h
    // sunrise and sunset for London, near enough, from the day of the year
    const dayLen = 12.2 + 4.4 * Math.sin(2 * Math.PI * (now.doy - 80) / 365)
    const noon = 12.05 + now.offset
    const RISE = noon - dayLen / 2, SET = noon + dayLen / 2
    //      hour        top        middle     horizon    dunes      stars
    const K = [
      [0,          '#05061a', '#0d0f2e', '#1a1840', '#241d44', 1],
      [RISE - 1.2, '#070a24', '#1a1a45', '#2d2350', '#2a2148', 0.9],
      [RISE - 0.1, '#2a2358', '#a0507a', '#f39a6b', '#4a2a3a', 0.25],
      [RISE + 0.9, '#4f7cc4', '#9fc2e6', '#f7d6a6', '#c98a55', 0],
      [noon,       '#3d7fd6', '#8cc3ef', '#efe0c0', '#dba66a', 0],
      [SET - 1.4,  '#5a76c0', '#e3a77a', '#ffcf8a', '#c47f45', 0],
      [SET - 0.05, '#3a2a6b', '#c4566e', '#ff9a55', '#7a3b35', 0.1],
      [SET + 1.0,  '#120f35', '#3a2152', '#6b2f55', '#3a2244', 0.6],
      [24,         '#05061a', '#0d0f2e', '#1a1840', '#241d44', 1],
    ]
    let a = K[0], b = K[K.length - 1]
    for (let k = 0; k < K.length - 1; k++) if (h >= K[k][0] && h <= K[k + 1][0]) { a = K[k]; b = K[k + 1]; break }
    const t = (h - a[0]) / Math.max(0.001, b[0] - a[0])
    const night = a[5] + (b[5] - a[5]) * t
    sky.style.setProperty('--s0', mix(a[1], b[1], t))
    sky.style.setProperty('--s1', mix(a[2], b[2], t))
    sky.style.setProperty('--s2', mix(a[3], b[3], t))
    sky.style.setProperty('--dune', mix(a[4], b[4], t))
    sky.style.setProperty('--stars', night.toFixed(2))

    const day = h > RISE - 0.4 && h < SET + 0.4
    if (day) {
      const st = Math.max(0, Math.min(1, (h - RISE) / (SET - RISE)))
      sun.style.left = `${(6 + st * 88).toFixed(1)}%`
      sun.style.top = `${(88 - Math.sin(Math.PI * st) * 70).toFixed(1)}%`
    } else {
      const nt = ((h - SET + 24) % 24) / (24 - (SET - RISE))
      moon.style.left = `${(6 + nt * 88).toFixed(1)}%`
      moon.style.top = `${(84 - Math.sin(Math.PI * nt) * 62).toFixed(1)}%`
    }
    sun.style.opacity = day ? 1 : 0
    moon.style.opacity = day ? 0 : 1

    // the photo takes the same light: blue at night, warm at each end of the day
    const golden = Math.max(0, 1 - Math.min(Math.abs(h - RISE), Math.abs(h - SET)) / 1.3)
    tint.style.setProperty('--night', (night * 0.5).toFixed(2))
    tint.style.setProperty('--golden', (golden * 0.34).toFixed(2))

    const hh = Math.floor(h), mm = Math.round((h - hh) * 60) % 60
    const label = new Date(2000, 0, 1, hh, mm).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()
    const weekday = now.dow >= 1 && now.dow <= 5
    const line = h >= 23 || h < 7 ? "I'm probably asleep. I'll reply after sunrise."
      : h < 9 ? 'Just waking up. Coffee first, then replies.'
      : h < 18 ? (weekday ? "I'm at work right now. I'll reply this evening." : "I'm around today, so replies are fast.")
      : "Winding down. I'll reply by tomorrow at the latest."
    timeEl.textContent = `${label} in London`
    lineEl.textContent = line
    return line
  }
  paint()
  const timer = setInterval(paint, 30000)
  return { stop: () => clearInterval(timer), line: paint }
}

export function initContact(root) {
  const wrap = root.querySelector('.contact-split')
  if (!wrap) return
  const ac = new AbortController()
  const { signal } = ac
  const sky = startSky(wrap)
  root._disposeIsland = () => { ac.abort(); sky.stop() }

  // ── Toast and copy ────────────────────────────────────────────────────────
  const toastEl = wrap.querySelector('.cf-toast')
  let toastT = 0
  function toast(text) {
    toastEl.textContent = text
    toastEl.classList.add('is-on')
    clearTimeout(toastT)
    toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2200)
  }
  const copyBtn = wrap.querySelector('[data-copy]')
  copyBtn.addEventListener('click', async () => {
    const go = copyBtn.querySelector('.contact-go--copy')
    try {
      try { await navigator.clipboard.writeText(copyBtn.dataset.copy) }
      catch {                                              // older browsers and some in-app views: the classic way
        const t = Object.assign(document.createElement('textarea'), { value: copyBtn.dataset.copy })
        t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0'
        document.body.appendChild(t); t.select()
        const ok = document.execCommand('copy'); t.remove(); copyBtn.focus({ preventScroll: true })
        if (!ok) throw new Error('no clipboard')
      }
      go.innerHTML = ICON.check
      copyBtn.classList.add('is-copied')
      toast('Email copied')
      sfx.click()
      setTimeout(() => { go.innerHTML = ICON.copy; copyBtn.classList.remove('is-copied') }, 1800)
    } catch {
      location.href = `mailto:${copyBtn.dataset.copy}`      // no clipboard here: fall back to the mail app
    }
  }, { signal })

  const form = root.querySelector('#contact-form')
  if (!form) return
  const status = form.querySelector('.cf-status'), submit = form.querySelector('.cf-submit'), sent = wrap.querySelector('.cf-sent')
  const msg = form.elements.message, subject = form.elements.subject
  const required = [form.elements.name, form.elements.email, msg]
  const draftEl = form.querySelector('.cf-draft'), main = wrap.querySelector('.contact-main')

  // ── What's this about? ────────────────────────────────────────────────────
  function setIntent(v) {
    const it = INTENTS.find(i => i.v === v) || INTENTS[3]
    form.querySelectorAll('.cf-extra').forEach(x => { const on = x.dataset.for === it.v; x.classList.toggle('is-on', on); x.inert = !on })
    msg.placeholder = it.ph
    subject.value = `${it.subject}, from Eric's World`
  }
  form.addEventListener('change', (e) => { if (e.target.name === 'intent') { setIntent(e.target.value); sfx.click() } }, { signal })

  // ── Errors: beside the field, once you've left it ─────────────────────────
  const errEl = (name) => form.querySelector(`.cf-error[data-for="${name}"]`)
  function validate(input) {
    const v = input.value.trim()
    let text = ''
    if (!v) text = input.name === 'name' ? 'What should I call you?' : input.name === 'email' ? 'I need an email to reply to.' : 'Write a line or two first.'
    else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) text = 'That email looks off. Check for typos.'
    errEl(input.name).textContent = text
    input.classList.toggle('cf-input--invalid', !!text)
    input.setAttribute('aria-invalid', text ? 'true' : 'false')
    return !text
  }
  required.forEach(f => {
    f.addEventListener('blur', () => validate(f), { signal })
    f.addEventListener('input', () => { if (f.classList.contains('cf-input--invalid')) validate(f) }, { signal })
  })
  const clearErrors = () => required.forEach(f => { errEl(f.name).textContent = ''; f.classList.remove('cf-input--invalid'); f.removeAttribute('aria-invalid') })

  // ── Drafts: what you typed is still here if you close the panel and come back ──
  const FIELDS = ['intent', 'name', 'email', 'company', 'role', 'timeline', 'message']
  let saveT = 0, shownT = 0
  function save() {
    clearTimeout(saveT)
    saveT = setTimeout(() => {
      try {
        const d = {}
        for (const k of FIELDS) d[k] = form.elements[k].value
        if (!FIELDS.slice(1).some(k => d[k].trim())) { localStorage.removeItem(DRAFT_KEY); return }
        localStorage.setItem(DRAFT_KEY, JSON.stringify(d))
        draftEl.classList.add('is-on')
        clearTimeout(shownT)
        shownT = setTimeout(() => draftEl.classList.remove('is-on'), 1600)
      } catch { /* private window: the form still works, it just won't remember */ }
    }, 500)
  }
  form.addEventListener('input', save, { signal })
  form.addEventListener('change', save, { signal })
  try {
    const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null')
    if (d) for (const k of FIELDS) if (typeof d[k] === 'string') form.elements[k].value = d[k]
  } catch { /* nothing saved, or storage is off */ }
  setIntent(form.elements.intent.value)

  // ── Sending ───────────────────────────────────────────────────────────────
  form.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); form.requestSubmit() } }, { signal })

  /** The paper plane: off the button, up an arc, into the sky over the form. */
  function fly() {
    if (calm()) return
    const o = wrap.getBoundingClientRect(), b = submit.getBoundingClientRect(), s = wrap.querySelector('.sky').getBoundingClientRect()
    const x0 = b.left - o.left + b.width / 2, y0 = b.top - o.top + b.height / 2
    const x2 = s.left - o.left + s.width * 0.78, y2 = s.top - o.top + s.height * 0.32
    const x1 = (x0 + x2) / 2 - 60, y1 = Math.min(y0, y2) - 90
    const plane = document.createElement('div')
    plane.className = 'cf-plane'
    plane.innerHTML = ICON.plane
    wrap.appendChild(plane)
    const frames = []
    for (let k = 0; k <= 24; k++) {
      const t = k / 24, u = 1 - t
      const x = u * u * x0 + 2 * u * t * x1 + t * t * x2, y = u * u * y0 + 2 * u * t * y1 + t * t * y2
      const dx = 2 * u * (x1 - x0) + 2 * t * (x2 - x1), dy = 2 * u * (y1 - y0) + 2 * t * (y2 - y1)
      frames.push({ transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${(Math.atan2(dy, dx) * 180 / Math.PI + 45).toFixed(1)}deg) scale(${(1 - t * 0.7).toFixed(3)})`, opacity: t > 0.88 ? (1 - t) / 0.12 : 1, offset: t })
    }
    plane.animate(frames, { duration: 1500, easing: 'cubic-bezier(0.45, 0, 0.25, 1)', fill: 'forwards' }).onfinish = () => plane.remove()
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (submit.disabled) return
    if (!required.map(validate).every(Boolean)) { required.find(f => f.classList.contains('cf-input--invalid'))?.focus(); return }

    submit.disabled = true
    submit.classList.add('is-sending')
    status.textContent = 'Sending…'
    status.className = 'cf-status cf-status--pending'
    const name = form.elements.name.value.trim().split(/\s+/)[0]
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) })
      const data = await res.json().catch(() => ({}))
      if (!(res.ok && data.success)) throw new Error(data.message || `HTTP ${res.status}`)
      try { localStorage.removeItem(DRAFT_KEY) } catch { /* fine */ }
      clearTimeout(saveT)
      fly()
      sfx.msgOut()
      status.textContent = ''
      status.className = 'cf-status'
      sent.querySelector('.cf-sent-line').textContent = `Thanks${name ? `, ${name}` : ''}. ${sky.line()}`
      main.style.minHeight = `${main.offsetHeight}px`     // the card keeps its size while the form steps out
      form.classList.add('is-gone')
      form.inert = true
      sent.hidden = false
      sent.querySelector('.cf-again').focus({ preventScroll: true })
    } catch (err) {
      status.textContent = `Couldn't send (${err.message}). Try again, or copy my email on the left.`
      status.className = 'cf-status cf-status--error'
    }
    submit.disabled = false
    submit.classList.remove('is-sending')
  }, { signal })

  sent.querySelector('.cf-again').addEventListener('click', () => {
    form.reset()
    clearErrors()
    setIntent('hi')
    sent.hidden = true
    main.style.minHeight = ''
    form.classList.remove('is-gone')
    form.inert = false
    form.elements.name.focus()
  }, { signal })
}

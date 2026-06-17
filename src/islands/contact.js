// Contact island — a real email form. Posts to Web3Forms, which relays the
// message to ericng8766@gmail.com. The access key is public by design (it only
// permits sending TO the verified inbox), so it lives in committed code.
import { svgIcon } from '../ui/icons.js'

const BASE = import.meta.env.BASE_URL || '/'

const WEB3FORMS_KEY = 'a6074af4-eff5-4f1f-8ffe-b1f0fcf63f9a'
const CONFIGURED = !!WEB3FORMS_KEY && !WEB3FORMS_KEY.startsWith('YOUR_')

const SOCIALS = [
  ['mail',      'Email',     'ericng8766@gmail.com',  'mailto:ericng8766@gmail.com'],
  ['linkedin',  'LinkedIn',  'in/erriiiccccccc',      'https://www.linkedin.com/in/erriiiccccccc/'],
  ['github',    'GitHub',    'erriiiccccccc',         'https://github.com/erriiiccccccc'],
  ['instagram', 'Instagram', '@ericccc____',          'https://www.instagram.com/ericccc____/'],
]

const socialRows = SOCIALS.map(([icon, label, handle, href]) => `
  <a class="contact-row" href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>
    <span class="contact-ic">${svgIcon(icon, 18)}</span>
    <span class="contact-meta">
      <span class="contact-label">${label}</span>
      <span class="contact-text">${handle}</span>
    </span>
    <span class="contact-go">${svgIcon('arrowRight', 16)}</span>
  </a>`).join('')

const formHTML = CONFIGURED ? `
  <form class="contact-form" id="contact-form" novalidate>
    <input type="hidden" name="access_key" value="${WEB3FORMS_KEY}">
    <input type="hidden" name="subject" value="New message from Eric's World">
    <input type="hidden" name="from_name" value="Eric's World">
    <input type="checkbox" name="botcheck" class="cf-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="cf-row">
      <label class="cf-field">
        <span class="cf-label">Name</span>
        <input class="cf-input" type="text" name="name" required autocomplete="name" placeholder="Your name">
        <span class="cf-error" data-for="name" aria-live="polite"></span>
      </label>
      <label class="cf-field">
        <span class="cf-label">Email</span>
        <input class="cf-input" type="email" name="email" required autocomplete="email" placeholder="you@example.com">
        <span class="cf-error" data-for="email" aria-live="polite"></span>
      </label>
    </div>
    <label class="cf-field">
      <span class="cf-label">Message</span>
      <textarea class="cf-input cf-textarea" name="message" required rows="4" placeholder="What's on your mind?"></textarea>
      <span class="cf-error" data-for="message" aria-live="polite"></span>
    </label>
    <div class="cf-actions">
      <button class="cf-submit" type="submit">${svgIcon('send', 16)} <span>Send message</span></button>
      <span class="cf-status" role="status" aria-live="polite"></span>
    </div>
  </form>` : `
  <div class="cf-notice">The contact form isn't configured yet. Reach me directly on the left.</div>`

// TEST: real desert photo behind the words + a warm scrim for readability.
// To revert to the procedural desert scene, swap the two ca-photo/ca-scrim divs
// below back to `<div class="ca-glow" aria-hidden="true"></div>${DESERT_SCENE}`
// and restore the OLD DESERT OVERLAY block in overlay.css.
const DESERT_PHOTO = `
  <div class="ca-photo" style="background-image:url('${BASE}islandphoto/travelislandphoto.jpeg')" aria-hidden="true"></div>
  <div class="ca-scrim" aria-hidden="true"></div>`

// (Preserved) Desert dune silhouettes — the previous overlay. Sits behind the
// content; the "sun" was the soft .ca-glow haze. Kept here for easy revert.
const DESERT_SCENE = `
  <svg class="ca-scene" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
    <path class="ca-dune ca-dune--3" d="M0 118 Q 90 92 190 110 T 400 100 V160 H0 Z"/>
    <path class="ca-dune ca-dune--2" d="M0 132 Q 120 108 250 126 T 400 120 V160 H0 Z"/>
    <path class="ca-dune ca-dune--1" d="M0 148 Q 140 128 270 142 T 400 140 V160 H0 Z"/>
  </svg>`

export const CONTACT_HTML = `
  <div class="contact-split">
    <aside class="contact-aside">
      ${DESERT_PHOTO}
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
      <div class="ca-socials">${socialRows}</div>
    </aside>

    <div class="contact-main">
      <div class="cf-head">
        <h3 class="cf-head-title">Drop me a message</h3>
        <p class="cf-head-sub">this goes straight to my inbox :)</p>
      </div>
      ${formHTML}
    </div>
  </div>
`

export function initContact(root) {
  const form = root.querySelector('#contact-form')
  if (!form) return

  const status = form.querySelector('.cf-status')
  const submit = form.querySelector('.cf-submit')
  const fields = [...form.querySelectorAll('.cf-input')]

  const errEl = (name) => form.querySelector(`.cf-error[data-for="${name}"]`)
  const validate = (input) => {
    const e = errEl(input.name)
    let msg = ''
    if (!input.value.trim()) msg = 'This field is required.'
    else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) msg = 'Enter a valid email address.'
    if (e) e.textContent = msg
    input.classList.toggle('cf-input--invalid', !!msg)
    return !msg
  }

  // Validate on blur (not keystroke); clear error as they fix it
  fields.forEach(f => {
    f.addEventListener('blur', () => validate(f))
    f.addEventListener('input', () => {
      if (f.classList.contains('cf-input--invalid')) validate(f)
    })
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const allOk = fields.map(validate).every(Boolean)
    if (!allOk) { fields.find(f => f.classList.contains('cf-input--invalid'))?.focus(); return }

    submit.disabled = true
    status.textContent = 'Sending…'
    status.className = 'cf-status cf-status--pending'

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        form.innerHTML = `
          <div class="cf-success">
            <div class="cf-success-ic">${svgIcon('mail', 26)}</div>
            <h4>Message sent!</h4>
            <p>Thanks for reaching out — I'll get back to you soon.</p>
          </div>`
      } else {
        throw new Error(data.message || `HTTP ${res.status}`)
      }
    } catch (err) {
      status.textContent = `Couldn't send (${err.message}). Try again or email me directly.`
      status.className = 'cf-status cf-status--error'
      submit.disabled = false
    }
  })
}

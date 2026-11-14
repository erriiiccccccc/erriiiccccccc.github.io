// Arctic Island: Ask Hui Sin. The island's local answers questions about
// Eric. The guardrails all live on the server (api/huisin.mjs); this side is
// only the chat, and it's built to feel like a messaging app:
//
//   - what you type lifts out of the box and lands as a bubble
//   - "Delivered", then "Read" once she starts answering
//   - a typing bubble, then her words arriving a few at a time
//   - she reacts to nice messages (a tapback on your bubble, happy eyes)
//   - a few words set the whole panel off: thanks = snow, love = hearts,
//     wow = sparkles, SHOUTING = a bubble that lands hard
//   - her first message is a photo of Eric and his friends on a glacier;
//     tap it and it opens up
//
// Reduced motion keeps the chat and drops the flights and particles.
// The chat lasts for the visit: closing and reopening the island keeps it.
// Hui Sin's face is a hand-drawn SVG placeholder until her real art lands.
import { sfx } from '../audio/sfx.js'

const BASE = import.meta.env.BASE_URL || '/'
const ENDPOINT = /\.github\.io$/i.test(location.hostname) ? 'https://www.ericng.my/api/huisin' : '/api/huisin'
const KEEP = 12        // messages sent with each question (the server keeps the same)
const MAX_IN = 1000
const GREETING = "Hello, I'm Hui Sin! I'm someone special to Eric, and I'm here to answer your questions because I know all about him. Ask me anything: his work, his projects, the places he's been."
const FOGGY = "My snow globe's a bit foggy right now. Try again in a moment, or reach Eric at ericng8766@gmail.com."
// Suggested questions, by topic. Five show at a time. After each answer they change: two more on what
// was just asked, then one from each other topic, so there is always somewhere new to go. Every one of
// these is answered by a line in api/_huisin/knowledge.mjs: add a fact there before adding a question here.
const REACH = 'How do I reach him?'
const SUGGEST = [
  ['work', 'What does Eric do?'], ['skills', 'Can he code in React?'], ['projects', "What's his best project?"], ['travel', 'Does he like hiking?'], ['reach', REACH],
  ['work', 'What did he do at Barclays?'], ['work', 'Is he open to work?'], ['work', 'Has he worked with real clients?'], ['work', 'What was his first job?'],
  ['skills', 'Which languages does he code in?'], ['skills', 'Does he know AI and machine learning?'], ['skills', 'Has he built robots?'],
  ['projects', "What's MedMatch?"], ['projects', 'How did he build this world?'], ['projects', 'What was his dissertation about?'], ['projects', 'Has he won a hackathon?'],
  ['travel', 'How many countries has he been to?'], ['travel', "What's the best place he's been?"], ['travel', 'Which mountains has he climbed?'], ['travel', 'What are his university badges?'],
  ['life', "What's his favourite food?"], ['life', 'What music does he like?'], ['life', 'Which sports does he play?'], ['life', 'What languages does he speak?'],
  ['world', 'What can I do in this world?'], ['world', 'Who are you, Hui Sin?'],
]
const CHIPS = SUGGEST.slice(0, 5).map(s => s[1])
// a typed question's topic, from its words (first match wins)
const TOPIC_WORDS = [
  ['reach', /\b(reach|contact|email|e-mail|linkedin|get in touch|message him)\b/i],
  ['work', /\b(work|works|job|jobs|career|barclays|blackrock|intern|internship|experience|hire|hiring|freelance|client|clients|audit)\b/i],
  ['projects', /\b(project|projects|medmatch|foundtech|ygo|petaling|dissertation|hackathon|portfolio|website|websites|built|build|made|three\.?js)\b/i],
  ['skills', /\b(code|coding|react|python|java|javascript|typescript|skill|skills|stack|program|programming|ai|ml|machine learning|robot|robots|tools?)\b/i],
  ['travel', /\b(travel|travels|travelled|country|countries|hike|hikes|hiking|mountain|mountains|trip|trips|iceland|morocco|university|universities|badge|badges|place|places)\b/i],
  ['life', /\b(food|eat|music|laufey|sport|sports|badminton|basketball|hobby|hobbies|game|games|favourite|favorite|speak|language)\b/i],
  ['world', /\b(world|planet|island|islands|jukebox|doodle|who are you|hui sin)\b/i],
]
const TOPICS = ['work', 'projects', 'skills', 'travel', 'life', 'world']
const norm = (q) => q.trim().toLowerCase()
const topicOf = (q) => (SUGGEST.find(s => norm(s[1]) === norm(q)) || TOPIC_WORDS.find(([, re]) => re.test(q)) || [null])[0]
const askedQs = new Set()                 // kept while the page is open, like the conversation itself
let shownQs = CHIPS.slice(), turn = 0

/** The next five suggestions after `last` was asked. */
function nextSuggestions(last) {
  askedQs.add(norm(last))
  turn++
  const topic = topicOf(last)
  const unasked = SUGGEST.filter(s => !askedQs.has(norm(s[1])))
  const pool = unasked.length >= 5 ? unasked : SUGGEST.filter(s => norm(s[1]) !== norm(last))      // all asked: start over
  const out = []
  const take = (ok, n) => { for (const s of pool) { if (n <= 0 || out.length >= 5) return; if (!out.includes(s) && ok(s)) { out.push(s); n-- } } }
  const isNew = (s) => !shownQs.includes(s[1])
  if (topic && topic !== 'reach') take(s => s[0] === topic && isNew(s), 2)                         // more on what they just asked about
  for (let k = 0; k < TOPICS.length; k++) { const t = TOPICS[(k + turn) % TOPICS.length]; if (t !== topic) take(s => s[0] === t && isNew(s), 1) }
  take(isNew, 5)
  take(() => true, 5)
  // how to reach Eric stays one tap away until it has been asked
  if (!askedQs.has(norm(REACH)) && !out.some(s => s[1] === REACH)) out[Math.min(out.length, 4)] = SUGGEST[4]
  shownQs = out.slice(0, 5).map(s => s[1])
  return shownQs
}
const chipHtml = (qs, fresh) => qs.map((q, k) => `<button type="button" class="hs-chip${fresh ? ' is-new' : ''}" style="--k:${k}" data-ask="${q.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">${q.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</button>`).join('')
const PHOTO = {
  src: `${BASE}islandphoto/arcticislandphoto.jpeg`,
  alt: 'Eric and three friends in helmets, holding ice axes inside a blue glacier crevasse',
  cap: 'Out on the glacier',
}

/** What a message sets off. First match wins. */
const EFFECTS = [
  { fx: 'hearts',  tap: 'heart', re: /\b(love|cute|adorable|sweet|sayang|comel)\b|❤|♥|可爱|喜欢/i },
  { fx: 'snow',    tap: 'heart', re: /\b(thanks|thank you|thank u|thx|cheers|terima kasih)\b|谢谢|謝謝/i },
  { fx: 'sparkle', tap: 'wow',   re: /\b(wow|amazing|awesome|impressive|congrats|congratulations|cool|hebat)\b|厉害|厲害/i },
  { fx: null,      tap: 'haha',  re: /\b(lol|haha+|hehe+|lmao)\b|哈哈/i },
]
const isLoud = (q) => /!!\s*$/.test(q) || (q.replace(/[^A-Za-z]/g, '').length >= 4 && q === q.toUpperCase() && /[A-Z]/.test(q))
const effectFor = (q) => EFFECTS.find(e => e.re.test(q)) || null

/** This visit's chat: { role: 'user' | 'assistant', content, tap? } */
const history = []
let busy = false
let greeted = false          // the opening sequence plays once per visit
let startedAt = ''           // "Today 3:42 pm", fixed at the first open

const FACE = (cls = '') => `
  <svg class="hs-face ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <circle cx="29" cy="36" r="14" fill="#2b1d34"/>
    <circle cx="91" cy="36" r="14" fill="#2b1d34"/>
    <path d="M23 70 C20 40 38 24 60 24 C82 24 100 40 97 70 L96 86 C86 80 34 80 24 86 Z" fill="#2b1d34"/>
    <ellipse cx="60" cy="71" rx="31" ry="29" fill="#ffe4d6"/>
    <path d="M29 64 C30 44 45 34 60 34 C77 34 90 45 91 64 C84 57 77 52 70 51 C67 56 62 59 56 59 C59 55 59 52 58 49 C51 55 41 60 29 64 Z" fill="#2b1d34"/>
    <g class="hs-eyes">
      <ellipse cx="47" cy="73" rx="5" ry="6.2" fill="#2b1d34"/>
      <ellipse cx="73" cy="73" rx="5" ry="6.2" fill="#2b1d34"/>
      <circle cx="49" cy="70.4" r="1.9" fill="#fff"/>
      <circle cx="75" cy="70.4" r="1.9" fill="#fff"/>
    </g>
    <g class="hs-eyes-happy" fill="none" stroke="#2b1d34" stroke-width="2.8" stroke-linecap="round">
      <path d="M41.5 75 Q47 67.5 52.5 75"/><path d="M67.5 75 Q73 67.5 78.5 75"/>
    </g>
    <ellipse class="hs-blush" cx="38.5" cy="83" rx="6" ry="3.4" fill="#ff8fab" opacity=".55"/>
    <ellipse class="hs-blush" cx="81.5" cy="83" rx="6" ry="3.4" fill="#ff8fab" opacity=".55"/>
    <path class="hs-mouth" d="M55 85 Q60 90 65 85" fill="none" stroke="#9b4155" stroke-width="2.3" stroke-linecap="round"/>
    <g transform="translate(87 48)" stroke="#e0f2fe" stroke-width="2.2" stroke-linecap="round"><path d="M0 -7V7M-6 -3.5L6 3.5M-6 3.5L6 -3.5"/></g>
    <path d="M33 97 C46 105 74 105 87 97 L89 107 C74 115 46 115 31 107 Z" fill="#7dd3fc"/>
    <path d="M70 103 L76 117 L83 113 L78 101 Z" fill="#5bbcef"/>
  </svg>`

const TAPS = {
  heart: '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="#ff7aa2" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.300 1.500 4.050 3 5.500l7 7Z"/></svg>',
  haha: '<b>ha ha</b>',
  wow: '<b>!!</b>',
}
const TAP_LABEL = { heart: 'Hui Sin loved this', haha: 'Hui Sin laughed at this', wow: 'Hui Sin emphasised this' }

export const ARCTIC_HTML = `
  <div class="hs">
    <div class="hs-intro">
      <div class="hs-avatar">${FACE()}</div>
      <div class="hs-who">
        <b class="hs-name">Hui Sin</b>
        <span class="hs-tag"><i class="hs-online" aria-hidden="true"></i>Lives on Arctic Island · knows all about Eric</span>
      </div>
    </div>
    <div class="hs-log" role="log" aria-live="polite" aria-label="Chat with Hui Sin"></div>
    <div class="hs-chips" role="group" aria-label="Suggested questions">
      ${chipHtml(CHIPS, false)}
    </div>
    <form class="hs-form" autocomplete="off">
      <label class="sr-only" for="hs-input">Ask Hui Sin a question</label>
      <input id="hs-input" class="hs-input" name="q" maxlength="${MAX_IN}" placeholder="Ask Hui Sin about Eric…" enterkeyhint="send">
      <button type="submit" class="hs-send" aria-label="Send">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
      </button>
    </form>
    <p class="hs-note">AI guide · answers can be wrong, so check with Eric</p>
    <canvas class="hs-fx" aria-hidden="true"></canvas>
    <div class="hs-lightbox" role="dialog" aria-modal="true" aria-label="${PHOTO.cap}" hidden>
      <img src="${PHOTO.src}" alt="${PHOTO.alt}" width="1536" height="2048" decoding="async">
      <button type="button" class="hs-lightbox-x" aria-label="Close photo">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
  </div>
`

const calm = () => document.body.classList.contains('reduced-motion') || matchMedia('(prefers-reduced-motion: reduce)').matches
const sleep = (ms) => new Promise(r => setTimeout(r, ms))
const SPRING = 'cubic-bezier(0.2, 1.25, 0.32, 1)'

/** The particle layer: snow, hearts, sparkles. Draws only while something is in the air. */
function makeFx(canvas) {
  const ctx = canvas.getContext('2d')
  let parts = [], raf = 0, last = 0, w = 0, h = 0
  const rnd = (a, b) => a + Math.random() * (b - a)
  function size() {
    const d = Math.min(window.devicePixelRatio || 1, 2)
    w = canvas.clientWidth; h = canvas.clientHeight
    canvas.width = Math.round(w * d); canvas.height = Math.round(h * d)
    ctx.setTransform(d, 0, 0, d, 0, 0)
  }
  function draw(p) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life / p.fade)) * p.a
    ctx.translate(p.x, p.y); ctx.rotate(p.rot)
    if (p.kind === 'flake') {
      ctx.strokeStyle = '#eaf6ff'; ctx.lineWidth = Math.max(1, p.s / 5); ctx.lineCap = 'round'
      ctx.beginPath()
      for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3; ctx.moveTo(Math.cos(a) * p.s, Math.sin(a) * p.s); ctx.lineTo(-Math.cos(a) * p.s, -Math.sin(a) * p.s) }
      ctx.stroke()
    } else if (p.kind === 'heart') {
      const s = p.s / 12
      ctx.scale(s, s); ctx.fillStyle = p.c
      ctx.beginPath(); ctx.moveTo(0, 9); ctx.bezierCurveTo(-14, -1, -8, -12, 0, -4); ctx.bezierCurveTo(8, -12, 14, -1, 0, 9); ctx.fill()
    } else {
      ctx.fillStyle = p.c
      ctx.beginPath()
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r = i % 2 ? p.s * 0.32 : p.s; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
      ctx.closePath(); ctx.fill()
    }
    ctx.restore()
  }
  function frame(t) {
    const dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t
    ctx.clearRect(0, 0, w, h)
    parts = parts.filter(p => (p.life -= dt) > 0 && p.y < h + 40 && p.y > -h)
    for (const p of parts) {
      p.vy += p.g * dt; p.t += dt * p.wob
      p.x += (p.vx + Math.sin(p.t) * p.sway) * dt; p.y += p.vy * dt; p.rot += p.spin * dt
      draw(p)
    }
    raf = parts.length && canvas.isConnected ? requestAnimationFrame(frame) : 0
    if (!raf) ctx.clearRect(0, 0, w, h)
  }
  function add(list) {
    if (calm()) return
    if (!raf) { size(); last = performance.now(); raf = requestAnimationFrame(frame) }
    parts.push(...list.map(p => ({ a: 1, rot: rnd(0, 6), spin: rnd(-1.5, 1.5), g: 0, sway: 0, wob: 1, t: rnd(0, 6), vx: 0, fade: 0.6, ...p })))
  }
  return {
    snow() {
      size()
      add(Array.from({ length: 64 }, () => ({ kind: 'flake', x: rnd(0, w), y: rnd(-h * 0.9, -8), vy: rnd(70, 150), s: rnd(2.5, 6), sway: rnd(10, 34), wob: rnd(0.8, 2), life: rnd(4.5, 7), a: rnd(0.55, 1) })))
    },
    hearts() {
      size()
      const cs = ['#ff8fab', '#ffb3c8', '#ff6f96', '#ffd1dc']
      add(Array.from({ length: 30 }, (_, i) => ({ kind: 'heart', c: cs[i % 4], x: rnd(0.08, 0.92) * w, y: h + rnd(10, h * 0.5), vy: -rnd(110, 210), g: -18, s: rnd(9, 20), sway: rnd(14, 40), wob: rnd(1, 2.4), spin: rnd(-0.5, 0.5), rot: rnd(-0.3, 0.3), life: rnd(3, 4.6), fade: 1 })))
    },
    sparkle(x, y) {
      size()
      const cs = ['#fff', '#cfeaff', '#fde68a', '#a5e0ff']
      add(Array.from({ length: 30 }, (_, i) => { const a = rnd(0, Math.PI * 2), v = rnd(90, 320); return { kind: 'spark', c: cs[i % 4], x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 70, g: 360, s: rnd(3, 8), spin: rnd(-6, 6), life: rnd(0.8, 1.5), fade: 0.5 } }))
    },
    /** A few flakes off the send button, every time. */
    puff(x, y) {
      size()
      add(Array.from({ length: 7 }, () => ({ kind: 'flake', x, y, vx: rnd(-70, 30), vy: -rnd(60, 150), g: 190, s: rnd(2, 4), spin: rnd(-4, 4), life: rnd(0.6, 1), fade: 0.4, a: 0.9 })))
    },
  }
}

/** Wire up a freshly opened Arctic panel (called on every open; the chat itself persists). */
export function initArctic(root) {
  const el = root.querySelector('.hs')
  if (!el) return
  const log = el.querySelector('.hs-log'), form = el.querySelector('.hs-form'), input = el.querySelector('.hs-input')
  const send = el.querySelector('.hs-send'), chips = el.querySelector('.hs-chips'), lightbox = el.querySelector('.hs-lightbox')
  const fx = makeFx(el.querySelector('.hs-fx'))
  const toEnd = (smooth) => log.scrollTo({ top: log.scrollHeight, behavior: smooth && !calm() ? 'smooth' : 'auto' })
  const within = (r) => { const o = el.getBoundingClientRect(); return { left: r.left - o.left, top: r.top - o.top, width: r.width, height: r.height } }
  let alive = true                                    // false once this panel's DOM is gone
  const here = () => alive && el.isConnected

  // ── Building rows ─────────────────────────────────────────────────────────
  function row(role) {
    const r = document.createElement('div')
    r.className = `hs-row hs-row--${role === 'user' ? 'me' : 'her'}`
    if (role !== 'user') r.innerHTML = `<span class="hs-mini">${FACE('hs-face--mini')}</span>`
    return r
  }
  function bubble(role, text, { quiet = false } = {}) {
    const r = row(role)
    const b = document.createElement('p')
    b.className = 'hs-bubble'
    b.textContent = text
    r.appendChild(b)
    if (quiet) r.classList.add('is-still')
    log.appendChild(r)
    return b
  }
  function tapback(b, kind, quiet) {
    if (!TAPS[kind] || b.querySelector('.hs-tap')) return
    const t = document.createElement('span')
    t.className = `hs-tap hs-tap--${kind}${quiet ? ' is-still' : ''}`
    t.setAttribute('role', 'img'); t.setAttribute('aria-label', TAP_LABEL[kind])
    t.innerHTML = TAPS[kind]
    b.appendChild(t)
  }
  function photoRow(quiet) {
    const r = row('assistant')
    if (quiet) r.classList.add('is-still')
    r.insertAdjacentHTML('beforeend', `
      <button type="button" class="hs-photo" aria-label="Open photo: ${PHOTO.cap}">
        <img src="${PHOTO.src}" alt="${PHOTO.alt}" width="1536" height="2048" decoding="async">
        <span class="hs-photo-cap">${PHOTO.cap}</span>
      </button>`)
    log.appendChild(r)
  }
  function stamp() {
    const s = document.createElement('p')
    s.className = 'hs-stamp'
    s.textContent = startedAt
    log.appendChild(s)
  }
  /** The small line under your latest message ("Delivered", then "Read"). Only the latest one keeps it. */
  function status(text, after) {
    let s = log.querySelector('.hs-status')
    if (!text) { s?.remove(); return }
    if (!s) {
      s = document.createElement('p'); s.className = 'hs-status'; s.setAttribute('aria-hidden', 'true')
      after.closest('.hs-row').after(s)
    }
    if (s.textContent !== text) { s.textContent = text; s.classList.remove('is-in'); void s.offsetWidth; s.classList.add('is-in') }
  }

  // ── The opening: once per visit she types, says hello, sends the photo ────
  if (!startedAt) startedAt = `Today ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase()}`
  stamp()
  if (greeted || calm()) {
    bubble('assistant', GREETING, { quiet: true })
    photoRow(true)
    for (const m of history) { const b = bubble(m.role, m.content, { quiet: true }); if (m.tap) tapback(b, m.tap, true) }
    greeted = true
    toEnd()
  } else {
    greeted = true
    el.classList.add('is-fresh')
    ;(async () => {
      const b = bubble('assistant', '')
      b.classList.add('is-waiting')
      b.innerHTML = '<span class="hs-dots"><i></i><i></i><i></i></span>'
      el.classList.add('is-typing')
      await sleep(850)
      if (!here()) return
      el.classList.remove('is-typing')
      b.classList.remove('is-waiting'); b.textContent = GREETING
      b.animate([{ transform: 'scale(0.9)' }, { transform: 'none' }], { duration: 380, easing: SPRING })
      sfx.msgIn()
      await sleep(520)
      if (!here()) return
      photoRow(false)
      toEnd(true)
    })()
  }

  // ── The photo opens up ─────────────────────────────────────────────────────
  let photoFrom = null
  function openPhoto(btn) {
    photoFrom = btn
    lightbox.hidden = false
    const img = lightbox.querySelector('img')
    if (!calm()) {
      const a = btn.querySelector('img').getBoundingClientRect(), b = img.getBoundingClientRect()
      const dx = a.left + a.width / 2 - (b.left + b.width / 2), dy = a.top + a.height / 2 - (b.top + b.height / 2)
      img.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${a.width / b.width})`, borderRadius: '60px' }, { transform: 'none', borderRadius: '14px' }], { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
      lightbox.animate([{ backgroundColor: 'rgba(4, 12, 26, 0)' }, { backgroundColor: 'rgba(4, 12, 26, 0.86)' }], { duration: 300, easing: 'ease-out' })
    }
    lightbox.querySelector('.hs-lightbox-x').focus()
  }
  function closePhoto() {
    if (lightbox.hidden) return
    const done = () => { lightbox.hidden = true; photoFrom?.focus({ preventScroll: true }) }
    if (calm()) return done()
    lightbox.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 170, easing: 'ease-in' }).onfinish = done
  }
  log.addEventListener('click', (e) => { const p = e.target.closest('.hs-photo'); if (p) openPhoto(p) })
  lightbox.addEventListener('click', closePhoto)
  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); closePhoto() }
    if (e.key === 'Tab') e.preventDefault()           // one control in here: focus stays on it
  })

  // ── Sending ───────────────────────────────────────────────────────────────
  const setBusy = (on) => { busy = on; send.disabled = on; el.classList.toggle('is-typing', on); el.querySelectorAll('.hs-chip').forEach(c => { c.disabled = on }) }

  // Fresh suggestions after every answer: the old ones step out, the new ones rise in one after another.
  if (shownQs.join('|') !== CHIPS.join('|')) chips.innerHTML = chipHtml(shownQs, false)      // reopened mid-conversation
  let chipT = 0
  function swapChips(last) {
    const qs = nextSuggestions(last)
    const focused = chips.contains(document.activeElement)
    const put = () => {
      if (!here()) return
      chips.classList.remove('is-out')
      chips.innerHTML = chipHtml(qs, !calm())
      chips.scrollLeft = 0
      if (busy) chips.querySelectorAll('.hs-chip').forEach(c => { c.disabled = true })
      else if (focused) chips.querySelector('.hs-chip')?.focus({ preventScroll: true })
    }
    clearTimeout(chipT)
    if (calm()) return put()
    chips.classList.add('is-out')
    chipT = setTimeout(put, 180)
  }
  const hasText = () => form.classList.toggle('has-text', !!input.value.trim())
  input.addEventListener('input', hasText)
  hasText()

  /** Your words lift out of where you wrote them (the box, or a chip) and land as the bubble. */
  function fly(b, from, loud) {
    if (calm() || !from) return 0
    const to = b.getBoundingClientRect()
    const ghost = b.cloneNode(true)
    const o = within(to)
    ghost.classList.add('hs-ghost')
    Object.assign(ghost.style, { left: `${o.left}px`, top: `${o.top}px`, width: `${o.width}px` })
    el.appendChild(ghost)
    b.style.visibility = 'hidden'
    const dx = from.left - to.left, dy = from.top + (from.height - to.height) / 2 - to.top
    const ms = loud ? 560 : 440
    const frames = loud
      ? [{ transform: `translate(${dx}px, ${dy}px) scale(0.9)`, opacity: 0.7 }, { transform: 'translate(0, -6px) scale(1.5)', opacity: 1, offset: 0.55 }, { transform: 'scale(0.94)', offset: 0.8 }, { transform: 'none' }]
      : [{ transform: `translate(${dx}px, ${dy}px) scale(0.96)`, opacity: 0.75 }, { transform: 'none', opacity: 1 }]
    ghost.animate(frames, { duration: ms, easing: loud ? 'cubic-bezier(0.3, 0, 0.2, 1)' : SPRING }).onfinish = () => {
      ghost.remove(); b.style.visibility = ''
      if (loud) log.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(5px)' }, { transform: 'translateY(-3px)' }, { transform: 'none' }], { duration: 260, easing: 'ease-out' })
    }
    return ms
  }

  async function ask(q, fromEl) {
    q = q.trim().slice(0, MAX_IN)
    if (!q || busy) return
    const from = fromEl?.getBoundingClientRect()
    const loud = isLoud(q), effect = effectFor(q)
    const mine = { role: 'user', content: q }
    history.push(mine)
    status('')
    const me = bubble('user', q, { quiet: true })
    toEnd()
    setBusy(true)

    // the send: button pops, a few flakes, the bubble flies, then "Delivered"
    send.classList.remove('is-sent'); void send.offsetWidth; send.classList.add('is-sent')
    const sr = within(send.getBoundingClientRect())
    fx.puff(sr.left + sr.width / 2, sr.top + sr.height / 2)
    sfx.msgOut()
    try { navigator.vibrate?.(8) } catch { /* not on this device */ }
    const flight = fly(me, from, loud)
    let replied = false
    setTimeout(() => { if (here() && !replied) { status('Delivered', me); toEnd(true) } }, flight + 60)

    // her typing bubble shows a beat later (or the moment her first words arrive)
    let out = null
    const showOut = () => {
      if (out || !here()) return out
      out = bubble('assistant', '')
      out.classList.add('is-waiting')
      out.setAttribute('aria-busy', 'true')
      out.innerHTML = '<span class="hs-dots" aria-label="Hui Sin is typing"><i></i><i></i><i></i></span>'
      toEnd(true)
      return out
    }
    setTimeout(showOut, flight + 420)

    let text = '', ok = false
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-KEEP).map(({ role, content }) => ({ role, content })) }),
      })
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)
      ok = res.headers.get('x-hs') === 'ok'           // a real answer, not a refusal: only then does she react
      const reader = res.body.getReader(), dec = new TextDecoder()
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = dec.decode(value, { stream: true })
        if (!chunk || !here()) continue
        if (!text) {
          showOut()
          out.classList.remove('is-waiting'); out.textContent = ''
          if (!calm()) out.animate([{ transform: 'scale(0.94)' }, { transform: 'none' }], { duration: 300, easing: SPRING })
          replied = true
          status('Read', me)
          el.classList.add('is-talking')
          sfx.msgIn()
          if (ok && effect) {                          // she liked that one
            happy()
            if (effect.tap) { mine.tap = effect.tap; setTimeout(() => here() && tapback(me, effect.tap), 380) }
            const r = within(me.getBoundingClientRect())
            if (effect.fx === 'sparkle') fx.sparkle(r.left + r.width / 2, r.top + r.height / 2)
            else if (effect.fx) fx[effect.fx]()
          }
        }
        text += chunk
        const w = document.createElement('span')       // each few words fade in as they arrive
        w.className = 'hs-w'
        w.textContent = chunk
        out.appendChild(w)
        toEnd(true)
      }
      text = text.trim() || FOGGY
    } catch {
      text = text.trim() || FOGGY
    }
    history.push({ role: 'assistant', content: text })
    if (history.length > 40) history.splice(0, history.length - 40)
    busy = false
    if (!here()) return
    showOut()
    out.classList.remove('is-waiting')
    out.textContent = text
    out.setAttribute('aria-busy', 'false')
    el.classList.remove('is-talking')
    setBusy(false)
    swapChips(q)
    toEnd(true)
  }

  let happyT = 0
  function happy() {
    el.classList.add('is-happy')
    clearTimeout(happyT)
    happyT = setTimeout(() => el.classList.remove('is-happy'), 2600)
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const q = input.value
    if (!q.trim() || busy) return
    input.value = ''
    hasText()
    ask(q, input)
  })
  // Esc while typing lets go of the box, so the next Esc closes the island
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); input.blur() } })
  chips.addEventListener('click', (e) => {
    const c = e.target.closest('[data-ask]')
    if (c && !busy) ask(c.dataset.ask, c)
  })

  // the panel's DOM is thrown away on close: stop touching it
  new MutationObserver((_, mo) => { if (!el.isConnected) { alive = false; mo.disconnect() } }).observe(root, { childList: true, subtree: true })
}

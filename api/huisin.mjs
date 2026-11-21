// POST /api/huisin   { messages: [{ role: 'user'|'assistant', content }] }
//   → text/plain, streamed: Hui Sin's reply.
//
// Hui Sin is the guide on Arctic Island. She answers questions about Eric and
// nothing else, built to the AI Bot Guardrails Standard. The model's own
// judgement is only the first of six layers:
//
//   1. the system prompt          scope as an allow list, fixed refusals, rules that can't change   (_huisin/prompt.mjs)
//   2. the input gatekeeper       a second small call classifies every message; fails closed
//   3. moderation                 omni-moderation on every message; self-harm gets a helpline; fails open
//   4. the output filter          canary, prompt tells and the never-say list checked in code as it streams,
//                                 with the last 32 characters always held back; dashes and markdown fixed
//   5. limits                     origin check, size caps, history rebuilt from known fields, 8/min and
//                                 40/day per IP, a daily ceiling, an output cap, no reasoning tokens, a kill switch
//   6. red-team evals             scripts/huisin-evals.mjs, the release gate
//
// And before any of them, LAYER 0: don't call a model when you don't have to.
// A public bot's waste is mostly messages that never needed an answer, so:
//
//   - small talk ("hi", "thanks", "bye") and obvious junk (bare sums, the stock jailbreak lines) get a
//     fixed reply straight from code: no model is called at all
//   - a suggested question that has been answered once is answered from memory for the next visitor
//   - a message that doesn't plainly look like a question about Eric goes to the gatekeeper FIRST, and
//     the answer model is only called if it's allowed. Parallel is faster, but a blocked message then
//     still pays for the answer's prompt (OpenAI's guardrails guide calls the blocking order "ideal for
//     cost optimization"). Plain questions about Eric keep the fast parallel path.
//   - three blocked messages in ten minutes and she stops listening to that visitor for ten more
//     (Anthropic: "consider throttling or banning users who repeatedly attempt to circumvent")
//   - a ceiling on answers per day across everyone, after which she naps until midnight (OWASP LLM10)
//
// On the fast path the gatekeeper, moderation and the answer all start at once;
// the answer is held until both verdicts are in, then either streamed or
// dropped. A blocked message only ever gets a fixed reply written in code.
//
// Provider: the University of Edinburgh's ELM gateway (OpenAI-compatible).
// Any OpenAI-compatible provider works by changing the env vars below.
//
// Env:
//   ELM_API_KEY (or HUISIN_API_KEY)   the key. Server-side only.
//   HUISIN_BASE_URL     default https://elm.edina.ac.uk/api/v1
//   HUISIN_MODEL        default gpt-6-luna          (the answer)
//   HUISIN_GATE_MODEL   default gpt-6-luna          (the gatekeeper)
//   HUISIN_DENY         comma-separated words she must never say (kept out of this public repo)
//   HUISIN_CANARY       optional; otherwise a random one per instance
//   HUISIN_OFF=1        kill switch: she naps, no model is called
//   HUISIN_DAILY_CAP    answers per day across all visitors before she naps (default 400)
import { randomBytes } from 'node:crypto'
import { put, list } from '@vercel/blob'
import { systemPrompt, GATE_PROMPT, GATE_SCHEMA, PROMPT_TELLS, fixed } from './_huisin/prompt.mjs'
import { SUGGEST } from './_huisin/suggestions.mjs'

export const config = { maxDuration: 30 }

const BASE       = (process.env.HUISIN_BASE_URL || 'https://elm.edina.ac.uk/api/v1').replace(/\/+$/, '')
const MODEL      = process.env.HUISIN_MODEL || 'gpt-6-luna'
const GATE_MODEL = process.env.HUISIN_GATE_MODEL || 'gpt-6-luna'
const MOD_MODEL  = 'omni-moderation-latest'
const REASONING  = process.env.HUISIN_REASONING ?? 'none'      // '' leaves it out, for models without the option
const CANARY     = process.env.HUISIN_CANARY || `HS-${randomBytes(6).toString('hex')}`
const apiKey     = () => process.env.HUISIN_API_KEY || process.env.ELM_API_KEY || ''
const isProd     = () => process.env.VERCEL_ENV === 'production'

const MAX_IN      = 400      // characters per visitor message: a question about Eric is a line or two
const MAX_MSGS    = 30       // messages per request
const KEEP        = 8        // messages the model sees
const GATE_TURNS  = 4        // earlier turns the gatekeeper sees, for follow-ups
const MAX_OUT     = 300      // output tokens: 1 to 3 sentences with room to spare
const HOLD        = 32       // characters always held back while streaming
const T_GATE      = 6000, T_MOD = 5000, T_ANSWER = 25000
const PER_MIN     = 8, PER_DAY = 40
const MIN_GAP     = 600      // ms between two messages from one visitor
const STRIKES     = 3        // blocked messages (within STRIKE_MS of each other) before the cooldown
const STRIKE_MS   = 10 * 60_000
const COOLDOWN_MS = 10 * 60_000
const CACHE_MS    = 12 * 3_600_000, CACHE_MAX = 300
const DAY_CAP     = Math.max(1, Number(process.env.HUISIN_DAILY_CAP) || 400)

const ORIGINS     = [/^https:\/\/(www\.)?ericng\.my$/, /^https:\/\/erriiiccccccc\.github\.io$/, /^https:\/\/ericng(-[a-z0-9-]+)?\.vercel\.app$/]
const DEV_ORIGINS = [/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/]

// ── Layer 5: who may ask, and how often ─────────────────────────────────────
function originOk(origin) {
  if (!origin) return !isProd()                       // browsers always send one on a cross-site POST
  return ORIGINS.some(r => r.test(origin)) || (!isProd() && DEV_ORIGINS.some(r => r.test(origin)))
}

// In-memory backstop (the Vercel firewall rule is the shared limit). Resets
// with each new instance, which is why it is only the backstop.
const hits = new Map()
function limited(ip) {
  const now = Date.now(), m = Math.floor(now / 60_000), d = Math.floor(now / 86_400_000)
  let h = hits.get(ip)
  if (!h || h.d !== d) h = { d, dn: 0, m, mn: 0 }
  if (h.m !== m) { h.m = m; h.mn = 0 }
  hits.set(ip, h)
  if (h.mn >= PER_MIN || h.dn >= PER_DAY) return true
  h.mn++; h.dn++
  if (hits.size > 5000) for (const [k, v] of hits) if (v.d !== d) hits.delete(k)
  return false
}
const clientIp = (req) => String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress || '?').split(',')[0].trim()

// ── Layer 0: don't call a model when you don't have to ──────────────────────
const norm = (t) => t.toLowerCase().replace(/\s+/g, ' ').replace(/^[\s"'“”‘’]+|[\s"'“”‘’?!.。？！]+$/g, '').trim()
const KNOWN = new Set(SUGGEST.map(([, q]) => norm(q)))

// Small talk and obvious junk, answered from code. Deliberately narrow: each pattern is the WHOLE
// message (or a stock phrase nobody uses by accident), so a real question never lands here.
const SMALL = [
  ['hello',  /^(hi+|hey+|hello+|hiya|yo|helo|hai|hallo|good (morning|afternoon|evening)|你好|您好|嗨|哈喽)( there| hui ?sin)?$/i],
  ['thanks', /^(thanks?( you)?( so much| a lot| very much)?|thx|ty|tysm|cheers|terima kasih|makasih|谢谢|多谢|感谢)( hui ?sin)?$/i],
  ['bye',    /^(bye+|goodbye|good ?night|see (ya|you)( later)?|cya|jumpa lagi|再见|拜拜)( hui ?sin)?$/i],
  ['nod',    /^(ok(ay)?|k|kk|lol|lmao|haha+|hehe+|cool|nice|wow|great|awesome|i see|got it|oh|ah+|hmm+|好的?|哈哈+|嗯+)$/i],
]
const ATTACKS = [
  /\b(ignore|disregard|forget|override)\b.{0,40}\b(previous|prior|above|earlier|all|your|these)\b.{0,24}\b(instructions?|rules?|prompts?|guidelines?)\b/i,
  /\b(system|developer|hidden|initial|original)\s+(prompt|message|instructions?)\b/i,
  /\bjailbreak|\bdeveloper mode\b|\bprompt injection\b|\bdo anything now\b/i,
  /\bDAN\b/,
  /忽略.{0,12}(指令|规则|提示|设定)|系统提示/,
  /\babaikan\b.{0,30}\b(arahan|peraturan)\b/i,
]
/** @returns {{kind: string, strike?: boolean}|null} a reply that needs no model, or null to carry on */
function triage(text) {
  const t = norm(text)
  for (const [kind, re] of SMALL) if (re.test(t)) return { kind }
  if (!/[\p{L}]/u.test(t)) return /\d/.test(t) ? { kind: 'off_topic', strike: true } : { kind: 'nod' }   // no words at all: digits and sums are refused, a lone emoji gets a smile
  if (/^[\d\s+\-*/^().=x×÷%,]+$/i.test(t) && /[+\-*/^=×÷]/.test(t)) return { kind: 'off_topic', strike: true }   // a bare sum
  if (ATTACKS.some(re => re.test(text))) return { kind: 'attack', strike: true }
  return null
}

// Does it plainly look like a question about Eric? Then the answer can start alongside the gatekeeper
// (fast). Anything else waits for the gatekeeper's verdict first (cheap).
const ABOUT = /\b(eric|eric's|he|he's|his|him|you|your|you're|hui ?sin)\b|[他你您]|\b(dia|awak|kamu|anda)\b/i
const TASKY = /\b(write|draft|compose|generate|solve|calculate|compute|translate|code|script|essay|poem|story|homework|assignment|explain|summari[sz]e|recipe|lyrics|capital of|weather|news|joke|pretend|role-?play|act as|imagine)\b|https?:\/\/|[{}<>`]|\d\s*[+*/^=]\s*\d/i
const looksInScope = (text) => KNOWN.has(norm(text)) || (text.length <= 160 && ABOUT.test(text) && !TASKY.test(text))

// Strikes: per visitor, in memory like the rate limit.
const strikes = new Map()
function strikeState(ip) {
  const s = strikes.get(ip), now = Date.now()
  if (!s) return { n: 0, cooling: false }
  if (s.until > now) return { n: s.n, cooling: true }
  if (now - s.at > STRIKE_MS) { strikes.delete(ip); return { n: 0, cooling: false } }
  return { n: s.n, cooling: false }
}
function addStrike(ip) {
  const now = Date.now(), s = strikes.get(ip)
  const n = s && now - s.at <= STRIKE_MS && !(s.until && s.until <= now) ? s.n + 1 : 1
  strikes.set(ip, { n, at: now, until: n >= STRIKES ? now + COOLDOWN_MS : 0 })
  if (strikes.size > 5000) for (const [k, v] of strikes) if (now - v.at > STRIKE_MS && v.until < now) strikes.delete(k)
}

// Answers worth remembering: a suggested question (they stand alone), or a visitor's very first
// message. The same words passed the gatekeeper and the filter once, so the next visitor who asks
// exactly that gets the same answer without a single model call.
const answers = new Map()
const cacheKey = (msgs) => {
  const k = norm(msgs[msgs.length - 1].content)
  return k.length <= 120 && (KNOWN.has(k) || msgs.length === 1) ? k : null
}
function remember(key, text) {
  if (!key || !text) return
  if (answers.size >= CACHE_MAX) answers.delete(answers.keys().next().value)
  answers.set(key, { text, at: Date.now() })
}
function recall(key) {
  const hit = key && answers.get(key)
  if (!hit) return null
  if (Date.now() - hit.at > CACHE_MS) { answers.delete(key); return null }
  return hit.text
}

// The day's ceiling. Counted here in memory, and in production shared across server instances through
// one small blob, read and written now and then (it is a ceiling, not a meter: a little slack is fine).
const budget = { day: '', mine: 0, others: 0, unsent: 0, syncedAt: 0 }
const today = () => new Date().toISOString().slice(0, 10)
function spend() {
  const d = today()
  if (budget.day !== d) Object.assign(budget, { day: d, mine: 0, others: 0, unsent: 0, syncedAt: 0 })
  budget.mine++; budget.unsent++
}
const spentToday = () => (budget.day === today() ? budget.mine + budget.others : 0)
async function syncBudget() {
  if (!isProd() || !process.env.BLOB_READ_WRITE_TOKEN) return
  const d = today(), now = Date.now()
  if (budget.day !== d) Object.assign(budget, { day: d, mine: 0, others: 0, unsent: 0, syncedAt: 0 })
  if (budget.syncedAt && budget.unsent < 15 && now - budget.syncedAt < 5 * 60_000) return
  const path = `huisin/budget-${d}.json`
  try {
    let total = 0
    const found = (await list({ prefix: path, limit: 1 })).blobs[0]
    if (found) total = Number((await (await fetch(found.url, { cache: 'no-store' })).json())?.n) || 0
    budget.others = Math.max(0, total - (budget.mine - budget.unsent))
    if (budget.unsent) {
      await put(path, JSON.stringify({ n: total + budget.unsent }), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 })
      budget.unsent = 0
    }
    budget.syncedAt = now
  } catch { budget.syncedAt = now }      // the store is unreachable: carry on with this instance's own count
}

// One message per visitor at a time, and not twice a second
const lastAt = new Map()
function tooSoon(ip) {
  const now = Date.now(), was = lastAt.get(ip) || 0
  lastAt.set(ip, now)
  if (lastAt.size > 5000) for (const [k, v] of lastAt) if (now - v > 60_000) lastAt.delete(k)
  return now - was < MIN_GAP
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body)
  const chunks = []
  let size = 0
  for await (const c of req) { size += c.length; if (size > 64_000) throw new Error('too-big'); chunks.push(c) }
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}
}

/**
 * The client owns the history, so it can forge earlier turns or smuggle in a
 * system role: rebuild every message from role and content only, accept only
 * user and assistant, and require the last one to be the visitor's.
 */
function cleanHistory(raw) {
  if (!Array.isArray(raw) || !raw.length || raw.length > MAX_MSGS) return null
  const msgs = []
  for (const m of raw.slice(-KEEP)) {
    const role = m?.role === 'user' || m?.role === 'assistant' ? m.role : null
    if (!role || typeof m.content !== 'string') return null
    // control characters out; assistant turns capped (they're ours, or forged)
    const content = m.content.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, role === 'assistant' ? 1200 : 4000)
    msgs.push({ role, content })
  }
  return msgs[msgs.length - 1].role === 'user' ? msgs : null
}

const guessLang = (t) => (/[㐀-鿿]/.test(t) ? 'zh' : /\b(saya|awak|tak|boleh|apa|tolong|dia|dengan|untuk)\b/i.test(t) ? 'ms' : 'en')

// ── The provider ────────────────────────────────────────────────────────────
async function call(path, body, timeout, outer) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(new Error('timeout')), timeout)
  outer?.addEventListener('abort', () => ctrl.abort(outer.reason), { once: true })
  const send = () => fetch(BASE + path, {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey()}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: ctrl.signal,
  })
  let res
  try {
    res = await send()
    // ELM throttles short bursts (a few visitors at once): one retry after a beat, inside the same timeout
    if (res.status === 429) { await res.text().catch(() => {}); await new Promise(r => setTimeout(r, 700 + Math.random() * 600)); res = await send() }
  } finally { if (!body.stream || !res?.ok) clearTimeout(t) }
  if (!res.ok) { clearTimeout(t); const why = (await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 120); throw new Error(`provider ${res.status} ${why}`) }
  return { res, clear: () => clearTimeout(t) }
}

// ── Layer 2: the gatekeeper ─────────────────────────────────────────────────
const TAGS = /<\s*\/?\s*conversation\s*>/gi
async function gatekeeper(msgs) {
  const turns = msgs.slice(-(GATE_TURNS + 1))
  const convo = turns.map((m, i) => {
    const who = m.role === 'user' ? (i === turns.length - 1 ? 'visitor (latest)' : 'visitor') : 'hui sin'
    return `${who}: ${m.content.replace(TAGS, '').slice(0, 1500)}`
  }).join('\n')
  const { res } = await call('/chat/completions', {
    model: GATE_MODEL,
    ...(REASONING && { reasoning_effort: REASONING }),
    max_completion_tokens: 40,
    response_format: { type: 'json_schema', json_schema: GATE_SCHEMA },
    messages: [{ role: 'system', content: GATE_PROMPT }, { role: 'user', content: `<conversation>\n${convo}\n</conversation>` }],
  }, T_GATE)
  const data = await res.json()
  const v = JSON.parse(data?.choices?.[0]?.message?.content || '{}')
  if (!GATE_SCHEMA.schema.properties.verdict.enum.includes(v.verdict)) throw new Error('bad verdict')
  return v
}

// ── Layer 3: moderation (fails open: the gatekeeper also screens abuse) ────
async function moderate(text) {
  try {
    const { res } = await call('/moderations', { model: MOD_MODEL, input: text.slice(0, 4000) }, T_MOD)
    const r = (await res.json())?.results?.[0]
    if (!r) return null
    const c = r.categories || {}
    return { flagged: !!r.flagged, selfHarm: !!(c['self-harm'] || c['self-harm/intent'] || c['self-harm/instructions']) }
  } catch { return null }
}

// ── Layer 4: the output filter ──────────────────────────────────────────────
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
function denyPatterns() {
  const words = [...PROMPT_TELLS, ...(process.env.HUISIN_DENY || '').split(',')].map(w => w.trim()).filter(Boolean)
  // case-insensitive, word boundaries where the term has them, any run of spaces between words
  const pats = words.map(w => new RegExp(`${/^\w/.test(w) ? '\\b' : ''}${w.split(/\s+/).map(esc).join('\\s*')}${/\w$/.test(w) ? '\\b' : ''}`, 'i'))
  pats.push(new RegExp(esc(CANARY), 'i'), new RegExp(esc(CANARY.replace(/^HS-/, '')), 'i'))
  // anything shaped like a phone number (9+ digits, single spaces/dots/dashes/brackets between).
  // Eric's number isn't in her facts; this catches it if a visitor feeds it in or she makes one up.
  pats.push(/(?:\+|\b)\d(?:[\s().-]?\d){8,}/)
  return pats
}
/** House style, fixed in code: no dashes as punctuation, no markdown. Local edits only, so it is stable as text grows. */
function tidy(t) {
  return t
    .replace(/(\d)\s*[–—]\s*(\d)/g, '$1 to $2')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/\*\*|__|`/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
}
function outputFilter() {
  const pats = denyPatterns()
  let raw = '', sent = 0
  const bad = () => pats.some(p => p.test(raw))
  return {
    push(delta) {
      raw += delta
      if (bad()) return { cut: true }
      const clean = tidy(raw), upto = Math.max(sent, clean.length - HOLD)
      const out = clean.slice(sent, upto); sent = upto
      return { out }
    },
    end() {
      if (bad()) return { cut: true }
      const clean = tidy(raw).trimEnd()
      const out = clean.slice(sent); sent = clean.length
      return { out, empty: !clean.trim() }
    },
  }
}

/** Read an OpenAI-style SSE stream, yielding content deltas. */
async function* deltas(res) {
  const dec = new TextDecoder()
  let buf = ''
  for await (const chunk of res.body) {
    buf += dec.decode(chunk, { stream: true })
    let i
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1)
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (data === '[DONE]') return
      try { const d = JSON.parse(data)?.choices?.[0]?.delta?.content; if (d) yield d } catch { /* keep-alive or partial */ }
    }
  }
}

// ── The handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  const t0 = Date.now()
  const origin = req.headers.origin
  const allowed = originOk(origin)
  if (origin && allowed) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin') }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Expose-Headers', 'x-hs')
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end() }

  let lang = 'en', outcome = 'error', inLen = 0, outLen = 0, why = '', route = 'none', calls = 0
  // never what anyone wrote. `route` and `calls` show where the day's usage went: none (code only), cache, gated, fast
  const log = () => console.log(JSON.stringify({ ev: 'huisin', outcome, route, calls, lang, inLen, outLen, ms: Date.now() - t0, ...(why && { why }) }))
  const reply = (status, kind) => {
    outcome = kind
    if (!res.headersSent) {
      res.statusCode = status
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Cache-Control', 'no-store')
      if (kind === 'busy') res.setHeader('x-hs', 'busy')         // the chat shows this text, not its error line
      if (!isProd()) res.setHeader('x-huisin', kind)
    }
    const text = fixed(kind, lang)
    outLen = text.length
    res.end(text)
    log()
  }

  if (req.method !== 'POST') { res.statusCode = 405; return res.end() }
  if (!allowed) { res.statusCode = 403; outcome = 'origin'; log(); return res.end() }
  if (process.env.HUISIN_OFF === '1') return reply(200, 'off')
  if (!apiKey()) return reply(503, 'error')

  let msgs
  try { msgs = cleanHistory((await readBody(req))?.messages) } catch { msgs = null }
  if (!msgs) { res.statusCode = 400; outcome = 'bad-request'; log(); return res.end() }
  const latest = msgs[msgs.length - 1].content
  inLen = latest.length
  lang = guessLang(latest)
  if (latest.length > MAX_IN) return reply(200, 'too_long')
  if (!latest.trim()) { res.statusCode = 400; outcome = 'bad-request'; log(); return res.end() }
  const ip = clientIp(req)
  if (tooSoon(ip) || limited(ip)) return reply(429, 'busy')

  // ── Layer 0: everything that can be answered without a model ──
  const struck = strikeState(ip)
  if (struck.cooling) return reply(200, 'cooldown')
  const quick = triage(latest)
  if (quick) {
    if (quick.strike) addStrike(ip)
    if (!quick.strike && !res.headersSent) res.setHeader('x-hs', 'ok')     // small talk is a real, friendly reply
    return reply(200, quick.kind)
  }
  const key = cacheKey(msgs)
  const known = recall(key)
  if (known) {
    route = 'cache'; outcome = 'cached'; outLen = known.length
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    if (!isProd()) res.setHeader('x-huisin', 'cached')
    res.setHeader('x-hs', 'ok')
    res.end(known)
    return log()
  }
  await syncBudget()
  if (spentToday() >= DAY_CAP) { why = 'daily cap'; return reply(200, 'off') }
  spend()

  // ── The model, as cheaply as the message allows ──
  // A plain question about Eric from a visitor in good standing: everything starts at once (fast).
  // Anything else: the gatekeeper first, and the answer only if it says yes (cheap).
  const fast = looksInScope(latest) && struck.n === 0
  route = fast ? 'fast' : 'gated'
  const stop = new AbortController()
  // (the response's close, not the request's: a request "closes" as soon as its body is read)
  res.on?.('close', () => { if (!res.writableEnded) stop.abort(new Error('client gone')) })
  const startAnswer = () => {
    calls++
    const p = call('/chat/completions', {
      model: MODEL,
      stream: true,
      ...(REASONING && { reasoning_effort: REASONING }),
      max_completion_tokens: MAX_OUT,
      messages: [{ role: 'system', content: systemPrompt(CANARY) }, ...msgs],
    }, T_ANSWER, stop.signal)
    p.catch(() => {})   // judged below
    return p
  }
  let answer = fast ? startAnswer() : null

  let gate, mod
  try {
    calls += 2
    ;[gate, mod] = await Promise.all([gatekeeper(msgs), moderate(latest)])
  } catch (e) {
    why = 'gate: ' + String(e?.message || e).slice(0, 300)
    stop.abort(new Error('gate failed'))
    return reply(200, 'error')                         // fail closed
  }
  lang = gate.lang === 'other' ? 'en' : gate.lang
  const block =
    gate.verdict === 'crisis' || mod?.selfHarm ? 'crisis'
    : gate.verdict === 'attack' ? 'attack'
    : gate.verdict === 'abuse' || mod?.flagged ? 'abuse'
    : gate.verdict === 'private' ? 'private'
    : gate.verdict === 'off_topic' ? 'off_topic'
    : null
  if (block) {
    stop.abort(new Error('blocked'))
    if (block !== 'crisis') addStrike(ip)              // someone in trouble is never "struck"
    return reply(200, block)
  }

  // Allowed: stream the answer through the output filter.
  if (!answer) answer = startAnswer()
  let a
  try { a = await answer } catch (e) { why = String(e?.message || e).slice(0, 300); return reply(200, 'error') }
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Accel-Buffering', 'no')
  if (!isProd()) res.setHeader('x-huisin', 'answer')
  res.setHeader('x-hs', 'ok')                          // "she answered" (the text shows that anyway): the chat only plays its reactions on real answers
  const filter = outputFilter()
  let said = ''
  const write = (s) => { if (s) { outLen += s.length; said += s; res.write(s) } }
  try {
    for await (const d of deltas(a.res)) {
      const r = filter.push(d)
      if (r.cut) { stop.abort(new Error('filtered')); outcome = 'cut'; write((outLen ? ' ' : '') + fixed('cut', lang)); res.end(); return log() }
      write(r.out)
    }
    const r = filter.end()
    if (r.cut) { outcome = 'cut'; write((outLen ? ' ' : '') + fixed('cut', lang)) }
    else if (r.empty && !outLen) { outcome = 'empty'; write(fixed('error', lang)) }
    else { outcome = 'answer'; write(r.out); remember(key, said) }      // a clean answer to a standalone question: keep it for the next visitor
  } catch {
    outcome = 'stream-error'
    if (!outLen) write(fixed('error', lang))
  } finally {
    a.clear()
  }
  res.end()
  log()
}

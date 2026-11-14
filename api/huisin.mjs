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
//   5. limits                     origin check, size caps, history rebuilt from known fields, 10/min and
//                                 60/day per IP, an output cap, no reasoning tokens, a kill switch
//   6. red-team evals             scripts/huisin-evals.mjs, the release gate
//
// The gatekeeper, moderation and the answer all start at once; the answer is
// held until both verdicts are in, then either streamed or dropped. A blocked
// message only ever gets a fixed reply written in code.
//
// Provider: the University of Edinburgh's ELM gateway (OpenAI-compatible).
// Any OpenAI-compatible provider works by changing the env vars below.
//
// Env:
//   ELM_API_KEY (or HUISIN_API_KEY)   the key. Server-side only.
//   HUISIN_BASE_URL     default https://elm.edina.ac.uk/api/v1
//   HUISIN_MODEL        default gpt-5.4-mini        (the answer)
//   HUISIN_GATE_MODEL   default gpt-5.4-nano        (the gatekeeper)
//   HUISIN_DENY         comma-separated words she must never say (kept out of this public repo)
//   HUISIN_CANARY       optional; otherwise a random one per instance
//   HUISIN_OFF=1        kill switch: she naps, no model is called
import { randomBytes } from 'node:crypto'
import { systemPrompt, GATE_PROMPT, GATE_SCHEMA, PROMPT_TELLS, fixed } from './_huisin/prompt.mjs'

export const config = { maxDuration: 30 }

const BASE       = (process.env.HUISIN_BASE_URL || 'https://elm.edina.ac.uk/api/v1').replace(/\/+$/, '')
const MODEL      = process.env.HUISIN_MODEL || 'gpt-5.4-mini'
const GATE_MODEL = process.env.HUISIN_GATE_MODEL || 'gpt-5.4-nano'
const MOD_MODEL  = 'omni-moderation-latest'
const REASONING  = process.env.HUISIN_REASONING ?? 'none'      // '' leaves it out, for models without the option
const CANARY     = process.env.HUISIN_CANARY || `HS-${randomBytes(6).toString('hex')}`
const apiKey     = () => process.env.HUISIN_API_KEY || process.env.ELM_API_KEY || ''
const isProd     = () => process.env.VERCEL_ENV === 'production'

const MAX_IN      = 1000     // characters per visitor message
const MAX_MSGS    = 30       // messages per request
const KEEP        = 12       // messages the model sees
const GATE_TURNS  = 4        // earlier turns the gatekeeper sees, for follow-ups
const MAX_OUT     = 350      // output tokens: 1 to 3 sentences with room to spare
const HOLD        = 32       // characters always held back while streaming
const T_GATE      = 6000, T_MOD = 5000, T_ANSWER = 25000
const PER_MIN     = 10, PER_DAY = 60

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

  let lang = 'en', outcome = 'error', inLen = 0, outLen = 0, why = ''
  const log = () => console.log(JSON.stringify({ ev: 'huisin', outcome, lang, inLen, outLen, ms: Date.now() - t0, ...(why && { why }) }))   // never what anyone wrote
  const reply = (status, kind) => {
    outcome = kind
    if (!res.headersSent) {
      res.statusCode = status
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Cache-Control', 'no-store')
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
  if (limited(clientIp(req))) return reply(429, 'busy')

  // All three start now; the answer waits for both verdicts.
  const stop = new AbortController()
  // (the response's close, not the request's: a request "closes" as soon as its body is read)
  res.on?.('close', () => { if (!res.writableEnded) stop.abort(new Error('client gone')) })
  const answer = call('/chat/completions', {
    model: MODEL,
    stream: true,
    ...(REASONING && { reasoning_effort: REASONING }),
    max_completion_tokens: MAX_OUT,
    messages: [{ role: 'system', content: systemPrompt(CANARY) }, ...msgs],
  }, T_ANSWER, stop.signal)
  answer.catch(() => {})   // judged below

  let gate, mod
  try {
    [gate, mod] = await Promise.all([gatekeeper(msgs), moderate(latest)])
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
  if (block) { stop.abort(new Error('blocked')); return reply(200, block) }

  // Allowed: stream the held answer through the output filter.
  let a
  try { a = await answer } catch (e) { why = String(e?.message || e).slice(0, 300); return reply(200, 'error') }
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Accel-Buffering', 'no')
  if (!isProd()) res.setHeader('x-huisin', 'answer')
  res.setHeader('x-hs', 'ok')                          // "she answered" (the text shows that anyway): the chat only plays its reactions on real answers
  const filter = outputFilter()
  const write = (s) => { if (s) { outLen += s.length; res.write(s) } }
  try {
    for await (const d of deltas(a.res)) {
      const r = filter.push(d)
      if (r.cut) { stop.abort(new Error('filtered')); outcome = 'cut'; write((outLen ? ' ' : '') + fixed('cut', lang)); res.end(); return log() }
      write(r.out)
    }
    const r = filter.end()
    if (r.cut) { outcome = 'cut'; write((outLen ? ' ' : '') + fixed('cut', lang)) }
    else if (r.empty && !outLen) { outcome = 'empty'; write(fixed('error', lang)) }
    else { outcome = 'answer'; write(r.out) }
  } catch {
    outcome = 'stream-error'
    if (!outLen) write(fixed('error', lang))
  } finally {
    a.clear()
  }
  res.end()
  log()
}

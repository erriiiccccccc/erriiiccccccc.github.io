// Vercel serverless function — the jukebox.
//
// GET  /api/jukebox                    list every track still on the shelf
// GET  /api/jukebox?action=track&id=   one track's pattern JSON (CORS fallback)
// POST /api/jukebox                    put a new one up  { title, name, cover, pattern }
// POST /api/jukebox?action=report      flag one          { id }
//
// The doodle wall's twin, and deliberately the same shape as api/gallery.mjs.
// Storage is Vercel Blob, there is no database: everything the shelf needs to
// draw a card is encoded in the pathname, so listing is a single list() call
// and nobody downloads a pattern they never press play on.
//
//   tunes/track/<id>__<base64url name>__<bpm>__<base64url title>__<cover>.json
//   (older tracks stop after <bpm>: they read as untitled, sunset sleeve)
//   tunes/flags/<id>__<nonce>.json
//   tunes/pinned/<id>__<base64url name>__<bpm>.json
//
// bpm rides in the pathname so a card can show the tempo without fetching a
// single byte of the pattern itself.
//
// The id is an INVERTED timestamp (INV_BASE - Date.now()) plus a nonce. Blob
// list() returns pathnames in lexicographic order, so inverting means the
// newest tracks come back first and a capped list() is "the newest N" instead
// of "the oldest N frozen forever once the shelf fills up".
//
// Reports are additive blobs rather than a counter, which keeps writes
// conflict-free across concurrent lambdas. Two flags and a track stops being
// listed (the blob stays, so nothing is destroyed by a pile-on).
//
// `tunes/pinned/` is how Eric's own loops stay at the top of the shelf however
// many visitors post after him. Nothing writes there through this endpoint —
// drop the JSON in from the Blob dashboard and it is unspoofable by design.
import { put, list } from '@vercel/blob'

const TRACK_PREFIX  = 'tunes/track/'
const FLAG_PREFIX   = 'tunes/flags/'
const PINNED_PREFIX = 'tunes/pinned/'

const MAX_BYTES    = 8_192        // serialised pattern JSON
const MAX_NAME     = 24
const HIDE_AT      = 2            // flags needed before a track is hidden
const SHELF_LIMIT  = 300          // newest N tracks (see id inversion above)
const FLAG_LIMIT   = 1000
const PINNED_LIMIT = 24

const STEPS     = 16
const BPM_MIN   = 70
const BPM_MAX   = 140
const LANE_ROWS = { lead: 8, bass: 5, drums: 3 }
const MOODS     = ['dreamy', 'warm', 'night']

/** Comfortably past any real timestamp, so inverted ids stay positive + fixed width. */
const INV_BASE = 10_000_000_000_000

export const config = { maxDuration: 20 }

// ── Helpers ─────────────────────────────────────────────────────────────────

function cors(res) {
  // erriiiccccccc.github.io has no functions of its own, so it borrows these.
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
}

function encName(name) {
  return Buffer.from(name, 'utf8').toString('base64url')
}

function decName(seg) {
  try { return Buffer.from(seg, 'base64url').toString('utf8') } catch { return '' }
}

function cleanName(raw) {
  return String(raw || '')
    .replace(/[^\p{L}\p{N} '._-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_NAME)
}

function clampBpm(n) {
  const v = Math.round(Number(n))
  if (!Number.isFinite(v)) return 96
  return v < BPM_MIN ? BPM_MIN : v > BPM_MAX ? BPM_MAX : v
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body)
  const chunks = []
  for await (const c of req) chunks.push(c)
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

const COVERS = ['sunset', 'ocean', 'meadow', 'night', 'plum']
const cleanCover = (k) => (COVERS.includes(k) ? k : 'sunset')

/** `tunes/track/<id>__<b64 name>__<bpm>__<b64 title>__<cover>.json` → { id, name, bpm, title, cover } */
function parsePathname(pathname, prefix) {
  const rest = pathname.slice(prefix.length)
  const cut  = rest.lastIndexOf('.')
  const stem = cut > 0 ? rest.slice(0, cut) : rest
  const [id, encoded = '', bpm = '', title = '', cover = ''] = stem.split('__')
  return { id, name: cleanName(decName(encoded)), bpm: clampBpm(bpm), title: cleanName(decName(title)), cover: cleanCover(cover) }
}

function newId() {
  const inv = String(INV_BASE - Date.now()).padStart(14, '0')
  return `${inv}-${Math.random().toString(36).slice(2, 8)}`
}

/** Recover the real posting time from an inverted id. */
function idToTimestamp(id) {
  const inv = Number(String(id).split('-')[0])
  if (!Number.isFinite(inv)) return 0
  const at = INV_BASE - inv
  return at > 0 && at < INV_BASE ? at : 0
}

function configured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

/**
 * Coerce a posted pattern into one we are willing to store, or null. Mirrors
 * normalizePattern() in src/jukebox/pattern.js — two small copies beat wiring
 * a shared build step into a lambda, the same call api/gallery makes with
 * cleanName. Nothing here trusts the client: out-of-range cells are dropped,
 * unknown moods fall back, duplicates collapse.
 */
function cleanPattern(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null

  const root = Number(raw.root)
  const out = {
    v:    1,
    bpm:  clampBpm(raw.bpm),
    root: Number.isFinite(root) ? Math.min(84, Math.max(36, Math.round(root))) : 57,
    mood: MOODS.includes(raw.mood) ? raw.mood : 'dreamy',
    lanes: {},
  }

  let cells = 0
  for (const [lane, rows] of Object.entries(LANE_ROWS)) {
    const seen = new Set()
    const kept  = []
    const pairs = Array.isArray(raw.lanes?.[lane]) ? raw.lanes[lane] : []
    for (const pair of pairs) {
      if (!Array.isArray(pair) || pair.length < 2) continue
      const step = Math.trunc(Number(pair[0]))
      const row  = Math.trunc(Number(pair[1]))
      if (!(step >= 0 && step < STEPS && row >= 0 && row < rows)) continue
      const key = step * 100 + row
      if (seen.has(key)) continue
      seen.add(key)
      kept.push([step, row])
      cells++
    }
    kept.sort((a, b) => a[0] - b[0] || a[1] - b[1])
    out.lanes[lane] = kept
  }

  // An empty loop is nothing to listen to, and a full one is not a loop.
  if (cells === 0 || cells > STEPS * (8 + 5 + 3)) return null
  return out
}

// ── Handlers ────────────────────────────────────────────────────────────────

async function listShelf() {
  const [tracks, flags, pinned] = await Promise.all([
    list({ prefix: TRACK_PREFIX,  limit: SHELF_LIMIT }),
    list({ prefix: FLAG_PREFIX,   limit: FLAG_LIMIT }),
    list({ prefix: PINNED_PREFIX, limit: PINNED_LIMIT }),
  ])

  const flagged = new Map()
  for (const b of flags.blobs) {
    const { id } = parsePathname(b.pathname, FLAG_PREFIX)
    if (id) flagged.set(id, (flagged.get(id) || 0) + 1)
  }

  const shelf = tracks.blobs
    .map(b => {
      const { id, name, bpm, title, cover } = parsePathname(b.pathname, TRACK_PREFIX)
      return { id, name, title, cover, bpm, url: b.url, at: idToTimestamp(id) }
    })
    .filter(t => t.id && (flagged.get(t.id) || 0) < HIDE_AT)
    .sort((a, b) => b.at - a.at)

  // Eric's own loops sit above the shelf and never sink. They cannot be
  // flagged away either — only he can write to that prefix.
  const top = pinned.blobs
    .map(b => {
      const { id, name, bpm, title, cover } = parsePathname(b.pathname, PINNED_PREFIX)
      return { id, name, title, cover, bpm, url: b.url, at: idToTimestamp(id), pinned: true }
    })
    .filter(t => t.id)
    .sort((a, b) => b.at - a.at)

  return [...top, ...shelf]
}

async function createTune(body) {
  const name    = cleanName(body.name)
  const title   = cleanName(body.title)
  const cover   = cleanCover(body.cover)
  const pattern = cleanPattern(body.pattern)
  if (!title)   return { status: 400, json: { error: 'a record needs a name' } }
  if (!pattern) return { status: 400, json: { error: 'expected a pattern with at least one note' } }

  const json  = JSON.stringify(pattern)
  const bytes = Buffer.byteLength(json, 'utf8')
  if (bytes > MAX_BYTES) return { status: 413, json: { error: 'pattern too large' } }

  const id       = newId()
  const pathname = `${TRACK_PREFIX}${id}__${encName(name)}__${pattern.bpm}__${encName(title)}__${cover}.json`

  const blob = await put(pathname, json, {
    access:             'public',
    contentType:        'application/json',
    addRandomSuffix:    false,
    cacheControlMaxAge: 31_536_000,
  })

  return {
    status: 201,
    json: { item: { id, name, title, cover, bpm: pattern.bpm, url: blob.url, at: idToTimestamp(id) } },
  }
}

async function reportTune(body) {
  const id = String(body.id || '').slice(0, 64)
  if (!/^[a-z0-9-]+$/i.test(id)) return { status: 400, json: { error: 'bad id' } }

  const nonce = Math.random().toString(36).slice(2, 10)
  await put(`${FLAG_PREFIX}${id}__${nonce}.json`, JSON.stringify({ id, at: Date.now() }), {
    access:          'public',
    contentType:     'application/json',
    addRandomSuffix: false,
  })
  return { status: 200, json: { ok: true } }
}

/**
 * Hand back one track's pattern from this origin.
 *
 * The shelf normally fetches the blob URL straight from the CDN, which does
 * send `access-control-allow-origin: *`. This exists because that is the one
 * assumption in the whole feature that only breaks on the Pages host, where it
 * cannot be caught before shipping: if the CDN ever stops being CORS-open, the
 * client falls back here and the shelf keeps working.
 */
async function readTune(id) {
  if (!/^[a-z0-9-]+$/i.test(String(id || ''))) return { status: 400, json: { error: 'bad id' } }

  const hits = await Promise.all([
    list({ prefix: `${TRACK_PREFIX}${id}__`,  limit: 1 }),
    list({ prefix: `${PINNED_PREFIX}${id}__`, limit: 1 }),
  ])
  const blob = hits[0].blobs[0] || hits[1].blobs[0]
  if (!blob) return { status: 404, json: { error: 'no such track' } }

  const res = await fetch(blob.url)
  if (!res.ok) return { status: 502, json: { error: 'could not read that track' } }

  const pattern = cleanPattern(await res.json())
  if (!pattern) return { status: 422, json: { error: 'that track is unplayable' } }
  return { status: 200, json: { pattern }, immutable: true }
}

// ── Entry ───────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  cors(res)
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'OPTIONS') return res.status(204).end()

  if (!configured()) {
    // No Blob store bound yet — say so plainly and let the client fall back.
    return res.status(501).json({ error: 'jukebox-not-configured' })
  }

  try {
    if (req.method === 'GET') {
      if (String(req.query?.action || '') === 'track') {
        const result = await readTune(req.query?.id)
        if (result.immutable) {
          // A pattern never changes once written, so this can sit forever.
          res.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=31536000, immutable')
        }
        return res.status(result.status).json(result.json)
      }

      const items = await listShelf()
      // Short edge cache so a busy shelf does not re-list per visitor, but a
      // new track still shows up for everyone within a few seconds.
      res.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=10, stale-while-revalidate=60')
      return res.status(200).json({ items })
    }

    if (req.method === 'POST') {
      const body   = await readBody(req)
      const action = String(req.query?.action || '')
      const result = action === 'report'
        ? await reportTune(body)
        : await createTune(body)
      return res.status(result.status).json(result.json)
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS')
    return res.status(405).json({ error: 'method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'jukebox failed' })
  }
}

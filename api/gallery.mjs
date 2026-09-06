// Vercel serverless function — the doodle wall.
//
// GET  /api/gallery              list every drawing that is still standing
// POST /api/gallery              hang a new one up   { name, image }
// POST /api/gallery?action=report flag one           { id }
//
// Storage is Vercel Blob. There is no database: everything a drawing needs is
// encoded in its own pathname, so listing the wall is a single list() call.
//
//   doodles/art/<id>__<base64url name>.png
//   doodles/flags/<id>__<nonce>.json
//
// The id is an INVERTED timestamp (INV_BASE - Date.now()) plus a nonce. Blob
// list() returns pathnames in lexicographic order, so inverting means the
// newest drawings come back first and a capped list() is "the newest N"
// instead of "the oldest N frozen forever once the wall fills up".
//
// Reports are additive blobs rather than a counter, which keeps writes
// conflict-free across concurrent lambdas. Two flags and a drawing stops
// being listed (the blob stays, so nothing is destroyed by a pile-on).
import { put, list } from '@vercel/blob'

const ART_PREFIX  = 'doodles/art/'
const FLAG_PREFIX = 'doodles/flags/'

const MAX_BYTES   = 2_000_000     // decoded PNG
const MAX_NAME    = 24
const HIDE_AT     = 2             // flags needed before a drawing is hidden
const WALL_LIMIT  = 300           // newest N drawings (see id inversion above)
const FLAG_LIMIT  = 1000

/** Comfortably past any real timestamp, so inverted ids stay positive + fixed width. */
const INV_BASE    = 10_000_000_000_000

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

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body)
  const chunks = []
  for await (const c of req) chunks.push(c)
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

/** `doodles/art/<id>__<b64>.png` → { id, name } */
function parsePathname(pathname, prefix) {
  const rest = pathname.slice(prefix.length)
  const cut  = rest.lastIndexOf('.')
  const stem = cut > 0 ? rest.slice(0, cut) : rest
  const [id, encoded = ''] = stem.split('__')
  return { id, name: cleanName(decName(encoded)) }
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

// ── Handlers ────────────────────────────────────────────────────────────────

async function listWall() {
  const [art, flags] = await Promise.all([
    list({ prefix: ART_PREFIX,  limit: WALL_LIMIT }),
    list({ prefix: FLAG_PREFIX, limit: FLAG_LIMIT }),
  ])

  const flagged = new Map()
  for (const b of flags.blobs) {
    const { id } = parsePathname(b.pathname, FLAG_PREFIX)
    if (id) flagged.set(id, (flagged.get(id) || 0) + 1)
  }

  return art.blobs
    .map(b => {
      const { id, name } = parsePathname(b.pathname, ART_PREFIX)
      return { id, name, url: b.url, at: idToTimestamp(id) }
    })
    .filter(d => d.id && (flagged.get(d.id) || 0) < HIDE_AT)
    .sort((a, b) => b.at - a.at)
}

async function createDoodle(body) {
  const name  = cleanName(body.name)
  const image = String(body.image || '')

  const match = /^data:image\/(png|webp|jpeg);base64,/.exec(image)
  if (!match) return { status: 400, json: { error: 'expected a png/webp/jpeg data url' } }

  const ext   = match[1] === 'jpeg' ? 'jpg' : match[1]
  const bytes = Buffer.from(image.slice(match[0].length), 'base64')
  if (!bytes.length)            return { status: 400, json: { error: 'empty image' } }
  if (bytes.length > MAX_BYTES) return { status: 413, json: { error: 'image too large' } }

  const id       = newId()
  const pathname = `${ART_PREFIX}${id}__${encName(name)}.${ext}`

  const blob = await put(pathname, bytes, {
    access:             'public',
    contentType:        match[1] === 'jpeg' ? 'image/jpeg' : `image/${match[1]}`,
    addRandomSuffix:    false,
    cacheControlMaxAge: 31_536_000,
  })

  return { status: 201, json: { item: { id, name, url: blob.url, at: idToTimestamp(id) } } }
}

async function reportDoodle(body) {
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

// ── Entry ───────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  cors(res)
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'OPTIONS') return res.status(204).end()

  if (!configured()) {
    // No Blob store bound yet — say so plainly and let the client fall back.
    return res.status(501).json({ error: 'gallery-not-configured' })
  }

  try {
    if (req.method === 'GET') {
      const items = await listWall()
      // Short edge cache so a busy wall does not re-list per visitor, but a new
      // drawing still shows up for everyone within a few seconds.
      res.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=10, stale-while-revalidate=60')
      return res.status(200).json({ items })
    }

    if (req.method === 'POST') {
      const body   = await readBody(req)
      const action = String(req.query?.action || '')
      const result = action === 'report'
        ? await reportDoodle(body)
        : await createDoodle(body)
      return res.status(result.status).json(result.json)
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS')
    return res.status(405).json({ error: 'method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'gallery failed' })
  }
}

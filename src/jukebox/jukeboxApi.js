// Jukebox data layer.
//
// Live tracks live in Vercel Blob behind /api/jukebox. Two hosts serve this
// site (ericng.my on Vercel, erriiiccccccc.github.io on Pages) and only the
// Vercel one has functions, so Pages talks to the Vercel origin cross-site.
// If neither answers (offline, local build, API not configured yet) we fall
// back to a browser-local shelf so the whole feature still works end to end.
//
// The one thing this layer does that the doodle wall's does not: it never
// downloads a pattern until someone actually presses play, then caches it for
// the session. A shelf of fifty tracks costs one listing request to draw.
import { normalizePattern } from './pattern.js'

const VERCEL_ORIGIN = 'https://ericng.my'
const LOCAL_KEY     = 'ew_tunes_v1'
const HIDDEN_KEY    = 'ew_tunes_hidden_v1'
const LOCAL_MAX     = 24          // localStorage is ~5MB, patterns are ~1KB
const HIDDEN_MAX    = 200
const NAME_MAX      = 24

/** Longest a stored pattern may be, serialised. Mirrors the server cap. */
export const MAX_PATTERN_BYTES = 8_192

/** Patterns already fetched this session. Keyed by track id. */
const _cache = new Map()

function endpoint() {
  // Pages has no /api, so borrow the Vercel deployment's function.
  if (/\.github\.io$/i.test(location.hostname)) return `${VERCEL_ORIGIN}/api/jukebox`
  return '/api/jukebox'
}

/** Signature names: letters, digits, spaces and a little light punctuation. */
export function cleanName(raw) {
  return String(raw || '')
    .replace(/[^\p{L}\p{N} '._-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NAME_MAX)
}

// ── Local fallback shelf ────────────────────────────────────────────────────

function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch { return [] }
}

function writeLocal(items) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(items.slice(0, LOCAL_MAX))) }
  catch { /* quota — the newest ones simply don't stick */ }
}

/** Ids this browser has flagged. Server hiding needs 2 flags; yours needs 1. */
function readHidden() {
  try {
    const arr = JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]')
    return Array.isArray(arr) ? arr : []
  } catch { return [] }
}

function addHidden(id) {
  try {
    const next = [id, ...readHidden().filter(x => x !== id)].slice(0, HIDDEN_MAX)
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(next))
  } catch { /* quota — worst case it reappears next visit */ }
}

// ── Public API ──────────────────────────────────────────────────────────────

/**
 * @returns {Promise<{ items: Array<{id,name,at,bpm,url,pinned?,mine?}>, offline: boolean }>}
 */
export async function fetchTunes() {
  try {
    const res = await fetch(endpoint(), { headers: { accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data.items)) throw new Error('bad payload')
    const mine   = new Set(readLocal().map(t => t.id))
    const hidden = new Set(readHidden())
    return {
      items: data.items
        .filter(t => !hidden.has(t.id))
        .map(t => ({ ...t, mine: mine.has(t.id) })),
      offline: false,
    }
  } catch {
    const hidden = new Set(readHidden())
    return {
      // Tracks that went up while online kept only their id here, so there is
      // nothing local to play them back from. Only the offline ones show.
      items: readLocal()
        .filter(t => t.pattern && !hidden.has(t.id))
        .map(t => ({ ...t, mine: true })),
      offline: true,
    }
  }
}

/**
 * Fetch one track's pattern, lazily, the first time someone hits play. Cached
 * for the session because a pattern never changes once it is written.
 *
 * Blob URLs are CORS-open, so the normal path is a straight CDN read. If that
 * ever stops being true on the Pages host the lambda can hand the same JSON
 * back from our own origin, so try that before giving up.
 *
 * @returns {Promise<object|null>} a normalised pattern, or null
 */
export async function fetchPattern(item) {
  if (!item?.id) return null
  const hit = _cache.get(item.id)
  if (hit) return hit

  // Locally-posted tracks carry their own pattern; there is nothing to fetch.
  if (item.pattern) {
    const local = normalizePattern(item.pattern)
    if (local) _cache.set(item.id, local)
    return local
  }

  let pattern = null
  if (item.url) {
    try {
      const res = await fetch(item.url, { headers: { accept: 'application/json' } })
      if (res.ok) pattern = normalizePattern(await res.json())
    } catch { /* cross-origin or offline — try our own origin below */ }
  }

  if (!pattern) {
    try {
      const res = await fetch(`${endpoint()}?action=track&id=${encodeURIComponent(item.id)}`,
                              { headers: { accept: 'application/json' } })
      if (res.ok) pattern = normalizePattern((await res.json()).pattern)
    } catch { /* nothing left to try */ }
  }

  if (pattern) _cache.set(item.id, pattern)
  return pattern
}

/**
 * @param {{ name: string, pattern: object }} tune
 * @returns {Promise<{ item: object, offline: boolean }>}
 */
export async function postTune({ name, pattern }) {
  const clean = cleanName(name)
  const body  = normalizePattern(pattern)
  if (!body) throw new Error('empty')

  const json = JSON.stringify(body)
  if (json.length > MAX_PATTERN_BYTES) throw new Error('too-big')

  try {
    const res = await fetch(endpoint(), {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body:    JSON.stringify({ name: clean, pattern: body }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!data.item) throw new Error('bad payload')
    // Remember our own ids so the shelf can mark them on the next load. No
    // pattern is stored: once it is live, the blob is the only source of truth.
    writeLocal([{ id: data.item.id, at: data.item.at, name: clean }, ...readLocal()])
    _cache.set(data.item.id, body)
    return { item: data.item, offline: false }
  } catch (err) {
    if (err.message === 'too-big' || err.message === 'empty') throw err
    // No API reachable: keep the whole track locally, pattern and all, so the
    // shelf still has something to play back.
    const item = {
      id:      `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name:    clean,
      bpm:     body.bpm,
      at:      Date.now(),
      pattern: body,
    }
    writeLocal([item, ...readLocal()])
    _cache.set(item.id, body)
    return { item, offline: true }
  }
}

/**
 * Flag a track. It disappears for you straight away and stays gone; it takes
 * a second person's flag before it stops being listed for everyone.
 */
export async function reportTune(id) {
  addHidden(id)
  _cache.delete(id)
  try {
    const res = await fetch(`${endpoint()}?action=report`, {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body:    JSON.stringify({ id }),
    })
    return res.ok
  } catch { return false }
}

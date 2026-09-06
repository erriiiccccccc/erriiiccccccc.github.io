// Doodle wall data layer.
//
// Live drawings live in Vercel Blob behind /api/gallery. Two hosts serve this
// site (ericng.my on Vercel, erriiiccccccc.github.io on Pages) and only the
// Vercel one has functions, so Pages talks to the Vercel origin cross-site.
// If neither answers (offline, local build, API not configured yet) we fall
// back to a browser-local wall so the whole feature still works end to end.

const VERCEL_ORIGIN = 'https://ericng.my'
const LOCAL_KEY     = 'ew_doodles_v1'
const HIDDEN_KEY    = 'ew_doodles_hidden_v1'
const LOCAL_MAX     = 12          // localStorage is ~5MB, doodles are ~60KB
const HIDDEN_MAX    = 200
const NAME_MAX      = 24

/** Longest a stored drawing may be, as a data URL. Mirrors the server cap. */
export const MAX_DATA_URL = 2_600_000   // ~1.95MB decoded, under the server's 2MB

function endpoint() {
  // Pages has no /api, so borrow the Vercel deployment's function.
  if (/\.github\.io$/i.test(location.hostname)) return `${VERCEL_ORIGIN}/api/gallery`
  return '/api/gallery'
}

/** Signature names: letters, digits, spaces and a little light punctuation. */
export function cleanName(raw) {
  return String(raw || '')
    .replace(/[^\p{L}\p{N} '._-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NAME_MAX)
}

// ── Local fallback wall ─────────────────────────────────────────────────────

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
 * @returns {Promise<{ items: Array<{id,url,name,at,mine?:boolean}>, offline: boolean }>}
 */
export async function fetchDoodles() {
  try {
    const res = await fetch(endpoint(), { headers: { accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data.items)) throw new Error('bad payload')
    const mine   = new Set(readLocal().map(d => d.id))
    const hidden = new Set(readHidden())
    return {
      items: data.items
        .filter(d => !hidden.has(d.id))
        .map(d => ({ ...d, mine: mine.has(d.id) })),
      offline: false,
    }
  } catch {
    const hidden = new Set(readHidden())
    return {
      items: readLocal().filter(d => d.url && !hidden.has(d.id)).map(d => ({ ...d, mine: true })),
      offline: true,
    }
  }
}

/**
 * @param {{ name: string, dataUrl: string }} doodle
 * @returns {Promise<{ item: object, offline: boolean }>}
 */
export async function postDoodle({ name, dataUrl }) {
  const clean = cleanName(name)
  if (dataUrl.length > MAX_DATA_URL) throw new Error('too-big')

  try {
    const res = await fetch(endpoint(), {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body:    JSON.stringify({ name: clean, image: dataUrl }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!data.item) throw new Error('bad payload')
    // Remember our own ids so the wall can mark them on the next load. No url
    // is stored: once it is live, the blob is the only source of truth.
    writeLocal([{ id: data.item.id, at: data.item.at, name: clean }, ...readLocal()])
    return { item: data.item, offline: false }
  } catch (err) {
    if (err.message === 'too-big') throw err
    const item = {
      id:   `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      url:  dataUrl,
      name: clean,
      at:   Date.now(),
    }
    writeLocal([item, ...readLocal()])
    return { item, offline: true }
  }
}

/**
 * Flag a drawing. It disappears for you straight away and stays gone; it takes
 * a second person's flag before it stops being listed for everyone.
 */
export async function reportDoodle(id) {
  addHidden(id)
  try {
    const res = await fetch(`${endpoint()}?action=report`, {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body:    JSON.stringify({ id }),
    })
    return res.ok
  } catch { return false }
}

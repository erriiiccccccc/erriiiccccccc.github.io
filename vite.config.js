import { defineConfig, loadEnv } from 'vite'
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { fetchTravelStats } from './scripts/travel-utils.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH   = join(__dirname, 'public', 'travel-stats.json')

// Dev stand-in for api/gallery.mjs (Vercel Blob). Drawings are kept as data
// URLs in a gitignored JSON file so the whole doodle-wall flow is testable
// with `npm run dev`, no Blob token needed.
const DEV_GALLERY_DIR  = join(__dirname, '.gallery-dev')
const DEV_GALLERY_FILE = join(DEV_GALLERY_DIR, 'index.json')

// Same idea for api/jukebox.mjs. Patterns are tiny, so the whole shelf fits in
// one gitignored JSON file and the pattern rides back as a data: URL — which
// is exactly the shape the real thing has, an immutable public URL holding
// nothing but the pattern.
const DEV_JUKEBOX_DIR  = join(__dirname, '.jukebox-dev')
const DEV_JUKEBOX_FILE = join(DEV_JUKEBOX_DIR, 'index.json')

function readDevStore(file) {
  try { return JSON.parse(readFileSync(file, 'utf8')) }
  catch { return [] }
}

function writeDevStore(dir, file, items) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(file, JSON.stringify(items, null, 2))
}

function readDevGallery() { return readDevStore(DEV_GALLERY_FILE) }
function writeDevGallery(items) { writeDevStore(DEV_GALLERY_DIR, DEV_GALLERY_FILE, items) }

function readDevJukebox() { return readDevStore(DEV_JUKEBOX_FILE) }
function writeDevJukebox(items) { writeDevStore(DEV_JUKEBOX_DIR, DEV_JUKEBOX_FILE, items) }

function patternUrl(pattern) {
  return `data:application/json;base64,${Buffer.from(JSON.stringify(pattern), 'utf8').toString('base64')}`
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', c => chunks.push(c))
    req.on('end', () => {
      try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}) }
      catch (err) { reject(err) }
    })
    req.on('error', reject)
  })
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/three-mesh-bvh')) return 'bvh'
          if (id.includes('/islands/')) return 'islands'
          // the Pirate globe and its map data load in idle time, never at startup
          if (id.includes('/travel/TravelGlobe') || /node_modules\/(d3-|world-atlas|topojson-client|internmap)/.test(id)) return 'travel-globe'
          if (id.includes('/travel/')) return 'travel'
          if (id.includes('/scene/Asteroids') || id.includes('/scene/Flyers')
            || id.includes('/scene/Comet') || id.includes('/scene/Aurora')) {
            return 'sky-deferred'
          }
        },
      },
    },
  },
  plugins: [{
    name: 'travel-stats-api',
    configureServer(server) {
      server.middlewares.use('/api/refresh-travel-stats', async (req, res) => {
        try {
          const stats = await fetchTravelStats()
          writeFileSync(OUT_PATH, JSON.stringify(stats, null, 2))
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(stats))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    }
  }, {
    name: 'doodle-wall-api',
    configureServer(server) {
      server.middlewares.use('/api/gallery', async (req, res) => {
        const send = (code, body) => {
          res.statusCode = code
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(body))
        }

        try {
          if (req.method === 'GET') {
            const items = readDevGallery()
              .filter(d => (d.flags || 0) < 2)
              .map(({ id, name, at, dataUrl }) => ({ id, name, at, url: dataUrl }))
              .sort((a, b) => b.at - a.at)
            return send(200, { items })
          }

          if (req.method === 'POST') {
            const body = await readJsonBody(req)
            const isReport = /[?&]action=report\b/.test(req.url || '')
            const items = readDevGallery()

            if (isReport) {
              const hit = items.find(d => d.id === body.id)
              if (hit) hit.flags = (hit.flags || 0) + 1
              writeDevGallery(items)
              return send(200, { ok: true })
            }

            if (!/^data:image\/(png|webp|jpeg);base64,/.test(String(body.image || ''))) {
              return send(400, { error: 'expected a png/webp/jpeg data url' })
            }
            const item = {
              id:      `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              name:    String(body.name || '').slice(0, 24),
              at:      Date.now(),
              dataUrl: body.image,
            }
            writeDevGallery([item, ...items])
            return send(201, { item: { id: item.id, name: item.name, at: item.at, url: item.dataUrl } })
          }

          send(405, { error: 'method not allowed' })
        } catch (err) {
          send(500, { error: err.message })
        }
      })
    }
  }, {
    name: 'jukebox-api',
    configureServer(server) {
      server.middlewares.use('/api/jukebox', async (req, res) => {
        const send = (code, body) => {
          res.statusCode = code
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(body))
        }

        try {
          if (req.method === 'GET') {
            const items = readDevJukebox().filter(t => (t.flags || 0) < 2)

            // The CORS fallback path, so it gets exercised locally too.
            const track = /[?&]action=track\b/.test(req.url || '')
            if (track) {
              const id  = decodeURIComponent(/[?&]id=([^&]*)/.exec(req.url || '')?.[1] || '')
              const hit = items.find(t => t.id === id)
              return hit ? send(200, { pattern: hit.pattern }) : send(404, { error: 'no such track' })
            }

            return send(200, {
              items: items
                .map(({ id, name, title, cover, at, bpm, pattern, pinned }) =>
                  ({ id, name, title: title || '', cover: cover || 'sunset', at, bpm, pinned, url: patternUrl(pattern) }))
                .sort((a, b) => b.at - a.at),
            })
          }

          if (req.method === 'POST') {
            const body     = await readJsonBody(req)
            const isReport = /[?&]action=report\b/.test(req.url || '')
            const items    = readDevJukebox()

            if (isReport) {
              const hit = items.find(t => t.id === body.id)
              if (hit) hit.flags = (hit.flags || 0) + 1
              writeDevJukebox(items)
              return send(200, { ok: true })
            }

            const pattern = body.pattern
            if (!pattern || typeof pattern !== 'object' || !pattern.lanes) {
              return send(400, { error: 'expected a pattern with at least one note' })
            }
            const title = String(body.title || '').trim().slice(0, 24)
            if (!title) return send(400, { error: 'a record needs a name' })
            const item = {
              id:   `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              name: String(body.name || '').slice(0, 24),
              title,
              cover: ['sunset', 'ocean', 'meadow', 'night', 'plum'].includes(body.cover) ? body.cover : 'sunset',
              at:   Date.now(),
              bpm:  pattern.bpm,
              pattern,
            }
            writeDevJukebox([item, ...items])
            return send(201, {
              item: { id: item.id, name: item.name, title: item.title, cover: item.cover, at: item.at, bpm: item.bpm, url: patternUrl(pattern) },
            })
          }

          send(405, { error: 'method not allowed' })
        } catch (err) {
          send(500, { error: err.message })
        }
      })
    }
  }, {
    // Hui Sin in dev: the real api/huisin.mjs, run inside Vite, with the
    // key from .env.local (Vite doesn't put it in process.env on its own).
    name: 'huisin-api',
    configureServer(server) {
      const env = loadEnv('development', __dirname, '')
      for (const k of ['ELM_API_KEY', 'HUISIN_API_KEY', 'HUISIN_BASE_URL', 'HUISIN_MODEL', 'HUISIN_GATE_MODEL', 'HUISIN_DENY', 'HUISIN_CANARY', 'HUISIN_OFF']) {
        if (env[k] && !process.env[k]) process.env[k] = env[k]
      }
      server.middlewares.use('/api/huisin', async (req, res) => {
        try {
          const { default: handler } = await server.ssrLoadModule('/api/huisin.mjs')
          await handler(req, res)
        } catch (err) {
          if (!res.headersSent) { res.statusCode = 500; res.end(String(err?.message || err)) } else res.end()
        }
      })
    },
  }]
})

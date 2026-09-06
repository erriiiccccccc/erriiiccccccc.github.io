import { defineConfig } from 'vite'
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

function readDevGallery() {
  try { return JSON.parse(readFileSync(DEV_GALLERY_FILE, 'utf8')) }
  catch { return [] }
}

function writeDevGallery(items) {
  if (!existsSync(DEV_GALLERY_DIR)) mkdirSync(DEV_GALLERY_DIR, { recursive: true })
  writeFileSync(DEV_GALLERY_FILE, JSON.stringify(items, null, 2))
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
  }]
})

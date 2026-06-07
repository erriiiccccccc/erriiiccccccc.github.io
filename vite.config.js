import { defineConfig } from 'vite'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { fetchTravelStats } from './scripts/travel-utils.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH   = join(__dirname, 'public', 'travel-stats.json')

export default defineConfig({
  base: './',
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
  }]
})

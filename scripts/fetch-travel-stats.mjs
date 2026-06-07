import { writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { fetchTravelStats } from './travel-utils.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH  = join(__dirname, '..', 'public', 'travel-stats.json')

fetchTravelStats()
  .then(stats => {
    writeFileSync(OUT_PATH, JSON.stringify(stats, null, 2))
    console.log(`[travel-stats] Written to ${OUT_PATH}`)
  })
  .catch(err => {
    console.error('[travel-stats] Error:', err.message)
    if (!existsSync(OUT_PATH)) {
      writeFileSync(OUT_PATH, JSON.stringify({
        countries: null, countriesList: [], landmarks: null, worldPct: null,
        updatedAt: null, error: err.message
      }, null, 2))
    }
    process.exit(0) // don't fail the build
  })

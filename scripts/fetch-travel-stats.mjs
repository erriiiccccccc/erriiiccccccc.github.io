import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { fetchTravelStats } from './travel-utils.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH  = join(__dirname, '..', 'public', 'travel-stats.json')

// Don't hammer Google's KML on every dev restart. If we already have fresh data
// (< 12h old, and with the new countryData shape), skip the scrape entirely.
// The nightly CI build and the in-app "Reload" button set FORCE_TRAVEL=1 to
// always re-scrape. Delete/age the JSON to force a refresh locally.
const MAX_AGE_MS = 12 * 60 * 60 * 1000
const FORCE = process.env.FORCE_TRAVEL === '1'

if (!FORCE && existsSync(OUT_PATH)) {
  try {
    const cur = JSON.parse(readFileSync(OUT_PATH, 'utf8'))
    const age = cur.updatedAt ? Date.now() - new Date(cur.updatedAt).getTime() : Infinity
    if (cur.countryData && age < MAX_AGE_MS && !cur.error) {
      console.log(`[travel-stats] Fresh (${Math.round(age / 6e4)} min old) — skipping scrape. FORCE_TRAVEL=1 to override.`)
      process.exit(0)
    }
  } catch { /* fall through and re-scrape */ }
}

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

// Vercel serverless function — live travel-stats refresh.
//
// The static travel-stats.json is baked at deploy time, so the in-app "Reload"
// button had nothing fresh to read between deploys. This endpoint re-runs the
// KML scrape on demand (same code path as the dev Vite middleware), so Reload
// actually picks up newly pinned countries without waiting for a rebuild.
//
// vendorFlags:false because the serverless filesystem is read-only — flags for
// known countries already ship in the build; a brand-new country shows as a
// plain chip until the next deploy vendors its SVG.
import { fetchTravelStats } from '../scripts/travel-utils.mjs'

export const config = { maxDuration: 30 }

export default async function handler(req, res) {
  try {
    const stats = await fetchTravelStats({ vendorFlags: false })
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).send(JSON.stringify(stats))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

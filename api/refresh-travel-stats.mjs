// Vercel serverless function — live travel-stats refresh.
//
// Re-runs the KML scrape on demand (same code path as the dev Vite middleware).
// The response is cached on Vercel's edge network (s-maxage), which makes it a
// shared store: normal page loads hit this endpoint too, so once anyone (or
// anything) triggers a scrape, every visitor worldwide sees that data for the
// next 10 minutes — no more reverting to the deploy-time JSON on tab refresh.
// stale-while-revalidate serves the cached copy instantly while a background
// re-scrape refreshes it, so nobody ever waits on Google's KML.
//
// The in-app Reload button appends ?_=<timestamp> to bust this cache and force
// a genuinely fresh scrape.
import { fetchTravelStats } from '../scripts/travel-utils.mjs'

export const config = { maxDuration: 30 }

export default async function handler(req, res) {
  try {
    const stats = await fetchTravelStats()
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400')
    res.status(200).send(JSON.stringify(stats))
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store') // never cache failures
    res.status(500).json({ error: err.message })
  }
}

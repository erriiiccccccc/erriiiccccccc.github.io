// Vercel serverless function — live travel-stats refresh.
//
// Re-runs the KML scrape on demand (same code path as the dev Vite middleware).
//
// Caching model: the KML scrape itself is the source of truth and is always
// current, so we don't need long-lived storage — we just need page loads to
// hit this endpoint and the cache window to be SHORT. Vercel's edge caches the
// response for 60s (Vercel-CDN-Cache-Control); stale-while-revalidate serves
// the last copy instantly while a background re-scrape refreshes it, so data
// shown to anyone is at most a few minutes old and self-heals on every visit.
// The browser itself gets no-store so a tab refresh always consults the edge.
//
// The in-app Reload button appends ?_=<timestamp> to bust the edge cache for a
// guaranteed-fresh scrape, then re-warms the plain URL so its result becomes
// what every other visitor sees next.
import { fetchTravelStats } from '../scripts/travel-utils.mjs'

export const config = { maxDuration: 30 }

export default async function handler(req, res) {
  try {
    const stats = await fetchTravelStats()
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600')
    res.setHeader('Cache-Control', 'no-store') // browsers: always ask the edge
    res.status(200).send(JSON.stringify(stats))
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store') // never cache failures
    res.status(500).json({ error: err.message })
  }
}

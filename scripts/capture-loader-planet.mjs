// Takes the loading screen's stand-in picture: public/loader-planet.webp.
//
// While world.glb downloads, the loading camera flies toward a picture of the planet; once the real
// planet is ready it takes the picture's place (src/scene/LoaderApproach.js). For that hand-over to be
// invisible the picture has to BE the real planet as the loading view shows it: same pose, same lights,
// the islands still unfound, seen from the exact spot where the camera parks. So it isn't drawn by
// hand. This opens the game with ?loaderShot, lets it load, and the page renders the planet at the
// moment of the hand-over on a transparent background (shootLoaderPlanet in main.js).
//
// Run it again whenever world.glb changes (after `npm run optimize:world`), with `npm run dev` running:
//   npm run capture:loader
//   EW_URL=http://localhost:5179/ npm run capture:loader      # the dev server on another port
import { chromium } from 'playwright'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { stat } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'loader-planet.webp')
const BASE = process.env.EW_URL || 'http://localhost:5173/'

const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--mute-audio'] })
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  page.on('pageerror', e => console.error('page error:', String(e).slice(0, 300)))
  const url = new URL(BASE)
  url.searchParams.set('loaderShot', '1')
  await page.goto(url.href, { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => typeof window.__loaderShot === 'string', null, { timeout: 180000 })
  const dataUrl = await page.evaluate(() => window.__loaderShot)
  if (!dataUrl.startsWith('data:image/png;base64,')) throw new Error('the page did not return a picture (is this the dev server?)')
  const png = Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64')
  const { width, height } = await sharp(png).metadata()
  await sharp(png).webp({ quality: 84, alphaQuality: 90, effort: 6 }).toFile(OUT)
  const { size } = await stat(OUT)
  console.log(`public/loader-planet.webp  ${width}x${height}  ${(size / 1024).toFixed(0)} KB`)
} finally {
  await browser.close()
}

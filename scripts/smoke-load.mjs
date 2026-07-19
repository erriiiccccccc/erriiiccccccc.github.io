/**
 * Smoke test: boot the page, assert loader does not dismiss before 100%/Ready.
 *
 * Usage: npm run smoke
 * Expects a prior `npm run build` (uses vite preview of dist/).
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createServer } from 'node:net'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function getFreePort() {
  return new Promise((resolve, reject) => {
    const s = createServer()
    s.listen(0, '127.0.0.1', () => {
      const { port } = s.address()
      s.close(() => resolve(port))
    })
    s.on('error', reject)
  })
}

async function waitForServer(url, attempts = 80) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url)
      if (res.ok || res.status === 304) return
    } catch { /* retry */ }
    await sleep(500)
  }
  throw new Error('Preview server did not start: ' + url)
}

const PORT = await getFreePort()
const BASE = `http://127.0.0.1:${PORT}/`

const preview = spawn(
  'npx',
  ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
  { stdio: 'inherit', shell: true, cwd: root },
)

let failed = false
try {
  await waitForServer(BASE)
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(BASE + '?perf=1', { waitUntil: 'domcontentloaded', timeout: 120_000 })

  const deadline = Date.now() + 180_000
  let ready = false
  while (Date.now() < deadline) {
    const state = await page.evaluate(() => {
      const loader = document.getElementById('loader')
      const pct = document.getElementById('ldr-pct')?.textContent || '0%'
      const n = parseInt(pct, 10) || 0
      const gone = !loader || loader.style.display === 'none' || loader.classList.contains('fade-out')
      const retry = !!document.getElementById('ldr-retry')
      const owned = !!window.__PHF_LOAD_OWNED__
      return { n, gone, retry, owned, label: document.getElementById('ldr-label')?.textContent }
    })

    if (state.retry) {
      console.error('Fatal / retry UI shown:', state.label)
      failed = true
      break
    }

    if (state.gone && state.n < 100) {
      console.error('Loader dismissed before 100%:', state)
      failed = true
      break
    }

    if (state.gone && state.n >= 100) {
      ready = true
      console.log('Loader dismissed at 100% — OK')
      break
    }
    await sleep(400)
  }

  if (!ready && !failed) {
    console.error('Timed out waiting for loader dismiss')
    failed = true
  }

  if (!failed) {
    const owned = await page.evaluate(() => !!window.__PHF_LOAD_OWNED__)
    if (!owned) {
      console.error('LoadDirector never took ownership')
      failed = true
    }
  }

  await browser.close()
} catch (err) {
  console.error(err)
  failed = true
} finally {
  try { preview.kill('SIGTERM') } catch { /* */ }
}

if (failed) {
  console.error('SMOKE FAILED')
  process.exit(1)
}
console.log('SMOKE OK')
process.exit(0)

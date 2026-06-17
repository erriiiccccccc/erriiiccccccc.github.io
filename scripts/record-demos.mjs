// Project demo recorder — opens a URL in a real browser, runs a smooth scripted
// "tour" (eased scroll + an animated fake cursor for clicks), and records a
// 16:10 webm that drops straight into the Projects media stage, plus a poster.
//
// Usage:
//   node scripts/record-demos.mjs                  # record every shot in SHOTS
//   node scripts/record-demos.mjs foundtech        # record one shot by slug
//   node scripts/record-demos.mjs --url https://x.com --slug myproj   # ad-hoc
//
// Output: public/projects/<slug>.webm  (+ <slug>.jpg poster). The media stage
// already auto-loads these. A bundled ffmpeg (@ffmpeg-installer/ffmpeg) trims
// the black page-load lead-in off the front and re-encodes to VP9 so the very
// first frame is the loaded site.
//
// Requires (dev only):
//   npm i -D playwright @ffmpeg-installer/ffmpeg && npx playwright install chromium
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir, rename, rm, copyFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import ffmpeg from '@ffmpeg-installer/ffmpeg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'projects')
const W = 1920, H = 1200   // 16:10 — matches the .pj-stage aspect ratio, recorded crisp

// ── Shot list ────────────────────────────────────────────────────────────────
// { slug, url, steps? }. With no steps it runs the default tour() below. Add
// your other site projects here so `npm run record` regenerates them all.
const SHOTS = [
  { slug: 'foundtech',      url: 'https://foundtech.com.my' },
  { slug: 'petaling-utama', url: 'https://pumwebsite.vercel.app/' },
  { slug: 'medmatch',       url: 'https://www.medmatch.institute/' },
  { slug: 'ygo',            url: 'https://ygowebsite.vercel.app/' },
  { slug: 'sotwds',         url: 'https://sotwds.vercel.app/' },
  // { slug: 'erics-world',  url: 'http://localhost:5174' },
]

// Default tour for a site we don't have selectors for. Rather than one long
// sweep to the bottom (which flies past everything), we hold on the hero, then
// step section-by-section — ease to the next real section boundary, pause so it
// reads, repeat — down to the footer, then hold. The "where to stop" is decided
// live from the page's own layout (see window.__demo.stops below).
const tour = () => ([
  { wait: 2800 },                            // hero gets a longer beat — it's the strong point
  { paginate: { firstDwell: 2400, dwell: 1300, dur: 2000 } }, // 1st section lingers; dur = slow, smooth glide
  { wait: 1300 },                            // hold on the footer before the loop restarts
])

// ── Injected page helpers: fake cursor + eased scroll, hidden scrollbars ──────
const INIT = `
(() => {
  if (window.__demoReady) return; window.__demoReady = true;
  const ease = t => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;  // easeInOutQuad
  function build(){
    if (document.getElementById('__demo_cursor')) return;
    const css = document.createElement('style');
    css.textContent = \`
      ::-webkit-scrollbar{width:0 !important;height:0 !important}
      html{scrollbar-width:none !important}
      #__demo_cursor,#__demo_ring{position:fixed;left:0;top:0;pointer-events:none;z-index:2147483647}
      #__demo_cursor{width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;opacity:0;
        background:radial-gradient(circle at 34% 30%,#fff,#dcdcdc 55%,#9b9b9b);
        box-shadow:0 2px 7px rgba(0,0,0,.5),0 0 0 2px rgba(255,255,255,.22);
        transition:opacity .25s ease, transform .12s ease}
      #__demo_cursor.__down{transform:scale(.82)}
      #__demo_ring{width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;
        border:2px solid rgba(255,255,255,.9);opacity:0}
    \`;
    document.documentElement.appendChild(css);
    const cur = document.createElement('div'); cur.id = '__demo_cursor';
    const ring = document.createElement('div'); ring.id = '__demo_ring';
    document.documentElement.appendChild(cur);
    document.documentElement.appendChild(ring);
    let x = innerWidth/2, y = innerHeight*0.4;
    const draw = () => { cur.style.left=x+'px'; cur.style.top=y+'px'; ring.style.left=x+'px'; ring.style.top=y+'px'; };
    draw();
    const anim = (fn, dur) => new Promise(res => {
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - t0) / dur);
        fn(ease(p));
        if (p < 1) requestAnimationFrame(tick); else res();
      };
      requestAnimationFrame(tick);
    });
    window.__demo = {
      cursorTo(nx, ny, dur){
        cur.style.opacity = 1;
        const sx = x, sy = y;
        return anim(p => { x = sx+(nx-sx)*p; y = sy+(ny-sy)*p; draw(); }, dur || 600);
      },
      click(){
        cur.classList.add('__down');
        ring.style.transition = 'none'; ring.style.opacity = '.9'; ring.style.transform = 'scale(1)';
        requestAnimationFrame(() => {
          ring.style.transition = 'transform .45s ease, opacity .45s ease';
          ring.style.transform = 'scale(2.6)'; ring.style.opacity = '0';
        });
        setTimeout(() => cur.classList.remove('__down'), 160);
        return new Promise(r => setTimeout(r, 180));
      },
      scrollTo(ty, dur){
        const sy = window.scrollY, dy = ty - sy;
        return anim(p => window.scrollTo(0, sy + dy*p), dur || 2000);
      },
      scrollBottom(dur){
        const ty = document.documentElement.scrollHeight - innerHeight;
        return this.scrollTo(ty, dur || 5000);
      },
      // Decide the natural "stops" to pause at while scrolling down. We prefer
      // the page's real section boundaries (section/header/footer/major blocks);
      // if a section is taller than the viewport we also drop in viewport-sized
      // stops inside it so nothing tall gets skipped. Returns sorted scrollY
      // offsets, deduped so two stops are never closer than ~70% of a screen.
      stops(){
        const vh = innerHeight;
        const max = Math.max(0, document.documentElement.scrollHeight - vh);
        const gap = vh * 0.7;
        const blocks = [...document.querySelectorAll(
          'section, header, footer, main > *, [data-section], .section'
        )];
        let ys = [0];
        for (const el of blocks){
          const r = el.getBoundingClientRect();
          const top = Math.round(r.top + window.scrollY);
          if (top < 0 || top > max) continue;
          ys.push(top);
          // tall block: add interior viewport stops so we don't fly past content
          if (r.height > vh * 1.4){
            for (let y = top + vh; y < top + r.height - vh * 0.5 && y < max; y += vh) ys.push(Math.round(y));
          }
        }
        ys.push(max);
        ys = [...new Set(ys)].sort((a, b) => a - b);
        const out = [];
        for (const y of ys) if (!out.length || y - out[out.length - 1] >= gap) out.push(y);
        if (out[out.length - 1] < max - 8) out.push(max);
        return out;
      },
    };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
`

// ── Step interpreter (Node side) ─────────────────────────────────────────────
async function moveTo(page, target, dur){
  let x, y
  if (Array.isArray(target)) { [x, y] = target }
  else {
    const el = await page.$(target)
    if (!el) { console.warn('   (skip move, no element: ' + target + ')'); return null }
    const b = await el.boundingBox()
    if (!b) return null
    x = b.x + b.width / 2; y = b.y + b.height / 2
  }
  await page.evaluate(([x, y, d]) => window.__demo.cursorTo(x, y, d), [x, y, dur])
  return { x, y }
}

async function runStep(page, s){
  if (s.wait != null)         return page.waitForTimeout(s.wait)
  if (s.paginate){
    const { dwell = 1300, dur = 1100, firstDwell = dwell } = s.paginate
    const stops = await page.evaluate(() => window.__demo.stops())
    // stops[0] is the hero (already showing) — ease to each one after it. The
    // first section below the hero gets `firstDwell`, the rest get `dwell`.
    for (let i = 1; i < stops.length; i++){
      await page.evaluate(([y, d]) => window.__demo.scrollTo(y, d), [stops[i], dur])
      await page.waitForTimeout(i === 1 ? firstDwell : dwell)
    }
    return
  }
  if (s.scrollBottom != null) return page.evaluate(d => window.__demo.scrollBottom(d), s.scrollBottom)
  if (s.scrollTop != null)    return page.evaluate(d => window.__demo.scrollTo(0, d), s.scrollTop)
  if (s.scrollTo != null)     return page.evaluate(([y, d]) => window.__demo.scrollTo(y, d), [s.scrollTo, s.dur || 2000])
  if (s.move)                 return moveTo(page, s.move, s.dur || 700)
  if (s.hover)                return moveTo(page, s.hover, s.dur || 700)
  if (s.click){
    const xy = await moveTo(page, s.click, s.dur || 700)
    if (xy){ await page.evaluate(() => window.__demo.click()); await page.mouse.click(xy.x, xy.y) }
    return
  }
}

// ── ffmpeg: trim the black load-in off the front + re-encode VP9 ──────────────
// `leadSec` = how long the page spent loading (blank/black) before the tour
// began. We cut that so the very first frame is the loaded site.
async function optimize(src, dest, leadSec = 0){
  const ss = Math.max(0, leadSec - 0.15)   // small safety margin so we don't clip content
  const args = ['-y']
  if (ss > 0.05) args.push('-ss', ss.toFixed(2))
  args.push('-i', src,
    '-an',                          // no audio
    '-c:v', 'libvpx-vp9',
    '-crf', '33', '-b:v', '0',      // constant-quality; web-light but still sharp
    '-vf', 'scale=1280:-2',         // capture is 1920 for sharpness, deliver at 1280 (stage is ~700px)
    '-pix_fmt', 'yuv420p',
    '-deadline', 'good', '-cpu-used', '2',
    dest)
  const r = spawnSync(ffmpeg.path, args, { stdio: 'ignore' })
  if (r.status === 0){ await rm(src, { force: true }); return ' (vp9, trimmed ' + ss.toFixed(1) + 's)' }
  // Fallback: ffmpeg failed for some reason — keep the raw webm.
  await rename(src, dest).catch(async () => { await copyFile(src, dest); await rm(src, { force: true }) })
  return ' (raw — ffmpeg failed)'
}

// ── Record one shot ──────────────────────────────────────────────────────────
async function record(shot){
  const { slug, url } = shot
  const tmp = join(OUT, '.rec-' + slug)
  await mkdir(tmp, { recursive: true })

  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
    recordVideo: { dir: tmp, size: { width: W, height: H } },
  })
  await ctx.addInitScript(INIT)
  // Video recording starts the instant this page exists — everything before the
  // site paints is black. We timestamp here and trim that lead-in afterward.
  const t0 = Date.now()
  const page = await ctx.newPage()

  console.log('→ ' + slug + '  ' + url)
  try { await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }) }
  catch { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {}) }
  await page.waitForTimeout(800)

  // Poster from the top of the page — JPEG so it stays web-light
  await page.screenshot({ path: join(OUT, slug + '.jpg'), type: 'jpeg', quality: 82 }).catch(() => {})

  // Page is loaded + settled here, so this is the black-lead-in duration.
  const leadSec = (Date.now() - t0) / 1000

  for (const s of (shot.steps || tour())) await runStep(page, s)

  const video = page.video()
  await ctx.close()       // finalizes the recording
  await browser.close()

  const src = await video.path()
  const dest = join(OUT, slug + '.webm')
  const note = await optimize(src, dest, leadSec)
  await rm(tmp, { recursive: true, force: true })
  console.log('   ✓ ' + dest + note)
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2)
let shots = SHOTS
const ui = argv.indexOf('--url')
if (ui >= 0){
  const url = argv[ui + 1]
  const si = argv.indexOf('--slug')
  const slug = si >= 0 ? argv[si + 1] : 'demo'
  shots = [{ slug, url }]
} else if (argv[0] && !argv[0].startsWith('--')){
  shots = SHOTS.filter(s => s.slug === argv[0])
  if (!shots.length){ console.error('No shot named "' + argv[0] + '" in SHOTS.'); process.exit(1) }
}

await mkdir(OUT, { recursive: true })
for (const s of shots) await record(s)
console.log('Done.')

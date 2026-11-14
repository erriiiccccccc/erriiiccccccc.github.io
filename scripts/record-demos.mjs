// Project demo recorder. Opens a URL in a real browser, runs a smooth scripted
// "tour" (eased scroll + an animated fake cursor for clicks) and writes the
// media the Mountain Game Hub plays:
//
//   public/projects/<slug>.webm        1920 wide: the full-panel demo
//   public/projects/<slug>-sm.webm     1280 wide: phones and small windows
//   public/projects/<slug>.jpg         the poster: the video's own first frame
//   public/projects/<slug>-thumb.jpg   480 wide: the tiles and the list
//
// How it keeps the picture clean
//   A browser's built-in recorder compresses hard while it records (about
//   1 Mbit/s, in real time), and no later encode can put back what that threw
//   away. So this takes the frames straight from the browser instead, nearly
//   lossless and each with its real timestamp, and encodes them ONCE, at the
//   size they're shown, at constant quality instead of under a bitrate cap.
//   Colour is converted properly too (the frames are full-range BT.601, the
//   video is tagged BT.709), so nothing shifts between the poster and the video.
//
// Usage:
//   node scripts/record-demos.mjs                  # record every site in SHOTS
//   node scripts/record-demos.mjs foundtech        # record one shot by slug
//   node scripts/record-demos.mjs --url https://x.com --slug myproj   # ad-hoc
//   EW_URL=http://localhost:5173/ node scripts/record-demos.mjs erics-world
//                                                  # the game itself, from `npm run dev`
//
// Requires (dev only):
//   npm i -D playwright @ffmpeg-installer/ffmpeg && npx playwright install chromium
// A newer ffmpeg on the PATH is used when there is one (it encodes much faster).
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir, rm, writeFile, stat, link } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import bundled from '@ffmpeg-installer/ffmpeg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'projects')
const W = 1920, H = 1200   // 16:10, the shape of the Game Hub's stage
const FPS = 30
const FFMPEG = process.env.FFMPEG || (spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status === 0 ? 'ffmpeg' : bundled.path)

// ── Shot list ────────────────────────────────────────────────────────────────
// { slug, url, steps?, ready?, plain? }. With no steps it runs the default tour()
// below. Add your other site projects here so `npm run record` regenerates them all.

// Eric's World is a game, not a page to scroll: wait for the world, close the
// intro, then walk about and dive onto the Pirate Ship. It needs the dev server
// (npm run dev), because the __ew hook only exists there.
async function gameReady(page){
  await page.waitForFunction(() => !!window.__ew && document.getElementById('intro-close')?.closest('.is-open'), null, { timeout: 180000 })
  await page.waitForTimeout(800)
  await page.evaluate(() => document.getElementById('intro-close').click())
  await page.waitForTimeout(1500)
  await page.evaluate(() => { const b = document.getElementById('intro-close'); if (b?.closest('.is-open')) b.click() })
  await page.waitForTimeout(3500)
}
const GAME_TOUR = [
  { wait: 900 }, { hold: 'd', ms: 2600 }, { wait: 500 }, { hold: 'w', ms: 2400 }, { wait: 400 }, { hold: 'a', ms: 2200 }, { wait: 700 },
  { run: "__ew.dive('pirate_ship')" }, { wait: 5200 }, { press: 'Escape' }, { wait: 1800 },
]

const SHOTS = [
  { slug: 'foundtech',      url: 'https://foundtech.com.my' },
  { slug: 'petaling-utama', url: 'https://pumwebsite.vercel.app/' },
  { slug: 'medmatch',       url: 'https://www.medmatch.institute/' },
  { slug: 'ygo',            url: 'https://ygowebsite.vercel.app/' },
  { slug: 'sotwds',         url: 'https://sotwds.vercel.app/' },
  // only recorded when asked for by name, or when EW_URL says where the dev server is
  { slug: 'erics-world',    url: process.env.EW_URL || 'http://localhost:5173/', ready: gameReady, steps: GAME_TOUR, plain: true, local: true },
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
  if (s.hold){ await page.keyboard.down(s.hold); await page.waitForTimeout(s.ms || 1000); return page.keyboard.up(s.hold) }
  if (s.press)                return page.keyboard.press(s.press)
  if (s.run)                  return page.evaluate(s.run)          // a line of page JS, for apps with their own hooks
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

// ── ffmpeg: the frames become the four files ─────────────────────────────────
function ff(args, cwd){
  const r = spawnSync(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { cwd, encoding: 'utf8' })
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + (r.stderr || r.error?.message || '').trim().split('\n').slice(-3).join(' | '))
}
// One pass at constant quality (no bitrate cap), long keyframe interval for a loop that's mostly easing.
const vp9 = (crf) => ['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', String(crf), '-g', String(FPS * 10), '-row-mt', '1', '-tile-columns', '2', '-deadline', 'good', '-cpu-used', '2', '-an',
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv']
// JPEG frames are full-range BT.601; video wants limited-range BT.709. Lanczos keeps text edges crisp when scaling.
const fit = (w) => `scale=${w}:-2:flags=lanczos:in_color_matrix=bt601:in_range=pc:out_color_matrix=bt709:out_range=tv,format=yuv420p`
const kb = async (f) => Math.round((await stat(f)).size / 1024)

// ── Record one shot ──────────────────────────────────────────────────────────
async function record(shot){
  const { slug, url } = shot
  const tmp = join(OUT, '.rec-' + slug)
  await rm(tmp, { recursive: true, force: true })
  await mkdir(tmp, { recursive: true })

  const gpu = process.platform === 'win32' ? ['--use-angle=d3d11'] : []
  const browser = await chromium.launch({ args: [...gpu, '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--mute-audio'] })
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, colorScheme: 'dark' })
  if (!shot.plain) await ctx.addInitScript(INIT)
  const page = await ctx.newPage()

  console.log('→ ' + slug + '  ' + url)
  if (shot.plain) await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
  else {
    try { await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }) }
    catch { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {}) }
  }
  if (shot.ready) await shot.ready(page); else await page.waitForTimeout(800)

  // Frames straight from the browser, each with the moment it was drawn. A new one arrives only when
  // the picture changes, so a held shot is one frame with a long duration, not thirty copies.
  const cdp = await ctx.newCDPSession(page)
  const frames = [], writes = []
  let lastAt = Date.now()
  cdp.on('Page.screencastFrame', (f) => {
    lastAt = Date.now()
    const file = 'f' + String(frames.length).padStart(5, '0') + '.jpg'
    frames.push({ t: f.metadata.timestamp, file })
    writes.push(writeFile(join(tmp, file), Buffer.from(f.data, 'base64')))
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {})
  })
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 96, maxWidth: W, maxHeight: H, everyNthFrame: 1 })

  // Let the page finish arriving (hero fades, late images) before the take begins: wait until the picture
  // has held still for a moment. The video, and so the poster, starts on that settled picture.
  if (!shot.plain){
    const giveUp = Date.now() + 6000
    await page.waitForTimeout(800)
    while (Date.now() < giveUp && Date.now() - lastAt < 700) await page.waitForTimeout(100)
  }
  const first = Math.max(0, frames.length - 1)
  const tStart = Date.now() / 1000
  for (const s of (shot.steps || tour())) await runStep(page, s)
  const tEnd = Date.now() / 1000
  await cdp.send('Page.stopScreencast').catch(() => {})
  await Promise.all(writes)
  await ctx.close()
  await browser.close()

  const take = frames.slice(first).filter(f => f.t <= tEnd)
  if (take.length < 2){
    // the picture never changed: the site is down, under maintenance, or not a page that scrolls
    await rm(tmp, { recursive: true, force: true })
    console.warn('   ✗ skipped ' + slug + ': the page never moved (is the site down or under maintenance?). The files already there are kept.')
    return
  }
  // Each frame was on screen from the moment it was drawn until the next one. Lay them out on an exact
  // 30-a-second grid (a link per tick, no copies), so the pace of the video is the pace of the take.
  const at = (f) => Math.min(tEnd, Math.max(tStart, f.t))
  const ticks = Math.max(2, Math.round((tEnd - tStart) * FPS))
  for (let k = 0, i = 0; k < ticks; k++){
    const t = tStart + k / FPS
    while (i + 1 < take.length && at(take[i + 1]) <= t) i++
    await link(join(tmp, take[i].file), join(tmp, 'o' + String(k).padStart(5, '0') + '.jpg'))
  }
  console.log(`   ${take.length} frames drawn in ${(tEnd - tStart).toFixed(1)}s, encoding…`)

  const out = (name) => join(OUT, slug + name)
  const src = ['-framerate', String(FPS), '-i', 'o%05d.jpg']
  ff([...src, '-vf', fit(1920), ...vp9(31), out('.webm')], tmp)
  ff([...src, '-vf', fit(1280), ...vp9(33), out('-sm.webm')], tmp)
  ff(['-i', take[0].file, '-q:v', '3', out('.jpg')], tmp)
  ff(['-i', take[0].file, '-vf', 'scale=480:-2:flags=lanczos', '-q:v', '4', out('-thumb.jpg')], tmp)
  await rm(tmp, { recursive: true, force: true })
  console.log(`   ✓ ${slug}.webm ${await kb(out('.webm'))} KB · -sm.webm ${await kb(out('-sm.webm'))} KB · .jpg ${await kb(out('.jpg'))} KB · -thumb.jpg ${await kb(out('-thumb.jpg'))} KB`)
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2)
let shots = SHOTS.filter(s => !s.local || process.env.EW_URL)
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

# Eric's World

Interactive 3D portfolio — walk around a tiny planet and explore my work.

**Live:** [erriiiccccccc.github.io](https://erriiiccccccc.github.io)

## Stack

| Tool | Role |
|------|------|
| [Three.js](https://threejs.org) | 3D scene, planet, character, lighting |
| [Vite](https://vitejs.dev) | Dev server + bundler |
| [GSAP](https://gsap.com) | UI transitions |
| GitHub Actions | Auto-deploy to GitHub Pages on every push + daily rebuild |

## How it works

A 3D planet you walk around. WASD rotates the planet beneath a fixed character. Six islands sit around the equator — walk to one, wait for the ring to glow, then press **E** (or tap on mobile) to open that portfolio section.

Meadow Island also has a telescope with a floating marker over it. Stand near it and press **F** (or tap the gold prompt) to open the Doodle Wall: a shared collage anyone can draw on.

## Dev

```bash
npm install
npm run dev      # Vite dev server + fetches travel stats
npm run build    # Production build → ./dist
npm run preview  # Preview the dist build locally
```

## The Doodle Wall

Drawings are stored in [Vercel Blob](https://vercel.com/docs/vercel-blob) behind `api/gallery.mjs`.
There is no database: each drawing's author and timestamp are encoded in its own blob
pathname (`doodles/art/<id>__<base64url name>.png`), so listing the wall is one `list()` call.
Reports are separate blobs under `doodles/flags/`; two flags and a drawing stops being listed.

To turn it on:

1. Vercel dashboard → Storage → create a **Blob** store and connect it to this project.
   That injects `BLOB_READ_WRITE_TOKEN` automatically. Nothing else to configure.
2. Redeploy.

Without the token the endpoint returns `501` and the client falls back to a browser-local
wall, so the feature still works but drawings stay on that one device. `npm run dev` uses a
local stand-in (a Vite middleware backed by a gitignored `.gallery-dev/index.json`), so the
whole flow is testable without a Blob store.

The GitHub Pages mirror has no serverless functions, so it calls the Vercel origin
(`https://ericng.my/api/gallery`) cross-site. `api/gallery.mjs` sends the CORS headers for that.

## Project structure

```
src/
  main.js                 entry point — render loop, scene wiring, game state
  character/              character mesh, walk animation, keyboard + touch controls
  scene/                  starfield, shooting stars, lighting, camera modes
  ui/                     island popup, detail panel, map/help/settings overlays
                          plus the Doodle Wall + drawing pad
  gallery/galleryApi.js   doodle wall client (Vercel Blob, localStorage fallback)
  travel/                 travel stats widget (visits fetched from Google Maps KML)
  data/content.js         island metadata + all portfolio HTML content
  styles/overlay.css      all UI styles (glassmorphism panels, HUD, loader)
public/
  world.glb               planet 3D model
  locomotion/             character FBX animations (13 clips) + GLB model
api/
  gallery.mjs             doodle wall: list / post / report (Vercel Blob)
  refresh-travel-stats.mjs
scripts/
  fetch-travel-stats.mjs  fetches visited-country data from Google Maps at build time
  travel-utils.mjs        KML parser + point-in-polygon geo helpers
.github/workflows/
  deploy.yml              CI/CD — build + deploy to gh-pages branch
legacy/                   archived old portfolio (flat HTML, do not touch)
```

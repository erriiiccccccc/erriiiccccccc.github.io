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

## Dev

```bash
npm install
npm run dev      # Vite dev server + fetches travel stats
npm run build    # Production build → ./dist
npm run preview  # Preview the dist build locally
```

## Project structure

```
src/
  main.js                 entry point — render loop, scene wiring, game state
  character/              character mesh, walk animation, keyboard + touch controls
  scene/                  starfield, shooting stars, lighting, camera modes
  ui/                     island popup, detail panel, map/help/settings overlays
  travel/                 travel stats widget (visits fetched from Google Maps KML)
  data/content.js         island metadata + all portfolio HTML content
  styles/overlay.css      all UI styles (glassmorphism panels, HUD, loader)
public/
  world.glb               planet 3D model
  locomotion/             character FBX animations (13 clips) + GLB model
scripts/
  fetch-travel-stats.mjs  fetches visited-country data from Google Maps at build time
  travel-utils.mjs        KML parser + point-in-polygon geo helpers
.github/workflows/
  deploy.yml              CI/CD — build + deploy to gh-pages branch
legacy/                   archived old portfolio (flat HTML, do not touch)
```

// Drawn covers for the projects that have no recorded demo. Each is a small
// moving scene made of plain elements, sized in container units so the same
// markup fills the whole hub or a rail tile:
//
//   mosaic    Ada Hack: a wall of Rubik's-cube stickers, flipping colour in waves
//   logs      ELK: a log stream scrolling under a pulsing histogram
//   viewport  Blender: the default cube, selected, turning over the grid floor
//
// `still` drops the motion (rail tiles, the list, reduced motion).

// Small deterministic random, so a cover looks the same on every open.
function rng(seed) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

function mosaic() {
  const cols = 12, rows = 8, r = rng(22)
  const C = ['#ffffff', '#ffd500', '#ff5800', '#c41e3a', '#0051ba', '#009e60']
  let cells = ''
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const a = C[Math.floor(r() * 6)], b = C[Math.floor(r() * 6)]
    cells += `<i style="--a:${a};--b:${b};--d:${((x + y) * 0.14 + r() * 0.5).toFixed(2)}s"></i>`
  }
  return `<div class="cv-mosaic">${cells}</div>`
}

function logs() {
  const r = rng(7)
  const kinds = ['', '', '', '', ' cv-l--info', ' cv-l--info', ' cv-l--warn', ' cv-l--err']
  let lines = ''
  for (let i = 0; i < 16; i++) lines += `<i class="cv-l${kinds[Math.floor(r() * kinds.length)]}" style="--w:${Math.round(34 + r() * 62)}%"></i>`
  let bars = ''
  for (let i = 0; i < 18; i++) bars += `<i style="--h:${Math.round(22 + r() * 76)}%;--d:${(r() * 2.4).toFixed(2)}s"></i>`
  // the lines run twice so the scroll loops without a seam
  return `<div class="cv-dash"><div class="cv-bars">${bars}</div><div class="cv-stream"><div class="cv-stream-run">${lines}${lines}</div></div></div>`
}

function viewport() {
  return `<div class="cv-floor"></div><div class="cv-scene"><div class="cv-cube"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`
}

const SCENES = { mosaic, logs, viewport }

/** A cover as an HTML string. `still` = no motion. */
export function coverHtml(kind, { still = false } = {}) {
  const scene = SCENES[kind]
  if (!scene) return ''
  return `<div class="cv cv--${kind}${still ? ' is-still' : ''}" aria-hidden="true">${scene()}</div>`
}

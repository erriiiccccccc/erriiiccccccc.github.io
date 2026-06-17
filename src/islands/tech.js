// Tech Stack island — full-colour brand logos, always lit, grouped into
// categories that show range (languages → web → data/AI → infra → robotics →
// fabrication → ways of working). Logos live in public/tech/<k>.svg. Items
// without a clean brand mark fall back to a lettered monogram tile. `inv`
// inverts dark/monochrome marks so they read white on the dark glass.
//
// Layout: the panel is widened (variant 'tech') and chips are a fixed width laid
// out with flex-wrap, so even the largest category fits on a single row on
// desktop — no orphan "one logo on a second row". scrollama reveals each
// category (with a per-chip stagger) as it scrolls into the panel.

import scrollama from 'scrollama'

const BASE = import.meta.env.BASE_URL || '/'

// k = logo filename (public/tech/<k>.svg) · n = name · m = monogram (no logo)
// inv = invert a dark/monochrome mark to white
const GROUPS = [
  {
    label: 'Languages',
    items: [
      { k: 'python', n: 'Python' },
      { k: 'java', n: 'Java' },
      { k: 'c', n: 'C' },
      { k: 'cpp', n: 'C++' },
      { k: 'csharp', n: 'C#' },
      { k: 'javascript', n: 'JavaScript' },
      { k: 'typescript', n: 'TypeScript' },
      { k: 'haskell', n: 'Haskell' },
      { k: 'bash', n: 'Bash' },
      { m: 'MIPS', n: 'MIPS Assembly' },
    ],
  },
  {
    label: 'Frontend & Creative Web',
    items: [
      { k: 'react', n: 'React' },
      { k: 'nodejs', n: 'Node.js' },
      { k: 'express', n: 'Express', inv: true },
      { k: 'flask', n: 'Flask', inv: true },
      { m: 'JSP', n: 'JSP' },
      { k: 'html5', n: 'HTML5' },
      { k: 'css3', n: 'CSS3' },
      { k: 'threejs', n: 'Three.js' },
      { k: 'd3', n: 'D3.js' },
      { k: 'gsap', n: 'GSAP', inv: true },
    ],
  },
  {
    label: 'Data & AI',
    items: [
      { k: 'pandas', n: 'pandas' },
      { k: 'numpy', n: 'NumPy' },
      { k: 'matplotlib', n: 'Matplotlib' },
      { k: 'scikitlearn', n: 'scikit-learn' },
      { k: 'pytorch', n: 'PyTorch' },
      { k: 'huggingface', n: 'Hugging Face' },
    ],
  },
  {
    label: 'Search, Databases & Infra',
    items: [
      { k: 'elasticsearch', n: 'Elasticsearch' },
      { k: 'kibana', n: 'Kibana' },
      { k: 'logstash', n: 'Logstash', inv: true },
      { k: 'postgresql', n: 'PostgreSQL' },
      { k: 'mysql', n: 'MySQL' },
      { k: 'oracle', n: 'Oracle DB' },
      { k: 'docker', n: 'Docker' },
      { k: 'kubernetes', n: 'Kubernetes' },
      { k: 'linux', n: 'Linux' },
      { k: 'nginx', n: 'Nginx' },
      { k: 'git', n: 'Git' },
    ],
  },
  {
    label: 'Robotics & Hardware',
    items: [
      { k: 'ros', n: 'ROS 2', inv: true },
      { m: 'TB', n: 'TurtleBot' },
      { k: 'raspberrypi', n: 'Raspberry Pi' },
      { k: 'arduino', n: 'Arduino' },
    ],
  },
  {
    label: '3D, CAD & Fabrication',
    items: [
      { k: 'blender', n: 'Blender' },
      { k: 'unity', n: 'Unity', inv: true },
      { m: 'F360', n: 'Fusion 360' },
      { k: 'openscad', n: 'OpenSCAD', inv: true },
      { m: 'BL', n: 'Bambu Lab' },
      { m: 'UM', n: 'Ultimaker' },
      { m: 'xT', n: 'xTool' },
    ],
  },
  {
    label: 'Tools & Ways of Working',
    items: [
      { k: 'postman', n: 'Postman' },
      { k: 'jira', n: 'Jira' },
      { k: 'confluence', n: 'Confluence' },
      { k: 'figma', n: 'Figma' },
      { m: 'SAFe', n: 'SAFe Agile' },
      { m: 'MOS', n: 'MOS Certified' },
    ],
  },
]

function chip(it, i) {
  const visual = it.k
    ? `<span class="tech-logo"><img src="${BASE}tech/${it.k}.svg" alt="" loading="lazy" width="36" height="36" draggable="false"></span>`
    : `<span class="tech-logo tech-mono">${it.m}</span>`
  // --i drives the per-chip stagger delay when its group reveals
  return `
    <figure class="tech-chip${it.inv ? ' tech-chip--invert' : ''}" style="--i:${i}">
      ${visual}
      <figcaption class="tech-name">${it.n}</figcaption>
    </figure>`
}

export const TECH_HTML = `
  <div class="tech-layout">
    <aside class="tech-photo" style="background-image:url('${BASE}islandphoto/arcticislandphoto.jpeg')">
      <div class="tech-photo-cap">
        <span class="tech-photo-eyebrow">Field notes</span>
        <span class="tech-photo-line">Out on the glacier</span>
      </div>
    </aside>
    <div class="tech-groups">
      ${GROUPS.map(g => `
        <section class="tech-group">
          <h3 class="tech-group-label">
            <span>${g.label}</span>
            <span class="tech-group-count">${g.items.length}</span>
          </h3>
          <div class="tech-grid">${g.items.map(chip).join('')}</div>
        </section>
      `).join('')}
    </div>
  </div>
`

// ── Scroll-driven reveal ───────────────────────────────────────────────────────
// The panel scrolls inside .wp-content (a fixed, centred glass card), so the
// scroller is set up against that. We keep one instance and tear it down on each
// re-open since UI.js re-mounts the panel HTML every time.
let scroller = null

function revealVisible(root) {
  // Belt-and-suspenders: reveal any group already within the scroll viewport,
  // so nothing can stay invisible if scrollama is slow to fire on a tiny scroll.
  const box = root.getBoundingClientRect()
  root.querySelectorAll('.tech-group:not(.is-in)').forEach(g => {
    const r = g.getBoundingClientRect()
    if (r.top < box.bottom - 40 && r.bottom > box.top) g.classList.add('is-in')
  })
}

export function initTech(root) {
  const groups = root.querySelectorAll('.tech-group')
  if (!groups.length) return

  // Reduced motion → show everything immediately, no scroll choreography.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    groups.forEach(g => g.classList.add('is-in'))
    return
  }

  if (scroller) { try { scroller.destroy() } catch (_) {} scroller = null }

  scroller = scrollama()
  scroller
    .setup({ step: '.tech-group', offset: 0.85, once: true })
    .onStepEnter(({ element }) => element.classList.add('is-in'))

  // Reveal what's on screen at open, then let scrollama handle the rest.
  // Two RAFs so the panel's open transition has settled before we measure.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    revealVisible(root)
    scroller && scroller.resize()
  }))

  // Fallback: catch groups scrollama might miss on fast inner scrolls. The
  // logos scroll inside .tech-groups now (full-height photo rail beside them),
  // so listen there too — falling back to root on narrow/stacked layouts.
  const scrollEl = root.querySelector('.tech-groups') || root
  scrollEl.addEventListener('scroll', () => revealVisible(root), { passive: true })
  if (scrollEl !== root) root.addEventListener('scroll', () => revealVisible(root), { passive: true })
}

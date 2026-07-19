// Tech Stack island — full-colour brand logos, always lit, grouped into
// categories. Logos live in public/tech/<k>.svg. `inv` inverts dark marks.
//
// Reveal uses native IntersectionObserver (scrollama was removed — it was only
// driving category fade-ins on scroll, and its setup cost hitching E-to-open).

const BASE = import.meta.env.BASE_URL || '/'

// k = logo filename · n = name · m = monogram · inv = invert mark
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
    ? `<span class="tech-logo"><img src="${BASE}tech/${it.k}.svg" alt="" loading="lazy" decoding="async" width="36" height="36" draggable="false"></span>`
    : `<span class="tech-logo tech-mono">${it.m}</span>`
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

export function initTech(root) {
  const groups = [...root.querySelectorAll('.tech-group')]
  if (!groups.length) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    groups.forEach(g => g.classList.add('is-in'))
    return
  }

  const scrollRoot = root.querySelector('.tech-groups') || root
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      e.target.classList.add('is-in')
      io.unobserve(e.target)
    }
  }, { root: scrollRoot, rootMargin: '0px 0px -8% 0px', threshold: 0.05 })

  requestAnimationFrame(() => {
    const box = scrollRoot.getBoundingClientRect()
    for (const g of groups) {
      const r = g.getBoundingClientRect()
      if (r.top < box.bottom - 24 && r.bottom > box.top) g.classList.add('is-in')
      else io.observe(g)
    }
  })
}

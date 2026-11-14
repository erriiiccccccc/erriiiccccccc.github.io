// Lava Island: Strata. Experience as a cross-section of the island: one layer
// of rock per role, newest on top and still molten, each older one cooled a
// little more. Heat means recency (the years are always written too, so the
// colour never carries the meaning alone). Opening a layer shows its outcome
// line first, in Eric's words, then the detail.
//
//   ↑ ↓         move through time (Home / End jump to now / the oldest)
//   click, tap  open a layer
//   ← →         still hop islands, like everywhere else
//
// The gauge on the left is a thermometer and a depth mark in one: its dot
// rides beside whichever layer is open.
//
// Logos live in public/experience/<file>. Official marks on file: Barclays,
// BlackRock, University of Edinburgh; the rest get a monogram tile.
import { svgIcon } from '../ui/icons.js'
import { sfx } from '../audio/sfx.js'

const BASE = import.meta.env.BASE_URL || '/'
const LINKEDIN = 'https://www.linkedin.com/in/erriiiccccccc/'

// `out` = the outcome line (what I did, what happened). `desc` = the detail under it.
const ROLES = [
  { role: 'AI Audit Technology Analyst', org: 'Barclays', when: 'Since Aug 2026', yr: 'Now', mono: 'B', logo: 'barclays.svg',
    out: 'AI can go wrong in ways that hit real people. I audit how the bank uses it, so it moves forward safely.',
    desc: 'Technology Analyst in Internal Audit, covering cyber and AI. Joined full-time in London after graduating.' },
  { role: 'Full-Stack Developer', org: 'Freelance', when: 'Since 2024, still going', yr: 'Since 2024', mono: 'F',
    out: 'Sites for real clients, from design to deploy: FoundTech, Petaling Utama Motor and more.',
    desc: 'React, Next.js, Node.js and PostgreSQL, shipped on Vercel. Open to new projects.' },
  { role: 'Teaching Assistant', org: 'University of Edinburgh', when: 'Jan to May 2026', yr: '2026', mono: 'UoE', logo: 'uoe.svg',
    out: 'A hands-on technician role: ran the labs for third-year courses on robots, embedded systems and 3D prototyping.',
    desc: 'System Design Project and Mobile Robotics. Made the course materials and mentored student teams until they shipped.' },
  { role: 'Exam Marker', org: 'University of Edinburgh', when: 'Sep 2025 to Jan 2026', yr: '2025 to 26', mono: 'UoE', logo: 'uoe.svg',
    out: 'Marked third-year Informatics Large Practical coursework for the University of Edinburgh.',
    desc: 'Checked every submission for functionality, code quality and correctness.' },
  { role: 'Credit Risk Technology Analyst Intern', org: 'Barclays', when: 'Jun to Sep 2025', yr: '2025', mono: 'B', logo: 'barclays.svg',
    out: '45 minutes to near instant: about 99% of the time saved.',
    desc: 'Built a React and Flask tool on production MSSQL for Wholesale Credit Risk, in Glasgow.' },
  { role: 'AI Coding Trainer', org: 'Outlier', when: 'Nov 2024 to May 2025', yr: '2024 to 25', mono: 'O',
    out: 'Trained AI models to write better code by judging their answers.',
    desc: 'Scored LLM coding answers for correctness, efficiency and reasoning.' },
  { role: 'Technology Spring Intern', org: 'BlackRock', when: 'Apr 2024', yr: '2024', mono: 'BR', logo: 'blackrock.svg',
    out: 'Inside Aladdin, the platform BlackRock runs on.',
    desc: 'A spring internship in Edinburgh: engineering operations, and how very large financial systems are kept running.' },
  { role: 'Marketing Executive', org: 'AMEU', when: '2023 to 2024', yr: '2023 to 24', mono: 'A',
    out: '6,000+ accounts, 120% more engagement, events with major Malaysian banks.',
    desc: 'Media and marketing for the Association of Malaysian Economics Undergraduates.' },
  { role: 'Software Engineer Intern', org: 'Finexus Group', when: 'Jun to Sep 2023', yr: '2023', mono: 'F',
    out: 'Fixed a sanction-screening system and built its log search.',
    desc: 'Java EE and JSP debugging, plus an Elasticsearch pipeline on Oracle Linux. My first company job, in Kuala Lumpur.' },
]
const N = ROLES.length
// molten at the top, cooled basalt at the bottom
const TEMP = ['#FFD27A', '#FFB04E', '#FF8A3A', '#FF6A2A', '#E8501F', '#C8421D', '#A03B20', '#7A3A2C', '#5C3A31']
// the gauge's label beside the open layer: the year that layer reaches
const AT = ['Now', 'Now', '2026', '2026', '2025', '2025', '2024', '2024', '2023']
const glow = (i) => (1 - (i / (N - 1)) * 0.72).toFixed(2)

function layer(r, i) {
  // Real logo when on file; if it 404s the <img> removes itself and the monogram shows.
  const logo = r.logo ? `<img src="${BASE}experience/${r.logo}" alt="" loading="lazy" onerror="this.remove()">` : ''
  return `
    <li class="era" data-i="${i}" style="--temp:${TEMP[i]};--glow:${glow(i)};--k:${i}">
      <h4 class="era-h">
        <button type="button" class="era-head" id="era-h-${i}" aria-expanded="false" aria-controls="era-b-${i}">
          <span class="era-role">${r.role}</span>
          <span class="era-org">${r.org}</span>
          <span class="era-yr">${r.yr}</span>
        </button>
      </h4>
      <div class="era-body" id="era-b-${i}" role="region" aria-labelledby="era-h-${i}" inert>
        <span class="era-tile" aria-hidden="true">${logo}<b>${r.mono}</b></span>
        <div class="era-text">
          <p class="era-out">${r.out}</p>
          <p class="era-desc"><span class="era-when">${r.org} · ${r.when}</span>${r.desc}</p>
        </div>
      </div>
    </li>`
}

export const EXPERIENCE_HTML = `
  <div class="st">
    <div class="st-gauge" aria-hidden="true">
      <span class="st-cap">now</span>
      <div class="st-line"><i class="st-mark"></i><span class="st-mark-y">Now</span></div>
      <span class="st-cap">2023</span>
    </div>
    <ol class="st-stack" aria-label="Experience, newest first">
      ${ROLES.map(layer).join('')}
    </ol>
    <div class="st-foot">
      <a class="st-li" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">${svgIcon('linkedin', 18)}<span>Full history on LinkedIn</span>${svgIcon('external', 15)}</a>
      <p class="st-keys" aria-hidden="true"><kbd>↑</kbd><kbd>↓</kbd><span>through time</span></p>
    </div>
  </div>
`

const calm = () => document.body.classList.contains('reduced-motion') || (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)

export function initExperience(root) {
  const st = root.querySelector('.st')
  if (!st) return
  const ac = new AbortController()
  const { signal } = ac
  const stack = st.querySelector('.st-stack'), line = st.querySelector('.st-line'), mark = st.querySelector('.st-mark'), markY = st.querySelector('.st-mark-y')
  const eras = [...st.querySelectorAll('.era')]
  const heads = eras.map(e => e.querySelector('.era-head')), bodies = eras.map(e => e.querySelector('.era-body'))
  const panel = st.closest('#world-panel')
  let cur = -1, dead = false

  // The gauge's dot rides beside the open layer. It's re-placed whenever a layer changes size, so it
  // keeps up while the layers are still moving, however fast or slow the device draws.
  function place() {
    const el = eras[cur]
    if (!el) return
    const g = line.getBoundingClientRect(), r = el.getBoundingClientRect()
    const y = Math.max(0, Math.min(g.height, r.top + Math.min(r.height / 2, 40) - g.top))
    mark.style.transform = `translate(-50%, ${y.toFixed(1)}px)`
    markY.style.transform = `translateY(${y.toFixed(1)}px)`
  }

  function open(i, { quiet = false, focus = false } = {}) {
    i = Math.max(0, Math.min(N - 1, i))
    if (i === cur) return
    cur = i
    eras.forEach((el, k) => {
      const on = k === i
      el.classList.toggle('on', on)
      heads[k].setAttribute('aria-expanded', on ? 'true' : 'false')
      bodies[k].inert = !on
    })
    st.style.setProperty('--now', TEMP[i])
    markY.textContent = AT[i]
    place()
    if (focus) heads[i].focus({ preventScroll: true })
    // on a short screen the stack scrolls: bring the opened layer fully into it once it has grown
    setTimeout(() => { if (!dead) eras[i].scrollIntoView({ block: 'nearest', behavior: calm() ? 'auto' : 'smooth' }) }, calm() ? 0 : 540)
    if (!quiet) sfx.click()
  }

  st.addEventListener('click', (e) => {
    const era = e.target.closest('.era')
    if (era && !e.target.closest('a')) open(+era.dataset.i)
  }, { signal })

  // ↑ ↓ work as soon as the island is open, wherever the focus is inside the panel
  document.addEventListener('keydown', (e) => {
    if (dead || !st.isConnected || !panel?.classList.contains('is-open') || e.altKey || e.ctrlKey || e.metaKey) return
    const ae = document.activeElement
    if (ae && ae !== document.body && !panel.contains(ae)) return
    const move = { ArrowDown: cur + 1, ArrowUp: cur - 1, Home: 0, End: N - 1 }[e.key]
    if (move === undefined) return
    e.preventDefault(); e.stopPropagation()
    open(move, { focus: st.contains(ae) })
  }, { signal, capture: true })

  stack.addEventListener('scroll', place, { signal, passive: true })
  const ro = new ResizeObserver(place)
  ro.observe(stack)
  eras.forEach(e => ro.observe(e))

  root._disposeIsland = () => { dead = true; ac.abort(); ro.disconnect() }

  st.classList.add('is-in')            // the layers settle from the oldest up
  open(0, { quiet: true })
}

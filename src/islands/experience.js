// Experience island — a clean editorial timeline (LinkedIn-grade). A faint spine
// connects each role; the node is the company's real logo in a uniform white tile
// (a monogram tile is the graceful fallback where no logo is on file). Restrained
// type hierarchy, accent only on the current role and on hover. No runtime JS.
//
// Logos live in public/experience/<file>. To add one, drop the file in and set
// `logo`. Official marks on file: Barclays, BlackRock, University of Edinburgh.

const BASE = import.meta.env.BASE_URL || '/'

const ENTRIES = [
  { year: '2026',    role: 'Teaching Assistant',         org: 'University of Edinburgh', mono: 'UoE', logo: 'uoe.svg',      desc: 'System Design & Mobile Robotics, guiding students through architecture and robotics labs.' },
  { year: '2025',    role: 'Technology Analyst Intern',  org: 'Barclays',                mono: 'B',   logo: 'barclays.svg', desc: 'Automated a 45-minute manual workflow down to near-instant.' },
  { year: '2024–25', role: 'AI Coding Trainer',          org: 'Outlier',                 mono: 'O',   desc: 'Trained and evaluated LLM coding outputs.' },
  { year: '2024–25', role: 'Full-Stack Developer',       org: 'Freelance',               mono: 'PUM', desc: 'Built & deployed petalingutamamotor.com end-to-end.' },
  { year: '2024',    role: 'Technology Spring Intern',   org: 'BlackRock',               mono: 'BR',  logo: 'blackrock.svg', desc: 'Aladdin engineering operations & systems.' },
  { year: '2023',    role: 'Software Engineer Intern',   org: 'Finexus Group',           mono: 'F',   desc: 'ELK pipeline with a Java EE + Python backend.' },
  { year: '2023–24', role: 'Marketing Executive',        org: 'AMEU',                    mono: 'A',   desc: 'Grew to 6,000+ accounts and a 120% engagement increase.' },
]

function item(e, i) {
  const now = i === 0 ? ' exp-item--now' : ''
  // Real logo when on file; monogram tile otherwise. If the logo 404s, the
  // <img> removes itself and the :has() fallback reveals the monogram.
  const logo = e.logo
    ? `<img class="exp-logo" src="${BASE}experience/${e.logo}" alt="${e.org} logo" loading="lazy" onerror="this.remove()">`
    : ''
  return `
    <li class="exp-item${now}">
      <span class="exp-tile">${logo}<span class="exp-mono">${e.mono}</span></span>
      <div class="exp-content">
        <div class="exp-headline">
          <h4 class="exp-role">${e.role}</h4>
          ${i === 0 ? '<span class="exp-now">Now</span>' : ''}
        </div>
        <div class="exp-meta">${e.org} · ${e.year}</div>
        <p class="exp-desc">${e.desc}</p>
      </div>
    </li>`
}

export const EXPERIENCE_HTML = `
  <ol class="exp-list">
    ${ENTRIES.map(item).join('')}
  </ol>
`

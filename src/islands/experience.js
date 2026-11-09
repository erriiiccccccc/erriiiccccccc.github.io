// Experience island — a clean editorial timeline (LinkedIn-grade). A faint spine
// connects each role; the node is the company's real logo in a uniform white tile
// (a monogram tile is the graceful fallback where no logo is on file). Restrained
// type hierarchy, accent only on the current role and on hover. No runtime JS.
//
// Logos live in public/experience/<file>. To add one, drop the file in and set
// `logo`. Official marks on file: Barclays, BlackRock, University of Edinburgh.

const BASE = import.meta.env.BASE_URL || '/'

const ENTRIES = [
  { year: 'Since Aug 2026',       role: 'AI Audit Technology Analyst',           org: 'Barclays',                mono: 'B',   logo: 'barclays.svg',  desc: 'Joined full-time in London after graduating.' },
  { year: 'Jan to May 2026',      role: 'Teaching Assistant',                    org: 'University of Edinburgh', mono: 'UoE', logo: 'uoe.svg',       desc: 'Ran tutorials and labs for third-year System Design Project and Mobile Robotics, and helped student teams ship.' },
  { year: 'Sep 2025 to Jan 2026', role: 'Exam Marker',                           org: 'University of Edinburgh', mono: 'UoE', logo: 'uoe.svg',       desc: 'Marked third-year Informatics Large Practical coursework for functionality, code quality and correctness.' },
  { year: 'Jun to Sep 2025',      role: 'Credit Risk Technology Analyst Intern', org: 'Barclays',                mono: 'B',   logo: 'barclays.svg',  desc: 'Built a React + Flask tool on production MSSQL that turned a 45-minute manual workflow into near-instant.' },
  { year: 'Nov 2024 to May 2025', role: 'AI Coding Trainer',                     org: 'Outlier',                 mono: 'O',   desc: 'Trained and evaluated LLM coding outputs for correctness, efficiency and reasoning.' },
  { year: 'May 2024 to Feb 2025', role: 'Full-Stack Developer',                  org: 'Freelance',               mono: 'PUM', desc: 'Built and deployed petalingutamamotor.com end to end with React, Node.js and PostgreSQL.' },
  { year: '2024',                 role: 'Technology Spring Intern',              org: 'BlackRock',               mono: 'BR',  logo: 'blackrock.svg', desc: 'Aladdin engineering operations and systems.' },
  { year: '2023',                 role: 'Software Engineer Intern',              org: 'Finexus Group',           mono: 'F',   desc: 'ELK pipeline with a Java EE + Python backend.' },
  { year: '2023 to 2024',         role: 'Marketing Executive',                   org: 'AMEU',                    mono: 'A',   desc: 'Grew to 6,000+ accounts and a 120% engagement increase.' },
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

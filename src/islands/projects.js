// Projects island — a "featured spread" (master–detail), not a carousel:
//   • Left  → the FEATURED project: a large media stage (real photo/video when
//     you drop one in, a mountain placeholder until then) + title, blurb, tags,
//     and actions.
//   • Right → a clickable list of every project. Pick one and the feature
//     crossfades to it. Keyboard ↑/↓ moves the selection; Enter opens its link.
//
// Media: drop public/projects/<slug>.webm (+ optional <slug>.jpg poster) and it
// auto-plays in the stage; otherwise the placeholder shows. Works with zero
// assets today. `npm run record` generates both from a live URL.
import { svgIcon } from '../ui/icons.js'

const BASE = import.meta.env.BASE_URL || '/'
const REDUCE = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// accent = per-project hue that recolours the stage glow + active row, so
// flicking through projects feels alive. year/role add a line of context.
const PROJECTS = [
  {
    slug: 'erics-world',
    title: "Eric's World",
    year: '2026',
    role: 'Creative Dev',
    blurb: "The 3D walkable planet you're standing on right now — a Little Prince-inspired portfolio, fully procedural, built from Three.js primitives and a hand-rolled glass UI.",
    tags: ['Three.js', 'Vite', 'GLSL'],
    accent: '#FF8A65',
    href: 'https://erriiiccccccc.github.io',
    repo: 'https://github.com/erriiiccccccc/erriiiccccccc.github.io',
  },
  {
    slug: 'foundtech',
    title: 'FoundTech',
    year: '2024',
    role: 'Web Dev',
    blurb: 'A clean, responsive marketing site for a Malaysian tech company — built and shipped live, with a smooth scrolling story from hero to footer.',
    tags: ['Web', 'Responsive', 'Frontend'],
    accent: '#26C6DA',
    href: 'https://foundtech.com.my',
  },
  {
    slug: 'petaling-utama',
    title: 'Petaling Utama Motor',
    year: '2024',
    role: 'Full-Stack',
    blurb: 'Full-stack e-commerce site for a real Malaysian motor business — live and in production, handling a real catalogue and real customers.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Nginx'],
    accent: '#4CAF50',
    href: 'https://petalingutamamotor.com',
  },
  {
    slug: 'medmatch',
    title: 'MedMatch',
    year: '2024',
    role: 'Web Dev',
    blurb: 'A matching platform that connects medical students with clinicians through verified profiles, purpose-built matching, and streamlined selection — research, without the friction.',
    tags: ['Web', 'Platform', 'Frontend'],
    accent: '#EC407A',
    href: 'https://www.medmatch.institute',
  },
  {
    slug: 'ygo',
    title: 'YGo Tours',
    year: '2024',
    role: 'Web Dev',
    blurb: 'A polished site for a Kuala Lumpur travel agency (est. 1994) — private journeys, corporate incentives, and specialty trips, presented with an editorial, magazine-style feel.',
    tags: ['Web', 'Editorial', 'Frontend'],
    accent: '#7E57C2',
    href: 'https://ygowebsite.vercel.app',
  },
  {
    slug: 'sotwds',
    title: 'Scotland on the Web',
    year: '2024',
    role: 'Data Story',
    blurb: 'A scrollytelling data story reading two web-archiving systems side by side — a manually curated seed list vs an automated stream — to surface what each kind of memory infrastructure preserves and misses.',
    tags: ['Scrollytelling', 'Data Viz', 'D3'],
    accent: '#29B6F6',
    href: 'https://sotwds.vercel.app',
  },
  {
    slug: 'elk-pipeline',
    title: 'ELK Logging Pipeline',
    year: '2023',
    role: 'Internship',
    blurb: 'An Elasticsearch + Kibana + Logstash pipeline on Oracle Linux for a fintech platform at Finexus — turning raw server logs into searchable, alertable dashboards.',
    tags: ['Elasticsearch', 'Kibana', 'Linux'],
    accent: '#64B5F6',
  },
  {
    slug: 'blender',
    title: 'First Blender Project',
    year: '2023',
    role: 'Personal',
    blurb: 'Dove into 3D modeling and built a full scene from scratch — lighting, materials, the lot. Pretty proud of how it turned out for a first go.',
    tags: ['Blender', '3D Art'],
    accent: '#FBBF24',
  },
  {
    slug: 'ada-hack',
    title: 'Ada Hack 2022 — HumanEd',
    year: '2022',
    role: 'Hackathon',
    blurb: "Hackathon winner at the University of Edinburgh, built for the Rubik's Cube Painting Challenge under a tight 24-hour clock.",
    tags: ['Hackathon'],
    accent: '#7C3AED',
    badge: 'Winner',
  },
]

const pad = (n) => String(n).padStart(2, '0')

// One row in the right-hand explore list.
function listItem(p, i) {
  const meta = p.tags.slice(0, 3).join(' · ')
  return `
    <button class="pj-item${i === 0 ? ' is-active' : ''}" type="button" role="tab"
            aria-selected="${i === 0}" data-i="${i}" style="--pc:${p.accent}">
      <span class="pj-item-index">${pad(i + 1)}</span>
      <span class="pj-item-main">
        <span class="pj-item-title">${p.title}</span>
        <span class="pj-item-meta">${meta}</span>
      </span>
      ${p.badge ? `<span class="pj-item-badge">${svgIcon('trophy', 12)}</span>` : ''}
      <span class="pj-item-go">${svgIcon('arrowRight', 16)}</span>
    </button>`
}

export const PROJECTS_HTML = `
  <div class="pj-spread" style="--pc:${PROJECTS[0].accent}">
    <section class="pj-feature" aria-live="polite">
      <div class="pj-stage">
        <div class="pj-stage-glow" aria-hidden="true"></div>
        <span class="pj-stage-index" aria-hidden="true">${pad(1)}</span>
        <div class="pj-stage-ph" aria-hidden="true">${svgIcon('mountain', 52)}</div>
        <img class="pj-stage-poster" alt="" aria-hidden="true" />
        <video class="pj-stage-video" muted loop playsinline preload="none"></video>
        <span class="pj-stage-badge" hidden>${svgIcon('trophy', 13)} <span class="pj-stage-badge-txt"></span></span>
      </div>
      <div class="pj-feature-body">
        <div class="pj-feature-eyebrow">
          <span class="pj-kicker">Featured</span>
          <span class="pj-counter">${pad(1)} / ${pad(PROJECTS.length)}</span>
        </div>
        <h3 class="pj-feature-title"></h3>
        <div class="pj-feature-sub"></div>
        <p class="pj-feature-blurb"></p>
        <div class="pj-feature-tags"></div>
        <div class="pj-feature-links"></div>
      </div>
    </section>

    <div class="pj-list" role="tablist" aria-label="Projects" aria-orientation="vertical">
      ${PROJECTS.map(listItem).join('')}
    </div>
  </div>
`

export function initProjects(root) {
  const spread = root.querySelector('.pj-spread')
  if (!spread) return

  const items   = [...root.querySelectorAll('.pj-item')]
  const feature = root.querySelector('.pj-feature')
  const stage   = root.querySelector('.pj-stage')
  const video   = root.querySelector('.pj-stage-video')
  const poster  = root.querySelector('.pj-stage-poster')
  const idxEl   = root.querySelector('.pj-stage-index')
  const badgeEl = root.querySelector('.pj-stage-badge')
  const badgeTx = root.querySelector('.pj-stage-badge-txt')

  const titleEl = root.querySelector('.pj-feature-title')
  const subEl   = root.querySelector('.pj-feature-sub')
  const blurbEl = root.querySelector('.pj-feature-blurb')
  const tagsEl  = root.querySelector('.pj-feature-tags')
  const linksEl = root.querySelector('.pj-feature-links')
  const cntEl   = root.querySelector('.pj-counter')

  let current = -1

  const fillFeature = (p, i) => {
    spread.style.setProperty('--pc', p.accent)
    idxEl.textContent = pad(i + 1)
    cntEl.textContent = `${pad(i + 1)} / ${pad(PROJECTS.length)}`

    titleEl.textContent = p.title
    subEl.innerHTML = `<span>${p.role}</span><span class="pj-dot"></span><span>${p.year}</span>`
    blurbEl.textContent = p.blurb

    tagsEl.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('') +
      (p.badge ? `<span class="tag tag--accent">${svgIcon('trophy', 13)} ${p.badge}</span>` : '')

    const links = [
      p.href ? `<a class="pj-btn pj-btn--primary" href="${p.href}" target="_blank" rel="noopener noreferrer">${svgIcon('external', 15)} Visit live</a>` : '',
      p.repo ? `<a class="pj-btn" href="${p.repo}" target="_blank" rel="noopener noreferrer">${svgIcon('github', 15)} Source</a>` : '',
    ].filter(Boolean).join('')
    linksEl.innerHTML = links

    // Stage media has three fallback layers:
    //   video (if it loads)  →  poster photo (if it loads)  →  mountain (always).
    // We probe each by actually loading it; missing files error silently.
    video.pause()
    video.removeAttribute('src')
    video.load()
    poster.removeAttribute('src')
    stage.classList.remove('has-media', 'has-poster')

    const posterUrl = `${BASE}projects/${p.slug}.jpg`
    const videoUrl  = `${BASE}projects/${p.slug}.webm`

    // Poster photo = the backup. Show it the moment the .jpg loads.
    poster.onload  = () => stage.classList.add('has-poster')
    poster.onerror = () => stage.classList.remove('has-poster')
    poster.src = posterUrl
    video.poster = posterUrl    // also covers the video's own buffering gap

    // The demos ARE the content, so they play even under prefers-reduced-motion
    // (they're muted, silent loops). muted/playsInline MUST be set as properties
    // (not just HTML attrs) — when the panel re-mounts via innerHTML, Chrome
    // ignores the attributes and blocks muted autoplay, freezing on frame 1.
    video.muted = true
    video.playsInline = true
    // Video fades in on top of the poster once it can play; on error the
    // poster (or mountain) simply stays.
    video.src = videoUrl
    video.oncanplay = () => { stage.classList.add('has-media'); video.play().catch(() => {}) }
    video.onerror   = () => stage.classList.remove('has-media')
    video.play().catch(() => {})

    if (p.badge) { badgeTx.textContent = p.badge; badgeEl.hidden = false }
    else badgeEl.hidden = true
  }

  const select = (i, focus = false) => {
    if (i === current) return
    current = i
    items.forEach((el, k) => {
      const on = k === i
      el.classList.toggle('is-active', on)
      el.setAttribute('aria-selected', String(on))
    })
    if (focus) items[i].focus()

    if (REDUCE) { fillFeature(PROJECTS[i], i); return }
    // Quick crossfade: fade body+stage down, swap content, fade back up.
    feature.classList.add('is-swapping')
    const swap = () => {
      fillFeature(PROJECTS[i], i)
      requestAnimationFrame(() => feature.classList.remove('is-swapping'))
    }
    // ~150ms out, matching the CSS transition
    clearTimeout(select._t)
    select._t = setTimeout(swap, 150)
  }

  items.forEach((el, i) => {
    el.addEventListener('click', () => select(i))
  })

  // Roving keyboard: ↑/↓ (and ←/→) move selection through the list.
  spread.addEventListener('keydown', e => {
    const k = e.key
    if (k === 'ArrowDown' || k === 'ArrowRight') {
      e.preventDefault(); select((current + 1) % items.length, true)
    } else if (k === 'ArrowUp' || k === 'ArrowLeft') {
      e.preventDefault(); select((current - 1 + items.length) % items.length, true)
    } else if (k === 'Home') {
      e.preventDefault(); select(0, true)
    } else if (k === 'End') {
      e.preventDefault(); select(items.length - 1, true)
    }
  })

  // Bind stage media on the next frame so opening the panel doesn't stall on
  // video/poster probe in the same tick as the glass open.
  requestAnimationFrame(() => {
    fillFeature(PROJECTS[0], 0)
    current = 0
  })
}

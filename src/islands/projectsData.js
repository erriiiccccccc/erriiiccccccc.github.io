// Mountain Island gallery content — editorial collage of projects + artwork.
//
// HOW TO ADD MEDIA
// ────────────────
// Projects (demos):
//   Drop public/projects/<id>.webm + <id>.jpg  (or npm run record)
//   Demos are recorded at 16:10 → aspectRatio 1.6 (do not invent crops)
//
// Projects (stills only):
//   Drop public/projects/<id>.jpg matching that same 16:10 stage
//
// Artwork:
//   Drop files in public/gallery/art/<id>.jpg (or .webp)
//   Point src at `${BASE}gallery/art/<id>.jpg`
//   Natural aspect ratio is read from the image on load (no cropping)

const BASE = import.meta.env.BASE_URL || '/'

/** Recorded demos are 1920×1200 (16:10) — see scripts/record-demos.mjs */
const DEMO_ASPECT = 16 / 10

/** Projects with recorded demos under public/projects/ */
const HAS_DEMO = new Set([
  'foundtech',
  'petaling-utama',
  'medmatch',
  'ygo',
  'sotwds',
])

function projectMedia(id) {
  if (HAS_DEMO.has(id)) {
    return {
      mediaType: 'video',
      src: `${BASE}projects/${id}.webm`,
      poster: `${BASE}projects/${id}.jpg`,
      aspectRatio: DEMO_ASPECT,
    }
  }
  return {
    mediaType: 'image',
    src: `${BASE}projects/${id}.jpg`,
    poster: `${BASE}projects/${id}.jpg`,
    aspectRatio: DEMO_ASPECT,
  }
}

const PROJECTS_RAW = [
  {
    id: 'erics-world',
    title: "Eric's World",
    role: 'Creative Dev',
    year: '2026',
    blurb: "The 3D walkable planet you're standing on right now — a Little Prince-inspired world, fully procedural, built from Three.js primitives and a hand-rolled glass UI.",
    tags: ['Three.js', 'Vite', 'GLSL'],
    accent: '#FF8A65',
    href: 'https://erriiiccccccc.github.io',
    repo: 'https://github.com/erriiiccccccc/erriiiccccccc.github.io',
  },
  {
    id: 'foundtech',
    title: 'FoundTech',
    role: 'Web Dev',
    year: '2024',
    blurb: 'A clean, responsive marketing site for a Malaysian tech company — built and shipped live, with a smooth scrolling story from hero to footer.',
    tags: ['Web', 'Responsive', 'Frontend'],
    accent: '#26C6DA',
    href: 'https://foundtech.com.my',
  },
  {
    id: 'petaling-utama',
    title: 'Petaling Utama Motor',
    role: 'Full-Stack',
    year: '2024',
    blurb: 'Full-stack e-commerce site for a real Malaysian motor business — live and in production, handling a real catalogue and real customers.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Nginx'],
    accent: '#4CAF50',
    href: 'https://petalingutamamotor.com',
  },
  {
    id: 'medmatch',
    title: 'MedMatch',
    role: 'Web Dev',
    year: '2024',
    blurb: 'A matching platform that connects medical students with clinicians through verified profiles, purpose-built matching, and streamlined selection — research, without the friction.',
    tags: ['Web', 'Platform', 'Frontend'],
    accent: '#EC407A',
    href: 'https://www.medmatch.institute',
  },
  {
    id: 'ygo',
    title: 'YGo Tours',
    role: 'Web Dev',
    year: '2024',
    blurb: 'A polished site for a Kuala Lumpur travel agency (est. 1994) — private journeys, corporate incentives, and specialty trips, presented with an editorial, magazine-style feel.',
    tags: ['Web', 'Editorial', 'Frontend'],
    accent: '#7E57C2',
    href: 'https://ygowebsite.vercel.app',
  },
  {
    id: 'sotwds',
    title: 'Scotland on the Web',
    role: 'Data Story',
    year: '2024',
    blurb: 'A scrollytelling data story reading two web-archiving systems side by side — a manually curated seed list vs an automated stream — to surface what each kind of memory infrastructure preserves and misses.',
    tags: ['Scrollytelling', 'Data Viz', 'D3'],
    accent: '#29B6F6',
    href: 'https://sotwds.vercel.app',
  },
  {
    id: 'elk-pipeline',
    title: 'ELK Logging Pipeline',
    role: 'Internship',
    year: '2023',
    blurb: 'An Elasticsearch + Kibana + Logstash pipeline on Oracle Linux for a fintech platform at Finexus — turning raw server logs into searchable, alertable dashboards.',
    tags: ['Elasticsearch', 'Kibana', 'Linux'],
    accent: '#64B5F6',
  },
  {
    id: 'blender',
    title: 'First Blender Project',
    role: 'Personal',
    year: '2023',
    blurb: 'Dove into 3D modeling and built a full scene from scratch — lighting, materials, the lot. Pretty proud of how it turned out for a first go.',
    tags: ['Blender', '3D Art'],
    accent: '#FBBF24',
  },
  {
    id: 'ada-hack',
    title: 'Ada Hack 2022 — HumanEd',
    role: 'Hackathon',
    year: '2022',
    blurb: "Hackathon winner at the University of Edinburgh, built for the Rubik's Cube Painting Challenge under a tight 24-hour clock.",
    tags: ['Hackathon'],
    accent: '#7C3AED',
    badge: 'Winner',
  },
]

// Place photography — mixed native orientations (landscape / portrait / square).
// aspectRatio is a seed; hydrateImages overwrites --ar from naturalWidth/Height
// so nothing is cropped (object-fit: contain).
const ART_RAW = [
  {
    id: 'art-fuji',
    title: 'Mount Fuji',
    subtitle: 'Japan',
    src: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1400&q=80&auto=format',
    aspectRatio: 1.5,
  },
  {
    id: 'art-kyoto',
    title: 'Fushimi Inari',
    subtitle: 'Kyoto',
    // Tall vertical frame
    src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80&auto=format',
    aspectRatio: 0.67,
  },
  {
    id: 'art-alps',
    title: 'Alpine Ridge',
    subtitle: 'The Alps',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80&auto=format',
    aspectRatio: 1.5,
  },
  {
    id: 'art-lake',
    title: 'Still Water',
    subtitle: 'Mountain Lake',
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=80&auto=format',
    aspectRatio: 1.5,
  },
  {
    id: 'art-sea',
    title: 'Open Sea',
    subtitle: 'Coast',
    src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1400&q=80&auto=format',
    aspectRatio: 1.5,
  },
  {
    id: 'art-santorini',
    title: 'Caldera Light',
    subtitle: 'Santorini',
    src: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=900&q=80&auto=format',
    aspectRatio: 0.8,
  },
  {
    id: 'art-fjord',
    title: 'Mist Fjord',
    subtitle: 'Norway',
    src: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=1200&q=80&auto=format',
    aspectRatio: 1.5,
  },
  {
    id: 'art-dunes',
    title: 'Golden Dunes',
    subtitle: 'Desert',
    src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1400&q=80&auto=format',
    aspectRatio: 1.5,
  },
  {
    id: 'art-falls',
    title: 'Veil Falls',
    subtitle: 'Iceland',
    // Tall waterfall
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format',
    aspectRatio: 0.8,
  },
]

function toProjectItem(p) {
  const media = projectMedia(p.id)
  return {
    id: p.id,
    type: 'project',
    ...media,
    alt: `${p.title} preview`,
    title: p.title,
    subtitle: `${p.role} · ${p.year}`,
    role: p.role,
    year: p.year,
    blurb: p.blurb,
    tags: p.tags,
    accent: p.accent,
    href: p.href,
    repo: p.repo,
    badge: p.badge,
  }
}

function toArtItem(a) {
  return {
    id: a.id,
    type: 'art',
    mediaType: 'image',
    src: a.src,
    poster: a.src,
    alt: '',
    title: a.title,
    subtitle: a.subtitle,
    aspectRatio: a.aspectRatio,
    accent: '#94A3B8',
  }
}

/**
 * Interleave projects and art (~1:1) with slight local variation so the
 * sequence feels art-directed rather than mechanically alternating.
 */
function interleaveGallery(projects, art) {
  const out = []
  let pi = 0
  let ai = 0
  const pattern = ['p', 'a', 'p', 'a', 'a', 'p', 'a', 'p', 'a', 'p', 'a', 'p', 'a', 'p', 'a', 'p', 'a', 'p']
  for (const slot of pattern) {
    if (slot === 'p' && pi < projects.length) out.push(projects[pi++])
    else if (slot === 'a' && ai < art.length) out.push(art[ai++])
  }
  while (pi < projects.length) out.push(projects[pi++])
  while (ai < art.length) out.push(art[ai++])
  return out
}

const projects = PROJECTS_RAW.map(toProjectItem)
const art = ART_RAW.map(toArtItem)

/** Ordered collage items — projects interleaved with artwork. */
export const GALLERY = interleaveGallery(projects, art)

/** Project lookup by id (for detail sheet). */
export const PROJECT_BY_ID = Object.fromEntries(
  projects.map((p) => [p.id, p]),
)

// Mountain Island: the projects, in the order the Game Hub shows them.
//
// Each one leads with `outcome`: one line of "what I did, what happened", in
// Eric's words. `blurb` is the longer story under it.
//
// HOW TO ADD MEDIA
// ────────────────
// A project with a recorded demo:
//   run `npm run record <id>` (see scripts/record-demos.mjs) and add the id to
//   HAS_DEMO. It writes four files to public/projects/, all 16:10, 60 a second:
//     <id>.webm        2560 wide (a 1280 x 800 window drawn at 2x), the full-panel demo
//     <id>-sm.webm     1280 wide, for phones and small windows
//     <id>.jpg         the poster (the video's own first frame)
//     <id>-thumb.jpg   480 wide, for the tiles and the list
// A project without one:
//   give it `cover`: one of the drawn, moving covers in projectCovers.js.

const BASE = import.meta.env.BASE_URL || '/'

/** Projects with a recorded demo under public/projects/ */
// 'blender' isn't a recording: it's Eric's own render (donut.mp4, 1080 x 1440, 30 fps), made 16:10 for the
// stage by keeping the render whole in the middle and widening its plain pink backdrop to the sides with
// a soft feathered seam (ffmpeg, 2560 x 1600 at CRF 30 and 1280 x 800 at CRF 32; 10.5 MB -> 3.4 / 1.3 MB).
const HAS_DEMO = new Set(['erics-world', 'medmatch', 'sotwds', 'petaling-utama', 'foundtech', 'ygo', 'blender'])

const RAW = [
  {
    id: 'erics-world',
    title: "Eric's World",
    role: 'Creative Dev',
    year: '2026',
    outcome: 'A whole planet about me, built from scratch in Three.js.',
    blurb: "The 3D walkable planet you're standing on right now. Modelled in Blender, brought to life in Three.js with a hand-made glass UI, and inspired by ThevertMenthe, my favourite portfolio ever.",
    tags: ['Three.js', 'Vite', 'GLSL'],
    accent: '#FF8A65',
    href: 'https://erriiiccccccc.github.io',
    repo: 'https://github.com/erriiiccccccc/erriiiccccccc.github.io',
  },
  {
    id: 'medmatch',
    title: 'MedMatch',
    role: 'Co-founder',
    year: '2024',
    outcome: 'Co-founded with Justin Wei. Now piloting at the University of Edinburgh.',
    blurb: 'A startup I started with one of my best friends in Edinburgh. It matches UK medical students with clinicians for research, audits and quality improvement projects, with verified profiles and purpose-built matching.',
    tags: ['Startup', 'Platform', 'Frontend'],
    accent: '#EC407A',
    href: 'https://www.medmatch.institute',
  },
  {
    id: 'sotwds',
    title: 'Scotland on the Web',
    role: 'Dissertation',
    year: '2026',
    outcome: 'My dissertation: 84k hand-picked sites against 22.5M crawled rows, side by side.',
    blurb: "My final-year project at Edinburgh. A scrollytelling data story that reads two web archives next to each other, the National Library of Scotland's curated list and the automated GDELT stream, to show what each one keeps and what it misses.",
    tags: ['Scrollytelling', 'Data Viz', 'D3'],
    accent: '#29B6F6',
    href: 'https://sotwds.vercel.app',
  },
  {
    id: 'petaling-utama',
    title: 'Petaling Utama Motor',
    role: 'Full-Stack',
    year: '2024',
    outcome: 'My first website. Built by hand first, then rebuilt better with AI.',
    blurb: 'A full-stack e-commerce site for a Malaysian motor business, with a real catalogue behind it. The first version was every line by hand. Then I went back with AI and made it a lot better.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Nginx'],
    accent: '#4CAF50',
    href: 'https://pumwebsite.vercel.app',
  },
  {
    id: 'foundtech',
    title: 'FoundTech',
    role: 'Client Work',
    year: '2024',
    outcome: 'A paid client build, live for a Malaysian piling company.',
    blurb: 'A clean, responsive marketing site, built and shipped live, with a smooth scrolling story from hero to footer.',
    tags: ['Web', 'Responsive', 'Frontend'],
    accent: '#26C6DA',
    href: 'https://foundtech.com.my',
  },
  {
    id: 'ygo',
    title: 'YGo Tours',
    role: 'Redesign',
    year: '2024',
    outcome: "A redesign for my relative's travel agency, to show it could look a lot better.",
    blurb: 'Private journeys, corporate incentives and specialty trips from a Kuala Lumpur agency founded in 1994, presented with an editorial, magazine-style feel.',
    tags: ['Web', 'Editorial', 'Frontend'],
    accent: '#7E57C2',
    href: 'https://ygowebsite.vercel.app',
  },
  {
    id: 'ada-hack',
    title: 'Ada Hack 2022: HumanEd',
    role: 'Hackathon',
    year: '2022',
    outcome: 'My first hackathon, and we won.',
    blurb: "Built with my uni friends in 24 hours for the Rubik's Cube Painting Challenge at the University of Edinburgh.",
    tags: ['Hackathon', '24 hours'],
    accent: '#7C3AED',
    badge: 'Winner',
    cover: 'mosaic',
  },
  {
    id: 'elk-pipeline',
    title: 'ELK Logging Pipeline',
    role: 'Internship',
    year: '2023',
    outcome: 'Got Elasticsearch running at my first company, before uni even started.',
    blurb: 'Elasticsearch, Logstash and Kibana on Oracle Linux at Finexus, turning raw server logs into dashboards you can search. Simple, looking back. At the time it felt hecking cool.',
    tags: ['Elasticsearch', 'Kibana', 'Linux'],
    accent: '#64B5F6',
    cover: 'logs',
  },
  {
    id: 'blender',
    title: 'First Blender Project',
    role: 'Personal',
    year: '2023',
    outcome: 'My first full 3D project, the one that led to what you see on this website.',
    blurb: 'Dove into 3D modelling and built a full scene from scratch: lighting, materials, the lot. Every island on this planet started here.',
    tags: ['Blender', '3D Art'],
    accent: '#FBBF24',
    cover: 'viewport',
  },
]

/** Recorded before there was a small version: only the one clip, 1280 wide. (FoundTech's site was
 *  showing a maintenance page when the others were re-recorded; `npm run record foundtech` once
 *  it's back, then take it out of this set.) */
const ONE_SIZE = new Set(['foundtech'])

/** The projects, in hub order. `demo` is the recorded video (or null), `demoSm` the smaller cut of
 *  it, `poster` its still and `thumb` a small still for tiles. */
export const PROJECTS = RAW.map((p) => {
  if (!HAS_DEMO.has(p.id)) return { ...p, demo: null, demoSm: null, poster: null, thumb: null }
  const f = `${BASE}projects/${p.id}`
  return { ...p, demo: `${f}.webm`, demoSm: ONE_SIZE.has(p.id) ? `${f}.webm` : `${f}-sm.webm`, poster: `${f}.jpg`, thumb: `${f}-thumb.jpg` }
})

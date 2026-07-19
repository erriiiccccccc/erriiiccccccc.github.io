// Island registry. Panel modules are eager so pressing E never pays for a
// cold dynamic-import + parse hitch. meadow_island → AboutOverlay in main.js.
import { TECH_HTML, initTech } from '../islands/tech.js'
import { PROJECTS_HTML, initProjects } from '../islands/projects.js'
import { EXPERIENCE_HTML } from '../islands/experience.js'
import { CONTACT_HTML, initContact } from '../islands/contact.js'
import { TRAVEL_HTML, initTravelStats } from '../travel/TravelStats.js'

export const ISLANDS = {
  meadow_island: {
    iconKey: 'leaf',
    name: 'Meadow Island',
    section: 'About Me',
    color: '#4CAF50',
    html: `
      <p>Hey, I'm <strong>Eric Ng Min Chern</strong> — a final-year Computer Science student
      at the University of Edinburgh (graduating June 2026), originally from Malaysia.</p>
      <p>I've interned at Barclays and BlackRock, built real products for real businesses,
      and I love making things that are useful, interactive, or just a bit unexpected.</p>
      <div class="tag-row">
        <span class="tag">CS @ Edinburgh</span>
        <span class="tag">Ex-Barclays &amp; BlackRock</span>
        <span class="tag">Full-Stack Dev</span>
        <span class="tag">Open to Work</span>
      </div>
    `,
  },

  arctic_island: {
    iconKey: 'snowflake',
    name: 'Arctic Island',
    section: 'Tech Stack',
    color: '#64B5F6',
    variant: 'tech',
    html: TECH_HTML,
    init: initTech,
  },

  mountain_island: {
    iconKey: 'mountain',
    name: 'Mountain Island',
    section: 'Projects',
    color: '#FF8A65',
    variant: 'projects',
    html: PROJECTS_HTML,
    init: initProjects,
  },

  lava_island: {
    iconKey: 'flame',
    name: 'Lava Island',
    section: 'Experience',
    color: '#E53935',
    variant: 'exp',
    html: EXPERIENCE_HTML,
  },

  desert_island: {
    iconKey: 'sun',
    name: 'Desert Island',
    section: 'Contact',
    color: '#FB923C',
    variant: 'contact',
    html: CONTACT_HTML,
    init: initContact,
  },

  pirate_ship: {
    iconKey: 'compass',
    name: 'Pirate Ship',
    section: 'Travel Log',
    color: '#0097A7',
    lightColor: '#FFFFFF',
    noGlow: true,
    variant: 'travel',
    html: TRAVEL_HTML,
    init: initTravelStats,
  },
}

/** No-op kept for call sites; panels are eager now. */
export function prefetchAllIslands() {
  return Promise.resolve()
}

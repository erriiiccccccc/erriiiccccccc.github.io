// One entry per Blender island object name.
// `color` drives the popup accent and panel header tint.
export const ISLANDS = {
  meadow_island: {
    icon: '🌿',
    name: 'Meadow Island',
    section: 'About Me',
    color: '#4CAF50',
    html: `
      <p>Hey, I'm <strong>Eric Ng Min Chern</strong> — a developer who loves building creative,
      interactive things on the web.</p>
      <p>I'm into 3D experiences, clean UI, and anything that makes people go
      "wait, how did they do that?"</p>
      <div class="tag-row">
        <span class="tag">CS Student</span>
        <span class="tag">Full-Stack Dev</span>
        <span class="tag">Creative Coder</span>
        <span class="tag">Traveller</span>
      </div>
    `
  },

  arctic_island: {
    icon: '🧊',
    name: 'Arctic Island',
    section: 'Tech Stack',
    color: '#64B5F6',
    html: `
      <div class="skill-category"><strong>Frontend:</strong> React, Next.js, Three.js, Tailwind</div>
      <div class="skill-category"><strong>Backend:</strong> Node.js, Python, Go</div>
      <div class="skill-category"><strong>Tools:</strong> Docker, Git, AWS, Blender</div>
      <p style="margin-top:1rem;color:rgba(255,255,255,0.4);font-size:0.78rem;">
        Always learning something new...</p>
    `
  },

  mountain_island: {
    icon: '⛰️',
    name: 'Mountain Island',
    section: 'Projects',
    color: '#FF8A65',
    html: `
      <div class="project-card">
        <h4>This Portfolio</h4>
        <p>A Little Prince-inspired walkable 3D planet built with Three.js + Blender.</p>
        <div class="tech"><span class="tag">Three.js</span><span class="tag">Vite</span><span class="tag">Blender</span></div>
      </div>
      <div class="project-card">
        <h4>Connect Four AI</h4>
        <p>Classic Connect Four with an AI opponent. Java + game tree search.</p>
        <div class="tech"><span class="tag">Java</span><span class="tag">AI</span></div>
      </div>
      <p style="margin-top:1rem;color:rgba(255,255,255,0.4);font-size:0.78rem;">
        More coming soon — check GitHub!</p>
    `
  },

  lava_island: {
    icon: '🌋',
    name: 'Lava Island',
    section: 'Experience',
    color: '#E53935',
    html: `
      <div class="timeline-entry">
        <span class="tl-year">2025</span>
        <span class="tl-desc">Current role — placeholder</span>
      </div>
      <div class="timeline-entry">
        <span class="tl-year">2024</span>
        <span class="tl-desc">Internship — placeholder</span>
      </div>
      <div class="timeline-entry">
        <span class="tl-year">2023</span>
        <span class="tl-desc">Started CS degree</span>
      </div>
    `
  },

  desert_island: {
    icon: '🏜️',
    name: 'Desert Island',
    section: 'Contact',
    color: '#FBBF24',
    html: `
      <p>Want to work together or just say hi? Reach out anytime.</p>
      <ul>
        <li><a href="https://github.com/erriiiccccccc" target="_blank" rel="noopener noreferrer">GitHub — erriiiccccccc</a></li>
      </ul>
      <p style="margin-top:1rem;color:rgba(255,255,255,0.4);font-size:0.82rem;">
        Open to opportunities!</p>
    `
  },

  pirate_ship: {
    icon: '🏴‍☠️',
    name: 'Pirate Ship',
    section: 'Travel Log',
    color: '#0097A7',
    html: `
      <div class="tp-header">
        <h2 class="tp-title">Eric's Travel Map</h2>
        <div class="tp-actions">
          <button id="travel-refresh" class="tp-btn" type="button">⟳ Reload</button>
          <span id="travel-status" class="tp-status" aria-live="polite">Loading…</span>
        </div>
      </div>
      <!-- Click-to-load Google Maps embed — avoids loading Google's tracking iframe
           on panel open; user opts in explicitly. -->
      <div id="tp-map-slot">
        <div class="tp-map-consent">
          <span>Show Eric's travel map?<br>
            <small>Loads an embed from Google Maps which may set cookies.</small>
          </span>
          <button id="tp-map-load" type="button">Load map</button>
        </div>
      </div>
      <div class="tp-stats">
        <div class="tp-box">
          <p class="tp-label">Countries</p>
          <p id="tp-countries" class="tp-value">-</p>
        </div>
        <div class="tp-box">
          <p class="tp-label">Landmarks</p>
          <p id="tp-landmarks" class="tp-value">-</p>
        </div>
        <div class="tp-box">
          <p class="tp-label">% of world</p>
          <p id="tp-world-pct" class="tp-value">-</p>
        </div>
      </div>
      <div class="tp-debug-bar">
        <button class="tp-debug-btn" id="tp-debug-toggle">▼</button>
      </div>
      <pre id="tp-debug" class="tp-debug">No stats fetched yet.</pre>
    `
  }
}

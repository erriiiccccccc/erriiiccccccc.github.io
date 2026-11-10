// Arctic Island. The tech stack was retired; until the island's new content
// lands it shows the glacier and one line, so the pane is never empty.
const BASE = import.meta.env.BASE_URL || '/'

export const ARCTIC_HTML = `
  <div class="arctic-soon">
    <div class="arctic-photo" style="background-image:url('${BASE}islandphoto/arcticislandphoto.jpeg')">
      <div class="arctic-cap">
        <span class="arctic-eyebrow">Field notes</span>
        <span class="arctic-line">Out on the glacier</span>
      </div>
    </div>
    <p class="arctic-note">Something new is freezing over here. Come back soon.</p>
  </div>
`

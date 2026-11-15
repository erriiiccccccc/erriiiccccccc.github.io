# Eric's World! Brand Bible

## Name

**Eric's World!**

The exclamation mark is part of the name. Always include it in titles, headings, and the intro screen. Short-form references in body copy: "the world", "your world". Never use "portfolio" in any UI text. The game is the portfolio.

---

## Voice and Tone

Warm, curious, lightly cheeky. Think cozy indie game (A Short Hike, Spiritfarer, Journey). Speak to the player, not a reader.

- Short sentences. No filler words.
- Lowercase casual where it fits ("press anything to start" not "Press Anything To Start")
- Exclamations used genuinely, not constantly
- Game vocabulary is natural: explore, discover, warp, island, world, find, dive in
- Never: "please note", "in order to", "you can also", "interactive portfolio"

### What NOT to do

- No em dashes ( -- ) in UI copy. Use a comma, a period, or rewrite.
- No en dashes ( - ) in UI copy.
- No corporate connector phrases.
- No passive voice in prompts.

---

## Terminology

One word, one concept. Apply these across all UI, overlays, tooltips, and copy.

| Concept | Use | Never use |
|---------|-----|-----------|
| Configuration screen | Options | Settings |
| Audio toggle | Sound | Audio |
| Fast travel | Warp | Teleport |
| Control reference | How to Play | Help, Controls, Manual |
| Map screen | Island Map | World Map |
| Island visited/explored | found | visited, discovered |
| Loading screen tips | Loading messages | Flavour text, loading tips |
| Action: open an island | dive in | explore, open, visit |
| Arctic's guide | Hui Sin | Mochi, chatbot, assistant, AI |
| What Eric does on the About screen | Emotes (Greet, Agree, Call: his own animations) | animations, actions |
| The list of islands on the About screen | Quest log | checklist, progress |
| The snow creature on Arctic | Pip | mascot, NPC, pet |
| Meadow's music player | the Jukebox | music player, radio |
| Meadow's whiteboard | the Doodle Wall | guestbook, canvas |
| Mountain's project screen | the Hub, and the List | gallery, carousel, grid |

---

## Typography

- **Instrument Serif** (`--font-display`): panel titles, the Press E title card, project titles, big numbers, the Map / How to Play / Options titles. It has one weight, so titles are always 400 and get their presence from size. Warm and storybook, but reads modern.
- **Cinzel** (`--font-logo`): the Eric's World! wordmark on the loader, and nowhere else. As a heading font it read fantasy RPG and cramped on long titles.
- **Inter** (`--font-body`): body, buttons, all running copy.
- **Monospace** (`--font-mono`): eyebrows, keys, small uppercase labels and counters.

---

## Color System

| Token | Hex | Use |
|-------|-----|-----|
| World / Space | `#0d0820` | Background, deep space |
| Accent / Magic | `#7C3AED` | Purple highlights, teleport flash, UI accent |
| Warm / Gold | `#FBBF24` | Island glow, warm highlights |
| Horizon glow | `#FF8C42` | Sunset, atmosphere |

Each island also has its own accent color defined in `src/data/content.js`. These are used for popup accents, panel header tints, and emissive glow.

Every control takes its colour from the island it's on. No third-party brand colours on buttons (a LinkedIn link is a quiet, on-theme row or tag, never LinkedIn blue).

---

## UI Vocabulary Reference

**Loading screen:**
- The Approach: the camera flies in toward the planet as the world downloads, past satellites, asteroids, meteors and a comet. Only the wordmark at the top ("Eric's World", Cinzel, its letters inlined so it is right from the first paint). The bar and the stage lines at the bottom.
- The planet is a picture of itself until the real one can be drawn (`public/loader-planet.webp`, `npm run capture:loader` after any change to world.glb). No island names on the loader.
- Tag: `◈  WORLD.LOAD`
- Loading messages: `WARPING SPACETIME`, `SCULPTING ISLANDS`, `PLACING STARS`, `CALIBRATING ORBIT`, `SUMMONING ERIC`, `PAINTING ATMOSPHERE`

**HUD:**
- Island counter: `N / 6 islands found`
- Controls hint: `WASD move  *  Space jump  *  Shift sprint  *  RMB camera  *  Scroll zoom`

**Popups and prompts:**
- Desktop CTA: `[E] Dive in`
- Mobile CTA: `Tap` keycap (dives in)
- Help tip: `Step onto a glowing island and press E to dive in.`

**Island panels (one chrome, six shells):**
- Every panel shares the same chrome: eyebrow = where you are (`02 / 06 · Mountain Island`), title = what this is (`Projects`), then `‹ ›` to hop islands, `Esc`, `✕`. The About screen carries the same `‹ › Esc ✕` row.
- Each island picks a shell (`shell:` in `src/data/content.js`) for its shape and entrance: Meadow full screen with the character, Mountain `cinema` (world goes black, the screen powers on from a line of light), Arctic `frost` (pane frosts over on the right, then clears), Lava `eruption` (embers burst up from the bottom of the screen, the card rides up on them, the ground shakes), Desert `mirage` (wavers in from far away, then sharpens), Pirate `night` (camera pulls back into space).
- Motion: enters 0.5 to 1.2 s ease-out, exits about half that ease-in, closing mid-entrance reverses from where it is, reduced motion gets a short fade.
- Performance: shells only move opacity, transform and clip-path. No animated `filter: blur()`, SVG filters or blend modes on panels: they made first openings drop to ~20 fps while the GPU built them.
- Hop order follows the planet (nearest neighbour from the meadow), so `›` is always a short warp.

**What lives on each island:**
- Meadow, About Me: Character Select. Profile and Emotes on the left, the Quest log and Now playing on the right, the nameplate along the bottom. Click or tap Eric and he talks: a speech bubble beside his head types the line out with a soft, low tick on every second letter. The bubble finds a spot that covers nothing (not his face, not a card). The Emotes are his own three animations. A ribbon of light follows the pointer. On phones the nameplate and the four cards are one row to swipe. The Jukebox and the Doodle Wall stand on the island itself.
- Mountain, Projects: the Hub, one project at a time with its demo across the whole panel and a rail of tiles; the List is the same projects as rows. Every project leads with one outcome line.
- Lava, Experience: Strata. Layers of rock, newest on top and molten, the outcome first. An open layer is always as tall as what it says.
- Desert, Contact: the form asks what it's about first. The sky over it is London's real hour; drag it and the day goes by, "Now in London" brings it back.
- Arctic, Ask Hui Sin: a guide who answers questions about Eric from facts he wrote, in a chat that behaves like a messaging app. Her suggested questions change after every answer. Pip hides in the snow outside: catch it three times and it comes with you.
- Pirate Ship, Travel Log: the storybook globe.

**Decisions that hold everywhere:**
- No Short Version, no plain "recruiter mode". The world is the whole point.
- No CV or résumé file on the site. LinkedIn carries the work history.
- Text is never cut off. Things are sized by what they say and the container scrolls; a secondary line steps out whole before anything is shortened to "...".
- Every screen is checked at laptop heights (down to about 1280 x 585) and on phones (down to 360 x 640), not only on a big monitor.
- Friends' photos (Morocco on Desert, the glacier on Arctic) stay, untinted.

**Sound (`src/audio/sfx.js`):**
- Everything is synthesised on the Jukebox's AudioContext. No sample files.
- One key, G major pentatonic. Each island owns a note: Meadow G5, Mountain D5, Arctic E5, Lava A4, Desert B4, Pirate G4. Arriving plays the note, diving in plays it with its fifth, a first find plays a rising arpeggio, all six found rolls every note into one chord.
- Each shell has its own texture: Mountain TV power-on hum, Arctic ice crackle, Lava rumble and ember fizz, Desert hot wind, Pirate ocean swell. Closing is a shorter, softer version.
- Footsteps follow the ground: grass, rock, snow, sand, wood deck. Plus jump, landing, warp whoosh, UI clicks and toggles.
- Ambience (wandering wind and a low space hum) sits under everything at about -44 dB, dips while a panel is open and steps aside for the Jukebox.
- Levels: effects stay between about -24 and -49 dB, nothing peaks above -15 dB. Options has Sound (on/off) and Volume (scales everything, the Jukebox included). The Jukebox has its own brass knob for the same Volume, so nobody has to leave it to turn the music down.
- The music's own loudness (quieter out in the world than at the shelf) is a separate control from Volume inside the engine: one must never overwrite the other.
- Eric's voice is a soft low blip every few letters while his line types out, and Pip squeaks when caught.

**Loading into the world:**
- No gate: the world opens on its own. Sound is tried the moment the page loads and always fades in softly over 2.5 s.
- If the browser allows autoplay for the site, every 5% of the bar plays a balloon pop climbing the world's scale (growing as the bar fills), and the welcome plays as the world opens: a low bloom, rising air, a warm G major chord and a sparkle on top.
- Otherwise (most first visits) sound starts on the first press or click, usually closing How to Play: it fades in, pops catch up if the bar is still going, and the welcome plays then.

**Overlays:**
- Intro: "Welcome to Eric's World!" / "Six islands. Explore them all."
- Map subtitle: "Walk there yourself, or jump straight to any island."
- Options title: "Options" (not "Settings")

**Discovery toast:**
- All found: "All 6 islands found! You've seen everything."

---

## AAA Game Design Principles

This project follows a game-first philosophy. Every UI decision should ask: "would this feel at home in a polished indie game?"

1. **Player-first language.** Every string addresses the player directly. "Step onto" not "walk toward". "Dive in" not "explore it".
2. **Options, not Settings.** Standard game menu language. Consistent with every major game on PC and console.
3. **Discovery over visitation.** "found" carries weight. "visited" is passive. Islands are found, not visited.
4. **Loading as atmosphere.** Loading messages are lore, not status. "SUMMONING ERIC" not "WAKING CHARACTER".
5. **Warp, not teleport.** "Warp" has weight and sounds physical. Consistent with the "WARPING SPACETIME" loader message.
6. **Zero corporate copy.** If it could appear on a LinkedIn banner, rewrite it.
7. **Lowercase casual = confidence.** "press anything to start" reads cooler than "Press Any Key To Continue". Reserve title case for proper names and screen titles.

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

---

## Typography

- **Cinzel** (headings, modal titles, overlay headers): dramatic, adventure-game register. Use for titles and section names only.
- **Inter** (body, labels, all copy): clean, readable, modern. Everything else.

---

## Color System

| Token | Hex | Use |
|-------|-----|-----|
| World / Space | `#0d0820` | Background, deep space |
| Accent / Magic | `#7C3AED` | Purple highlights, teleport flash, UI accent |
| Warm / Gold | `#FBBF24` | Island glow, warm highlights |
| Horizon glow | `#FF8C42` | Sunset, atmosphere |

Each island also has its own accent color defined in `src/data/content.js`. These are used for popup accents, panel header tints, and emissive glow.

---

## UI Vocabulary Reference

**Loading screen:**
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

**Sound (`src/audio/sfx.js`):**
- Everything is synthesised on the Jukebox's AudioContext. No sample files.
- One key, G major pentatonic. Each island owns a note: Meadow G5, Mountain D5, Arctic E5, Lava A4, Desert B4, Pirate G4. Arriving plays the note, diving in plays it with its fifth, a first find plays a rising arpeggio, all six found rolls every note into one chord.
- Each shell has its own texture: Mountain TV power-on hum, Arctic ice crackle, Lava rumble and ember fizz, Desert hot wind, Pirate ocean swell. Closing is a shorter, softer version.
- Footsteps follow the ground: grass, rock, snow, sand, wood deck. Plus jump, landing, warp whoosh, UI clicks and toggles.
- Ambience (wandering wind and a low space hum) sits under everything at about -44 dB, dips while a panel is open and steps aside for the Jukebox.
- Levels: effects stay between about -24 and -49 dB, nothing peaks above -15 dB. Options has Sound (on/off) and Volume (scales everything, the Jukebox included).

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

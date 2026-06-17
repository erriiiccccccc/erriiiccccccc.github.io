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
- Desktop CTA: `[E] to explore`
- Mobile CTA: `Tap to explore ->`
- Help tip: `Step onto a glowing island and press E to dive in.`

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

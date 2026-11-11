// The Jukebox's own records: a few calm loops the gramophone can always
// play, so the meadow has music even before anyone has put a loop on the
// shelf (or when the shelf can't be reached). Same pattern format as the
// shelf: sixteen steps, [step, row] pairs per lane (see pattern.js).
const P = (mood, bpm, lead, bass, drums) => ({ v: 1, bpm, root: 57, mood, lanes: { lead, bass, drums } })
const HATS = [[2, 2], [6, 2], [10, 2], [14, 2]]

export const HOUSE_LOOPS = [
  {
    id: 'house-meadow-morning', name: 'Meadow Morning',
    pattern: P('warm', 92,
      [[0, 4], [2, 5], [4, 7], [6, 5], [8, 4], [10, 2], [12, 3], [14, 4]],
      [[0, 0], [4, 0], [8, 3], [12, 2]],
      [[0, 0], [8, 0], [4, 1], [12, 1], ...HATS]),
  },
  {
    id: 'house-stargazing', name: 'Stargazing',
    pattern: P('night', 78,
      [[0, 7], [3, 5], [6, 4], [8, 5], [11, 2], [14, 4]],
      [[0, 0], [8, 2]],
      [[0, 0], [4, 2], [12, 2]]),
  },
  {
    id: 'house-soft-orbit', name: 'Soft Orbit',
    pattern: P('dreamy', 86,
      [[0, 2], [2, 4], [4, 5], [7, 4], [8, 2], [10, 1], [12, 0], [14, 1]],
      [[0, 0], [6, 1], [8, 3], [12, 2]],
      [[0, 0], [10, 0], [8, 1], ...HATS]),
  },
]

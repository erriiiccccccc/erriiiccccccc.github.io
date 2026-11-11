// The Jukebox playing out loud in the world.
//
// Step into the gramophone's circle and it puts on a random loop from the
// shelf at a comfortable level. Nothing plays until you're inside; walk out
// and it fades over a step or two, then stops. Press F and the shelf opens: the world music stops so you can play
// what you like. Close the shelf while you're still in the circle and it
// goes back to random loops. A new random loop comes on about every 48 s.
// The pool is the shelf plus a few house loops (houseLoops.js), so the
// meadow has music even while the shelf is empty.
//
// It drives the same AudioEngine as the shelf (owner 'world'), so whatever
// the shelf is doing always wins, and the shelf always gets its own level.
import { audio } from './AudioEngine.js'
import { fetchTunes, fetchPattern } from './jukeboxApi.js'
import { HOUSE_LOOPS } from './houseLoops.js'

const OWNER  = 'world'
const LEVEL  = 0.42     // about half the shelf's level: there, not loud
const SWAP_S = 48       // seconds per loop before another random one
const RETRY  = 3        // seconds before trying again if a loop failed to start
const FRESH  = 120      // seconds a fetched shelf stays fresh before re-reading it

export class WorldJukebox {
  constructor() {
    this._tracks  = null
    this._loading = null
    this._want    = false
    this._pending = false
    this._swap    = 0
    this._retry   = 0
    this._last    = null
  }

  get playing() { return audio.isPlaying(OWNER) }

  async _list() {
    // re-read the shelf now and then, so loops people post join the pool
    if (this._tracks && performance.now() - this._fetchedAt > FRESH * 1000) { this._tracks = null; this._loading = null }
    if (this._tracks) return this._tracks
    if (!this._loading) {
      this._fetchedAt = performance.now()
      // the shelf plus the Jukebox's own records, so there's always something
      this._loading = fetchTunes()
        .then(r => (this._tracks = [...HOUSE_LOOPS, ...(r.items || [])]))
        .catch(() => (this._tracks = [...HOUSE_LOOPS]))
    }
    return this._loading
  }

  async _playRandom() {
    if (this._pending) return
    this._pending = true
    try {
      const list = await this._list()
      if (!this._want || !list.length) return
      let pick = list[Math.floor(Math.random() * list.length)]
      for (let i = 0; i < 4 && list.length > 1 && pick.id === this._last; i++) {
        pick = list[Math.floor(Math.random() * list.length)]
      }
      const pattern = await fetchPattern(pick)
      if (!this._want || !pattern) return
      if (audio.owner && audio.owner !== OWNER) return      // the shelf took over meanwhile
      audio.setLevel(0, true)                               // start silent, update() fades it up
      if (audio.play(pattern, OWNER)) { this._last = pick.id; this._swap = SWAP_S }
    } finally {
      this._pending = false
      this._retry = RETRY
    }
  }

  /**
   * Call every frame.
   * @param {number}  dt
   * @param {number}  presence 1 inside the circle, 0 outside (main.js eases it
   *                           out over a step or two once you've been in)
   * @param {boolean} allowed  false while the shelf or any panel is open
   */
  update(dt, presence, allowed) {
    const want = allowed && presence > 0 && audio.soundOn
    if (want && !this._want) {
      this._want = true
      if (!this.playing && !(audio.owner && audio.owner !== OWNER)) this._playRandom()
    } else if (!want && this._want) {
      this.stop()
      return
    }
    if (!this._want) return
    if (this.playing) {
      audio.setLevel(LEVEL * presence)
      this._swap -= dt
      if (this._swap <= 0) this._playRandom()
    } else if (!this._pending && !(audio.owner && audio.owner !== OWNER)) {
      this._retry -= dt
      if (this._retry <= 0) this._playRandom()
    }
  }

  /** Take over a loop already playing (a record left on from the close-up). */
  adopt() {
    this._want = true
    this._swap = SWAP_S
  }

  stop() {
    this._want = false
    if (this.playing) audio.stop(OWNER)
    audio.setLevel(audio.fullLevel)
  }
}

// Pip: a tiny snow imp hiding on Arctic Island. An easter egg, so nothing points at it.
//
// It lives in a little mound of snow. Two ear tufts poke out and twitch; now and
// then it comes up for a look around. Walk up to it and press F (or tap the
// prompt) to catch it: it squeaks, goes in a puff of snow, and hides again
// somewhere else on the island. Catch it three times and it comes with you.
//
// Built from primitives like everything else out here. The group's +Y is the
// surface normal (main.js places it); as a friend it's re-parented to the scene
// and main.js moves it along beside Eric each frame.
//
// As a friend it never just blinks out. It has its own small moves for the
// moments Eric does something big: a hop a beat after his jump, a look up while
// he floats for About (it stays on the grass), a happy bounce when he's back,
// bracing while the planet turns under them in a warp, and a fade with him for
// the close-ups. main.js decides when; these are only the moves.
import * as THREE from 'three'

// The world is seen from well back, so it's drawn about knee-high to Eric: small enough to be a
// secret, big enough to catch your eye when it moves.
const SIZE = 2.5
const FRIEND_SIZE = 2.1

const lit = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.9, metalness: 0, ...extra })
const flat = (color) => new THREE.MeshBasicMaterial({ color })
const ease = (cur, to, dt, k) => cur + (to - cur) * (1 - Math.exp(-dt * k))
// its own jump: smaller than his, and a beat after it, so it reads as following, not glued on
const LEAP_DELAY = 0.09, LEAP_TIME = 0.42, LEAP_HEIGHT = 0.17    // about two thirds of his jump
const CHEER_TIME = 0.62     // two quick hops when he lands back beside it
const LAND_TIME  = 0.35     // the squash at the end of a warp

export class Pip {
  constructor() {
    this.group = new THREE.Group()

    // the mound it hides in, with a dark hole in the top
    this.mound = new THREE.Group()
    const heap = new THREE.Mesh(new THREE.SphereGeometry(0.36, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2), lit(0xeef8ff))
    heap.scale.set(1, 0.44, 1)
    heap.receiveShadow = true
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.17, 9), flat(0x16233d))
    hole.rotation.x = -Math.PI / 2
    hole.position.y = 0.16
    this.mound.add(heap, hole)

    // the imp: a round white body, two ear tufts, eyes, cheeks, a tiny nose
    this.body = new THREE.Group()
    const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.17, 1), lit(0xffffff, { emissive: 0xbfe6ff, emissiveIntensity: 0.22 }))
    ball.scale.set(1, 1.06, 0.96)
    ball.castShadow = true
    this.ears = [-1, 1].map((side) => {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 5), lit(0xffffff, { emissive: 0xbfe6ff, emissiveIntensity: 0.22 }))
      ear.position.set(side * 0.085, 0.2, 0)
      ear.rotation.z = -side * 0.28
      ear.userData.side = side
      return ear
    })
    const eye = () => new THREE.Mesh(new THREE.SphereGeometry(0.026, 6, 5), flat(0x18202f))
    this.eyes = [eye(), eye()]
    this.eyes[0].position.set(-0.062, 0.035, 0.148)
    this.eyes[1].position.set(0.062, 0.035, 0.148)
    const cheek = (x) => { const c = new THREE.Mesh(new THREE.CircleGeometry(0.024, 7), flat(0xffa3b8)); c.position.set(x, -0.012, 0.158); return c }
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.05, 5), lit(0xff9a4d, { emissive: 0xff7a1a, emissiveIntensity: 0.3 }))
    nose.rotation.x = Math.PI / 2
    nose.position.set(0, 0.004, 0.178)
    // a little scarf in the world's purple, so it reads against the snow (and against every other island later)
    const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.125, 0.034, 5, 10), lit(0x8b5cf6, { emissive: 0x7c3aed, emissiveIntensity: 0.35 }))
    scarf.rotation.x = Math.PI / 2
    scarf.position.y = -0.085
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.11, 0.03), lit(0x8b5cf6, { emissive: 0x7c3aed, emissiveIntensity: 0.35 }))
    tail.position.set(0.09, -0.13, 0.11)
    tail.rotation.z = -0.3
    this.body.add(ball, ...this.ears, ...this.eyes, cheek(-0.1), cheek(0.1), nose, scarf, tail)

    // a glint over the mound now and then: the only hint that something's in there
    this.glint = new THREE.Group()
    const ray = new THREE.OctahedronGeometry(0.07, 0)
    const shine = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95, depthWrite: false })
    const g1 = new THREE.Mesh(ray, shine); g1.scale.set(0.22, 1, 0.22)
    const g2 = new THREE.Mesh(ray, shine); g2.scale.set(1, 0.22, 0.22)
    this.glint.add(g1, g2)
    this.glint.position.set(0.12, 0.42, 0.1)
    this.glint.scale.setScalar(0)

    // a puff of snow for when it's caught
    this.puff = []
    const flake = new THREE.IcosahedronGeometry(0.045, 0)
    const snow = lit(0xffffff, { emissive: 0xdff2ff, emissiveIntensity: 0.4 })
    for (let i = 0; i < 12; i++) {
      const m = new THREE.Mesh(flake, snow)
      m.visible = false
      const a = (i / 12) * Math.PI * 2 + Math.random() * 0.4
      m.userData.v = new THREE.Vector3(Math.cos(a) * (0.9 + Math.random() * 0.7), 1.3 + Math.random() * 1.1, Math.sin(a) * (0.9 + Math.random() * 0.7))
      this.puff.push(m)
    }

    this.root = new THREE.Group()
    this.root.scale.setScalar(SIZE)
    this.root.add(this.mound, this.body, this.glint, ...this.puff)
    this.group.add(this.root)

    this.friend = false
    this._up = 0            // 0 down in the hole (ear tips showing), 1 right out
    this._t = Math.random() * 10
    this._peek = 2 + Math.random() * 3      // seconds until the next look around
    this._peeking = 0
    this._gone = 0          // > 0 just after being caught: nothing to see
    this._puffT = -1
    this._blink = 2 + Math.random() * 3
    this._hop = 0
    this._glint = 1.5 + Math.random() * 2
    this._face = 0
    // friend moves (see the header): timers run from 0 while a move plays, -1 when idle
    this._leapT = -1
    this._cheerT = -1
    this._landT = -1
    this._watching = false
    this._look = 0
    this._bracing = false
    this._brace = 0
    this._fade = 1
    this._fadeMats = []
    this.body.traverse(o => { if (o.material) this._fadeMats.push(o.material) })
    this._pose()
  }

  /** True for a moment after a catch, while it's away finding a new hiding place. */
  get busy() { return this._gone > 0 }

  /** Caught: a squash, a puff of snow, and it's gone. */
  caught() {
    this._gone = 1.1
    this._puffT = 0
    for (const m of this.puff) { m.visible = true; m.position.set(0, 0.2, 0); m.scale.setScalar(1) }
  }
  /** It has moved to a new mound: start down in the hole again. */
  reset() {
    this._gone = 0
    this._up = 0
    this._peek = 1.2 + Math.random() * 2
    this._peeking = 0
    this.body.visible = true
    this.body.scale.setScalar(1)
  }
  /** He jumped: a smaller hop of its own, a beat later. */
  leap() { if (this._leapT < 0) this._leapT = 0 }
  /** He's back on the ground beside it (after About): two happy hops. */
  cheer() { this._cheerT = 0 }
  /** He's gone up for About: it stays put and looks up at him (false: looks ahead again). */
  watch(on) { this._watching = on }
  /** The planet is turning under them (a warp): it hunkers down. */
  brace(on) { this._bracing = on }
  /** The warp is over: a little squash as it settles. */
  land() { this._landT = 0 }
  /** Fade with him (the Meadow close-ups fade him out): 1 shown, 0 gone. */
  setFade(f) {
    if (f === this._fade) return
    this._fade = f
    for (const m of this._fadeMats) { m.transparent = f < 1; m.opacity = f; m.depthWrite = f > 0.6 }
  }

  /** Three catches: no more mound, it follows Eric from now on. */
  setFriend() {
    this.friend = true
    this.root.scale.setScalar(FRIEND_SIZE)
    this.glint.visible = false
    this.mound.visible = false
    this.body.visible = true
    this.body.scale.setScalar(1)
    this._gone = 0
    this._up = 1
  }

  /**
   * @param {number} dt
   * @param {object} o
   * @param {boolean} o.awake    the player is on its island: it may come up for a look
   * @param {boolean} o.near     the player is within catching distance: it freezes, right out of the hole
   * @param {boolean} o.moving   (friend) Eric is walking, so it hops along
   * @param {boolean} o.calm     reduced motion: no bobbing or twitching
   * @param {number}  o.face     (hiding) the turn, in its own space, that points its face at the camera
   */
  update(dt, { awake = false, near = false, moving = false, calm = false, face = 0 } = {}) {
    this._t += dt
    // it turns its face to whoever's watching, the short way round
    let d = face - this._face
    d = Math.atan2(Math.sin(d), Math.cos(d))
    this._face = calm ? face : this._face + d * (1 - Math.exp(-dt * 5))

    // the puff of snow
    if (this._puffT >= 0) {
      this._puffT += dt
      const k = this._puffT / 0.7
      for (const m of this.puff) {
        m.position.addScaledVector(m.userData.v, dt)
        m.userData.v.y -= 4.2 * dt
        m.scale.setScalar(Math.max(0, 1 - k))
      }
      if (k >= 1) {
        this._puffT = -1
        for (const m of this.puff) { m.visible = false; m.userData.v.y = 1.3 + Math.random() * 1.1 }
      }
    }
    if (this._gone > 0) {
      this._gone -= dt
      this.body.scale.setScalar(ease(this.body.scale.x, 0, dt, 22))
      if (this.body.scale.x < 0.04) this.body.visible = false
      return
    }

    // blinking, whatever it's doing
    this._blink -= dt
    const shut = this._blink < 0.12
    if (this._blink < 0) this._blink = 2.2 + Math.random() * 3.5
    for (const e of this.eyes) e.scale.y = shut ? 0.15 : 1

    if (this.friend) {
      // hop while he walks, breathe while he stands
      this._hop = moving && !calm ? (this._hop + dt * 9) % (Math.PI * 2) : ease(this._hop, 0, dt, 10)
      const hop = moving && !calm ? Math.abs(Math.sin(this._hop)) : 0
      // the moves: each one a 0..1 curve while it plays (reduced motion: none of them)
      const play = (key, len, curve) => {
        if (this[key] < 0) return 0
        if (calm) { this[key] = -1; return 0 }
        this[key] += dt
        const k = this[key] / len
        if (k >= 1) { this[key] = -1; return 0 }
        return curve(k)
      }
      const leap  = play('_leapT', LEAP_DELAY + LEAP_TIME, k => { const u = (k * (LEAP_DELAY + LEAP_TIME) - LEAP_DELAY) / LEAP_TIME; return u > 0 ? Math.sin(u * Math.PI) : 0 })
      const cheer = play('_cheerT', CHEER_TIME, k => Math.abs(Math.sin(k * Math.PI * 2)) * (1 - k * 0.4))
      const land  = play('_landT', LAND_TIME, k => Math.sin(k * Math.PI) * (1 - k))
      this._look  = calm ? (this._watching ? 1 : 0) : ease(this._look, this._watching ? 1 : 0, dt, 6)
      this._brace = calm ? 0 : ease(this._brace, this._bracing ? 1 : 0, dt, 10)
      const air = hop * 0.2 + leap * LEAP_HEIGHT + cheer * 0.16
      this.body.position.y = 0.17 + air + (calm ? 0 : Math.sin(this._t * 2.4) * 0.008) - this._brace * 0.03
      const squash = 1 - hop * 0.12 - land * 0.28 - this._brace * 0.14
      const stretch = (hop + leap + cheer) * 0.2
      this.body.scale.set(1 + (1 - squash) * 0.6, squash + stretch, 1 + (1 - squash) * 0.6)
      // as a friend it faces the way he walks (main.js turns the group); looking up tips it back
      this.body.rotation.set(-this._look * 0.5, 0, calm ? 0 : Math.sin(this._t * 1.3) * 0.05)
      for (const ear of this.ears) ear.rotation.x = calm ? 0 : -(hop * 0.5 + leap * 0.6 + this._brace * 0.8) + this._look * 0.25
      this.body.visible = this._fade > 0.02
      return
    }

    // hiding: mostly down, a look around now and then, and right out (frozen) when someone's close
    if (near) { this._peeking = 0.4; this._peek = 2.5 }
    else if (awake) {
      if (this._peeking > 0) this._peeking -= dt
      else { this._peek -= dt; if (this._peek <= 0) { this._peeking = 2.4; this._peek = 3 + Math.random() * 4 } }
    } else this._peeking = 0
    // the glint: a quick twinkle over the mound while it's down in the hole
    this._glint -= dt
    if (this._glint < -0.7) this._glint = 2.2 + Math.random() * 2.6
    const tw = awake && !near && !calm && this._glint < 0 && this._up < 0.3 ? Math.sin((-this._glint / 0.7) * Math.PI) : 0
    this.glint.scale.setScalar(tw)
    this.glint.rotation.z += dt * 2.5
    const want = near ? 1 : this._peeking > 0 ? 0.78 : 0
    this._up = calm ? want : ease(this._up, want, dt, want > this._up ? 9 : 5)
    this._pose(near, calm)
  }

  _pose(near = false, calm = false) {
    const up = this._up
    this.body.position.y = -0.1 + up * 0.36
    // looking around when it's up; a tremble when caught in the open
    this.body.rotation.y = this._face + (calm ? 0 : near ? Math.sin(this._t * 30) * 0.03 : Math.sin(this._t * 1.5) * 0.7 * up)
    this.body.rotation.z = calm || near ? 0 : Math.sin(this._t * 2.1) * 0.06 * up
    // ear tips twitch while it hides
    const twitch = calm ? 0 : Math.max(0, Math.sin(this._t * 3.1)) * Math.max(0, Math.sin(this._t * 0.7)) * (1 - up) * 0.5
    for (const ear of this.ears) ear.rotation.x = twitch * (ear.userData.side > 0 ? 1 : -0.6)
  }
}

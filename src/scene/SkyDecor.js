import * as THREE from 'three'
import { Sun } from './Sun.js'
import { Nebula } from './Nebula.js'
import { CelestialBodies } from './CelestialBodies.js'
import { Asteroids } from './Asteroids.js'
import { Flyers } from './Flyers.js'
import { Comet } from './Comet.js'
import { Aurora } from './Aurora.js'

// Thin coordinator for everything that lives in the sky: builds each background
// element, exposes one `.group` to add to the scene, and forwards a single
// `update()`. Keeps main.js to a 3-line integration. All children live in world
// space (the planet rotates underneath, the cosmos stays put).
export class SkyDecor {
  constructor() {
    this.group = new THREE.Group()

    this.sun      = new Sun()
    this.nebula   = new Nebula()
    this.bodies   = new CelestialBodies()
    this.asteroids = new Asteroids()
    this.flyers   = new Flyers()
    this.comet    = new Comet()
    this.aurora   = new Aurora()

    this._children = [
      this.sun, this.nebula, this.bodies,
      this.asteroids, this.flyers, this.comet, this.aurora,
    ]
    for (const c of this._children) this.group.add(c.group)
  }

  update(dt, time, reducedMotion = false) {
    for (const c of this._children) c.update(dt, time, reducedMotion)
  }
}

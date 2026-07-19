import * as THREE from 'three'
import { Sun } from './Sun.js'
import { Nebula } from './Nebula.js'
import { CelestialBodies } from './CelestialBodies.js'

// Thin coordinator for sky content. Critical atmosphere (sun, nebula, planets)
// boots immediately; aurora / asteroids / flyers / comet load after first reveal.
export class SkyDecor {
  constructor(skyTier = 'standard') {
    this.group = new THREE.Group()
    this._skyTier = skyTier
    this._deferredEnabled = false

    this.sun = new Sun()
    this.nebula = new Nebula()
    this.bodies = new CelestialBodies()

    this.asteroids = null
    this.flyers = null
    this.comet = null
    this.aurora = null

    this._critical = [this.sun, this.nebula, this.bodies]
    for (const c of this._critical) this.group.add(c.group)

    this._applyTierVisibility()
  }

  setSkyTier(tier) {
    this._skyTier = tier || 'standard'
    this._applyTierVisibility()
  }

  /** Load non-critical sky systems after the experience is Live. */
  async enableDeferred(tier) {
    if (this._deferredEnabled) {
      this.setSkyTier(tier)
      return
    }
    this._deferredEnabled = true
    this._skyTier = tier || this._skyTier

    if (this._skyTier === 'minimal') {
      this._applyTierVisibility()
      return
    }

    const [{ Asteroids }, { Flyers }, { Comet }, { Aurora }] = await Promise.all([
      import('./Asteroids.js'),
      import('./Flyers.js'),
      import('./Comet.js'),
      import('./Aurora.js'),
    ])

    this.asteroids = new Asteroids()
    this.flyers = new Flyers()
    this.comet = new Comet()
    this.aurora = new Aurora()

    for (const c of [this.asteroids, this.flyers, this.comet, this.aurora]) {
      c.group.visible = false
      this.group.add(c.group)
    }
    this._applyTierVisibility()
    this._fadeInDeferred()
  }

  _fadeInDeferred() {
    const deferred = [this.asteroids, this.flyers, this.comet, this.aurora].filter(Boolean)
    for (const c of deferred) {
      c.group.visible = true
      c.group.traverse(obj => {
        if (!obj.material) return
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        for (const m of mats) {
          if (m && 'opacity' in m) {
            if (m._phfBaseOpacity == null) m._phfBaseOpacity = m.opacity
            m.transparent = true
            m.opacity = 0
          }
        }
      })
    }
    const start = performance.now()
    const dur = 900
    const step = () => {
      const t = Math.min(1, (performance.now() - start) / dur)
      for (const c of deferred) {
        c.group.traverse(obj => {
          if (!obj.material) return
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          for (const m of mats) {
            if (m && m._phfBaseOpacity != null) m.opacity = m._phfBaseOpacity * t
          }
        })
      }
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  _applyTierVisibility() {
    const tier = this._skyTier
    // minimal: sun only; standard: sun+nebula+bodies; full: + deferred when loaded
    this.sun.group.visible = true
    this.nebula.group.visible = tier !== 'minimal'
    this.bodies.group.visible = tier !== 'minimal'

    const showExtra = tier === 'full' || tier === 'standard'
    if (this.asteroids) this.asteroids.group.visible = showExtra && tier === 'full'
    if (this.flyers) this.flyers.group.visible = showExtra
    if (this.comet) this.comet.group.visible = showExtra && tier === 'full'
    if (this.aurora) this.aurora.group.visible = showExtra
  }

  update(dt, time, reducedMotion = false) {
    for (const c of this._critical) c.update(dt, time, reducedMotion)
    if (this.asteroids?.group.visible) this.asteroids.update(dt, time, reducedMotion)
    if (this.flyers?.group.visible) this.flyers.update(dt, time, reducedMotion)
    if (this.comet?.group.visible) this.comet.update(dt, time, reducedMotion)
    if (this.aurora?.group.visible) this.aurora.update(dt, time, reducedMotion)
  }
}

// GTA-style floating quest marker.
//
// Anchors to any object inside the planet group and floats a bobbing arrow
// above it, pointing down at the thing worth walking to. Because it lives in
// planetGroup it rotates with the world and gets occluded by the planet's own
// geometry, so it reads as "over there, on the far side" rather than an
// always-on-top HUD sticker.
//
// Two nodes come out of attachTo():
//   marker.group  — the visual (arrow + halo), pushed out along the surface normal
//   marker.anchor — an empty at the target's centre, used for distance checks
import * as THREE from 'three'

const UP = new THREE.Vector3(0, 1, 0)

let _haloTex = null
function haloTexture() {
  if (_haloTex) return _haloTex
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0.00, 'rgba(255,255,255,0.95)')
  g.addColorStop(0.22, 'rgba(255,255,255,0.42)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.12)')
  g.addColorStop(1.00, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  _haloTex = new THREE.CanvasTexture(c)
  _haloTex.colorSpace = THREE.SRGBColorSpace
  return _haloTex
}

export class QuestMarker {
  /**
   * @param {object} [opts]
   * @param {number} [opts.color]  accent hex
   * @param {number} [opts.size]   arrow scale, in world units (character ~2.2)
   * @param {number} [opts.lift]   clear air between the prop's top and the tip
   */
  constructor({ color = 0xFBBF24, size = 1.25, lift = 1.35 } = {}) {
    this._color = new THREE.Color(color)
    this._size  = size
    this._lift  = lift

    this.group  = new THREE.Group()
    this.anchor = new THREE.Object3D()
    this.group.visible = false

    // Downward-pointing chevron. 4 sides + flatShading keeps it in the
    // low-poly family instead of looking like an imported UI asset.
    const cone = new THREE.ConeGeometry(0.40, 0.80, 4)
    cone.rotateX(Math.PI)          // tip points -Y, at the thing below it
    cone.rotateY(Math.PI * 0.25)   // flat face toward the default camera
    this._mat = new THREE.MeshStandardMaterial({
      color:             this._color,
      emissive:          this._color,
      emissiveIntensity: 0.9,
      roughness:         0.35,
      metalness:         0.0,
      flatShading:       true,
    })
    this._arrow = new THREE.Mesh(cone, this._mat)
    this._arrow.position.y = 0.42
    this.group.add(this._arrow)

    // Additive halo so the marker still reads against a bright island.
    this._halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map:         haloTexture(),
      color:       this._color,
      transparent: true,
      opacity:     0.5,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
    }))
    this._halo.scale.setScalar(3.0)
    this._halo.position.y = 0.42
    this.group.add(this._halo)

    this._baseY      = 0
    this._scale      = 1
    this._near       = 0    // 0..1 eased proximity
    this._found      = 0    // 0..1 eased "already opened once" fade-down
    this._discovered = false
    this._t          = 0
    this._v          = new THREE.Vector3()
  }

  /**
   * Place the marker over `target`, parented to `parent` (the planet group).
   * Returns the target's world-space radius so callers can size a trigger.
   */
  attachTo(target, parent) {
    parent.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(target)
    if (box.isEmpty()) return 0

    const centerWorld = box.getCenter(new THREE.Vector3())
    const size        = box.getSize(new THREE.Vector3())
    const radius      = Math.max(size.x, size.y, size.z) * 0.5

    // Local space of the planet group, whose origin is the planet's core, so
    // the normalised centre doubles as the outward surface normal.
    const local  = parent.worldToLocal(centerWorld.clone())
    const normal = local.clone().normalize()

    this.anchor.position.copy(local)
    parent.add(this.anchor)

    // Sized against the player, not the prop: a marker that scales with a small
    // telescope ends up too small to spot from the other side of the planet.
    // The prop's radius only nudges it, so a huge landmark still gets a bigger one.
    this._scale = THREE.MathUtils.clamp(this._size * (0.75 + radius * 0.35), 0.9, 2.6)
    this._baseY = radius + this._lift + this._scale * 0.5

    this.group.position.copy(local)
    this.group.quaternion.setFromUnitVectors(UP, normal)
    this.group.scale.setScalar(this._scale)
    this.group.visible = true
    parent.add(this.group)

    // Marker sits `_baseY` further out along the same normal; because the
    // group is already rotated so its +Y is the normal, a local offset works.
    this._offset = new THREE.Vector3(0, this._baseY / this._scale, 0)
    this._arrow.position.y = this._offset.y
    this._halo.position.y  = this._offset.y

    return radius
  }

  /** World-space distance from the anchored target to `point`. */
  distanceTo(point) {
    if (!this.anchor.parent) return Infinity
    this.anchor.getWorldPosition(this._v)
    return this._v.distanceTo(point)
  }

  /** Dim the marker down once the player has actually opened the thing. */
  setDiscovered(v = true) { this._discovered = v }

  /**
   * @param {number}  dt
   * @param {boolean} near           player is inside the trigger radius
   * @param {boolean} reducedMotion
   */
  update(dt, near, reducedMotion = false) {
    if (!this.group.visible) return
    this._t += dt

    const k = 1 - Math.exp(-6 * dt)
    this._near  += ((near ? 1 : 0) - this._near) * k
    this._found += ((this._discovered ? 1 : 0) - this._found) * (1 - Math.exp(-2.5 * dt))

    const calm   = reducedMotion ? 0.25 : 1
    const quiet  = 1 - this._found * 0.3           // settles down after first open
    const bob    = Math.sin(this._t * 2.1) * 0.22 * calm
    const lift   = this._near * 0.16               // rises a touch on approach
    const y      = this._offset.y + (bob + lift) * quiet

    this._arrow.position.y = y
    this._halo.position.y  = y
    this._arrow.rotation.y = reducedMotion ? Math.PI * 0.25 : this._t * 0.85
    this._arrow.scale.setScalar(quiet)

    const pulse = 0.5 + 0.5 * Math.sin(this._t * 3.0)
    this._mat.emissiveIntensity = (0.7 + this._near * 0.9 + pulse * 0.35) * quiet
    this._halo.material.opacity = (0.30 + this._near * 0.45 + pulse * 0.14) * quiet
    this._halo.scale.setScalar((2.8 + this._near * 1.0 + pulse * 0.3) * quiet)
  }

  dispose() {
    this.group.removeFromParent()
    this.anchor.removeFromParent()
    this._arrow.geometry.dispose()
    this._mat.dispose()
    this._halo.material.dispose()
  }
}

// Small hand-made poses on top of the character's animation, for moments the
// Tripo clips don't cover (reaching out to put a record on).
//
// Each move is a rotation about a body axis (left, up, forward) turned into
// the bone's own space, so it works whatever way the rig's bones point.
//
// The AnimationMixer only re-writes a bone when its clip value changes, so a
// still idle pose would let these offsets pile up frame after frame. Call
// frameStart() BEFORE mixer.update() each frame: it puts back whatever the
// last frame's pose changed.
import * as THREE from 'three'

const LEFT = new THREE.Vector3(1, 0, 0)
const FWD  = new THREE.Vector3(0, 0, 1)

export class Rig {
  constructor(root) {
    this.root = root
    this.bones = {}
    root.traverse(o => { if (o.isBone) this.bones[o.name] = o })
    this._saved = null
    this._pq = new THREE.Quaternion(); this._rq = new THREE.Quaternion()
    this._r = new THREE.Quaternion(); this._a = new THREE.Vector3()
  }

  frameStart() {
    if (!this._saved) return
    for (const [b, q] of this._saved) b.quaternion.copy(q)
    this._saved = null
  }

  _turn(name, axis, angle) {
    const b = this.bones[name]
    if (!b || Math.abs(angle) < 1e-4) return
    if (!this._saved) {
      this._saved = new Map()
      for (const bone of Object.values(this.bones)) this._saved.set(bone, bone.quaternion.clone())
    }
    this.root.getWorldQuaternion(this._rq)
    this._a.copy(axis).applyQuaternion(this._rq)
    this._r.setFromAxisAngle(this._a, angle)
    b.parent.getWorldQuaternion(this._pq)
    const inv = this._pq.clone().invert()
    b.quaternion.premultiply(inv.multiply(this._r).multiply(this._pq))
    b.updateMatrixWorld(true)
  }

  /** Both arms out in front, as if handing something over. amt 0..1. */
  reach(amt) {
    if (amt <= 0.001) return
    for (const s of ['L', 'R']) {
      this._turn(s + '_Upperarm', LEFT, -1.15 * amt)
      this._turn(s + '_Upperarm', FWD, (s === 'L' ? -0.12 : 0.12) * amt)
      this._turn(s + '_Forearm', LEFT, -0.55 * amt)
    }
    this._turn('Spine02', LEFT, 0.12 * amt)
    this._turn('Head', LEFT, 0.18 * amt)
  }
}

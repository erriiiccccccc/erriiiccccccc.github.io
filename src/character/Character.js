import * as THREE from 'three'

const smooth = (color) => new THREE.MeshStandardMaterial({ color })
const faceted = (color) => new THREE.MeshStandardMaterial({ color, flatShading: true })

export class Character {
  constructor() {
    this.group = new THREE.Group()
    this._stride = 0

    // ── Head (smooth sphere) ──────────────────────────────────────────
    this._headGroup = new THREE.Group()
    this._headGroup.position.y = 0.82

    const headMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 14, 10),
      smooth(0xFFDDB5)
    )

    // Eyes — small dark spheres inset into face
    const eyeMat = smooth(0x1a1a2e)
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.04, 7, 5), eyeMat)
    eyeL.position.set(-0.10, 0.04, 0.18)
    const eyeR = eyeL.clone()
    eyeR.position.x = 0.10

    // Rosy cheeks
    const cheekMat = smooth(0xFFAA88)
    const cheekL = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), cheekMat)
    cheekL.position.set(-0.15, -0.04, 0.17)
    const cheekR = cheekL.clone()
    cheekR.position.x = 0.15

    this._headGroup.add(headMesh, eyeL, eyeR, cheekL, cheekR)

    // ── Hair (golden, squished sphere — Little Prince fluff) ──────────
    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 10, 8),
      faceted(0xFFD54F)
    )
    hair.position.set(0, 0.97, 0.03)
    hair.scale.set(1.0, 0.72, 0.95)

    // Front wave tuft
    const hairTuft = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 7, 5),
      faceted(0xFFD54F)
    )
    hairTuft.position.set(0, 1.02, 0.18)
    hairTuft.scale.set(0.9, 0.7, 0.7)

    // ── Body (low-poly cylinder = green jacket) ───────────────────────
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.20, 0.52, 7),
      faceted(0x43A047)
    )
    body.position.y = 0.30

    // Jacket front buttons
    const btnM = faceted(0xFFD700)
    ;[-0.05, 0.05, 0.15].forEach(py => {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.025, 5, 4), btnM)
      btn.position.set(0, py + 0.22, 0.18)
      this.group.add(btn)
    })

    // Epaulettes (gold flattened spheres on shoulders)
    const epaM = faceted(0xFFD700)
    const epaL = new THREE.Mesh(new THREE.SphereGeometry(0.10, 6, 4), epaM)
    epaL.position.set(-0.25, 0.54, 0)
    epaL.scale.set(1.1, 0.45, 1.0)
    const epaR = epaL.clone()
    epaR.position.x = 0.25

    // ── Scarf (cream, torus neck-wrap + trailing capsules) ────────────
    this._scarfGroup = new THREE.Group()

    const scarfNeck = new THREE.Mesh(
      new THREE.TorusGeometry(0.155, 0.048, 7, 12),
      faceted(0xFFFDE7)
    )
    scarfNeck.position.y = 0.62
    scarfNeck.rotation.x = Math.PI / 2

    const scarfL = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.046, 0.30, 2, 7),
      faceted(0xFFFDE7)
    )
    scarfL.position.set(-0.08, 0.43, -0.13)
    scarfL.rotation.x = -0.30

    const scarfR = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.046, 0.24, 2, 7),
      faceted(0xFFFDE7)
    )
    scarfR.position.set(0.08, 0.39, -0.15)
    scarfR.rotation.x = -0.36

    this._scarfGroup.add(scarfNeck, scarfL, scarfR)

    // ── Arms (capsule, pivot at shoulder) ─────────────────────────────
    this._armLPivot = new THREE.Group()
    this._armLPivot.position.set(-0.25, 0.52, 0)
    const armLMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.068, 0.26, 2, 7),
      faceted(0x43A047)
    )
    armLMesh.position.y = -0.18
    this._armLPivot.add(armLMesh)

    this._armRPivot = new THREE.Group()
    this._armRPivot.position.set(0.25, 0.52, 0)
    this._armRPivot.add(armLMesh.clone())

    // ── Hips + Legs (capsule, pivot at hip) ───────────────────────────
    this._hips = new THREE.Group()
    this._hips.position.y = -0.14

    const legGeo = new THREE.CapsuleGeometry(0.078, 0.30, 2, 7)
    const legMat = faceted(0x1A237E)

    this._legLPivot = new THREE.Group()
    this._legLPivot.position.x = -0.11
    const legLMesh = new THREE.Mesh(legGeo, legMat)
    legLMesh.position.y = -0.24
    this._legLPivot.add(legLMesh)

    this._legRPivot = new THREE.Group()
    this._legRPivot.position.x = 0.11
    this._legRPivot.add(legLMesh.clone())

    // Boots — squished sphere
    const bootMat = faceted(0x212121)
    const bootL = new THREE.Mesh(new THREE.SphereGeometry(0.095, 7, 5), bootMat)
    bootL.position.set(-0.11, -0.52, 0.04)
    bootL.scale.set(1.0, 0.60, 1.25)
    const bootR = bootL.clone()
    bootR.position.x = 0.11

    this._hips.add(this._legLPivot, this._legRPivot, bootL, bootR)

    // ── Assemble ──────────────────────────────────────────────────────
    this.group.add(
      body, epaL, epaR,
      this._scarfGroup,
      this._headGroup, hair, hairTuft,
      this._armLPivot, this._armRPivot,
      this._hips
    )

    this.group.traverse(c => { if (c.isMesh) c.castShadow = true })
  }

  update(dt, moving, time, jumping = false) {
    if (jumping) {
      this._legLPivot.rotation.x = -0.70
      this._legRPivot.rotation.x = -0.70
      this._armLPivot.rotation.x = -1.0
      this._armRPivot.rotation.x = -1.0
      this._armLPivot.rotation.z = -0.75
      this._armRPivot.rotation.z = 0.75
      this._scarfGroup.rotation.x = -0.55
      this._headGroup.rotation.x = 0.10  // look up slightly
      this.group.rotation.z = 0
      this._hips.position.y = -0.14
      return
    }

    // Reset
    this._armLPivot.rotation.z = 0
    this._armRPivot.rotation.z = 0
    this._scarfGroup.rotation.x = 0
    this._headGroup.rotation.x = 0

    if (moving) this._stride += dt * 4.5
    const swing = Math.sin(this._stride) * (moving ? 0.55 : 0.03)

    this._legLPivot.rotation.x = -swing
    this._legRPivot.rotation.x = swing
    this._armLPivot.rotation.x = swing * 0.65
    this._armRPivot.rotation.x = -swing * 0.65

    // Scarf sways with stride
    this._scarfGroup.rotation.x = moving ? Math.sin(this._stride * 2) * 0.09 : 0

    // Idle sway
    this.group.rotation.z = !moving ? Math.sin(time * 0.6) * 0.025 : 0

    // Hip bob
    this._hips.position.y = -0.14 + Math.abs(Math.sin(this._stride * 2)) * 0.03
  }
}

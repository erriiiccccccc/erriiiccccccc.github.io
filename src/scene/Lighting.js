import * as THREE from 'three'

export class Lighting {
  constructor() {
    this.sceneGroup = new THREE.Group()
    this.sunGroup   = new THREE.Group() // kept so main.js ref doesn't break

    // Warm lavender-cream ambient — cozy storybook twilight when no island is active
    const ambient = new THREE.AmbientLight(0xE8D8E8, 0.75)
    this.sceneGroup.add(ambient)

    // Warm base directional fill — gives shapes form/depth so the world isn't flat-dark
    const dir = new THREE.DirectionalLight(0xFFE6CC, 0.28)
    dir.position.set(30, 40, 20)
    this.sceneGroup.add(dir)

    // Tracking sun — warm golden, intensity starts at 0, driven by main.js
    // Rises and swings to face each island as the character approaches it
    this.sunLight = new THREE.DirectionalLight(0xFFD080, 0)
    this.sunLight.position.set(50, 40, 20)
    this.sunLight.castShadow = true
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.camera.near   = 1
    this.sunLight.shadow.camera.far    = 300
    this.sunLight.shadow.camera.left   = -50
    this.sunLight.shadow.camera.right  = 50
    this.sunLight.shadow.camera.top    = 50
    this.sunLight.shadow.camera.bottom = -50
    this.sceneGroup.add(this.sunLight)
    this.sceneGroup.add(this.sunLight.target) // target stays at world origin

    // About / explore: a second sun — an exact copy of this.sunLight, mirrored
    // to the opposite side of the character so he's lit evenly from both sides
    // (no dark side). main.js positions it + matches its colour/power each frame.
    this.presentationSun2 = new THREE.DirectionalLight(0xFFD080, 0)
    this.sceneGroup.add(this.presentationSun2)
    this.sceneGroup.add(this.presentationSun2.target)
  }
}

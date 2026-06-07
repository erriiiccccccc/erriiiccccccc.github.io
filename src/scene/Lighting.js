import * as THREE from 'three'

export class Lighting {
  constructor() {
    this.sceneGroup = new THREE.Group()
    this.sunGroup   = new THREE.Group() // kept so main.js ref doesn't break

    // Flat, even illumination — no dramatic shadows or golden-hour effects
    const ambient = new THREE.AmbientLight(0xffffff, 3.5)
    this.sceneGroup.add(ambient)

    // Soft directional for just a hint of depth/shadow
    const dir = new THREE.DirectionalLight(0xffffff, 1.0)
    dir.position.set(30, 40, 20)
    dir.castShadow = true
    dir.shadow.mapSize.set(1024, 1024)
    dir.shadow.camera.near   = 1
    dir.shadow.camera.far    = 300
    dir.shadow.camera.left   = -50
    dir.shadow.camera.right  = 50
    dir.shadow.camera.top    = 50
    dir.shadow.camera.bottom = -50
    this.sceneGroup.add(dir)
  }
}

import * as THREE from 'three';

// NES-style solid sky — no smooth atmospheric gradient
export function createSky(scene) {
  scene.background = new THREE.Color(0x5c94fc); // classic NES sky blue
  scene.fog = new THREE.Fog(0x5c94fc, 35, 100);
}

import * as THREE from 'three';

export function createLighting(scene) {
  // Strong ambient so flat-shaded faces all read clearly
  const ambient = new THREE.AmbientLight(0xffffff, 0.75);
  scene.add(ambient);

  // One directional for a bit of directional color variation
  const sun = new THREE.DirectionalLight(0xfff4c0, 0.9);
  sun.position.set(40, 60, 30);
  scene.add(sun);

  return sun;
}

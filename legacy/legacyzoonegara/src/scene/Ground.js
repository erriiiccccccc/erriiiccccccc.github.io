import * as THREE from 'three';

export function createGround(scene) {
  // Elongated ellipse matching Zoo Negara's roughly oval shape
  const shape = new THREE.Shape();
  shape.absellipse(0, 0, 54, 78, 0, Math.PI * 2, false, 0);

  const geo = new THREE.ShapeGeometry(shape, 48);
  geo.rotateX(-Math.PI / 2);

  const mat = new THREE.MeshStandardMaterial({ color: 0x58b858, roughness: 1, flatShading: true });
  const ground = new THREE.Mesh(geo, mat);
  scene.add(ground);
  return ground;
}

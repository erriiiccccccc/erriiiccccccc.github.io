import * as THREE from 'three';

const TRUNK = new THREE.MeshStandardMaterial({ color: 0x784800, flatShading: true });
const LEAF  = new THREE.MeshStandardMaterial({ color: 0x007800, flatShading: true });
const LEAF2 = new THREE.MeshStandardMaterial({ color: 0x005000, flatShading: true });

function makeTree(scene, x, z, h) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(h * 0.18, h * 0.45, h * 0.18), TRUNK);
  trunk.position.y = h * 0.22;
  g.add(trunk);
  for (const [w, y, mat] of [
    [h * 0.76, h * 0.58, LEAF],
    [h * 0.58, h * 0.78, LEAF],
    [h * 0.38, h * 0.96, LEAF2],
  ]) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h * 0.22, w), mat);
    b.position.y = y;
    g.add(b);
  }
  g.position.set(x, 0, z);
  scene.add(g);
}

export function createEnvironment(scene) {
  // Two staggered rings following the ellipse boundary
  const RX1 = 55, RZ1 = 80;
  const RX2 = 61, RZ2 = 86;
  const COUNT = 52;

  for (let i = 0; i < COUNT; i++) {
    const a  = (i / COUNT) * Math.PI * 2;
    const a2 = ((i + 0.5) / COUNT) * Math.PI * 2;
    const h1 = 2.5 + Math.abs(Math.sin(i * 1.3)) * 2.5;
    const h2 = 2.0 + Math.abs(Math.cos(i * 1.7)) * 2.2;

    makeTree(scene, Math.sin(a) * RX1, Math.cos(a) * RZ1, h1);
    makeTree(scene, Math.sin(a2) * RX2, Math.cos(a2) * RZ2, h2);
  }
}

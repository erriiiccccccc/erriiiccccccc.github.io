import * as THREE from 'three';

export function createCamera(renderer) {
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 4, 8);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const _target = new THREE.Vector3();
  const _ideal = new THREE.Vector3();

  function update(dt, controls, walker) {
    const yaw = controls.yaw;
    const offsetX = Math.sin(yaw + Math.PI) * 7.8;
    const offsetZ = Math.cos(yaw + Math.PI) * 7.8;
    _ideal.set(
      walker.position.x + offsetX,
      walker.position.y + 3.8,
      walker.position.z + offsetZ
    );

    const alpha = 1 - Math.exp(-dt * 5);
    camera.position.lerp(_ideal, alpha);

    _target.set(walker.position.x, walker.position.y + 1.5, walker.position.z);
    camera.lookAt(_target);
  }

  return { camera, update };
}

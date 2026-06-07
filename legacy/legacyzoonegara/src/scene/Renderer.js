import * as THREE from 'three';

const PIXEL_SCALE = 4; // render at 1/4 native res, upscale 4x → chunky pixels

function lowResSize() {
  return [
    Math.floor(window.innerWidth  / PIXEL_SCALE),
    Math.floor(window.innerHeight / PIXEL_SCALE),
  ];
}

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.shadowMap.enabled = false; // flat shading + shadows don't mix well
  renderer.setPixelRatio(1);

  const [w, h] = lowResSize();
  renderer.setSize(w, h);

  const canvas = renderer.domElement;
  canvas.style.width  = '100vw';
  canvas.style.height = '100vh';
  canvas.style.imageRendering = 'pixelated';
  document.body.appendChild(canvas);

  window.addEventListener('resize', () => {
    const [rw, rh] = lowResSize();
    renderer.setSize(rw, rh);
    canvas.style.width  = '100vw';
    canvas.style.height = '100vh';
  });

  return renderer;
}

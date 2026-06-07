import * as THREE from 'three';
import { createRenderer } from './scene/Renderer.js';
import { createSky } from './scene/Sky.js';
import { createGround } from './scene/Ground.js';
import { createLighting } from './scene/Lighting.js';
import { createEnvironment } from './scene/Environment.js';
import { createWorld } from './world/World.js';
import { createCharacter } from './character/Character.js';
import { createControls } from './character/Controls.js';
import { createCamera } from './character/Camera.js';
import { createMobileControls } from './ui/MobileControls.js';

const renderer = createRenderer();
const scene = new THREE.Scene();
const clock = new THREE.Clock();

createSky(scene);
createGround(scene);
createLighting(scene);
createEnvironment(scene);
createWorld(scene);

const { walker, update: updateCharacter } = createCharacter(scene);
const controls = createControls();
const { camera, update: updateCamera } = createCamera(renderer);

function mobileJump() {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
  setTimeout(() => window.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' })), 80);
}
createMobileControls(controls.keys, mobileJump);

function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  controls.update(dt);
  updateCharacter(dt, controls);
  updateCamera(dt, controls, walker);
  renderer.render(scene, camera);
}

loop();

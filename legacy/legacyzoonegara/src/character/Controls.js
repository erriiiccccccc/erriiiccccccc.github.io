import * as THREE from 'three';

const WALK     = 4.0;
const SPRINT   = 6.4;
const TURN     = 2.3;
const GRAVITY  = -18;
const JUMP_VEL = 7.0;
const GROUND_Y = 0;
// Elliptical world boundary matching the ground shape
const BND_RX   = 50;
const BND_RZ   = 73;

export function createControls() {
  const keys = new Set();

  // Spawn in entrance plaza in front of ticket machines, facing the grand gate
  let yaw      = Math.PI;
  let velocity = 0;
  let vertVel  = 0;
  const position = new THREE.Vector3(0, GROUND_Y, 68);

  window.addEventListener('keydown', e => {
    keys.add(e.key);
    if ((e.key === ' ' || e.key === 'Spacebar') && vertVel === 0 && position.y <= GROUND_Y + 0.01) {
      vertVel = JUMP_VEL;
    }
  });
  window.addEventListener('keyup', e => keys.delete(e.key));

  function update(dt) {
    const forward = keys.has('w') || keys.has('W') || keys.has('ArrowUp');
    const back    = keys.has('s') || keys.has('S') || keys.has('ArrowDown');
    const left    = keys.has('a') || keys.has('A') || keys.has('ArrowLeft');
    const right   = keys.has('d') || keys.has('D') || keys.has('ArrowRight');
    const sprint  = keys.has('Shift');

    if (left)  yaw += TURN * dt;
    if (right) yaw -= TURN * dt;

    const targetSpeed = forward ? (sprint ? SPRINT : WALK)
                      : back    ? -(sprint ? SPRINT : WALK) * 0.6
                      : 0;
    velocity += (targetSpeed - velocity) * Math.min(1, dt * 10);

    const moveDir = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
    position.addScaledVector(moveDir, velocity * dt);

    // Elliptical boundary: normalize to unit circle, clamp, denormalize
    const nx = position.x / BND_RX;
    const nz = position.z / BND_RZ;
    const nd = Math.sqrt(nx * nx + nz * nz);
    if (nd > 1) {
      position.x = (nx / nd) * BND_RX;
      position.z = (nz / nd) * BND_RZ;
    }

    // Vertical / jump
    vertVel += GRAVITY * dt;
    position.y += vertVel * dt;
    if (position.y <= GROUND_Y) {
      position.y = GROUND_Y;
      vertVel = 0;
    }
  }

  return {
    keys,
    get yaw()      { return yaw; },
    get velocity() { return velocity; },
    get moving()   { return Math.abs(velocity) > 0.05; },
    position,
    update,
  };
}

import * as THREE from 'three';

// NES-ish palette, flat
const C = {
  skin:  0xfcbcb0,
  shirt: 0x3050c8,  // NES blue zookeeper shirt
  pants: 0xc89838,  // golden khaki
  boot:  0x301800,  // very dark brown
  hat:   0x006800,  // NES dark green
  belt:  0x181008,
  eye:   0x000018,
  btn:   0xf83800,  // small badge/button detail on shirt
};

function mat(color) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true });
}
function box(w, h, d, color) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
}

function makeArm(side) {
  const root  = new THREE.Group();
  root.position.set(side * 0.31, 0, 0);

  const upper = box(0.17, 0.3, 0.17, C.shirt);
  upper.position.y = -0.15;
  root.add(upper);

  const elbow = new THREE.Group();
  elbow.position.y = -0.32;
  root.add(elbow);

  const lower = box(0.15, 0.26, 0.15, C.skin);
  lower.position.y = -0.13;
  elbow.add(lower);

  const hand = box(0.16, 0.13, 0.16, C.skin);
  hand.position.y = -0.27;
  elbow.add(hand);

  return { root, elbow };
}

function makeLeg(side) {
  const root = new THREE.Group();
  root.position.set(side * 0.125, 0, 0);

  const thigh = box(0.24, 0.32, 0.24, C.pants);
  thigh.position.y = -0.16;
  root.add(thigh);

  const knee = new THREE.Group();
  knee.position.y = -0.34;
  root.add(knee);

  const shin = box(0.22, 0.28, 0.22, C.pants);
  shin.position.y = -0.14;
  knee.add(shin);

  const boot = box(0.24, 0.14, 0.32, C.boot);
  boot.position.set(0, -0.32, 0.04);
  knee.add(boot);

  return { root, knee };
}

export function createCharacter(scene) {
  const walker = new THREE.Group();
  const hips   = new THREE.Group();
  hips.position.y = 0.9;
  walker.add(hips);

  // torso
  const torso = box(0.52, 0.58, 0.32, C.shirt);
  torso.position.y = 0.29;
  hips.add(torso);

  // badge dot on shirt
  const badge = box(0.07, 0.07, 0.01, C.btn);
  badge.position.set(-0.14, 0.38, 0.165);
  hips.add(badge);

  // belt
  const belt = box(0.54, 0.07, 0.34, C.belt);
  belt.position.y = 0.01;
  hips.add(belt);

  // neck
  const neck = box(0.16, 0.1, 0.16, C.skin);
  neck.position.y = 0.62;
  hips.add(neck);

  // head — slightly wider than tall for cartoony look
  const head = box(0.46, 0.42, 0.42, C.skin);
  head.position.y = 0.87;
  hips.add(head);

  // eyes — two dark pixels on front face
  [-1, 1].forEach(s => {
    const eye = box(0.07, 0.07, 0.02, C.eye);
    eye.position.set(s * 0.11, 0.89, 0.22);
    hips.add(eye);
  });

  // hat brim (wide flat box)
  const brim = box(0.7, 0.07, 0.66, C.hat);
  brim.position.y = 1.11;
  hips.add(brim);

  // hat crown
  const crown = box(0.42, 0.3, 0.42, C.hat);
  crown.position.y = 1.28;
  hips.add(crown);

  // arms
  const armL = makeArm(-1);
  const armR = makeArm(1);
  const shoulderY = new THREE.Group();
  shoulderY.position.y = 0.24;
  hips.add(shoulderY);
  shoulderY.add(armL.root);
  shoulderY.add(armR.root);

  // legs
  const hipPivot = new THREE.Group();
  hips.add(hipPivot);
  const legL = makeLeg(-1);
  const legR = makeLeg(1);
  hipPivot.add(legL.root);
  hipPivot.add(legR.root);

  scene.add(walker);

  let stride = 0;

  function update(dt, controls) {
    walker.position.x = controls.position.x;
    walker.position.z = controls.position.z;
    walker.position.y = controls.position.y;
    walker.rotation.y = controls.yaw;

    stride += controls.velocity * dt * 2.2;
    const swing = Math.sin(stride) * (controls.moving ? 0.8 : 0.04);

    legL.root.rotation.x = -swing * 0.7;
    legR.root.rotation.x =  swing * 0.7;
    legL.knee.rotation.x  = Math.max(0,  swing) * 0.65;
    legR.knee.rotation.x  = Math.max(0, -swing) * 0.65;
    armL.root.rotation.x  =  swing * 0.5;
    armR.root.rotation.x  = -swing * 0.5;
    hips.position.y = 0.9 + Math.abs(Math.sin(stride * 2)) * 0.045;
  }

  return { walker, update };
}

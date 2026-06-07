import * as THREE from 'three';
import { makeEntranceComplex } from './Entrance.js';

// ── Shared materials ──────────────────────────────────────────────────────────
const PATH_MAT   = new THREE.MeshStandardMaterial({ color: 0xb0a898, flatShading: true, side: THREE.DoubleSide });
const LAKE_MAT   = new THREE.MeshStandardMaterial({ color: 0x1a4a8a, flatShading: true });
const STRIPE_MAT = new THREE.MeshStandardMaterial({ color: 0xdd5500, flatShading: true, side: THREE.DoubleSide });
const POST_MAT   = new THREE.MeshStandardMaterial({ color: 0x2a1000, flatShading: true });
const GATE_MAT   = new THREE.MeshStandardMaterial({ color: 0x2d5a1b, flatShading: true });

function flat(color) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true });
}

// ── Zones (left = west/negative x, right = east/positive x) ──────────────────
const ZONES = [
  { id: 'hornbill',  label: 'HORNBILL CTR',    sub: '// Nature',        cx: -28, cz:  32, w: 20, d: 18, color: 0x2d6e30,
    branch: [[-3, 32], [-18, 32]] },
  { id: 'aquarium',  label: 'AQUARIUM',          sub: '// Contact',       cx:  28, cz:  18, w: 20, d: 18, color: 0x1a3880,
    branch: [[-5, 20], [8, 20], [18, 18]] },
  { id: 'catwalk',   label: 'CAT WALK',          sub: '// Experience',    cx: -32, cz:   8, w: 24, d: 20, color: 0x181818, stripe: true,
    branch: [[-8, 12], [-8, 8], [-20, 8]] },
  { id: 'reptile',   label: 'REPTILE HOUSE',     sub: '// Side Projects', cx:  30, cz:  -2, w: 22, d: 18, color: 0x3d4820,
    branch: [[-3, -1], [10, -1], [19, -2]] },
  { id: 'savannah',  label: 'SAVANNAH WALK',     sub: '// Projects',      cx:  33, cz: -18, w: 30, d: 26, color: 0xd4a056,
    branch: [[2, -14], [14, -17], [18, -18]] },
  { id: 'panda',     label: 'PANDA CENTRE',      sub: '// About Me',      cx: -30, cz: -20, w: 22, d: 18, color: 0x7aad5a,
    branch: [[0, -20], [-14, -20], [-19, -20]] },
  { id: 'ape',       label: 'APE CENTRE',        sub: '// Skills',        cx: -30, cz: -36, w: 22, d: 16, color: 0x7a5030,
    branch: [[-2, -34], [-14, -35], [-19, -36]] },
  { id: 'children',  label: "CHILDREN'S WORLD",  sub: '// Fun',           cx: -15, cz: -50, w: 18, d: 14, color: 0xe87830,
    branch: [[-1, -44], [-6, -48], [-6, -50]] },
  { id: 'penguin',   label: 'PENGUIN ENCLOSURE', sub: '// ...',           cx:  18, cz: -49, w: 16, d: 14, color: 0xc8dff0,
    branch: [[-1, -44], [8, -47], [10, -49]] },
];

// Main winding path centerline — runs from entrance plaza through gate into zoo
const MAIN_PATH_PTS = [
  [0,  68],   // entrance plaza (ticket area)
  [0,  54],   // through grand gate arch
  [0,  42],   // just inside zoo
  [-4, 28],   // curve left, lake on right
  [-8, 16],   // cat walk territory
  [-7,  5],   // slight right kink
  [-2, -5],   // centering
  [2,  -16],  // slight right, savannah east
  [-1, -28],  // heading to panda/ape
  [-1, -40],  // children's world area
  [0,  -54],  // entrance B
];

// ── Curved path ribbon mesh ───────────────────────────────────────────────────
function buildPath(scene, pts2d, width, mat) {
  const curve = new THREE.CatmullRomCurve3(
    pts2d.map(([x, z]) => new THREE.Vector3(x, 0, z))
  );

  const N = 100;
  const samples = curve.getPoints(N);
  const verts = [];
  const idx   = [];

  for (let i = 0; i <= N; i++) {
    const p    = samples[i];
    const prev = samples[Math.max(0, i - 1)];
    const next = samples[Math.min(N, i + 1)];
    const tx   = next.x - prev.x;
    const tz   = next.z - prev.z;
    const tl   = Math.sqrt(tx * tx + tz * tz) || 1;
    // perpendicular in XZ
    const px = -tz / tl;
    const pz =  tx / tl;
    const hw = width / 2;

    verts.push(
      p.x + px * hw, 0.025, p.z + pz * hw,  // left
      p.x - px * hw, 0.025, p.z - pz * hw   // right
    );

    if (i < N) {
      const b = i * 2;
      idx.push(b, b + 2, b + 1,  b + 1, b + 2, b + 3);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  scene.add(new THREE.Mesh(geo, mat));
}

// ── Sign post ─────────────────────────────────────────────────────────────────
function makeSignTexture(label, sub) {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#1a0800';
  ctx.fillRect(0, 0, 128, 64);
  ctx.strokeStyle = '#c87020';
  ctx.lineWidth = 3;
  ctx.strokeRect(3, 3, 122, 58);
  ctx.fillStyle = '#ffe080';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(label, 64, 23);
  ctx.fillStyle = '#a06820';
  ctx.font = '9px monospace';
  ctx.fillText(sub, 64, 44);
  return new THREE.CanvasTexture(c);
}

function makeSign(scene, x, z, label, sub, ry) {
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.4, 0.15), POST_MAT);
  post.position.set(x, 1.2, z);
  scene.add(post);

  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 0.9, 0.08),
    new THREE.MeshStandardMaterial({ map: makeSignTexture(label, sub) })
  );
  panel.position.set(x, 2.3, z);
  panel.rotation.y = ry;
  scene.add(panel);
}

// ── Zone ground + branch path + sign ─────────────────────────────────────────
function makeZone(scene, zone) {
  // Ground patch
  const geo = new THREE.PlaneGeometry(zone.w, zone.d);
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, flat(zone.color));
  mesh.position.set(zone.cx, 0.02, zone.cz);
  scene.add(mesh);

  // Cat Walk orange stripe
  if (zone.stripe) {
    const sg = new THREE.PlaneGeometry(zone.w, 1.4);
    sg.rotateX(-Math.PI / 2);
    const stripe = new THREE.Mesh(sg, STRIPE_MAT);
    stripe.position.set(zone.cx, 0.035, zone.cz);
    scene.add(stripe);
  }

  // Branch path from main path to zone
  if (zone.branch) buildPath(scene, zone.branch, 5, PATH_MAT);

  // Sign at zone inner edge (edge closest to main path)
  const onLeft = zone.cx < 0;
  const signX  = onLeft ? zone.cx + zone.w / 2 - 1 : zone.cx - zone.w / 2 + 1;
  const signRy = onLeft ? -Math.PI / 2 : Math.PI / 2;
  makeSign(scene, signX, zone.cz, zone.label, zone.sub, signRy);
}

// ── Lake ──────────────────────────────────────────────────────────────────────
function makeLake(scene) {
  const shape = new THREE.Shape();
  shape.absellipse(0, 0, 12, 20, 0, Math.PI * 2, false, 0);
  const geo = new THREE.ShapeGeometry(shape, 24);
  geo.rotateX(-Math.PI / 2);
  const lake = new THREE.Mesh(geo, LAKE_MAT);
  lake.position.set(16, -0.05, 22); // east of main path, prominent near entrance
  scene.add(lake);

  // Small island in the lake
  const islandGeo = new THREE.CircleGeometry(2.5, 8);
  islandGeo.rotateX(-Math.PI / 2);
  const island = new THREE.Mesh(islandGeo, flat(0x3a7a30));
  island.position.set(16, 0.0, 22);
  scene.add(island);

  // Tree on island
  const trunk = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 1.2, 0.3),
    flat(0x784800)
  );
  trunk.position.set(16, 0.6, 22);
  scene.add(trunk);
  const canopy = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 1.2, 2.0),
    flat(0x007800)
  );
  canopy.position.set(16, 1.6, 22);
  scene.add(canopy);
}


// ── Main world builder ────────────────────────────────────────────────────────
export function createWorld(scene) {
  // Main winding path
  buildPath(scene, MAIN_PATH_PTS, 6, PATH_MAT);

  // All zones
  for (const zone of ZONES) makeZone(scene, zone);

  // Lake
  makeLake(scene);

  // Entrance complex (gate, booths, machines, barriers, map board)
  makeEntranceComplex(scene);
}

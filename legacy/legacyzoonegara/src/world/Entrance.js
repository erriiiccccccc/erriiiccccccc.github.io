import * as THREE from 'three';

// ── Helpers ───────────────────────────────────────────────────────────────────
function flat(color) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true });
}

// Place a box whose BOTTOM sits at baseY
function b(scene, x, baseY, z, w, h, d, color) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), flat(color));
  m.position.set(x, baseY + h / 2, z);
  scene.add(m);
  return m;
}

function canvasTex(draw) {
  const c = document.createElement('canvas');
  draw(c);
  return new THREE.CanvasTexture(c);
}

function signMesh(scene, x, y, z, w, h, ry, draw) {
  const tex = canvasTex(draw);
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, 0.1),
    new THREE.MeshStandardMaterial({ map: tex })
  );
  m.position.set(x, y, z);
  m.rotation.y = ry;
  scene.add(m);
}

// ── Grand Gate Arch ───────────────────────────────────────────────────────────
function makeGrandGate(scene, z) {
  const PILLAR  = 0x2d5a1b;
  const BEAM    = 0x1a4010;
  const GOLD    = 0xddaa00;
  const LANTERN = 0xff8800;

  // Outer pillars
  for (const x of [-6.5, 6.5]) {
    b(scene, x, 0, z, 0.9, 7.5, 0.9, PILLAR);       // shaft
    b(scene, x, 7.5, z, 1.4, 0.5, 1.4, BEAM);        // capital
    b(scene, x, 8.0, z, 0.9, 0.8, 0.9, PILLAR);      // decorative top block
    b(scene, x, 8.8, z, 0.5, 0.5, 0.5, GOLD);        // gold finial
    // Lantern hanging inside
    b(scene, x * 0.62, 5.8, z, 0.4, 0.7, 0.4, LANTERN);
    b(scene, x * 0.62, 5.2, z, 0.25, 0.3, 0.25, 0xffcc44);
  }

  // Inner pillars
  for (const x of [-3.2, 3.2]) {
    b(scene, x, 0, z, 0.65, 5.8, 0.65, PILLAR);
    b(scene, x, 5.8, z, 1.0, 0.4, 1.0, BEAM);
  }

  // Top beam outer→outer
  b(scene, 0, 7.2, z, 13.5, 0.55, 0.55, BEAM);

  // Mid beam inner→inner
  b(scene, 0, 5.4, z, 7.0, 0.4, 0.4, BEAM);

  // Decorative horizontal bars between outer and inner
  for (const x of [-4.85, 4.85]) {
    b(scene, x, 6.5, z, 0.3, 0.3, 0.3, GOLD);
  }
  b(scene, 0, 7.75, z, 14.0, 0.3, 0.3, GOLD);

  // Main sign board
  signMesh(scene, 0, 6.6, z - 0.05, 6.2, 1.3, 0, c => {
    c.width = 256; c.height = 56;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0a2208';
    ctx.fillRect(0, 0, 256, 56);
    ctx.strokeStyle = '#ddaa00';
    ctx.lineWidth = 3;
    ctx.strokeRect(3, 3, 250, 50);
    ctx.fillStyle = '#ffff44';
    ctx.font = 'bold 26px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ZOO NEGARA', 128, 30);
  });

  // Smaller subtitle sign
  signMesh(scene, 0, 5.55, z - 0.05, 5.8, 0.7, 0, c => {
    c.width = 256; c.height = 32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#1a4010';
    ctx.fillRect(0, 0, 256, 32);
    ctx.fillStyle = '#88ff88';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TAMAN NEGARA ZOO  •  KUALA LUMPUR', 128, 16);
  });
}

// ── Ticket Booth ──────────────────────────────────────────────────────────────
function makeTicketBooth(scene, x, z) {
  const WALL   = 0xe8d8b0;
  const ROOF   = 0xaa1a00;
  const GLASS  = 0x223868;
  const TRIM   = 0x7a5020;
  const ROOFTOP = 0x881400;

  const W = 3.8, H = 3.2, D = 3.4;

  // Body
  b(scene, x, 0, z, W, H, D, WALL);

  // Roof main
  b(scene, x, H, z, W + 1.0, 0.4, D + 1.0, ROOF);
  b(scene, x, H + 0.4, z, W + 0.3, 0.25, D + 0.3, ROOFTOP);

  // Service window (faces south = +z)
  b(scene, x, 1.2, z + D / 2 + 0.01, 2.0, 0.85, 0.08, GLASS);

  // Counter ledge below window
  b(scene, x, 0.78, z + D / 2 + 0.15, 2.3, 0.18, 0.35, TRIM);

  // Side trim lines
  b(scene, x - W / 2 + 0.08, H / 2, z, 0.12, H, D + 0.02, TRIM);
  b(scene, x + W / 2 - 0.08, H / 2, z, 0.12, H, D + 0.02, TRIM);

  // TICKET sign on roof facing south
  signMesh(scene, x, H + 0.22, z + D / 2 + 0.55, 2.5, 0.55, 0, c => {
    c.width = 128; c.height = 32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#ffdd00';
    ctx.fillRect(0, 0, 128, 32);
    ctx.fillStyle = '#1a0800';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TICKET', 64, 16);
  });

  // Queue number display (small screen above window)
  b(scene, x, 2.25, z + D / 2 + 0.01, 0.9, 0.45, 0.06, 0x002200);
  signMesh(scene, x, 2.25, z + D / 2 - 0.02, 0.85, 0.4, 0, c => {
    c.width = 64; c.height = 32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#001a00';
    ctx.fillRect(0, 0, 64, 32);
    ctx.fillStyle = '#00ff44';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(x < 0 ? 'A03' : 'B07', 32, 18);
  });
}

// ── Ticket Vending Machine ────────────────────────────────────────────────────
function makeTicketMachine(scene, x, z) {
  const BODY  = 0x2a2a38;
  const SCRN  = 0x0044cc;
  const BTN_G = 0x00aa00;
  const BTN_R = 0xcc2200;
  const TRIM  = 0x444458;

  // Body
  b(scene, x, 0, z, 0.9, 2.4, 0.56, BODY);
  // Top cap
  b(scene, x, 2.4, z, 1.0, 0.18, 0.66, TRIM);
  // Brand stripe
  b(scene, x, 2.1, z + 0.29, 0.9, 0.12, 0.02, 0x2266ff);

  // Screen
  b(scene, x, 1.55, z + 0.29, 0.7, 0.75, 0.06, SCRN);
  signMesh(scene, x, 1.55, z + 0.32, 0.65, 0.7, 0, c => {
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#001144';
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = '#44aaff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BUY', 32, 14);
    ctx.fillText('TICKET', 32, 26);
    ctx.strokeStyle = '#2266ff';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 32, 36, 16);
    ctx.fillStyle = '#88ccff';
    ctx.font = '7px monospace';
    ctx.fillText('ADULT  RM25', 32, 43);
    ctx.fillText('CHILD  RM15', 32, 53);
  });

  // Buttons
  b(scene, x - 0.2, 0.85, z + 0.29, 0.15, 0.15, 0.06, BTN_G);
  b(scene, x + 0.0, 0.85, z + 0.29, 0.15, 0.15, 0.06, BTN_G);
  b(scene, x + 0.2, 0.85, z + 0.29, 0.15, 0.15, 0.06, BTN_R);

  // Card slot
  b(scene, x, 0.56, z + 0.29, 0.48, 0.07, 0.04, 0x888888);
  // Ticket dispenser
  b(scene, x, 0.34, z + 0.29, 0.52, 0.06, 0.04, 0x222222);
}

// ── Queue Stanchion barriers ──────────────────────────────────────────────────
function makeQueueLine(scene, posts) {
  for (const [x, z] of posts) {
    b(scene, x, 0, z, 0.1, 1.05, 0.1, 0xaaaaaa);
    b(scene, x, 1.05, z, 0.22, 0.22, 0.22, 0xcccccc); // ball top
  }
  for (let i = 0; i < posts.length - 1; i++) {
    const [x1, z1] = posts[i];
    const [x2, z2] = posts[i + 1];
    const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
    const len = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
    const ang = Math.atan2(x2 - x1, z2 - z1);
    const rope = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, len), flat(0xcc3300));
    rope.position.set(cx, 0.9, cz);
    rope.rotation.y = -ang;
    scene.add(rope);
  }
}

// ── Zoo Map / Directory Board ─────────────────────────────────────────────────
function makeDirectoryBoard(scene, x, z) {
  // Two posts
  for (const ox of [-1.1, 1.1]) {
    b(scene, x + ox, 0, z, 0.18, 3.2, 0.18, 0x2a1000);
  }
  // Cross beam
  b(scene, x, 3.0, z, 2.6, 0.2, 0.2, 0x2a1000);

  signMesh(scene, x, 2.1, z - 0.06, 4.5, 2.4, 0, c => {
    c.width = 256; c.height = 160;
    const ctx = c.getContext('2d');

    ctx.fillStyle = '#0a1a08';
    ctx.fillRect(0, 0, 256, 160);
    ctx.strokeStyle = '#44aa44';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, 248, 152);

    // Title
    ctx.fillStyle = '#88ff44';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ZOO NEGARA MAP', 128, 22);

    // Draw simplified zoo outline
    ctx.strokeStyle = '#336633';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(128, 95, 80, 52, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Main path line
    ctx.strokeStyle = '#888866';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(128, 142); ctx.lineTo(122, 118); ctx.lineTo(116, 96);
    ctx.lineTo(120, 72); ctx.lineTo(128, 50);
    ctx.stroke();

    // Zone dots
    const zones = [
      { x: 98,  y: 78,  c: '#181818', l: 'CAT' },
      { x: 158, y: 88,  c: '#d4a056', l: 'SAV' },
      { x: 94,  y: 96,  c: '#7a5030', l: 'APE' },
      { x: 92,  y: 110, c: '#3d4820', l: 'REP' },
      { x: 155, y: 70,  c: '#7aad5a', l: 'PAN' },
      { x: 160, y: 105, c: '#1a3880', l: 'AQU' },
    ];
    for (const z2 of zones) {
      ctx.fillStyle = z2.c;
      ctx.fillRect(z2.x - 6, z2.y - 6, 12, 12);
      ctx.fillStyle = '#aaffaa';
      ctx.font = '7px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(z2.l, z2.x + 8, z2.y + 3);
    }

    // YOU ARE HERE
    ctx.fillStyle = '#ff2222';
    ctx.fillRect(122, 136, 12, 12);
    ctx.fillStyle = '#ff6666';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('▲ YOU ARE HERE', 128, 155);
  });
}

// ── Decorative entrance lamp posts ───────────────────────────────────────────
function makeLampPost(scene, x, z) {
  b(scene, x, 0, z, 0.2, 4.5, 0.2, 0x2d5a1b);
  b(scene, x, 4.5, z, 0.5, 0.2, 0.5, 0x1a4010);
  b(scene, x, 4.7, z, 0.35, 0.5, 0.35, 0xffee88); // light
  b(scene, x, 5.2, z, 0.4, 0.15, 0.4, 0x1a4010);  // cap
}

// ── Full entrance complex ─────────────────────────────────────────────────────
export function makeEntranceComplex(scene) {
  // Plaza floor
  const plazaGeo = new THREE.PlaneGeometry(26, 22);
  plazaGeo.rotateX(-Math.PI / 2);
  const plaza = new THREE.Mesh(plazaGeo, new THREE.MeshStandardMaterial({ color: 0x9a9090, flatShading: true }));
  plaza.position.set(0, 0.02, 61);
  scene.add(plaza);

  // Outer decorative wall segments flanking the approach
  for (const x of [-12, 12]) {
    b(scene, x, 0, 60, 0.5, 1.8, 18, 0x2d5a1b);
    b(scene, x, 1.8, 60, 0.8, 0.4, 18.4, 0x1a4010);
  }

  // Grand gate arch
  makeGrandGate(scene, 54);

  // Ticket booths (flanking the path)
  makeTicketBooth(scene, -9.5, 62);
  makeTicketBooth(scene,  9.5, 62);

  // Ticket vending machines (in pairs)
  makeTicketMachine(scene, -5.2, 66);
  makeTicketMachine(scene, -3.8, 66);
  makeTicketMachine(scene,  3.8, 66);
  makeTicketMachine(scene,  5.2, 66);

  // Queue barriers — zigzag lanes leading to booths
  makeQueueLine(scene, [[-2, 68], [-2, 65], [-2, 63], [-4, 62], [-6.5, 62]]);
  makeQueueLine(scene, [[ 2, 68], [ 2, 65], [ 2, 63], [ 4, 62], [ 6.5, 62]]);
  // Outer barriers
  makeQueueLine(scene, [[-3, 68], [-7, 68]]);
  makeQueueLine(scene, [[ 3, 68], [ 7, 68]]);

  // Directory / map board
  makeDirectoryBoard(scene, 0, 70);

  // Decorative lamp posts lining the approach
  for (const [x, z] of [[-11, 66], [11, 66], [-11, 60], [11, 60], [-11, 55], [11, 55]]) {
    makeLampPost(scene, x, z);
  }

  // Entrance B (simple exit gate at north end)
  for (const x of [-3.5, 3.5]) {
    b(scene, x, 0, -56, 0.5, 3.2, 0.5, 0x2d5a1b);
    b(scene, x, 3.2, -56, 0.8, 0.3, 0.8, 0x1a4010);
  }
  b(scene, 0, 3.0, -56, 7.5, 0.3, 0.3, 0x1a4010);
  signMesh(scene, 0, 3.0, -55.7, 4.0, 0.65, 0, c => {
    c.width = 128; c.height = 28;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#1a4010';
    ctx.fillRect(0, 0, 128, 28);
    ctx.fillStyle = '#aaffaa';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('EXIT / ENTRANCE B', 64, 14);
  });
}

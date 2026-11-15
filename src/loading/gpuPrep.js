// Getting things onto the GPU before they are first drawn, without freezing the page.
//
// Two things freeze a WebGL page the first time an object is drawn:
//   - its shader program is compiled and linked, and the browser waits for the link on the spot;
//   - its textures are uploaded (and an <img> decoded) on the spot.
// So both happen ahead of time instead:
//   - programs are issued with renderer.compile() a few objects per frame, and then only polled
//     (KHR_parallel_shader_compile) until the driver has linked them, so frames keep being drawn while
//     the GPU works. That's what renderer.compileAsync() does, but all in one go; this spreads the
//     JavaScript half of it (building each program's source) over frames too.
//   - a linked program still costs something the first time it's drawn with: three.js looks up every
//     one of its inputs (uniforms, attributes), one driver call each. Dozens of programs at once made a
//     0.2 s stall on the first frame that showed them, so that's done ahead as well, a few per frame.
//   - textures upload with renderer.initTexture(), a few per frame, inside a time budget.
//
// Shaders are compiled per render target: three.js builds different programs for the screen (tone
// mapping, sRGB output) than for an off-screen target. Everything here prepares for the screen, which
// is why none of it may run while a render target is bound.

export const nextFrame = () => new Promise(r => requestAnimationFrame(() => r()))

/**
 * Compile every material under each of `roots` for drawing to the screen: issued a few roots per frame
 * (at most `budgetMs` of a frame), then waited for in the background. Visible or not doesn't matter:
 * three compiles every material it finds. Resolves once the GPU has linked them all, or after
 * `timeoutMs` (a driver that never reports "done" must not hold anything up).
 */
export async function precompileSliced(renderer, roots, camera, scene, { budgetMs = 6, newPerFrame = 4, timeoutMs = 8000, touch = true } = {}) {
  if (renderer.getRenderTarget() !== null) throw new Error('precompile: a render target is bound')
  const materials = new Set()
  const list = [...roots].filter(Boolean)
  while (list.length) {
    // Also at most `newPerFrame` new programs a frame: even compiled in the background, each new
    // shader is first translated on the GPU process's main thread (ANGLE), and a batch of fifty there
    // held up the next frame by 0.1 s.
    const start = performance.now(), programsBefore = renderer.info.programs?.length ?? 0
    while (list.length && performance.now() - start < budgetMs && (renderer.info.programs?.length ?? 0) - programsBefore < newPerFrame) {
      for (const m of renderer.compile(list.shift(), camera, scene)) materials.add(m)
    }
    if (list.length) await nextFrame()
  }
  const all = [...materials]
  await whenLinked(renderer, materials, timeoutMs)
  if (touch) await touchPrograms(renderer, all, budgetMs)
}

/** The first-use work of each linked program (its input lookups), a few programs per frame. */
async function touchPrograms(renderer, materials, budgetMs) {
  const byProgram = new Map()
  for (const m of materials) { const p = renderer.properties.get(m).currentProgram; if (p && !byProgram.has(p)) byProgram.set(p, m) }
  const list = [...byProgram.keys()]
  while (list.length) {
    const start = performance.now()
    while (list.length && performance.now() - start < budgetMs) {
      const p = list.shift(), t = performance.now()
      try { p.getUniforms(); p.getAttributes() } catch { /* a program that failed shows its error at draw */ }
      // development: name any program whose first use is slow (the driver still finishing it, usually)
      if (import.meta.env.DEV && performance.now() - t > 20) {
        const m = byProgram.get(p)
        console.warn(`[gpuPrep] slow first use: ${(performance.now() - t).toFixed(0)} ms`, m.type, m.name || '', Object.keys(m.uniforms || {}).join(','))
      }
    }
    if (list.length) await nextFrame()
  }
}

/** The same for one subtree (the sky at boot, the character when it arrives). */
export function precompile(renderer, root, camera, scene, opts) {
  return precompileSliced(renderer, [root], camera, scene, opts)
}

/** Resolves when every material's program reports linked (checked without blocking), or at the timeout. */
function whenLinked(renderer, materials, timeoutMs) {
  const end = performance.now() + timeoutMs
  return new Promise(resolve => {
    const check = () => {
      for (const m of materials) {
        const p = renderer.properties.get(m).currentProgram
        if (!p || p.isReady()) materials.delete(m)
      }
      if (!materials.size || performance.now() > end) resolve()
      else setTimeout(check, 16)
    }
    check()
  })
}

/** Every mesh, line, point cloud and sprite under `root`: the things compile() prepares. */
export function drawablesOf(root) {
  const out = []
  root?.traverse(o => { if (o.isMesh || o.isLine || o.isPoints || o.isSprite) out.push(o) })
  return out
}

/** Every texture the materials under `root` use (maps and shader uniforms alike). */
export function texturesOf(root, into = new Set()) {
  root?.traverse(o => {
    const mats = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : []
    for (const m of mats) {
      for (const k in m) { const v = m[k]; if (v?.isTexture) into.add(v) }
      if (m.uniforms) for (const u of Object.values(m.uniforms)) if (u?.value?.isTexture) into.add(u.value)
    }
  })
  return into
}

/**
 * Upload textures a few per frame, never spending more than `budgetMs` of a frame on it (a single
 * large texture can still go over: it can't be split). Already-uploaded ones cost nothing.
 */
export async function uploadTextures(renderer, textures, budgetMs = 6) {
  const list = [...textures]
  while (list.length) {
    const start = performance.now()
    while (list.length && performance.now() - start < budgetMs) {
      const t = list.shift()
      if (!t.image && !t.isRenderTargetTexture) continue          // not loaded yet: it uploads when it is
      try { renderer.initTexture(t) } catch { /* one the renderer can't take now uploads on first draw */ }
    }
    if (list.length) await nextFrame()
  }
}

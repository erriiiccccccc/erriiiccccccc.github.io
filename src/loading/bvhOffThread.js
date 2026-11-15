// Collision trees (three-mesh-bvh) built in a worker instead of on the main thread.
//
// After landing, the world still has about 230 meshes (1.4 million triangles) without a collision
// tree, and on the main thread each one took up to 70 ms: a long run of stutters right as play
// starts. Here the main thread only copies a mesh's positions and index (about a millisecond) and
// posts them to workers/bvh.worker.js; the tree comes back built and is attached to the geometry.
//
// The live geometry is never touched while that happens: the worker gets copies (the library's own
// worker takes the originals, which would leave the mesh empty for anything reading it meanwhile), and
// the tree is "indirect", so the triangle order the GPU already has stays as it is.
import { MeshBVH } from 'three-mesh-bvh'

let worker = null
let nextId = 1
const waiting = new Map()

function getWorker() {
  if (worker) return worker
  worker = new Worker(new URL('../workers/bvh.worker.js', import.meta.url), { type: 'module' })
  worker.onmessage = ({ data }) => {
    const w = waiting.get(data.id)
    if (!w) return
    waiting.delete(data.id)
    if (data.error) w.reject(new Error(data.error))
    else w.resolve(data.serialized)
  }
  worker.onerror = (e) => {
    for (const w of waiting.values()) w.reject(new Error(e.message || 'bvh worker failed'))
    waiting.clear()
    worker = null
  }
  return worker
}

/** A tightly packed copy of an attribute's values, interleaved or not, in its own number type. */
function packedCopy(attr) {
  if (!attr.isInterleavedBufferAttribute) return attr.array.slice()
  const src = attr.data.array, stride = attr.data.stride, off = attr.offset, n = attr.count, k = attr.itemSize
  const out = new src.constructor(n * k)
  for (let i = 0, s = off, d = 0; i < n; i++, s += stride) for (let c = 0; c < k; c++) out[d++] = src[s + c]
  return out
}

/**
 * Give `geometry` a collision tree built off the main thread. Resolves once it's attached.
 * Rejects if workers aren't available or the build fails; the caller can fall back to computeBoundsTree().
 */
export function buildBoundsTreeOffThread(geometry) {
  const pos = geometry.getAttribute('position')
  if (!pos || typeof Worker === 'undefined') return Promise.reject(new Error('no worker'))
  const position = packedCopy(pos)
  const index = geometry.index ? packedCopy(geometry.index) : null
  const id = nextId++
  return new Promise((resolve, reject) => {
    waiting.set(id, { resolve, reject })
    getWorker().postMessage(
      { id, position, normalized: pos.normalized, index, groups: geometry.groups },
      [position.buffer, ...(index ? [index.buffer] : [])],
    )
  }).then(serialized => {
    geometry.boundsTree = MeshBVH.deserialize(serialized, geometry, { setIndex: false })
  })
}

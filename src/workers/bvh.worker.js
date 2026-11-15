// Builds a mesh's collision tree (three-mesh-bvh) off the main thread.
//
// Input: copies of a geometry's position and index arrays. Output: the tree, serialized, with its
// buffers transferred back. "indirect" leaves the triangle order alone (the tree keeps its own list),
// so the main thread's geometry, already on the GPU and in use, is never rearranged.
import { BufferGeometry, BufferAttribute } from 'three'
import { MeshBVH } from 'three-mesh-bvh'

self.onmessage = ({ data }) => {
  const { id, position, normalized, index, groups } = data
  try {
    const geometry = new BufferGeometry()
    // the same number type and normalisation as the original, so the tree sees exactly its values
    geometry.setAttribute('position', new BufferAttribute(position, 3, !!normalized))
    if (index) geometry.setIndex(new BufferAttribute(index, 1, false))
    for (const g of groups || []) geometry.addGroup(g.start, g.count, g.materialIndex)
    const bvh = new MeshBVH(geometry, { indirect: true })
    const serialized = MeshBVH.serialize(bvh, { cloneBuffers: false })
    const transfer = [...serialized.roots]
    if (serialized.indirectBuffer) transfer.push(serialized.indirectBuffer.buffer)
    // the index buffer comes back too, untouched (indirect), so drop it rather than send it twice
    delete serialized.index
    self.postMessage({ id, serialized }, transfer.filter(b => !(typeof SharedArrayBuffer !== 'undefined' && b instanceof SharedArrayBuffer)))
  } catch (e) {
    self.postMessage({ id, error: String(e?.message || e) })
  }
}

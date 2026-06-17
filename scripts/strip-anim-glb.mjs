// Strip a GLB down to animation-only: keep nodes (bones, with names) + the
// animation clips and their keyframe accessors; drop the mesh, skin, materials,
// textures and images. Used to turn Tripo locomotion exports (which redundantly
// embed the full mesh + 21MB texture in every file) into tiny clip-only files.
//
// Usage: node scripts/strip-anim-glb.mjs <in.glb> <out.glb>
import fs from 'fs'

const align4 = n => (n + 3) & ~3

function stripGlb(inPath, outPath) {
  const buf = fs.readFileSync(inPath)
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('not a GLB')
  const jsonLen = buf.readUInt32LE(12)
  const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'))
  const binChunkStart = 20 + jsonLen
  const binLen = buf.readUInt32LE(binChunkStart)
  const binStart = binChunkStart + 8
  const bin = buf.slice(binStart, binStart + binLen)

  const anims = json.animations || []
  if (!anims.length) throw new Error('no animations in ' + inPath)

  // 1. Collect accessors referenced by animation samplers
  const keptAcc = new Set()
  for (const a of anims)
    for (const s of a.samplers) { keptAcc.add(s.input); keptAcc.add(s.output) }

  // 2. Collect the bufferViews those accessors use
  const keptBV = new Set()
  for (const ai of keptAcc) keptBV.add(json.accessors[ai].bufferView)

  // 3. Repack kept bufferViews into a fresh bin buffer
  const bvList = [...keptBV]
  const bvMap = new Map()          // old bufferView idx -> new idx
  const newBufferViews = []
  const chunks = []
  let offset = 0
  bvList.forEach((oldIdx, newIdx) => {
    const bv = json.bufferViews[oldIdx]
    const start = align4(offset)
    if (start > offset) chunks.push(Buffer.alloc(start - offset))
    const bytes = bin.slice(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength)
    chunks.push(bytes)
    newBufferViews.push({ buffer: 0, byteOffset: start, byteLength: bv.byteLength })
    bvMap.set(oldIdx, newIdx)
    offset = start + bv.byteLength
  })
  let newBin = Buffer.concat(chunks)
  if (newBin.length % 4) newBin = Buffer.concat([newBin, Buffer.alloc(4 - (newBin.length % 4))])

  // 4. Rebuild accessors (only kept ones), remap their bufferView
  const accList = [...keptAcc]
  const accMap = new Map()
  const newAccessors = accList.map((oldIdx, newIdx) => {
    const a = json.accessors[oldIdx]
    accMap.set(oldIdx, newIdx)
    return {
      bufferView: bvMap.get(a.bufferView),
      byteOffset: a.byteOffset || 0,
      componentType: a.componentType,
      count: a.count,
      type: a.type,
      ...(a.normalized ? { normalized: true } : {}),
      ...(a.min ? { min: a.min } : {}),
      ...(a.max ? { max: a.max } : {}),
    }
  })

  // 5. Remap animation sampler accessor indices
  const newAnims = anims.map(a => ({
    name: a.name,
    channels: a.channels.map(c => ({ sampler: c.sampler, target: c.target })),
    samplers: a.samplers.map(s => ({
      input: accMap.get(s.input),
      output: accMap.get(s.output),
      interpolation: s.interpolation || 'LINEAR',
    })),
  }))

  // 6. Keep nodes (bones) but drop their mesh/skin/camera bindings
  const newNodes = (json.nodes || []).map(n => {
    const { mesh, skin, camera, ...rest } = n
    return rest
  })

  // 7. Assemble the slimmed glTF — no meshes/materials/textures/images/skins
  const out = {
    asset: json.asset || { version: '2.0' },
    scene: json.scene ?? 0,
    scenes: json.scenes || [{ nodes: newNodes.map((_, i) => i) }],
    nodes: newNodes,
    animations: newAnims,
    accessors: newAccessors,
    bufferViews: newBufferViews,
    buffers: [{ byteLength: newBin.length }],
  }

  // 8. Write GLB
  let jsonStr = JSON.stringify(out)
  while (jsonStr.length % 4) jsonStr += ' '
  const jsonBuf = Buffer.from(jsonStr, 'utf8')
  const total = 12 + 8 + jsonBuf.length + 8 + newBin.length
  const header = Buffer.alloc(12)
  header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(total, 8)
  const jsonHeader = Buffer.alloc(8)
  jsonHeader.writeUInt32LE(jsonBuf.length, 0); jsonHeader.writeUInt32LE(0x4e4f534a, 4)
  const binHeader = Buffer.alloc(8)
  binHeader.writeUInt32LE(newBin.length, 0); binHeader.writeUInt32LE(0x004e4942, 4)
  fs.writeFileSync(outPath, Buffer.concat([header, jsonHeader, jsonBuf, binHeader, newBin]))

  const inMB = (buf.length / 1048576).toFixed(1)
  const outMB = (total / 1048576).toFixed(3)
  console.log(`${inPath.split(/[\\/]/).pop()}: ${inMB}MB -> ${outMB}MB  (${newAnims.length} clip, ${newNodes.length} nodes)`)
}

const [, , inPath, outPath] = process.argv
stripGlb(inPath, outPath)

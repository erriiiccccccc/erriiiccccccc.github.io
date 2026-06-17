// Shrink an embedded GLB texture (resize + recompress) while keeping the mesh,
// skeleton and everything else intact. The Tripo export ships a 4096px 21.6MB
// PNG; this brings it down to a sensible size with no visible loss.
//
// Usage: node scripts/optimize-glb-texture.mjs <in.glb> <out.glb> [maxSize] [quality]
import fs from 'fs'
import sharp from 'sharp'

const align4 = n => (n + 3) & ~3

async function optimize(inPath, outPath, maxSize = 2048, quality = 90) {
  const buf = fs.readFileSync(inPath)
  const jsonLen = buf.readUInt32LE(12)
  const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'))
  const binStart = 20 + jsonLen + 8
  const binLen = buf.readUInt32LE(20 + jsonLen)
  const bin = buf.slice(binStart, binStart + binLen)

  if (!json.images || !json.images.length) throw new Error('no embedded images')

  // Recompress each embedded image; remember new bytes per bufferView index
  const newImageBytes = new Map()  // bufferView idx -> Buffer
  for (const img of json.images) {
    if (img.bufferView == null) continue
    const bv = json.bufferViews[img.bufferView]
    const bytes = bin.slice(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength)
    const out = await sharp(bytes)
      .resize(maxSize, maxSize, { fit: 'inside', withoutEnlargement: true })
      .flatten()                       // alpha is opaque -> drop it
      .jpeg({ quality, mozjpeg: true })
      .toBuffer()
    newImageBytes.set(img.bufferView, out)
    img.mimeType = 'image/jpeg'
    const meta = await sharp(out).metadata()
    console.log(`  texture: 4096 -> ${meta.width}px  ${(bytes.length/1048576).toFixed(1)}MB -> ${(out.length/1048576).toFixed(2)}MB`)
  }

  // Repack the bin: every bufferView in order, swapping in recompressed images
  const chunks = []
  let offset = 0
  json.bufferViews.forEach((bv, i) => {
    const start = align4(offset)
    if (start > offset) chunks.push(Buffer.alloc(start - offset))
    const bytes = newImageBytes.has(i)
      ? newImageBytes.get(i)
      : bin.slice(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength)
    chunks.push(bytes)
    bv.byteOffset = start
    bv.byteLength = bytes.length
    offset = start + bytes.length
  })
  let newBin = Buffer.concat(chunks)
  if (newBin.length % 4) newBin = Buffer.concat([newBin, Buffer.alloc(4 - (newBin.length % 4))])
  json.buffers[0].byteLength = newBin.length

  // Write GLB
  let jsonStr = JSON.stringify(json)
  while (jsonStr.length % 4) jsonStr += ' '
  const jsonBuf = Buffer.from(jsonStr, 'utf8')
  const total = 12 + 8 + jsonBuf.length + 8 + newBin.length
  const header = Buffer.alloc(12)
  header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(total, 8)
  const jh = Buffer.alloc(8); jh.writeUInt32LE(jsonBuf.length, 0); jh.writeUInt32LE(0x4e4f534a, 4)
  const bh = Buffer.alloc(8); bh.writeUInt32LE(newBin.length, 0); bh.writeUInt32LE(0x004e4942, 4)
  fs.writeFileSync(outPath, Buffer.concat([header, jh, jsonBuf, bh, newBin]))

  console.log(`${inPath.split(/[\\/]/).pop()}: ${(buf.length/1048576).toFixed(1)}MB -> ${(total/1048576).toFixed(2)}MB`)
}

const [, , inPath, outPath, maxSize, quality] = process.argv
optimize(inPath, outPath, maxSize ? +maxSize : undefined, quality ? +quality : undefined)
  .catch(e => { console.error(e); process.exit(1) })

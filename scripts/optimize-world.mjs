/**
 * Optimize assets/source/world.glb → public/world.glb
 *
 * Preserves scene-graph names (islands) by disabling flatten/join.
 *
 * Usage:
 *   npm run optimize:world              # fidelity (default — better looks)
 *   npm run optimize:world -- balanced  # smaller file, mild simplify
 *   npm run optimize:world -- small     # smallest (old aggressive pass)
 *
 * Full guide: assets/README.md
 */
import { execFileSync } from 'node:child_process'
import { existsSync, copyFileSync, mkdirSync, statSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const src = join(root, 'assets', 'source', 'world.glb')
const out = join(root, 'public', 'world.glb')
const tmp = join(root, 'assets', 'source', 'world.optimized.tmp.glb')

/** @type {Record<string, { simplify: boolean, ratio: string, error: string, texSize: string, meshopt: string }>} */
const PRESETS = {
  // Compression only — keep mesh detail. Best when quality matters.
  fidelity: {
    simplify: false,
    ratio: '1',
    error: '0.0001',
    texSize: '2048',
    meshopt: 'medium',
  },
  // Mild decimation — good size/quality balance after a globe update.
  balanced: {
    simplify: true,
    ratio: '0.75',
    error: '0.0005',
    texSize: '1536',
    meshopt: 'medium',
  },
  // Aggressive (what shipped first) — smallest download, softer detail.
  small: {
    simplify: true,
    ratio: '0.55',
    error: '0.001',
    texSize: '1024',
    meshopt: 'medium',
  },
}

const presetName = (process.argv[2] || 'fidelity').toLowerCase()
const preset = PRESETS[presetName]
if (!preset) {
  console.error(`Unknown preset "${presetName}". Use: fidelity | balanced | small`)
  process.exit(1)
}

if (!existsSync(src)) {
  console.error('Missing source:', src)
  console.error('1) Export / save your full globe as assets/source/world.glb')
  console.error('2) Re-run: npm run optimize:world')
  process.exit(1)
}

mkdirSync(dirname(out), { recursive: true })

const before = statSync(src).size
console.log(`Preset: ${presetName}`)
console.log(`Source: ${(before / 1e6).toFixed(2)} MB`)

const bin = join(root, 'node_modules', '@gltf-transform', 'cli', 'bin', 'cli.js')
if (!existsSync(bin)) {
  console.error('Missing @gltf-transform/cli — run npm install')
  process.exit(1)
}

function run(cmdArgs) {
  console.log('> gltf-transform', cmdArgs.join(' '))
  execFileSync(process.execPath, [bin, ...cmdArgs], { stdio: 'inherit', cwd: root })
}

try {
  // Keep node names / hierarchy so island detection in main.js still works.
  run([
    'optimize', src, tmp,
    '--flatten', 'false',
    '--join', 'false',
    '--instance', 'false',
    '--palette', 'false',
    '--simplify', String(preset.simplify),
    '--simplify-ratio', preset.ratio,
    '--simplify-error', preset.error,
    '--texture-compress', 'ktx2',
    '--texture-size', preset.texSize,
    '--compress', 'meshopt',
    '--meshopt-level', preset.meshopt,
  ])
} catch (err) {
  console.error('Optimization failed:', err.message)
  process.exit(1)
}

copyFileSync(tmp, out)
try { unlinkSync(tmp) } catch { /* ignore */ }

const after = statSync(out).size
console.log(`Output: ${(after / 1e6).toFixed(2)} MB (${((1 - after / before) * 100).toFixed(1)}% smaller)`)
console.log('Wrote', out)
console.log('Next: npm run dev  (or npm run build) and eyeball islands / cliffs / textures')

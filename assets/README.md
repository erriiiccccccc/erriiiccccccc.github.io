# World / globe assets — redo optimisation after updating the planet

When you export a new globe from Blender (or anywhere), **do not** drop it straight into `public/`.  
Keep the full-quality file as source, then run the pipeline below so Meshopt + KTX2 loaders in `src/main.js` keep working.

## File roles

| Path | Role |
|------|------|
| `assets/source/world.glb` | **Full-fidelity source** (edit / replace this) |
| `public/world.glb` | **Deployed** optimised file (generated — site loads this) |
| `public/basis/` | Basis/KTX2 transcoder (required at runtime for KTX2 textures) |
| `scripts/optimize-world.mjs` | The optimisation script |

## Step-by-step (every globe update)

1. **Export** your new planet as a single `.glb`.
   - Keep island object **names** exactly as the site expects (`meadow_island`, `arctic_island`, `mountain_island`, `lava_island`, `desert_island`, `pirate_ship`).
   - Keep `(terrain)` in the name of walkable meshes (used for layers / walking).

2. **Save source**
   ```text
   assets/source/world.glb   ← overwrite with the new full export
   ```

3. **Install deps** (once per machine / after pull)
   ```bash
   npm install
   ```

4. **Run optimisation** (picks a quality preset)
   ```bash
   npm run optimize:world              # fidelity (default) — compression, no heavy decimation
   npm run optimize:world -- balanced  # milder simplify + 1536px textures
   npm run optimize:world -- small     # smallest file (old aggressive pass; softer looks)
   ```
   This writes `public/world.glb`.

5. **Sanity-check locally**
   ```bash
   npm run dev
   ```
   Walk each island: silhouettes, textures, shadows, teleport targets, `(terrain)` walking.

6. **Ship**
   ```bash
   npm run build
   ```
   (Deploy as you usually do / GitHub Actions.)

7. **Optional smoke test** (loader must only dismiss at real Ready)
   ```bash
   npm run smoke
   ```

## What the optimiser does

Always (all presets):

- **No flatten / no join** — keeps node names so island detection still works
- **KTX2** texture compression (GPU-friendly; needs `public/basis/`)
- **Meshopt** geometry compression (needs `MeshoptDecoder` in `main.js`)
- Dedup / weld / prune via `gltf-transform optimize`

Preset differences:

| Preset | Simplify | Tex max | Intent |
|--------|----------|---------|--------|
| `fidelity` | off | 2048 | Best looks after a globe update (recommended) |
| `balanced` | keep ~75% verts | 1536 | Smaller download, still sharp enough |
| `small` | keep ~55% verts | 1024 | Tiny file; quality drop is noticeable |

## Runtime pieces in `src/main.js` (don’t remove when editing)

These are required for the optimised `public/world.glb`:

- `MeshoptDecoder` on `GLTFLoader`
- `KTX2Loader` + `setTranscoderPath(ASSET_BASE + 'basis/')`
- Selective shadows / FrontSide materials (performance; independent of the GLB compress)
- `LoadDirector` readiness (loader doesn’t lie about 100%)

If you temporarily need the **raw** source in the browser for A/B:

```bash
copy assets\source\world.glb public\world.glb
```

(Raw source usually has no Meshopt/KTX2 — loaders still work; file will be huge again.)

## If something breaks after a new globe

- Islands not highlighting / no teleport → node **names** changed in Blender  
- Can’t walk → missing `(terrain)` in mesh names  
- Pink/missing textures → `public/basis/` missing or wrong path  
- Decode errors → re-run `npm run optimize:world` so Meshopt/KTX2 extensions are present  
- Looks too soft → re-run with `fidelity` (default) instead of `small`

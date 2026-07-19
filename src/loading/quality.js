/**
 * Device tier + quality presets for DPR, shadows, AA, sky, and particles.
 */

/** @typedef {'low' | 'auto' | 'high'} QualityPreset */

/**
 * Heuristic GPU/CPU tier used when preset is `auto`.
 * @returns {'low' | 'mid' | 'high'}
 */
export function detectDeviceTier() {
  const mem = navigator.deviceMemory // GB, Chrome/Edge
  const cores = navigator.hardwareConcurrency || 4
  const dpr = window.devicePixelRatio || 1
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const saveData = navigator.connection?.saveData === true
  const slowNet = /2g|slow-2g/i.test(navigator.connection?.effectiveType || '')

  if (saveData || slowNet) return 'low'
  if (mem != null && mem <= 4) return 'low'
  if (isTouch && (mem == null || mem <= 6) && cores <= 4) return 'low'
  if (dpr >= 2.5 && isTouch) return 'mid'
  if (cores >= 8 && (mem == null || mem >= 8)) return 'high'
  return 'mid'
}

/**
 * Resolve concrete render settings for a user-facing quality preset.
 * @param {QualityPreset} preset
 * @param {{ tier?: string }} [opts]
 */
export function resolveQuality(preset, opts = {}) {
  const tier = opts.tier || detectDeviceTier()
  const dprCap = window.devicePixelRatio || 1

  /** @type {ReturnType<typeof baseSettings>} */
  let s
  if (preset === 'low') {
    s = baseSettings({
      dpr: 1,
      antialias: false,
      shadows: false,
      shadowMapSize: 512,
      shadowType: 'basic',
      skyTier: 'minimal',
      particleScale: 0.35,
      adaptiveDpr: false,
      glassBlur: 0,
    })
  } else if (preset === 'high') {
    s = baseSettings({
      dpr: Math.min(dprCap, 2),
      antialias: true,
      shadows: true,
      shadowMapSize: 2048,
      shadowType: 'soft',
      skyTier: 'full',
      particleScale: 1,
      adaptiveDpr: false,
      glassBlur: 14,
    })
  } else {
    // auto — scale from device tier
    if (tier === 'low') {
      s = baseSettings({
        dpr: 1,
        antialias: false,
        shadows: false,
        shadowMapSize: 512,
        shadowType: 'basic',
        skyTier: 'minimal',
        particleScale: 0.4,
        adaptiveDpr: true,
        glassBlur: 0,
      })
    } else if (tier === 'high') {
      s = baseSettings({
        dpr: Math.min(dprCap, 1.75),
        antialias: true,
        shadows: true,
        shadowMapSize: 1024,
        shadowType: 'soft',
        skyTier: 'full',
        particleScale: 1,
        adaptiveDpr: true,
        glassBlur: 14,
      })
    } else {
      s = baseSettings({
        dpr: Math.min(dprCap, 1.5),
        antialias: true,
        shadows: true,
        shadowMapSize: 1024,
        shadowType: 'basic',
        skyTier: 'standard',
        particleScale: 0.7,
        adaptiveDpr: true,
        glassBlur: 8,
      })
    }
  }

  s.preset = preset
  s.tier = tier
  return s
}

function baseSettings(partial) {
  return {
    preset: 'auto',
    tier: 'mid',
    dpr: 1,
    antialias: true,
    shadows: true,
    shadowMapSize: 1024,
    shadowType: 'soft', // 'basic' | 'soft'
    skyTier: 'standard', // 'minimal' | 'standard' | 'full'
    particleScale: 1,
    adaptiveDpr: false,
    glassBlur: 14, // CSS --glass-blur px; 0 = solid fill (cheap over WebGL)
    ...partial,
  }
}

/** Push glass blur tokens onto :root (call after resolveQuality / preset change). */
export function applyGlassCss(settings) {
  const root = document.documentElement
  const blur = settings?.glassBlur ?? 14
  root.style.setProperty('--glass-blur', `${blur}px`)
  root.classList.toggle('glass-solid', blur === 0)
}

/** Frame-time budget (ms) for adaptive DPR in auto mode. */
export const ADAPTIVE_DPR_BUDGET_MS = 18.5
export const ADAPTIVE_DPR_MIN = 1
export const ADAPTIVE_DPR_SAMPLES = 45

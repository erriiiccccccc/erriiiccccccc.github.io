/**
 * Development-only performance marks for the load pipeline.
 * Enabled when import.meta.env.DEV or ?perf=1 is present.
 */

const enabled =
  (typeof window !== 'undefined' &&
    (new URLSearchParams(window.location.search).has('perf') ||
      (typeof import.meta !== 'undefined' && import.meta.env?.DEV))) ||
  false

const marks = new Map()
const measures = []

function now() {
  return typeof performance !== 'undefined' ? performance.now() : Date.now()
}

export function perfMark(name) {
  if (!enabled) return
  const t = now()
  marks.set(name, t)
  try {
    performance.mark?.(`phf:${name}`)
  } catch { /* ignore */ }
  if (import.meta.env?.DEV) {
    console.log(`[perf] mark ${name} @ ${t.toFixed(1)}ms`)
  }
}

export function perfMeasure(name, startMark, endMark = null) {
  if (!enabled) return 0
  const start = marks.get(startMark)
  const end = endMark ? marks.get(endMark) : now()
  if (start == null || end == null) return 0
  const dur = end - start
  measures.push({ name, start, end, duration: dur })
  try {
    if (endMark) performance.measure?.(`phf:${name}`, `phf:${startMark}`, `phf:${endMark}`)
    else performance.measure?.(`phf:${name}`, `phf:${startMark}`)
  } catch { /* ignore */ }
  if (import.meta.env?.DEV) {
    console.log(`[perf] ${name}: ${dur.toFixed(1)}ms`)
  }
  return dur
}

export function perfSummary() {
  if (!enabled) return null
  const rows = measures.map(m => ({
    stage: m.name,
    ms: Math.round(m.duration),
  }))
  if (import.meta.env?.DEV || new URLSearchParams(window.location.search).has('perf')) {
    console.table(rows)
  }
  return rows
}

export function isPerfEnabled() {
  return enabled
}

/** Navigation Timing helpers (best-effort). */
export function perfNavBaseline() {
  if (!enabled || typeof performance === 'undefined') return
  try {
    const nav = performance.getEntriesByType?.('navigation')?.[0]
    if (nav) {
      console.log('[perf] TTFB:', nav.responseStart?.toFixed?.(1), 'ms | DOMContentLoaded:', nav.domContentLoadedEventEnd?.toFixed?.(1), 'ms')
    }
  } catch { /* ignore */ }
  perfMark('module_eval')
}

// Record sleeves: five colours, each with its own pattern. Drawn on a canvas,
// so a sleeve costs nothing to ship and looks the same on the record list, in
// the studio and on the gramophone's label.
export const COVERS = [
  { key: 'sunset', name: 'Sunset', a: '#ffb36b', b: '#e8577e' },
  { key: 'ocean',  name: 'Ocean',  a: '#4fd1c5', b: '#1e3a8a' },
  { key: 'meadow', name: 'Meadow', a: '#9be37a', b: '#2f8f4e' },
  { key: 'night',  name: 'Night',  a: '#3a4ba8', b: '#120a2e' },
  { key: 'plum',   name: 'Plum',   a: '#c084fc', b: '#5b21b6' },
]
export const COVER_KEYS = COVERS.map(c => c.key)
export const DEFAULT_COVER = 'sunset'
export const cleanCover = (k) => (COVER_KEYS.includes(k) ? k : DEFAULT_COVER)

/** Draw a sleeve onto a fresh square canvas. */
export function coverCanvas(key, size = 256) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const x = c.getContext('2d'), s = size
  const cv = COVERS.find(v => v.key === key) || COVERS[0]
  const g = x.createLinearGradient(0, 0, s, s)
  g.addColorStop(0, cv.a); g.addColorStop(1, cv.b)
  x.fillStyle = g; x.fillRect(0, 0, s, s)
  if (cv.key === 'sunset') {
    x.fillStyle = 'rgba(255,255,255,.22)'
    for (let i = 0; i < 7; i++) x.fillRect(0, s * 0.5 + i * s * 0.07, s, s * 0.03 * (1 - i * 0.1))
    x.fillStyle = 'rgba(255,240,200,.85)'; x.beginPath(); x.arc(s / 2, s * 0.5, s * 0.2, Math.PI, 0); x.fill()
  } else if (cv.key === 'ocean') {
    x.strokeStyle = 'rgba(255,255,255,.32)'; x.lineWidth = s * 0.025
    for (let r = 0; r < 6; r++) {
      x.beginPath()
      for (let i = 0; i <= 20; i++) {
        const px = (i / 20) * s, py = s * (0.18 + r * 0.14) + Math.sin((i / 20) * Math.PI * 4 + r) * s * 0.03
        i ? x.lineTo(px, py) : x.moveTo(px, py)
      }
      x.stroke()
    }
  } else if (cv.key === 'meadow') {
    for (let i = 0; i < 26; i++) {
      x.fillStyle = i % 4 ? 'rgba(255,255,255,.5)' : 'rgba(255,214,120,.9)'
      x.beginPath(); x.arc((i * 97) % s, (i * 61) % s, s * (0.03 + (i % 3) * 0.012), 0, 7); x.fill()
    }
  } else if (cv.key === 'night') {
    for (let i = 0; i < 40; i++) {
      x.fillStyle = `rgba(255,255,255,${0.4 + (i % 3) * 0.2})`
      x.beginPath(); x.arc((i * 131) % s, (i * 71) % s, s * (0.006 + (i % 4) * 0.004), 0, 7); x.fill()
    }
    x.fillStyle = '#fde68a'; x.beginPath(); x.arc(s * 0.66, s * 0.34, s * 0.14, 0, 7); x.fill()
    x.fillStyle = cv.b; x.beginPath(); x.arc(s * 0.72, s * 0.3, s * 0.12, 0, 7); x.fill()
  } else if (cv.key === 'plum') {
    x.fillStyle = 'rgba(255,255,255,.18)'
    const d = s / 6
    for (let i = -1; i < 7; i++) for (let j = -1; j < 7; j++) {
      if ((i + j) % 2) continue
      x.beginPath(); x.moveTo(i * d + d / 2, j * d); x.lineTo(i * d + d, j * d + d / 2)
      x.lineTo(i * d + d / 2, j * d + d); x.lineTo(i * d, j * d + d / 2); x.fill()
    }
  }
  return c
}

const _urls = new Map()
/** A small data URL for a sleeve, for CSS backgrounds. Cached. */
export function coverUrl(key) {
  const k = cleanCover(key)
  if (!_urls.has(k)) _urls.set(k, coverCanvas(k, 160).toDataURL())
  return _urls.get(k)
}

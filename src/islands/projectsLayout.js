// Justified horizontal mosaic layout — stacked flex rows, shared scroll width.
// Pure functions; no DOM. Item widths come from aspectRatio × rowHeight.
// Rows are flush-left; irregularity comes from varying aspect ratios only.

const GAP = 10
const ROW_H_MIN = 150
const ROW_H_MAX = 280
const PAD_Y = 40 // vertical room for hover grow

/**
 * @param {number} height available collage viewport height
 * @param {number} width  available collage viewport width
 */
export function pickRowCount(height, width) {
  // Cap at 2 rows — spotlight hover expands to at most two slots tall
  if (height < 300 || width < 560) return 1
  return 2
}

/**
 * @param {Array<{ id: string, type: string, aspectRatio: number }>} items
 * @param {{ width: number, height: number }} viewport
 * @returns {{
 *   rows: Array<{ items: typeof items, lead: number, trail: number }>,
 *   contentWidth: number,
 *   rowHeight: number,
 *   gap: number,
 *   rowCount: number,
 * }}
 */
export function layoutCollage(items, { width, height }) {
  const w = Math.max(280, width || 800)
  const h = Math.max(200, height || 480)
  const rowCount = pickRowCount(h, w)

  const usableH = Math.max(ROW_H_MIN, h - PAD_Y)
  let rowHeight = (usableH - GAP * (rowCount - 1)) / rowCount
  rowHeight = Math.min(ROW_H_MAX, Math.max(ROW_H_MIN, rowHeight))

  // Seed rows — flush left (lead = 0)
  const rows = Array.from({ length: rowCount }, () => ({
    items: [],
    widths: [],
    total: 0,
    lead: 0,
    trail: 0,
  }))

  // Greedy pack: shortest visual row, with soft type/AR preferences
  for (const item of items) {
    const iw = item.aspectRatio * rowHeight
    let best = 0
    let bestScore = Infinity

    for (let r = 0; r < rowCount; r++) {
      const row = rows[r]
      const last = row.items[row.items.length - 1]
      let score = row.total

      // Prefer shorter rows
      score += row.total * 0.02

      // Prefer alternating type when close
      if (last && last.type === item.type) score += iw * 0.12

      // Strongly avoid same-shaped neighbours so seams feel irregular
      if (last && Math.abs(last.aspectRatio - item.aspectRatio) < 0.35) {
        score += iw * 0.35
      }
      // Prefer mixing portrait vs landscape side by side
      if (last) {
        const lastTall = last.aspectRatio < 1
        const nextTall = item.aspectRatio < 1
        if (lastTall === nextTall) score += iw * 0.1
      }

      if (score < bestScore) {
        bestScore = score
        best = r
      }
    }

    const row = rows[best]
    row.items.push(item)
    row.widths.push(iw)
    row.total += iw + (row.items.length > 1 ? GAP : 0)
  }

  // Content span: longest row + ensure overflow past viewport
  let longest = 0
  for (const row of rows) {
    if (row.total > longest) longest = row.total
  }
  const contentWidth = Math.max(Math.ceil(w * 1.55), Math.ceil(longest + 48))

  // Trailing spacers so rows finish together (scroll length only)
  for (const row of rows) {
    row.trail = Math.max(0, contentWidth - row.total - 24)
  }

  return {
    rows: rows.map(({ items: rowItems, lead, trail }) => ({
      items: rowItems,
      lead,
      trail,
    })),
    contentWidth,
    rowHeight: Math.round(rowHeight),
    gap: GAP,
    rowCount,
  }
}

/** True if a relayout is worth running (avoids micro-jitter). */
export function shouldRelayout(prev, next) {
  if (!prev) return true
  if (prev.rowCount !== next.rowCount) return true
  if (Math.abs(prev.rowHeight - next.rowHeight) > 2) return true
  if (Math.abs(prev.contentWidth - next.contentWidth) > 8) return true
  return false
}

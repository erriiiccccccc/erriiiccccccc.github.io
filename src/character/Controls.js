// Tracks keys that are currently held. Inputs are normalised to lowercase so
// callers can `keys.has('w')` regardless of caps lock / IME state.
//
// We never preventDefault here so user-agent shortcuts (Cmd+R, Ctrl+T, etc.)
// keep working. Space's preventDefault is handled in main.js to stop page
// scrolling, which is the only key that has a side-effect we don't want.
//
// `setEnabled(false)` clears any held keys — used when a modal opens, so the
// player doesn't keep walking while focus is in the dialog.

export class Controls {
  constructor() {
    this.keys = new Set()
    this._enabled = true

    window.addEventListener('keydown', e => {
      if (!this._enabled) return
      // Ignore key events sent to text inputs / contenteditable in the future
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      this.keys.add(e.key.toLowerCase())
    })
    window.addEventListener('keyup', e => {
      this.keys.delete(e.key.toLowerCase())
    })
    // Page hidden / window blurred → release everything to avoid stuck-key drift
    window.addEventListener('blur', () => this.keys.clear())
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.keys.clear()
    })
  }

  setEnabled(enabled) {
    this._enabled = !!enabled
    if (!enabled) this.keys.clear()
  }
}

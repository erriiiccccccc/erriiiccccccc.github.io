export function createMobileControls(keys, onJump) {
  if (!('ontouchstart' in window)) return;

  const style = document.createElement('style');
  style.textContent = `
    #dpad {
      position: fixed;
      bottom: 28px;
      left: 28px;
      display: grid;
      grid-template-columns: 60px 60px 60px;
      grid-template-rows: 60px 60px 60px;
      gap: 4px;
      z-index: 100;
      user-select: none;
    }
    #dpad button {
      background: rgba(255,255,255,0.22);
      border: 2px solid rgba(255,255,255,0.45);
      border-radius: 12px;
      color: #fff;
      font-size: 24px;
      touch-action: none;
      cursor: pointer;
    }
    #dpad button:active { background: rgba(255,255,255,0.42); }
    #jump-btn {
      position: fixed;
      bottom: 48px;
      right: 36px;
      width: 72px;
      height: 72px;
      background: rgba(255,255,255,0.22);
      border: 2px solid rgba(255,255,255,0.45);
      border-radius: 50%;
      color: #fff;
      font-size: 28px;
      z-index: 100;
      touch-action: none;
      cursor: pointer;
    }
    #jump-btn:active { background: rgba(255,255,255,0.42); }
  `;
  document.head.appendChild(style);

  const pad = document.createElement('div');
  pad.id = 'dpad';
  pad.innerHTML = `
    <div></div>
    <button data-key="ArrowUp">↑</button>
    <div></div>
    <button data-key="ArrowLeft">←</button>
    <div></div>
    <button data-key="ArrowRight">→</button>
    <div></div>
    <button data-key="ArrowDown">↓</button>
    <div></div>
  `;
  document.body.appendChild(pad);

  pad.querySelectorAll('button').forEach(btn => {
    const key = btn.dataset.key;
    btn.addEventListener('touchstart', e => { e.preventDefault(); keys.add(key); }, { passive: false });
    btn.addEventListener('touchend',   e => { e.preventDefault(); keys.delete(key); }, { passive: false });
    btn.addEventListener('touchcancel', () => keys.delete(key));
  });

  const jumpBtn = document.createElement('button');
  jumpBtn.id = 'jump-btn';
  jumpBtn.textContent = '↑';
  document.body.appendChild(jumpBtn);
  jumpBtn.addEventListener('touchstart', e => { e.preventDefault(); onJump(); }, { passive: false });
}

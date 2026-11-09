// Shared concept-page behaviour. Classic script (NOT a module) so pages work when
// opened straight from disk via file:// — Chrome blocks module scripts there.
//
// Tabs: <div class="cx-tabs" role="tablist"> holding <button class="cx-tab" role="tab"
// aria-controls="pane-id" aria-selected="true|false"> children; panes are
// <section class="cx-pane" id="pane-id">. Number keys 1-9 switch the FIRST tab group
// on the page (ignored while typing, or while focus is inside a .cx-stage demo).
// Each pane receives a `cx:pane` CustomEvent ({detail:{visible}}) when shown/hidden,
// so demos can start/stop loops, videos, canvases.
//
// Also exposes window.CX = { initTabs, markNav, reduced }.
;(function () {
  function initTabs(root) {
    root = root || document
    var groups = Array.prototype.slice.call(root.querySelectorAll('.cx-tabs[role="tablist"]'))
    groups.forEach(function (list) {
      var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'))
      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab
          t.setAttribute('aria-selected', on ? 'true' : 'false')
          t.tabIndex = on ? 0 : -1
          var pane = document.getElementById(t.getAttribute('aria-controls'))
          if (!pane) return
          var wasHidden = pane.hidden
          pane.hidden = !on
          if (on && wasHidden) pane.dispatchEvent(new CustomEvent('cx:pane', { detail: { visible: true } }))
          if (!on && !wasHidden) pane.dispatchEvent(new CustomEvent('cx:pane', { detail: { visible: false } }))
        })
        if (focus) tab.focus()
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { select(t) })
        t.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault()
            var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]
            select(n, true)
          }
        })
      })
      list._select = function (idx) { if (tabs[idx]) select(tabs[idx]) }
      // Initial: hide every pane, then show the selected one (fires cx:pane visible)
      tabs.forEach(function (t) {
        var p = document.getElementById(t.getAttribute('aria-controls'))
        if (p) p.hidden = true
      })
      var fromHash = location.hash ? tabs.filter(function (t) { return '#' + t.getAttribute('aria-controls') === location.hash })[0] : null
      var initial = fromHash || tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true' })[0] || tabs[0]
      if (initial) select(initial)
    })

    if (groups[0]) {
      window.addEventListener('keydown', function (e) {
        if (e.metaKey || e.ctrlKey || e.altKey) return
        var tag = (e.target.tagName || '').toLowerCase()
        if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return
        if (e.target.closest && e.target.closest('.cx-stage')) return
        if (/^[1-9]$/.test(e.key)) groups[0]._select(Number(e.key) - 1)
      })
    }
  }

  function markNav() {
    var here = location.pathname.split('/').pop() || 'index.html'
    Array.prototype.forEach.call(document.querySelectorAll('.cx-links a'), function (a) {
      if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page')
    })
  }

  function reduced() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches }

  // Lucide-style icons (stroke 1.75). <span data-icon="left"></span> gets filled on load.
  var P = 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"'
  function svg(d, s) { return '<svg width="' + (s || 18) + '" height="' + (s || 18) + '" viewBox="0 0 24 24" ' + P + ' aria-hidden="true">' + d + '</svg>' }
  var ICONS = {
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sound: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
    mute: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
    mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
    snow: '<path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    hammer: '<path d="m15 12-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25a2.4 2.4 0 0 1-.7-1.7V7.86L16.42 5.3a5.5 5.5 0 0 0-3.9-1.6H10l1 1a4.8 4.8 0 0 1 1.4 3.4v1.6l2 2h2.2"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    shuffle: '<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/>'
  }
  function icon(name, size) { return ICONS[name] ? svg(ICONS[name], size) : '' }
  function fillIcons(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-icon]'), function (el) {
      if (!el.firstChild) el.innerHTML = icon(el.getAttribute('data-icon'), Number(el.getAttribute('data-size')) || 18)
    })
  }
  // <span class="cx-dots" data-v="4"></span> → five dots, four lit
  function fillDots(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('.cx-dots[data-v]'), function (el) {
      var v = Number(el.getAttribute('data-v')) || 0, h = ''
      for (var i = 0; i < 5; i++) h += '<i class="' + (i < v ? 'on' : '') + '"></i>'
      el.innerHTML = h
      el.setAttribute('role', 'img')
      el.setAttribute('aria-label', v + ' out of 5')
    })
  }

  window.CX = { initTabs: initTabs, markNav: markNav, reduced: reduced, icon: icon, fillIcons: fillIcons }
  document.addEventListener('DOMContentLoaded', function () {
    markNav(); fillIcons(); fillDots(); initTabs()
    // #pane-id deep links: select that option (done in initTabs) and scroll to it
    var target = location.hash && document.getElementById(location.hash.slice(1))
    if (!target) return
    if (/[?&]qa\b/.test(location.search)) {
      // QA/screenshot mode: hide everything above the target so it sits at the top, no scroll
      var nav = document.querySelector('.cx-nav'); if (nav) nav.style.display = 'none'
      var el = target
      while (el && el.parentElement && el.parentElement !== document.body) {
        var p = el.previousElementSibling
        while (p) { if (!(el === target && p.classList.contains('cx-tabs'))) p.style.display = 'none'; p = p.previousElementSibling }
        el = el.parentElement
      }
      return
    }
    setTimeout(function () { target.scrollIntoView({ block: 'start', behavior: 'instant' }) }, 120)
  })
})()

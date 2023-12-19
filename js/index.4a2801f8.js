import { S as e } from "./vendor.602a9696.js";
!(function () {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
      i(e);
    new MutationObserver((e) => {
      for (const n of e)
        if ("childList" === n.type)
          for (const e of n.addedNodes)
            "LINK" === e.tagName && "modulepreload" === e.rel && i(e);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function i(e) {
    if (e.ep) return;
    e.ep = !0;
    const i = (function (e) {
      const i = {};
      return (
        e.integrity && (i.integrity = e.integrity),
        e.referrerpolicy && (i.referrerPolicy = e.referrerpolicy),
        "use-credentials" === e.crossorigin
          ? (i.credentials = "include")
          : "anonymous" === e.crossorigin
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
        i
      );
    })(e);
    fetch(e.href, i);
  }
})();
!(function (i) {
  const n = i.querySelector(".swiper"),
    o = (e) => {
      const i = e.querySelector(".expanding-collection-cover"),
        n = e.querySelector(".expanding-collection-content");
      if (!n || !i) return;
      const { offsetWidth: o, offsetHeight: t } = i;
      e.style.setProperty("--expanding-collection-cover-height", `${t}px`);
      const { offsetHeight: c, offsetWidth: l } = n,
        r = {
          "--expanding-collection-scale-x": (o / l) * 0.95,
          "--expanding-collection-scale-y": (t / c) * 0.95,
        };
      Object.keys(r).forEach((i) => {
        e.style.setProperty(i, r[i]);
      });
    };
  new e(n, {
    speed: 600,
    resistanceRatio: 0,
    slidesPerView: "auto",
    centeredSlides: !0,
    on: {
      init(e) {
        e.slides.forEach((e) => {
          o(e);
        }),
          requestAnimationFrame(() => {
            i.classList.add("expanding-collection-initialized");
          }),
          e.slides.forEach((e) => {
            const i = e.querySelector(".expanding-collection-container"),
              n = e.querySelector(".expanding-collection-cover"),
              o = e.querySelector(".expanding-collection-content");
            (n.expandingCollectionClickHandler = () => {
              o &&
                e.classList.contains("swiper-slide-active") &&
                i.classList.toggle("expanding-collection-opened");
            }),
              n.addEventListener("click", n.expandingCollectionClickHandler);
          });
      },
      slideChange(e) {
        const i = e.wrapperEl.querySelector(".expanding-collection-opened");
        i && i.classList.remove("expanding-collection-opened");
      },
      imagesReady(e) {
        i.classList.remove("expanding-collection-initialized"),
          e.slides.forEach((e) => {
            o(e);
          }),
          i.classList.add("expanding-collection-initialized");
      },
      resize(e) {
        i.classList.remove("expanding-collection-initialized"),
          e.slides.forEach((e) => {
            o(e);
          }),
          i.classList.add("expanding-collection-initialized");
      },
      beforeDestroy(e) {
        e.slides.forEach((e) => {
          const i = e.querySelector(".expanding-collection-cover");
          i &&
            i.expandingCollectionClickHandler &&
            i.removeEventListener("click", i.expandingCollectionClickHandler);
        });
      },
    },
  });
})(document.querySelector(".expanding-collection"));

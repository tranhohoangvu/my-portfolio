/* SW: precache only .css .js .jpg .png .svg .webp */
const VERSION = "v15";
const CACHE_NAME = `portfolio-${VERSION}`;

const PRECACHE = [
  // core
  "./",
  "./index.html",

  // CSS modules
  "./css/tailwind.css",
  "./css/styles.css",
  "./css/styles.welcome.css",
  "./css/tailwind-input.css",
  "./css/base/tokens.css",
  "./css/base/animations.css",
  "./css/base/performance.css",
  "./css/layout/navbar.css",
  "./css/sections/hero.css",
  "./css/sections/projects.css",
  "./css/sections/skills.css",
  "./css/components/shared-cards.css",
  "./css/sections/contact.css",
  "./css/sections/cv.css",
  "./css/sections/about.css",
  "./css/sections/certs.css",
  "./css/sections/github.css",
  "./css/components/toast.css",
  "./css/components/fab.css",
  "./css/sections/terminal.css",
  "./css/layout/nav-rail.css",

  // Production Bundle
  "./js/bundle.min.js",

  // JS Data Modules
  "./js/data/i18n.data.js",
  "./js/data/projects.data.js",
  "./js/data/skills.data.js",
  "./js/data/certs.data.js",

  // JS Feature Modules
  "./js/modules/i18n.js",
  "./js/modules/theme.js",
  "./js/modules/carousel.js",
  "./js/modules/modal.js",
  "./js/modules/skill-linking.js",
  "./js/modules/terminal.js",
  "./js/modules/fab.js",
  "./js/modules/section-nav.js",
  "./js/modules/cert-modal.js",
  "./js/modules/cert-filter.js",
  "./js/modules/email-copy.js",
  "./js/modules/contact-form.js",
  "./js/modules/github-stats.js",
  "./js/modules/ui-interactions.js",
  "./js/scripts.js",

  // JSON Data
  "./data/projects.json",
  "./data/skills.json",

  // Assets (Icons & PWA)
  "./assets/icons/favicon.svg",
  "./assets/icons/favicon-16.png",
  "./assets/icons/favicon-32.png",
  "./assets/icons/logo-white-tile.png",
  "./assets/icons/pwa-192.png",
  "./assets/icons/pwa-512.png",

  // GitHub stats SVGs
  "./assets/github/github-contrib-dark.svg",
  "./assets/github/github-contrib-light.svg",
  "./assets/github/github-activity-dark.svg",
  "./assets/github/github-activity-light.svg",

  // Profile & Social Media
  "./assets/profile/profile1.webp",
  "./assets/profile/profile2.webp",
  "./assets/og-image-v2.png",

  // CV PDFs & Previews
  "./assets/cv/TranHoHoangVu_BE.pdf",
  "./assets/cv/TranHoHoangVu_AI.pdf",
  "./assets/cv/TranHoHoangVu_BE_preview.webp",
  "./assets/cv/TranHoHoangVu_AI_preview.webp",

  // Project images (WebP)
  "./assets/projects/coursehub.webp",
  "./assets/projects/ecommerce.webp",
  "./assets/projects/vietnamese-ocr.webp",
  "./assets/projects/nlp-translation.webp",
  "./assets/projects/stock-ml.webp",
  "./assets/projects/warehouse.webp",
  "./assets/projects/pos.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // cache từng file => không chết SW nếu 1 file sai path
    const results = await Promise.allSettled(
      PRECACHE.map(async (url) => {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`${url} -> ${res.status}`);
        await cache.put(url, res);
      })
    );

    const failed = results
      .map((r, i) => ({ r, url: PRECACHE[i] }))
      .filter(x => x.r.status === "rejected")
      .map(x => x.r.reason?.message || x.url);

    if (failed.length) {
      console.warn("[SW] Precaching skipped:", failed);
    }

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) =>
          k.startsWith("portfolio-") && k !== CACHE_NAME ? caches.delete(k) : null
        )
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Network-first for navigations
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html", { ignoreSearch: true }))
    );
    return;
  }

  // Cache-first for same-origin static assets
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then((cached) =>
        cached ||
        fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
      )
    );
  }
});

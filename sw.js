/* SW: precache only .css .js .jpg .png .svg */
const VERSION = "v3";
const CACHE_NAME = `portfolio-${VERSION}`;

const PRECACHE = [
  // core
  "./",
  "./index.html",

  // CSS (all .css you currently have)
  "./css/tailwind.css",
  "./css/styles.css",
  "./css/styles.welcome.css",
  "./css/tailwind-input.css",

  // JS (only .js)
  "./js/scripts.js",

  // Assets (images only)
  "./assets/favicon.svg",
  "./assets/favicon-16.png",
  "./assets/favicon-32.png",
  "./assets/github-contrib-dark.svg",
  "./assets/github-contrib-light.svg",
  "./assets/og-image-v2.png",
  "./assets/profile1.jpg",
  "./assets/profile2.png",
  "./assets/pwa-192.png",
  "./assets/pwa-512.png",

  // Project images
  "./assets/projects/ecommerce.png",
  "./assets/projects/pos.png",
  "./assets/projects/warehouse.png",
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

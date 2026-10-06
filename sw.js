/* Service Worker — Tran Ho Hoang Vu Portfolio
 *
 * Strategy
 *  - Navigations: network-first; only the home page is cached for offline use.
 *  - Same-origin GET assets: stale-while-revalidate, keyed by full URL
 *    (query strings are respected, so ?v=… cache-busting works).
 *  - Precache only the app shell; everything else is cached on first use.
 *
 * Bump VERSION when the precache list or the strategy changes.
 */
const VERSION = "v40";
const CACHE_NAME = `portfolio-${VERSION}`;

const PRECACHE = [
  "./",
  "./index.html",
  "./css/tailwind.css",
  // Keep these query strings in sync with index.html
  "./css/styles.css?v=28",
  "./js/bundle.min.js?v=40",
  "./site.webmanifest",
  "./assets/icons/favicon.svg",
  "./assets/icons/favicon-16.png",
  "./assets/icons/favicon-32.png",
  "./assets/icons/logo-white-tile.png",
  "./assets/icons/pwa-192.png",
  "./assets/icons/pwa-512.png",
  "./assets/profile/profile1.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Cache files one by one so a single bad path doesn't break install
    const results = await Promise.allSettled(
      PRECACHE.map(async (url) => {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`${url} -> ${res.status}`);
        await cache.put(url, res);
      })
    );

    const failed = results
      .filter((r) => r.status === "rejected")
      .map((r) => r.reason?.message);
    if (failed.length) console.warn("[SW] Precaching skipped:", failed);

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k.startsWith("portfolio-") && k !== CACHE_NAME)
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

function isHomePage(url) {
  const scope = new URL(self.registration.scope);
  return url.origin === scope.origin &&
    (url.pathname === scope.pathname || url.pathname === scope.pathname + "index.html");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Navigations: network-first, cache only the home page
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok && isHomePage(url)) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("./index.html", res.clone());
        }
        return res;
      } catch (err) {
        const cached = isHomePage(url) ? await caches.match("./index.html") : null;
        return cached || Response.error();
      }
    })());
    return;
  }

  // Only handle same-origin assets; let the browser handle CDNs, Formspree, etc.
  if (url.origin !== self.location.origin) return;

  // Live data and large documents always go to the network
  if (url.pathname.endsWith(".json") || url.pathname.endsWith(".pdf")) return;

  // Stale-while-revalidate (no ignoreSearch: ?v=… must produce a new entry)
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);

    const network = fetch(req)
      .then((res) => {
        if (res.ok && res.type === "basic") cache.put(req, res.clone());
        return res;
      })
      .catch(() => cached || Response.error());

    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    return network;
  })());
});

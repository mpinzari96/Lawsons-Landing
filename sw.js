/* Lawson's Landing Site Finder — Service Worker
 * Caches all app assets so the app works fully offline.
 * Critical for use in areas with poor cell coverage.
 */
const CACHE = 'll-finder-v1';
const ASSETS = [
  './',
  './index.html',
  './sites.json',
  './map.jpg',
  './manifest.json',
  // Fonts loaded from Google Fonts — also cached on first online use
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Cache-first strategy with network fallback for new requests
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        // Cache successful GETs
        if (resp.ok && e.request.method === 'GET') {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => cached); // Return cached if network fails
    })
  );
});

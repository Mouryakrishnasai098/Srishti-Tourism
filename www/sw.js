// Srishti Tourism service worker: caches the app shell so it opens fast and offline.
const CACHE = 'srishti-tourism-v3';
const SHELL = [
  './', './index.html', './app.js', './styles.css', './tailwind.css',
  './vendor/chart.umd.js', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // app files: cache first, refresh in background
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        caches.open(CACHE).then(c => c.put(req, res.clone())); return res;
      }).catch(() => hit);
      return hit || net;
    }));
  }
  // external requests (Wikipedia photos, fonts) go straight to the network
});

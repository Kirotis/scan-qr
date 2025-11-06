const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/static/font/Visitor.ttf',
  '/static/font/Pixeloza02Skewo.otf',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheResources)),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});

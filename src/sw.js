const cacheName = 'cache-v1';

const routes = ['/', '/static/font/Pixeloza.otf', '/static/font/Visitor.ttf'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all([
          ...cacheNames.map((name) =>
            name === cacheName ? Promise.resolve() : caches.delete(name),
          ),
          caches.open(cacheName).then((cache) => cache.addAll(routes)),
        ]),
      ),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const handleFetch = async () => {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
    const responce = await fetch(event.request);
    if (event.request.url.test(/^.*\.(js|ts|otf|ttf|html|css)/)) {
      caches
        .open(cacheName)
        .then((cache) => cache.put(event.request, responce.clone()));
    }
    return responce;
  };
  event.respondWith(handleFetch());
});

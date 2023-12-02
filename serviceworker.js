
const CACHE_NAME = 'dsx.html_v1.3_chinese_lite';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll([
        '/index.html'
      ]);
    } catch (er) {}
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        const fetchResponse = await fetch(event.request);
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (er) {}
    }
  })());
});

import { build, files, version, prerendered } from '$service-worker';

const CACHE = `cache-${version}`;
const DYNAMIC_CACHE = `offline-${version}`
const assets = new Set(build.concat(files, prerendered));

self.addEventListener('install', event => {
    console.info("[service worker] installing")
    self.skipWaiting();
    event.waitUntil(
        caches
            .open(CACHE)
            .then(cache =>{
                return cache.addAll(assets)
            })
    );
});


self.addEventListener("activate", event =>{
    event.waitUntil(
        caches.keys()
        .then(keys=>{
            return Promise.all(keys
            .filter(key => key !== CACHE && key !== DYNAMIC_CACHE)
            .map(key => caches.delete(key))
                );
            self.client.claim();
        })
        );
    console.info("[service worker] activated")
})

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(async function() {
      // Optional: Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open(DYNAMIC_CACHE);
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
});
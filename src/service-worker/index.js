import { build, files, version, prerendered } from '$service-worker';

const CACHE = `cache-${version}`;
const DYNAMIC_CACHE = `offline-${version}`
const assets = new Set(build.concat(files, prerendered));
console.log(assets)

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
                )
        })
        );
    console.info("[service worker] activated");
    return self.clients.claim();
})


self.addEventListener("fetch", event=>{
  event.respondWith(
    caches.match(event.request)
    .then(cachedResponse=>{
      if (cachedResponse)
        return cachedResponse
      return fetch(event.request)
      .then(fetchResponse=>{
        let cachedFetchResponse = fetchResponse.clone();
        caches.open(DYNAMIC_CACHE)
        .then(cache=>{
          cache.put(event.request, cachedFetchResponse)
        });
        return fetchResponse;
      })
    })
  )
})
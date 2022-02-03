import { build, files, timestamp } from '$service-worker';

const cache = `cache-${timestamp}`;
const dynamic_cache = `offline-${timestamp}`
const assets = new Set(build.concat(files));
const dynamic_pages = [
    '/'
]

self.addEventListener('install', event => {
    console.info("[service worker] installing")
    self.skipWaiting();
    event.waitUntil(
        caches
            .open(cache)
            .then(cache =>{
                return cache.addAll(assets)
            })
            .then(
            caches.open(dynamic_cache).then(cache=>{
                return cache.addAll(dynamic_pages); 
            })
            )
    );
});


self.addEventListener("activate", event =>{
    event.waitUntil(
        caches.keys()
        .then(keys=>{
            return Promise.all(keys
            .filter(key => key !== cache && key !== dynamic_cache)
            .map(key => caches.delete(key))
                )
            self.client.claim()
        })
        )
    console.info("[service worker] activated")
})


self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            if (response)
                return response;
            return fetch(event.request)
            .then(response=>{
                if (!response || response.status !== 200)
                    return response;
                return caches.open(dynamic_cache)
                .then(cache=>{
                    cache.put(event.request.url,response.clone());
                    return response;
                })
            })
        })
        )

});
import { build, files, timestamp, prerendernp } from '$service-worker';

const CACHE = `cache-${timestamp}`;
const DYNAMIC_CACHE = `offline-${timestamp}`
const assets = new Set(build.concat(files,prerendered ));

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
        self.client.claim();
    console.info("[service worker] activated")
})


self.addEventListener("fetch", event =>{
    console.log("Navigation detected");

    return fetch(event.request)
})

// self.addEventListener("fetch", event=>{
//     event.respondWith(
//         caches.match(event.request)
//         .then(cacheRes=>{
//             return cacheRes || fetch(event.request)
//         })
//     )
// })
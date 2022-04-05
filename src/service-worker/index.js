import { build, files, version, prerendered } from '$service-worker';

const CACHE = `cache-${version}`;
const DYNAMIC_CACHE = `offline-${version}`
const assets = new Set(build.concat(files, prerendered));
const networkFirstUrls = [/^\/blog\/[\w-]+\.json$/gm]

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

const networkFirst = event =>{
  /*
  With this function, the fetch is first made against the server,
  if it fails to return a response, we then rely on the cache.
  */
  return fetch(event.request)
  .then(fetchResponse=>{
    let clonedFetchResponse = fetchResponse.clone();
    caches.open(DYNAMIC_CACHE)
    .then(cache=>{
      cache.put(event.request, clonedFetchResponse)
    })
    return fetchResponse
  })
  .catch(()=>{
    return caches.match(event.request)
  })

}

const cacheFirst  = event =>{
 /* 
  First of all, it consults the cache,
  if there is no response, then it returns data from the server
  */
  return caches.match(event.request)
  .then(cacheResponse=>{
    if (cacheResponse)
      return cacheResponse
    return fetch(event.request)
    .then(fetchResponse=>{
      if (fetchResponse){
        let cachedFetchResponse = fetchResponse.clone();
        caches.open(DYNAMIC_CACHE)
        .then(cache=>{
          cache.put(event.request, cachedFetchResponse);
        });
        return fetchResponse;
      }
    })
    .catch(err=>{
      return;
    })
  })
}

self.addEventListener("fetch", event=>{
  let url = new URL(event.request.url);
  if (url.hostname === "localhost" || url.hostname === "kudadam.com"){
    /* localhost is when using sveltekit preview 
    The point of all this is to prevent the service worker from caching the hits 
    count, since it always changes, we must make sure the service worker ignores it
    */
    for (const networkurl of networkFirstUrls){
      //iterates through all the urls in the networkFirstUrls constant
      if (networkurl.test(url.pathname)){
        // if a given path matches, it responds with data from the server first
        event.respondWith((networkFirst(event)))
      }
      
      else
        event.respondWith(cacheFirst(event))
    }

  }

  else {
    event.respondWith(cacheFirst(event))
  }


  
})
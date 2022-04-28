import { build, files, version, prerendered } from '$service-worker';

const APPLICATION_CACHE = `applicationCache-${version}`;
const STATIC_CACHE = `staticCache-${version}`;
const DYNAMIC_CACHE = `dynamicCache-${version}`;
const networkFirstUrls = [/^\/blog\/[\w-]+\.json$/gm]

self.addEventListener('install', event => {
    console.info("[service worker] installing");
    event.waitUntil(
      Promise.all([
        caches.open(DYNAMIC_CACHE)
        .then(cache=>{
          cache.addAll([...prerendered,"/offline"])
        }),
        caches.open(APPLICATION_CACHE)
        .then(cache=>{
          cache.addAll(build)
        }),
        caches.open(STATIC_CACHE)
        .then(cache=>{
          cache.addAll(files)
        })
      ])
    );
});


self.addEventListener("activate", event =>{
  event.waitUntil(
      caches.keys()
      .then(keys=>{
          return Promise.all(keys
          .filter(key => key !== APPLICATION_CACHE && key !== DYNAMIC_CACHE && key !== STATIC_CACHE)
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
    .catch(async err=>{
        return caches.match("/offline")
    })
  })
}

self.addEventListener("fetch", event=>{
  
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;


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


self.addEventListener("message", async event=>{
  if (event.data === "SKIP_WAITING"){
    self.skipWaiting();
  }
})
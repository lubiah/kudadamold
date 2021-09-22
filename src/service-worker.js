import { build , files, timestamp } from "$service-worker";


const cache = `cache-${timestamp}`;
const assets = new Set(build.concat(files));
const dynamic_cache = `offline-${timestamp}`;
const dynamic_pages = [
	"/",
	"/blog",
	"/blog.json?limit=true",
	"/toolz",
	"/toolz.json",
	"/offline",
	"/about",
	"/contact"
]


const limitCacheSize = (name,size)=>{
	caches.open(name)
	.then(cache=>{
		cache.keys()
		.then(keys=>{
			if (keys.length > size){
				cache.delete(keys[0]).
				then(limitCacheSize(name,size));
			}
		})
	})
}

self.addEventListener("install", event =>{

	self.skipWaiting();
	event.waitUntil(
		caches.open(cache)
		.then(cache=>{
			return cache.addAll(assets);
		})
		.then(
			caches.open(dynamic_cache).then(cache=>{
				return cache.addAll(dynamic_pages);	
			})
			)

		)
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
})



self.addEventListener("fetch", event =>{
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if (response)
				return response
			return fetch(event.request)
			.then(fetch_res=>{
				if (!fetch_res || fetch_res.status !== 200)
					return fetch_res;
				return caches.open(dynamic_cache)
				.then(cache =>{
					cache.put(event.request.url, fetch_res.clone());
					limitCacheSize(dynamic_cache,80);
					return fetch_res;
				})
			})
			.catch(err=>{
				if (new URL(event.request.url).origin === self.location.origin && event.request.url.search("_app/pages") === 1)
				return caches.match("/offline");
			});
		})
		)
})

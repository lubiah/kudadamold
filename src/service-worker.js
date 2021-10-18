import { build , files, timestamp } from "$service-worker";


const cache = `cache-${timestamp}`;
const assets = new Set(build.concat(files));
const dynamic_cache = `offline-${timestamp}`;
const dynamic_pages = [
	"/",
	"/offline"
];

self.addEventListener("install", event =>{
	console.log("[service worker] installing...");
	console.log(assets);
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
	console.log("[service worker] activated")
})



self.addEventListener("fetch", event =>{
	if (event.request.method !== 'GET' || event.request.headers.has('range')) return;
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
					return fetch_res;
				})
			})
			.catch(err=>{
				if (event.request.mode === "cors"){
					return caches.match("offline");
				}
			});
		})
		)
})

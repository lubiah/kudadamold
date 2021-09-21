import { build , files, timestamp } from "$service-worker";


const cache = `cache-${timestamp}`;
const assets = new Set(build.concat(files));
const dynamic_cache = `offline-${timestamp}`;
const dynamic_pages = [
	"/",
	"/blog",
	"/blog.json?limit=true",
	"/blog.json?page=2",
	"/blog.json?page=3",
	"/toolz",
	"/toolz.json",
	"/offline",
	"/about",
	"/contact"
]

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
			return response || fetch(event.request)
			.then(fetch_res=>{
				return caches.open(dynamic_cache)
				.then(cache =>{
					cache.put(event.request.url, fetch_res.clone());
					return fetch_res;
				})
			})
		})
		.catch(
			()=>{
				caches.match("/offline");
			}
			)
		)
})
import { build, files, timestamp } from '$service-worker';

const CACHE_NAME = `cache-${timestamp}`;
console.log(timestamp);
const ASSETS = build.concat(files);


self.addEventListener("install", event =>{
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll(ASSETS);
		})
		);
});

self.addEventListener("activate", event =>{
	event.waitUntil(
		caches.keys().then(keys=>{
			return Promise.all(keys.filter(key=>{
				if (key !== CACHE_NAME)
					caches.delete(key);
			}));
		})
	);
	console.log(caches.keys()); 
})


self.addEventListener("fetch", event => {
	console.log(event);
	event.respondWith(
		caches.match(event.request).then(response=>{
			if (response){
				return response;
			}
			return fetch(event.request).then(res=>{
				if (!res || res.status != 200 || res.type !== "basic")
					return res;
				let cloned_response = response.clone();
				caches.open(CACHE_NAME).then(cache=>{
					cache.put(event.request, cloned_response);

				});
			})
		})
		)
})
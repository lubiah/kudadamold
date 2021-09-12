<script context="module">
	export function load({ error, status }){
		return {
			props:{
				error,
				status
			}
		}
	}	
</script>


<script>
	import SEO from "svelte-seo";
	export let status
	switch(status){
		case 404:
			message = "Hey, it seems you are lost";
			image = "https://kudadam.sirv.com/svg/astronaut.svg";
			break;
		case 500:
			message = "Sorry, Error from my server";
			image = "https://kudadam.sirv.com/svg/Error%20Server.svg";
			break;
		default:
			message = "There seems to be an error somewhere";
			image = "https://kudadam.sirv.com/svg/Error%20Server.svg";
	}
</script>

<SEO
 title = "{status} Error"	

/>

<div class="text-center">
	<h2 class="text-5xl md:text-7xl text-red-500 font-bold mt-10">{status} Error</h2>
	<p class="text-3xl mt-10">{message}</p>
	<img src="{image}" loading="lazy" alt="Error" class="block mx-auto w-full">
</div>

<style>
	img {
		height: 400px;
	}
</style>


<script>
	import SEO from "svelte-seo";
	export let status;
	let message,image;

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
		<h1 id="heading">{status} Error</h1>
		<p id="message">
			{message}
		</p>
		<img id="image" src="{image}" class="block mx-auto w-full"  alt="astronaut in space suit"/>
		
</div>

<style>
	#heading {
		@apply text-5xl md:text-7xl text-red-500 font-bold mt-8
	}

	#message {
		@apply text-2xl text-center mt-4
	}

	#image {
		height: 400px;

	}


</style>
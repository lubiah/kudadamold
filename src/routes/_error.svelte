<script>
	import SEO from "svelte-seo";
	export let status;
	export let error;
	console.log(error);	
</script>


<SEO
title = "{status} Error"
/>

<div>
	{#if status == 404}
		<h1 class="text-center text-5xl md:text-7xl text-red-500">{status} Error</h1>
		<p class="text-2xl text-center mt-4" id="message">
			Hmm..., I guess you are lost
		</p>

	{:else if status == 500}
		<h1 class="text-center text-5xl md:text-7xl text-red-500">{status} Error</h1>
		<p class="text-2xl text-center mt-4" id="message">
			Sorry, error from my server<br>
			My bad...
		</p>
	{/if}
</div>
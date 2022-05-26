<script context="module">

	import { dev } from "$app/env";

	export function load({ error, status }) {
		return {
			props: {
				error,
				status
			}
		};

	}
</script>

<script>
	import SEO from 'svelte-seo';
	export let status, error;

</script>

<SEO title="{status} Error" />
<div class="text-center" id="error_box">
	{#if status === 404}
		<h2 class="text-5xl md:text-7xl text-red-500 font-bold mt-10">{status} Error</h2>
		<p class="text-3xl mt-10">Hey, it seems you are lost😕</p>
		{#if dev}
			{error}
		{/if}
		<img
			src="https://ik.imagekit.io/kudadam/svg/astronaut.svg"
			loading="lazy"
			alt="Error"
			class="block mx-auto w-full"
		/>
	{:else if status === 500}
		<h2 class="text-5xl md:text-7xl text-red-500 font-bold mt-10">{status} Error</h2>
		<p class="text-3xl mt-10">Sorry, Error from my server</p>
		{#if dev}
			{error}
		{/if}
		<img
			src="https://ik.imagekit.io/kudadam/svg/error_server.svg"
			loading="lazy"
			alt="Error"
			class="block mx-auto w-full"
		/>
	{:else}
		<h2 class="text-5xl md:text-7xl text-red-500 font-bold mt-10">{status} Error</h2>
		<p class="text-3xl mt-10">There seem to be an error somewhere</p>
	{/if}
</div>

<style>
	img {
		height: 400px;
	}
</style>

<script context="module">
	export async function preload(page, session){
		let res = await this.fetch("/toolz.json");
		let tools = await res.json();
		return { tools }
	}
</script>

<script type="text/javascript">
	import SEO from "svelte-seo";
	export let tools;
</script>


<SEO
title = "Kudadam • Toolz"
description = "A set of tools designed and curated by me. Over here are free JavaScript based online tools. It has offline support meaning you can use it when your data is off"
/>
<div class="text-center">
	<h1 class="font-bold my-2 text-blue-500">Toolz</h1>
	<p class="text-lg"><i>A set of tools curated and designed by me</i></p>
</div>

<div class="md:mx-32">
	<ul class="divide-y divide-gray-300">
		{#each tools as tool (tool.id) }
			<li class="py-3 px-2">
				<p class="my-1 text-lg text-blue-500 font-semibold">
					<a href="{tool.url}" rel=prefetch>{tool.name}</a>
				</p>
				<p>{tool.description}</p>
			</li>
		{/each}
	</ul>
</div>
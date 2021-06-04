<script context="module">
	export async function preload(page, session){
		let res = await this.fetch("/toolz.json");
		let tools = await res.json();
		return { tools }
	}
</script>

<script type="text/javascript">
	import { afterUpdate } from "svelte";
	import SEO from "svelte-seo";
	export let tools;

	const init_database = ()=>{
		if (window.openDatabase){
			let db = openDatabase("Kudadam Tooz","1.0","Database for storing data",2*1024*1024);
			return db;
		}
	}

	afterUpdate(()=>{
		init_database();	


	})
</script>


<SEO
title = "Kudadam • Toolz"
description = "A set of tools designed and curated by me. Over here are free JavaScript based online tools. It has offline support meaning you can use it when your data is off"
keywords = "kudadam tools, javascript tools, online tools"
canonical = "https://www.kudadam.com/toolz"

openGraph = {{
	title : "Kudadam • Toolz",
	description : "A set of tools designed and curated by me. Over here are free JavaScript based online tools. It has offline support meaning you can use it when your data is off",
	url : "https://www.kudadam.com/toolz",
	type: "website",
	images: [{
		url : "https://kudadam.sirv.com/logo/logo.png",
		width: 850,
		height: 650,
		alt: "Kudadam Logo"
	}]
}}

twitter = {{
	site: "@lucretius_1",
	title: "Kudadam • Toolz",
	description: "A set of tools designed and curated by me. Over here are free JavaScript based online tools. It has offline support meaning you can use it when your data is off",
	image: "https://kudadam.sirv.com/logo/logo.png",
	imageAlt: "Kudadam Logo"
}}
/>
<div class="text-center">
	<h1 class="font-bold my-2 text-blue-500">Toolz</h1>
	<p class="text-lg"><i>A set of tools curated and designed by me</i></p>
</div>

<div class="md:mx-36 md:pl-6 my-10">
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
	<p class="text-center text-gray-500 italic">{tools.length} tools and counting...</p>
</div>

<style type="text/css">
	ul {
		padding: 0px !important;
	}
</style>
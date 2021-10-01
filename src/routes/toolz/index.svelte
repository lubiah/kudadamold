<script context="module">
	export async function load({ fetch }) {
		let res = await fetch('/toolz.json');
		let { tools } = await res.json();

		if (res.ok) {
			return {
				props: {
					tools
				}
			};
		}
	}
</script>

<script type="text/javascript">
	import SEO from 'svelte-seo';
	import * as JsSearch from "js-search";
	export let tools;
	let reserved = tools; //The reserved is a duplicate copy of the tools. It is used to reset the tools so we don't make another fetch request

	const search = new JsSearch.Search("id");
	search.addIndex("name");
	search.addDocuments(tools);

	let search_value = "";
	const search_function = async ()=>{
		if (search_value.trim().length === 0){
			tools = [...reserved];
			return;

		}
		tools = [...search.search(search_value)];
	}
</script>

<SEO
	title="Kudadam • Toolz"
	description="A set of tools designed and curated by me. Over here are free JavaScript based online tools. It has offline support meaning you can use it when your data is off"
	keywords="kudadam tools, javascript tools, online tools"
	canonical="https://www.kudadam.com/toolz"
	openGraph={{
		title: 'Kudadam • Toolz',
		description:
			'A set of tools designed and curated by me. Over here are free JavaScript based online tools. It has offline support meaning you can use it when your data is off',
		url: 'https://www.kudadam.com/toolz',
		type: 'website',
		images: [
			{
				url: 'https://kudadam.sirv.com/logo/logo.png',
				width: 850,
				height: 650,
				alt: 'Kudadam Logo'
			}
		]
	}}
	twitter={{
		site: '@lucretius_1',
		title: 'Kudadam • Toolz',
		description:
			'A set of tools designed and curated by me. Over here are free JavaScript based online tools. It has offline support meaning you can use it when your data is off',
		image: 'https://kudadam.sirv.com/logo/logo.png',
		imageAlt: 'Kudadam Logo'
	}}
/>
<div class="text-center">
	<h1 class="font-bold my-1">Toolz</h1>
	<p class="text-lg"><i>A set of tools curated and designed by me</i></p>
</div>

<div class="mt-6 block ml-auto mr-4 md:mr-32 w-[70%] md:w-[30%]">
	<input type="search" class="p-1.5 pl-3 rounded-[40px]" placeholder="Search..." bind:value={search_value} on:input={search_function}>
</div>

<div class="mx-auto md:w-2/3 md:pl-6 my-10">
	<ul class="divide-y list-none divide-gray-300 dark:divide-gray-500">
		{#each tools as tool (tool.id)}
			<li class="">
				<p class="text-lg font-semibold ">
					<a class="visited:text-[color:var(--primary-color)] dark:visited:text-[color:var(--primary-color)] hover:no-underline dark:hover:bg-gray-600 hover:bg-gray-200 py-3 px-2 block" href={tool.url} sveltekit:prefetch>
					<span class="block">{tool.name}</span>
					<p class="py-1 text-[color:var(--light-text-color)] dark:text-[color:var(--dark-text-color)] font-normal">{tool.description}</p>
				</a>
				</p>
				
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

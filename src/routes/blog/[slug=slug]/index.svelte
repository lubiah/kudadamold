<script context="module">


	export const load = async ({ fetch, params, props })=>{
		const slug = params.slug;
		let component = await import(`../_blog/${slug}/index.md`);
		component.metadata['slug'] = slug;
		return {
			props: {
				content: component.default,
				metadata: component.metadata,
				related_articles: [...props.related_articles]
			}
		}
	}
</script>
	
<script>
	import Head from 'svelte-seo';
	import Card from "$lib/Components/BlogCard";
	import Clock from "$lib/Icons/clock.svelte";
	import RectangleList from '$lib/Icons/RectangleList.svelte';
	import Tags from '$lib/Icons/Tags.svelte';
	import Eye from '$lib/Icons/Eye.svelte';
	import { snakeCase } from "$lib/Scripts/util.js";
	import { onMount } from "svelte";
	import { browser } from  "$app/env";
	import { page } from "$app/stores";
	import { theme } from "$lib/stores";
	import { importScripts } from "$lib/Scripts/util.js";

	export let metadata, content, related_articles;

	let hits, PageProgress, Cusdis;
	$: hits = 0;

	onMount(async ()=>{
		await fetch(`/blog/${metadata.slug}.json`, {
			method: "POST",
			body: JSON.stringify({"hits":"increase"})
		});
		await importScripts("https://static.addtoany.com/menu/page.js")
		Cusdis = await import("svelte-cusdis").then(e => e.default);
		await import("$lib/css/prism-tomorrow.min.css");
		let hits_response = await fetch(`/blog/${metadata.slug}.json`);
		let hits_data = await hits_response.json();
		hits = hits_data.hits;
		PageProgress = await import("$lib/Components/PageProgress").then(e => e.default);
	});
</script>

<Head
	title="{metadata.title} • Kudadam Blog"
	description={metadata.description}
	keywords={metadata.keywords}
	canonical="https://kudadam.com/blog/{metadata.slug}"
	openGraph={{
		title: `${metadata.title}`,
		description: `${metadata.description}`,
		type: 'article',
		url: `https://www.kudadam.com/blog/${metadata.slug}`,
		article: {
			publishedTime: `${metadata.date}`,
			// modifiedTime: `${post[0].last_updated}`,
			authors: [`Lucretius Biah`]
		},
		images: [
			{
				url: `${metadata.image}`,
				width: 850,
				height: 650,
				alt: 'Alt image'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: `${metadata.title}`,
		description: `${metadata.description}`,
		image: `${metadata.image}`,
		imageAlt: `${metadata.title}`
	}}

	jsonLd={{
		"@type": "TechArticle",
		headline: `${metadata.title}`,
		keywords: `${metadata.keywords}`,
		datePublished: `${new Date(metadata.date).toISOString()}`,
		image: [`${metadata.image ? metadata.image : "https://lucretius.sirv.com/logo/logo.png?q=30"}`],
		author: {
			"@type": "Person",
			"name": "Lucretius Biah",
			"url": "https://www.kudadam.com/about"
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://www.kudadam.com/blog/${metadata.slug}`
		}
	}}
/>

<main>
	<div id="page">
		<h1 class="text-center font-bold text-gray-700 capitalize dark:text-white">{metadata.title}</h1>
		<p class="flex text-base items-center justify-end gap-x-2"><Clock class="h-[0.8rem]"/> <date datetime={metadata.date}>{new Date(metadata.date).toDateString()}</date></p>
		{#if metadata.image}
				<img
				src={metadata.image}
				alt="{metadata.title}"
				id="post-image"
				class="h-56 my-4 rounded md:h-80 md:max-h-80 max-h-52 w-full"
				/>
		{/if}
		<article class="leading-tight px-2" id="content" data-slug="{metadata.slug}">
			<svelte:component this={content} />
		</article>
		<ul class="py-2 px-4 my-1 text-base pl-2 list-none gap-x-2">
			<li><span><RectangleList/> <a href="/blog/category/{snakeCase(metadata.category)}">{metadata.category}</a></span></li>
			<li class="flex gap-x-3 items-center">
				{#if metadata.tags}
				<Tags/>
					{#each metadata.tags as tag}
						<a href="/blog/tag/{tag}">#{tag}</a>
					{/each}
				{/if}
			</li>
			<li><Eye/> {hits}</li>
		</ul>
		<p class="font-bold text-lg text-[tomato] text-center">Share this article</p>
		<!-- AddToAny BEGIN -->
	<div class="a2a_kit a2a_kit_size_38 flex justify-center a2a_default_style">
		<!--svelte-ignore a11y-missing-content -->
		<!--svelte-ignore a11y-missing-attribute -->
		<a class="a2a_dd" href="https://www.addtoany.com/share"></a>
		<!--svelte-ignore a11y-missing-content -->
		<!--svelte-ignore a11y-missing-attribute -->
		<a class="a2a_button_reddit"></a>
		<!--svelte-ignore a11y-missing-attribute -->
		<!--svelte-ignore a11y-missing-content -->
		<a class="a2a_button_twitter"></a>
		<!--svelte-ignore a11y-missing-content -->
		<!--svelte-ignore a11y-missing-attribute -->
		<a class="a2a_button_hacker_news"></a>
		<!--svelte-ignore a11y-missing-content -->
		<!--svelte-ignore a11y-missing-attribute -->
		<a class="a2a_button_telegram"></a>
		<!--svelte-ignore a11y-missing-content -->
		<!--svelte-ignore a11y-missing-attribute -->
		<a class="a2a_button_whatsapp"></a>
		<!--svelte-ignore a11y-missing-content -->
		<!--svelte-ignore a11y-missing-attribute -->
		<a class="a2a_button_facebook"></a>
		<!--svelte-ignore a11y-missing-content -->
		<!--svelte-ignore a11y-missing-attribute -->
		<a class="a2a_button_pocket"></a>
		<!--svelte-ignore a11y-missing-content -->
		<!--svelte-ignore a11y-missing-attribute -->
		<a class="a2a_button_evernote"></a>
		<!--svelte-ignore a11y-missing-content -->
		<!--svelte-ignore a11y-missing-attribute -->
		<a class="a2a_button_mastodon"></a>
		<!--svelte-ignore a11y-missing-attribute -->
		
		</div>
		<script>
		var a2a_config = a2a_config || {};
		a2a_config.onclick = 1;
		</script>
		<script async src="https://static.addtoany.com/menu/page.js"></script>

		{#if browser && related_articles && related_articles.length >= 1}
			<div class="mt-[100px]">
				<h3>Related Articles</h3>
				<div class="flex overflow-auto snap-x xl:fancy-scrollbar">
					{#each related_articles as article (article.id)}
						<div class="flex">
						<Card
						title="{article.title}"
						slug="{article.slug}"
						image="{article.image}"
						excerpt="{article.excerpt}"
						date="{article.date}"
						category="{article.category}"
						class = "mr-3 w-[290px] snap-start"
						/>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		<h3>Comments</h3>
		<svelte:component this={Cusdis}
			on:load={()=>{
				window.CUSDIS.initial();
				window.CUSDIS.setTheme($theme);
			}}
			attrs = {{
				appId: "2f49c941-a723-4350-a9eb-cad6fab4772b",
				pageId: `${metadata.slug}`,
				pageUrl: `${$page.url.pathname}`,
				pageTitle: `${metadata.title}`,
				theme: `${$theme}`
			}}
		/>
	</div>

	{#if browser}
		<svelte:component this={PageProgress} color="tomato" height="5px" />
	{/if}

</main>


<style type="text/postcss">
	main {
		display: grid;
		grid-template-columns: 1fr min(65ch, 100%) 1fr;
	}
	main > div#page {
		grid-column: 2/3
	}

	article :global(h2),
	article :global(h3),
	article :global(h4),
	article :global(h5),
	article :global(h6) {
		@apply mt-[25px] mb-[10px] mx-[2px] font-semibold capitalize;
	}
	
	#content :global(img:not(#post-image)){
		@apply max-h-[500px] mx-auto my-4 rounded;
	}

	:global(.intro){
		@apply text-xl font-light italic py-6;
	}


	:global(.toc) {
		@apply my-4;
	}

	:global(.toc::before) {
		@apply font-semibold text-xl inline-block my-1;
	}


	:global(.toc ol li a){
		color: inherit;

	}

</style>

<script context="module">
	import { onMount } from 'svelte';
	import SEO from 'svelte-seo';
	import PageProgress from '$lib/Components/PageProgress.svelte';
	import 'prismjs/themes/prism-tomorrow.css';
	import _ from 'lodash';
	import { browser } from '$app/env';

	export async function load({ page, fetch }) {
		const slug = page.params.slug;

		let res = await fetch(`/blog/${slug}.json`);
		let data = await res.json();

		try {
			let component = await import(`./_blog/${slug}/index.md`);
			return {
				props: {
					metadata: component.metadata,
					content: component.default
				}
			};
		} catch (e) {}
	}
</script>

<script type="text/javascript">
	export let metadata, content;

	let __semio__params = {
    graphcommentId: "Kudadam-Website", // make sure the id is yours

    behaviour: {
      // HIGHLY RECOMMENDED
      uid: `${metadata.slug}`, // uniq identifer for the comments thread on your page (ex: your page id)
    },

    // configure your variables here

  }
 
	function __semio__onload() {
    __semio__gc_graphlogin(__semio__params)
  	}

	onMount(()=>{
		let comment_tag = document.createElement("script");
		comment_tag.async = true; comment_tag.type = "text/javascript";
		comment_tag.onload = __semio__onload; comment_tag.defer = true;
		comment_tag.src = 'https://integration.graphcomment.com/gc_graphlogin.js?' + Date.now();
		document.getElementsByTagName('head')[0].appendChild(comment_tag);


	})
</script>

<SEO
	title="{metadata.title} • Kudadam Blog"
	description={metadata.description}
	keywords={metadata.keywords}
	canonical="https://kudadam.com/blog/{metadata.url}"
	openGraph={{
		title: `${metadata.title}`,
		description: `${metadata.description}`,
		type: 'article',
		url: `https://www.kudadam.com/blog/${metadata.url}`,
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
		site: '@lucretius_1',
		title: `${metadata.title}`,
		description: `${metadata.description}`,
		image: `${metadata.image}`,
		imageAlt: `${metadata.title}`
	}}
/>

<div class="my-4" id="post">
	<div class="md:w-2/3 md:mx-auto">
		<h1 class="text-center font-bold text-gray-700 capitalize dark:text-white">{metadata.title}</h1>
		<div class="py-2 text-gray-700 dark:text-gray-300 ps-4x border-b my-1 border-gray-300">
			<p class="pl-2 text-base">
				<span><a href="/blog/category/{_.snakeCase(metadata.category)}">{metadata.category}</a></span>
				• <date datetime={metadata.date}>{new Date(metadata.date).toDateString()}</date> • <span></span>
			</p>
		</div>
		<img
			src={metadata.image}
			alt=""
			id="post-image"
			class="h-52 my-4 rounded md:h-80 md:max-h-80 max-h-52 w-full"
		/>
		
		<div class="leading-tight px-2" id="content">
			<svelte:component  this={content} />
		</div>
	</div>
</div>

{#if browser}
	<PageProgress color="red" height="5px" />
{/if}

<div>
	<div id="graphcomment"></div>
</div>

<style type="text/css">
	#post :global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		margin: 10px 2px;
		@apply font-semibold text-red-500;
	}
	:global(img.Sirv:not([width]):not([height])) {
		max-width: 100%;
		max-height: 400px;
	}

	:global(#post-image:empty) {
		background: #d5d5d5;
		width: 100%;
	}

	:global(.intro){
		@apply italic text-xl py-6;
	}
	:global(.toc) {
		@apply my-4;
	}

	:global(.toc::before) {
		content: 'Table Of Contents';
		@apply font-semibold text-xl inline-block my-1;
	}

	:global(.toc ol) {
		list-style: none;
	}
	:global(.toc ol li a){
		color: inherit;
	}
	:global(.toc li::before){
		content: "✓";
		color: red;
		@apply pr-1
	}
</style>

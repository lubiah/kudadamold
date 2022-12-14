<script>
	/**@type {import('./$types').PageData}*/
	export let data;

	import { onMount } from 'svelte';
	import Head from '$components/Head';
	import Progress from 'svelte-scrollprogress';
	import '$lib/css/prism.css';
	import { toc, spy } from './toc.js';

	import Facebook from "$lib/icons/logo-facebook.svg?component";
	import Twitter from "$lib/icons/logo-twitter.svg?component";
	import Reddit from "$lib/icons/logo-reddit-alien.svg?component";
	import HackerNews from "$lib/icons/logo-hacker-news.svg?component";
	import Linkedin from "$lib/icons/logo-linkedin.svg?component";
	import Share from "$lib/icons/share-nodes.svg?component";

	const SEO = {
		title: `${data.metadata.title} • Kudadam`,
		description: data.metadata.description,
		keywords: data.metadata.keywords,
		canonical: `https://kudadam.com/blog/${data.metadata.slug}`,
		date: data.metadata.date,
		modified: data.metadata.modified ?? new Date(data.metadata.modified) ?? undefined,
		expiry: data.metadata.expiry,
		tags: [...data.metadata.tags] ?? undefined,
		image: data.metadata.image ?? undefined //TODO: Find a way to implement opengraph for articles without images
	};

	onMount(() => {
		const article = document.querySelector('article');
		if (article) document.querySelector('main>div:first-child')?.appendChild(toc(article));
		//@ts-ignore
		let Spy = spy(document.querySelector('article'));

		return () => {
			Spy.stop();
		};
	});
</script>

<Head
	title={SEO.title}
	description={SEO.description}
	keywords={SEO.keywords}
	canonical={SEO.canonical}
	openGraph={{
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		type: 'article',
		images: [
			{
				url: `${SEO.image}`,
				width: 600,
				height: 315
			}
		],
		url: `${SEO.canonical}`,
		article: {
			published_time: new Date(SEO.date).toISOString(),
			modified_time: `${
				SEO.modified ?? new Date(data.metadata.modified).toISOString() ?? undefined
			}`,
			expiration_time: `${new Date(SEO.expiry).toISOString()}`,
			author: ['https://kudadam.com/about'],
			tag: SEO.tags
		}
	}}
	twitter={{
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		image: `${SEO.image}`
		//url: `${SEO.canonical}`
	}}
/>

<!-- TODO Add JSON Ld -->

<main>
	<div class="justify-center grid grid-cols-1 lg:grid-cols-[1fr_250px]">
		<article
			class="min-w-0 grid grid-cols-[1fr_min(65ch,calc(100%-10px))_1fr] [&_>_*]:col-start-2 [&_>_*]:col-end-3 lg:basis-[75%]"
		>
			<h1 class="mb-10 mt-2">{data.metadata.title}</h1>
			<ul
				class="text-sm text-neutral-600 flex flex-wrap gap-x-2 m-0 my-3 p-0 [&_li]:marker:content-none [&_li]:after:content-['\2022'] [&_li]:after:ml-1 [&_li:last-child]:after:content-none"
			>
				<li>
					Written on <time datetime={new Date(data.metadata.date).toDateString()}
						>{new Date(data.metadata.date).toDateString()}</time
					>
				</li>
				{#if data.metadata.modified}
					<li>
						Last updated on <time datetime={new Date(data.metadata.date).toDateString()}
							>{new Date(data.metadata.modified).toDateString()}</time
						>
					</li>
				{/if}
				<li>{data.metadata.readingTime.text}</li>
			</ul>
			<svelte:component this={data.component} />
		</article>
		
		<div id="share_component" class="row-start-2 max-w-md mx-auto mt-5 p-2 rounded-md">
			<p class="text-base font-semibold text-neutral-500 mb-2 text-center">Did you enjoy this article? Spread the word.</p>
			<div class="flex flex-wrap gap-x-2 justify-evenly">
				<a target="_blank" rel="noreferrer" aria-label="Share this article on Twitter" data-reset-styles href="{encodeURI(`https://twitter.com/intent/tweet?text=${data.metadata.title}&url=${SEO.canonical}&hashtags=${data.metadata.tags}&via=kudadam_`)}"><Twitter aria-hidden={true} class="icon" fill="#1DA1F2"/></a>
				<a target="_blank" rel="noreferrer" aria-label="Share this article on Reddit" data-reset-styles href="{encodeURI(`http://www.reddit.com/submit?url=${SEO.canonical}`)}&title={data.metadata.title}"><Reddit aria-hidden={true} class="icon" fill="#FF5700"/></a>
				<a target="_blank" rel="noreferrer" aria-label = "Share this article on facebook" data-reset-styles href="{encodeURI(`http://www.facebook.com/share.php?u=${SEO.canonical}`)}"><Facebook aria-hidden={true} class="icon" fill="#4267B2"/></a>
				<a target="_blank" rel="noreferrer" aria-label="Share this article on Hacker News" data-reset-styles href="{encodeURI(`https://news.ycombinator.com/submitlink?u=${SEO.canonical}`)}&t={data.metadata.title}"><HackerNews aria-hidden={true} class="icon" fill="#ff6600"/></a>
				<a target="_blank" rel="noreferrer" aria-label="Share this article on linkedin" data-reset-styles href="{encodeURI(`https://www.linkedin.com/sharing/share-offsite/?url=${SEO.canonical}`)}"><Linkedin class="icon" aria-hidden={true} fill="#0A66C2"/></a>
				<button class="p-0 m-0 border-none" aria-label="Share this article" on:click={async ()=>{
					if ("share" in window.navigator){
						await window.navigator.share({
							title: data.metadata.title,
							text: data.metadata.excerpt,
							url: SEO.canonical
						})
					}
				}}><Share aria-hidden={true} class="icon" fill="grey"/></button>
			</div>
		</div>
	</div>
	<style type="text/css">
		#root-layout {
			padding-left: 0;
			padding-right: 0;
		}
	</style>
</main>

<Progress color={'red'} />

<style lang="postcss">

	#share_component :global(.icon){
		@apply hover:-translate-y-1 transition-transform duration-75;
	}

	article :global(pre) {
		@apply col-span-4 md:col-start-2 md:col-end-3;
	}


	/* Styling for article */
	article :global(p + :is(h2, h3, h4, h5, h6)) {
		margin-top: 0px;
	}

	/* Styling for table of contents */
	main > div:first-of-type :global(.toc) {
		@apply basis-[250px] hidden lg:block sticky	self-start h-auto top-[20%];
		& :global(*) {
			@apply text-sm text-gray-600;
		}

		& :global(.toc-link.active) {
			@apply text-red-700 bg-red-50;
		}

		& :global(li > a) {
			@apply mb-1 block py-0.5 px-2 rounded-md;
		}

		& :global(.toc-heading) {
			@apply font-bold mb-1.5;
		}

		& :global(ul) {
			padding-inline-start: 0;
			& :global(ul) {
				padding-inline-start: 20px;
			}
		}

		& :global(li::marker) {
			content: none;
		}
	}
</style>

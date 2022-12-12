<script>
	/**@type {import('./$types').PageData}*/
	export let data;

	import { onMount } from 'svelte';
	import Head from '$components/Head';
	import Progress from 'svelte-scrollprogress';
	import '$lib/css/prism.css';
	import { toc, spy } from './toc.js';

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
	<div class="flex justify-center">
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

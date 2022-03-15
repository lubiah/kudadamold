<script context="module">
	export const prerender = true;
	export async function load({ params, fetch }) {
		try{
		const slug = params.slug;
		let component = await import(`./_blog/${slug}/index.md`);
		component.metadata["slug"] = slug;
		return {
			props: {
				metadata: component.metadata,
				content: component.default
			}
			};
		}

		catch(error){
			return {
				fallthrough: true
			}
		}
		
	}
</script>

<script type="text/javascript">
	import SEO from 'svelte-seo';
	import 'prismjs/themes/prism-tomorrow.css';
	import { browser } from "$app/env";
	import { onMount } from 'svelte';
	import Clock from "$lib/Icons/clock.svelte";
	import RectangleList from '$lib/Icons/RectangleList.svelte';
	import Tags from '$lib/Icons/Tags.svelte';
	import Eye from '$lib/Icons/Eye.svelte';
	import snakeCase from "just-snake-case";

	export let metadata, content;
	let relatedArticles;
	let Card;
	let PageProgress;
	let hits;
	$: hits = 0;

	const getRelatedArticles = async (title,posts)=>{
		let token_set_ratio = await import("fuzzball").then(e=>e.token_set_ratio);
		const titles = posts
		.map(post=> { return post.title})
		.filter(post => post !== title);
		const related_titles = titles.filter(post =>{ return token_set_ratio(title,post) >= 50 });
		const related_posts = new Set();
		for (let i in related_titles){
			let related_title = related_titles[i];
			for (let j in posts){
				let post = posts[j];
				if (post.title === related_title){
					related_posts.add(post);
				}
			}
		}
		return related_posts;
	}

	onMount(async ()=>{
		let hits_response = await fetch(`/blog/${metadata.slug}.json`);
		let { data } = await hits_response.json();
		hits  = await data.hits;
		PageProgress = await import("$lib/Components/PageProgress").then(e => e.default);
		Card = await import("$lib/Components/BlogCard").then(e=> e.default);
		let { posts } = await fetch("/blog.json?all=true").then(response=>response.json());
		relatedArticles = await getRelatedArticles(metadata.title, posts);
		let sharejsElement = document.createElement("script");
		sharejsElement.src = "https://platform-api.sharethis.com/js/sharethis.js#property=61d2ee20cb125900193f457d&product=sop";
		sharejsElement.type = "text/javascript";
		sharejsElement.defer = true;
		document.querySelector("body").appendChild(sharejsElement);
		

	});


</script>

<SEO
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
		image: [`${metadata.image ? metadata.image : "https://kudadam.sirv.com/logo/logo.png?q=30"}`],
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

<div class="my-4 xl:w-[65%] mx-auto" id="post">
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
		<li>
			<Eye/> {hits}
		</li>
	</ul>
	<div class="sharethis-inline-share-buttons mt-[50px] mb-[20px]"></div>
	{#if browser && relatedArticles && [...relatedArticles].length >= 1}
			<div class="mt-[100px]">
				<h3>Related Articles</h3>
				<div class="flex overflow-auto snap-x xl:fancy-scrollbar">
					{#each [...relatedArticles] as article (article.id)}
						<div class="flex">
						<svelte:component this={Card}
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
	
</div>
{#if browser}
	<svelte:component this={PageProgress} color="tomato" height="5px" />
{/if}


<style type="text/postcss">
	#post :global(h2),
	#post :global(h3),
	#post :global(h4),
	#post :global(h5),
	#post :global(h6) {
		@apply mt-[25px] mb-[10px] mx-[2px] font-semibold capitalize;
	}
	
	#content :global(img:not(#post-image)){
		@apply max-h-[500px] mx-auto my-4 rounded;
	}

	:global(#post-image:empty) {
		background: #d5d5d5;
		width: 100%;
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

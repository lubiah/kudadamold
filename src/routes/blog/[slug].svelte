<script context="module">
	import { onMount } from 'svelte';
	import SEO from 'svelte-seo';
	import Button from "$lib/Components/Button.svelte";
	import PageProgress from '$lib/Components/PageProgress.svelte';
	import Card from "$lib/Components/BlogCard.svelte";
	import 'prismjs/themes/prism-tomorrow.css';
	import _ from 'lodash';
	import {token_set_ratio } from "fuzzball";	
	import { browser } from "$app/env";
	const getRelatedArticles = (title,posts)=>{
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



	export async function load({ page, fetch }) {
		const slug = page.params.slug;
		try {

			let component = await import(`./_blog/${slug}/index.md`);
			component.metadata["slug"] = slug;
			let articles_res = await fetch("/blog.json?all=true");
			let { posts } = await articles_res.json();
			const related_posts = getRelatedArticles(component.metadata.title, posts);
			
			component.metadata["related_articles"] = related_posts;

			return {
				props: {
					metadata: component.metadata,
					content: component.default,
				}
			};
		} catch (e) {console.log(e)}
	}
</script>

<script type="text/javascript">
	export let metadata, content;

	let comment_loaded = false;

	const loadComments = ()=>{
		let script_tag = document.createElement("script");
		script_tag.setAttribute("repo","biah/www.kudadam.com");
		script_tag.setAttribute("issue-term","title");
		script_tag.setAttribute("src","https://utteranc.es/client.js");
		script_tag.setAttribute("label","Comment");
		script_tag.setAttribute("theme","preferred-color-scheme");
		script_tag.setAttribute("crossorigin","anonymous");
		script_tag.setAttribute("async",true);
		document.querySelector("#comment__box").appendChild(script_tag);
		comment_loaded = true;
	}

	let Carousel; // for saving Carousel component class
	onMount(async () => {

    const module = await import('svelte-carousel');
    Carousel = module.default;
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
		site: '@lucretius_1',
		title: `${metadata.title}`,
		description: `${metadata.description}`,
		image: `${metadata.image}`,
		imageAlt: `${metadata.title}`
	}}
/>

<div class="my-4 xl:w-[65%] mx-auto" id="post">
	<div class="md:mx-auto">
		<h1 class="text-center font-bold text-gray-700 capitalize dark:text-white">{metadata.title}</h1>
		<div class="py-2 text-gray-700 dark:text-gray-300 ps-4x border-b my-1 border-gray-300">
			<p class="pl-2 text-base">
				<span><a href="/blog/category/{_.snakeCase(metadata.category)}">{metadata.category}</a></span>
				• <date datetime={metadata.date}>{new Date(metadata.date).toDateString()}</date>
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
			{#if browser && [...metadata.related_articles].length >= 1}
			<div class="mt-[100px]">
			<h3>Related Articles</h3>
				<div class="flex flex-wrap">
					{#if window.matchMedia(`(max-width:600px)`).matches}
						<svelte:component
	  					this={Carousel} particlesToShow=1 autoplay pauseOnFocus>
	  					{#each [...metadata.related_articles] as article (article.id)}
	  						<Card
							title = "{article.title}"
							date = "{article.date}"
							slug = "{article.slug}"
							category= "{article.category}"
							image = "{article.image}"/>					
						{/each} 
						</svelte:component>
					{/if}
				</div>
			</div>
			{/if}
		
		<div id="comment__box">
			{#if !comment_loaded}
				<Button class="block mt-6 mx-auto !py-2" on:click={loadComments}>Load/Add Comment</Button>
			{/if}
		</div>
			
	</div>
	
</div>

{#if browser}
	<PageProgress color="tomato" height="5px" />
{/if}



<style type="text/postcss">
	#post :global(h2),
	#post :global(h3),
	#post :global(h4),
	#post :global(h5),
	#post :global(h6) {
		@apply mt-[25px] mb-[10px] mx-[2px] font-semibold capitalize;
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

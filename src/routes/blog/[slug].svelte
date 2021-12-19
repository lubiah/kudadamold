<script context="module">
	import SEO from 'svelte-seo';
	import 'prismjs/themes/prism-tomorrow.css';
	import  snakeCase from 'lodash.snakecase';
	import { browser } from "$app/env";
	import { onMount } from 'svelte';
	import Like from "$lib/Icons/heart.svelte";
	import Clock from "$lib/Icons/clock.svelte";

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

	

	export async function load({ page, fetch }) {
		const slug = page.params.slug;
		try {
			let meta;
			let component = await import(`./_blog/${slug}/index.md`);
			component.metadata["slug"] = slug;

			let { data } = await fetch(`/blog/${slug}.json`).then(e=>e.json()).catch(err=>{});
			meta = data;
			return {
				props: {
					metadata: component.metadata,
					content: component.default,
					meta
				}
			};
		} catch (e) {}
	}
</script>

<script type="text/javascript">
	export let metadata, content, meta;

	const setLikes = ()=>{
		let slug = document.querySelector("#content").getAttribute("data-slug");
		let like_button = document.querySelector("#like-button");
		if (window.localStorage){
			let liked = (localStorage[`blog_post_liked:${slug}`]) || false;
			if (liked){
				like_button.classList.add("text-red-500");
				like_button.setAttribute("data-liked",true);
			}
			else{
				like_button.classList.remove("text-red-500");
				like_button.setAttribute("data-liked",false);
			}
		}
	}


	const likeClicked = async (event)=>{
		let like_button = document.querySelector("#like-button");
		let slug = document.querySelector("#content").getAttribute("data-slug");
		if (window.localStorage){
			if (localStorage[`blog_post_liked:${slug}`] === "true" ){
				delete localStorage[`blog_post_liked:${slug}`];
				like_button.classList.remove('text-red-500');
				let request = await fetch(`/blog/${slug}.json?post_unliked=true`);
				let res = await request.json();
				if (res.post_unliked === true) meta.likes -= 1;
				return;
			}
			else{
				like_button.classList.add("text-red-500");
				localStorage[`blog_post_liked:${slug}`] = true;
				let request = await fetch(`/blog/${slug}.json?post_liked=true`);
				let res = await request.json();
				if (res.post_liked === true) meta.likes += 1;
				return;
			}
			
		}
	}

	let comment_loaded = false;
	const loadComments = ()=>{
		let script_tag = document.createElement("script");
		script_tag.setAttribute("repo","kudadam/kudadam.com");
		script_tag.setAttribute("issue-term","title");
		script_tag.setAttribute("src","https://utteranc.es/client.js");
		script_tag.setAttribute("label","Comment");
		script_tag.setAttribute("theme","preferred-color-scheme");
		script_tag.setAttribute("crossorigin","anonymous");
		script_tag.setAttribute("async",true);
		document.querySelector("#comment__box").appendChild(script_tag);
		comment_loaded = true;
	}


	let relatedArticles;
	let Card;
	let PageProgress;


	onMount(async ()=>{
		PageProgress = await import("$lib/Components/PageProgress.svelte").then(e => e.default);
		Card = await import("$lib/Components/BlogCard").then(e=> e.default);
		let { posts } = await fetch("/blog.json?all=true").then(e => e.json().then(e.posts));
		relatedArticles = await getRelatedArticles(metadata.title, posts);
		setLikes();

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
/>

<article class="my-4 xl:w-[65%] mx-auto" id="post" role="article">
	<div class="md:mx-auto">
		<h1 class="text-center font-bold text-gray-700 capitalize dark:text-white">{metadata.title}</h1>
			<ul class="py-2 ps-4x border-b my-1 border-gray-300 text-base flex flex-wrap pl-2 list-none gap-x-2" id="meta__info">
				<li><span><a href="/blog/category/{snakeCase(metadata.category)}">{metadata.category}</a></span></li>
				<li><Clock class="h-[0.8rem]"/> <date datetime={metadata.date}>{new Date(metadata.date).toDateString()}</date></li>
				{#if meta}
					<li><span>Read Times: {meta.read_times}</span></li>
					<li><span>Shares: {meta.shares}</span></li>
					<li><span>Likes: {meta.likes}</span></li>
				{/if}
			</ul>
		<img
			src={metadata.image}
			alt=""
			id="post-image"
			class="h-52 my-4 rounded md:h-80 md:max-h-80 max-h-52 w-full"
		/>
		
		<div class="leading-tight px-2" id="content" data-slug="{metadata.slug}">
			<svelte:component this={content} />
		</div>
		<div id="like__container" class="mt-8 mx-auto text-center">
			<span on:click={likeClicked}><Like class="h-[2em]" id="like-button"/></span>
			<span class="block">{meta.likes}</span>
		</div>
		{#if browser && relatedArticles && [...relatedArticles].length >= 1}
			<div class="mt-[100px]">
				<h3>Related Articles</h3>
				<div class="flex overflow-auto">
					{#each [...relatedArticles] as article (article.id)}
						<div class="flex">
						<svelte:component this={Card}
						title="{article.title}"
						slug="{article.slug}"
						image="{article.image}"
						date="{article.date}"
						category="{article.category}"
						class = "mr-3 w-[290px]"
						/>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		
		<div id="comment__box">
			{#if !comment_loaded}
				<button class="block mt-6 mx-auto !py-2" on:click={loadComments}>Load/Add Comment</button>
			{/if}
		</div>
			
	</div>

</article>

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
	
	#content :global(img:not(#post-iLmage)){
		@apply max-h-[500px] mx-auto my-4 rounded;
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
		@apply font-semibold text-xl inline-block my-1;
	}


	:global(.toc ol li a){
		color: inherit;
	}

	#meta__info li::after{
		content: "•";
		@apply pl-0.5
	}

	#meta__info li:last-child::after {
		content: "";
	}
</style>

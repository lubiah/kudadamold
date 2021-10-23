<script context="module">
	import Card from '$lib/Components/BlogCard.svelte';
	import SEO from 'svelte-seo';
	import { onMount } from "svelte";
	import Button from '$lib/Components/Button.svelte';
	import _ from "lodash";
	export async function load({ fetch }) {
		let res = await fetch('/blog.json?limit=true');
		let json = await res.json();
		res = await fetch("/blog.json?all=true");
		let { posts } = await res.json();
		if (res.ok) {
			return {
				props: {
					posts: json.posts,
					limit: json.limit,
					all_posts: posts
				}
			};
		}
	}
</script>

<script type="text/javascript">
	export let posts, limit, all_posts;
	let page = 1;
	let SearchBar;
	let documents = all_posts;
	all_posts = _.chunk(all_posts,6);     
	const loadData = async () => {
		let data = all_posts[page];
		posts = [...posts, ...data];
		page++;
	};

	onMount(async ()=>{
		SearchBar = await import("$lib/Components/BlogSearchBar.svelte").then(e=> e.default);
	})
	
</script>

<SEO
	title="Kudadam • Blog"
	description="A place where I write about everthing tech related"
	keywords="kudadam blog, lucretius blog,programmer,python,javascript,sveltekit,svelte,sapper,web development"
	canonical="https://www.kudadam.com/blog"
	openGraph={{
		title: 'Kudadam • Blog',
		description: 'A place where I write about everthing tech related',
		url: 'https://www.kudadam.com/blog',
		type: 'website',
		images: [
			{
				url: 'https://kudadam.sirv.com/logo/logo_blog.png',
				width: 850,
				height: 650,
				alt: 'Blog post'
			}
		]
	}}
	twitter={{
		site: '@lucretius_1',
		title: 'Kudadam • Blog',
		description: 'A place where I write about everthing tech related',
		image: 'https://kudadam.sirv.com/logo/logo_blog.png',
		imageAlt: 'Blog Logo'
	}}
/>
<div class="text-center capitalize mb-5">
	<h1 class="font-bold transform hover:rotate-6 transition duration-100 dark:text-white">
		The Blog
	</h1>
	<p class="text-lg">
		<i>My personal journal where I write about tutorials, hacks and everything in between</i>
	</p>
</div>

<div class="md:w-[80%] mx-auto">
 
	<svelte:component this={SearchBar} {documents}/>

	<h2 class="ml-4 my-6 font-bold headings dark:text-white text-current inline-block">Latest Articles</h2>
	<div class="flex flex-wrap justify-center">
		{#each posts as post (post.id)}
			<Card
				title={post.title}
				image={post.image}
				date={post.date}
				slug={post.slug}
				category={post.category}
			/>
		{/each}
	</div>
</div>

{#if page != limit}
	<Button class="mx-auto block" on:click={loadData}>Load More</Button>
{/if}

<style type="text/postcss">

	:global(.headings::after) {
		display: block;
		content: '';
		padding: 2px;
		border-radius: 8px;
		width: 98%;
		background-color: tomato;
	}
</style>

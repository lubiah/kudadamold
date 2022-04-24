<script context="module">
	import { snakeCase } from "$lib/Scripts/util";
	export const prerender = true;
	export const load = async ( { fetch, params })=>{
		const category = params.category;
    	const request = await fetch(`/blog/__data.json?all=true`);
    	let { all } = await request.json();
    	all = all.filter(post=>{
        	return snakeCase(post.category) === category;
    		});

    	if (all.length === 0){
        	return {
            	status: 404
        	}
    	}

		return {
			props: {
				category,
				posts: all
			}
		}
    }
</script>

<script>
	import Head from "svelte-seo";
	import Card from '$lib/Components/BlogCard';

	export let posts, category;

	const meta = {
		title: `Blog Posts On ${category} • Kudadam`,
		description: `Blog posts under ${category} category`,
		canonical: `https://www.kudadam.com/category/${category}`,
		image: "https://lucretius.sirv.com/logo/logo.png'"
	}
</script>

<Head
	title= "{meta.title}"
	description="{meta.description}"
	noindex={true}
	nofollow={true}
	openGraph={{
		title: `${meta.title}`,
		description: `${meta.description}`,
		url: `${meta.canonical}`,
		type: 'website',
		images: [
			{
				url: `${meta.image}`,
				width: 850,
				height: 650,
				alt: 'Og Image Alt'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: `${meta.title}`,
		description: `${meta.description}`,
		image: `${meta.image}`,
		imageAlt: 'Kudadam Logo'
	}}
/>

<main>
	<div>
		<div class="mb-4 mt-8 text-center">
			<h2 class="capitalize text-red-500 dark:text-white font-bold">{category} category</h2>
			<p class="text-black dark:text-white">
				<i>Blog posts under {category}</i>
			</p>
		</div>
		<div class="flex flex-wrap mt-8 justify-center">
			{#each posts as post}
				<Card
					hide_category
					title={post.title}
					image={post.image}
					date={post.date}
					slug={post.slug}
					category={post.category}
					excerpt={post.excerpt}
				/>
			{/each}
		</div>		
	</div>
</main>


<style>
	main {
		display: grid;
		grid-template-columns: 1fr min(75rem, 100%) 1fr;
	}

	main div {
		grid-column: 2/3;
	}
</style>
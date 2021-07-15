<script context="module">
	export async function preload(page, session){
		let { category } = page.params;
		const res = await this.fetch("/blog.json?all=true");
		let posts = await res.json();
		posts = posts.filter(post => {
			let post_category = post.category.toLowerCase().replace(/\s/g,'_');
			if (post_category == category){
				return post;
			}
		});

		if (posts.length == 0){
			return this.error(404,'category not found')
		}

		category = posts[0].category;
		return {
			posts,
			category
		}
	}
</script>

<script type="text/javascript">
	export let posts;
	export let category;

	import SEO from "svelte-seo";
	import Card from "../../../Components/BlogCard.svelte";
</script>

<SEO
title = "{category} Category • Kudadam Blog"
description = "Blog posts under {category} category"

  openGraph={{
    title: `{category} Category • Kudadam Blog`,
    description: `Blog posts under {category} category`,
    url: `https://www.kudadam.com/category/${category.toLowerCase().replace(/\s/g,'_')}`,
    type: 'website',
    images: [
      {
        url: 'https://kudadam.sirv.com/logo/logo.png',
        width: 850,
        height: 650,
        alt: 'Og Image Alt'
      }
     ]
  }}

   twitter={{
    site: "@lucretius_1",
    title: `{category} Category • Kudadam Blog`,
    description: `Blog posts under {category} category`,
    image: "https://kudadam.sirv.com/logo/logo.png",
    imageAlt: "Kudadam Logo",
  }}
/>

<div>
	<div class="mb-4 mt-8 text-center">
		<h2 class="capitalize text-red-500 dark:text-white font-bold">{category} category</h2>
		<p class="text-black dark:text-white">	
			<i>Blog posts under {category}</i>
		</p>
	</div>
	<div class="flex flex-wrap h-full mt-8 md:mx-32">
		{#each posts as post }
			<Card
			hide_category
			title = {post.title}
			image = {post.image}
			date = {post.date}
			slug = {post.slug}
			category = {post.category}
			/>
		{/each}
	</div>
</div>
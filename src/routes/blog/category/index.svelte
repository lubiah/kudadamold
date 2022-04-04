<script context="module">
	export const prerender = true;

	import { snakeCase } from "$lib/Scripts/util";
	export async function load({ fetch }) {
		let res = await fetch('/blog.json?all=true');
		let { posts } = await res.json();
		let categories = posts.map((post) => {
			return post.category;
		});
		categories = [...new Set(categories)];
		return {
			props: {
				categories
			}
		};
	}
</script>

<script>
	import SEO from 'svelte-seo';
	export let categories;
</script>

<SEO
	title="Category • Kudadam Blog"
	nofollow={true}
	noindex={true}
	description="A page which lists the various categories of the blog section"
	openGraph={{
		title: 'Category • Kudadam Blog',
		description: 'Category • Kudadam Blog',
		url: 'https://www.kudadam.com/blog/category',
		type: 'website',
		images: [
			{
				url: 'https://lucretius.sirv.com/logo/logo.png',
				width: 850,
				height: 650,
				alt: 'Logo'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: 'Category • Kudadam Blog',
		description: 'A page which lists the various categories of the blog section',
		image: 'https://lucretius.sirv.com/logo/logo.png',
		imageAlt: 'Logo of Kudadam'
	}}
/>

<div>
	<h1 class="text-center font-bold dark:text-white text-red-500 my-4">Blog Category</h1>
	<p class="text-black dark:text-white text-center"><i>Various categories for the blog</i></p>
	<div class="flex flex-wrap mt-10 justify-center mx-auto h-screen">
		{#each categories as category}
			<a href="/blog/category/{snakeCase(category)}" class="hover:animate-pulse">
				<span class="m-4 p-3 rounded-md text-white category_{snakeCase(category)}"
					>{category}</span
				>
			</a>
		{/each}
	</div>
</div>

<script context="module">
	export const load = async ({ params, fetch })=>{
		let page = params.page;
		let res = await fetch('/blog.json?all=true&limit=true');
		let json = await res.json();
		
		if (page === "1"){
			return {
				redirect: "/blog",
				status: 301
			}
		}
		if (page > json.limit || !/^\d+$/gm.test(page) || page == "0"){
			return {
				status: 404
			}
		}


		return {
			props: {
				page,
				posts: json.posts
			}
		}
	}
</script>


<script>
	import Card from '$lib/Components/BlogCard';
	import SEO from 'svelte-seo';
	import { paginate, PaginationNav } from "svelte-paginate";
	import { onMount } from "svelte";

	export let posts,page;
	let pageSize = 6;
	let currentPage = parseInt(page);
	let items = posts;
	let Page;
	$: Page = paginate({ items , pageSize, currentPage });
</script>


<SEO
	title="Kudadam • Blog | Page {page}"
	description="A place where I write about everthing tech related"
	keywords="kudadam blog, lucretius blog,programmer,python,javascript,sveltekit,svelte,sapper,web development"
	canonical="https://www.kudadam.com/blog"
	openGraph={{
		title: `Kudadam • Blog | Page ${page}`,
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
		site: '@kudadam_',
		title: `Kudadam • Blog | Page ${page}`,
		description: 'A place where I write about everthing tech related',
		image: 'https://kudadam.sirv.com/logo/logo_blog.png',
		imageAlt: 'Blog Logo'
	}}
/>


<div class="text-center capitalize mb-5">
	<h1 class="font-bold transform hover:rotate-6 transition duration-100 dark:text-white">
		The Blog • Page {page}
	</h1>
</div>

<div class="md:w-[80%] mx-auto">
	<section class="flex flex-wrap justify-center mt-20">
		{#each Page as post (post.id)}
			<Card
				title={post.title}
				image={post.image}
				date={post.date}
				slug={post.slug}
				category={post.category}
				excerpt={post.excerpt}
			/>
		{/each}
	</section>
<PaginationNav let:value={pageNumber} {currentPage} totalItems={items.length} pageSize={6} limit={2} on:setPage={e=>{currentPage = e.detail.page}}>
		<a href="/blog/page/{pageNumber}" class="button hover:text-white visited:text-white" slot="number">{pageNumber}</a>
		<span slot="ellipsis" class="button">...</span>
	</PaginationNav>
</div>

<style type="text/postcss">
	:global(.pagination-nav){
		@apply text-center
	}

	:global(.option.active > a){
		@apply bg-blue-500;
	}
</style>

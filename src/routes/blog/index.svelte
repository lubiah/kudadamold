<script context="module">

	import Card from '$lib/Components/BlogCard';
	import SEO from 'svelte-seo';
	import { PaginationNav } from "svelte-paginate";
	export async function load({ fetch }) {
		let res = await fetch('/blog.json?total=true');
		let json = await res.json();
		let { posts } = json;
		let { total } = json;
		if (res.ok) {
			return {
				props: {
					posts,
					total
					}
			};
		}
	}
</script>

<script type="text/javascript">

	export let posts, total;
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
				url: 'https://lucretius.sirv.com/logo/logo_blog.png',
				width: 850,
				height: 650,
				alt: 'Blog post'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: 'Kudadam • Blog',
		description: 'A place where I write about everthing tech related',
		image: 'https://lucretius.sirv.com/logo/logo_blog.png',
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

<div class="max-w-6xl mx-auto">

	
	<!-- <h2 class="ml-4 my-6 font-bold headings dark:text-white text-current inline-block">Popular Articles</h2>
	<div class="overflow-x-auto lg:fancy-scrollbar flex scroll-smooth snap-x mb-8">
		<section class="flex">
			{#each popular_articles as article (article.id)}
			<Card
				class = "mr-3 snap-start"
				title={article.title}
				image={article.image}
				date={article.date}
				slug={article.slug}
				category={article.category}
				excerpt={article.excerpt}
			/>
			{/each}
		</section> 
		
	</div> -->
	


	<h2 class=" my-6 font-bold headings dark:text-white text-current inline-block">Latest Articles</h2>
	<section class="flex flex-wrap justify-center">
		{#each posts as post (post.id)}
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


	<PaginationNav let:value={pageNumber} currentPage={1} totalItems={total} pageSize={6} limit={2}>
		<a sveltekit:prefetch href="{pageNumber === 1 ? "/blog" : `/blog/page/${pageNumber}`}" class="button hover:text-white visited:text-white" slot="number">{pageNumber}</a>
		<span slot="ellipsis" class="button">...</span>
	</PaginationNav>
</div>


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



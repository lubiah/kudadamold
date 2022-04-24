<script context="module">
	
	import Card from "$lib/Components/BlogCard";
	import { PaginationNav } from "svelte-paginate";
	import Head from "svelte-seo";

	export const load = async ( { fetch })=>{
		let request = await fetch("/blog/__data.json?total=true&popular_articles=true");
		let { posts, total, popular_articles } = await request.json();

		return {
			props: {
				posts,
				total,
				popular_articles
			}
		}
	}

	const meta = {
		title: "Blog - My personal journal • Kudadam",
		description: "My personal journal where I write about tutorials, hacks and everything in-between",
		keywords: "lucretius blog, lucretius biah blog, web developer blog, developer blog, portfolio",
		canonical: "https://www.kudadam.com/blog",
		image: "https://lucretius.sirv.com/logo/logo.png"
	}
</script>

<script>
	export let posts, total, popular_articles
</script>

<Head
	title="{meta.title}"
	description="{meta.description}"
	keywords="{meta.keywords}"
	canonical="https://www.kudadam.com/blog"
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
				alt: 'Blog post'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: `${meta.title}`,
		description: `${meta.description}`,
		image: `${meta.image}`,
		imageAlt: 'Blog Logo'
	}}
/>

<main>
	<div>
		<div class="text-center">
			<h1>The Blog</h1>
			<p>My personal journal where I write about tutorials, hacks and everything in-between</p>
		</div>
		<div>
			<h2 class="ml-4 my-6 font-bold headings dark:text-white text-current inline-block">Popular Articles</h2>
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
		</div>
		<div>
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
		</div>
	</div>

	
	<PaginationNav let:value={pageNumber} currentPage={1} totalItems={total} pageSize={6} limit={2}>
		<a sveltekit:prefetch href="{pageNumber === 1 ? "/blog" : `/blog/page/${pageNumber}`}" class="button hover:text-white visited:text-white" slot="number">{pageNumber}</a>
		<span slot="ellipsis" class="button">...</span>
	</PaginationNav>
</main>

<style type="text/postcss">

	:global(.headings::after) {
		display: block;
		content: '';
		padding: 2px;
		border-radius: 8px;
		width: 98%;
		background-color: tomato;
	}

	main {
		display: grid;
		grid-template-columns: 1fr min(75rem,100%) 1fr;
	}

	main div {
		grid-column: 2/3;
	}
</style>


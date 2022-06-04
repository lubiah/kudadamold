<script>
	import Head from "svelte-seo";
	import Card from "$components/BlogCard";
	import { PaginationNav } from "svelte-paginate";

	export let page, total, posts;
	let meta;
	$: meta = {
		title: `Blog Page ${page} • Kudadam`,
		description: "My personal journal where I write about tutorials, hacks and everything in-between",
		keywords: "lucretius blog, lucretius biah blog, web developer blog, developer blog, portfolio",
		canonical: "https://www.kudadam.com/blog",
		image: "https://ik.imagekit.io/kudadam/logo/logo.png"
	}

</script>

<Head
	title={meta.title}
	noindex={true}
	description={meta.description}
	keywords="{meta.title}"
	canonical="{meta.canonical}"
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
		description:  `${meta.description}`,
		image: `${meta.image}`,
		imageAlt: 'Blog Logo'
	}}
/>


<main>
	<div>
		<div class="text-center capitalize mb-5">
			<h1 class="font-bold transform hover:rotate-6 transition duration-100 dark:text-white">
				The Blog • Page {page}
			</h1>
		</div>
		<section class="flex flex-wrap gap-x-4 justify-center mt-20">
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
		<PaginationNav currentPage={parseInt(page)} let:value={pageNumber} totalItems={total} pageSize={6} limit={2} >
			<a sveltekit:prefetch href="{pageNumber === 1 ? "/blog" : `/blog/page/${pageNumber}`}" class="button px-5 hover:text-white visited:text-white" slot="number">{pageNumber}</a>
			<span slot="ellipsis" class="button px-5">...</span>
		</PaginationNav>
	</div>
</main>


<style>
	main {
		display: grid;
		grid-template-columns: 1fr min(100%,75rem) 1fr;
	}

	main>div {
		grid-column: 2/3;
	}

</style>
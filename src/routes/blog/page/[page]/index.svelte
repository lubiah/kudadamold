<script context="module">
	export const prerender = true;
</script>


<script>
	import Card from '$lib/Components/BlogCard';
	import SEO from 'svelte-seo';
	import { PaginationNav } from "svelte-paginate";

	export let posts,page, total;
</script>


<SEO
	title="Kudadam • Blog | Page {page}"
	noindex={true}
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
				url: 'https://lucretius.sirv.com/logo/logo_blog.png',
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
		image: 'https://lucretius.sirv.com/logo/logo_blog.png',
		imageAlt: 'Blog Logo'
	}}
/>


<div class="text-center capitalize mb-5">
	<h1 class="font-bold transform hover:rotate-6 transition duration-100 dark:text-white">
		The Blog • Page {page}
	</h1>
</div>

<div class="xl:w-[90%] mx-auto">
	<section class="flex flex-wrap justify-center mt-20">
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
		<a sveltekit:prefetch href="{pageNumber === 1 ? "/blog" : `/blog/page/${pageNumber}`}" class="button hover:text-white visited:text-white" slot="number">{pageNumber}</a>
		<span slot="ellipsis" class="button">...</span>
	</PaginationNav>
</div>

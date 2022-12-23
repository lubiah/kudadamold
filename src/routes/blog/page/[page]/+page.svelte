<script>
	import Head from "$components/Head";
	import Card from "$components/BlogCard";
	import { PaginationNav } from "svelte-paginate";

	/**@type {import("./$types").PageData}*/
	export let data;

	const SEO = {
		title: `The Blog - Page ${data.page} • Kudadam`,
		description: `Page ${data.page} of blog posts`,
		canonical: `https://www.kudadam.com/blog/page/${data.page}`
	};
</script>

<Head
	title={SEO.title}
	description={SEO.description}
	canonical={SEO.canonical}
	noindex={true}
	nofollow={true}
	twitter={{
		title: SEO.title,
		description: SEO.description
	}}
/>

<main>
	<div class="text-center">
		<h1>The Blog • Page {data.page}</h1>
	</div>

	<div class="flex flex-wrap gap-6 justify-center mt-[60px]">
		{#each data.articles as article}
			<Card
				title={article.title}
				excerpt={article.excerpt}
				date={article.date}
				category={article.category}
				slug={article.slug}
			/>
		{/each}
	</div>
	<nav class="mx-auto text-center my-7" aria-label="Blog post pagination navigation">
		<PaginationNav totalItems={data.total} pageSize={10} currentPage={data.page}>
			<a
				aria-label="Go to page {pageNumber}"
				aria-current={pageNumber === data.page ? true : false}
				data-reset-styles=""
				let:value={pageNumber}
				class="button mx-0.5 hover:shadow text-base aria-[current='true']:font-bold aria-[current='true']:border-[color:var(--primary-300)]"
				href="{pageNumber === 1 ? '/blog' : `/blog/page/${pageNumber}`} "
				slot="number">{pageNumber}</a
			>
		</PaginationNav>
	</nav>
</main>

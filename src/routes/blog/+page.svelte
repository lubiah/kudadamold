<script>
	/** @type {import("./$types").PageData}*/
	export let data;

	import Head from "$components/Head";
	import BlogCard from "$components/BlogCard";
	import { PaginationNav } from "svelte-paginate";

	const SEO = {
		title:
			"The Blog — My personal journal where I write about tutorials, hacks and everything in-between • Kudadam",
		description:
			"A space where I use words to convey my knowledge, thoughts, and points of view on a variety of issues ranging from technology to the personal.",
		keywords: [
			"lucretius blog",
			"kudadam blog",
			"kudadam journal",
			"lucretius biah blog",
			"kudadam web log"
		],
		canonical: "https://kudadam.com/blog"
	};
</script>

<Head
	title={SEO.title}
	description={SEO.description}
	keywords={SEO.keywords.toString()}
	canonical={SEO.canonical}
	openGraph={{
		title: SEO.title,
		description: SEO.description,
		url: SEO.canonical,
		type: "website"
		//TODO: Add openGraph images
	}}
	twitter={{
		card: "summary_large_image",
		title: SEO.title,
		description: SEO.description

		//TODO: add more JSONld
	}}
/>

<main class="my-2">
	<section
		class="max-w-xl mx-auto p-4 bg-origin-content rounded-tl-[225px_10px] rounded-tr-[10px_300px] rounded-bl-[10px_200px] rounded-br-[400px_5px] my-8 border-2 border-black"
	>
		<h1>The Blog✍️</h1>
		<p>
			A space where I use words to convey my knowledge, thoughts, and points of view on a variety of
			issues ranging from tech to personal.
		</p>
	</section>
	<section class="flex flex-wrap justify-center gap-x-2">
		<div class="basis-[700px] flex-grow-[1]">
			<section>
				<h2 class="text-3xl text-neutral-600 mt-0">Latest articles</h2>
				<div
					class="flex flex-wrap justify-between gap-y-14 [&_>_*]:flex-grow-[1] md:[&_>*]:flex-grow-0"
				>
					{#each data.articles as article}
						<BlogCard
							title={article.title}
							excerpt={article.excerpt}
							category={article.category}
							date={article.date}
							slug={article.slug}
						/>
					{/each}
				</div>
			</section>
			<nav class="mx-auto text-center my-7" aria-label="Blog post pagination navigation">
				<PaginationNav totalItems={data.total} pageSize={data.PER_PAGE} currentPage={1}>
					<a
						aria-label="Go to page {pageNumber}"
						aria-current={pageNumber === 1 ? true : false}
						data-reset-styles
						let:value={pageNumber}
						class="button mx-0.5 hover:shadow text-base aria-[current='true']:font-bold aria-[current='true']:border-[color:var(--primary-300)]"
						href="{pageNumber === 1 ? '/blog' : `/blog/page/${pageNumber}`} "
						slot="number">{pageNumber}</a
					>
				</PaginationNav>
			</nav>
		</div>
		<aside
			class="basis-[250px] [&_>_h2]:font-bold [&_>_*]:my-1 [&_>_*]:text-base flex-grow-[1] md:flex-grow-0 p-4 rounded-md text-neutral-500 bg-neutral-50"
		>
			<h2>Categories</h2>
			<ul class="list-none p-0 pb-3 m-0">
				{#each data.categories as { name, slug }}
					<li>
						<a
							aria-label="Read more articles on {name}"
							data-reset-styles
							class="block my-2 hover:bg-neutral-200 rounded-md px-1"
							href="/blog/category/{slug}">{name}</a
						>
					</li>
				{/each}
			</ul>
			<h2>Tags</h2>
			<ul class="list-none p-0 m-0 flex flex-wrap gap-2.5">
				{#each data.tags as tag}
					<li class="p-0 m-0">
						<a
							data-reset-styles
							aria-label="Read articles with the tag {tag}"
							class="reset-links block px-1 hover:bg-neutral-200 rounded-md before:content-['#']"
							href="/blog/tag/{tag}">{tag}</a
						>
					</li>
				{/each}
			</ul>
		</aside>
	</section>
</main>

<style lang="postcss">
	main > section:first-of-type {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 1238'%3E%3Cg fill='%237f0000' stroke-width='0' class='layer'%3E%3Cpath d='M756 2c-9 5-20 18-22 28-2 15 24 33 47 32 12-1 18-5 22-15 6-17-8-38-30-45-8-3-11-3-17 0zM345 39c-15 4-27 15-32 29-3 7-3 19 0 28 5 15 14 26 34 43a535 535 0 0 1 138 154L397 66c-11-22-32-33-52-27z'/%3E%3Cpath d='M596 99c-9 4-12 12-11 32 0 21 2 35 13 86l12 58c5 35 3 56-7 64-7 7-25 9-41 5s-40-18-58-33l-7-6 6 8c21 26 30 50 26 70-2 10-10 22-17 26-12 6-30 1-54-15a465 465 0 0 1-72-61l12 16c32 38 49 62 61 86 9 16 12 27 13 39 1 16-3 24-12 28-13 6-32 3-87-15-32-10-46-14-59-15-15-2-24 1-27 9-6 13 2 25 23 36 12 6 28 12 58 21 42 13 59 20 72 28 12 8 18 17 18 26 0 5-4 11-9 14-14 11-41 17-105 25-82 11-105 16-119 25-7 5-9 8-9 14 0 9 8 16 23 19l29 1c21-1 36-2 79-9 59-8 85-10 103-8 20 2 28 6 33 16 3 5 2 16-2 24-11 24-42 53-92 86-20 14-22 16-13 11 44-25 92-44 122-49 10-2 29-2 36 0 12 4 18 11 18 22 0 15-10 34-46 83l-26 35c-20 31-23 48-10 56 12 7 27 0 46-22 8-9 17-22 36-49 32-43 46-59 61-67 19-9 34 2 40 28 2 10 2 38 0 57l-6 37c-4 27-4 35-3 37l1 1 5-16c15-55 36-99 56-119 10-11 16-13 29-14 18-1 23 3 28 19 3 9 4 11 7 13 4 2 11 3 21 0 11-2 19 0 29 10 12 11 23 27 49 74 23 40 36 57 48 63 7 3 11 4 18 1 8-3 15-3 22 0 12 7 23 18 46 52 19 26 25 33 34 42 8 8 15 12 22 12 14 0 20-11 15-30-6-25-25-62-70-138l-36-62c-43-73-61-112-61-133 0-8 1-11 6-15 9-8 19-11 33-11 13 0 25 2 48 9 16 6 23 7 24 5 1-1 0-2-10-8-24-15-42-33-48-51-3-7-3-19-1-27 6-19 35-25 111-22 55 2 107 2 119 0 21-4 31-11 31-22 0-6-2-10-8-13-14-9-39-12-106-14l-48-2c-65-3-89-12-85-33 2-15 12-25 35-37 13-6 22-9 59-21 16-4 22-8 19-10-1-1-5-1-22 1-40 4-66 4-85-1-21-6-35-18-36-34-1-15 8-27 42-58 24-23 32-33 33-45 0-6 0-7-3-12l-6-8c-3-3-5-4-11-4-5 0-7 0-12 3-9 4-17 10-36 27-27 25-38 33-51 34-4 0-7 0-10-2-13-6-14-16-5-34 8-15 20-31 57-74 55-65 72-90 72-110 0-7-2-11-7-15-14-13-29-8-54 19-13 13-26 29-52 62-48 63-66 84-84 94-7 3-8 3-14 3-8 0-14-3-22-10-13-12-19-30-22-69-1-20-2-27-4-28l-1 6c-1 11-6 31-9 41-7 22-19 38-32 44-14 7-23 6-32-3-11-13-19-39-33-105-13-64-21-88-32-99-6-7-12-8-19-5z'/%3E%3Cpath d='M758 127c-4 2-8 9-8 12s4 8 9 11c9 5 18 3 21-4s-1-15-10-19c-7-3-8-3-12 0zM51 196c-20 7-43 32-49 55-3 9-2 17 2 25 15 27 53 48 88 48 32 0 49-14 53-45 3-18-4-35-20-52-12-14-27-23-44-29-10-3-23-4-30-2zm1006 77c-8 4-11 15-5 22 7 8 18 8 24-1 3-4 3-12 0-16-5-6-13-9-19-5zm-835 79c-8 4-16 15-16 21 0 7 6 14 17 19 6 3 8 4 16 4 10 0 12-1 16-7 3-4 4-13 2-18s-10-14-16-17c-6-4-15-5-19-2zm1017 78-31 12-58 23-31 13 27-5c38-7 52-9 68-7 13 1 23 4 34 9 16 7 25 6 30-2 2-5 2-18-1-24s-9-14-15-17c-6-2-16-3-23-2zm-204 323 76 74c94 93 89 88 97 92 18 9 34 5 49-10 12-12 18-26 17-41-1-14-8-24-20-30-9-4-17-6-37-7-49-2-77-14-159-66a642 642 0 0 0-24-12zM264 868l-88 42c-6 3-12 11-14 17-5 13 0 30 12 41 11 12 26 15 39 9 4-2 12-10 15-16l7-15c6-14 11-22 20-34 13-18 30-33 64-59l31-25-86 40zm472 42c-9 4-17 11-23 22-4 9-5 13-2 19 9 18 38 30 58 24 6-1 10-5 13-11 6-12 5-22-3-33-10-14-32-25-43-21zm-131 152a95143 95143 0 0 0-69 138c-3 7-4 19-2 24 6 17 26 19 44 3 9-9 17-22 21-38 2-5 7-32 11-61l14-82 5-30-24 46z'/%3E%3C/g%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: top right;
		background-size: 20%;
	}
</style>

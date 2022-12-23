<script>
	/**@type {import("./$types").PageData}*/
	export let data;

	import Head from "$components/Head";
	import Card from "$components/BlogCard";
	import { noCase } from "$utils";

	const SEO = {
		title: `Article on ${noCase(data.category)} • Kudadam`,
		description: `This page contains a list of articles in the ${noCase(data.category)} category`,
		canonical: `https://wwww.kudadam.com/blog/category/${data.category}`
	};
</script>

<Head
	title={SEO.title}
	description={SEO.description}
	canonical={SEO.canonical}
	twitter={{
		title: SEO.title,
		description: SEO.description
	}}
	noindex={true}
/>

<main>
	<section class="text-center">
		<h1>Articles on {noCase(data.category)}</h1>
	</section>
	<div class="flex flex-wrap justify-center gap-6">
		{#each data.articles as article}
			<Card
				title={article.title}
				date={article.date}
				excerpt={article.excerpt}
				slug={article.slug}
				category={article.category}
			/>
		{/each}
	</div>
</main>

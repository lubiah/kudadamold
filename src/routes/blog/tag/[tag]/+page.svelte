<script>
	/**@type {import("./$types").PageData}*/
	export let data;

	import Head from "$components/Head";
	import Card from "$components/BlogCard";

	const SEO = {
		title: `Articles with the tag ${data.tag} • Kudadam`,
		description: `This page contains a list of articles which are written around the ${data.tag} tag`,
		canonical: `https://www.kudadam.com/blog/tag/${data.tag}`
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
		<h1>Articles with the tag {data.tag}</h1>
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

<script context="module">
	import snakeCase from 'just-snake-case';
	export async function load({ params, fetch }) {
		let category = params.category;

		const res = await fetch('/blog.json?all=true');
		let { posts } = await res.json();
		posts = posts.filter((post) => {
			return snakeCase(post.category) === category;
		});

		if (posts.length == 0) {
			return {
				status: 404,
				error: new Error(`category '${page.params.category}' does not exist`)
			};
		}

		return {
			props: {
				posts,
				category: posts[0].category
			}
		};
	}
</script>

<script type="text/javascript">
	export let posts;
	export let category;

	import SEO from 'svelte-seo';
	import Card from '$lib/Components/BlogCard';
</script>

<SEO
	title="{category} Category • Kudadam Blog"
	description="Blog posts under {category} category"
	noindex={true}
	nofollow={true}
	openGraph={{
		title: `{category} Category • Kudadam Blog`,
		description: `Blog posts under {category} category`,
		url: `https://www.kudadam.com/category/${category}}`,
		type: 'website',
		images: [
			{
				url: 'https://kudadam.sirv.com/logo/logo.png',
				width: 850,
				height: 650,
				alt: 'Og Image Alt'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: `{category} Category • Kudadam Blog`,
		description: `Blog posts under {category} category`,
		image: 'https://kudadam.sirv.com/logo/logo.png',
		imageAlt: 'Kudadam Logo'
	}}
/>

<div class="xl:w-[90%] mx-auto">
	<div class="mb-4 mt-8 text-center">
		<h2 class="capitalize text-red-500 dark:text-white font-bold">{category} category</h2>
		<p class="text-black dark:text-white">
			<i>Blog posts under {category}</i>
		</p>
	</div>
	<div class="flex flex-wrap mt-8 justify-center">
		{#each posts as post}
			<Card
				hide_category
				title={post.title}
				image={post.image}
				date={post.date}
				slug={post.slug}
				category={post.category}
				excerpt={post.excerpt}
			/>
		{/each}
	</div>
</div>

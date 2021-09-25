<!-- 
The Card component is used to house the blog posts
 -->
<script type="text/javascript">
	import _ from 'lodash';
	import optimizeSirv from '$lib/scripts/optimizeSirvImage.js';
	export let image = "https://kudadam.sirv.com/logo/logo_blog.png";
	export let title;
	export let date;
	export let slug = "";
	export let category;
	export let hide_category = false;
</script>

<div id="card" class="w-full md:w-1/2 lg:w-1/3 px-2 mb-9 relative">
	<a
		sveltekit:prefetch
		href="blog/{slug}"
		class="hover:text-red-500 text-black dark:text-white dark:hover:text-red-500"
		id="card-title"
	>
		<img src={optimizeSirv(image, 2)} class="rounded w-full" alt="" id="card-image" />
	</a>
	<a class:hidden={hide_category} href="/blog/category/{_.snakeCase(category)}">
		<span class="category category_{_.snakeCase(category)}">{category}</span></a
	>
	<div>
		<h2 class="text-xl mx-1 my-2 font-semibold">
			<a
				rel="prefetch"
				href="/blog/{slug}"
				class="hover:text-red-500 text-black dark:text-white dark:hover:text-red-500"
				id="card-title">{title}</a
			>
		</h2>
		<small class="text-xs mx-1 font-semibold dark:text-gray-300 text-gray-600">
			<time datetime={date}>{new Date(date).toDateString()}</time>
		</small>
	</div>
</div>

<style type="text/css">
	#card:hover #card-title {
		color: var(--primary-color);
	}

	#card-image {
		height: 200px;
	}
	#card-image:empty {
		border: 0;
		border-radius: 5px;
		background-image: #cfcfcf;
	}
</style>

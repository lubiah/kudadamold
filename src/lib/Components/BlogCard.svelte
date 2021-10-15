<!-- 
The Card component is used to house the blog posts
 -->
<script type="text/javascript">
	import _ from 'lodash';
	export let image  = "https://kudadam.sirv.com/logo/logo_blog.png";
	export let title;
	export let date;
	export let slug = "";
	export let category;
	let Class = "";
	export let hide_category = false;
	export {Class as class};

	if (new URL(image).host === "kudadam.sirv.com"){
		image = new URL(image);
		image.searchParams.set("q",2);
	}
</script>

<div id="card" class="md:mr-6 w-[350px] border  border-gray-300 dark:border-gray-600 hover:shadow-lg rounded mb-9 relative {Class}">
	<a
		sveltekit:prefetch
		href="/blog/{slug}"
		class="hover:text-red-500 text-black dark:text-white dark:hover:text-red-500"
		id="card-title"
	>
		<img src={image} class="w-full" alt="" id="card-image" />
	</a>
	<a class:hidden={hide_category} href="/blog/category/{_.snakeCase(category)}">
		<span class="category category_{_.snakeCase(category)}">{category}</span></a
	>
	<div class="p-2">
		<h2 class="text-xl m-0 pb-8 font-semibold">
			<a
				sveltekit:prefetch
				href="/blog/{slug}"
				class="visited:text-gray-700 dark:visited:text-white hover:text-red-500 hover:no-underline text-gray-700 dark:text-white dark:hover:text-red-500"
				id="card-title">{title}</a
			>
		</h2>
		<small class="text-xs absolute bottom-[5px] font-semibold dark:text-gray-300 text-gray-600">
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

</style>

<script>
	/**@type {BlogPost['title']}*/
	export let title;
	/**@type {BlogPost['excerpt']}*/
	export let excerpt;
	/**@type {BlogPost['slug']}*/
	export let slug;
	/** @type {BlogPost['date']}*/
	export let date;
	/**@type {BlogPost['category']}*/
	export let category;

	import Card from "$components/Card";
	import { noCase } from "$utils";
</script>

<Card class="border-none bg-gray-100 p-2">
	<h2 class="flex-1 text-lg font-semiboldh m-0 p-0 mb-1 text-inherit hover:underline">
		<a class="block" data-reset-styles href="/blog/{slug}">{title}</a>
	</h2>
	<a
		data-reset-styles
		href="/blog/category/{category}"
		class="text-sm w-fit text-purple-600 font-medium py-1 rounded-md mb-1">{noCase(category)}</a
	>
	<p class="text-sm flex-1 p-0 m-0 text-gray-600">{excerpt}</p>
	<div class="[&_*]:text-xs [&_*]:text-gray-600 font-semibold">
		<small
			><time datetime={new Date(date).toISOString()}>{new Date(date).toDateString()}</time></small
		>
	</div>
</Card>

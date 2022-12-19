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

<Card class="p-1 group">
	<a data-reset-styles href="/blog/category/{category}" class="text-sm w-fit text-purple-600 font-bold rounded-md mt-0.5 mb-1">{noCase(category)}</a>
		<h2 class="flex-1 text-lg font-medium m-0 p-0 mb-2 text-inherit hover:underline"><a data-reset-styles href="/blog/{slug}">{title}</a></h2>
		<p class="text-base flex-1 p-0 m-0 text-gray-600">{excerpt}</p>
	<div class="[&_*]:text-xs [&_*]:text-gray-600 font-semibold">
		<small><time datetime="{new Date(date).toISOString()}">{new Date(date).toDateString()}</time></small>
	</div>
</Card>

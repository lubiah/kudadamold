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
	import { noCase } from "$utils";
</script>

<article class="flex flex-col">
	<a
		href="/blog/{slug}"
		data-reset-styles
		class="group w-[320px] flex-1 p-2 rounded-md flex flex-col pb-1 shadow-sm shadow-neutral-400 hover:shadow-neutral-300"
	>
		<a
			href="/blog/category/{category}"
			class="text-sm w-fit bg-purple-50 text-purple-600 group-hover:bg-purple-200 group-hover:text-purple-600 font-bold px-2 py-1 rounded-md my-2"
			data-reset-styles>{noCase(category)}</a
		>
		<h2 class="text-lg flex-1 font-medium m-0 p-0 mb-2 text-inherit">{title}</h2>
		<p class="text-base flex-1 p-0 m-0 text-gray-600">{excerpt}</p>
		<div class="[&_*]:text-xs [&_*]:text-gray-600 font-semibold">
			<small
				><time datetime={new Date(date).toDateString()}>{new Date(date).toDateString()}</time
				></small
			>
		</div>
	</a>
</article>

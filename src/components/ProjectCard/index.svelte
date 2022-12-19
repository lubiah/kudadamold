<script>
	/**@type {string}*/
	export let name;
	/**@type {string}*/
	export let description;
	/**@type {string}*/
	export let image;
	/**@type {string|undefined}*/
	export let demo = undefined;
	/**@type {string|undefined}*/
	export let source = undefined;

	import Card from "$components/Card";
</script>

<Card>
	<img src={image} width="320" height="180" alt="" class="h-[180px] w-full" loading="lazy" />
	<div class="p-2 flex-1">
		<h2 class="text-lg m-0 p-0 font-medium text-inherit">{name}</h2>
		<p class="p-0 m-0 text-base">{description}</p>
	</div>
	<div class="p-2 flex mt-2 [&_*]:text-base gap-x-2">
		{#if demo}
			<a href={demo} class="button" data-reset-styles>View Project</a>
		{/if}
		{#if source}
			<a data-reset-styles class="button" href={source}>Source Code</a>
		{/if}
	</div>
</Card>

<style lang="postcss">
	.button {
		@apply w-full transition-colors duration-75 text-center;
	}
</style>

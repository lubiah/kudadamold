<!-- 
Project Card
This component is used to display my projects in a more organized manner
 -->
<script type="text/javascript">
	import Button from './Button.svelte';

	export let title;
	export let description;
	export let image;
	export let url;
</script>

<div class="border max-w-xs dark:border-gray-300 border-gray-400 m-3 rounded">
	<img src={image} class="block mx-auto" loading="lazy" alt="" />
	<div class="p-3 text-center overflow-ellipsis border-t dark:border-gray-300 border-gray-400">
		<p class="font-semibold text-lg">{title}</p>
		<p>{description}</p>
	</div>
	<div class="flex">
		<Button class="ml-2 my-2" secondary><a href={url}>Visit</a></Button>
	</div>
</div>

<style type="text/css">
	img {
		height: 200px;
	}
</style>

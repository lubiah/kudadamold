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
	<img src={image} class="block mx-auto w-full" loading="lazy" alt="" width="318" height="200" />
	<div class="p-3 text-center overflow-ellipsis border-t dark:border-gray-300 border-gray-400">
		<p class="font-semibold text-lg">{title}</p>
		<p>{description}</p>
	</div>
	<div class="flex px-1">
		<Button class="block w-full"><a class="block hover:!text-white visited:text-white" href={url}>View Project</a></Button>
	</div>
</div>
	
<style type="text/css">
	img {
		height: 200px;
	}
</style>

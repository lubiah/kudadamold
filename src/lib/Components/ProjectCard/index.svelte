<!-- 
Project Card
This component is used to display my projects in a more organized manner
 -->
<script type="text/javascript">

	export let title;
	export let description;
	export let image;
	export let url;
	export let repo = undefined;
</script>

<article class="border dark:border-gray-800 border-gray-300 w-[300px] my-3 mr-3 rounded">
	<img src={image} class="block mx-auto w-full h-[200px]" loading="lazy" alt="{title}" width="300" height="200"/>
	<div class="p-2 text-center">
		<h2 class="font-semibold text-xl my-1 text-inherit hover:text-[color:var(--primary-color)]">{title}</h2>
		<p id="project_card__description" class="leading-6 text-base">{description}</p>
	</div>
	<div class="flex px-1 gap-x-1">
		{#if repo !== undefined}
			<button class="w-full" data-theme="secondary"><a class="block" href="{repo}">Repository</a></button>
		{/if}
		<button class="w-full"><a class="block" href={url}>View Project</a></button>	
	</div>
</article>
	
<style type="text/postcss">
	article:hover h2 {
		color: var(--primary-color);
	}

	button {
		@apply my-1;
	}

	#project_card__description {
		-webkit-box-orient: vertical;
 		-webkit-line-clamp:3;
 		display: -webkit-box;
 		overflow: hidden;
	}
</style>

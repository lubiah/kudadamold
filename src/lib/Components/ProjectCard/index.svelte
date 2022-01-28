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

<article class="border max-w-xs dark:border-gray-300 border-gray-400 mr-3 rounded" id="project_card">
	<img src={image} class="block mx-auto w-full h-[200px]" loading="lazy" alt="" width="318" height="200" />
	<div class="p-2 text-center border-t dark:border-gray-300 border-gray-400">
		<h2 class="font-semibold text-xl my-1 text-inherit hover:text-[color:var(--primary-color)]" id="project_card__title">{title}</h2>
		<p id="project_card__description" class="leading-6 text-base">{description}</p>
	</div>
	<div class="flex p-1 pb-0">
		{#if repo !== undefined}
			<button class="mr-1 w-full" data-theme="secondary"><a class="block" href="{repo}">Source Code</a></button>
		{/if}
		<button class="block w-full"><a class="block" href={url}>View Project</a></button>
		
	</div>
</article>
	
<style type="text/postcss">
	#project_card:hover #project_card__title {
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

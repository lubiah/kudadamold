<script type="text/javascript">


	export let documents;

	import { onMount } from "svelte";
	let SearchModule;
	let BlogCard;
	let SearchJS;
	let results = [];
	let searchInput = "";

	const Search = ()=>{
		results = SearchJS.search(searchInput);

		if (searchInput.trim().length === 0){
			results = [];
		}

	}

	onMount(async ()=>{
		SearchModule = await import("js-search");
		BlogCard = await import("$lib/Components/BlogCard.svelte").then( e => e.default );
		SearchJS = new SearchModule.Search("id");
		SearchJS.addIndex("title");
		SearchJS.addDocuments(documents);
	})
</script>

<div class="p-2 relative">
	<input type="search" class="lg:w-[45%] block ml-auto py-1" placeholder="Search For Articles Here"  on:keyup={Search} bind:value={searchInput}>

	{#if results.length !== 0}
		<div class="absolute flex flex-wrap mt-8 p-2 z-40 border bg-white dark:bg-gray-700 border-1 dark:border-gray-500 shadow-lg w-full rounded overflow-y-auto max-h-[400px]" id="search-results-view">
			{#each results as post (post.id ) }
				<svelte:component this={BlogCard}
				{...post}
				/>
			{/each}
		</div>		

	{/if}

</div>


<style>	
	#search-results-view::-webkit-scrollbar {
		width: 5px;
		background: var(--scrollbar-background);
	}
	#search-results-view::-webkit-scrollbar-thumb {
		background: var(--scrollbar-thumb)
	}
</style>	
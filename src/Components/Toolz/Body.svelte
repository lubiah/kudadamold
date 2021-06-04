<script>
	import ToolzList from "./ToolList.svelte";
</script>

<div id='main' class="mx-auto md:w-2/3 h-full mt-10 text-gray-700 dark:text-gray-300">
	<slot>
	</slot>
</div>
<ToolzList/>

<style>
	:global(input[type="checkbox"]){
		width: inherit;
	}
	#main :global(input[type="text"], input[type="number"], textarea) {
		@apply rounded p-1 border-gray-400 border w-full text-gray-700;
	}
	#main :global(input:focus-visible) {
		outline: unset;
		@apply border-blue-400;
	}
	#main :global(label){
		@appy my-2;
	}
	#main :global(pre){
		max-height: 400px;
		white-space: pre-wrap;
		word-break: break-all;
		scroll-behavior: smooth;
		scrollbar-width:thin;
		overflow-y: scroll;
	}
</style>
<script>
	import ToolzList from "./ToolList.svelte";
</script>

<div id='main' class="mx-auto md:w-2/3 mt-10">
	<slot>
	</slot>
</div>
<ToolzList/>

<style>
	:global(input[type="checkbox"]){
		width: inherit;
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
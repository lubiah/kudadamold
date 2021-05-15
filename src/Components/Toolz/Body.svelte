<div id='main' class="mx-auto md:w-2/3 mt-10">
	<slot>
	</slot>
</div>

<style>
	:global(input[type="checkbox"]){
		width: inherit;
	}
	#main :global(input[type="text"], input[type="number"]){
		@apply rounded p-1 border-gray-400 border w-full;
	}
	#main :global(input:focus-visible) {
		outline: unset;
		@apply border-blue-400;
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
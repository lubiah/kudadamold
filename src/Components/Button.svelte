<script type="text/javascript">
	export let type = "button";
	export let disabled = false;
	export let primary = false;

</script>
<button on:click
	{type} 
	{disabled} 
 class="rounded my-3 py-1 mx-3 my-1 px-3 text-white" class:bg-blue-600={primary}>
	<slot></slot>
</button>


<style type="text/css">
	button {
		@apply rounded my-3 py-1 mx-3 my-1 px-3 text-white;
	}
	button :global(*){
		@apply text-white;
	}
	.theme {
		background: tomato;
	}
</style>
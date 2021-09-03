<script>

	let Class = "";

	export { Class as class};
	export let type = "button";
	export let disabled = false;
	export let primary = true;
	export let secondary = false;
	export let block = false;
	export let danger = false;
	export let center = false;

</script>
<button on:click
	{type} 
	{disabled} 
 class="rounded my-3 py-1 my-1 px-3 text-white {Class}" class:bg-blue-600={primary} class:secondary class:block class:bg-red-600={danger} class:center>
	<slot></slot>
</button>


<style type="text/css">
	:global(.secondary) {
		background: tomato;
	}

	.center {
		display: block;
		@apply mx-auto;
	}
</style>
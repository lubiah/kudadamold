<script type="text/javascript">

	let Class = "";

	export { Class as class};
	export let type = "button";
	export let disabled = false;
	export let primary = true;
	export let secondary = false;
	export let block = false;
	export let danger = false;

</script>
<button on:click
	{type} 
	{disabled} 
 class="rounded my-3 py-1 mx-3 my-1 px-3 text-white {Class}" class:bg-blue-600={primary} class:secondary class:block class:bg-red-600={danger}>
	<slot></slot>
</button>


<style type="text/css">
	:global(.secondary) {
		background: tomato;
	}
</style>
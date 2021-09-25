<script>
	let Class = '';

	export { Class as class };
	export let type = 'button';
	export let disabled = false;
	export let primary = true;
	export let danger = false;
</script>

<button
	on:click
	{type}
	{disabled}
	class="py-1 my-1 px-5 text-sm rounded text-white {Class}"
	class:primary
	class:!bg-red-600={danger}
>
	<slot />
</button>

<style type="text/css">
	button:active{
		transform: translateY(0.5px);
		box-shadow: unset;
	}

	.primary {
		background: var(--primary-color);
	}

	button {
		box-shadow: 1px 1px 2px black
	}
</style>

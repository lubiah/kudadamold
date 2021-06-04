<script type="text/javascript">
	export let danger = false;
	export let warning = false;
	export let center = false;
	export let message;
	let hidden = false;

	import { fade } from "svelte/transition";
</script>

{#if !hidden}
<div transition:fade class:danger={danger} class:hidden={hidden} class="text-white relative p-2 max-w-sm text-center rounded py-6 my-4" class:mx-auto={center} class:warning={warning}>


	<span class="absolute top-0 right-0 p-2 cursor-pointer text-gray-700" on:click={()=>hidden = true}>&#x2715;</span>
	
	{@html message}

</div>
{/if}

<style>
	.warning {
		@apply bg-yellow-500;
	}
	.danger {
		@apply bg-red-500;
	}
</style>


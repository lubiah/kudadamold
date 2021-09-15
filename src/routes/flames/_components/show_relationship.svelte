<script type="text/javascript">
	import { createEventDispatcher } from 'svelte';
	export let hidden = true;
	export let results;
	let dispatch = createEventDispatcher();
	
	const hide = () => {
		hidden = !hidden;
		dispatch('close', true);
	};


</script>

<div class="fixed" id="backdrop" class:hidden on:click|self={hide}>
	<div class="bg-white dark:bg-gray-700 p-4 border border-gray-300 max-w-sm m-auto mx-6 md:mx-auto mt-28 italic">
		<p class="text-red-600 text-[70px] font-bold text-center">{results.relationship[0]}</p>
		<p class="text-2xl"  id="results-text">
			<span class="font-semibold text-blue-600">{results.you_name}</span> and <span class="font-semibold text-blue-600">{results.partner_name}</span> are <span class="text-red-600 font-semibold">{results.relationship[1]}</span>
		</p>
		<button class="px-3 mt-8 py-1 text-lgs text-white bg-red-600 rounded hover:bg-blue-500" on:click={hide}>Close</button>
	</div>
</div>

<style type="text/css">
	#backdrop {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	@keyframes change_colors {
		from {
			color: red;
		}

		to {
			color: green;
		}
	}
</style>

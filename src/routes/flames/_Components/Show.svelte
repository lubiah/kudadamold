<script>
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	export let data;
	console.log(data)
	
	const hideBackdrop = ()=>{
		dispatch("hide",{
			hide:true
		})
	}

</script>

<div id="backdrop" on:click|self={hideBackdrop} class="fixed top-0 bottom-0 w-full h-100">
	<div>
		<div id="container" class="bg-white relative max-w-sm md:mx-auto my-auto my-32 p-2 rounded-lg mx-4">
			<h1 class="text-center animate-bounce text-red-600 text-[90px] leading-none font-bold">{data.relationship[0]}</h1>
			<p class="text-[25px]">
				Relationship between
			<span class="font-bold text-blue-500">{data.first_name}</span> and <span class="font-bold text-blue-500">{data.second_name}</span> is <span class="font-bold text-red-500">{data.relationship[1]}</span>
			</p>
			<button class="mt-5 bg-red-700 text-xl px-3 rounded py-1 text-white" on:click={hideBackdrop}>Close</button>
		</div>
	</div>
</div>



<style>
	#backdrop {
		background: rgba(0, 0, 0, 0.8);
	}
</style>
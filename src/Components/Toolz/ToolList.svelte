<script type="text/javascript">
	let hidden = false;
	import { onMount, onDestroy } from "svelte";
	console.log("GE");
onMount(()=>{
	console.log("Mounted");
});
onDestroy(()=>{
	console.log("Destroyed");
})
</script>

<div id="main">

	{#if !hidden}
		<div>
			<ul>
				<li>sdd</li>
				<li>sd</li>
				<li>sds</li>
				<li>sd</li>
				<li>dsd</li>
			</ul>
		</div>
	{/if}

	<button class="bg-blue-500 text-white rounded-full p-4" on:click={()=> console.log("sas")}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
		</svg>
	</button>
</div>

<style type="text/css">
	#main {
		position: fixed;
		bottom: 10px;
	}
</style>
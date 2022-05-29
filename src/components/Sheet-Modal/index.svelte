<script>
	export let open = false;
    export let position = "bottom";
	export let showBackdrop = false;
	export let clickBackdropToClose = true;
	export let closeWithEscape = true;
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import { browser } from "$app/env";

	let dispatch = createEventDispatcher();

	const handleBackdropClick = ()=>{
		if (clickBackdropToClose){
			open = !open;
			document.body.style.overflowY = "auto";
			dispatch("close",true);	
		}
	}

</script>

<svelte:window
	on:keydown={event=>{
		if (event.key === "Escape" && closeWithEscape === true){
			open = false;
			dispatch("close",true)
		}
	}}
/>

<div 
	class="sheet-dialog-container"
	class:backdrop={showBackdrop}
	on:click|self={handleBackdropClick}
	style:position={open === true ? "fixed" : "revert"}
	>
	{#if open}
		<span style:display="none">{#if browser && showBackdrop === true}{document.body.style.overflowY = "hidden"}{/if}</span>
		<div
		class="sheet-dialog"
		transition:slide
		class:top = {position == "top"}
		>
			<slot/>
		</div>
	{/if}
</div>


<style>

	.sheet-dialog-container {
		z-index: var(--z-index,9999);
	}
	
	.top {
		top: 0;
		bottom: revert !important;
	}

	.backdrop {
		position:fixed;
		bottom: 0;
		z-index: var(--z-index,9999);
		top:0;
		left: 0;
		height: 100%;
		width: 100%;
		background: var(--sheet-dialog-backdrop-background,rgba(0,0,0,0.7));
	}
	.sheet-dialog {
		position: fixed;
		overflow: auto;
		background: var(--sheet-dialog-background,blue);
		left: 0;
		right: 0;
		bottom: 0;
		color: var(--sheet-dialog-color,white);
		padding: var(--sheet-dialog-padding, 10px);
		max-height: var(--maximum-height,30%);
	}

	.sheet-dialog::-webkit-scrollbar {
		width: 5px;
		border-radius: 0% !important;
	}

	.sheet-dialog::-webkit-scrollbar-track {
		border-radius: none;
	}
</style>
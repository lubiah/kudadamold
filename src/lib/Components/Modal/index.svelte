<script>
	import { createEventDispatcher } from 'svelte';

    export let hidden = true;
    let Class = "";
    let dispatch = createEventDispatcher();
    export {Class as class}

    const hideModal = ()=>{
        hidden = !hidden;
        dispatch("hide",{
            value: hidden
        })
    }
</script>


{#if !hidden}
     <div id="backdrop" on:click|self={hideModal}>
        <div id="modal-content" class="bg-white max-w-sm mx-auto mt-[70px] dark:bg-slate-900 dark:shadow {Class}">
            <slot/>
        </div>
     </div>
{/if}


<style>
    #backdrop {
        background: rgba(0,0,0,0.7);
        position: fixed;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
        top: 0;
        z-index: 88888;
    }
</style>
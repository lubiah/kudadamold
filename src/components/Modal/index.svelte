<script>
	import { createEventDispatcher } from 'svelte';

    export let hidden = true;
    let Class = "";
    let dispatch = createEventDispatcher();
    export {Class as class}

    const hideModal = ()=>{
        hidden = !hidden;
        document.body.style.overflowY = "scroll";
        dispatch("hide",{
            value: hidden
        })
    }
</script>


{#if !hidden}
{document.body.style.overflowY = "hidden"}
    <div class="backdrop" on:click|self={hideModal}>
        <div class="mx-auto my-[5%] {Class}">
            <slot/>
        </div>
    </div>
{/if}


<style>
    .backdrop {
        background: rgba(0,0,0,0.7);
        position: fixed;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
        top: 0;
        z-index: 88888;
        display: flex;
        align-content: center;

    }


</style>
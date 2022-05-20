<script>
	import { onMount } from 'svelte';
    import SheetModal from "../Sheet-Modal";
    $: showUpdate = false;


    const dialogClicked = async ()=>{
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration.waiting){
            registration.waiting.postMessage("SKIP_WAITING");
        }
        showUpdate = false;
    }

    onMount(async ()=>{
        if ("serviceWorker" in navigator){
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration === undefined)
            return;
            if (registration.waiting){
                showUpdate = true;
            }
                
            
            registration.addEventListener("updatefound", async ()=>{
                if (registration.installing){
                    registration.installing.addEventListener("statechange", async ()=>{
                        if (navigator.serviceWorker.controller){
                            showUpdate = true;
                        }
                      
                        else
                            console.log("Old service worker")

                    })
                }
            });

            let refreshing = false;
            navigator.serviceWorker.addEventListener("controllerchange", ()=>{
                if (!refreshing){
                    window.location.reload();
                    refreshing = true;
                }
            })
        }
    })
</script>
{#if showUpdate}
    <SheetModal open={true}>
        <div class="text-center">
            <p class="m-0">
                Hey, I just rebuilt the website. Refresh to see latest content
            </p>
            <button on:click={dialogClicked} class="bg-gray-700">OK</button>
        </div>
        
    </SheetModal>
{/if}


<style type="text/postcss">
    :global(.sheet-dialog){
        @apply border-t border-gray-700 bg-gray-800 !important;
    }
</style>
<script>
	import Modal from '$lib/Components/Modal';
    import { onMount } from "svelte";
    let documents, value, search;
    export let hidden = true;
    let results = [];
    let Search;
    onMount(async ()=>{
        Search = await import("minisearch").then(module=>module.default);
        let documents_res = await fetch("/blog.json?all=true");
        documents = await documents_res.json();
        search = new Search({
        fields: ['title','description'],
        storeFields: ['title','slug','description']
    });
    search.addAll(documents.posts);
    })

    

    const findResults = ()=>{

        let search_res = search.search(value, {
            boost: {
                title: 5
            },
            prefix: true,
            fuzzy: 0.2
        });
        results = search_res;
    }
</script>

<Modal {hidden} class="rounded p-2" on:hide>
    <!-- svelte-ignore a11y-autofocus -->
    <input type="search" name="" class="outline-none rounded-none" id="" autofocus bind:value on:input={findResults} placeholder="Start typing to search"/>
    {#if results.length !== 0}
        <ul class="list-none px-1 h-[300px] fancy-scrollbar mt-2 overflow-y-auto">
            {#each results as item}
                 <li on:click={()=>hidden = true} class="border-b dark:border-gray-700 py-2 text-base hoverable">
                     <a href="/blog/{item.slug}" class="block text-inherit hover:text-inherit visited:text-inherit">
                        <span class="font-semibold block leading-snug">{item.title}</span>
                        <span class="truncate block">{item.description}</span>
                     </a>
                 </li>
            {/each}
        </ul>
    {/if}
</Modal>
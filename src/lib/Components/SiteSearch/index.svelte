<script>
	import Modal from '$lib/Components/Modal';
    import Search from "minisearch";
    import { onMount } from "svelte";
    let documents, value, search;
    export let hidden = true;
    let results = [];
    onMount(async ()=>{

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

<Modal {hidden} class="p-2 rounded h-[370px]" on:hide>
    <!-- svelte-ignore a11y-autofocus -->
    <input type="search" name="" id="" autofocus bind:value on:input={findResults} placeholder="Start typing to search"/>
    {#if results.length !== 0}
        <ul class="list-none p-0 h-[300px] fancy-scrollbar mt-2 overflow-y-auto">
            {#each results as item}
                 <li on:click={()=>hidden = true} class="border-b py-2 text-base hoverable">
                     <a href="/blog/{item.slug}" class="block text-inherit hover:text-inherit visited:text-inherit">
                        <span class="font-semibold block leading-snug">{item.title}</span>
                        <span class="truncate block">{item.description}</span>
                     </a>
                 </li>
            {/each}
        </ul>
    {/if}
</Modal>

<!-- 

<div class="flex flex-wrap fixed inset-x-0 border max-w-sm mx-auto w-[90%] p-3 border-gray-200 rounded-sm bg-white" class:hidden>
    <input type="search" bind:value class="border-r h-10 rounded-none w-full" on:input={findResults} name="" id="" placeholder="Enter your query...">
    <div class="basis-[100%] bg-white dark:bg-slate-900 max-h-[400px] overflow-y-auto fancy-scrollbar">
        {#if results.length !== 0}
            {#each results as item}
                <div class="p-2 border">
                    <a href="/blog/{item.slug}" class="!text-inherit"><h2 class="text-lg !text-inherit">{item.title}</h2></a>
                </div>                    
            {/each}
            <button class="p-0 m-0 w-full block py-2"><a class="block" href="/search?q={value}">View More</a></button>
        {/if}
    </div>
</div> -->
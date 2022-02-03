<script context="module">
    import Search from "minisearch";
    import { onMount } from "svelte";


    export const load = async ({ url, fetch  })=>{
        let data = await fetch("/blog.json?all= true");
        let query = url.searchParams.get("q");
        let json = await data.json();

    return {
        props: {
            data: json.posts,
            query
        }
    }
}
</script>

<script>
    export let data,query;
    let results = [];

    let search = new Search({
        fields: ['title','keywords'],
        storeFields: ['title','slug','excerpt']
    });
    search.addAll(data);
    const findResults = ()=>{
        query === null ? query = "" : query = query;
        results = search.search(query, {
            boost: {
                title: 5
            },
            prefix: true,
            fuzzy: 0.3
        });
    }
    
    onMount(()=>{
        findResults()
    })
</script>


<div class="mt-5 xl:w-[60%] mx-auto">
    <input type="search" class="max-w-md block mx-auto" bind:value={query} on:input={findResults} placeholder="Enter search query">

    <div class="mt-7 mx-auto">
        {#if results.length === 0}
            <p class="text-center text-[50px] font-bold text-gray-300 dark:text-slate-700">
                Nothing to display
            </p>
        {:else}
        <div class="mx-auto">
            {#each results as item}
                 <article class="border my-4 p-2 rounded">
                     <h2 class="text-lg "><a href="/blog/{item.slug}" class="!text-inherit">{item.title}</a></h2>
                     <p>{item.excerpt}</p>
                 </article>
            {/each}
        </div>
        {/if}
    </div>
</div>
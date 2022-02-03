<script>
    import SearchIcon from "$lib/Icons/search.svelte";
    import Search from "minisearch";
    import { onMount } from "svelte";
    let hidden = true;
    let documents, value, search;
    let Class = "";
    let results = [];
    export {Class as class}
    onMount(async ()=>{
        document.addEventListener('mouseup', (e) => {
			let selected = e.target;
			let closest = selected.closest('#search-container');
			if (closest == null) {
                hidden = true;
                value = "";
            }
		});

        let documents_res = await fetch("/blog.json?all=true");
        documents = await documents_res.json();
        search = new Search({
        fields: ['title','description','excerpt'],
        storeFields: ['title','slug']
    });
    search.addAll(documents.posts);
    })

    

    const findResults = ()=>{

        let search_res = search.search(value, {
            boost: {
                title: 5
            },
            prefix: true,
            fuzzy: 0.3
        });
        search_res = search_res.slice(0,3);
        results = search_res;
    }
</script>

<form class="{Class} my-auto" id="search-container">
    <span on:click={()=>hidden = !hidden} title="Search the website for information"><SearchIcon/></span>
    <div class="flex flex-wrap fixed inset-x-0 border max-w-sm mx-auto w-[90%]" class:hidden>
        <input type="search" bind:value class="border-0 border-r h-10 rounded-none w-full" on:input={findResults} name="" id="">
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
    </div>
</form>

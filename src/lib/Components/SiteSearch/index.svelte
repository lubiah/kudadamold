<script>
	import Modal from '$lib/Components/Modal';
    import { onMount } from "svelte";
    let value, search;
    export let hidden = true;
    let results = [];
    let Search;
    let stop_words = new Set(["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"])
    
    onMount(async ()=>{
        Search = await import("minisearch").then(module=>module.default);
        let request = await fetch("/blog/__data.json?all=true");
        let { all } = await request.json();
        search = new Search({
        fields: ['title','description'],
        storeFields: ['title','slug','description'],
        processTerm: (term, _fieldName) =>
            stop_words.has(term) ? null : term.toLowerCase()
    });
    search.addAll(all);
    })

    

    const findResults = ()=>{

        let search_res = search.search(value, {
            fuzzy: 0.2,
            boost: {
                title: 5
            }
        });
        results = search_res;
    }
</script>

<Modal {hidden} class="rounded p-2 bg-white h-min w-[500px] dark:bg-gray-900 max-w-sm" on:hide>
    <!-- svelte-ignore a11y-autofocus -->
    <input type="search" name="" class="outline-none rounded-none" id="" autofocus bind:value on:input={findResults} placeholder="Start typing to search"/>
    {#if results.length !== 0}
        <ul class="list-none px-0 h-[300px] fancy-scrollbar mt-2 overflow-y-auto">
            {#each results as item}
                 <li on:click={()=>hidden = true} class="border-b dark:border-gray-700 py-2 text-base hoverable">
                     <a href="/blog/{item.slug}" class="block text-inherit hover:text-inherit visited:text-inherit">
                        <span class="font-semibold block leading-snug">{item.title}</span>
                        <span class="block leading-tight">{item.description}</span>
                     </a>
                 </li>
            {/each}
        </ul>
    {/if}
</Modal>
<script context="module">
    export const prerender = true;
    import Search from "minisearch";
    import { onMount } from "svelte";
	import SEO from 'svelte-seo';

</script>

<SEO
title="{seo.title}"
description="{seo.description}"
nofollow={true}
canonical={seo.canonical}
openGraph={{
	title: `${seo.title}`,
	description: `${seo.description}`,

}}
/>

<script>
    export let data;

    let stop_words = new Set(["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"])
  
    let results = [];
    let query;
    let search = new Search({
        fields: ['title','description'],
        storeFields: ['title','slug','description'],
        processTerm: (term, _fieldName) =>
            stop_words.has(term) ? null : term.toLowerCase()
    });
    search.addAll(data);

    const findResults = ()=>{
    
        query === null ? query = "" : query = query;
        results = search.search(query, {
            boost: {
                title: 5
            },
            prefix: true,
            fuzzy: 0.2
        });
    }
    
    onMount(()=>{
        if (new URL(window.location.href).searchParams.has("q")){
            let parameter = new URL(window.location.href).searchParams.get("q");
            query = parameter;
        }
        findResults();
    })

    let seo = {
		title: "Kudadam • Search | All the information on my website can be located here",
		description: "This is where all the information on my website can be located",
		canonical: "https://www.kudadam.com/search"
	}
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
                 <article class="border dark:border-gray-800 my-4 p-2 rounded">
                     <h2 class="text-lg "><a href="/blog/{item.slug}" class="!text-inherit">{item.title}</a></h2>
                     <p>{item.description}</p>
                 </article>
            {/each}
        </div>
        {/if}
    </div>
</div>

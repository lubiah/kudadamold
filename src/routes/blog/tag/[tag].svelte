<script>
    import Card from "$lib/Components/BlogCard";
    
    export let posts,tag;
</script>

<main class="max-w-6xl mx-auto">
    <h1 class="text-center font-bold">Blog Posts under {tag}</h1>
    <section class="flex flex-wrap py-4 justify-center items-center">
        {#each posts as post}
            <Card {...post}/>
        {/each}
    </section>
</main>
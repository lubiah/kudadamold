<script>
    export let posts, tag;

    import Head from "svelte-seo";
    import Card from "$components/BlogCard"

    const  meta = {
        title: `${tag} Tag • Kudadam Blog`,
        description: `A list of blog posts written under ${tag}`,
        canonical: `https://www.kudadam.com/blog/${tag}`,
        image: `https://ik.imagekit.io/kudadam/logo/logo.png`
    }
</script>

<Head
title = {meta.title}
description = {meta.description}
noindex = {true}
nofollow = {true}

openGraph = {{
    title: meta.title,
    description: meta.description,
    url: `${meta.canonical}`,
    type: "website",
    images: [
			{
				url: `${meta.image}`,
				width: 850,
				height: 650,
				alt: 'Og Image Alt'
			}
		]
}}

twitter={{
    site: '@kudadam_',
    title: `${meta.title}`,
    description: `${meta.description}`,
    image: `${meta.image}`,
    imageAlt: 'Kudadam Logo'
}}
/>

<main>
    <div>
        <h1 class="text-center font-bold">Blog Posts under {tag}</h1>
        <section class="flex flex-wrap py-4 justify-center items-center">
            {#each posts as post}
                <Card {...post}/>
            {/each}
        </section>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 1fr min(75rem ,100%) 1fr;
    }

    main div {
        grid-column: 2/3;
    }
</style>
<script context="module">
    export const prerender = true;
</script>
<script>
    import Card from "$lib/Components/BlogCard";
    export let posts,tag;

    import Head from "svelte-seo";

    let seo = {
        title: `${tag} Tag • Kudadam Blog`,
        description: `A list of blog posts written under ${tag}`
    }
</script>

<Head
title = {seo.title}
description = {seo.description}
noindex = {true}
nofollow = {true}

openGraph = {{
    title: seo.title,
    description: seo.description,
    url: `https://www.kudadam.com/blog/${tag}`,
    type: "website",
    images: [
			{
				url: 'https://lucretius.sirv.com/logo/logo.png',
				width: 850,
				height: 650,
				alt: 'Og Image Alt'
			}
		]
}}

twitter={{
    site: '@kudadam_',
    title: seo.title,
    description: seo.description,
    image: 'https://lucretius.sirv.com/logo/logo.png',
    imageAlt: 'Kudadam Logo'
}}
/>
<main class="max-w-6xl mx-auto">
    <h1 class="text-center font-bold">Blog Posts under {tag}</h1>
    <section class="flex flex-wrap py-4 justify-center items-center">
        {#each posts as post}
            <Card {...post}/>
        {/each}
    </section>
</main>
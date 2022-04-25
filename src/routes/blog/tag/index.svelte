<script context="module">
    export const prerender = true;

    export const load = async ( { fetch })=>{
        let request = await fetch(`/blog.json?all=true&exclude=posts`);
        let { all } = await request.json();
        let tags = new Set();
        all.forEach(post => {
        if (post.tags){
            tags.add(...post.tags);
        }
    });

    return {
        props: {
            tags: [...tags]
        }
    }
    }
</script>

<script>
    import Head from "svelte-seo";

    export let tags;

    const meta = {
        title: "Blog Tags • Kudadam",
        description: "This pages shows all the blog tags",
        url: "https://www.kudadam.com/blog/tag",
        image: "https://lucretius.sirv.com/logo/logo.png"
    }
</script>

<Head
title = "{meta.title}"
description = "{meta.description}"
nofollow = {true}
noindex = {true}

openGraph = {{
    title: `${meta.title}`,
    description: `${meta.description}`,
    url: `${meta.url}`,
    type: "website",
    images: [
			{
				url: `${meta.image}`,
				width: 850,
				height: 650,
				alt: 'Logo'
			}
		]
}}

twitter = {{
    	site: '@kudadam_',
        title:  `${meta.title}`,
        description: `${meta.description}`,
        image: `${meta.image}`,
		imageAlt: 'Logo of Kudadam'
}}
/>


<main>
    <div>
        <h1 class="font-bold text-center my-3">Tags</h1>
        <ul class="list-none flex flex-wrap items-center justify-center gap-y-14 mt-10">
            {#each tags as tag}
                 <li>
                     <a  sveltekit:prefetch href="/blog/tag/{tag}" class="text-inherit block p-4 rounded bg-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 dark:bg-slate-800 m-14">#{tag}</a>
                 </li>
            {/each}
        </ul>       
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 1fr min(100%, 65ch) 1fr;
    }

    main div {
        grid-column: 2/3;
    }
</style>
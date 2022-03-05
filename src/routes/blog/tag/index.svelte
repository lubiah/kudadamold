<script context="module">
    export const prerender = true;
</script>t

<script>
    export let tags;
    import Head from "svelte-seo";
</script>


<Head
title = "Tags • Kudadam Blog"
description = "A page which shows the blog tags"
nofollow = {true}
noindex = {true}

openGraph = {{
    title: "Tags • Kudadam Blog",
    description: "A page which shows the blog tags",
    url: "https://www.kudadam.com/blog/tag",
    type: "website",
    images: [
			{
				url: 'https://kudadam.sirv.com/logo/logo.png',
				width: 850,
				height: 650,
				alt: 'Logo'
			}
		]
}}

twitter = {{
    	site: '@kudadam_',
        title: "Tags • Kudadam Blog",
        description: "A page which shows the blog tags",
        image: 'https://kudadam.sirv.com/logo/logo.png',
		imageAlt: 'Logo of Kudadam'
}}
/>

<div class="max-w-3xl mx-auto">
    <h1 class="font-bold text-center my-3">Tags</h1>
    <ul class="list-none flex flex-wrap items-center justify-center gap-y-14 mt-10">
        {#each tags as tag}
             <li>
                 <a  sveltekit:prefetch href="/blog/tag/{tag}" class="text-inherit block p-4 rounded bg-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 dark:bg-slate-800 m-14">#{tag}</a>
             </li>
        {/each}
    </ul>
</div>
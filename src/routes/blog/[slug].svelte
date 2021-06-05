<script context="module">
	import { onMount } from "svelte";
	import SEO from "svelte-seo";
	import Head from "../../Components/Head.svelte";
	import PageProgress from "../../Components/PageProgress.svelte";
  import "prismjs/themes/prism-dark.css";

  
	export async function preload(page, session){
		const { slug } = page.params;
    const component = await import(`./_blog/${slug}.md`);
    return { 
      metadata : component.metadata,
      content: component.default
     }
	}
</script>
<script type="text/javascript">
  export let metadata, content;

  const fix_links = ()=> {
    let links = document.querySelectorAll("a");
    links.forEach(link =>{
      if (link.getAttribute("href").startsWith("#")){
        link.style.color = "green"
      }
      link.href = (link.getAttribute("href").startsWith("#")) ? `${window.location.href}${link.getAttribute("href")}` : `${link.href}`;
      
    })
};

onMount(()=>{
  fix_links();
})
</script>

<Head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/themes/prism-dark.css">
</Head>

<SEO
title = "{metadata.title} • Kudadam Blog"
description = "{metadata.description}"
keywords = "{metadata.keywords}"
canonical = "https://kudadam.com/blog/{metadata.url}"

openGraph={{
    title: `${metadata.title}`,
    description: `${metadata.description}`,
    type: "article",
    url: `https://www.kudadam.com/blog/${metadata.url}`,
    article: {
      publishedTime: `${metadata.date}`,
     // modifiedTime: `${post[0].last_updated}`,
      authors: [
        `Lucretius Biah`
      ],
    },
    images: [
      {
        url: `${metadata.image}`,
        width: 850,
        height: 650,
        alt: "Alt image",
      },
    ],
  }}

twitter={{
    site: "@lucretius_1",
    title: `${metadata.title}`,
    description: `${metadata.description}`,
    image: `${metadata.image}`,
    imageAlt: "Alt image",
  }}
  
/>

<div class="my-4" id="post">
	<div class="md:w-2/3 md:mx-auto">
		<h1 class="text-center font-bold text-gray-700 capitalize dark:text-white">{metadata.title}</h1>
    <img src="{metadata.image}" alt="" id="post-image">
    <div class="py-4 text-gray-700 dark:text-gray-300 ps-4x border-b my-1 border-gray-300">
      <p class="pl-2">
        <span>{metadata.author || "Lucretius Biah"}</span> • <date datetime={metadata.date}>{new Date(metadata.date).toDateString()}</date>
      </p>
    </div>
		<div class="leading-tight px-2">
      <svelte:component this={content}/>  
    </div>
	</div>
</div>

{#if process.browser}
<PageProgress color="red" position="bottom"/>
{/if}

<style type="text/css">
  #post :global(h2,h3,h4)  {
    margin: 10px 2px;
    @apply font-semibold text-red-500;
  }
  :global(img.Sirv:not([width]):not([height])){
    max-width: 100%;
    max-height: 400px;
  }
  #post :global(img:not(#post-image)){
    max-height: 400px;
  }
  #post :global(ul){
    list-style-type: disc;
  }
  #post :global(ol){
    list-style-type: lower-roman;
  }
  :global(#post-image){
    max-height: 350px !important;
    width: 100%;
    height: 350px;
    border-radius: 5px;
  }
  :global(#post-image:empty){
    max-height: 300px;
    background: linear-gradient(pink,violet);
    width: 100%;
  }
  :global(.toc){
    @apply my-4; 
  }
  :global(.toc ol){
    list-style-position: inside;
    list-style-type: disc;
  }
</style>
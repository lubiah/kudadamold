<script context="module">
	import { onMount } from "svelte";
	import SEO from "svelte-seo";
	import Head from "../../Components/Head.svelte";
	import PageProgress from "svelte-page-progress";
	import jquery from "jquery";
  
	export async function preload(page, session){
		const { slug } = page.params;
		const res = await this.fetch(`blog/${slug}.json`);
		const post = await res.json();
		return { post }
	}
</script>
<script type="text/javascript">
	export let post;
</script>

<Head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/solarized-dark.min.css" integrity="sha512-H+WY7zsI0kQwkbYE+yp/9vg/UzpiyuKERzpxOaGwKCc7iFoNpi0h3mQ4GpZMO9lDaVzc1xjD3e6g/UMuUlOicg==" crossorigin="anonymous" />
</Head>

<SEO
title = "{post.title} • Kudadam Blog"
description = "{post.description}"
keywords = "{post.keywords}"
canonical = "https://kudadam.com/blog/{post.url}"

openGraph={{
    title: `${post.title}`,
    description: `${post.description}`,
    type: "article",
    url: `https://www.kudadam.com/blog/${post.url}`,
    article: {
      publishedTime: `${post.date}`,
     // modifiedTime: `${post[0].last_updated}`,
      authors: [
        `Lucretius Biah`
      ],
    },
    images: [
      {
        url: `${post.image}`,
        width: 850,
        height: 650,
        alt: "Alt image",
      },
    ],
  }}

twitter={{
    site: "@lucretius_1",
    title: `${post.title}`,
    description: `${post.description}`,
    image: `${post.image}`,
    imageAlt: "Alt image",
  }}
  
/>

<div class="" id="post">
	<div class="md:w-2/3 md:mx-auto">
		<h1 class="text-center font-bold text-gray-700">{post.title}</h1>
		<div class="leading-tight">{@html post.html}</div>
	</div>
</div>

<!-- {#if process.browser}
<PageProgress color="tomato" height="6px" position="bottom"/>
{/if} -->

<style type="text/css">
  #post :global(h2,h3,h4)  {
    margin: 10px 2px;
    @apply font-semibold text-red-500;
  }
  #post :global(.toc) {
    @apply my-10;
  } 
  :global(img.Sirv:not([width]):not([height])){
    max-width: 100%;
    max-height: 400px;
  }
</style>
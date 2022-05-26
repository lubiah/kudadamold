<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import NavBar from '$lib/Components/Navbar';
	import Footer from '$lib/Components/Footer';
	import Update from "$lib/Components/UpdateWebsite";
	import Head from "svelte-seo";

	onMount(async ()=>{
		const LazyloadImages = await import("$lib/Scripts/lazy-load-images").then(e => e.default);
	
	})
</script>

<NavBar/>

<Head>
	<link rel="alternate" type="application/rss+xml" href="https://www.kudadam.com/blog/feed.xml" />
	<link rel="preconnect" href="https://ik.imagekit.io/kudadam" />
	<script async src="//static.getclicky.com/101367229.js"></script>
</Head>

<div class="container mx-auto min-h-screen px-3 mt-20" id="layout_root">
	<slot />
</div>
<noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101367229ns.gif" /></p></noscript>
<Footer />

<Update/>

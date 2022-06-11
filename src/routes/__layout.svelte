<script>
	import { afterUpdate } from 'svelte';
	import '../app.css';
	import Navbar from '$components/Navbar';
	import Footer from '$components/Footer';
	import Update from "$components/UpdateWebsite";
	import Head from "svelte-seo";

	afterUpdate(async ()=>{
		const LazyloadImages = await import("$lib/Scripts/lazy-load-images").then(e => e.default);
		LazyloadImages();
	});
	
</script>

<Navbar/>

<Head>
	<link rel="alternate" type="application/rss+xml" href="https://www.kudadam.com/blog/feed.xml">
	<link rel="preconnect" href="https://ik.imagekit.io/kudadam">
	<script async src="//static.getclicky.com/101369509.js"></script>
</Head>

<div class="container mx-auto min-h-screen px-3 mt-20" id="layout_root">
	<slot></slot>
</div>
<noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101369509ns.gif" /></p></noscript>
<Footer/>
<Update/>
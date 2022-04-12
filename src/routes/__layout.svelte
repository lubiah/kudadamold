<script>
	import '../app.css';
	import NavBar from '$lib/Components/Navbar';
	import Footer from '$lib/Components/Footer';
	import Update from "$lib/Components/UpdateWebsite";
</script>

<NavBar/>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" href="https://www.kudadam.com/blog/feed" />
	<script async src="//static.getclicky.com/101360697.js"></script>
</svelte:head>
<div class="container mx-auto min-h-screen px-3 mt-20" id="layout__container">
	<slot />
</div>
<noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101360697ns.gif" /></p></noscript>
<Footer />

<Update/>
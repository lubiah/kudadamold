<script>
	import '../app.css';
	import NavBar from '$lib/Components/Navbar';
	import Footer from '$lib/Components/Footer';
</script>

<NavBar/>
<svelte:head>
	<link rel="alternate" type="application/rss+xml" href="https://www.kudadam.com/blog/feed">
</svelte:head>
<div class="container mx-auto min-h-screen px-3 mt-20" id="layout__container">
<slot />
</div>
<Footer />

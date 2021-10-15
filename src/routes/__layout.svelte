<script>
	import '../app.css';
	import NavBar from '$lib/Components/Navbar.svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import Head from 'svelte-seo';
</script>


<NavBar />
<div class="container min-h-screen mt-20 px-3" id="layout__container">
	<slot />
</div>
<Footer />
<svelte:head>
<script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.4/themes/red/pace-theme-center-radar.min.css" integrity="sha512-M++iGRZnV6/bCzf9TZ/Vk0l4gi8ZSZ/0DI8MUOxkSCDFSiGy9eT00JO3QTMnIUygZR/p1ZXOCl1+qdjktkwRxQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>
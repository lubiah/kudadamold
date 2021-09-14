<script>
	import '../app.postcss';
	import NavBar from '$lib/Components/Navbar.svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import Head from 'svelte-seo';
</script>

<Head />

<NavBar />
<div class="container mx-auto min-h-screen mt-20 px-1 md:px-3">
	<slot />
</div>
<Footer />

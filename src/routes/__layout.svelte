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

<script>
	import '../app.postcss';
	import NavBar from '$lib/Components/Navbar.svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import Head from 'svelte-seo';
</script>


<NavBar />
<div class="container mx-auto min-h-screen mt-20 px-3 xl:w-[65%]" id="layout__container">
	<slot />
</div>
<Footer />

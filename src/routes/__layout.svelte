<script>
	import '../app.css';
	import NavBar from '$lib/Components/Navbar';
	import Footer from '$lib/Components/Footer';
	import Head from 'svelte-seo';
</script>


<NavBar />
<div class="container mx-auto min-h-screen mt-20 px-3" id="layout__container">
	<slot />
</div>
<Footer />
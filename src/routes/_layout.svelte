<script type="text/javascript">
	import Head from "../Components/Head.svelte";
	import NavBar from "../Components/Navbar.svelte";
	import Footer from "../Components/Footer.svelte";
	//===========================
	//# Variables
	export let segment;
</script>
	
<Head>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,300;1,400;1,700;1,800&display=swap" rel="stylesheet"> 
</Head>
<NavBar {segment} />
<main class="container mx-auto mt-20 min-h-screen px-3">
	<slot></slot>
</main>
<Footer/>
<script>
	import '../app.postcss';
	import { assets } from '$app/paths';
	import { dev } from "$app/environment";

	import Head from '$components/Head';
	import Navbar from '$components/Navbar';
	import Footer from '$components/Footer';
</script>

<Head
	
	twitter={{
		card: 'summary_large_image',
		site: '@kudadam_',
		creator: '@kudadam_',
		image: 'https://ik.imagekit.io/kudadam/assets/logo.jpg?tr=w-500,h-500',
		imageAlt: 'The website logo'
	}}
>
	<link rel="icon" href="{assets}/favicon.svg" />
	{#if !dev}
		<script defer async src="//static.getclicky.com/101390283.js"></script>
	{/if}
</Head>

<Navbar />

<div id="root-layout" class="container mt-[65px] mx-auto px-1.5 min-h-full">
	<slot />
</div>

<Footer />

{#if !dev} 
<noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101390283ns.gif" /></p></noscript>
{/if}
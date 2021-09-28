<script type="text/javascript">
	import Contact from '$lib/Components/ContactForm.svelte';
	import SEO from 'svelte-seo';
	let email =
		'\u0020\u006c\u0075\u0063\u0072\u0065\u0074\u0069\u0075\u0073\u0062\u0069\u0061\u0068\u0040\u0070\u0072\u006f\u0074\u006f\u006e\u006d\u0061\u0069\u006c\u002e\u0063\u006f\u006d';

	const handleEmail = (e) => {
		e.target.innerText = email;
		e.target.href = `mailto:${email}`;
	};
</script>

<SEO
	title="Kudadam • Contact"
	description="Visit this page if  you want to contact me"
	keywords="contact lucretius, contact kudadam, contact lucretius biah"
	canonical="https://www.kudadam.com/contact"
	openGraph={{
		title: 'Kudadam • Contact',
		description: 'Visit this page if  you want to contact me',
		url: 'https://www.kudadam.com/contact',
		type: 'website',
		images: [
			{
				url: 'https:kudadam.sirv.com/logo/logo.png',
				width: 850,
				height: 650,
				alt: 'Kudadam Logo'
			}
		]
	}}
	twitter={{
		site: '@lucretius_1',
		title: 'Kudadam • Contact',
		description: 'Visit this page if  you want to contact me',
		image: 'https://kudadam.sirv.com/logo/logo.png',
		imageAlt: 'Logo of Kudadam'
	}}
/>

<div class="mx-auto xl:w-[65%]">
<h1 class="text-center font-bold">Contact</h1>
<p>
	In case you ever want to contact me, just pick an option below. The fastest is email.<br />
	If I don't reply, them maybe am in school.
</p>
<div class="dark:text-gray-300">
	<ul class="p-0 list-none">
		<li><a on:click={handleEmail} href="/contact">Click to reveal</a></li>
		<li><a href="tel:0249005710">Telephone</a></li>
		<li><a href="https://wa.link/jebvr2">WhatsApp</a></li>
	</ul>
	<span class="font-bold block">OR</span>
	<p>Fill the form and submit</p>
	<Contact />
</div>

</div>
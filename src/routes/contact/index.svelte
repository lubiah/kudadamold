<script type="text/javascript">
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
		site: '@kudadam_',
		title: 'Kudadam • Contact',
		description: 'Visit this page if  you want to contact me',
		image: 'https://kudadam.sirv.com/logo/logo.png',
		imageAlt: 'Logo of Kudadam'
	}}
/>

<main class="mx-auto max-w-4xl">
<h1 class="text-center font-bold">Contact</h1>
<p>
	In order to contact me, just pick an option below, I do well to reply all my messages.<br/>
	You can contact me if you have a proposition, contract or blah. blah.. blah...
</p>
<ul id="details_list" class="dark:text-gray-300 mt-6 p-2 rounded inline-block w-[300px] p-0 space-y-2">
	<li><a on:click={handleEmail} href="/contact">Email (Click to reveal)</a></li>
	<li><a href="tel:0249005710">+233 249 005 710</a></li>
	<li><a href="https://wa.link/jebvr2">WhatsApp</a></li>
	<li><a href="https://t.me/kudadam">Telegram</a></li>
</ul>
</main>

<style type="text/postcss">
	#details_list li a {
		@apply text-inherit !important;
	}
</style>
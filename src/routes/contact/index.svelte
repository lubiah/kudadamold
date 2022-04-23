<script context="module">
	export const prerender = true;
</script>

<script>
	import Head from "svelte-seo";
	import { enhance } from "$lib/Scripts/form";
	import Whatsapp from "$lib/Icons/Whatsapp.svelte";
	import Phone from "$lib/Icons/Phone.svelte";
	import Telegram from "$lib/Icons/Telegram.svelte";

	const SEO = {
		title: "Contact Me • Kudadam",
		description: "This page contains all the information needed to contact me",
		keywords: "contact lucretius, contact kudadam, contact lucretius biah",
		canonical: "https://www.kudadam.com/contact",
		image: "https:lucretius.sirv.com/logo/logo.png"
	}

	const done = ()=>{
		alert("Mail has been sent");
	}

	const error = ()=>{
		alert("There was an error sending the mail")
	}
</script>

<Head
	title="{SEO.title}"
	description="{SEO.description}"
	keywords="{SEO.keywords}"
	canonical="{SEO.canonical}"
	openGraph={{
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		url: `${SEO.canonical}`,
		type: 'website',
		images: [
			{
				url: `${SEO.image}`,
				width: 850,
				height: 650,
				alt: 'Kudadam Logo'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		image: `${SEO.image}`,
		imageAlt: 'Logo of Kudadam'
	}}
/>

<main>
	<div>
		<div class="text-center">
			<h1>Contact Page</h1>
			<p>In case you ever want to get in touch with me😊</p>
		</div>
		<form use:enhance={{done, error}} action="https://usebasin.com/f/d5fbba0eef70" method="POST" class="mt-8 max-w-sm p-3 border dark:border-gray-800 rounded">
			<div>
				<label for="name">Name</label>
				<input type="text" id="name" name="name">
			</div>
			<div>
				<label for="email">Email</label>
				<input type="text" id="email" name="email">
			</div>
			<div>
				<label for="message">Message</label>
				<textarea name="message" id="" cols="30" rows="4"></textarea>
			</div>
			<button type="submit">Submit</button>
		</form>
		<ul class="grid list-none grid-cols-1 mt-6 md:grid-cols-2">
			<li><a href="tel:0249005710"><Phone/> +233 249 005 710</a></li>
			<li><a href="https://wa.link/jebvr2"><Whatsapp/> WhatsApp</a></li>
			<li><a href="https://t.me/kudadam"><Telegram/> Telegram</a></li>
		</ul>
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr min(65ch,100%) 1fr;
	}

	main > div {
		grid-column: 2/3;
	}

	ul li a {
		text-decoration: none;
		color: inherit;
		padding: 0px 3px;
	}

	main form > div {
		@apply my-2;
	}
</style>
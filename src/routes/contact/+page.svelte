<script>
	import { enhance } from '$app/forms';
	import Head from '$components/Head';

	const SEO = {
		title: "Contact Page of Lucretius' website • Kudadam",
		description:
			"This page contains various ways in which you can contact Lucretius. Send me a message and let's get in touch",
		keywords: ['contact page lucretius', 'lucretius contact page', 'contact kudadam'],
		canonical: 'https://kudadam.com/contact'
	};

	const resetErrors = () => {
		for (const [name] of Object.entries(errors)) {
			//@ts-ignore
			errors[name] = null;
		}
	};

	let errors = {
		message: undefined,
		name: undefined,
		email: undefined
	};
</script>

<Head
	title={SEO.title}
	description={SEO.description}
	keywords={SEO.keywords.toString()}
	canonical={SEO.canonical}
	openGraph={{
		type: 'website',
		title: SEO.title,
		description: SEO.description,
		url: SEO.canonical
	}}
	twitter={{
		title: SEO.title,
		description: SEO.description
	}}
/>

<main>
	<div class="text-center">
		<h1>Hi, let's get in touch</h1>
	</div>
	<form
		use:enhance={({ data, cancel }) => {
			for (const [name, value] of data.entries()) {
				if (name !== '_gotcha' && value.toString().trim().length === 0) {
					//@ts-ignore
					errors[name] = `${name} is required`;
				} else if (
					name !== '_gotcha' &&
					name === 'message' &&
					value.toString().split(' ').length <= 5
				) {
					//@ts-ignore;
					errors['message'] = 'Your message is too short';
				}
			}
			console.log(errors);
			cancel();
		}}
		action="https://formcarry.com/s/s5g_zOxsG"
		method="POST"
		class="max-w-sm mx-auto rounded-md border shadow-sm p-3"
	>
		<div class="input-group">
			<label for="name">Your name</label>
			<input id="name" type="text" name="name" aria-required={true} on:input={resetErrors} />
			{#if errors.name != undefined}
				<span role="alert" on:input={resetErrors} class="alert danger">{errors.name}</span>
			{/if}
		</div>
		<div class="input-group">
			<label for="email">Your e-mail address</label>
			<input type="email" id="email" on:input={resetErrors} name="email" aria-required={true} />
			{#if errors.email != undefined}
				<span role="alert" class="alert danger">{errors.email}</span>
			{/if}
		</div>
		<input type="hidden" name="_gotcha" />
		<div class="input-group">
			<label for="message">Your message</label>
			<textarea id="message" rows="5" on:input={resetErrors} name="message" aria-required={true} />
			{#if errors.message != undefined}
				<span role="alert" class="alert danger">{errors.message}</span>
			{/if}
		</div>
		<button on:click={resetErrors} data-theme="primary" type="submit">Send message</button>
	</form>
</main>

<style lang="postcss">
	.alert {
		@apply mb-2 mt-1;
	}
</style>

<script type="text/javascript">
	import Button from '$lib/Components/Button.svelte';

	let data = {
		name: null,
		email: null,
		subject: null,
		message: null
	};
	const submit = async () => {
		const res = await fetch('/contact.json', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		const json = await res.json();
		if (json.sent === true) window.alert('Message sent');
	};
</script>

<form
	method="post"
	class="max-w-screen-sm my-2 border-gray-300 dark:border-gray-500 border rounded shadow-lg p-4"
	on:submit|preventDefault={submit}
>
	<div class="my-1">
		<label for="name">Name</label>
		<input id="name" type="text" bind:value={data.name} required />
	</div>
	<div class="my-1">
		<label for="subject">Subject</label>
		<input type="text" id="subject" required bind:value={data.subject} />
	</div>
	<div class="my-1">
		<label for="email">Email</label>
		<input type="email" id="email" bind:value={data.email} />
	</div>
	<div class="my-1">
		<label for="" id="message">Message</label>
		<textarea rows="10" id="message" bind:value={data.message} />
	</div>
	<Button type="submit">Send Mail</Button>
</form>

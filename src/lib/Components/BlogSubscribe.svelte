<script>
	import Button from "$lib/Components/Button.svelte";

    let email = "";
	const subscribeUser = async ()=>{
			let button = document.querySelector("#subscription__submit_button");
			button.disabled = true;
			button.innerText = "Subscribing..."

        const query = await fetch("https://buttondown.email/api/emails/embed-subscribe/lucretius",{
        	method: "POST",
        	headers: {
        		"Content-Type": "application/json"
        	},
        	body: JSON.stringify(email)
        });
        const res = await query;
        console.log(res);
        if (message === true){
      	document.querySelector("#subscription__heading_text").innerText = "Thanks for subscribing";
      	document.querySelector("#form_container").innerHTML = `<p class='text-white'>Please confirm your email in your mailbox</p>`
        }
        else {
        	document.querySelector("#subscription__heading_text").innerText = "Error";
        	document.querySelector("#form_container").innerHTML = `<p>Sorry, an error occured</p>`
        }
	}
</script>

<form method="post" id="subscription__form" class="max-w-sm bg-purple-700 py-1 px-3 rounded-lg" on:submit|preventDefault={subscribeUser}>
	<h3 id="subscription__heading_text" class="text-3xl text-white mb-4 font-semibold">Subscribe to Newsletter</h3>
	<div id="form_container">
		<input type="email" class="!bg-white p-1" placeholder="Email Account" bind:value={email} title="Your email address" required>
		<Button class="mt-3 text-lg" type="submit" id="subscription__submit_button">Subscribe</Button>
	</div>
</form>

<style>
	input {
		color: black;
	}
	input::placeholder {
		@apply text-gray-600;
	}
</style>
<script>
	import Button from "$lib/Components/Button.svelte";

    let data = {
       name: "",
       email: "",
       type: "subscribe_user",
       

    };
	const subscribeUser = async ()=>{
        const query = await fetch("/contact.json",{
        	method: "POST",
        	headers: {
        		"Content-Type": "application/json"
        	},
        	body: JSON.stringify(data)
        });
        const { message } = await query.json();
        if (message === true){
      	document.querySelector("#subscription__heading_text").innerText = "Thanks for subscribing";
      	document.querySelector("#form_container").innerHTML = `<p class='text-white'>Please confirm your email in your mailbox</p>`
        }
        else {
        	document.querySelector("#subscription__heading_text").innerText = "Error";
        	document.querySelector("#form_container").innerHTML = `<p class='text-red-500'>Sorry, an error occured</p>`
        }
	}
</script>

<form method="post" class="max-w-sm bg-purple-700 py-1 px-3 rounded-lg" on:submit|preventDefault={subscribeUser}>
	<h3 id="subscription__heading_text" class="text-3xl text-white mb-4 font-semibold">Subscribe to Newsletter</h3>
	<div id="form_container">
		<input class="mb-3 p-1 !bg-white" type="text" title="Your full name" bind:value={data.name} placeholder="Name" required>
		<input type="email" class="!bg-white p-1" placeholder="Email Account" bind:value={data.email} title="Your email address" required>
		<Button class="mt-3 text-lg" type="submit">Subscribe</Button>
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
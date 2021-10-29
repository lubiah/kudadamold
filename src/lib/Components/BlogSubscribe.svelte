<script>
	import Button from "$lib/Components/Button.svelte";

    let data = {
    	name: "",
    	email: "",
    	type: "ADD_SUBSCRIBER"
    };

	const subscribeUser = async ()=>{
			let button = document.querySelector("#subscription__submit_button");

        const query = await fetch("/contact.json",{
        	method: "POST",
        	headers: {
        		"Content-Type": "application/json"
        	},
        	body: JSON.stringify(data)
        });
        const res = await query.json();
        console.log(res);

        if (res === "IS_ALREADY_SUBSCRIBED"){
        	document.querySelector("#form_container").remove();
        	document.querySelector("#subscription__heading_text").innerHTML = "Hey,<br/> You are already subscribed"
        }
     	
	}
</script>

<form method="post" id="subscription__form" class="max-w-sm bg-purple-700 py-1 px-3 rounded-lg" on:submit|preventDefault={subscribeUser}>
	<h3 id="subscription__heading_text" class="text-3xl text-white mb-4 font-semibold">Subscribe to Newsletter</h3>
	<div id="form_container">
		<input type="name" class='!bg-white p-1 my-2' placeholder="First name" bind:value={data.name} title="Your First Name" required>
		<input type="email" class="!bg-white p-1" placeholder="Email Account" bind:value={data.email} title="Your email address" required>
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
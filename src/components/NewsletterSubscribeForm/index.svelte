<script>
	const enhance = node =>{
		const handleSubmit = async event=>{
			event.preventDefault();
			node.querySelector(`button[type="submit"]`).disabled = true;
			const response = await fetch(node.action, {
				method: node.method,
				body: new FormData(node),
				headers: {accept: "application/json"}
			});
			if (response.ok)
				alert("Hello, a verification email has been sent to your inbox");
			node.reset();
			node.querySelector(`button[type="submit"]`).disabled = false;
		}
		node.addEventListener("submit", handleSubmit);
		
		return {
			destroy(){
				node.removeEventListener("submit", handleSubmit)
			}
		}
	}
</script>


<form class="max-w-sm bg-purple-700 py-1 px-3 rounded-lg" use:enhance action="https://buttondown.email/api/emails/embed-subscribe/lucretius" method="POST">
	<h3 class="text-3xl text-white mb-4 font-semibold">Subscribe to Newsletter</h3>
	<input type="email" class="!bg-white p-1" name="email" placeholder="Email Account" title="Your email address" required>
	<button class="mt-3 text-lg" type="submit">Subscribe</button>
</form>

<style type="text/postcss">
	input {
		color: black;
	}
	input::placeholder {
		@apply text-gray-600;
	}

</style>
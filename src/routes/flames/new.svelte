<script>
	import Banner from "./_components/banner.svelte";
	import Flames from "./_flames.js";
	import Modal from "./_components/show_relationship.svelte";

	let hide_modal = true;
	let results = {
		relationship: [],
		you_name:"",
		partner_name: ""
	};

	const validate_input = ()=>{
		if (data.you_name.trim().length < 1){
			error.you_name = "Enter your name";
			data.valid = false;
			return;
		} 
		if (data.partner_name.trim().length < 1){
			error.partner_name = "Enter your name";
			data.valid = false;
			return;
			
		}

		if (data.you_name.trim().split(" ").length < 2){
			error.you_name = "Please enter your full name";
			error.valid = false;
			return;
		}

		if (data.partner_name.trim().split(" ").length < 2){
			error.partner_name = "Please enter your full name";
			error.valid = false;
			return;
		}



	};

	const resetError = ()=>{
		error.you_name = "";
		error.partner_name = "";
	}

	const calculateFlames = ()=>{
		validate_input();

		if (data.valid === true){
			let flames = new Flames(data.you_name, data.partner_name);
			results.relationship = flames.relationship;
			results.you_name = flames.first_name;
			results.partner_name = flames.second_name;
			hide_modal = false;
		}

	}

	let data = {
		you_name: "",
		partner_name: "",
		valid: true
	}
	let error = {
		you_name: "",
		partner_name: ""
	}
</script>

<Banner/>

<Modal hidden={hide_modal} {results} on:close={()=>{hide_modal = !hide_modal}}/>

<form on:submit|preventDefault={calculateFlames}>
	<div id="game" class="max-w-screen-sm mx-auto px-5 border py-5 border-gray-400 rounded-lg">
		<div class="input__container">
			<input id="you_name" required name="you_name" type="text" bind:value={data.you_name} on:input={resetError} placeholder="Your Name">
			<span class="error">{error.you_name}</span>
		</div>
		<div class="input__container">
			<input id="partner_name" type="text" name="partner_name" bind:value={data.partner_name} required on:input={resetError} placeholder="Partner's Name">
			<span class="error">{error.partner_name}</span>
		</div>

		<button id="play" class="block mt-8 p-2 text-xl text-white p-4 mx-auto rounded-lg" type="submit">Check FLAMES</button>
		
	</div>
</form>


<style>

	#game .error {
		@apply text-red-800 text-lg;
	}

	#game input[type="text"]{
		@apply border text-xl p-4 border-gray-400;
	}
	#game input[type="text"]::placeholder {
		@apply text-gray-500
	}

	#game .input__container {
		@apply mt-7
	}

	#play {
		box-shadow: 5px 5px black;
		background: linear-gradient(to right,#CD1111,#C09500);
	}

	#play:active{
		transform: translateY(2px);
		box-shadow: 1px 1px black;
	}
</style>
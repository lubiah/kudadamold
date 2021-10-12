<script>
	import SEO from "svelte-seo";
	import Body from "./_Components/Body.svelte";
	import Show from "./_Components/Show.svelte";
	import Flames from "./_flames.js";

	let game;
	let error = {
		first:"",
		second:""
	}
	let hidden = true;

	let data = {
		valid: false,
		first:"",
		second: ""
	}

	const resetError = ()=>{
		error.first = "";
		error.second = "";
	}

	const reset = ()=>{
		hidden = true;
		data.first =  "";
		data.second = "";

	}


	const validateInput = event=>{
		if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 32)
		{
		event.target.value += event.key;
		if (event.target.getAttribute("data-player") === "first"){
			data.first = event.target.value;
		}

		else if (event.target.getAttribute("data-player") === "second"){
			data.second = event.target.value;
		}

		}
		else return event;
	}

	const validate = ()=>{
		data.valid = true;
		if (data.first.trim().length < 1){
			error.first = "Enter your name";
			data.valid = false;
			return;
		} 
		if (data.second.trim().length < 1){
			error.second = "Enter your name";
			data.valid = false;
			return;
			
		}
		if (data.first.trim().split(" ").length < 2){
			error.first = "Please enter your full name";
			error.valid = false;
			return;
		}
		if (data.second.trim().split(" ").length < 2){
			error.second = "Please enter your full name";
			error.valid = false;
			return;
		}

		game = new Flames(data.first, data.second);
		hidden = false;

	}




</script>

<SEO
title = "FLAMES Game • Kudadam"
description = "Flames is a simple and fun game which can determine the relationship between two people with the use of their names. The results are not to be taken seriously since this is just a game"
/>


{#if !hidden}
	<Show data={game} on:hide={reset}/>
{/if}

<Body>
	<form on:submit|preventDefault={validate}>
		<div class="text-center mt-[100px]">
		<h1 class="text-[5rem] m-0 md:text-[10rem] text-transparent bg-clip-text from-red-700 to-yellow-500 bg-gradient-to-r leading-none xl:text-[13rem] font-bold pt-1" id="header">FLAMES</h1>
		<p class="italic text-[1.5rem] text-red-600">Fun way to find the relationship between two people</p>	
	</div>
	<div id="game" class="pt-[80px]">
		<div><input on:keypress={resetError} on:keypress|preventDefault={validateInput}  data-player="first" type="text" data-id="names" placeholder="Your Full Name" required bind:value={data.first}>
		<small>{error.first}</small>
		</div>
		<div><input type="text" data-player="second" on:keypress|preventDefault={validateInput}  on:keypress={resetError} data-id="names" placeholder="Partner's Full Name" bind:value={data.second} required>
			<small>{error.second}</small>
		</div>
	</div>
			<button type="submit" class="block mx-auto text-lg p-2 hover:bg-red-800 md:w-1/3 rounded-lg my-10 bg-red-700 text-white" id="play">FLAMES</button>
	</form>
	
</Body>


<style type="text/postcss">

	#game input[data-id="names"]{
		@apply block border-0 border-b-2 text-2xl text-gray-900 xl:w-[70%] mx-auto pt-10 p-3 rounded-none bg-transparent font-semibold;
	}
	#game input[data-id="names"]::placeholder {
		@apply text-gray-800;
	}

	#game small{
		@apply text-center block mt-2 text-lg text-red-600 font-semibold;
	}

	#play {
		box-shadow: 3px 4px 1px black;
	}

	#play:hover {
		transform: translateY(1px);
		box-shadow: 1px 1px 1px black;

	}

	#play:active{
		transform: translateY(2px);
		box-shadow:0px 0px 0px;
	}
	
</style>
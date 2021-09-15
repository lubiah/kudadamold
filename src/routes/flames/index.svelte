<script>
	import Banner from "./_components/banner.svelte";
	import { onMount, onDestroy } from "svelte";
	import Head from "svelte-seo";
	let animate = true;

	const animate_banner = async ()=>{
		let banner = document.querySelector("#banner");
		let text = banner.innerText;
		for (let i = 0; i < text.length; i++) {
			await sleep(500);
			banner.innerHTML = text.replace(text[i],`<span class='text-red-800'>${text[i]}</span>`)
		}

		if (animate === true){
			animate_banner();
		}
	}

	const sleep = async time =>{
		await new Promise(resolve => setTimeout(resolve,time));
	}

	onMount(()=>{
		animate_banner();
	});
	onDestroy(()=>{
		animate = false;
	})
</script>

<Head
title = "FLAMES GAME • Kudadam"
description = "Flames is a simple and fun game which can determine the relationship between two individuals with the use of their names"
keywords = "flames, flames game, real flames, real flames game"
canonical = "https://www.kudadam.com/flames"

OpenGraph = {{
	title: "FLAMES GAME • Kudadam",
	description: "Flames is a simple and fun game which can determine the relationship between two individuals with the use of their names",
	url:"https://www.kudadam.com/flames",
	type: "website"
}}


twitter = {{
	site:"@lucretius_1",
	title:"FLAMES GAME • Kudadam",
	description: "Flames is a simple and fun game which can determine the relationship between two individuals with the use of their names"
}}
/>

<Banner/>

<div id="buttons__container" class="max-w-screen-sm mx-auto pt-20 px-20 md:px-[150px]">
	<button><a href="/flames/new">New Game</a></button>
	<button><a href="/flames/about">About</a></button>
</div>


<style>
	#buttons__container button {
		@apply block w-full bg-red-600 my-10 rounded-lg hover:bg-red-700 active:bg-blue-500;
	}
	#buttons__container button:active {
		box-shadow: 5px 10px black;
	}

	#buttons__container button a {
		@apply block text-xl p-4;
	}
</style>

<script>
	import Head from "svelte-seo";
	import { onMount } from "svelte";

	let data = [
		{
			title: "HackerRank Python (Basic) Certificate",
			date: new Date("17-07-2021"),
			image_url: "https://kudadam.sirv.com/certificates/hackerrank_python_beginner.png",		
			url: "https://www.hackerrank.com/certificates/7d591cc394d8",
			id: 1
		}
	]

	onMount(()=>{
		let script_tag = document.createElement("script");
		script_tag.src = "https://cdnjs.cloudflare.com/ajax/libs/fslightbox/3.0.9/index.min.js";
		script_tag.defer = true;
		document.querySelector("head").appendChild(script_tag);
	})
</script>	

<Head
title = "Kudadam • Certificates"
description = "A page which I use to showcase all the certificates I have"
/>


<div class="flex flex-wrap">
	{#each data as cert (cert.id)}
		<a data-fslightbox="lightbox" href="{cert.image_url}" class="!text-inherit">
			<img class="md:w-1/3 max-h-[400px] md:max-h-[1500px]" src="{cert.image_url}" alt="{cert.title}">
			<span class="text-inherit text-lg text-center">{cert.title}</span>
		</a>
	{/each}
</div>


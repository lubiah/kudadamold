<script type="text/javascript">
	import SEO from 'svelte-seo';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Moon from "$lib/Icons/moon.svelte";
	import Sun from "$lib/Icons/sun.svelte";
	import { mode } from "/src/stores/store.js";
	import { browser } from "$app/env";
	let element;
	import Header from "svelte-headroom";
	import Search from "$lib/Components/SiteSearch";

	let hidden = true;
	let nav_links = [
		{ name: 'About', url: '/about', id: 1 },
		{ name: 'Contact', url: '/contact', id: 2 },
		{ name: 'Projects', url: '/projects', id: 3},
		{ name: 'Blog', url: '/blog', id: 4 }
	];



	const setMode = () => {
		if ($mode === 'light') {
			document.documentElement.classList.add('dark');
			mode.set("dark");
		} 
		else {
			document.documentElement.classList.remove('dark');
			mode.set("light");
		}
	};

	onMount(() => {
		document.addEventListener('mouseup', (e) => {
			let selected = e.target;
			let closest = selected.closest('nav');
			if (closest == null) hidden = true;
		});
		document.querySelector("#nav__header").parentElement.style.zIndex = 9999;
	});

	let seo = {
		title: "Kudadam • Search | Every information on my website can be located here",
		description: "This is where every information on my website can be located",
		canonical: "https://www.kudadam.com/search"
	}
</script>

<SEO
title="{seo.title}"
description="{seo.description}"
nofollow=true
canonical={seo.canonical}
openGraph={{
	title: `${seo.title}`,
	description: `${seo.description}`,

}}
/>

<svelte:head>
	<script>
		if (document){
			let mode = localStorage.theme || "light";
			if (mode === 'dark'){
				document.documentElement.classList.add("dark");
				localStorage.theme = "dark";
			}
			else {
				document.documentElement.classList.remove("dark");
				localStorage.theme = "light";
			}
		}
	</script>
</svelte:head>

<Header offset={250} on:pin={()=>{document.querySelector("#nav__header").parentElement.style.zIndex="9999"}}>
<nav id="nav__header" 
	class="flex md:p-2 z-30 top-0 border-b w-full bg-white navbar flex-wrap dark:bg-slate-900 border-gray-200 dark:border-gray-800"
>
	<a
		class="flex font-medium md:font-semibold text-lg items-center justify-center"
		href="/" title="Go to homepage"
		><img src="https://kudadam.sirv.com/logo/logo.png?q=5" class="h-10" height="40" width="40" alt="" /><span
			class="hidden md:inline text-[color:var(--light-text-color)] dark:text-white">Kudadam</span
		></a>
	<Search class="ml-auto"/>	
	<button
		aria-label="{hidden === true ? "Open" : "Close"}"
		class="ml-auto px-1 md:hidden bg-transparent"
		on:click={() => {
			hidden = !hidden;
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-7 w-7"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				class="!text-gray-700 !dark:text-white"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
	</button>
	<div class="block md:flex md:ml-auto w-full md:w-auto duration-500 overflow-y-hidden" class:hidden id="nav-menu">
		<ul class="md:flex list-none">
			{#each nav_links as { name, url, id } (id)}
				<li class="p-2 text-lg font-semibold">
					<a
						href={url}
						sveltekit:prefetch
						class="text-gray-700 !block"
						class:active={$page.url.pathname === `/${name.toLowerCase()}`}
						on:click={()=>{hidden = true}}
						>
						{name}
					</a>
				</li>
			{/each}
			<li class="p-2 text-lg font-semibold">
				<span on:click={setMode} title="Change Mode">
					{#if $mode === "light"}<Moon/>{:else}<Sun/>{/if}
				</span>
			</li>
			<slot />
		</ul>
	</div>
</nav>
</Header>

<style type="text/postcss">
	:global(.svelte-headroom--unpin){
		z-index:9999
	}

	ul {
		padding: 0px !important;
	}

	.active {
		color: var(--primary-color) !important;
	}

	#nav-menu ul li *:not(.active) {
		@apply dark:text-white text-gray-700;
	}

	a:visited {
		color: initial;
	}

	a:hover {
		text-decoration: none !important;
	}
</style>

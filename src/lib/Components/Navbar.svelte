<script type="text/javascript">
	import { afterUpdate } from 'svelte';
	import { page } from '$app/stores';
	import Moon from "$lib/Icons/moon.svelte";
	import Sun from "$lib/Icons/sun.svelte";
	import { mode } from "/src/stores/store.js"; 

	let hidden = true;
	let nav_links = [
		{ name: 'About', url: '/about', id: 1 },
		{ name: 'Contact', url: '/contact', id: 2 },
		{ name: 'Blog', url: '/blog', id: 3 },
		{ name: 'Toolz', url: '/toolz', id: 4 }
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


	const add_border_on_scroll_down = ()=>{
		let html = document.querySelector("html");
		let scroll_point = html.scrollTop;
		if (scroll_point >= 50){
				document.querySelector("nav#header").classList.add("border-b");
		} else {
			document.querySelector("nav#header").classList.remove("border-b");
		}
	}

	const check_mode = () => {
		if (
			$mode === 'dark' ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			mode.set("dark");
		} else {
			document.documentElement.classList.remove('dark');
			mode.set("light");
		}
	};

	afterUpdate(() => {
		document.addEventListener('mouseup', (e) => {
			let selected = e.target;
			let closest = selected.closest('nav');
			if (closest == null) hidden = true;
		});
		check_mode();
		window.addEventListener("scroll",add_border_on_scroll_down);
	});
</script>

<nav id="header" 
	class="flex fixed p-1 md:p-2 z-30 top-0 w-full bg-white flex-wrap dark:bg-gray-700 border-gray-200 dark:border-gray-500"
>
	<a
		class="flex font-medium md:font-semibold text-lg items-center justify-center"
		href="/"
		><img src="https://kudadam.sirv.com/logo/logo.png?q=5" class="h-10" height="40" width="40" alt="" /><span
			class="hidden md:inline text-[color:var(--light-text-color)] dark:text-white">Kudadam</span
		></a
	>

	<span class="ml-auto my-auto h-3/4" on:click={setMode} title="Change Mode">
		{#if $mode === "light"}
			<Moon/>
		{:else}
			<Sun class/>
		{/if}
	</span>

	<button
		class="ml-auto px-1 md:hidden"
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
				class="text-gray-700 dark:text-white"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
	</button>
	<div class="block md:flex md:ml-auto w-full md:w-auto" class:hidden id="nav-menu">
		<ul class="md:flex list-none">
			{#each nav_links as { name, url, id } (id)}
				<li class="p-2 text-gray-700 text-lg font-semibold">
					<a
						href={url}
						sveltekit:prefetch
						class="text-gray-700 block"
						class:active={$page.path === `/${name.toLowerCase()}`}>{name}</a
					>
				</li>
			{/each}
			<slot />
		</ul>
	</div>
</nav>

<style type="text/postcss">
	ul {
		padding: 0px !important;
	}

	.active {
		color: var(--primary-color) !important;
	}

	#nav-menu ul li *:not(.active) {
		@apply dark:text-white;
	}

	a:visited {
		color: initial;
	}

	a:hover {
		text-decoration: none !important;
	}
</style>

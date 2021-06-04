<script type="text/javascript">
	import { afterUpdate } from "svelte";
	export let segment;
	let hidden = true;
	let nav_links = [
		{name:"Home", url:"/",id:1},
		{name:"About", url:"about",id:2},
		{name:"Contact", url:"contact",id:3},
		{name:"Blog", url:"blog",id:4},
		{name:"Toolz", url:"toolz",id:5}
	];

	const set_mode = (e)=>{
		let theme = localStorage.theme;
		if (!theme || theme === "light"){
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
			e.target.src = "https://kudadam.sirv.com/icons/sun.png?q=100";
		}
		else if (theme === "dark"){
			document.documentElement.classList.remove("dark");
			localStorage.theme = "light";
			e.target.src = "https://kudadam.sirv.com/icons/moon.png?q=100";
		}
	}

	const check_mode = ()=> {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  			document.documentElement.classList.add('dark');
  			localStorage.theme = "dark";
  			document.querySelector("#theme").src = "https://kudadam.sirv.com/icons/sun.png?q=100"
			} 
		else {
  		document.documentElement.classList.remove('dark');
  		localStorage.theme = "light";
  		document.querySelector("#theme").src = "https://kudadam.sirv.com/icons/moon.png?q=100";
		}	
}


	afterUpdate(()=>{
		check_mode();
	})
</script>




<nav class="flex fixed p-2 z-30 top-0 w-full bg-white flex-wrap dark:bg-gray-700 shadow-md">


<a class="flex font-medium md:font-semibold text-lg items-center dark:text-white justify-center text-gray-700" href="/"><img src="https://kudadam.sirv.com/logo/logo.png?h=55&q=100" alt="">Kudadam</a>

<img on:click={set_mode} id="theme" loading="lazy" alt="Mode" src="https://kudadam.sirv.com/icons/sun.png" class="ml-auto my-auto h-3/4"  title="Change Mode" />

	<button class="ml-auto px-1 md:hidden" on:click={()=>{hidden = !hidden}}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" class="text-gray-700 dark:text-white" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
</svg>
</button>
	<div class="block md:flex md:ml-auto w-full md:w-auto" class:hidden id="nav-menu">
		<ul class="md:flex">
			{#each nav_links as { name , url, id }  (id) }
				{#if name === "Home"}
					<li class="dark:text-white p-2 text-base text-gray-700 text-lg font-medium md:font-semibold">
						<a href={segment === undefined ? "#":"/"} class:active={segment === undefined} class="text-gray-700 block">
						{name}
						</a>
					</li>
					{:else}
					<li class="p-2 text-base text-gray-700 text-lg font-medium md:font-semibold">
						<a href={url} rel=prefetch class:active={segment === name.toLowerCase()} class="text-gray-700 block">
						{name}
						</a>
					</li>
				{/if}
			{/each}
		<slot>
		</slot>
		</ul>
	</div>	
</nav>
<style type="text/css">
	ul {
		padding: 0px !important;
	}
	.active {
		@apply text-red-500;
	}

	#nav-menu ul li *:not(.active) {
		@apply dark:text-white;
	}
</style>
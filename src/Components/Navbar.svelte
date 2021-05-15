<script type="text/javascript">
	import jquery from "jquery";
	export let segment;
	let hidden = true;
	let nav_links = [
		{name:"Home", url:"/",id:1},
		{name:"About", url:"about",id:2},
		{name:"Contact", url:"contact",id:3},
		{name:"Blog", url:"blog",id:4},
		{name:"Toolz", url:"toolz",id:5}
	];
</script>
<nav class="flex fixed p-2 z-30 top-0 w-full bg-white flex-wrap">
<a class="flex font-medium md:font-semibold text-lg items-center justify-center text-gray-700" href="/"><img src="https://kudadam.sirv.com/logo/logo.png?h=55&q=100" alt="">Kudadam</a>
	<button class="ml-auto px-1 md:hidden" on:click={()=>{hidden = !hidden}}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
</svg>
</button>
	<div class="block md:flex md:ml-auto w-full md:w-auto" class:hidden id="nav-menu">
		<ul class="md:flex">
			{#each nav_links as { name , url, id }  (id) }
				{#if name === "Home"}
					<li class="dark:text-white p-2 text-base text-gray-700 text-lg font-medium md:font-semibold">
						<a href={segment === undefined ? "#":"/"} class:text-red-500={segment === undefined} class="text-gray-700 block">
						{name}
						</a>
					</li>
					{:else}
					<li class="@apply p-2 text-base text-gray-700 text-lg font-medium md:font-semibold dark:text-white">
						<a href={url} rel=prefetch class:text-red-500={segment === name.toLowerCase()} class="text-gray-700 block">
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
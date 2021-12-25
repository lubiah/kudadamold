	<script type="text/javascript">
	import { scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	let hidden = true;

	const fetchTools = async () => {
		let res = await fetch('/toolz.json');
		let { tools } = await res.json();
		return tools;
	};

	onMount(() => {
		document.addEventListener('mouseup', (e) => {
			let selected = e.target;
			let closest = selected.closest('#tools-list-main');
			if (closest == null) hidden = true;
		});
	});
</script>

<div id="tools-list-main">
	{#if !hidden}
		{#await fetchTools() then tools}
			<div transition:scale class="bg-white border-2 dark:border-gray-800 fancy-scrollbar dark:bg-gray-900  text-inherit rounded my-4 overflow-y-scroll" id="tools-list">
				<ul class="!p-0 list-none">
					{#each tools as tool (tool.id)}
						<li class="block w-full hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-white">
							<a
								on:click={() => (hidden = true)}
								href={tool.url}
								class="!block w-full px-2 py-1 visited:text-inherit dark:visited:text-white hover:no-underline dark:hover:!text-white hover:!text-inherit text-inherit">{tool.name}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/await}
	{/if}

	<button
		class:rotate-45={!hidden}
		class="transition-transform hover:bg-red-500 text-white transform rounded-full p-4"
		on:click={() => (hidden = !hidden)}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M8 9l4-4 4 4m0 6l-4 4-4-4"
			/>
		</svg>
	</button>
</div>

<style type="text/postcss">
	#tools-list-main {
		position: fixed;
		bottom: 10px;
		right: 20px;
		z-index: 50;
	}
	button {
		float: right;
	}
	#tools-list {
		max-height: 350px;
	}
</style>

<script context="module">
	export async function load({ page, fetch }) {
		let name = page.path.split('/').slice(-1).toString();
		let res = await fetch(`/toolz.json`);
		let { tools } = await res.json();
		let tool_name = tools.filter(tool => tool.url === `/toolz/${name}`)[0];
		return {
			props: {
				tool: tool_name
			}
		}
	}
</script>

<script type="text/javascript">
	import Header from '$lib/Components/Toolz/Header.svelte';
	import Body from '$lib/Components/Toolz/Body.svelte';

	export let tool;

	let number;
	$: number = 0;
</script>

<Header {tool} />

<Body>
	<div class="text-center text-3xl">
		<div class="w-20 mx-auto">
			<button  on:click={() => number++}>+</button>
			<div class="text-center p-2" contenteditable>{number}</div>
			<button on:click={() => number--}>-</button>
		</div>
	</div>
</Body>

<style type="text/css">
	button {
		@apply w-full bg-green-500 p-4;
	}
</style>

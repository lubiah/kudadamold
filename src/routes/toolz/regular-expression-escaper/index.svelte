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
	import regular_escape from 'regex-escape';

	export let tool;

	let text, escaped;
	$: text = '';
	$: escaped = '';

	const escape_regex = () => {
		escaped = regular_escape(text);
	};
</script>

<Header {tool} />

<Body>
	<div>
		<label for="input">Enter your regular Expression</label>
		<input type="text" id="input" bind:value={text} on:input={escape_regex} />
	</div>

	<div class="my-8">
		<label for="">Escaped regex appears here</label>
		<input type="text" name="" bind:value={escaped} />
	</div>
	<p class="text-green-500">Results appear as you type</p>
</Body>

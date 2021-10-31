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
	import  snakeCase from 'lodash.snakecase';

	export let tool;
	let data = {
		text: '',
		results: ''
	};

	const toSnakeCase = () => {
		data.results = snakeCase(data.text);
	};
</script>

<Header {tool} />

<Body>
	<div>
		<label for="text">Enter your text here</label>
		<textarea type="text" id="text" rows="5" bind:value={data.text} on:input={toSnakeCase} />
	</div>
	<div class="mt-6">
		<label for="results">Results appear here</label>
		<textarea type="text" id="results" rows="5" bind:value={data.results} />
	</div>
</Body>

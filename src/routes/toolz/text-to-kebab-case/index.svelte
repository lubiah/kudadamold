<script context="module">
	export async function load({ fetch, page }) {
		let name = page.path.split('/').slice(-1).toString();
		let res = await fetch(`/toolz.json?info=${name}`);
		let { info } = await res.json();
		return {
			props: {
				tool: info
			}
		};
	}
</script>

<script type="text/javascript">
	import Header from '$lib/Components/Toolz/Header.svelte';
	import Body from '$lib/Components/Toolz/Body.svelte';
	import kebabcase from 'lodash/kebabCase.js';

	export let tool;
	let data = {
		text: '',
		results: ''
	};

	const toKebabCase = () => {
		data.results = kebabcase(data.text);
	};
</script>

<Header {tool} />

<Body>
	<div>
		<label for="text">Enter your text here</label>
		<textarea type="text" rows="5" id="text" bind:value={data.text} on:input={toKebabCase} />
	</div>
	<div class="mt-6">
		<label for="results">Results appear here</label>
		<textarea type="text" id="results" rows="5" bind:value={data.results} />
	</div>
</Body>

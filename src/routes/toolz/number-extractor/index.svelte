<script context="module">
	export async function load({ page, fetch }) {
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

	export let tool;

	let data;
	$: data = {
		results: ''
	};
	let not_number_regex = /\D+/g;

	const get_numbers = (text) => {
		data.results = text.replace(not_number_regex, '');
	};
</script>

<Header {tool} />

<Body>
	<div>
		<label for="textarea" class="ml-4">Enter your text here</label>
		<textarea
			class="border w-full border-gray-300 rounded p-2 bg-white"
			id="textarea"
			on:input={get_numbers}
			on:input={(e) => {
				get_numbers(e.target.value);
			}}
		/>
	</div>
	<div class="mt-8">
		<label for="results">Results appear here</label>
		<textarea id="results" class="border-gray-300 border p-2 w-full bg-white"
			>{data.results}</textarea
		>
	</div>
</Body>

<style type="text/css">
	#textarea,
	#results {
		max-height: 250px;
		overflow-y: scroll;
		height: 100px;
	}
</style>

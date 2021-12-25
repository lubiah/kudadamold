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
	import { onMount } from 'svelte';


	export let tool;

	let value = 37;
	let result;

	const convert = ()=>{
		result = (parseInt(value) - 32) * 5/9 + 273.15 
	}

	convert();

</script>

<Header {tool}/>
<Body>
	<div class="mb-5">
		<label for="celsius">Enter temperature in Fahrenheit</label>
		<input type="text" id="celsius" bind:value on:change="{convert}" on:input={convert} min=0>
	</div>
	<div>
		<label for="fahrenheit">Temperature in Kelvin</label>
		<input readonly type="text" id="fahrenheit" bind:value="{result}">
	</div>
</Body>
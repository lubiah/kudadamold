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
	import jquery from 'jquery';
	import { onMount } from 'svelte';

	export let tool;

	onMount(() => {
		jquery('#body').html(`<h2 class='text-green-500 my-2 text-4xl'>Congratulations</h2>
            <p class='text-lg'>Your web browser has JavaScript enabled</p>`);
	});
</script>

<Header {tool} />
<Body>
	<div id="body" class="text-center">
		<noscript>
			<h2 class="text-red-600">Sorry, JavaScript is disabled in your browser.</h2>
		</noscript>
	</div>
</Body>

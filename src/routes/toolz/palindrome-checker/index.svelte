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
	import Button from '$lib/Components/Button.svelte';
	export let tool;

	import Palindrome from './_index.js';

	let data = {
		text: '',
		caseSensitive: false,
		ignoreWhitespace: false
	};
	let explanation = '';
	let results = "";

	const isPalindrome = ()=>{
		let palindrome = new Palindrome(data.text,data.caseSensitive, data.ignoreWhitespace);
		if (palindrome.palindrome){
			results = "Text is palindrome"
		}
		else {
			results = "Text is not palindrome"
		}

		if (data.text.length > 3) {
			explanation = palindrome.explanation
		}
	}
</script>

<Header {tool} />

<Body>
	<form on:submit|preventDefault>
		<div>
		<label for="word">Enter a word or phrase</label>
		<textarea class="my-1" required id="word" placeholder="Enter word or phrase" bind:value={data.text}></textarea>
	</div>

	<div class="mt-2">
		<label for="case_sensitive">Case Sensitive</label>
		<input
			type="checkbox"
			name="case_sensitive"
			id="case_sensitive"
			bind:checked={data.caseSensitive}
		/>
	</div>
	<div>
		<label for="ignore_whitespaces">Ignore whitespaces</label>
		<input
			type="checkbox"
			name="ignore_whitespaces"
			id="ignore_whitespaces"
			bind:checked={data.ignoreWhitespace}
		/>
	</div>
		<Button type="submit" class="block !my-2" on:click={isPalindrome}>Check</Button>
	</form>

	<div>
		<span>Answer will show here</span>
		<input readonly bind:value={results} type="text" name="results_input" id="results_input" class="form-control" />
	</div>
	<div id="explanation_div">
		<h2>Explanation</h2>
		{@html explanation}
	</div>
</Body>

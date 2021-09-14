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
	import Button from '$lib/Components/Button.svelte';
	export let tool;

	import * as Palindrome from './_script.js';
	import jquery from 'jquery';

	let data = {
		text: '',
		case_sensitive: false,
		ignore_whitespaces: false,
		valid: true,
		error: ''
	};
	let explanation = '';
	const isPalindrome = () => {
		data.valid = true;
		if (data.text.length < 1 || data.length == '') {
			data.error = 'Enter a word or phrase';
			data.valid = false;
		}
		if (!data.valid) return;
		data.text = data.ignore_whitespaces ? data.text.replace(/\s/g, '') : data.text;
		let formatted_text = data.case_sensitive ? data.text : data.text.toLowerCase();
		let res = Palindrome.palindrome_checker(data.text);
		if (res) jquery('#results_input').val('Text is a palindrome');
		else jquery('#results_input').val('Text is not a palindrome');

		if (data.text.length >= 3) {
			explanation = Palindrome.explanation(
				res,
				data.text,
				formatted_text,
				data.case_sensitive,
				data.ignore_whitespaces
			);
		}
	};
</script>

<Header {tool} />

<Body>
	<div>
		<label for="word">Enter a word or sentence</label>
		<input
			type="text"
			name="word"
			required
			id="word"
			placeholder="Enter word here"
			bind:value={data.text}
			on:input={() => (data.error = '')}
		/>
		<span class="text-red-500 text-sm">{data.error}</span>
	</div>
	<div class="mt-2">
		<label for="case_sensitive">Case Sensitive</label>
		<input
			type="checkbox"
			name="case_sensitive"
			id="case_sensitive"
			bind:checked={data.case_sensitive}
		/>
	</div>
	<div>
		<label for="ignore_whitespaces">Ignore whitespaces</label>
		<input
			type="checkbox"
			name="ignore_whitespaces"
			id="ignore_whitespaces"
			bind:checked={data.ignore_whitespaces}
		/>
		<Button block on:click={isPalindrome}>Check</Button>
	</div>
	<div>
		<span>Answer will show here</span>
		<input disabled type="text" name="results_input" id="results_input" class="form-control" />
	</div>
	<div id="explanation_div">
		<h2>Explanation</h2>
		{@html explanation}
	</div>
</Body>

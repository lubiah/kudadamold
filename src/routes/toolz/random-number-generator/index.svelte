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
	import { random_int, output_type_changer } from './_script.js';
	export let tool;

	let data = {
		min_number: 1,
		max_number: 50,
		output_type: 'normal',
		no_of_times: 1,
		valid: false
	};
	let error = {
		min_number: '',
		max_number: '',
		no_of_times: ''
	};
	let res = [];

	const generate = () => {
		data.valid = true;
		if (data.max_number == null) {
			error.max_number = 'Maximum number is empty or invaild';
			data.valid = false;
		}
		if (data.min_number == null) {
			error.min_number = `Mininum number is empty or invalid`;
			data.valid = false;
		}
		if (data.no_of_times == null) {
			error.no_of_times = 'This value can not be empty';
			data.valid = false;
		}
		if (!data.valid) return;
		let i = 0;
		res = [];
		do {
			let number = output_type_changer(
				data.output_type,
				random_int(data.min_number, data.max_number),
				data.min_number,
				data.max_number
			);
			res.push(number);
			i++;
		} while (i !== data.no_of_times);
	};
</script>

<Header {tool} />
<Body>
	<div>
		<fieldset>
			<legend>Range</legend>
			<label for="min_number">Min. number</label>
			<input
				type="number"
				class="block"
				id="min_number"
				required
				max="9223372036854775806"
				bind:value={data.min_number}
				on:input={() => (error.min_number = '')}
			/>
			<span class="text-red-500 text-sm block">{error.min_number}</span>

			<label for="max_number">Max. number</label>
			<input
				type="number"
				id="max_number"
				required
				max="9223372036854775807"
				bind:value={data.max_number}
				on:input={() => (error.max_number = '')}
			/>
			<span class="text-red-500 text-sm block">{error.max_number}</span>
		</fieldset>
		<fieldset>
			<legend>Output type</legend>
			<div>
				<label for="even_radio">Even number</label>
				<input
					type="radio"
					id="even_radio"
					bind:group={data.output_type}
					value="even"
					name="output_type"
				/>
			</div>
			<div>
				<label for="odd_radio">Odd number</label>
				<input
					type="radio"
					name="output_type"
					id="odd_radio"
					value="odd"
					bind:group={data.output_type}
				/>
			</div>
			<div>
				<label for="normal_radio">Normal</label>
				<input
					type="radio"
					name="output_type"
					id="normal_radio"
					value="normal"
					checked
					bind:group={data.output_type}
				/>
			</div>
		</fieldset>
		<fieldset>
			<legend>No. of times</legend>
			<input
				type="number"
				id="no_of_times"
				name="no_of_times"
				required
				max="3333333"
				bind:value={data.no_of_times}
				on:input={() => (error.no_of_times = '')}
			/>
		</fieldset>
		<span class="text-red-500 text-sm">{error.no_of_times}</span>
	</div>
	<div>
		<button class="!my-2" on:click={generate}>Generate</button>
	</div>
	<pre>{res}</pre>
</Body>

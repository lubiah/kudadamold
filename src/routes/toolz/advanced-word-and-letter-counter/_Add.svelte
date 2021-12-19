<script type="text/javascript">
	import { createEventDispatcher } from 'svelte';
	export let hidden = false;
	let dispatch = createEventDispatcher();
	let data; //This is the variable which is going to hold all the values which we will take from the user
	$: data = {
		name: null,
		data: null,
		type: 'string',
		valid: true,
		regexFlags: 'g'
	}; //Also, it is reactive
	let error = {
		name: '',
		data: ''
	}; //This is the variable which will hold all the error messages

	const hide = () => {
		hidden = !hidden;
		dispatch('close', true);
	};

	const add = () => {
		data.valid = true;
		if (data.name === null || data.name.length === 0) {
			error.name = 'Name cannot be empty';
			data.valid = false;
		}
		if (data.data === null || data.data.length === 0) {
			error.data = 'Enter a match string or a regex';
			data.valid = false;
		}

		if (data.valid) {
			data.id = Date.now();
			data.value = 0;
			data.regexFlags = data.regexFlags === null ? '' : data.regexFlags; //If the flags are null, it will replace it with an empty string
			dispatch('add', data); //The data is then added as an event
			hidden = true;
			data = [];
			data.type = 'string';
		}
	};
</script>

<div class="fixed" id="backdrop" class:hidden on:click|self={hide}>
	<div class="bg-white dark:bg-gray-700 p-4 border border-gray-300 max-w-sm m-auto mt-28">
		<p class="font-semibold text-2xl text-center my-1 dark:text-white">Add new Type</p>
		<div class="my-1">
			<label for="name">Name</label>
			<input id="name" type="text" bind:value={data.name} on:input={() => (error.name = '')} />
			<span class="text-red-600">{error.name}</span>
		</div>
		<div class="my-1">
			<label for="regex">Match</label>
			<input
				type="text"
				placeholder="Regex Code or Normal String"
				bind:value={data.data}
				on:input={() => (error.data = '')}
			/>
			<span class="text-red-600">{error.data}</span>
			{#if data.type === 'regex'}
				<div>
					<label for="flags">Flags</label>
					<input type="text" id="flags" placeholder="Regex Flags" bind:value={data.regexFlags} />
				</div>
			{/if}
		</div>
		<div class="my-2">
			<div>
				<label for="string">String</label>
				<input type="radio" name="string" value="string" id="string" bind:group={data.type} />
			</div>
			<div>
				<label for="regex">Regular Expression</label>
				<input type="radio" name="regex" value="regex" id="regex" bind:group={data.type} />
			</div>
		</div>
		<div class="border border-red-500 bg-red-100 p-2 my-1 rounded-md dark:text-black">
			Don't include '/ /' when entering your regular Expressions, it is already done for you
		</div>
		<button class="mx-3 !my-3" on:click={add}>Add</button><button
			on:click={hide}
			danger
			primary={false}>Cancel</button
		>
	</div>
</div>

<style type="text/css">
	#backdrop {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>

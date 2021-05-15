<script type="text/javascript">
	import Button from "../../../Components/Button.svelte";
	import { createEventDispatcher } from "svelte";
	export let hidden = false;
	let dispatch = createEventDispatcher();
	let data = {
		name: null,
		data : null,
		type : 'string',
		valid : true
	}
	let error = {
		name: '',
		data: ''
	};
	const add = ()=>{
		data.valid = true;
		if (data.name === null || data.name.length === 0){
			error.name = "Name cannot be empty";
			data.valid = false;
		};
		if (data.data === null || data.data.length === 0){
			error.data = 'Enter a match string or a regex';
			data.valid = false;
		};

		if (data.valid){
			data.id = Date.now();
			data.value= 0
			console.log("Data is Valid");
			dispatch("add",data);
			hidden = true;
			data = [];
			data.type = "string";
		}
	}
</script>

<div class="fixed" id="backdrop" class:hidden>
<div class="bg-white p-4 border border-gray-300 max-w-sm m-auto mt-28">
	<p class="font-semibold text-2xl text-center my-1">Add new Type</p>
	<div class="my-1">
		<label for="name">Name</label>
		<input id="name" type="text" bind:value={data.name} on:input={()=>error.name = ''}>
		<span class="text-red-600">{error.name}</span>
	</div>
	<div class="my-1">
		<label for="regex">Match</label>
		<input type="text" placeholder="Regex Code or Normal String" bind:value={data.data} on:input={()=>error.data = ''}>
		<div class="my-2">
		<div>
		<label for="string">String</label>
		<input type="radio" name="string" value="string" id="string" bind:group={data.type}>
		</div>
		<div>
		<label for="regex">Regular Expression</label>
		<input type="radio" name="regex" value="regex" id="regex" bind:group={data.type}>
		</div>
	</div>
		<span class="text-red-600">{error.data}</span>
	</div>
	<div class="border border-green-500 bg-green-100 p-2 my-1 rounded-md">
		If you are entering a regular expression, provide the flags, example "/[a-z]/gi".
	</div>
		<Button on:click={add}>Add</Button>
</div>
</div>

<style type="text/css">
	#backdrop {
		height: 100%;
		width: 100%;
		background-color: rgba(0,0,0,0.4);
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
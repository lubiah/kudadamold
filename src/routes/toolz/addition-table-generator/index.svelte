<script context="module">
    export async function preload(page, session){
        let name = page.path.split('/').slice(-1).toString();
        let res = await this.fetch(`/toolz.json?info=${name}`);
        let tool = await res.json();
        return { tool };
    }
</script>

<script type="text/javascript">
	import Header from "../../../Components/Toolz/Header.svelte";
	import Body from "../../../Components/Toolz/Body.svelte";
	import Button from "../../../Components/Button.svelte";
	export let tool;

	let data = {
		number : 1,
		min_number : 1,
		max_number : 20,
		step : 1,
	}
	let res = '';


	const handle_form = ()=>{
		res = ''; //Resets the value;
		for( data.number ; data.min_number <= data.max_number; data.min_number += data.step){
			res += `${data.number} + ${data.min_number} = ${data.min_number+data.number}\n`;
		}
		data.min_number = 1;
	}
</script>

<Header tool = {tool}/>

<Body>
<div>
    <div class="flex flex-wrap gap-x-6">
        <label for="number">Number</label>
        <input type="number" name=""  id="number" required on:input={(e)=>{data.number = parseInt(e.target.value)}} value={data.number}>
    </div>
    <div>
        <label for="min">Min. number</label>
        <input type="number" name="" id="min" class="form-control" required value={data.min_number} on:input={(e)=>{data.min_number = parseInt(e.target.value)}}>
    </div>
    <div>
        <label for="max">Max. number</label>
        <input type="number" name="" on:input={(e)=>{data.max_number = parseInt(e.target.value)}} id="max" class="form-control" required value={data.max_number}>
    </div>
    <div>
        <label for="step">Step</label>
        <input type="number" on:input={(e)=>{data.step = parseInt(e.target.value)}} name="" class="form-control" min="1" value={data.step}>
    </div>
    <div>
        <Button on:click={handle_form}>Generate</Button>
    </div>
</div>
<pre>
	{res}
</pre>
</Body>

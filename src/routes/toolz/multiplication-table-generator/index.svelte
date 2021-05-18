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
    let data;
    $: data = {
        number : 1,
        min_number : 1,
        max_number : 20,
        step : 1,
        valid : true
    };
    let error = {
        number : '',
        min_number : '',
        max_number : '',
        step : ''
    };
    let res = '';


    const handle_form = ()=>{
        data.valid = true;
        if (data.number === null) {
            error.number = `Number value is empty or invalid`;
            data.valid = false;
        }
        if (data.min_number === null){
            error.min_number = `Minimum value is empty or invalid`;
            data.valid = false;
        }
        if (data.max_number === null){
            error.max_number = `Maximum value is empty or invalid`;
            data.valid = false;
        }
        if (data.step === null){
            error.step = `Step value is empty or invalid`;
            data.valid = false;
        }
        if (data.min_number > data.max_number){
            error.min_number = `Minimum number can not be greater than maximum number`;
            data.valid = false;
        }

        if (data.valid){
        res = ''; //Resets the value;
        for( data.number ; data.min_number <= data.max_number; data.min_number += data.step){
            res += `${data.number} x ${data.min_number} = ${data.min_number*data.number}\n`;
        }
        data.min_number = 1;
    }
    }
</script>

<Header tool = {tool}/>

<Body>
<div>
    <div class="flex flex-wrap gap-x-6">
        <label for="number">Number</label>
        <input type="number" name=""  id="number" bind:value={data.number} on:input={()=>error.number = ''} class="">
        <span class="text-sm text-red-500">{error.number}</span>
    </div>
    <div>
        <label for="min">Min. number</label>
        <input type="number" max="{data.max_number - 1}" name="" id="min" on:input={()=> error.min_number = ''}  bind:value={data.min_number}>
        <span class="text-red-500 text-sm">{error.min_number}</span>
    </div>
    <div>
        <label for="max">Max. number</label>
        <input type="number" name="" bind:value={data.max_number} id="max" class="form-control" on:input={()=>error.max_number = ''}>
        <span class="text-red-500 text-sm">{error.max_number}</span>
    </div>
    <div>
        <label for="step">Step</label>
        <input type="number" on:input={()=>error.step = ''} bind:value={data.step} name="" class="form-control" min="1">
        <span class="text-red-500 text-sm">{error.step}</span>
    </div>
    <div>
        <Button on:click={handle_form}>Generate</Button>
    </div>
</div>
<pre>
    {res}
</pre>
</Body>

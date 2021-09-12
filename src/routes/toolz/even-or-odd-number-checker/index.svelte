<script context="module">
    export async function load({ page, fetch }){
        let name = page.path.split('/').slice(-1).toString();
        let res = await fetch(`/toolz.json?info=${name}`);
        let { info } = await res.json();
        return {
            props: {
                tool: info
            }
        }
    }
</script>

<script type="text/javascript">
    import Header from "$lib/Components/Toolz/Header.svelte";
    import Body from "$lib/Components/Toolz/Body.svelte";
    import jquery from "jquery";
    import Button from "$lib/Components/Button.svelte";
    export let tool;
    let error = '';
    let number = 0;
    let valid = false;
    const handleForm = ()=> {
        valid = true;
        if (number === null)
        {
            error = 'Number value is empty or invalid';
            valid = false;
        };
        if (valid){
        let is_even = (number % 2 == 0) ? true : false;
        is_even ? jquery("#results").val("Number is an even number") : jquery("#results").val("Number is an odd number");
        }
    }
</script>

<Header tool={tool}/>

<Body>
<div>
    <div class="flex flex-wrap gap-x-6">
        <label for="number">Enter number</label>
        <input type="number" on:input={()=>error = ''} bind:value={number}  id="number" required placeholder="Enter number">
        <span class="text-red-500 text-sm">{error}</span>
    </div>
    <Button  class="!my-2" on:click={handleForm}>Check</Button>
</div>
<div id="results_div" class="mt-3">
    <label for='results'>Results appear here</label>
    <input type="text" name="results" id="results" readonly>
</div>
</Body>

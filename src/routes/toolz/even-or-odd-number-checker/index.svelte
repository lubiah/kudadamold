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
    import jquery from "jquery";
    import Button from "../../../Components/Button.svelte";
    export let tool;
    let number = 0;
    const handleForm = ()=> {
        let is_even = (number % 2 == 0) ? true : false;
        is_even ? jquery("#results").val("Number is an even number") : jquery("#results").val("Number is an odd number");
    }
</script>

<Header tool={tool}/>

<Body>
<div>
    <div class="flex flex-wrap gap-x-6">
        <label for="number">Enter number</label>
        <input type="number" bind:value={number}  id="number" required placeholder="Enter number">
    </div>
    <Button  on:click={handleForm}>Check</Button>
</div>
<div id="results_div" class="frounded border mx-auto mt-3 p-2">
    <label for='results' class="p-2">Results appear here</label>
    <input type="text" name="results" id="results" readonly>
</div>
</Body>

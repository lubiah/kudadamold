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

	let number = 2;
	let results = '';
    let valid = true;
    let error = '';
	function get_factors(number){
    //Function responsible for generating factors
    if (number == null){
        error = `Number value is empty or invalid`;
        valid = false;
    }
    if (!valid)
        return;
    let array = [];
    if (number % 2 == 0){
        for (let i = 0; i <= number/2; i++){
            if (number % i == 0)
                array.push(i)
        }
        array.push(parseInt(number));
        return array
    }
    else if (number % 3 == 0){
        for (let i = 0; i <= number/3; i++){
            if (number % i == 0)
                array.push(i)
        }
        array.push(parseInt(number));
        return array;
    }
    else{
        for (let i = 0; i <= number; i++){
            if (number % i == 0)
                array.push(i)
        }
        return array;
    }
}

	const generate = ()=> {
		results = get_factors(number);
	}

</script>

<Header tool={tool}/>

<Body>
    <div>
        <label for="number">Enter the number</label>
        <input bind:value={number} type="number" id="number" on:input={()=>error=''}>
        <span class="text-red-500 text-sm">{error}</span>
    </div>
    	<Button on:click={generate}>Generate</Button>
    <div>
        <p class="block font-semibold">Factors</p>
       	<p class="m-3 max-w-sm text-lg">[ {results} ]</p>
    </div>
</Body>
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
    import { random_int, output_type_changer } from "./_script.js"; 
    export let tool;

    let data = {
        min_number : 1,
        max_number : 50,
        output_type: 'normal',
        no_of_times : 1
    };
    let res = [];

    const generate = ()=>{
        let i = 0;
        res = [];
        do {
            let number = output_type_changer(data.output_type, random_int(data.min_number, data.max_number), data.min_number, data.max_number);
            res.push(number);
            i++;
        }
        while (i !== data.no_of_times);
        console.log(res);
    }
</script>
<Header tool={tool}/>
<Body>
    <div>
        <fieldset>
            <legend>Range</legend>
            <label for="min_number">Min. number</label> <input type="number" id="min_number" required max="9223372036854775806" bind:value={data.min_number}><br>
                    <label for="max_number">Max. number</label> <input type="number" id="max_number" required max="9223372036854775807" bind:value={data.max_number}>
        </fieldset>
            <fieldset>
                <legend>Output type</legend>
                <div>  
                    <label for="even_radio">Even number</label>
                    <input type="radio" id="even_radio" bind:group={data.output_type} value="even" name="output_type">    
                </div>
                <div>
                    <label for="odd_radio">Odd number</label> <input type="radio" name="output_type" id="odd_radio" value="odd" bind:group={data.output_type}>
                    </div>
                    <div>
                    <label for="normal_radio">Normal</label> <input type="radio" name="output_type" id="normal_radio" value="normal" checked bind:group={data.output_type}>
                    </div>
            </fieldset>
            <fieldset>
                <legend>No. of times</legend>
                    <input type="number" id="no_of_times" name="no_of_times" required max="3333333" bind:value={data.no_of_times}>
                    </fieldset>
            </div>
            <div>
                <Button on:click={generate}>Generate</Button>
            </div>
            <pre>{res}</pre>
</Body>
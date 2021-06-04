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
    import snakecase from "lodash/snakeCase.js";

    export let tool;
    let data = {
        text : "",
        results : ""
    };

    const toSnakeCase = ()=>{
        data.results = snakecase(data.text);
    }
</script>

<Header {tool} />

<Body>
    <div>
        <label for="text">Enter your text here</label>
        <textarea type="text" id="text" rows="5" bind:value={data.text} on:input={toSnakeCase}></textarea>
    </div>
    <div class="mt-6">
        <label for="results">Results appear here</label>
        <textarea type="text" id="results" rows="5" bind:value={data.results}></textarea>
    </div>
</Body>
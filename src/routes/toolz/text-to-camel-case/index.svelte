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
    import camelcase from "lodash/camelCase.js";

    export let tool;
    let data = {
        text : "",
        results : ""
    };

    const toCamelCase = ()=>{
        data.results = camelcase(data.text);
    }
</script>

<Header {tool} />

<Body>
    <div>
        <label for="text">Enter your text here</label>
        <textarea type="text" id="text" bind:value={data.text} on:input={toCamelCase} rows="5"></textarea>
    </div>
    <div class="mt-6">
        <label for="results">Results appear here</label>
        <textarea type="text" id="results" bind:value={data.results} rows="5"></textarea>
    </div>
</Body>
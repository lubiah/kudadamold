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
    import kebabcase from "lodash/kebabCase.js";

    export let tool;
    let data = {
        text : "",
        results : ""
    };

    const toKebabCase = ()=>{
        data.results = kebabcase(data.text);
    }
</script>

<Header {tool} />

<Body>
    <div>
        <label for="text">Enter your text here</label>
        <textarea type="text" rows="5" id="text" bind:value={data.text} on:input={toKebabCase}></textarea>
    </div>
    <div class="mt-6">
        <label for="results">Results appear here</label>
        <textarea type="text" id="results" rows="5" bind:value={data.results}></textarea>
    </div>
</Body>
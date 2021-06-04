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

    export let tool;

    let data;
    $:data = {
        text: "",
        results : ""
    };
    let number_regex = /\d+/g;
    let not_number_regex = /\D+/g

    const get_numbers = ()=>{
        let text = data.text;
        data.results = text.replace(not_number_regex, "");
        }
</script>

<Header {tool}/>

<Body>
    <div>
        <label for="textarea" class="ml-4">Enter your text here</label>
        <div contenteditable class="border w-full border-gray-300 rounded p-2 bg-white" id="textarea" on:input={e=> data.text = e.target.innerText} on:input={get_numbers}>{data.text}</div>
    </div>
    <div class="mt-8">
        <label for="results">Results appear here</label>
        <div id="results" class="border-gray-300 border p-2 w-full bg-white">{data.results}</div>
    </div>
</Body>

<style type="text/css">
    #textarea, #results {
        max-height: 250px;
        overflow-y: scroll;
        height: 100px;
    }
</style>
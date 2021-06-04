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
        times: 1,
        text: "",
    };

    const duplicate = ()=>{
        data.text = data.text.repeat(data.times);
    }
</script>

<Header {tool} />

<Body>

    <div>
        <label for="text">Enter your text here</label>
        <textarea id="text" class="w-full" rows="10" bind:value={data.text}></textarea>
    </div>
    <div>
        <label for="times">Times</label>
        <input id="times" type="number" name="" bind:value={data.times}>
        <Button on:click={duplicate}>Duplicate</Button>
    </div>

</Body>
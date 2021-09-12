<script context="module">
    export async function load({ page, session}){
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
    import Button from "$lib/Components/Button.svelte";
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
        <Button class="!my-3" on:click={duplicate}>Duplicate</Button>
    </div>

</Body>
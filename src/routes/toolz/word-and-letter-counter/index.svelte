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
    import Add from './Add.svelte';
    export let tool;
    let hidden = true;
    let data = [];

    const addRule = (e)=>{
        hidden = true;
        data = [...data, e.detail];
    }

    const check = (e)=>{
        let text = e.target.value + e.key;
        data.map(item => {
            if (item.type === "string"){
                let reg = new RegExp(`[${item.data}]`,'g');
                let value = text.match(reg);
                if (value !== null)
                    item.value = parseInt(value.length);
            }
        });
        data = data;
    }
</script>

<Header tool={tool} buggy={true}/>

<Body>

<Add {hidden} on:add={addRule}/>


<textarea rows="5" cols="5" class="border-blue-500 border w-full rounded p-3 my-3" on:keypress={check}></textarea>
<Button on:click={()=> hidden = !hidden}>Add Rule</Button>

<table class="border border-gray-300 divide-gray-300 divide-x divide-y">
    <thead>
        <tr class="divide-gray-300 divide-x font-semibold">
            <td class="p-3">Name</td>
            <td class="p-3">Match</td>
            <td class="p-3">Match Type</td>
            <td class="p-3">Occurence</td>
        </tr>
    </thead>
    <tbody>
    {#each data as item (item.id) }
        <tr class="divide-gray-300 divide-y">
            <td class="p-5">{item.name}</td>
            <td class="p-5">{item.data}</td>
            <td class="p-5">{item.type}</td>
            <td class="p-5">{item.value}</td>
        </tr>
    {/each}
    </tbody>
</table>

</Body>
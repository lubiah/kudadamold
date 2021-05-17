<script context="module">
    export async function preload(page, session){
        let name = page.path.split('/').slice(-1).toString();
        let res = await this.fetch(`/toolz.json?info=${name}`);
        let tool = await res.json();
        return { tool };
    }
</script>

<script type="text/javascript">
    import escape_reg  from "regex-escape";
    import Header from "../../../Components/Toolz/Header.svelte";
    import Body from "../../../Components/Toolz/Body.svelte";
    import Button from "../../../Components/Button.svelte";
    import Add from './_Add.svelte';
    export let tool;
    let hidden = true; //This is to show that the Add modal dialog is hidden;
    let data = [
    {
        name: "Lowercase Letters",
        data: "[a-z]",
        type: "regex",
        regexFlags: "g",
        value: 0,
        id: 1
    },
    {
        name: "Uppercase Letters",
        data: "[A-Z]",
        type: "regex",
        regexFlags: "g",
        value: 0,
        id: 2
    },
    {
        name: "Digits",
        data: "0123456789",
        type: "string",
        regexFlags: "g",
        value: 0,
        id: 3
    }
    ];//This variable contains all the data which will enable the application to work
    let text = ""; //The default value for the textarea element.
    const addRule = (e)=>{ 
        hidden = true;
        data = [...data, e.detail];
        check();
    } //This function is called when data is added from the 'Add.svelte' file

    const check = ()=>{
        data.map(item => {
            if (item.type === "string"){
                (text.length === 0) ? item.value = 0 : null;
                let reg = new RegExp(`[${escape_reg(item.data)}]`,'g');
                let value = text.match(reg);
                if (value !== null)
                    item.value = parseInt(value.length);
            }   
            else {
              (text.length === 0) ? item.value = 0 : null;
              let reg = new RegExp(`${item.data}`,`${item.regexFlags}`);
              let value = text.match(reg);
              if (value !== null)
                item.value = parseInt(value.length);  
            }
        });
        data = data;
    }
    const remove = (e)=>{
        let id = e.target.getAttribute('data-id');
        data = [...data.filter(item => item.id != id)]; 
    }
</script>

<Header tool={tool}/>

<Body>

<Add {hidden} on:add={addRule} on:close={()=>hidden = !hidden}/>


<textarea  bind:value={text} rows="5" cols="5" class="border-blue-500 border w-full rounded p-3 my-3" on:input={check}></textarea>
<Button on:click={()=> hidden = !hidden}>Add Rule</Button>

<table class="border border-gray-300 divide-gray-300 divide-x divide-y py-4">
    <thead>
        <tr class="divide-gray-300 divide-x font-semibold">
            <td class="p-3">Name</td>
            <td class="p-3">Match</td>
            <td class="p-3">Match Type</td>
            <td class="p-3">Occurence</td>
            <td class="p-3"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></td>
        </tr>
    </thead>
    <tbody>
    {#each data as item (item.id) }
        <tr class="divide-gray-300 divide-x divide-y">
            <td class="p-5">{item.name}</td>
            <td class="p-5">{item.data}</td>
            <td class="p-5">{item.type}</td>
            <td class="p-5">{item.value}</td>
            <td class="p-5">
                <svg data-id={item.id} on:click={remove} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bg-red-500 text-white hover:bg-blue-500 rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </td>
        </tr>
    {/each}
    </tbody>
</table>

</Body>
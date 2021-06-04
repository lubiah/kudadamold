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
    import regular_escape from "regex-escape";

    export let tool;

    let text, escaped;
    $: text = '';
    $: escaped = '';

    const escape_regex = ()=>{
    	escaped = regular_escape(text);
    }
</script>

<Header tool = {tool}/>

<Body>
	<div>
		<label for="input">Enter your regular Expression</label>
		<input type="text" id="input" bind:value={text} on:input={escape_regex}>
	</div>

	<div class="my-8">
		<label for="">Escaped regex appears here</label>
		<input type="text" name="" bind:value={escaped}>	
	</div>
		<p class="text-green-500">
			Results appear as you type
		</p>
</Body>

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

    let number;
    $:number = 0;
</script>

<Header {tool} />

<Body>
	<div class="text-center text-3xl">
		<div class="w-20 border border-gray-500 mx-auto">
			<button on:click={()=>number++}>+</button>
			<div class="text-center p-2" contenteditable>{number}</div>
			<button on:click={()=>number--}>-</button>		
		</div>
	</div>
</Body>


<style type="text/css">
	button {
		@apply w-full bg-green-500 p-4;
	}
</style>
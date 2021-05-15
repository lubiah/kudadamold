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
    import jquery from "jquery";
    import { onMount } from "svelte";

    export let tool;

    onMount(()=>{
        jquery('#body').html(`<h2 class='text-green-500 my-2'>Congratulations</h2><p>Your web browser has JavaScript enabled</p>`);
    });
</script>

<Header tool={tool}/>
<Body>
<div id="body" class="text-center">  
    <noscript>
        <h2 style="color: red">Sorry, JavaScript is disabled in your browser.</h2>
        <i class="fas fa-times" style="color: red; font-size: 150px"></i>
    </noscript>
</div>
</Body>
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

    import * as Palindrome from "./_script.js";
    import jquery from "jquery";
    let text;
    let case_sensitive;
    let ignore_whitespaces;
    const isPalindrome = ()=>{
        case_sensitive = case_sensitive === undefined ? false : true;
        ignore_whitespaces = ignore_whitespaces === undefined ? true : false;
        text  = ignore_whitespaces ? text.replace(/\s/g, '') : text;
        let formatted_text = case_sensitive ? text : text.toLowerCase();
        let res = Palindrome.palindrome_checker(text);
        if (res)
            jquery("#results_input").val("Text is a palindrome");
        else
            jquery("#results_input").val("Text is not a palindrome");

        if (text.length >= 3){

           let explanation = Palindrome.explanation(res,formatted_text,case_sensitive, ignore_whitespaces);
            console.log(explanation);
        }

    }
</script>

<Header tool={tool}/>

<Body>
    <div>
        <label for="word">Enter a word or sentence</label>
        <input type="text" name="word" required id="word" placeholder="Enter word here" bind:value={text}>
    </div>
    <div class="mt-2">
        <label for="case_sensitive">Case Sensitive</label>      
        <input type="checkbox" name="case_sensitive" id="case_sensitive" bind:checked={case_sensitive}>  
    </div>
    <div>
        <label for="ignore_whitespaces">Ignore whitespaces</label>
        <input type="checkbox" name="ignore_whitespaces" id="ignore_whitespaces" bind:checked={ignore_whitespaces}>
       	<Button Class="block" on:click={isPalindrome}>Check</Button>
    </div>
    <div>
        <span>Answer will show here</span>
        <input type="text" name="results_input" id="results_input" class="form-control" placeholder="Answer will show here">
    </div>
<div id="explanation_div"></div>
</Body>
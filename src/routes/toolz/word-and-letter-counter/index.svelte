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

    let consts = {
        lowercase : "abcdefghijklmnopqrstuvwxyz",
        uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        digits : "0123456789",
        letters : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }        

    let text = "";
    let data = [
        {name : "Words", value : 0, id : 1},
        {name : "Letters", value : 0, id : 2},
        {name : "Uppercase Letters", value : 0, id : 3},
        {name: "Lowercase Letters", value : 0, id : 4},
        {name: "New lines", value : 0, id: 5},
        {name: "Digits", value : 0, id: 6},
        {name: "Punctuations", value : 0, id: 7}
        ]
    function get_punctuation(text){

    }
	function get_num_words(text){
    	if (text.length == 0)
        	return 0;
        	//Gets the num of words
         	let text_array = text.split(" ");
            return text_array.length;
	}
	function get_digits(text){
                let text_array = text.split("");
                var count = 0;
                for (let i in text_array){
                    char = text_array[i];
                    ((consts.digits).includes(char) ? count++ : null);
                }
                return count;
    		}

function get_num_uppercase(text){
    let text_array = text.split("");
    var count = 0;
    for (let i in text_array){
        var char = text_array[i];
        ((consts.uppercase).includes(char) ? count++ : null);
        }
       	return count;   
     }
     function get_newlines(text){
            	let text_array = text.split("");
                var count = 0;
                for (let i in text_array){
                    var char = text_array[i];
                    console.log(char);
                    ((char).includes("\n") ? count++ : null);
                }
                return count;    
            }
function get_num_lowercase(text){
                let text_array = text.split("");
                var count = 0;
                for (let i in text_array){
                    var char = text_array[i];
                    ((consts.lowercase).includes(char) ? count++ : null);
                }
                return count;   
            }
function get_num_letters(text){
                let text_array = text.split("");
                var count = 0;
                for (let i in text_array){
                   	var char = text_array[i];
                    ((consts.letters).includes(char) ? count++ : null);
                }
                return count;
            }
function get_sentences(text){
    if (text.length == 0)
        return 0;
    //Gets the num of words
    text_array = text.split(".");
    return text_array.length;
            }

     const check = ()=>{
        data[0].value = get_num_words(text);
        data[1].value = get_num_letters(text);
        data[2].value = get_num_uppercase(text);
        data[3].value = get_num_lowercase(text);
        data[4].value = get_newlines(text);
        data[5].value = get_digits(text);
        data[6].value = get_punctuations(text);
     }
</script>

<Header tool={tool} buggy={true}/>

<Body>
<textarea rows="5" cols="5" class="border-blue-500 border w-2/3 rounded p-3 my-3" on:input={check} bind:value={text}></textarea>
<table class="border table-auto max-w-sm divide-gray-300 divide-y">
    {#each data as item (item.id) }
        <tr class="p-10">
            <td class="py-5 px-10">{item.name}</td>
            <td class="py-5 px-10">{item.value}</td>
        </tr>
    {/each}
</table>
<style type="text/css">
</style>
</Body>
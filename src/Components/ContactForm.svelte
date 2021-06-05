<script type="text/javascript">
    import Button from  "./Button.svelte";
    let data = {
        name: null,
        email: null,
        subject: null,
        message: null
    };
    const submit = async ()=>{  

        const res = await fetch("/contact.json", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        });
        window.alert("Message sent");
    }
</script>

<form method="post" class="max-w-screen-sm my-2 shadow-xl border-gray-300 dark:border-gray-500 border rounded drop-shadow-lg p-4"  on:submit|preventDefault={submit}>
    <div>
        <label for="name">Name</label>
        <input id="name" type="text" bind:value={data.name} class="dark:bg-gray-600 dark:border-0" required   />
    </div>
    <div>
        <label for="subject">Subject</label>
        <input type="text" id="subject" required class="dark:bg-gray-600 dark:border-0" bind:value={data.subject}> 
    </div>
    <div>
        <label for="email">Email</label>
        <input type="email" id="email" class="dark:bg-gray-600 dark:border-0" bind:value={data.email}></div>
    <div>
        <label for="" id="message">Message</label>
        <textarea rows="10" id="message" class="dark:bg-gray-600 dark:border-0 dark:text-white" bind:value={data.message}></textarea>
    </div>
    <Button type="submit">Send Mail</Button>
</form>


<style>
    input, textarea {
        @apply border-gray-300 border rounded w-full p-1.5 my-1;
    }
</style>
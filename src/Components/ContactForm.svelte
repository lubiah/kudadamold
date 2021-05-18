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

<form method="post" class="max-w-screen-sm" on:submit|preventDefault={submit}>
    <div>
        <input type="text" bind:value={data.name} required placeholder="Your name" class="w-full m-1 text-base p-1 bg-gray-200 rounded" />
    </div>
    <div>
        <input type="text" placeholder="Subject" name="subject" required class="w-full m-1 text-base p-1 bg-gray-200 rounded" bind:value={data.subject}> 
    </div>
    <div>
        <input type="email" class="w-full m-1 text-base p-1 bg-gray-200 rounded" name="email" required placeholder="Email address" bind:value={data.email}></div>
    <div>
        <textarea class="w-full m-1 text-base p-1 bg-gray-200 rounded" id="message" rows="7" name="message" required placeholder="Enter your message here" bind:value={data.message}></textarea>
    </div>
    <Button type="submit">Send Mail</Button>
</form>

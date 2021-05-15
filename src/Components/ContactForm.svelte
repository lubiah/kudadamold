<script type="text/javascript">
    import Button from  "./Button.svelte";
</script>
<form method="post" class="max-w-screen-sm">
    <div>
        <input type="text" name="name" required placeholder="Your name" class="w-full m-1 text-base p-1 bg-gray-200 rounded" />
    </div>
    <div>
        <input type="text" placeholder="Subject" name="subject" required class="w-full m-1 text-base p-1 bg-gray-200 rounded"> 
    </div>
    <div>
        <input type="email" class="w-full m-1 text-base p-1 bg-gray-200 rounded" name="email" required placeholder="Email address"> </div>
    <div>
        <textarea class="w-full m-1 text-base p-1 bg-gray-200 rounded" id="message" rows="7" name="message" required placeholder="Enter your message here"></textarea>
    </div>
    <Button type="submit">Send Mail</Button>
</form>

<script type="text/javascript">
    import Button from  "./Button.svelte";
</script>
<form method="post" class="max-w-screen-sm">
    <div>
        <input type="text" name="name" required placeholder="Your name" />
    </div>
    <div>
        <input type="text" placeholder="Subject" name="subject" required> 
    </div>
    <div>
        <input type="email" name="email" required placeholder="Email address"> </div>
    <div>
        <textarea id="message" rows="7" name="message" required placeholder="Enter your message here"></textarea>
    </div>
    <Button type="submit" name="submit" Class="ml-2">Send Mail</Button>
</form>

<style>
    input:not([type="submit"]), textarea {
        @apply w-full m-1 text-base p-1 bg-gray-200 rounded;
    }
</style>
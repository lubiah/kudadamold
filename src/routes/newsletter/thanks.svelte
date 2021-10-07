<script context="module">
	export const load = ({ page })=>{
	if (page.query.has("name")){
		const name = page.query.get("name");

		return {
			props: {
				name
			}
		}
	}
	else {
		return {
			props: {
				name: undefined
			}
		}
	}
	}
</script>

<script>

	import Seo from "svelte-seo";
	export let name;
</script>

<Seo
title = "Newsletter • Thanks For Subscribing"
noindex
nofollow
/>

<div class="xl:w-[65%] mx-auto mt-[100px] border p-8 rounded-lg border-gray-400 dark:border-gray-500">
	<h1 class="font-bold text-center">Thanks For Subscribing</h1>
	<div class="text-2xl text-center">
		<p>
				Hey { name || "there" }, thanks for subscribing to my newsletter<br/>
				Your email has been confirmed and successfully added to the mailing list.<br/>
				Expect some great emails in your inbox very soon
		</p>
	
	</div>
</div>
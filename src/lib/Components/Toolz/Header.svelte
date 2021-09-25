<script type="text/javascript">
	export let tool;
	export let buggy = false;
	import Notification from './Notifications.svelte';
	import SEO from 'svelte-seo';
</script>

<SEO
	title="{tool.name} • Kudadam Toolz"
	description="{tool.description}"
	canonical="https://kudadam.com/toolz/{tool.url}"
	openGraph={{
		title: `${tool.name} • Kudadam Toolz`,
		description: `${tool.description}`,
		url: `https://www.kudadam.com/toolz/${tool.url}`,
		type: 'website',
		images: [
			{
				url: 'https://kudadam.sirv.com/logo/logo_toolz.png',
				width: 850,
				height: 650,
				alt: 'Logo of Kudadam Toolz'
			}
		]
	}}
	twitter={{
		site: '@lucretius_1',
		title: `${tool.name} • Kudadam Toolz`,
		description: `${tool.description}`,
		image: 'https:kudadam.sirv.com/logo/logo_toolz.png',
		imageAlt: 'Logo of Kudadam Toolz'
	}}
/>
<div class="text-center mt-4 mb-6">
	<h1 class="my-1 font-semibold text-blue-500">{tool.name}</h1>
	<p class="text-lg">{tool.description}</p>
</div>
{#if buggy}
	<Notification
		warning
		center
		message="This tool is currently under development. I recommend you do not use it"
	/>
{/if}

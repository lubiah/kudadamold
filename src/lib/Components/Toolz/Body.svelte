<script>
	import ToolzList from '$lib/Components/ToolsList';
</script>

<div id="main" class="mx-auto md:w-2/3 mt-10">
	<slot />
</div>
<ToolzList />

<style>
	:global(input[type='checkbox']) {
		width: inherit;
	}
</style>

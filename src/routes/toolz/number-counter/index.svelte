<script type="text/javascript">
	let number = 0;
</script>

<div class="mx-auto text-center" id="body">
	<div class="mx-auto text-center">
		<div class="text-center border d-inline-block">
			<button class="btn btn-primary" on:click={()=>{number++}}>+</button>
			<div id="text">
				{number}
			</div>
			<button class="btn btn-primary" on:click={()=>{number--}}>-</button>
		</div>
		<button style="font-size: 20px;" class="btn btn-secondary my-2 d-block mx-auto text-center	" on:click={()=>{number = 0;}}>Reset</button>
		<input bind:value={number} type="number" />
	</div>
	
</div>

<style type="text/css">
	#body {
		margin-top: 100px;
	}
	#text {
		margin: 10px;
		font-size: 40px;
	}
	button {
		font-size: 40px;
	}
</style>
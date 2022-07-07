<script>
	export let center = undefined;
</script>

<div class:center><slot /></div>

<style>
	.center {
		display: flex;
		justify-content: center;
	}
</style>

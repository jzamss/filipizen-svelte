<script>
	export let column = undefined;
	export let center = undefined;
	export let style = '';
</script>

<div class:column class="center" {style}><slot /></div>

<style>
	.center {
		display: flex;
		justify-content: center;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.center {
		align-items: center;
		justify-content: center;
	}
</style>

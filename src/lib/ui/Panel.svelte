<script>
	export let column = undefined;
	export let center = undefined;
	export let row = undefined;
	export let border = undefined;
	export let style = '';
</script>

<div class:row class:column class:center class:border {style}><slot /></div>

<style>
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

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

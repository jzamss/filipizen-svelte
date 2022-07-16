<script>
	export let column = null;
</script>

<div class:column><slot /></div>

<style>
	div {
		display: flex;
		justify-content: space-between;
		margin-top: 3rem;
		border-top: 1px solid rgb(224, 224, 224);
		padding-top: 20px;
		padding-bottom: 10px;
		gap: 1rem;
	}

	.column {
		flex-direction: column;
	}
</style>

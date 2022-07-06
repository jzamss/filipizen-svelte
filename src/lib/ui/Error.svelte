<script>
	export let error;
</script>

{#if error}
	<div>{error}</div>
{/if}

<style>
	div {
		width: 100%;
		padding: 5px 5px;
		text-align: center;
		background-color: beige;
	}
</style>

<script>
	export let error;
</script>

{#if error}
	<div>{error}</div>
{/if}

<style>
	div {
		width: 100%;
		padding: 15px 0;
		text-align: center;
		background-color: beige;
		color: rgb(194, 0, 0);
		border-radius: 5px;
		border: 1px solid rgb(230, 230, 205);
	}
</style>

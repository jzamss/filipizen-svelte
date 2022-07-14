<script>
	export let error;

	let ref = null;
	export const focus = () => {
		if (ref) {
			ref.focus();
		}
	};
</script>

{#if error}
	<div bind:this={ref} tabindex="0">{error}</div>
{/if}

<style>
	div {
		width: 100%;
		padding: 10px 5px;
		margin-bottom: 10px;
		font-size: 0.825rem;
		font-weight: 500;
		text-align: center;
		background-color: beige;
		color: rgb(194, 0, 0);
		border-radius: 5px;
		border: 1px solid rgb(230, 230, 205);
	}
</style>

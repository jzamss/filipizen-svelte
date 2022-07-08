<script>
	import CircularProgress from '@smui/circular-progress';

	export let size = 24;
	export let msg = '';
	export let showMessage = true;
</script>

<div>
	<CircularProgress style="height: {size}px; width: {size}px;" indeterminate />
	{#if showMessage}
		<p>{msg}</p>
	{/if}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		margin: 5px 0;
	}
</style>

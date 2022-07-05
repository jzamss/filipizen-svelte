<script>
	import Button, { Label } from '@smui/button';
	import CircularProgress from '@smui/circular-progress';

	export let label = '';
	export let processing = false;
</script>

<Button on:click {...$$props}>
	<Label>{label}</Label>
	{#if processing}
		<CircularProgress style="padding-left: 5px; height: 16px; width: 16px;" indeterminate />
	{/if}
</Button>

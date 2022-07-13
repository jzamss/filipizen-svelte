<script>
	import { DateInput } from 'date-picker-svelte';

	export let value = null;
	export let placeholder = 'mm/dd/yyyy';
	export let format = 'MM/dd/yyyy';
	export let closeOnSelection = true;
	export let disabled = true;

	let date = null;

	$: if (date) {
		value = date;
	} else {
		value = null;
	}
</script>

<div class:disabled>
	<DateInput bind:value={date} {format} {placeholder} {closeOnSelection} />
</div>

<style>
	.disabled {
		pointer-events: none;
	}
</style>

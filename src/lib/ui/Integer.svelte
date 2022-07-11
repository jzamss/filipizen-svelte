<script>
	import { onMount } from 'svelte';
	import TextField from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	export let value = 0;
	export let invalid = false;
	export let validationMsg = '';
	export let autoFocus = false;

	let ref = null;

	onMount(() => {
		if (autoFocus) {
			ref.focus();
		}
	});
</script>

<TextField
	type="number"
	bind:this={ref}
	bind:value
	bind:invalid
	updateInvalid
	{...$$props}
	style="margin-top: -5px;"
>
	<div class="error" slot="helper">{validationMsg ? validationMsg : ''}</div>
</TextField>

<style>
	.error {
		font-size: 0.75rem;
		color: #b00020;
		font-family: var(
			--mdc-typography-caption-font-family,
			var(--mdc-typography-font-family, Roboto, sans-serif)
		);
		font-weight: 400;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import TextField from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	export let value = '';
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

<TextField bind:this={ref} bind:value bind:invalid on:blur {...$$props} style="margin-top: -5px;">
	<HelperText validationMsg slot="helper">{validationMsg}</HelperText>
</TextField>

<script>
	import MsgBox from '$lib/ui/MsgBox.svelte';

	let showError = true;
</script>

<h1>Paymaya</h1>

<MsgBox open={showError} on:accept={() => (showError = false)} title="Payment Processing Error">
	An error occurred while processing your request. Correct the problem and resubmit your request or
	kindly contact the LGU for assistance
</MsgBox>

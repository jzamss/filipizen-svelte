<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import TextField from '$lib/ui/TextField.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import { getData } from '$lib/helpers/fetch.js';

	const dispatch = createEventDispatcher();

	export let title;
	export let partner;

	let processing = false;
	let refno = '';
	let qtr = 4;
	let invalid = false;

	$: valid = refno && refno.trim().length > 0;
	$: error = 'BIN or application number is invalid';

	const onCancel = () => {
		dispatch('cancel');
	};

	const loadBill = async () => {
		processing = true;
		const params = {
			partnerid: partner.id,
			txntype: 'bpls',
			refno,
			qtr
		};
		const bill = await getData('/api/bpls/bill', params);
		console.log('bill', bill);
		processing = false;
		dispatch('submit', bill);
	};
</script>

<div>
	<Paper>
		<Content style="display: flex; flex-direction: column;">
			<Title>{title}</Title>
			<Subtitle>Initial Information</Subtitle>

			<p>Enter a valid Business Identification Number (BIN) or Application No.</p>
			<TextField
				bind:value={refno}
				bind:invalid
				updateInvalid
				label="BIN or Application No."
				fullWidth
				required
				validationMsg={error}
			/>
			<ActionBar>
				<Button on:click={onCancel} label="Cancel" />
				<Button on:click={loadBill} label="Next" variant="raised" disabled={!valid} {processing} />
			</ActionBar>
		</Content>
	</Paper>
</div>

<style>
	div {
		max-width: 480px;
	}

	p {
		margin-bottom: 0.5rem;
	}
</style>

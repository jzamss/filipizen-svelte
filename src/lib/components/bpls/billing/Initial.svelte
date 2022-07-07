<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import TextField from '$lib/ui/TextField.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import Error from '$lib/ui/Error.svelte';
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
		const res = await getData('/api/bpls/bill', {
			partnerid: partner.id,
			txntype: 'bpls',
			refno,
			qtr
		});

		error = res.error;
		if (error) {
			invalid = true;
		}

		processing = false;
		if (!error) {
			dispatch('submit', res.data);
		}
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
				label="BIN or Application No."
				fullWidth
				required
				validationMsg={error}
			/>
			<ActionBar>
				<Button on:click={onCancel} label="Cancel" />
				<Button
					on:click={loadBill}
					label="Next"
					variant="raised"
					disabled={!valid || processing}
					{processing}
				/>
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

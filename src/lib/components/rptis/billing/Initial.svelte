<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import TextField from '$lib/ui/TextField.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Integer from '$lib/ui/Integer.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import { getData } from '$lib/helpers/fetch.js';

	const dispatch = createEventDispatcher();

	export let title;
	export let partner;
	export let txntype;

	const currentYear = new Date().getFullYear();

	let mode = 'initial';
	let processing = false;
	let invalid = false;
	let refno = '';
	let billtoyear = currentYear;
	let billtoqtr = 4;
	let error = 'Tax Declaration number is invalid';

	$: valid = refno && refno.trim().length > 0;

	const onCancel = () => {
		dispatch('cancel');
	};

	const loadBill = async () => {
		if (mode === 'initial-advance') {
			if (billtoyear <= currentYear) {
				error = `Advance year should be greater than or equal to ${currentYear + 1}`;
				invalid = true;
				return;
			}
			const maxYear = currentYear + 3;
			if (billtoyear > maxYear) {
				error = `Advance year should be less or equal than ${maxYear}`;
				invalid = true;
				return;
			}
		}

		processing = true;

		const res = await getData('/api/rptis/bill', {
			partnerid: partner.id,
			txntype: $txntype,
			refno,
			billtoyear,
			billtoqtr
		});

		error = res.error;
		processing = false;

		if (error) {
			invalid = true;
			if (/unpaid|full/gi.test(error)) {
				error = null;
				mode = 'initial-advance';
				billtoyear = currentYear + 1;
			}
		} else {
			dispatch('submit', res.data);
		}
	};
</script>

<div>
	<Container>
		<Paper>
			<Content style="display: flex; flex-direction: column; padding: 0 10px; max-width: 480px;">
				<Title>{title}</Title>
				<Subtitle>Initial Information</Subtitle>

				{#if mode === 'initial'}
					<p>Please enter a valid Tax Declaration No.</p>
					<TextField
						bind:value={refno}
						bind:invalid
						label="Tax Declaration No."
						fullWidth
						required
						validationMsg={error}
						autoFocus={true}
					/>
				{/if}

				{#if mode === 'initial-advance'}
					<p>
						The associated ledger is fully paid for the current year.
						<br />
						To pay in advance, specify the year and click Next button.
					</p>
					<Spacer />
					<Label bind:value={refno} label="Tax Declaration No." />
					<Spacer />
					<Integer
						bind:value={billtoyear}
						label="Advance Year to Pay"
						validationMsg={error}
						required
						fullWidth
						autoFocus={true}
					/>
				{/if}

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
	</Container>
</div>

<style>
	p {
		margin-bottom: 0.5rem;
	}
</style>

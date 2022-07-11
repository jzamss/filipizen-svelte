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

	let processing = false;
	let invalid = false;
	let refno = '';
	let error = 'Account number is invalid';

	$: valid = refno && refno.trim().length > 0;

	const onCancel = () => {
		dispatch('cancel');
	};

	const loadBill = async () => {
		processing = true;

		const res = await getData('/api/waterworks/bill', {
			partnerid: partner.id,
			txntype: $txntype,
			refno
		});

		error = res.error;
		processing = false;
		console.log('res', res);
		if (!error) {
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

				<p>Please enter a valid Tax Declaration No.</p>
				<TextField
					bind:value={refno}
					bind:invalid
					label="Account No."
					fullWidth
					required
					validationMsg={error}
					autoFocus={true}
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
	</Container>
</div>

<style>
	p {
		margin-bottom: 0.5rem;
	}
</style>

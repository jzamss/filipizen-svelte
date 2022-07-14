<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import TextField from '$lib/ui/TextField.svelte';
	import Error from '$lib/ui/Error.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import { getData } from '$lib/helpers/fetch.js';
	import { numberFormat, isNonEmpty } from '$lib/helpers/helper.js';

	import { contact } from '$lib/stores/bill.js';

	const dispatch = createEventDispatcher();

	export let title;
	export let partner;
	export let bill;

	let processing = false;
	let error = false;
	let visible = false;

	$: if (visible) requestAnimationFrame(() => window.scrollTo(0, 100));

	onMount(() => {
		visible = true;
	});

	let payer = {
		paidby: $contact.paidby,
		paidbyaddress: $contact.paidbyaddress
	};

	let invalid = {
		paidby: false,
		paidbyaddress: false
	};

	$: valid = isNonEmpty(payer.paidby) && isNonEmpty(payer.paidbyaddress);

	const onCancel = () => {
		dispatch('cancel');
	};

	const onSubmit = async () => {
		processing = true;
		const res = await getData('/api/epayment/partneroptions', {
			partnerid: partner.id
		});

		error = res.error;
		processing = false;
		if (!error) {
			dispatch('submit', { payer, payoptions: res.data });
		}
	};
</script>

<Container>
	<Container style="max-width: 450px;">
		<Paper>
			<Content style="display: flex; flex-direction: column; padding: 0 10px;">
				<Title>{title}</Title>
				<Subtitle>Confirm Transaction</Subtitle>
				<Error {error} />
				<p class="confirm">
					Please confirm and fill up name and address of the Payer for your electronic Official
					Receipt. Click Continue to proceed for payment.
				</p>
				<TextField
					bind:value={payer.paidby}
					bind:invalid={invalid.paidby}
					updateInvalid
					label="Paid By"
					required
					autoFocus={true}
					validationMsg="Paid by is required"
				/>
				<TextField
					bind:value={payer.paidbyaddress}
					bind:invalid={invalid.paidbyaddress}
					updateInvalid
					label="Address"
					required
					validationMsg="Address is required"
				/>
				<p class="payment">Payment Details</p>
				{#if $bill && $bill.paymentdetails}
					<p class="payment-detail">{$bill && $bill.paymentdetails}</p>
				{/if}
				<p class="amount">Php {numberFormat($bill.amount)}</p>
				<ActionBar>
					<Button on:click={onCancel} label="Back" />
					<Button
						on:click={onSubmit}
						label="Continue"
						variant="raised"
						disabled={!valid || processing}
						{processing}
					/>
				</ActionBar>
			</Content>
		</Paper>
	</Container>
</Container>

<style>
	.confirm {
		font-size: 0.875rem;
		font-weight: 400;
		margin-bottom: 15px;
		text-align: center;
		opacity: 0.8;
		line-height: 1.25rem;
	}

	.payment {
		margin-top: 10px;
		text-align: center;
		font-weight: 500;
		opacity: 0.8;
	}

	.payment-detail {
		font-size: 0.825rem;
		font-weight: 700;
		opacity: 0.7;
		text-align: center;
		margin: 5px 0;
	}

	.amount {
		text-align: center;
		font-size: 1.5rem;
		font-weight: 800;
		margin-top: 10px;
		padding: 10px 0;
		border: 2px solid #b5b5b5;
		border-radius: 5px;
	}
</style>

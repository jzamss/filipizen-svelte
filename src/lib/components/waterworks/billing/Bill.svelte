<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Error from '$lib/ui/Error.svelte';
	import Panel from '$lib/ui/Panel.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import TextField from '$lib/ui/TextField.svelte';
	import Text from '$lib/ui/Text.svelte';
	import Table from '$lib/ui/Table.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import { currencyFormat } from '$lib/helpers/helper.js';
	import { txntype, payer } from '$lib/stores/bill.js';

	const dispatch = createEventDispatcher();

	export let title;
	export let partner;
	export let bill;

	const ORIGIN = 'filipizen';

	let errorRef = undefined;
	let processing = false;
	let error = false;

	$: refno = $bill.acctno;

	const onCancel = () => {
		dispatch('cancel');
	};

	const confirmPayment = () => {
		dispatch('submit', {
			refno,
			txntype: $txntype,
			origin: ORIGIN,
			orgcode: partner.id,
			paidby: $payer.paidby,
			paidbyaddress: $payer.paidbyaddress,
			billtoyear: $bill.billtoyear,
			billtoqtr: $bill.billtoqtr,
			amount: $bill.amount,
			particulars: `Wateworks Account ${bill.acctno} Bill No. ${bill.billno}`,
			info: { data: $bill }
		});
	};
</script>

<div>
	<Container>
		<Paper>
			<Content style="display: flex; flex-direction: column; padding: 0 10px;">
				<Title>{title}</Title>
				<Subtitle>Billing Information</Subtitle>
				<Error bind:this={errorRef} {error} />
				<Text bind:value={$bill.acctno} label="Account No." />
				<Text bind:value={$bill.acctname} label="Account Name" />
				<Text bind:value={$bill.address.text} label="Address" />
				<Text bind:value={$bill.classificationid} label="Classification" />
				<Text bind:value={$bill.billno} label="Last Bill Period" />
				<Panel row>
					<Text bind:value={$bill.monthname} label="Bill Month" />
					<Text bind:value={$bill.year} label="Bill Year" />
				</Panel>
				<Spacer />
				<Panel row>
					<Text bind:value={$bill.meter.size.title} label="Meter Size" />
					<Text bind:value={$bill.consumption.prev.reading} label="Previous Reading" />
					<Text bind:value={$bill.consumption.reading} label="Current Reading" />
					<Text bind:value={$bill.consumption.volume} label="Consumption" />
				</Panel>
				<Spacer />
				<Table
					title="Bill Details"
					items={$bill.items}
					columns={[
						{
							label: 'Account',
							expr: (item) => item.title
						},
						{ label: 'Remarks', expr: 'remarks' },
						{ label: 'Amount Due', expr: 'amount', type: 'numeric' }
					]}
					totals={[
						{ label: 'TOTAL :', colspan: 2, type: 'numeric', style: 'font-weight: bold;' },
						{ label: currencyFormat($bill.amount), type: 'numeric' }
					]}
				/>
				<ActionBar>
					<Button on:click={onCancel} label="Cancel" />
					<Button
						on:click={confirmPayment}
						label="Confirm Payment"
						variant="raised"
						disabled={$bill.amount === 0 || processing}
						{processing}
					/>
				</ActionBar>
			</Content>
		</Paper>
	</Container>
</div>

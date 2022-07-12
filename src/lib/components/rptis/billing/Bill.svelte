<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import Panel from '$lib/ui/Panel.svelte';
	import Text from '$lib/ui/Text.svelte';
	import Error from '$lib/ui/Error.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import PayOption from '$lib/components/PayOption.svelte';
	import { getData } from '$lib/helpers/fetch.js';
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
	let showPayOption = false;
	let billtoyear = $bill.billtoyear;
	let billtoqtr = $bill.billtoqtr;
	const maxYear = new Date().getFullYear() + 4;

	$: showOwnerInfo = true;
	$: refno = $bill.tdno;
	$: billamount = currencyFormat($bill.amount);

	const onCancel = () => {
		dispatch('cancel');
	};

	const confirmPayment = () => {
		dispatch('submit', {
			refno,
			txntype: $txntype,
			origin: ORIGIN,
			orgcode: partner.id,
			billtoyear,
			billtoqtr,
			paidby: $payer.paidby,
			paidbyaddress: $payer.paidbyaddress,
			amount: $bill.amount,
			particulars: `Real Property Tax TD No. ${$bill.tdno} Payment for: ${$bill.billperiod}`,
			items: $bill.items,
			info: { data: $bill }
		});
	};

	const recalcBill = async (evt) => {
		processing = true;
		const res = await getData('/api/rptis/bill', {
			partnerid: partner.id,
			txntype,
			refno,
			billtoyear: evt.detail.billtoyear,
			billtoqtr: evt.detail.billtoqtr
		});

		error = res.error;
		if (error) {
			errorRef.focus();
		} else {
			bill.set(res.data);
		}
		processing = false;
		showPayOption = false;
	};
</script>

<div>
	<Container>
		<Paper>
			<Content style="display: flex; flex-direction: column; margin: 0px 10px; width: 350px;">
				<Title>{title}</Title>
				<Subtitle>Billing Information</Subtitle>
				<Error bind:this={errorRef} {error} />
				<Panel row>
					<Text bind:value={$bill.billno} label="Bill No." />
					<Text bind:value={$bill.billdate} label="Bill Date" />
				</Panel>
				<Panel row>
					<Text bind:value={$bill.tdno} label="TD No." />
					<Text bind:value={$bill.fullpin} label="PIN" />
				</Panel>
				{#if showOwnerInfo}
					<Text bind:value={$bill.taxpayer.name} label="Property Owner" />
					<Text bind:value={$bill.taxpayer.address} label="Address" />
				{/if}
				<Text bind:value={$bill.billperiod} label="Billing Period" />
				<Text bind:value={billamount} label="Amount Due" />
				<div style="margin-top: 10px;">
					<Button
						on:click={() => (showPayOption = true)}
						variant="outlined"
						label="Pay Option"
						style="font-size: 0.625rem;"
						disabled={processing}
					/>
				</div>
				<ActionBar>
					<Button on:click={onCancel} label="Cancel" />
					<Button
						on:click={confirmPayment}
						label="Confirm Payment"
						variant="raised"
						disabled={processing}
						{processing}
					/>
				</ActionBar>
			</Content>
		</Paper>
	</Container>
	<PayOption
		open={showPayOption}
		fromYear={$bill.fromyear || billtoyear}
		fromQtr={$bill.fromqtr}
		toYear={maxYear}
		on:cancel={() => (showPayOption = false)}
		on:submit={recalcBill}
	/>
</div>

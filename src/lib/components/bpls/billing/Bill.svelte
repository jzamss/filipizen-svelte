<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import { Cell } from '@smui/data-table';
	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Table from '$lib/ui/Table.svelte';
	import Error from '$lib/ui/Error.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import PayOption from '$lib/components/PayOption.svelte';
	import { getData } from '$lib/helpers/fetch.js';
	import { currencyFormat } from '$lib/helpers/helper.js';

	const dispatch = createEventDispatcher();

	export let title;
	export let partner;
	export let bill;

	let errorRef = undefined;
	let processing = false;
	let error = false;
	let showPayOption = false;
	let billedQtr = 4;
	let quarters = {
		1: '1st',
		2: '2nd',
		3: '3rd',
		4: '4th'
	};

	$: showOwnerInfo = true;
	$: refno = $bill.appno;
	$: billedPeriod = `${quarters[billedQtr]} Quarter`;

	const onCancel = () => {
		dispatch('cancel');
	};

	const onSubmit = () => {
		dispatch('submit');
	};

	const recalcBill = async (evt) => {
		processing = true;
		billedQtr = evt.detail.billtoqtr;

		const res = await getData('/api/bpls/bill', {
			partnerid: partner.id,
			txntype: 'bpls',
			refno: refno,
			qtr: evt.detail.billtoqtr
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
			<Content style="display: flex; flex-direction: column; padding: 0 10px;">
				<Title>{title}</Title>
				<Subtitle>Billing Information</Subtitle>
				<Error bind:this={errorRef} {error} />
				<Label bind:value={$bill.appno} label="Application No." />
				<Label bind:value={$bill.apptype} label="Application Type" />
				<Label bind:value={$bill.appdate} label="Date Filed" />
				<Label bind:value={$bill.bin} label="BIN" />
				<Label bind:value={$bill.tradename} label="Trade Name" />
				<Label bind:value={$bill.ownername} label="Owner Name" visibleWhen={showOwnerInfo} />
				<Label bind:value={$bill.address} label="Business Address" visibleWhen={showOwnerInfo} />
				<Label bind:value={billedPeriod} label="Billed Quarter" />
				<div style="margin-top: 20px; margin-bottom: 5px;">
					<Button
						on:click={() => (showPayOption = true)}
						variant="outlined"
						label="Pay Option"
						style="font-size: 0.625rem;"
						disabled={processing}
					/>
				</div>
				<Table
					title="Business Billing"
					items={$bill.items}
					columns={[
						{
							label: 'Particulars',
							expr: (item) => (item.lobname ? `${item.lobname} - ` : ' ') + `${item.account}`
						},
						{ label: 'Amount', expr: 'amount', type: 'numeric' },
						{ label: 'Surcharge', expr: 'surcharge', type: 'numeric' },
						{ label: 'Interest', expr: 'interest', type: 'numeric' },
						{ label: 'Total', expr: 'total', type: 'numeric' }
					]}
					totals={[
						{ label: 'Bill Amount :', colspan: 4, type: 'numeric', style: 'font-weight: bold;' },
						{ label: currencyFormat($bill.amount), type: 'numeric' }
					]}
				>
					<div slot="total">
						<Cell colspan={4} style="text-align: right; font-weight: bold;">TOTAL:</Cell>
						<Cell>1000</Cell>
					</div>
				</Table>

				<ActionBar>
					<Button on:click={onCancel} label="Cancel" />
					<Button
						on:click={onSubmit}
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
		on:cancel={() => (showPayOption = false)}
		on:submit={recalcBill}
	/>
</div>

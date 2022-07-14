<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Table from '$lib/ui/Table.svelte';
	import Error from '$lib/ui/Error.svelte';
	import Text from '$lib/ui/Text.svelte';
	import Panel from '$lib/ui/Panel.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';

	import { page } from '$app/stores';
	import partners from '$lib/stores/partners.js';
	import bill, { origin, txntype, contact } from '$lib/stores/bill.js';

	import { getData } from '$lib/helpers/fetch.js';
	import { currencyFormat, formatDate, numberFormat } from '$lib/helpers/helper.js';

	const dispatch = createEventDispatcher();

	export let title;
	export let partner;
	export let refno;

	const { groupname, partnername } = $page.params;

	let processing = false;
	let loading = true;
	let error = null;
	let billdate = null;
	let expirydate = null;

	$: if ($bill.txndate) {
		billdate = formatDate($bill.txndate);
		expirydate = formatDate($bill.expirydate);
	}

	const onCancel = () => {
		dispatch('cancel');
	};

	const confirmPayment = () => {
		contact.set({
			...$contact,
			paidby: $bill.paidby,
			paidbyaddress: $bill.paidbyaddress,
			email: $bill.email
		});

		dispatch('submit', {
			refno,
			txntype: $txntype,
			txntypename: 'Payment Order',
			origin: $origin,
			orgcode: partner.id,
			info: { data: $bill },
			paidby: $bill.paidby,
			paidbyaddress: $bill.paidbyaddress,
			amount: $bill.amount,
			particulars: `Payment for PO No. ${refno}`
		});
	};

	const loadPo = async (partner) => {
		const res = await getData('/api/po/bill', {
			partnerid: partner.id,
			refno,
			checksum: $page.url.searchParams.get('c')
		});

		if (res.error) throw res.error;
		bill.set(res.data);
	};

	onMount(async () => {
		try {
			loading = true;
			await partners.load();
			partner = partners.findByNames({ groupname, partnername });
			await loadPo(partner);
			loading = false;
		} catch (err) {
			error = err;
			loading = false;
		}
	});
</script>

{#if !loading}
	<div>
		<Container>
			<Paper>
				<Content style="display: flex; flex-direction: column; padding: 0 10px;">
					<h1 class="title">{title}</h1>
					<Subtitle>Order Information</Subtitle>
					<Error {error} />
					{#if loading && error}
						<Button on:click={onCancel} label="Cancel Transaction" />
					{/if}

					{#if !error && !loading}
						<Text bind:value={$bill.objid} label="PO No." />
						<Panel row>
							<Text bind:value={billdate} label="PO Date" />
							<Text bind:value={expirydate} label="Expiry Date" />
						</Panel>
						<Text bind:value={$bill.remarks} label="Particulars" />
						<Spacer />
						<div class="bill">
							<h2>Billing Information:</h2>
							{#each $bill.items as item}
								<Label value={numberFormat(item.amount)} label={item.item.title} spaceBetween />
							{/each}
							<Spacer />
							<Label value={currencyFormat($bill.amount)} label="TOTAL: " spaceBetween />
						</div>

						<div class="table">
							<Table
								title="Billing Information"
								items={$bill.items}
								columns={[
									{
										label: 'Particulars',
										expr: (item) => item.item.title
									},
									{ label: 'Amount', expr: 'amount', type: 'numeric' },
									{ label: 'Surcharge', expr: () => 0, type: 'numeric' },
									{ label: 'Interest', expr: () => 0, type: 'numeric' },
									{ label: 'Total', expr: 'amount', type: 'numeric' }
								]}
								totals={[
									{
										label: 'Amount Due :',
										colspan: 4,
										type: 'numeric',
										style: 'font-weight: bold;'
									},
									{ label: currencyFormat($bill.amount), type: 'numeric' }
								]}
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
					{/if}
				</Content>
			</Paper>
		</Container>
	</div>
{/if}

<style>
	.title {
		font-size: 1.5rem;
	}

	.bill {
		display: block;
	}

	.table {
		display: none;
	}

	@media (min-width: 480px) {
		.title {
			font-size: 1.875rem;
		}

		.bill {
			display: none;
		}

		.table {
			display: block;
		}
	}
</style>

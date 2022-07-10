<script>
	import { createEventDispatcher } from 'svelte';
	import bill from '$lib/stores/bill.js';
	import OnlinePaymentOption from './OnlinePaymentOption.svelte';
	import { getWebFee } from '$lib/helpers/epayment.js';
	import { payoption } from '$lib/stores/bill.js';

	const dispatch = createEventDispatcher();

	const DBP_FEE = 0.0;
	const RAMESES_FEE = getWebFee($bill.amount, $payoption.webfee);

	let payType = 'wallet';
	let txnFee = DBP_FEE + RAMESES_FEE;
	let webFee = RAMESES_FEE;

	$: total = $bill.amount + txnFee;

	const onCancel = () => {
		dispatch('cancel');
	};

	const onPayment = () => {
		dispatch('payment', {
			type: payType,
			webfee: webFee,
			fee: txnFee,
			total: total
		});
	};

	const payTypes = [{ type: 'wallet', caption: 'Credit/Debit Card' }];
</script>

<OnlinePaymentOption
	bind:value={payType}
	on:cancel={onCancel}
	on:payment={onPayment}
	imageSrc="/public/assets/dbp.png"
	amount={$bill.amount}
	{payTypes}
	{txnFee}
	{total}
/>

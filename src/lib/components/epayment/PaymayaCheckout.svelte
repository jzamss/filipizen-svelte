<script>
	import { createEventDispatcher } from 'svelte';
	import bill from '$lib/stores/bill.js';
	import OnlinePaymentOption from './OnlinePaymentOption.svelte';

	const dispatch = createEventDispatcher();

	const MDR = 0.015;
	const WALLET_FEE = 10.0;
	const RAMESES_FEE = 20.0;

	let payType = 'wallet';
	let txnFee = 0;
	let webFee = RAMESES_FEE;

	$: if (payType === 'wallet') {
		txnFee = WALLET_FEE + RAMESES_FEE;
	} else {
		const cardFee = Math.round(($bill.amount / (1 - MDR) - $bill.amount) * 100) / 100;
		txnFee = cardFee + RAMESES_FEE;
	}

	$: total = $bill.amount + txnFee;

	const onCancel = () => {
		dispatch('cancel');
	};

	const onPayment = (evt) => {
		const payType = evt.detail;
		dispatch('payment', {
			type: payType,
			webfee: webFee,
			txnfee: txnFee
		});
	};

	const payTypes = [
		{ type: 'wallet', caption: 'Wallet' },
		{ type: 'card', caption: 'Credit/Debit Card' }
	];
</script>

<OnlinePaymentOption
	bind:value={payType}
	on:cancel={onCancel}
	on:payment={onPayment}
	imageSrc="/assets/paymaya.png"
	amount={$bill.amount}
	{payTypes}
	{txnFee}
	{total}
/>

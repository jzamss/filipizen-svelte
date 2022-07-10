<script>
	import { createEventDispatcher } from 'svelte';
	import bill from '$lib/stores/bill.js';
	import OnlinePaymentOption from './OnlinePaymentOption.svelte';

	const dispatch = createEventDispatcher();

	const GCASH_FEE = 10.0;
	const RAMESES_FEE = 20.0;

	let payType = 'wallet';
	let txnFee = GCASH_FEE + RAMESES_FEE;
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

	const payTypes = [{ type: 'wallet', caption: 'Wallet' }];
</script>

<OnlinePaymentOption
	bind:value={payType}
	on:cancel={onCancel}
	on:payment={onPayment}
	imageSrc="/public/assets/gcash.png"
	amount={$bill.amount}
	{payTypes}
	{txnFee}
	{total}
/>

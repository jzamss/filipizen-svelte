<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import bill, { order, txntype, contact, payer, payoption, payoptions } from '$lib/stores/bill.js';
	import partners from '$lib/stores/partners.js';

	import ContactVerification from '$lib/components/contactverification/index.svelte';
	import CheckoutOrder from '$lib/components/epayment/CheckoutOrder.svelte';
	import SelectPaymentPartner from '$lib/components/epayment/SelectPaymentPartner.svelte';
	import OnlinePayment from '$lib/components/epayment/OnlinePayment.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Initial from './Initial.svelte';
	import Bill from './Bill.svelte';

	const { groupname, partnername, refno } = $page.params;

	let title = 'Online Payment Order';
	let partner = {};

	txntype.set('po');

	let mode = refno ? 'bill' : 'verify-contact';
	let timeoutId = undefined;
	let showOnlinePayment = false;

	onMount(async () => {
		await partners.load();
		partner = partners.findByNames({ groupname, partnername });
	});

	const checkoutOrder = (evt) => {
		order.set(evt.detail);
		mode = 'checkout';
	};

	const confirmCheckout = (evt) => {
		$payer = evt.detail.payer;
		$payoptions = evt.detail.payoptions;
		mode = 'payoptions';
	};

	const selectPaymentPartner = (evt) => {
		$payoption = evt.detail;
		mode = 'payment';
		timeoutId = setTimeout(() => {
			showOnlinePayment = true;
			clearTimeout(timeoutId);
		}, 600);
	};
</script>

<svelte:head>
	<title>Filipizen - {title}</title>
</svelte:head>

{#if mode === 'verify-contact'}
	<ContactVerification
		{title}
		{partner}
		on:cancel={() => goto(`/partners/${groupname}_${partnername}`)}
		on:submit={(evt) => {
			contact.set(evt.detail);
			mode = 'initial';
		}}
	/>
{/if}

{#if mode === 'initial'}
	<Initial
		{partner}
		{title}
		on:cancel={() => goto(`/partners/${groupname}_${partnername}`)}
		on:submit={displayBill}
	/>
{/if}

{#if mode === 'bill'}
	<Bill
		{title}
		{partner}
		{refno}
		on:cancel={() => goto(`/partners/${groupname}_${partnername}`)}
		on:submit={checkoutOrder}
	/>
{/if}

{#if mode === 'checkout'}
	<CheckoutOrder
		{title}
		{partner}
		{bill}
		on:cancel={() => (mode = 'bill')}
		on:submit={confirmCheckout}
	/>
{/if}

{#if mode === 'payoptions'}
	<SelectPaymentPartner
		{partner}
		{bill}
		on:cancel={() => (mode = 'bill')}
		on:select={selectPaymentPartner}
	/>
{/if}

{#if mode === 'payment' && showOnlinePayment}
	<OnlinePayment
		{partner}
		on:cancel={() => {
			mode = 'payoptions';
			showOnlinePayment = false;
		}}
	/>
{/if}

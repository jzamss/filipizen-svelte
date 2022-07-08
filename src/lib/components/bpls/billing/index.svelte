<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import bill, { order, contact, payer, payoption, payoptions } from '$lib/stores/bill.js';
	import partners from '$lib/stores/partners.js';

	import ContactVerification from '$lib/components/contactverification/index.svelte';
	import CheckoutOrder from '$lib/components/epayment/CheckoutOrder.svelte';
	import SelectPaymentPartner from '$lib/components/epayment/SelectPaymentPartner.svelte';
	import OnlinePayment from '$lib/components/epayment/OnlinePayment.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Initial from './Initial.svelte';
	import Bill from './Bill.svelte';

	const { groupname, partnername } = $page.params;

	let title = 'Business Online Billing';
	let partner = {};

	//TODO: reset
	// let mode = 'verify-contact';
	let mode = 'payment';

	onMount(async () => {
		await partners.load();
		partner = partners.findByNames({ groupname, partnername });
	});

	const displayBill = (evt) => {
		bill.set(evt.detail);
		mode = 'bill';
	};

	const checkoutOrder = (evt) => {
		order.set(evt.detail);
		console.log('order', $order);
		// mode = 'checkout';
	};

	const confirmCheckout = (evt) => {
		$payer = evt.detail.payer;
		$payoptions = evt.detail.payoptions;
		mode = 'payoptions';
	};

	const selectPaymentPartner = (evt) => {
		$payoption = evt.detail;
		console.log('payoption', $payoption);
		mode = 'payment';
	};
</script>

<svelte:head>
	<title>Filipizen - {title}</title>
</svelte:head>

{#if mode === 'verify-contact'}
	<Container>
		<ContactVerification
			{title}
			{partner}
			on:cancel={() => goto(`/partners/${groupname}_${partnername}`)}
			on:submit={(evt) => {
				contact.set(evt.detail);
				mode = 'initial';
			}}
		/>
	</Container>
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
		{bill}
		on:cancel={() => goto(`/partners/${groupname}_${partnername}`)}
		on:submit={checkoutOrder}
	/>
{/if}

{#if mode === 'checkout'}
	<CheckoutOrder
		{title}
		{partner}
		{bill}
		on:cancel={() => mode === 'bill'}
		on:submit={confirmCheckout}
	/>
{/if}

{#if mode === 'payoptions'}
	<SelectPaymentPartner
		{partner}
		{bill}
		on:cancel={() => mode === 'bill'}
		on:select={selectPaymentPartner}
	/>
{/if}

{#if mode === 'payment'}
	<OnlinePayment {partner} on:cancel={() => mode === 'bill'} on:select={selectPaymentPartner} />
{/if}

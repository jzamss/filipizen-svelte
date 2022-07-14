<script>
	import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import partners from '$lib/stores/partners.js';
	import bill, { order, contact, payer, payoption, payoptions, txntype } from '$lib/stores/bill.js';
	import { routes, guestinfo } from '$lib/stores/terminalpass.js';

	import ContactVerification from '$lib/components/contactverification/index.svelte';
	import CheckoutOrder from '$lib/components/epayment/CheckoutOrder.svelte';
	import SelectPaymentPartner from '$lib/components/epayment/SelectPaymentPartner.svelte';
	import OnlinePayment from '$lib/components/epayment/OnlinePayment.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Disclaimer from './Disclaimer.svelte';
	import TravelItinerary from './TravelItinerary.svelte';
	import GuestProfile from './GuestProfile.svelte';

	const { groupname, partnername } = $page.params;

	let title = 'Online Terminal Pass Issuance';
	let partner = {};

	txntype.set('ticketing');

	let mode = 'term-condition';
	let timeoutId = undefined;
	let showOnlinePayment = false;

	onMount(async () => {
		await partners.load();
		partner = partners.findByNames({ groupname, partnername });
	});

	const checkoutOrder = (evt) => {
		bill.set(evt.detail.bill);
		guestinfo.set(evt.detail.guestInfo);
		order.set(evt.detail.order);
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

{#if mode === 'term-condition'}
	<Container>
		<Disclaimer
			{title}
			on:cancel={() => goto(`/partners/${groupname}_${partnername}`)}
			on:submit={(evt) => (mode = 'verify-contact')}
		/>
	</Container>
{/if}

{#if mode === 'verify-contact'}
	<Container>
		<ContactVerification
			{title}
			{partner}
			requireName={true}
			on:cancel={() => goto(`/partners/${groupname}_${partnername}`)}
			on:submit={(evt) => {
				contact.set(evt.detail);
				mode = 'travel-itinerary';
			}}
		/>
	</Container>
{/if}

{#if mode === 'travel-itinerary' && partner.id}
	<TravelItinerary
		{partner}
		{title}
		on:cancel={() => goto(`/partners/${groupname}_${partnername}`)}
		on:submit={() => (mode = 'guest-profile')}
	/>
{/if}

{#if mode === 'guest-profile'}
	<GuestProfile
		{partner}
		{title}
		on:cancel={() => (mode = 'travel-itinerary')}
		on:submit={checkoutOrder}
	/>
{/if}

{#if mode === 'checkout'}
	<CheckoutOrder
		{title}
		{partner}
		{bill}
		on:cancel={() => (mode = 'guest-profile')}
		on:submit={confirmCheckout}
	/>
{/if}

{#if mode === 'payoptions'}
	<SelectPaymentPartner
		{partner}
		{bill}
		on:cancel={() => (mode = 'guest-profile')}
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

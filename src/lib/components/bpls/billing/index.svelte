<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import bill, { contact } from '$lib/stores/bill.js';
	import partners from '$lib/stores/partners.js';

	import Container from '$lib/ui/Container.svelte';
	import ContactVerification from '$lib/components/contactverification/index.svelte';
	import Initial from './Initial.svelte';
	import Bill from './Bill.svelte';

	const { groupname, partnername } = $page.params;

	let title = 'Business Online Billing';
	let partner = {};

	let mode = 'verify-contact';

	onMount(async () => {
		await partners.load();
		partner = partners.findByNames({ groupname, partnername });
	});

	const displayBill = (evt) => {
		bill.set(evt.detail);
		mode = 'bill';
	};

	const confirmPayment = (evt) => {
		mode = 'checkout';
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
		on:submit={confirmPayment}
	/>
{/if}

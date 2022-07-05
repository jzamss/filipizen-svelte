<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { email } from '$lib/stores/bill.js';
	import partners from '$lib/stores/partners.js';

	import Container from '$lib/ui/Container.svelte';
	import ContactVerification from '$lib/components/contactverification/index.svelte';
	import Initial from './Initial.svelte';

	const { groupname, partnername } = $page.params;
	let partner = {};

	onMount(async () => {
		await partners.load();
		partner = partners.findByNames({ groupname, partnername });
	});

	let title = 'Business Online Billing';
	let mode = 'verify-email';
</script>

<Container>
	{#if mode === 'verify-email'}
		<ContactVerification
			{title}
			{partner}
			on:cancel={() => goto(`/partners/${groupname}_${partnername}`)}
			on:submit={(evt) => {
				email.set(evt.detail);
				mode = 'initial';
			}}
		/>
	{/if}

	{#if mode === 'initial'}
		<Initial {title} on:cancel={() => goto(`/partners/${groupname}_${partnername}`)} />
	{/if}
</Container>

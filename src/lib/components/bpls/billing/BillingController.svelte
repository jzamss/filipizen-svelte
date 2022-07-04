<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import bill, { email } from '$lib/stores/bill.js';
	import Container from '$lib/ui/Container.svelte';
	import EmailVerification from '$lib/components/emailverification/EmailVerification.svelte';
	import Initial from './Initial.svelte';

	const { groupname, partnername } = $page.params;

	let title = 'Business Online Billing';
	let mode = 'verify-email';
</script>

<Container>
	{#if mode === 'verify-email'}
		<EmailVerification
			{title}
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

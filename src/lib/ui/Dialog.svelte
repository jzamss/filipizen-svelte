<script>
	import { createEventDispatcher } from 'svelte';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	export let open = false;
	export let title = '';
	export let showActions = true;

	const noHandler = () => {
		dispatch('cancel');
	};

	const yesHandler = () => {
		dispatch('ok');
	};
</script>

<Dialog bind:open aria-labelledby={title} scrimClickAction="" escapeKeyAction="">
	<Title>{title}</Title>
	<Content><slot /></Content>
	{#if showActions}
		<Actions>
			<Button on:click={noHandler} label="No" />
			<Button on:click={yesHandler} label="Yes" />
		</Actions>
	{/if}
</Dialog>

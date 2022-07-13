<script>
	import { createEventDispatcher } from 'svelte';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	export let open = false;
	export let title = '';
	export let showActions = true;
	export let showCancel = true;

	const onCancel = () => {
		dispatch('cancel');
	};

	const onAccept = () => {
		dispatch('accept');
	};
</script>

<Dialog bind:open aria-labelledby={title} scrimClickAction="" escapeKeyAction="">
	<Title>{title}</Title>
	<Content><slot /></Content>
	{#if showActions}
		<Actions>
			{#if showCancel}
				<Button on:click={onCancel} label="Cancel" />
			{/if}
			<Button on:click={onAccept} label="OK" variant="raised" />
		</Actions>
	{/if}
</Dialog>

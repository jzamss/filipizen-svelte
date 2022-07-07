<script>
	import { createEventDispatcher } from 'svelte';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	export let open = false;
	export let title = '';
	export let type = 'alert';
	export let acceptCaption = 'OK';
	export let cancelCaption = 'No';
	export let processing = false;

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
	<Actions>
		{#if type !== 'alert'}
			<Button on:click={onCancel} label={cancelCaption} disabled={processing} />
		{/if}
		<Button on:click={onAccept} label={acceptCaption} disabled={processing} variant="outlined" />
	</Actions>
</Dialog>

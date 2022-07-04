<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '@smui/button';
	import TextField from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';

	const dispatch = createEventDispatcher();

	export let title;

	let refno = '';

	$: valid = refno && refno.trim().length > 0;
	$: error = 'BIN or application number is required';

	const backHandler = () => {
		dispatch('cancel');
	};

	const nextHandler = () => {
		dispatch('submit', { refno });
	};
</script>

<div>
	<Paper>
		<Content style="display: flex; flex-direction: column;">
			<Title>{title}</Title>
			<Subtitle>Initial Information</Subtitle>

			<p>Enter a valid Business Identification Number (BIN) or Application No.</p>
			<TextField bind:value={refno} label="BIN or Application No." fullWidth required>
				<HelperText validationMsg slot="helper">{error}</HelperText>
			</TextField>
			<ActionBar>
				<Button on:click={backHandler}>Cancel</Button>
				<Button on:click={nextHandler} variant="raised" disabled={!valid}>Next</Button>
			</ActionBar>
		</Content>
	</Paper>
</div>

<style>
	div {
		max-width: 480px;
	}

	p {
		margin-bottom: 0.5rem;
	}
</style>

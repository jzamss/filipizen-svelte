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

	export let title = '';

	let emailAddress = '';
	let mobileNo = '';

	$: valid = emailAddress && emailAddress.trim().length > 0;

	const backHandler = () => {
		dispatch('cancel');
	};

	const nextHandler = () => {
		dispatch('submit', { emailAddress, mobileNo });
	};
</script>

<div>
	<Paper>
		<Content style="display: flex; flex-direction: column;">
			<Title>{title}</Title>
			<Subtitle>Email Verification</Subtitle>

			<p>
				A validation key will be sent to your email. Please make sure your email is valid and you
				have access to it.
			</p>
			<TextField bind:value={emailAddress} type="email" label="Email Address" fullWidth required>
				<HelperText validationMsg slot="helper">Not a valid email address</HelperText>
			</TextField>
			<TextField bind:value={mobileNo} type="number" label="Mobile No.">
				<HelperText validationMsg slot="helper">Not a valid mobile no.</HelperText>
			</TextField>
			<ActionBar>
				<Button on:click={backHandler}>Back</Button>
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

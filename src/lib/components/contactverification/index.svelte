<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import Button from '$lib/ui/Button.svelte';
	import TextField from '$lib/ui/TextField.svelte';
	import Dialog from '$lib/ui/Dialog.svelte';
	import { isLength, isEmpty, isNonEmpty } from '$lib/helpers/helper.js';
	import { postData } from '$lib/helpers/fetch.js';
	import { mode, processing } from '$lib/stores/formstatus.js';

	export let title = '';
	export let partner = {};

	const dispatch = createEventDispatcher();

	mode.set('initial');

	let contact = { email: '', mobileno: '' };
	let enteredOtp = '';
	let otp = '';
	let isResendOtp = false;

	let invalidEmail = false;
	let invalidOtp = false;

	$: validContact = isNonEmpty(contact.email);
	$: validOtp = isNonEmpty(enteredOtp) && isLength(enteredOtp, 6);

	const backHandler = () => {
		dispatch('cancel');
	};

	const generateOtp = async () => {
		if (invalidEmail) return;
		processing.set(true);
		const data = await postData('/api/email/generateotp', { contact, partner });
		otp = data.otp;
		processing.set(false);
		mode.set('verify-otp');
	};

	const resendOtp = async () => {
		processing.set(true);
		const data = await postData('/api/email/generateotp', { contact, partner });
		otp = data.otp;
		processing.set(false);
	};

	const verifyOtp = () => {
		if (enteredOtp === otp) {
			invalidOtp = false;
			dispatch('submit', contact);
		} else {
			invalidOtp = true;
		}
	};
</script>

<div>
	<Paper>
		<Content style="display: flex; flex-direction: column;">
			<Title>{title}</Title>
			<Subtitle>Email Verification</Subtitle>

			{#if $mode === 'initial'}
				<p>
					A validation key will be sent to your email. Please make sure your email is valid and you
					have access to it.
				</p>
				<TextField
					bind:value={contact.email}
					bind:invalid={invalidEmail}
					updateInvalid
					type="email"
					label="Email Address"
					fullWidth
					required
					autoFocus={true}
					validationMsg="Not a valid email address"
				/>
				<TextField
					bind:value={contact.mobileno}
					type="number"
					label="Mobile No."
					validationMsg="Not a valid mobile no."
				/>
				<ActionBar>
					<Button on:click={backHandler} label="Back" />
					<Button
						on:click={generateOtp}
						label="Next"
						variant="raised"
						processing={$processing}
						disabled={!validContact || $processing}
					/>
				</ActionBar>
			{/if}

			{#if $mode === 'verify-otp'}
				<p>
					Please check your email inbox or spam for the sent 6-digit validation key. If you have not
					received any email, please click resend code.
				</p>
				<TextField
					bind:value={enteredOtp}
					bind:invalid={invalidOtp}
					on:blur={() => (invalidOtp = isEmpty(enteredOtp))}
					label="OTP Code"
					required
					autoFocus={true}
					validationMsg="Invalid OTP Code"
				/>
				<div style="display: flex; justify-content: flex-end; ">
					<Button
						on:click={() => (isResendOtp = true)}
						label="Resend OTP"
						style="color: black; opacity: 0.6; font-size: 0.675rem;"
					/>
				</div>
				<ActionBar>
					<Button on:click={() => mode.set('initial')} label="Back" />
					<Button on:click={verifyOtp} label="Next" variant="raised" disabled={!validOtp} />
				</ActionBar>
			{/if}
		</Content>
	</Paper>
	<Dialog
		open={isResendOtp}
		title="Email Verification"
		on:cancel={() => (isResendOtp = false)}
		on:ok={resendOtp}>Resend OTP?</Dialog
	>
</div>

<style>
	div {
		max-width: 480px;
	}

	p {
		margin-bottom: 0.5rem;
	}
</style>

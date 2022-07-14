<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import Button from '$lib/ui/Button.svelte';
	import TextField from '$lib/ui/TextField.svelte';
	import Error from '$lib/ui/Error.svelte';
	import Dialog from '$lib/ui/Dialog.svelte';
	import Phone from '$lib/ui/Phone.svelte';

	import { postData } from '$lib/helpers/fetch.js';
	import { isLength, isEmpty, isNonEmpty } from '$lib/helpers/helper.js';

	const dispatch = createEventDispatcher();

	export let title = '';
	export let partner = {};
	export let requireName = false;

	let mode = 'initial';
	let processing = false;
	let error = false;

	let contact = { name: '', address: '', email: '', mobileno: '' };
	let enteredOtp = '';
	let otp = '';
	let isResendOtp = false;

	let invalidName = false;
	let invalidAddress = false;
	let invalidEmail = false;
	let invalidOtp = false;
	let validInfo = false;

	$: if (requireName) {
		validInfo =
			isNonEmpty(contact.email) && isNonEmpty(contact.name) && isNonEmpty(contact.address);
	} else {
		validInfo = isNonEmpty(contact.email);
	}

	$: validOtp = isNonEmpty(enteredOtp) && isLength(enteredOtp, 6);

	const backHandler = () => {
		dispatch('cancel');
	};

	const generateOtp = async () => {
		processing = true;
		const res = await postData('/api/email/generateotp', { contact, partner });
		error = res.error;
		if (!error) {
			otp = res.data.otp;
		}
		processing = false;
	};

	const submitContact = async () => {
		if (invalidEmail) return;
		await generateOtp();
		if (!error) {
			mode = 'verify-otp';
		}
	};

	const resendOtp = () => {
		generateOtp();
		isResendOtp = false;
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
		<Content style="display: flex; flex-direction: column; padding: 0 10px;">
			<Title>{title}</Title>
			<Subtitle>Email Verification</Subtitle>
			{#if error && !processing}
				<Error {error} />
			{/if}
			{#if mode === 'initial'}
				<p>
					A validation key will be sent to your email. Please make sure your email is valid and you
					have access to it.
				</p>
				{#if requireName}
					<TextField
						bind:value={contact.name}
						bind:invalid={invalidName}
						updateInvalid
						label="Full Name"
						fullWidth
						required
						autoFocus={requireName}
						validationMsg="Full name must be specified"
					/>
					<TextField
						bind:value={contact.address}
						bind:invalid={invalidAddress}
						updateInvalid
						label="Address"
						fullWidth
						required
						validationMsg="Address must be specified"
					/>
				{/if}
				<TextField
					bind:value={contact.email}
					bind:invalid={invalidEmail}
					updateInvalid
					type="email"
					label="Email Address"
					fullWidth
					required
					autoFocus={!requireName}
					validationMsg="Not a valid email address"
				/>
				<Phone bind:value={contact.mobileno} label="Mobile No." />
				<ActionBar>
					<Button on:click={backHandler} label="Back" />
					<Button
						on:click={submitContact}
						label="Next"
						variant="raised"
						{processing}
						disabled={!validInfo || processing}
					/>
				</ActionBar>
			{/if}

			{#if mode === 'verify-otp'}
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
					<Button on:click={() => (mode = 'initial')} label="Back" />
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

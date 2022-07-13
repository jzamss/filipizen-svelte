<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Panel from '$lib/ui/Panel.svelte';
	import Checkbox from '$lib/ui/Checkbox.svelte';
	import Button from '$lib/ui/Button.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';

	import TermsAndConditions from './TermsAndConditions.svelte';
	import PrivacyStatement from './PrivacyStatement.svelte';

	const dispatch = createEventDispatcher();

	export let title;

	let agree = false;
	let showPrivacy = false;
	let showTermsAndConditions = false;

	const onCancel = () => {
		dispatch('cancel');
	};

	const onSubmit = () => {
		if (!agree) {
			showMessage = true;
		} else {
			dispatch('submit');
		}
	};
</script>

<div>
	<Container>
		<Paper>
			<Content style="display: flex; flex-direction: column; padding: 0 10px; max-width: 450px;">
				<Title>{title}</Title>
				<Subtitle>Caticlan and Cagban Passenger Terminals</Subtitle>
				<Panel border>
					<p class="fc-black-500">
						Thank you for your interest in availing this service application.
					</p>
					<p class="fc-black-500">
						By using this service, you agree to these
						<span on:click={() => (showTermsAndConditions = true)}>terms and conditions</span>.
					</p>
					<p class="fc-black-500">
						We value your privacy. Please read our privacy statement
						<span on:click={() => (showPrivacy = true)}>here</span>.
					</p>
				</Panel>
				<Panel style="display: flex; justify-content: center;">
					<Checkbox
						bind:checked={agree}
						label="I have read and agree with the terms and conditions"
					/>
				</Panel>
				<ActionBar>
					<Button on:click={onCancel} label="Cancel" />
					<Button on:click={onSubmit} label="Next" variant="raised" disabled={!agree} />
				</ActionBar>
			</Content>
		</Paper>
		<TermsAndConditions
			open={showTermsAndConditions}
			on:accept={() => (showTermsAndConditions = false)}
		/>
		<PrivacyStatement open={showPrivacy} on:accept={() => (showPrivacy = false)} />
	</Container>
</div>

<style>
	p {
		margin-bottom: 0.5rem;
	}

	span {
		color: blue;
		cursor: pointer;
		text-decoration: none;
		margin-inline-start: 5;
	}
</style>

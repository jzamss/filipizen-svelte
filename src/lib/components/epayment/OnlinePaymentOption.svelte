<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Container from '$lib/ui/Container.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import Radio from '$lib/ui/Radio.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Button from '$lib/ui/Button.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import { currencyFormat } from '$lib/helpers/helper.js';
	import Panel from '../../ui/Panel.svelte';

	const dispatch = createEventDispatcher();

	export let imageSrc;
	export let payTypes = [];
	export let value;
	export let amount = 0;
	export let txnFee = 0;
	export let total = 0;

	const onCancel = () => {
		dispatch('cancel');
	};

	const onPayment = () => {
		dispatch('payment', value);
	};
</script>

<Container>
	<Paper>
		<Content style="display: flex; flex-direction: column; padding: 0 10px;">
			<Panel center>
				<img src={imageSrc} alt="Partner" />
			</Panel>
			<Spacer />
			<h2>Select Type of Payment</h2>
			<div style="margin-left: 20px;">
				{#each payTypes as payType (payType.type)}
					<Radio bind:group={value} value={payType.type} label={payType.caption} />
				{/each}
			</div>
			<Spacer />
			<Label
				value={currencyFormat(amount)}
				label="Amount"
				labelWidth={300}
				spaceBetween
				valueStyle="font-weight:bold; opacity:0.8;"
			/>
			<Label
				value={currencyFormat(txnFee)}
				label="Payment Partner Service Fee"
				labelWidth={300}
				spaceBetween
				valueStyle="font-weight:bold; opacity:0.8;"
			/>
			<Label
				value={currencyFormat(total)}
				label="Total"
				labelWidth={300}
				spaceBetween
				valueStyle="font-weight:bold; opacity:0.8;"
			/>
			<ActionBar>
				<Button on:click={onCancel} label="Cancel" />
				<Button on:click={onPayment} label="Proceed Payment" variant="raised" />
			</ActionBar>
		</Content>
	</Paper>
</Container>

<style>
	img {
		width: 140px;
	}

	h2 {
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 5px;
	}
</style>

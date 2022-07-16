<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Container from '$lib/ui/Container.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import Radio from '$lib/ui/Radio.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Button from '$lib/ui/Button.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import { numberFormat } from '$lib/helpers/helper.js';
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
			<Spacer height={10} />
			<div class="value-container">
				<span class="fs-xs fw-semibold fc-green-800">Amount</span>
				<p>{`PHP ${numberFormat(amount)}`}</p>
			</div>
			<div class="value-container">
				<span class="fs-xs fw-semibold fc-green-800">Payment Partner Service Fee</span>
				<p>{`PHP ${numberFormat(txnFee)}`}</p>
			</div>
			<div class="value-container">
				<span class="fs-xs fw-semibold fc-green-800">TOTAL</span>
				<p class="total">{`PHP ${numberFormat(total)}`}</p>
			</div>
			<ActionBar>
				<Button on:click={onCancel} label="Cancel" />
				<Button on:click={onPayment} label="Proceed Payment" variant="raised" />
			</ActionBar>
		</Content>
	</Paper>
</Container>

<style>
	img {
		width: 120px;
	}

	h2 {
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 5px;
	}

	.value-container {
		display: block;
	}

	.value-container > p {
		border: 1px solid #009688;
		padding: 2px 10px;
		border-radius: 2px;
		font-weight: 600;
	}

	.total {
		font-size: 1.25rem;
		opacity: 0.8;
	}
</style>

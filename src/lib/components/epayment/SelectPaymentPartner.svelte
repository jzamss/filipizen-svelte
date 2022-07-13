<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Image } from '@smui/image-list';
	import Paper, { Content } from '@smui/paper';
	import Checkbox from '$lib/ui/Checkbox.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import { numberFormat } from '$lib/helpers/helper.js';
	import { order, payer, payoptions } from '$lib/stores/bill.js';

	const dispatch = createEventDispatcher();

	export let partner;
	export let bill;

	let agreed = false;
	let visible = false;

	$: amount = `PHP ${numberFormat($bill.amount)}`;
	$: particulars = $order.particulars || `${$bill.txntypename} Payment`;
	$: if (visible) requestAnimationFrame(() => window.scrollTo(0, 0));

	onMount(() => {
		visible = true;
	});

	const onSelectPayOption = (payoption) => {
		dispatch('select', payoption);
	};
</script>

<div class="container">
	<div class="order-container">
		<Paper>
			<Content style="display: flex; flex-direction: column; padding: 0 10px;">
				<div class="order-title">Your Order</div>
				<Label bind:value={partner.title} label="Agency" />
				<Label bind:value={particulars} label="Particulars" />
				<Label bind:value={$payer.paidby} label="Paid By" />
				<Label bind:value={amount} label="Amount" />
				<Spacer />
				<Checkbox
					bind:checked={agreed}
					label="I acknowledge and agree to the Terms and Conditions of this e-payment facility."
				/>
			</Content>
		</Paper>
	</div>
	{#if agreed}
		<div class="payoptions-container" transition:fade>
			{#each $payoptions as payoption (payoption.objid)}
				<button on:click={() => onSelectPayOption(payoption)}>
					<Image
						src={`/resources/${payoption.paypartnerid.toLowerCase()}.png`}
						alt={payoption.paypartner.name}
					/>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.order-container {
		max-width: 440px;
	}

	.payoptions-container {
		display: flex;
		flex-wrap: wrap;
		margin-top: 5px;
	}

	.order-title {
		font-size: 1.425rem;
		font-weight: 800;
		text-align: center;
		color: green;
		margin-bottom: 15px;
	}

	button {
		width: 100px;
		cursor: pointer;
		margin: 5px;
		border: 1px solid #e5e5e5;
		border-radius: 5px;
	}

	button:hover {
		border: 2px solid #cfcfcf;
	}
</style>

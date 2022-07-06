<script>
	import { createEventDispatcher } from 'svelte';
	import Dialog, { Title, Actions } from '@smui/dialog';

	import Button from '$lib/ui/Button.svelte';
	import { range } from '$lib/helpers/helper.js';

	const dispatch = createEventDispatcher();
	const currentDate = new Date();
	const cy = currentDate.getFullYear();

	export let open = false;
	export let fromQtr = 1;
	export let fromYear = cy;
	export let toYear = cy;
	export let billtoyear = toYear;
	export let billtoqtr = 4;

	let years = [];
	let qtrs = [1, 2, 3, 4];

	$: if (fromYear !== toYear) {
		years = range(fromYear, toYear);
	}

	$: if (billtoyear === fromYear) {
		qtrs = range(fromQtr, 4);
	} else {
		qtrs = range(1, 4);
		billtoqtr = 4;
	}

	$: msg = `Select the ${years.length > 0 ? ' year and ' : ' '} quarter to pay`;

	function onSubmit() {
		dispatch('submit', { billtoyear, billtoqtr });
	}

	function onCancel() {
		dispatch('cancel');
	}
</script>

<Dialog bind:open aria-labelledby="Payment Option" escapeKeyAction="" scrimClickAction="">
	<Title>Payment Option</Title>
	<div class="container">
		<label class="msg">{msg}</label>
		<div class="option-container">
			{#if years.length > 0}
				<div class="row">
					<label class="row-label"> Year to Bill: </label>
					<select bind:value={billtoyear}>
						{#each years as year}
							<option value={year}>{year}</option>
						{/each}
					</select>
				</div>
			{/if}
			<div class="row">
				<label class="row-label"> Quarter to Bill: </label>
				<select bind:value={billtoqtr}>
					{#each qtrs as qtr}
						<option value={qtr}>{qtr}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
	<Actions>
		<Button on:click={onCancel} label="Cancel" />
		<Button on:click={onSubmit} label="Submit" defaultAction />
	</Actions>
</Dialog>

<style>
	.container {
		margin: 5px 10px;
		width: 280px;
	}

	.msg {
		margin-left: 15px;
	}

	.option-container {
		margin: 30px;
	}

	.row {
		display: flex;
		align-items: center;
		margin-top: 10px;
		width: 100%;
	}

	.row-label {
		width: 250px;
	}

	select {
		padding: 10px;
		border: 1px solid #a0a0a0;
		border-radius: 5px;
		text-decoration: none;
		width: 120px;
	}

	select:hover {
		border: 2px solid #7d7d7d;
	}

	option {
		border: 1px solid #a0a0a0;
	}
</style>

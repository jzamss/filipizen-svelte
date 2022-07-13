<script>
	import { page } from '$app/stores';
	import { mdiCheckboxMarkedCircle } from '@mdi/js';
	import { Icon } from '@smui/icon-button';
	import { Svg } from '@smui/common/elements';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import { numberFormat } from '$lib/helpers/helper.js';

	const partnername = $page.url.searchParams.get('partnername');
	const groupname = $page.url.searchParams.get('groupname');

	const txnno = $page.url.searchParams.get('txnno');
	const txndate = $page.url.searchParams.get('txndate');
	const amount = $page.url.searchParams.get('amount');
	const paypartnerid = $page.url.searchParams.get('paypartnerid');
	const email = $page.url.searchParams.get('email');
</script>

<div>
	<Container>
		<Paper>
			<Content
				style="display: flex; flex-direction: column; align-items: center; max-width: 300px; padding: 0 20px;"
			>
				<div class="icon-container">
					<Icon component={Svg} viewBox="0 0 24 24">
						<path fill="#0077FF" d={mdiCheckboxMarkedCircle} />
					</Icon>
				</div>
				<h2>Payment Successful</h2>
				<div class="payment-info">
					<div class="caption">Transaction #</div>
					<div class="value">{txnno}</div>
					<div class="caption">Payment Date</div>
					<div class="value">{txndate}</div>
					<div class="amount-container">
						<div class="amount">Amount</div>
						<div class="amount">PHP {numberFormat(amount)}</div>
					</div>
					<div class="partner-info">
						<h3>Payment Partner</h3>
						<img src={`/resources/${paypartnerid}.png`} alt={paypartnerid} />
					</div>
				</div>
				<div class="ereceipt-container">
					<p>Your e-receipt and tickets will be sent to your email at {email}</p>
					<p>Thank you for using this service.</p>
				</div>

				<div>
					<Button href={`/partners/${groupname}_${partnername}`} label="OK" variant="raised" />
				</div>
			</Content>
		</Paper>
	</Container>
</div>

<style>
	.icon-container {
		width: 48px;
		height: 48px;
	}

	h2 {
		color: rgb(0, 163, 0);
		font-size: 1.5rem;
		font-weight: 700;
		margin: 10px 0;
	}

	.payment-info {
		display: flex;
		flex-direction: column;
		padding: 15px;
		border: 1px solid #aaaaaa;
		border-radius: 5px;
		width: 100%;
	}

	.caption {
		font-size: 0.8rem;
		font-weight: 600;
		opacity: 0.65;
	}

	.value {
		font-weight: 500;
		opacity: 0.9;
		border-bottom: 1px solid #aaaaaa;
	}

	.amount-container {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 1px solid #aaaaaa;
	}

	.amount {
		font-weight: 800;
	}

	.partner-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.partner-info > h3 {
		font-size: 0.6rem;
		margin-top: 5px;
	}

	.ereceipt-container {
		text-align: center;
		font-size: 0.85rem;
		opacity: 0.8;
		margin-bottom: 20px;
	}

	img {
		width: 150px;
	}
</style>

<script>
	import PaymayaCheckout from './PaymayaCheckout.svelte';
	import Panel from '$lib/ui/Panel.svelte';
	import MsgBox from '$lib/ui/MsgBox.svelte';
	import Dialog from '$lib/ui/Dialog.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import Loading from '$lib/ui/Loading.svelte';
	import { postData } from '$lib/helpers/fetch.js';
	import { order, contact, payer, payoption } from '$lib/stores/bill.js';

	export let partner;

	let mode = 'checkout';
	let error = undefined;
	let showError = false;
	let processingPayment = false;
	let paypartner = {};
	let po = {};

	let postForm = undefined;

	let fields = [];
	$: if (paypartner.params) {
		Object.keys(paypartner.params).forEach((key) => {
			if (paypartner.params.hasOwnProperty(key)) {
				fields.push([key, paypartner.params[key]]);
			}
		});
	}

	$: if (postForm && paypartner.formaction) {
		postForm.submit();
	}

	const onPayment = async (evt) => {
		processingPayment = true;
		const checkout = evt.detail;
		const po = { ...$order, webfee: checkout.webfee, txnfee: checkout.txnfee };
		po.orgcode = partner.id;
		po.paidby = $payer.paidby;
		po.paidbyaddress = $payer.paidbyaddress;
		po.email = $contact.email;
		po.mobileno = $contact.mobileno;

		const res = await postData('/api/epayment/po', {
			partner,
			po,
			checkout,
			payoption: { objid: $payoption.objid }
		});

		error = res.error;
		processingPayment = false;

		if (error) {
			showError = true;
		} else {
			paypartner = res.data.paypartner;
			mode = 'payment';
		}
	};
</script>

<Panel>
	<MsgBox open={showError} on:accept={() => (showError = false)} title="Payment Processing Error">
		An error occurred while processing your request. Correct the problem and resubmit your request
		or kindly contact the LGU for assistance
	</MsgBox>

	<Dialog open={processingPayment} showActions={false}>
		<Panel column center>
			<p style="font-size: 1.325rem; font-weight: 800; margin-bottom: 0.5rem;">
				Contacting Partner
			</p>
			<p style="font-size: 1rem; opacity: 0.85; margin-bottom: 1rem;">
				Kindly wait while we send your payment request to our partner
			</p>
			<Loading showMessage={false} />
			<Spacer />
		</Panel>
	</Dialog>

	<PaymayaCheckout on:payment={onPayment} />

	{#if mode === 'payment' && paypartner.isredirect === true}
		<h1>this is true</h1>
		<form id="postform" bind:this={postForm} method="GET" action={paypartner.formaction}>
			<input type="hidden" name="id" value={paypartner.id} />
		</form>
	{:else}
		<form
			id="postform"
			bind:this={postForm}
			method="POST"
			action={paypartner.formaction}
			ref={postForm}
		>
			{#each fields as field}
				<input key={field[0]} type="hidden" name={field[0]} value={field[1]} />
			{/each}
			<input type="hidden" name="orgcode" value="${po.orgcode}" />
		</form>
	{/if}
</Panel>

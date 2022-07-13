<script>
	import { createEventDispatcher } from 'svelte';
	import Dialog from '$lib/ui/Dialog.svelte';

	const dispatch = createEventDispatcher();

	export let open = false;

	const onAccept = () => {
		dispatch('accept');
	};
</script>

<Dialog title="Terms and Conditions" {open} on:accept={onAccept} showCancel={false}>
	<div>
		<ol>
			<li>
				<p>This application requires you to provide information that will require consent.</p>
			</li>
			<li>
				<p>
					The information will be used for this transaction and for tourism purposes. In compliance
					with RA 10173 or Data Privacy Act of the Philippines, your data will not be used for other
					purposes except for the above mentioned.
				</p>
			</li>
			<li>
				<p>No refunds and discounts will be provided for any online transactions.</p>
			</li>
		</ol>
	</div>
</Dialog>

<style>
	div {
		overflow: 'auto';
		padding: 0 50px;
	}

	li {
		list-style-type: decimal;
		font-size: 0.825rem;
		margin-bottom: 5px;
	}

	p {
		font-size: 0.825rem;
		opacity: 0.95;
		margin-inline-start: 10px;
		line-height: 1.2rem;
	}
</style>

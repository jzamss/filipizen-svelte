<script>
	import { createEventDispatcher } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import Error from '$lib/ui/Error.svelte';
	import Integer from '$lib/ui/Integer.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';

	import { origin, contact, txntype } from '$lib/stores/bill';
	import { routes } from '$lib/stores/terminalpass';

	import { postData } from '$lib/helpers/fetch.js';
	import { formatDate } from '$lib/helpers/helper.js';

	const dispatch = createEventDispatcher();

	export let title;
	export let partner;

	const MAX_NO_GUESTS = 25;

	let error = null;
	let guestInfo = {};
	let processing = false;

	const onCancel = () => {
		dispatch('cancel');
	};

	const getTotal = () => {
		let total = 0;
		if (guestInfo.numadult) total += parseInt(guestInfo.numadult);
		if (guestInfo.numchildren) total += parseInt(guestInfo.numchildren);
		return total;
	};

	const validateInfo = () => {
		const total = getTotal();
		if (total === 0) {
			throw 'At least one (1) guest should be specified.';
		}

		if (total > MAX_NO_GUESTS) {
			throw `Total no. of guests should not exceed ${MAX_NO_GUESTS}.`;
		}

		if (guestInfo.numnonfil && guestInfo.numnonfil > guestInfo.numadult) {
			throw `Number of Tourists must not exceed ${guestInfo.numadult}.`;
		}
	};

	const getParticulars = (routes) => {
		const routeTitles = routes.map((route) => `${route.name}`);
		const particulars = routeTitles.join(' and ');
		return particulars;
	};

	const getTravelInfo = (routes) => {
		const dates = routes.map((route) => formatDate(route.traveldate));
		return dates.join(' and ');
	};

	const getGuestInfo = () => {
		return `With ${getTotal()} Guest(s)`;
	};

	const buildOrder = (bill) => {
		const selectedRoutes = $routes
			.filter((route) => route.selected)
			.map((route) => ({ ...route, traveldate: formatDate(route.traveldate, 'YYYY-MM-DD') }));

		let particulars = 'Terminal Fee for';
		particulars += ' ' + getParticulars(selectedRoutes);
		particulars += ' ' + getTravelInfo(selectedRoutes);
		particulars += '. ' + getGuestInfo();

		const info = {
			tag: 'TOURIST',
			...guestInfo,
			routes: selectedRoutes
		};

		return {
			refno: bill.billno,
			txntype: $txntype,
			origin: $origin,
			txntypename: 'TERMINAL FEE',
			orgcode: partner.id,
			paidby: contact.name,
			paidbyaddress: contact.address,
			amount: bill.amount,
			paymentdetails: particulars,
			particulars: particulars,
			info,
			items: bill.items
		};
	};

	const getBilling = async () => {
		const res = await postData('/api/ticketing/bill', {
			...guestInfo,
			partnerid: partner.id,
			total: getTotal(),
			contact: $contact,
			routes: $routes,
			tag: 'TOURIST'
		});

		if (res.error) throw res.error;
		return res.data;
	};

	const loadBill = async () => {
		try {
			validateInfo();
			guestInfo.total = getTotal();
			processing = true;
			const bill = await getBilling();
			const order = buildOrder(bill);
			bill.paymentdetails = order.paymentdetails;
			dispatch('submit', { guestInfo, bill, order });
		} catch (err) {
			error = err;
			processing = false;
		}
	};
</script>

<Container>
	<Paper>
		<Content style="display: flex; flex-direction: column; padding: 0 10px; max-width: 400px;">
			<Title>{title}</Title>
			<Subtitle>Guest Profile</Subtitle>
			<Error {error} />
			<Integer bind:value={guestInfo.numadult} label="No. of Adults" autoFocus />
			<Integer bind:value={guestInfo.numchildren} label="No. of Children (5 years and below)" />
			<Integer bind:value={guestInfo.numnonfil} label="No. of Tourists (above 5 years old)" />
			<Spacer />
			<p>* Children 5 years old and below are exempted from paying terminal fee</p>
			<ActionBar>
				<Button on:click={onCancel} label="Cancel" />
				<Button
					on:click={loadBill}
					label="Next"
					variant="raised"
					{processing}
					disabled={processing}
				/>
			</ActionBar>
		</Content>
	</Paper>
</Container>

<style>
	p {
		color: red;
		font-size: 0.8rem;
		opacity: 0.875;
		line-height: 1.2rem;
	}
</style>

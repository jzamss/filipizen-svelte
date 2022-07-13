<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import Error from '$lib/ui/Error.svelte';
	import Panel from '$lib/ui/Panel.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Subtitle from '$lib/ui/Subtitle.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Date from '$lib/ui/Date.svelte';
	import Checkbox from '$lib/ui/Checkbox.svelte';
	import ActionBar from '$lib/ui/ActionBar.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import { isDateBefore, dateAdd, currentDate, formatDate } from '$lib/helpers/helper.js';
	import terminalpass, { routes, guestinfo, loadRoutes } from '$lib/stores/terminalpass.js';

	const dispatch = createEventDispatcher();

	export let title;
	export let partner;

	let error = undefined;
	let processing = false;

	onMount(async () => {
		await loadRoutes(partner);
	});

	const onCancel = () => {
		dispatch('cancel');
	};

	const validateTravelDate = () => {
		const route = $routes[0];
		if (route.selected && !route.traveldate) {
			throw 'Travel date must be specified';
		}

		const refDate = dateAdd(-1);
		if (isDateBefore(route.traveldate, refDate)) {
			throw `Travel date must be on or after ${formatDate(currentDate)}`;
		}
	};

	const validateReturnDate = () => {
		const route = $routes[1];
		if (route.selected && !route.traveldate) {
			throw 'Return date must be specified';
		}
		const refDate = dateAdd(-1);
		if (isDateBefore(route.traveldate, refDate)) {
			throw `Travel date must be on or after ${formatDate(currentDate)}`;
		}

		const travelRoute = $routes[0];
		if (travelRoute.selected) {
			const travelDate = travelRoute.traveldate;
			const returnDate = route.traveldate;
			if (isDateBefore(returnDate, travelDate)) {
				throw `Return date must be on or after ${formatDate(travelDate)}`;
			}
		}
	};

	const validateTravel = () => {
		const selectedIdx = $routes.findIndex((route) => route.selected);
		if (selectedIdx < 0) {
			throw 'Kindly select at least one (1) travel destination';
		}

		validateTravelDate();
		validateReturnDate();
	};

	const onSubmit = async () => {
		try {
			error = null;
			validateTravel();
			dispatch('submit');
		} catch (err) {
			error = err;
		}
	};
</script>

<Container>
	<Paper>
		<Content style="display: flex; flex-direction: column; padding: 0 10px;">
			<Title>{title}</Title>
			<Subtitle>Travel Itinerary</Subtitle>
			<h3>Issue QR Code for use in:</h3>
			<Spacer />
			<Error {error} />
			<Panel>
				{#each $routes as route (route.objid)}
					<Panel row style="justify-conten: space-between; margin-bottom: 10px;">
						<Checkbox bind:checked={route.selected} label={`${route.name}`} />
						<Date
							bind:value={route.traveldate}
							placeholder="mm/dd/yyyy"
							disabled={!route.selected}
						/>
					</Panel>
				{/each}
			</Panel>
			<ActionBar>
				<Button on:click={onCancel} label="Cancel" />
				<Button on:click={onSubmit} label="Next" variant="raised" {processing} />
			</ActionBar>
		</Content>
	</Paper>
</Container>

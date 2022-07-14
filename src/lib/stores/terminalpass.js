import { get, writable } from 'svelte/store';
import { getData } from '$lib/helpers/fetch.js';

export const guestinfo = writable({});

export const routes = writable([]);

let routesLoaded = false;

export const loadRoutes = async (partner) => {
	if (routesLoaded) {
		return { routes: get(routes) };
	}

	const { error, data: travelRoutes } = await getData('/api/ticketing/route', {
		partnerid: partner.id
	});

	if (!error) {
		travelRoutes.forEach((route) => {
			route.traveldate = null;
			route.selected = false;
		});
		routes.set(travelRoutes);
		routesLoaded = true;
		return { routes: travelRoutes };
	}
	return { error };
};

let store;

const createStore = () => {
	store = writable({});

	const { subscribe, set, update } = store;

	return {
		subscribe,
		set,
		update
	};
};

export default createStore();

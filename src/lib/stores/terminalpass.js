import { get, writable } from 'svelte/store';
import { getData } from '$lib/helpers/fetch.js';

export const guestinfo = writable({});

export const routes = writable([
	{
		objid: 'ROUTE290d16d3:17ba01919c0:-7ef0',
		sortorder: 0,
		name: 'CATICLAN - CAGBAN',
		state: 'ACTIVE',
		destinationid: '038CAG',
		originid: '038CAT',
		traveldate: null,
		selected: false,
		destination: {
			objid: '038CAG',
			address: 'CAGBAN JETTY PORT TERMINAL, AKLAN',
			name: 'CAGBAN JETTY PORT TERMINAL'
		},
		origin: {
			objid: '038CAT',
			address: 'CATICLAN JETTY PORT TERMINAL, AKLAN',
			name: 'CATICLAN JETTY PORT TERMINAL'
		}
	},
	{
		objid: 'ROUTE5e26f8cc:17ba02c32c0:-7f77',
		sortorder: 1,
		name: 'CAGBAN - CATICLAN',
		state: 'ACTIVE',
		destinationid: '038CAT',
		originid: '038CAG',
		traveldate: null,
		selected: false,
		destination: {
			objid: '038CAT',
			address: 'CATICLAN JETTY PORT TERMINAL, AKLAN',
			name: 'CATICLAN JETTY PORT TERMINAL'
		},
		origin: {
			objid: '038CAG',
			address: 'CAGBAN JETTY PORT TERMINAL, AKLAN',
			name: 'CAGBAN JETTY PORT TERMINAL'
		}
	}
]);
// export const routes = writable([]);

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

import { writable, get } from 'svelte/store';
import { groupBy } from '$lib/helpers/helper.js';
import { getData } from '$lib/helpers/fetch.js';

let store;
let loaded = false;

const createStore = () => {
	store = writable();
	const { subscribe, set, update } = store;

	const load = async () => {
		if (loaded) {
			return { partners: get(store) };
		}

		const { error, data: partners } = await getData('/api/partner');

		if (!error) {
			set(partners);
			loaded = true;
			return { partners };
		}
		return { error };
	};

	const findByNames = ({ partnername, groupname }) => {
		return (
			get(store).find(
				(partner) => partner.name === partnername && partner.group.name === groupname
			) || {}
		);
	};

	return {
		subscribe,
		set,
		update,
		load,
		findByNames
	};
};

export default createStore();

export function getClusters(partners) {
	const clusterGroup = groupBy(partners, 'clusterid');
	const clusters = Object.keys(clusterGroup).map((key) => ({
		clusterid: key,
		partners: clusterGroup[key]
	}));
	return clusters;
}

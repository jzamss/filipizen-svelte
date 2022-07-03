import { writable, get } from 'svelte/store';
import { groupBy } from '$lib/helpers/helper.js';
import { getData } from '$lib/helpers/fetch.js';

let store;

const createStore = () => {
	let loaded = false;
	store = writable();
	const { subscribe, set, update } = store;

	const load = async () => {
		if (loaded) return get(store);
		const partners = await getData('/api/partner');
		set(partners);
		loaded = true;
		return partners;
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

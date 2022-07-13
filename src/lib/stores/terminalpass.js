import { writable } from 'svelte/store';

export const guestinfo = writable({});

export const routes = writable([]);

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

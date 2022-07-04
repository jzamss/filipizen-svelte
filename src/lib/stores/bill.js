import { writable, get } from 'svelte/store';

export const email = writable({});
export const payee = writable({});

let billStore;

const createStore = () => {
	billStore = writable({});
	const { subscribe, set, update } = billStore;

	return {
		subscribe,
		set,
		update
	};
};

export default createStore();

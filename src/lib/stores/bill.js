import { writable } from 'svelte/store';

export const contact = writable({});

export const order = writable({});

export const payer = writable({});

export const payoption = writable({});

export const payoptions = writable([]);

export const processing = writable(false);

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

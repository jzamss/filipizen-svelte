import { writable } from 'svelte/store';

export const contact = writable({ email: 'jzamss@gmail.com' });
export const payee = writable({});
export const mode = writable();
export const processing = writable(false);

let billStore;

const createStore = () => {
	// billStore = writable({});
	billStore = writable({});
	const { subscribe, set, update } = billStore;

	return {
		subscribe,
		set,
		update
	};
};

export default createStore();

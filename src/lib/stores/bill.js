import { writable } from 'svelte/store';

export const contact = writable({ email: 'jzamss@gmail.com' });
export const payee = writable({});
export const mode = writable();
export const processing = writable(false);

let billStore;

const createStore = () => {
	// billStore = writable({});
	billStore = writable({
		ownername: 'SANTOS, MARICEL A.',
		tradename: 'MY SARI-SARI STORE',
		address: 'POBLACION I, CARCAR, \nCEBU',
		appno: 'B0000120220500001-1C',
		bin: 'B0000120220500001',
		appdate: '2021-01-05',
		apptype: 'RENEW',
		expirydate: null,
		email: null,
		mobileno: null,
		amount: 3240,
		items: [
			{
				lobname: 'SARI-SARI',
				account: 'BUSINESS TAX',
				amount: 2640,
				discount: 0,
				surcharge: 0,
				interest: 0,
				total: 2640
			},
			{
				lobname: null,
				account: 'GARBAGE FEE',
				amount: 600,
				discount: 0,
				surcharge: 0,
				interest: 0,
				total: 600
			}
		],
		txntype: 'bpls',
		txntypename: 'Business Permit'
	});
	const { subscribe, set, update } = billStore;

	return {
		subscribe,
		set,
		update
	};
};

export default createStore();

import { writable } from 'svelte/store';

export const txntype = writable('waterworks');

// export const contact = writable({});
export const contact = writable({ email: 'jzamss@gmail.com' });

export const order = writable({});

export const payer = writable({});

// export const payoption = writable({});
export const payoption = writable({
	objid: '154_PAYMAYA',
	paypartnerid: 'PAYMAYA',
	info: {
		merchantcode: 'd898bf95-7efe-4b55-867c-5c4d10439fea',
		successurl: 'https://www.filipizen.com/payoptions/paymayasuccess',
		errorurl: 'https://www.filipizen.com/payoptions/paymayaerror',
		cancelurl: 'https://www.filipizen.com/payoptions/paymayaerror',
		card: {
			actionurl: 'https://pg.paymaya.com/checkout/v1/checkouts',
			headerpost: {
				'Content-Type': 'application/json',
				Authorization: 'Basic cGstRTFTd3R6OUt6RG5abFA3RVdtWmQzc2M1bTRhYk5mVnJJcTNPd0o2V3lDOTo='
			},
			headerget: {
				'Content-Type': 'application/json',
				Authorization: 'Basic cGstRTFTd3R6OUt6RG5abFA3RVdtWmQzc2M1bTRhYk5mVnJJcTNPd0o2V3lDOTo='
			}
		},
		wallet: {
			actionurl: 'https://pg.paymaya.com/payby/v2/paymaya/payments',
			headerpost: {
				'Content-Type': 'application/json',
				Authorization: 'Basic cGstZmhoVDdneFlJVUhSUXR4MWg0T0c3aDd1ZkNtamh2VWd6STNCcUE3Z0VnUDo='
			},
			headerget: {
				'Content-Type': 'application/json',
				Authorization: 'Basic cGstZmhoVDdneFlJVUhSUXR4MWg0T0c3aDd1ZkNtamh2VWd6STNCcUE3Z0VnUDo='
			}
		},
		custom: {
			url: 'https://pg.paymaya.com/checkout/v1/customizations',
			header: {
				'Content-Type': 'application/json',
				Authorization: 'Basic cGstRTFTd3R6OUt6RG5abFA3RVdtWmQzc2M1bTRhYk5mVnJJcTNPd0o2V3lDOTo='
			},
			data: {
				logoUrl: 'https://www.filipizen.com/res/logo-filipizen-topnav.svg',
				iconUrl: 'https://www.filipizen.com/res/logo-filipizen-topnav.svg',
				appleTouchIconUrl: 'https://www.filipizen.com/res/logo-filipizen-topnav.svg',
				customTitle: 'Filipizen EPayment',
				colorScheme: '#368d5c'
			}
		}
	},
	partnerid: '154',
	paypartner: {
		name: 'PAYMAYA',
		state: 'ACTIVE',
		code: '103',
		info: {
			successurl: 'http://www.filipizen.com/payoptions/paymayasuccess',
			errorurl: 'http://www.filipizen.com/payoptions/paymayaerror',
			cancelurl: 'http://www.filipizen.com/payoptions/paymayaerror',
			card: {
				actionurl: 'https://pg.paymaya.com/checkout/v1/checkouts',
				headerpost: {
					'Content-Type': 'application/json',
					Authorization: 'Basic cGstUDNoRTliT3VMcHI5cERKTlVGb1lLbkFXQmVDZU01ZEZ5WndrWVhFR3dMVzo='
				},
				headerget: {
					'Content-Type': 'application/json',
					Authorization: 'Basic cGstUDNoRTliT3VMcHI5cERKTlVGb1lLbkFXQmVDZU01ZEZ5WndrWVhFR3dMVzo='
				}
			},
			wallet: {
				actionurl: 'https://pg.paymaya.com/payby/v2/paymaya/payments',
				headerpost: {
					'Content-Type': 'application/json',
					Authorization: 'Basic cGstUDNoRTliT3VMcHI5cERKTlVGb1lLbkFXQmVDZU01ZEZ5WndrWVhFR3dMVzo='
				},
				headerget: {
					'Content-Type': 'application/json',
					Authorization: 'Basic cGstUDNoRTliT3VMcHI5cERKTlVGb1lLbkFXQmVDZU01ZEZ5WndrWVhFR3dMVzo='
				}
			}
		},
		caption: 'PAYMAYA',
		objid: 'PAYMAYA',
		actionurl: 'https://pg.paymaya.com/checkout/v1/checkouts'
	},
	webfee: {
		fee: null,
		objid: null,
		ranges: null,
		type: null
	}
});

export const payoptions = writable([]);

export const processing = writable(false);

let billStore;

const createStore = () => {
	// billStore = writable({});
	billStore = writable({
		payer: {
			name: 'LACEA, CECILE',
			objid: 'IND539dac4a:15a5955f782:-7120'
		},
		paidby: 'LACEA, CECILE (210000268)',
		paidbyaddress: 'ALFARERO ST. PUROK 6 \nSAN ISIDRO, TAGBILARAN CITY ',
		acctno: '210000268',
		acctid: 'WACCT-1d32c3b9:17212234c65:-7f26',
		billid: 'WBILL-51b9057:17987a2d966:12d',
		items: [],
		billitems: [],
		amount: 0,
		pmttxntype: 'billing',
		monthname: 'JUN',
		totalsurcharge: 0,
		totalcredits: 0,
		totalunpaid: 0,
		scheduleid: 'S21',
		acctstate: 'ACTIVE',
		initial: null,
		meterstate: 'ACTIVE',
		year: 2021,
		seqno: 102,
		objid: 'WBILL-51b9057:17987a2d966:12d',
		totalprevunpaid: 0,
		balanceforward: 0,
		totalbillunpaid: 0,
		billrefno: null,
		validitydate: null,
		month: 6,
		acctname: 'LACEA, CECILE',
		meterid: 'WM31dbab29:1722595066b:-46f4',
		state: 'POSTED',
		remarks: null,
		expirydate: '2021-07-06',
		billdate: '2021-06-15',
		stuboutid: null,
		txnmode: 'ONLINE',
		totalamtdue: 0,
		batchid: 'WB202106-220703',
		totaldiscount: 0,
		acctinfoid: 'WACCT-1d32c3b9:17212234c65:-7f26',
		classificationid: 'RESIDENTIAL',
		billed: 1,
		billamount: 256,
		consumptionid: 'WAC-51b9057:17987a2d966:12e',
		printed: 1,
		totalpayment: 256,
		billno: 'WB202106-220703-00004',
		step: null,
		consumption: {
			batchid: 'WB202106-220703',
			volume: 34,
			reading: 723,
			reason: null,
			reader: {
				objid: 'USR-54a3592f:172a0fecdf5:-3c0a',
				name: 'ELISEO SERRANO'
			},
			readingdate: null,
			hold: 0,
			prev: {
				reading: 689
			},
			billid: 'WBILL-51b9057:17987a2d966:12d',
			amount: 256,
			objid: 'WAC-51b9057:17987a2d966:12e'
		},
		address: {
			text: 'ALFARERO ST. PUROK 6 \nSAN ISIDRO, TAGBILARAN CITY '
		},
		meter: {
			brand: 'EVER',
			size: {
				title: '1/2"',
				objid: 'ONE_HALF'
			},
			objid: 'WM31dbab29:1722595066b:-46f4',
			sizeid: 'ONE_HALF',
			capacity: 10000,
			serialno: '160133551XX'
		},
		stubout: {
			objid: null,
			lat: null,
			subareaid: null,
			lng: null,
			barangay: {
				objid: null,
				name: null
			},
			code: null,
			description: null
		},
		createdby: {
			objid: 'USR-3b88f0ee:17206d992c6:-7fcf',
			name: 'VINCENT T MANIWANG'
		},
		period: {
			billdate: '2021-06-15',
			readingenddate: '2021-06-09',
			billingenddate: null,
			duedate: '2021-06-21',
			todate: '2021-06-07',
			fromdate: '2021-05-07',
			discdate: null,
			readingdate: '2021-06-08',
			billexpirydate: '2021-07-06'
		},
		area: {
			code: '001'
		},
		subarea: {
			barangay: {
				name: null
			},
			schedulegroupid: 'S21',
			code: '220703'
		},
		txntypename: 'Waterworks'
	});

	const { subscribe, set, update } = billStore;

	return {
		subscribe,
		set,
		update
	};
};

export default createStore();

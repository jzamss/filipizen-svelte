import { writable } from 'svelte/store';

//TODO: reset
export const contact = writable({ email: 'jzamss@gmail.com' });

export const payer = writable({
	paidby: 'juan',
	paidbyaddress: 'cebu'
});

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

export const payoptions = writable([
	{
		objid: '154_DBP',
		paypartnerid: 'DBP',
		info: {
			merchantcode: '00000673',
			terminalid: 673,
			transactionkey: '06cb9879364c5399097c2a8b7a1cf7b2d630b93a'
		},
		partnerid: '154',
		paypartner: {
			name: 'DEVELOPMENT BANK OF THE PHILIPPINES',
			state: 'ACTIVE',
			code: '101',
			info: {},
			caption: 'DBP',
			objid: 'DBP',
			actionurl: 'https://ipg.devbnkphl.com:8443/transaction/verify'
		},
		webfee: {
			fee: null,
			objid: null,
			ranges: null,
			type: null
		}
	},
	{
		objid: '154_GCASH',
		paypartnerid: 'GCASH',
		info: {
			merchantcode: '217020000076421191898',
			successurl: 'https://www.filipizen.com/payoptions/gcashsuccess',
			errorurl: 'https://www.filipizen.com/payoptions/gcasherror',
			notificationurl: 'https://www.filipizen.com/webhooks/gcash',
			prikey:
				'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDJJW5qZgyEtBpQw9/SVueUESOFGGCz1eXcr3gkDfAy9sZVRZTOHI0/RXNCyxqerfo8zVCi9os1kuep1XFk0LD9wx6xH6sCBtusBCqpCc5ucuNwWbETOmVOQW1krwDXjTgBF7rRD39Y5iU3Nj+bvkhpmDbsP6BVARdb2BtMmMbXsfMuZiSMGlAbvSG8Y3B1MWnwdKLK4wJsJiH99HiZXQucVa0K61VgG2pD6vbd6/dfFOxXRKiCx6BgXvrJ6btbRFyCxN+fw+BJQGKv70WahwSPAIqVUalZ65jjcVgzdIpyklgOSa3xmcKVEYoq0ZBIGv7DYmI5Qr8pHoBUmr9KF+GPAgMBAAECggEBAMQ1Nxeio+Nuq5zM9K+BBjRw420Y8nt50tcKcu74ia2s+pqDXTwQrddiL6Sf6j+PBeH5hQbx56lCu6f3BL2KtJtUkcPFWFKJzg5lohdx8WPbvfACDbDr7ZYATG1CKFga8N5f/2Oe8mINXZAV4sZRPuGCEVEyX3uLrPVyQG7fOFd9Cxa9PH9zU6L1gxqufGaq+aB6VM/wmswM/PneZvx1N/Qzr3MIcTObY866uhW1h0Rr5UybpUVBzVoLRhwcjZmxlb4Naxo7GcWftNAyqD+e73hEiLqx53aV4mwPmzLmB8RNJSC+tuHZESrL+TnYmMHfUN+YN+zteNKncgyzSygr4EECgYEA6N8BLaMAvAmtsCbE+FRwP92jRb8wZ7cJjNjcN18GXqYfvCnO1UeUsXwYWn5QDRQoMm0hChcjUEX2KYzFtfLeuPRv0ArsOGYQBJhQ5XvwJ2EtL1tlEslLHBYy/EnAaUMXcGEob3jYAQc09JW0hZF0yG5jLHAUEuqQLOuDPQso7a0CgYEA3R/Jm9ho61f1V5IGTT467qIAyaOG3TpJTQEa0HMW8DMg8VU+DqPVJfuhfw8KOjb8UiXZvHd3hB1CFcxlLPKB9gSpJp3iPmPOxqiFELFp68pm2KaEC8A2BxfxiiGBZ+llyZpXYu0tEJJTfGkvSr5eofo8BDScDYmNHySkNi2re6sCgYEApZ8txFqBRDuR942rW38akqG85Pc0ox8wQKdgAFWqPxjhyz7k5xXQ8GZ1H69kmdizOiIZdIa+S/JmQGjpmR2SQHNBLvMFzJryW4JFTuHWDPv1WhAjk7fsnp4/RuXhXjwkaH4Bdz64SgrpI+dxi+nG6GJyUIGqFUYUoo4iOgE868UCgYBkU7Leoe7gsNThOaDgVRbaBOkEk8xx/asaZCDtaPqEWz5cIQf6Dn18MVJR2toSFbaf8wp6h13TtI6yYz2YiiNLI0w3+DSZiCFeY0GUlFpxoDDPpaWNy1T4HPX7bT5QjkYflYaGnQPwW+PDM9pAOGWpambmpZQUVE+STMawykHe5wKBgQCoyj1p0Js7S2Tdd8xm6lPSg1kdCG86DGg03m0DTsrDpBBaRjijx/Szkm2vWMALH54aImoN9vbbPINkhqAmrqlBw6U2Ue+kRG7V/L3UNl3NRirYUn6IzXah39zrh/xEbRub3tFJ8PruPmTvNFx7Ku8NR7ZVdlKFngQLHic5BY+JJw==',
			pubkey:
				'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsWcpXRPXOH3m0sytTeuPoFMCSWwg+ZJVc+K2krCJqRjWsiCtaGx6jUgRvL+eTJVIAvjwxpH3ftmnUjORCaD12Oam7L37c5tst5PHHyDC+ChPsdjLf8I6tl6bNUzdN08Cse+q09CIoaRo4KwO5FQupdqZjIXILogr14dMPgELCcxnqOgZ4bKqgVT2QH97f4Mx0uw+bWadOtMnmMkRtR1WEVULn7SYG7DMHTEEAsFhrX9fVDvoYBvBM5AIH+0nD2ZYOqR63VfgUxaiGk5d3BztK5UNfA+WjeclkKPVI7ED1NPdiojlUXrUchwMGYI+GPTHM8UkqAWtcDxobHrhnfMmoQIDAQAB',
			wallet: {
				actionurl: 'https://api.saas.mynt.xyz/gcash/acquiring/order/create.htm',
				headerpost: {
					'Content-Type': 'application/json'
				},
				headerget: {
					'Content-Type': 'application/json'
				},
				head: {
					version: '2.0',
					function: 'gcash.acquiring.order.create',
					clientId: '2021051911340100015899',
					clientSecret: '2021051911340100015899n6XEfa'
				},
				body: {
					merchantId: '217020000076421191898',
					productCode: '51051000101000100001',
					subMerchantId: '',
					subMerchantName: 'TAGBILARAN CITY',
					envInfo: {
						orderTerminalType: 'WAP',
						terminalType: 'WAP'
					}
				},
				queryapi: {
					function: 'gcash.acquiring.order.query',
					url: 'https://api.saas.mynt.xyz/gcash/acquiring/order/query.htm'
				}
			}
		},
		partnerid: '154',
		paypartner: {
			name: 'GCASH',
			state: 'ACTIVE',
			code: '104',
			info: {
				successurl: 'https://www.filipizen.com/payoptions/gcashsuccess',
				errorurl: 'https://www.filipizen.com/payoptions/gcasherror',
				notificationurl: 'https://www.filipizen.com/webhooks/gcash',
				wallet: {
					actionurl: 'https://api.saas.mynt.xyz/gcash/acquiring/order/create.htm',
					headerpost: {
						'Content-Type': 'application/json'
					},
					headerget: {
						'Content-Type': 'application/json'
					},
					head: {
						version: '2.0',
						function: 'gcash.acquiring.order.create',
						clientId: '0000000000000000000000',
						clientSecret: '0000000000000000000000000000'
					},
					body: {
						merchantId: '000000000000000000000',
						productCode: '00000000000000000000',
						subMerchantId: '',
						subMerchantName: 'LGU',
						envInfo: {
							orderTerminalType: 'WAP',
							terminalType: 'WAP'
						}
					},
					queryapi: {
						function: 'gcash.acquiring.order.query',
						url: 'https://api.saas.mynt.xyz/gcash/acquiring/order/query.htm'
					}
				}
			},
			caption: 'GCASH',
			objid: 'GCASH',
			actionurl: 'https://api.saas.mynt.xyz/gcash/acquiring/order/create.htm'
		},
		webfee: {
			fee: null,
			objid: null,
			ranges: null,
			type: null
		}
	},
	{
		objid: '154_LBP',
		paypartnerid: 'LBP',
		info: {
			merchantcode: '2018080027',
			particulars:
				'Transaction_type=${txntype};Tax Reference Number=${refno};Remarks=NA;Name of Payor=${paidby}'
		},
		partnerid: '154',
		paypartner: {
			name: 'LAND BANK OF THE PHILIPPINES',
			state: 'ACTIVE',
			code: '102',
			info: {
				successurl: 'https://www.filipizen.com/payoptions/landbanksuccess',
				errorurl: 'https://www.filipizen.com/payoptions/landbankerror'
			},
			caption: 'LANDBANK',
			objid: 'LBP',
			actionurl: 'https://epaymentportal.landbank.com/'
		},
		webfee: {
			fee: null,
			objid: null,
			ranges: null,
			type: null
		}
	},
	{
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
	}
]);
export const processing = writable(false);

let billStore;

const createStore = () => {
	//TODO: reset
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

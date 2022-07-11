import Service from '$lib/helpers/remote-service.js';

export const get = async ({ url }) => {
	const txntype = url.searchParams.get('txntype');
	const partnerid = url.searchParams.get('partnerid');
	const refno = url.searchParams.get('refno');
	const billtoyear = url.searchParams.get('billtoyear');
	const billtoqtr = url.searchParams.get('billtoqtr');

	const params = { partnerid, txntype, refno, billtoyear, billtoqtr };
	const svc = Service.lookupAsync(`${partnerid}:OnlineLandTaxBillingService`, 'rpt');

	try {
		const data = await svc.invoke('getBilling', params);
		return {
			body: data.info
		};
	} catch (err) {
		return {
			body: { error: err }
		};
	}
};

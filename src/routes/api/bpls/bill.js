import Service from '$lib/helpers/remote-service.js';

export const get = async ({ url }) => {
	const txntype = url.searchParams.get('txntype');
	const partnerid = url.searchParams.get('partnerid');
	const refno = url.searchParams.get('refno');
	const qtr = url.searchParams.get('qtr') || 4;

	const params = { partnerid, txntype, refno, qtr, showdetails: true };
	const svc = Service.lookupAsync(`${partnerid}:OnlineBusinessBillingService`, 'bpls');

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

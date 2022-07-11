import Service from '$lib/helpers/remote-service.js';

export const get = async ({ url }) => {
	const txntype = url.searchParams.get('txntype');
	const partnerid = url.searchParams.get('partnerid');
	const refno = url.searchParams.get('refno');

	const params = { partnerid, txntype, refno };
	const svc = Service.lookupAsync(`${partnerid}:OnlineWaterworksBillingService`, 'waterworks');

	try {
		const data = await svc.invoke('getBilling', params);
		return {
			body: data
		};
	} catch (err) {
		return {
			body: { error: err }
		};
	}
};

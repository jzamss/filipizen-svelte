import Service from '$lib/helpers/remote-service.js';

export const get = async ({ url }) => {
	const txntype = url.searchParams.get('txntype');
	const partnerid = url.searchParams.get('partnerid');
	const refno = url.searchParams.get('refno');

	try {
		const params = { partnerid, txntype, refno };
		const svc = Service.lookup(`${partnerid}:OnlineWaterworksBillingService`, 'waterworks');
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

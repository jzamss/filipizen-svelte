import Service from '$lib/helpers/remote-service.js';

export const get = async ({ url }) => {
	const partnerid = url.searchParams.get('partnerid');

	const svc = Service.lookup('CloudPaymentService', 'epayment');
	const payOptions = await svc.invoke('getPaymentPartnerOptions', { partnerid });

	return {
		body: payOptions
	};
};

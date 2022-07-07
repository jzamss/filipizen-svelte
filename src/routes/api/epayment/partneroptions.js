import Service from '$lib/helpers/remote-service.js';

export const get = async ({ url }) => {
	const partnerid = url.searchParams.get('partnerid');
	const payOptions = await getPaymentPartnerOptions(partnerid);
	return {
		body: payOptions
	};
};

const getPaymentPartnerOptions = (partnerid) => {
	return new Promise((resolve, reject) => {
		const svc = Service.lookup('CloudPaymentService', 'epayment');
		svc.invoke('getPaymentPartnerOptions', { partnerid }, (err, payOptions) => {
			if (err) {
				reject(err);
			} else {
				resolve(payOptions);
			}
		});
	});
};

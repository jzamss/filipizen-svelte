import Service from '$lib/helpers/remote-service.js';

export const get = async () => {
	const partners = await getActivePartners();
	return {
		body: partners
	};
};

const getActivePartners = () => {
	return new Promise((resolve, reject) => {
		const svc = Service.lookup('CloudPartnerService', 'partner');
		svc.invoke('getActivePartners', null, (err, partners) => {
			if (err) {
				reject(err);
			} else {
				resolve(partners);
			}
		});
	});
};

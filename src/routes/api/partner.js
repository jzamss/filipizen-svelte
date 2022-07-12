import Service from '$lib/helpers/remote-service.js';

export const get = async () => {
	const svc = Service.lookup('CloudPartnerService', 'partner');
	const partners = await svc.invoke('getActivePartners', null);
	return {
		body: partners
	};
};

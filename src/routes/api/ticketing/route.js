import Service from '$lib/helpers/remote-service.js';

export const get = async ({ url }) => {
	const partnerid = url.searchParams.get('partnerid');

	try {
		const svc = Service.lookup(`${partnerid}:OnlineTicketingService`, 'ticketing');
		const routes = await svc.invoke('getRoutes', null);
		return {
			body: routes
		};
	} catch (err) {
		return {
			body: { error: err }
		};
	}
};

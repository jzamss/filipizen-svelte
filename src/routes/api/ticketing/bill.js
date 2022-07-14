import Service from '$lib/helpers/remote-service.js';

export const post = async ({ request }) => {
	const info = await request.json();
	const svc = Service.lookup(`${info.partnerid}:OnlineTicketingService`, 'ticketing');
	let data = await svc.invoke('getBilling', { info });
	return {
		body: data
	};
};

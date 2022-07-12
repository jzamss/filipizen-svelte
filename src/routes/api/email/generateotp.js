import Service from '$lib/helpers/remote-service.js';

export const post = async ({ request }) => {
	const param = await request.json();
	const svc = Service.lookup(`${param.partner.id}:VerifyEmailService`, 'epayment');
	const data = await svc.invoke('verifyEmail', param.contact);

	return {
		body: { otp: data.key }
	};
};

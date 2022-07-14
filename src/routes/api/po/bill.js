import Service from '$lib/helpers/remote-service.js';

export const get = async ({ url }) => {
	const partnerid = url.searchParams.get('partnerid');
	const refno = url.searchParams.get('refno');
	const checksum = url.searchParams.get('checksum');

	console.log({
		partnerid,
		refno,
		checksum
	});

	try {
		const svc = Service.lookup(`${partnerid}:OnlinePaymentOrderService`, 'default');
		const bill = await svc.invoke('getBilling', {
			partnerid,
			refno,
			checksum
		});
		return {
			body: bill
		};
	} catch (err) {
		return {
			body: { error: err }
		};
	}
};

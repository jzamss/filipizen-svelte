import Service from '$lib/helpers/remote-service.js';

export const post = async ({ request }) => {
	const params = await request.json();
	const { partner, po: newPo, payoption, checkout } = params;

	//create po in partner lgu
	const svc = Service.lookup(`${partner.id}:EPaymentService`, 'epayment');
	let po = await svc.invoke('createPaymentOrder', newPo);

	//get po from cloud
	const pmtSvc = Service.lookup('CloudPaymentService', 'epayment');
	po = await pmtSvc.invoke('getPaymentOrder', { objid: po.objid });

	//get paypartner info
	const paypartner = await pmtSvc.invoke('getPayPartner', {
		objid: po.objid,
		payoption: payoption.objid,
		checkout
	});

	return {
		body: { po, paypartner }
	};
};

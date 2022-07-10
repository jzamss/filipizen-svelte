import Service from '$lib/helpers/remote-service.js';
import { cloudProxyServerHost } from '$lib/settings.js';
import { encodeArgs } from '$lib/helpers/fetch.js';

const errorMsg =
	'Your payment was not successfully credited to your bill. Kindly contact payment partner for assistance';

export const get = async ({ params, request, url }) => {
	const body = request.body || {};
	const query = { paymentrefid: url.searchParams.get('paymentrefid') };

	const statusid = params.paymentstatusid;
	const data = { statusid, ...body, ...query };
	let errorUrl = null;
	let successUrl = null;

	if (/error/i.test(statusid)) {
		try {
			const po = await getPaymentOrder({ objid: data.paymentrefid });
			const org = await getPartnerOrg({ orgcode: po.orgcode });
			const error = await postPartnerPaymentError(data);
			error.partnername = org?.name;
			error.groupname = org?.group?.name;
			const errorArgs = encodeArgs(error);
			errorUrl = `${cloudProxyServerHost}/view/epayment/error?${errorArgs}`;
			console.log('ErrorUrl', errorUrl);
			return Response.redirect(errorUrl);
		} catch (err) {
			errorUrl = `${cloudProxyServerHost}/view/epayment/error?message=${errorMsg}`;
			console.log('ErrorUrl', errorUrl);
			console.log('epayment [ERROR]', err);
			return Response.redirect(errorUrl);
		}
	} else {
		try {
			const pmt = await postPartnerPayment(data);
			const partnerOrg = await getPartnerOrg(pmt);
			console.log('partnerOrg=================================');
			console.log('partnerOrg', partnerOrg);
			console.log('partnerOrg=================================');
			const args = buildArgs(pmt, partnerOrg);
			console.log('args=================================');
			console.log('args', args);
			console.log('args=================================');
			successUrl = `${cloudProxyServerHost}/view/epayment/success?${args}`;
			console.log('successUrl', successUrl);
			return Response.redirect(successUrl);
		} catch (err) {
			errorUrl = `${cloudProxyServerHost}/view/epayment/error?message=${errorMsg}`;
			console.log('errorUrl', errorUrl);
			console.log('epayment [ERROR]', err);
			return Response.redirect(errorUrl);
		}
	}
};

const postPartnerPayment = async (params) => {
	const svc = Service.lookupAsync('CloudPaymentService', 'epayment');
	const pmt = await svc.invoke('postPartnerPayment', params);
	console.log('postPartnerPayment.postPartnerPayment===========================');
	console.log('pmt', pmt);
	console.log('postPartnerPayment.postPartnerPayment===========================');

	const remoteSvc = Service.lookupAsync(`${pmt.orgcode}:EPaymentService`, 'epayment');
	remoteSvc
		.invoke('postPayment', pmt)
		.then(() => {
			console.log(`EPayment posted to partner ${pmt.orgcode}`);
		})
		.catch((err) => {
			console.log('postPartnerPayment [Error]: Ignore, ', err);
		});
	return pmt;
};

const getPartnerOrg = async (org) => {
	console.log('getPartnerOrg============================');
	console.log('orgcode', org.orgcode);
	console.log('getPartnerOrg============================');
	const svc = Service.lookupAsync('CloudPartnerService', 'partner');
	return await svc.invoke('findById', { id: org.orgcode });
};

const getPaymentOrder = async (po) => {
	const svc = Service.lookupAsync('CloudPaymentService', 'epayment');
	return await svc.invoke('getPaymentOrder', { objid: po.objid });
};

const postPartnerPaymentError = async (params) => {
	const svc = Service.lookupAsync('CloudPaymentService', 'epayment');
	const error = await svc.invoke('postPartnerPaymentError', params);
	console.log('postPartnerPayment.postPartnerPaymentError===========================');
	console.log(error);
	console.log('postPartnerPayment.postPartnerPaymentError===========================');
	return error;
};

const buildArgs = (pmt, org) => {
	const data = {
		orgcode: pmt.orgcode,
		partnername: org?.name,
		groupname: org?.group?.name,
		txnno: pmt.paymentrefid,
		txndate: pmt.txndate,
		amount: Number(pmt.amount),
		paypartnerid: pmt.paypartnerid.toLowerCase(),
		paidby: pmt.paidby,
		email: pmt.email
	};
	return encodeArgs(data);
};

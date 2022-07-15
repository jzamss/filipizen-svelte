import Service from '$lib/helpers/remote-service.js';

export const get = async ({ url }) => {
	try {
		const { data, infos } = await getData(url);
		const partner = await getPartner(data);

		return {
			body: { data, infos, partner }
		};
	} catch (err) {
		return {
			body: { error: err }
		};
	}
};

const getData = async (url) => {
	const qrSvc = Service.lookup('CloudQrCodeInfoService', 'partner');
	const decodedData = await qrSvc.invoke('decode', {
		data: url.searchParams.get('data')
	});

	const svc = await Service.lookup(
		`${decodedData.orgcode}:OnlineQrCodeInfoService`,
		decodedData.connection,
		decodedData.module
	);
	const infos = await svc.invoke('getInfos', decodedData);

	return { data: decodedData, infos };
};

const getPartner = async (data) => {
	const partnerSvc = Service.lookup('CloudPartnerService', 'partner');
	return await partnerSvc.invoke('findById', {
		id: data.orgcode
	});
};

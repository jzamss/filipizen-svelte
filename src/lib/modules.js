const modules = [
	{
		name: 'bpls',
		title: 'Business',
		services: [
			{
				name: 'businessbilling',
				title: 'Business Online Billing',
				permission: 'bpls.billing'
			},
			{
				name: 'renewbusiness',
				title: 'Renew Business Application',
				permission: 'bpls.renewal'
			},
			{
				name: 'newbusiness',
				title: 'New Business Application',
				permission: 'bpls.new'
			}
		]
	},
	{
		name: 'rptis',
		title: 'Real Property',
		services: [
			{
				name: 'rptbilling',
				title: 'Realty Tax Online Billing',
				component: 'RptBillingWebController'
			},
			{
				name: 'rpttaxclearance',
				title: 'Online Realty Tax Clearance',
				component: 'RealtyTaxClearanceWebController'
			}
		]
	},
	{
		name: 'waterworks',
		lib: 'filipizen-waterworks',
		title: 'Waterworks',
		services: [
			{
				name: 'waterworksbilling',
				title: 'Waterworks Billing',
				component: 'WaterworksBillingWebController'
			}
		]
	},
	{
		name: 'ticketing',
		title: 'Ticketing',
		services: [
			{
				name: 'terminalpass',
				title: 'Terminal Pass',
				component: 'TerminalTicketWebController'
			}
		]
	},
	{
		name: 'po',
		title: 'Payment Order',
		services: [
			{
				name: 'po',
				title: 'Online Payment Order',
				component: 'PoWebController'
			}
		]
	},
	{
		name: 'obo',
		lib: 'filipizen-obo',
		title: 'Building and Construction',
		services: [
			{
				name: 'bldgpermit',
				title: 'Building Permit Application',
				component: 'BuildingPermitWebController'
			},
			{
				name: 'occupancypermit',
				title: 'Certificate of Occupancy Application',
				component: 'OccupancyPermitWebController'
			},
			{
				name: 'registerprofessionals',
				title: 'Register Professional',
				component: 'ProfessionalWebController'
			},
			{
				name: 'updateprofessional',
				title: 'Update Professional',
				component: 'UpdateProfessionalWebController'
			},
			{
				name: 'apptracking',
				title: 'Application Tracking',
				component: 'AppTrackingWebController'
			},
			{
				name: 'obobilling',
				title: 'OSCP Online Billing and Payment',
				component: 'OboBillingWebController'
			},
			{
				name: 'ptrbilling',
				title: 'Pay PTR (Professional Tax Receipt)',
				component: 'PtrBillingWebController'
			}
		]
	}
];

export const getModules = (partner) => {
	const pattern = partner.includeservices;
	if (!pattern) return [];

	const regex = new RegExp(`(${pattern})`, 'i');
	const excludeRegex = partner.excludeservices
		? new RegExp(`(${partner.excludeservices})`, 'i')
		: null;

	const partnerModules = JSON.parse(JSON.stringify(modules));
	partnerModules.forEach((module) => {
		const partnerServices = module.services.filter(
			(service) => regex.test(service.name) && (!excludeRegex || !excludeRegex.test(service.name))
		);
		module.services = partnerServices;
	});

	return partnerModules.filter((module) => module.services.length > 0);
};

const serviceModules = {};

export const getServiceModule = (service) => {
	let ServiceModule = serviceModules[service.module];
	if (typeof ServiceModule === 'undefined') {
		if (service.module === 'bpls') {
			ServiceModule = loadable.lib(() => import('filipizen-bpls'));
		} else if (service.module === 'rptis') {
			ServiceModule = loadable.lib(() => import('filipizen-rptis'));
		} else if (service.module === 'waterworks') {
			ServiceModule = loadable.lib(() => import('filipizen-waterworks'));
		} else if (service.module === 'obo') {
			ServiceModule = loadable.lib(() => import('filipizen-obo'));
		} else if (service.module === 'ticketing') {
			ServiceModule = loadable.lib(() => import('filipizen-ticketing'));
		} else if (service.module === 'po') {
			ServiceModule = loadable.lib(() => import('filipizen-po'));
		}
		serviceModules[service.module] = ServiceModule;
	}
	return ServiceModule;
};

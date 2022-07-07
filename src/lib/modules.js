const modules = [
	{
		name: 'bpls',
		title: 'Business',
		services: [
			{
				name: 'billing',
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
				permission: 'rptis.billing'
			},
			{
				name: 'rpttaxclearance',
				title: 'Online Realty Tax Clearance',
				permission: 'rptis.taxclearance'
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
				component: 'WaterworksBillingWebController',
				permission: 'waterworks.billing'
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
				permission: 'ticketing.terminalpass'
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
				permission: 'po.po'
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
				permission: 'obo.bldgpermit'
			},
			{
				name: 'occupancypermit',
				title: 'Certificate of Occupancy Application',
				permission: 'obo.occupancypermit'
			},
			{
				name: 'registerprofessionals',
				title: 'Register Professional',
				permission: 'obo.registerprof'
			},
			{
				name: 'updateprofessional',
				title: 'Update Professional',
				permission: 'obo.upateprof'
			},
			{
				name: 'apptracking',
				title: 'Application Tracking',
				permission: 'obo.apptracking'
			},
			{
				name: 'obobilling',
				title: 'OSCP Online Billing and Payment',
				permission: 'obo.obobilling'
			},
			{
				name: 'ptrbilling',
				title: 'Pay PTR (Professional Tax Receipt)',
				permission: 'obo.ptrbilling'
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
			(service) =>
				regex.test(service.permission) && (!excludeRegex || !excludeRegex.test(service.permission))
		);
		module.services = partnerServices;
	});

	return partnerModules.filter((module) => module.services.length > 0);
};

export const getServiceComponent = ({ modulename, servicename }) => {
	const partnerModules = JSON.parse(JSON.stringify(modules));
	const module = partnerModules.find((module) => module.name === modulename);
	if (!module) throw new Error(`Invalid module ${modulename}`);
	const service = module.services.find((service) => service.name === servicename);
	if (!service) throw new Error(`Invalid service ${servicename}`);
	return service.component;
};

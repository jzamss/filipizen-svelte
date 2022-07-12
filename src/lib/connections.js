const cloud_server_ip = import.meta.env.VITE_CLOUD_SERVER_IP || process.env.cloud_server_ip;

const cloud_filipizen_server_host =
	import.meta.env.VITE_CLOUD_FILIPIZEN_SERVER_HOST || process.env.cloud_filipizen_server_host;

const cloud_gdx_node_host =
	import.meta.env.VITE_CLOUD_GDX_NODE_HOST || process.env.cloud_gdx_node_host;

const cloud_proxy_server_host =
	import.meta.env.VITE_CLOUD_PROXY_SERVER_HOST || process.env.cloud_proxy_server_host;

const cloudFilipizenServerHost = cloud_filipizen_server_host;
const cloudGdxNodeServerHost = cloud_gdx_node_host;
const cloudProxyServerHost = cloud_proxy_server_host;

console.log('cloud_server_ip: ', cloud_server_ip);
console.log('cloudFilipizenServerHost', cloudFilipizenServerHost);
console.log('cloudGdxNodeServerHost', cloudGdxNodeServerHost);
console.log('cloudProxyServerHost', cloudProxyServerHost);

const connections = {
	cloud_server_ip,
	cloudFilipizenServerHost,
	cloudGdxNodeServerHost,
	cloudProxyServerHost,

	default: {
		'app.host': `${cloud_server_ip}:9070`,
		'app.cluster': 'osiris3',
		'app.context': 'gdx',
		handler: 'script',
		readTimeout: 60000
	},

	partner: {
		'app.host': `${cloud_server_ip}:9071`,
		'app.cluster': 'osiris3',
		'app.context': 'enterprise',
		handler: 'script',
		readTimeout: 60000
	},

	epayment: {
		'app.host': `${cloud_server_ip}:9072`,
		'app.cluster': 'osiris3',
		'app.context': 'enterprise',
		handler: 'script',
		readTimeout: 60000
	},

	bpls: {
		'app.host': `${cloud_server_ip}:10002`,
		'app.cluster': 'osiris3',
		'app.context': 'enterprise',
		handler: 'script',
		readTimeout: 60000
	},

	gdx: {
		'app.host': `${cloud_server_ip}:3000`
	},

	obo: {
		'app.host': `${cloud_server_ip}:10001`,
		'app.cluster': 'osiris3',
		'app.context': 'enterprise',
		handler: 'script',
		readTimeout: 60000
	}
};

export default connections;

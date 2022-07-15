const cloud_server_ip = process.env.cloud_server_ip || import.meta.env.VITE_CLOUD_SERVER_IP;

const cloud_gdx_node_host =
	process.env.cloud_gdx_node_host || import.meta.env.VITE_CLOUD_GDX_NODE_HOST;

console.log('cloud_server_ip: ', cloud_server_ip);
console.log('cloud_gdx_node_host', cloud_gdx_node_host);

const connections = {
	cloud_server_ip,
	cloudGdxNodeHost: cloud_gdx_node_host,

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

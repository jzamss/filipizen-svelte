const CLOUD_FILIPIZEN_SERVER_IP =
	import.meta.env.VITE_CLOUD_FILIPIZEN_SERVER_IP || '172.28.222.202:5000';

const CLOUD_GDX_NODE_IP = import.meta.env.VITE_CLOUD_GDX_NODE_IP || '172.28.222.202:3000';

export const cloudFilipizenServerUrl = `http://${CLOUD_FILIPIZEN_SERVER_IP}`;
export const cloudGdxNodeServerIp = CLOUD_GDX_NODE_IP;

import { Manager } from 'socket.io-client';
import { cloudGdxNodeServerIp } from '$lib/settings.js';

const CHANNEL = '/gdx';

const manager = new Manager(cloudGdxNodeServerIp, {
	reconnectionDelayMax: 5000
});

const socket = manager.socket(CHANNEL);
console.log('socket', socket);

export const getNotification = () => {
	const nsps = { '/gdx': [] };

	const register = (event, handler, nsp = '/gdx') => {
		socket.on(event, (data) => {
			handler(data);
		});

		const sockets = nsps[nsp];
		if (sockets === undefined) {
			nsps[nsp] = [socket];
		} else {
			nsps[nsp].push(socket);
		}
		return socket;
	};

	const emit = (event, data, callback, nsp = '/gdx') => {
		socket.emit(event, data, callback);
	};

	return { register, emit };
};

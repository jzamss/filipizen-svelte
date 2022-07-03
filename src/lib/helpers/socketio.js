import ioClient from 'socket.io-client';
const ENDPOINT = 'http://172.28.222.202:3000';

const socket = ioClient(ENDPOINT);
export const io = socket;

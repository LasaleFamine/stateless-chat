'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const {api, client} = require('./../routes');

const handleError = err => {
	if (err) {
		throw err;
	}
};

const server = new Hapi.Server();

server.connection({
	port: process.env.PORT || 3000,
	routes: {cors: true}
});

/* eslint-disable import/order */
const io = require('socket.io')(server.listener);

io.on('connection', socket => {
	console.log('a user connected');
	const connectedUsers = Object.keys(io.sockets.sockets);
	socket.broadcast.emit('connectedUser', {connectedUsers});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('chatMessage', msg => io.emit('chatMessage', msg));
});

server.register([Inert], err => {
	handleError(err);
	server.route(api);
	server.route(client);

	server.start(err => {
		handleError(err);
		console.log(`Server running at: ${server.info.uri}`);
	});
});

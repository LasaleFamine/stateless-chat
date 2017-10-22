'use strict';

const createPath = route => '/api/v1/' + route;

module.exports = [
	{
		path: createPath('test'),
		method: 'GET',
		handler: (request, reply) => {
			reply('hello');
		}
	}
];

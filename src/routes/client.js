'use strict';

const {normalize} = require('path');

const createPath = route => `${__dirname}/../client/${route}`;

module.exports = [
	{
		path: '/',
		method: 'GET',
		handler: (request, reply) => {
			reply.file(createPath('index.html'));
		}
	}, {
		path: '/static/{param*}',
		method: 'GET',
		handler: {
			directory: {
				path: normalize(createPath('static'))
			}
		}
	}
];

const path = require('path');
const resolve = (...paths) => path.resolve(__dirname, ...paths);

const src = './app/src';
const dist = '/tmp/isotop';

module.exports = {
	'presets': [
		[
			'@babel/preset-env',
			{
				'targets': {
					'esmodules': true,
					'chrome': '58'
				}
			}
		]
	],
	'plugins': [
		['module-resolver', {
			'root': [
				resolve(`${src}`)
			],
			'alias': {
				'@src': resolve(`${src}`),
				'@components': resolve(`${src}/components`),
				'@lib': resolve(`${src}/library`)
			}
		}],
		'wildcard'
	]
};

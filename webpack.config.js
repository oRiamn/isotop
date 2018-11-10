/* eslint-disable no-undef */
const path = require('path');
const resolve = (...paths) => path.resolve(__dirname, ...paths);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const src = './app/src';
const dist = './app/dist';

module.exports = {
	entry: [`${src}/app-root/app-root.js`],
	mode: 'production',
	output: {
		path: resolve(`${dist}`),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, `${src}`),
			'@html': path.resolve(__dirname, `${src}/html`),
			'@lib': path.resolve(__dirname, `${src}/library`),
			'@img': path.resolve(__dirname, `${src}/img`),
			'@icons': path.resolve(__dirname, `${src}/img/icons`),
			'@sass': path.resolve(__dirname, `${src}/sass`)
		}
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract(
				{
					use: [
						{ loader: 'css-loader', options: { sourceMap: true } },
						{ loader: 'postcss-loader', 
							options: { 
								sourceMap: true,
								ident: 'postcss',
								plugins: [
									require('autoprefixer')({
										browsers: ['last 1 Electron version']
									})
								] 
							}
						},
						{ loader: 'sass-loader', options: { sourceMap: true } }
					]
				}
			)
		},
		{
			test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|waw)(\?.*)?$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: 'files/[hash].[ext]'
					}
				}
			]
		},
		{
			test: /\.html$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: 'html/[name].html'
					}
				},
				{
					loader: 'extract-loader',
					options: {
						publicPath: '.'
					}
				},
				{
					loader: 'html-loader',
					options: {
						basedir: resolve(`${src}`),
						attrs: [
							'img:src',
							'a:href'
						],
						root: resolve(`${src}`)
					}
				}
			]
		},
		{
			test: /\.pug$/,
			use: [
				{
					loader: 'html-loader',
					options: {
						basedir: resolve(`${src}`),
						attrs: [
							'img:src',
							'a:href'
						],
						root: resolve(`${src}`)
					}
				},
				{
					loader: 'pug-html-loader',
					options: {
						basedir: resolve(`${src}`),
						pretty: true,
						data: {
							title: 'test page'
						}
					}
				}
			]
		}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css'
		}),
		new HTMLWebpackPlugin({
			template: resolve(`${src}/index.html`)
		})
	]
};

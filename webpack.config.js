const path = require('path');
const resolve = (...paths) => path.resolve(__dirname, ...paths);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const src = './app/src';
const dist = '/tmp/isotop';

module.exports = {
	entry: [`${src}/webpack-bundle.js`],
	mode: 'production',
	output: {
		path: resolve(`${dist}`),
		filename: 'bundle.js',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		library: 'isotop',
		libraryExport: 'default'
	},
	devtool: 'source-map',
	resolve: {
		alias: {
			'@src': resolve(`${src}`),
			'@components': resolve(`${src}/components`),
			'@lib': resolve(`${src}/library`)
		}
	},
	module: {
		rules: [
			{
				test: /\*?\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-env']
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract(
					{
						use: [
							{ loader: 'css-loader', options: { sourceMap: true } },
							{
								loader: 'postcss-loader',
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

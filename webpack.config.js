/* eslint-disable no-undef */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src = './app/src';
const dist = './app/dist';

module.exports = {
	entry: [`${src}/js/main.js`],
	mode: 'production',
	output: {
		path: path.resolve(__dirname, `${dist}`),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
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
		}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css'
		}),
	]
};

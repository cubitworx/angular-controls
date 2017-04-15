var fs  = require('fs');
var webpack = require('webpack');
var helpers = require('./helpers');
var webpackLib = require('./webpack.lib');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const extractVendorStyles = new ExtractTextPlugin('[name].bundle.css');
const pkg = JSON.parse( fs.readFileSync('./package.json').toString() );
const METADATA = {
	title: pkg.name,
	description: pkg.description,
	baseUrl: '/',
	isDevServer: helpers.isWebpackDevServer()
};

module.exports = webpackMerge(
	webpackLib.angularWorkaround,
	webpackLib.imageLoader,
	{

		resolve: {
			extensions: ['.ts', '.js']
		},

		module: {
			rules: [
				{
					test: /\.html$/,
					use: 'html-loader'
				},
				{
					test: /\.css$/,
					use: ['to-string-loader', 'css-loader'],
					include: /\.component\.css$/
				},
				{
					test: /\.css$/,
					use: ['css-loader'],
					include: helpers.root('src', 'app'),
					exclude: /\.component\.css$/
				},
				{
					test: /\.css$/,
					use: extractVendorStyles.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					}),
					include: /vendor\.css$/
				},
				{
					test: /\.scss$/,
					use: ['to-string-loader', 'css-loader', 'sass-loader'],
					include: /\.component\.scss$/
				},
				{
					test: /\.scss$/,
					use: ['css-loader', 'sass-loader'],
					include: helpers.root('src', 'app'),
					exclude: /\.component\.scss$/
				},
				{
					test: /\.scss$/,
					use: extractVendorStyles.extract({
						fallback: 'style-loader',
						use: [ 'css-loader', 'sass-loader' ]
					}),
					include: /vendor\.scss$/
				}
			]
		},

		plugins: [

			extractVendorStyles,

			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify( process.env.NODE_ENV )
				}
			}),

			// Explicit polyfills chunk since they don't need to be imported via code
			new webpack.optimize.CommonsChunkPlugin({
				name: 'polyfills',
				chunks: ['polyfills']
			}),

			// Implicit common vendor chunk enables tree shaking of the vendor modules
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				chunks: ['app', 'module', 'vendor'],
				minChunks: module => /node_modules/.test(module.resource)
			}),

			// Specify the correct order the scripts will be injected in
			new webpack.optimize.CommonsChunkPlugin({
				names: ['polyfills', 'vendor'].reverse()
			})

		]

	}
);

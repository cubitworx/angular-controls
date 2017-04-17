var fs  = require('fs');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var helpers = require('./helpers');
var webpackLib = require('./webpack.lib.js');

const pkg = JSON.parse( fs.readFileSync('./package.json').toString() );
const METADATA = {
	title: pkg.name,
	description: pkg.description,
	baseUrl: '/',
	isDevServer: helpers.isWebpackDevServer()
};

module.exports = webpackMerge(
	webpackLib.angularWorkaround,
	webpackLib.defaultDefinePlugin,
	webpackLib.imageLoader,
	webpackLib.resolveTypescript,
	webpackLib.stylesExtracted,
	{

		devtool: 'cheap-module-eval-source-map',

		entry: {
			'polyfills': './src/demo/polyfills.ts',
			'vendor.scss': './src/demo/vendor.scss.ts',
			'app': './src/demo/main.ts'
		},

		output: {
			path: helpers.root('demo'),
			publicPath: '/',
			filename: '[name].bundle.js',
			chunkFilename: '[id].chunk.js'
		},

		module: {
			rules: [

				{
					test: /\.ts$/,
					use: [ 'awesome-typescript-loader', 'angular2-template-loader' ]
				},

				{
					test: /\.html$/,
					use: 'html-loader',
					exclude: /index\.html$/
				}

			]
		},

		plugins: [

			// Explicit polyfills chunk since they don't need to be imported via code
			new webpack.optimize.CommonsChunkPlugin({
				name: 'polyfills',
				chunks: ['polyfills']
			}),

			// Implicit common vendor chunk enables tree shaking of the vendor modules
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				chunks: ['app'],
				minChunks: module => /node_modules/.test(module.resource)
			}),

			// Specify the correct order the scripts will be injected in
			new webpack.optimize.CommonsChunkPlugin({
				names: ['polyfills', 'vendor'].reverse()
			}),

			new HtmlWebpackPlugin({
				template: 'src/demo/index.html',
				chunksSortMode: 'dependency',
				metadata: METADATA,
				inject: 'body'
			})

		],

		devServer: {
			historyApiFallback: true,
			stats: 'minimal'
		}

	}
);

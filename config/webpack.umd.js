var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var helpers = require('./helpers');
var webpackLib = require('./webpack.lib');

module.exports = webpackMerge(
	webpackLib.angularWorkaround,
	webpackLib.imageLoader,
	{

		devtool: 'source-map',

		resolve: {
			extensions: ['.ts', '.js']
		},

		entry: {
			'module': './src/index.ts',
			'module.min': './src/index.ts'
		},

		output: {
			path: helpers.root('dist', 'umd'),
			filename: "[name].js",
			library: "angular-controls",
			libraryTarget: "umd",
			umdNamedDefine: true
		},

		module: {
			rules: [
				{
					test: /\.js$/,
					use: 'null-loader',
					include: /node_modules/
				},
				{
					test: /\.ts$/,
					use: [
						{
							loader: 'awesome-typescript-loader',
							options: {
								declaration: false,
								configFileName: helpers.root('tsconfig-dist.json')
							}
						},
						'angular2-template-loader'
					],
					exclude: /node_modules/
				},
				{
					test: /\.html$/,
					use: [ 'html-loader' ]
				},
				{
					test: /\.css$/,
					use: ['to-string-loader', 'css-loader'],
					include: /\.component\.css$/
				},
				{
					test: /\.css$/,
					use: ['css-loader'],
					exclude: /\.component\.css$/
				},
				{
					test: /\.scss$/,
					use: ['to-string-loader', 'css-loader', 'sass-loader'],
					include: /\.component\.scss$/
				},
				{
					test: /\.scss$/,
					use: ['css-loader', 'sass-loader'],
					exclude: /\.component\.scss$/
				}
			]
		},

		plugins: [

			new webpack.NoEmitOnErrorsPlugin(),

			// @link https://github.com/angular/angular/issues/10618
			new webpack.optimize.UglifyJsPlugin({
				include: /\.min\.js$/,
				mangle: {
					keep_fnames: true
				},
				minimize: true,
				sourceMap: true
			}),

			// @link https://github.com/webpack-contrib/html-loader/issues/50
			new webpack.LoaderOptionsPlugin({
				debug: true,
				htmlLoader: {
					minimize: false
				}
			})

		]

	}
);

var webpack = require('webpack');
var helpers = require('./helpers');
var webpackLib = require('./webpack.lib');

module.exports = webpackMerge(
	webpackLib.angularWorkaround,
	{

		devtool: 'inline-source-map',

		resolve: {
			extensions: ['.ts', '.js']
		},

		module: {
			rules: [
				{
					test: /\.ts$/,
					use: [
						{
							loader: 'awesome-typescript-loader',
							options: { configFileName: helpers.root('tsconfig-dist.json') }
						}, 'angular2-template-loader'
					]
				},
				{
					test: /\.html$/,
					use: 'html-loader'
				},
				{
					test: /\.css$/,
					use: 'null-loader'
				},
				{
					test: /\.scss$/,
					use: 'null-loader'
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/,
					use: 'null-loader'
				},
				{
					test: /\.(woff|woff2|ttf|eot|ico)$/,
					use: 'null-loader'
				}
			]
		}

	}
);

var webpack = require('webpack');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractVendorStyles = new ExtractTextPlugin('[name].bundle.css');

module.exports = {

	angularWorkaround: {

		plugins: [

			// Workaround for angular/angular#11580
			new webpack.ContextReplacementPlugin(
				// The (\\|\/) piece accounts for path separators in *nix and Windows
				/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
				// location of src
				helpers.root('src'),
				// Angular Async Route paths relative to this root directory
				{ }
			),

			new webpack.ContextReplacementPlugin(
				// The (\\|\/) piece accounts for path separators in *nix and Windows
				/angular(\\|\/)core(\\|\/)@angular/,
				// location of src
				helpers.root('src'),
				// Angular Async Route paths relative to this root directory
				{ }
			)

		]

	},

	defaultDefinePlugin: {

		plugins: [

			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify( process.env.NODE_ENV )
				}
			}),

		]

	},

	imageLoader: {

		module: {
			rules: [

				{
					test: /\.(png|jpe?g|gif|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: (path) => {
									if (! /node_modules/.test(path)) {
										return 'images/[name].[ext]?[hash]';
									}

									return 'vendor/' + path
										.replace(/\\/g, '/')
										.replace(
												/((.*node_modules)|images|image|img|assets)\//g, ''
										) + '?[hash]';
								}
							}
						},
						'img-loader'
					]
				},
				{
					test: /\.(ico)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'images/[name].[ext]?[hash]'
							}
						}
					]
				},
				{
					test: /\.(woff|woff2|ttf|eot)$/,
					use: {
						loader: 'file-loader',
						options: {
							name: (path) => {
								if (! /node_modules/.test(path)) {
									return 'fonts/[name].[ext]?[hash]';
								}

								return 'vendor/' + path
									.replace(/\\/g, '/')
									.replace(
											/((.*node_modules)|images|image|img|assets)\//g, ''
									) + '?[hash]';
							}
						}
					}
				}

			]
		}

	},

	resolveTypescript: {

		resolve: {
			extensions: ['.ts', '.js']
		}

	},

	stylesExtracted: {

		module: {
			rules: [
				{
					test: /\.css$/,
					use: ['to-string-loader', 'css-loader'],
					include: /\.component\.css$/
				},
				{
					test: /\.css$/,
					use: ['css-loader'],
					exclude: [ /node_modules/, /\.component\.css$/ ]
				},
				{
					test: /\.css$/,
					use: extractVendorStyles.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					}),
					include: /node_modules/
				},
				{
					test: /\.scss$/,
					use: ['to-string-loader', 'css-loader', 'sass-loader'],
					include: /\.component\.scss$/
				},
				{
					test: /\.scss$/,
					use: ['css-loader', 'sass-loader'],
					exclude: [ /node_modules/, /\.component\.scss$/ ]
				},
				{
					test: /\.scss$/,
					use: extractVendorStyles.extract({
						fallback: 'style-loader',
						use: [ 'css-loader', 'sass-loader' ]
					}),
					include: /node_modules/
				}
			]
		},

		plugins: [

			extractVendorStyles

		]

	}

};

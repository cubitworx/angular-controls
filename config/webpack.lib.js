var webpack = require('webpack');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractAppStyles = new ExtractTextPlugin('app.bundle.css');
const extractVendorStyles = new ExtractTextPlugin('vendor.bundle.css');

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

	stylesExtracted_old: {

		module: {
			rules: [
				{
					test: /\.scss$/,
					use: ['to-string-loader', 'css-loader', 'sass-loader'],
					include: /\.component\.scss$/,
					exclude: helpers.root('node_modules')
				},
				{
					test: /\.scss$/,
					// use: [ 'style-loader', 'css-loader', 'sass-loader' ],
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader!sass-loader'
					}),
					exclude: /\.component\.scss$/
				}
			]
		},

		plugins: [
			new ExtractTextPlugin('[name].bundle.[chunkhash].css')
		]

	},

	stylesExtracted: {

		module: {
			rules: [

				// App components
				{
					test: /\.css$/,
					use: ['to-string-loader', 'css-loader'],
					include: /\.component\.css$/
				},
				{
					test: /\.scss$/,
					use: ['to-string-loader', 'css-loader', 'sass-loader'],
					include: /\.component\.scss$/
				},

				// App non-components
				{
					test: /\.css$/,
					// use: 'css-loader',
					use: extractAppStyles.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					}),
					include: helpers.root('src'),
					exclude: /\.component\.css$/
				},
				{
					test: /\.scss$/,
					use: [ 'css-loader', 'sass-loader' ],
					use: extractAppStyles.extract({
						fallback: 'style-loader',
						use: [ 'css-loader', 'sass-loader' ]
					}),
					include: helpers.root('src'),
					exclude: [
						/\.component\.scss$/,
						/vendor\.scss$/
					]
				},

				// Vendor
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
					// use: 'null-loader',
					use: extractVendorStyles.extract({
						fallback: 'style-loader',
						use: [ 'css-loader', 'sass-loader' ]
					}),
					include: /vendor\.scss$/
				}

			]
		},

		plugins: [
			extractAppStyles,
			extractVendorStyles
		]

	}

};

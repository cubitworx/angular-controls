var webpack = require('webpack');
var helpers = require('./helpers');

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

	}

};

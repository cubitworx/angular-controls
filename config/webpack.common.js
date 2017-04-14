var fs  = require('fs');
var webpack = require('webpack');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const extractVendorStyles = new ExtractTextPlugin('styles/vendor-[name]-one.css');
const pkg = JSON.parse( fs.readFileSync('./package.json').toString() );
const METADATA = {
	title: pkg.name,
	description: pkg.description,
	baseUrl: '/',
	isDevServer: helpers.isWebpackDevServer()
};

module.exports = {

  entry: {
    'app': './src/demo/main.ts',
    'module': './src/module.ts',
    'polyfills': './src/demo/polyfills.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
				exclude: /index\.html$/
      },
			{
				test: /\.css$/,
				use: ['to-string-loader', 'css-loader'],
				include: /\.component\.css$/
			},
			{
				test: /\.css$/,
				use: ['css-loader'],
        include: helpers.root('src'),
				exclude: /\.component\.css$/
			},
			{
				test: /\.css$/,
				use: extractVendorStyles.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				}),
        exclude: helpers.root('src')
			},
			{
				test: /\.scss$/,
				use: ['to-string-loader', 'css-loader', 'sass-loader'],
				include: /\.component\.scss$/
			},
			{
				test: /\.scss$/,
				use: ['to-string-loader', 'css-loader', 'sass-loader'],
        include: helpers.root('src'),
				exclude: /\.component\.scss$/
			},
			{
				test: /\.scss$/,
				use: extractVendorStyles.extract({
					fallback: 'style-loader',
					use: 'css-loader!sass-loader'
				}),
        exclude: helpers.root('src')
			},
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
  },

  plugins: [

    extractVendorStyles,

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify( process.env.NODE_ENV )
			}
		}),

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
    ),

		// Explicit polyfills chunk since they don't need to be imported via code
		new webpack.optimize.CommonsChunkPlugin({
			name: 'polyfills',
			chunks: ['polyfills']
		}),

		// Implicit common vendor chunk enables tree shaking of the vendor modules
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			chunks: ['app', 'module'],
			minChunks: module => /node_modules/.test(module.resource)
		}),

		// Specify the correct order the scripts will be injected in
		new webpack.optimize.CommonsChunkPlugin({
			names: ['polyfills', 'vendor'].reverse()
		}),

		new HtmlWebpackPlugin({
			template: './src/demo/index.html',
			chunksSortMode: 'dependency',
			metadata: METADATA,
			inject: 'body'
		})

  ]

};

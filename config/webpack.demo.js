var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {

  devtool: 'cheap-module-eval-source-map',

  entry: {
    'app': './src/demo/main.ts',
    'module': './src/module.ts',
    'polyfills': './src/demo/polyfills.ts',
    'vendor': './src/demo/vendor.ts'
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
      }
		]
	},

  plugins: [

		new HtmlWebpackPlugin({
			template: '!!html-loader!src/demo/index.html',
			chunksSortMode: 'dependency',
			metadata: METADATA,
			inject: 'body'
		})

	],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },

});

/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: './index.js',
  output: {
		path: path.join(__dirname, 'dist'),
		filename: '[chunkhash].js',
	},
	resolve: {
		extensions: ['', '.js'],
	},
	module: {
		loaders: [{
  		test: /\.jsx?$/,
  		exclude: /node_modules/,
  		loaders: ['babel'],
    }],
	},
	plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new CleanPlugin(['dist'], { verbose: false }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	]
};

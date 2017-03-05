/**
 * @file webpack.browser.dev.js
 *
 * Webpack configuration for browser web app in development environment.
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./webpack.browser.base');

module.exports = merge.smart(base, {
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../../app/app.js'),
  ],

  // don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: /app/,
        exclude: [/node_modules/],
        query: {
          plugins: [
            'lodash',
            'transform-decorators-legacy',
          ],
          compact: 'auto',
          cacheDirectory: true,
          // enable babel hot module reloading
          presets: ['react-hmre'],
        },
      },
    ],
  },

  plugins: [
    // enable webpack hot reloading
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true,
    }),
  ],

  devtool: 'inline-source-map',
});

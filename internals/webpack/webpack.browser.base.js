/**
 * @file webpack.browser.base.js
 *
 * Webpack configuration for browser web app shared across all environments.
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.base');

module.exports = merge(base, {
  entry: [
    'console-polyfill',
    'babel-polyfill',
    'whatwg-fetch',
  ],

  output: {
    path: path.resolve(__dirname, '../../build'),
    publicPath: '/',
  },

  // Some node_modules pull in Node-specific dependencies.
  // Since we're running in a browser we have to stub them out. See:
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  // https://github.com/webpack/jade-loader/issues/8#issuecomment-55568520
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  target: 'web',
});

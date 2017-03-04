/**
 * @file webpack.browser.test.js
 *
 * Webpack configuration for browser web app in test environment.
 *
 */

const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.browser.base');

module.exports = merge.smart(base, {
  module: {
    noParse: [
      /node_modules(\\|\/)sinon/,
      /node_modules(\\|\/)acorn/,
    ],

    loaders: [
      {
        test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        loader: 'imports?define=>false,require=>false',
      },

      {
        test: /\.s?css$/,
        loader: 'null-loader',
      },

      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'null-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        DEBUG_CACHE: JSON.stringify('true'),
      },
    }),
  ],

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

  // required for enzyme to work properly
  externals: {
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  },

  devtool: 'inline-source-map',
});

// console.dir(module.exports, { depth: null, colors: true })

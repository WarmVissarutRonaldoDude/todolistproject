/**
 * @file webpack.browser.prod.js
 *
 * Webpack configuration for browser web app in production environment.
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const base = require('./webpack.browser.base');

module.exports = merge.smart(base, {
  entry: [
    path.resolve(__dirname, '../../app/app.js'),
  ],

  // enable long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: /app/,
        exclude: [/node_modules/],
        query: {
          presets: [
            'es2015',
            'react',
            'stage-0',
          ],
          plugins: [
            'unassert',
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-inline-elements',
            'lodash',
            'add-module-exports',
            'transform-es2015-arrow-functions',
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-object-assign',
            [
              'transform-es2015-classes',
              {
                loose: true,
              },
            ],
          ],
        },
      },

      {
        test: /\.s?css$/,
        include: [/components/, /pages/, /layouts/, /containers/],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[local]__[path][name]__[hash:base64:5]!postcss-loader!sass-loader',
        }),
      },
    ],
  },

  plugins: [
    // helps with long-term caching (http://mxs.is/googmv)
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // // merge duplicate modules
    new webpack.optimize.DedupePlugin(),

    // // minify and optimize js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    // minify and optimize index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    // extract css into a seperate file
    new ExtractTextPlugin('[name].[contenthash].css'),
  ],
});

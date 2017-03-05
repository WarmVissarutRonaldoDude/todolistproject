/**
 * @file webpack.base.js
 *
 */

try {
  require('dotenv').load();
} catch (error) {
  console.log('error load dot env', error);
}

const path = require('path');
const webpack = require('webpack');

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// postcss plugins
const postcssNext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: /app/,
        exclude: [/node_modules/],
        query: {
          compact: false,
          presets: [
            'es2015',
            'react',
            'stage-0',
          ],
          plugins: [
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
        loader: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader!sass-loader',
      },

      {
        test: /\.s?css$/,
        include: [/node_modules/],
        loaders: ['style-loader', 'css-loader'],
      },

      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      },

      {
        test: /\.json$/,
        loader: 'json-loader',
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      {
        test: /\.mp3$/,
        loader: 'url-loader',
      },
    ],
  },

  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    root: path.resolve(path.join(__dirname), '../../app'),
  },

  plugins: [
    new webpack.NoErrorsPlugin(),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new LodashModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BLUEBIRD_LONG_STACK_TRACES': JSON.stringify(0),
      'process.env.BLUEBIRD_DEBUG': JSON.stringify(0),
      'process.env.PORT': JSON.stringify(process.env.PORT),
    }),
  ],

  progress: true,

  stats: false,

  postcss: [
    postcssFocus(), // add a :focus to every :hover
    postcssNext({ // allow future css features to be used, also auto-prefixes the css
      browsers: ['last 2 versions', 'IE >= 10'], // ...based on this browser list
    }),
    postcssReporter({ // posts messages from plugins to the terminal
      clearMessages: true,
    }),
  ],
};

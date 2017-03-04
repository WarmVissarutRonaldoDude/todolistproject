const compression = require('compression');
const express = require('express');
const path = require('path');
const fs = require('fs');

// dev middleware
const addDevMiddlewares = (app, options) => {
  // This require is for dev mode only so we disable eslint here
  const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require
  const DashboardPlugin = require('webpack-dashboard/plugin'); // eslint-disable-line global-require
  const webpack = require('webpack'); // eslint-disable-line global-require

  app.use('/public', express.static(path.join(__dirname, '../app/public/')));

  const compiler = webpack(options);
  compiler.apply(new DashboardPlugin());

  const middleware = webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: options.output.publicPath,
    silent: false,
    stats: {
      colors: true,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const mfs = middleware.fileSystem;

  app.get('*', (req, res) => {
    const file = mfs.readFileSync(path.join(compiler.outputPath, 'index.html'));
    res.set({ 'Cache-Control': 'no-cache' });
    res.send(file.toString());
  });
};

// production middleware
const addProdMiddlewares = (app, options) => {
  app.use(compression());
  app.use('/public', express.static(path.join(__dirname, '../app/public/')));

  app.use(options.output.publicPath, express.static(options.output.path));

  app.get('*', (req, res) => {
    res.set({ 'Cache-Control': 'no-cache' });
    res.sendFile(path.join(options.output.path, 'index.html'));
  });
};

/**
 * Front-end middleware
 */
module.exports = (options) => {
  const isProd = process.env.NODE_ENV === 'production';
  const app = express();

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    addDevMiddlewares(app, options);
  }

  return app;
};

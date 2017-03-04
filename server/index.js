require('dotenv').load();

const express = require('express');
const cors = require('cors');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const logger = require('./logger');

const middleware = require('./middleware');
const isDev = (process.env.NODE_ENV !== 'production');

const app = express();
app.use(cors());

if (app.get('prod')) {
  app.use(morgan());
} else {
  app.use(errorhandler());
  app.use(morgan('dev'));
}

// initialize middleware that will serve your JS app
const webpackConfig = isDev
  ? require('../internals/webpack/webpack.browser.dev')
  : require('../internals/webpack/webpack.browser.prod');

app.use(middleware(webpackConfig));

const port = process.env.PORT || 3000;

// start the server
app.listen(port, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }

  console.log(`Express listening at localhost:${port}`);

  logger.appStarted(port);
});

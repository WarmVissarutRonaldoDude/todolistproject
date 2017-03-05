/**
 * app.js
 *
 * React application entry point.
 */

// initialize react app
import App from 'containers/App';

// third-party dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// manually load index.html dependencies that won't be picked up by webpack
import 'file?name=[name].[ext]!./public/favicon.ico';
import 'file?name=[name].[ext]!./public/.htaccess'; // eslint-disable-line import/extensions

import './global-styles';

ReactDOM.render(<App />, document.getElementById('app'));

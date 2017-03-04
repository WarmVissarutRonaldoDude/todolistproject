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
import bowser from 'bowser';

// manually load index.html dependencies that won't be picked up by webpack
import 'file?name=[name].[ext]!./public/favicon.ico';
import 'file?name=[name].[ext]!./public/.htaccess'; // eslint-disable-line import/extensions

import './global-styles';

console.log('-'.repeat(80));
console.log('Browser', bowser.name, bowser.version);
console.log('-'.repeat(80));

ReactDOM.render(<App />, document.getElementById('app'));

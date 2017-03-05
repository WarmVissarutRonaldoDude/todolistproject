/**
 * @class App
 *
 * Top Layer of App
 *
 */

import React, { Component, PropTypes } from 'react';

import {
  Router,
  Route,
  IndexRedirect,
  browserHistory,
} from 'react-router';

// default material-ui theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// routes
import TodoDetail from 'pages/TodoDetail';
import Error404 from 'pages/Error404';
import Home from 'pages/Home';
import LayoutRoot from 'layouts/LayoutRoot';
import StoreManager from 'store/StoreManager';

import Theme from './theme';

// needed for onTouchTap (http://stackoverflow.com/a/34015469/988941)
import injectTapEventPlugin from 'react-tap-event-plugin'; // eslint-disable-line import/first
try { injectTapEventPlugin(); } catch (e) { } // eslint-disable-line no-empty

export default class App extends Component {

  static childContextTypes = {
    store: PropTypes.object,
    muiTheme: PropTypes.object,
  }

  getChildContext() {
    return {
      store: StoreManager,
      muiTheme: Theme,
    };
  }

  onRouteUpdate = () => {
    window.scrollTo(0, 0);
  }

  renderRoute() {
    return (
      <Router
        history={browserHistory}
        onUpdate={this.onRouteUpdate}
      >
        <Route path="/" component={LayoutRoot}>
          <IndexRedirect to="Home" />
          <Route path="Home" component={Home} />
          <Route path="TodoDetail/:todoID" component={TodoDetail} />
          <Route path="*" component={Error404} />
        </Route>
      </Router>
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={Theme}>
        <div>
          {this.renderRoute()}
        </div>
      </MuiThemeProvider>
    );
  }
}

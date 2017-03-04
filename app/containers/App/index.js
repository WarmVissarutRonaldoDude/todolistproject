/**
 * @class App
 *
 * This component bootstraps the top-level React application.
 *
 */

import React, { Component, PropTypes } from 'react';

import {
  Router,
  Route,
  Redirect,
  IndexRoute,
  IndexRedirect,
  browserHistory,
} from 'react-router';

// default material-ui theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

// routes
import Error404 from 'pages/Error404';
import Home from 'pages/Home';
import LayoutRoot from 'layouts/LayoutRoot';

import DocumentTitle from 'react-document-title';

import Theme from './theme';

import _ from 'lodash';

// needed for onTouchTap (http://stackoverflow.com/a/34015469/988941)
import injectTapEventPlugin from 'react-tap-event-plugin'; // eslint-disable-line import/first
try { injectTapEventPlugin(); } catch (e) { } // eslint-disable-line no-empty

export default class App extends Component {

//   static childContextTypes = {
//     NotificationManager: PropTypes.object,
//     ConnectionManager: PropTypes.object,
//     AppVisibility: PropTypes.object,
//     EventManager: PropTypes.object,
//     ImageUtils: PropTypes.object,
//     ReactGA: PropTypes.object,
//     muiTheme: PropTypes.object,
//     client: PropTypes.object,
//     store: PropTypes.object,
//     debug: PropTypes.func,
//     getRoute: PropTypes.func,
//     appVersion: PropTypes.string,
//     EkoVoip: PropTypes.object,
//     FeatureControl: PropTypes.object,
//     ClientUtil: PropTypes.object,
//     ServiceWorkerHandler: PropTypes.object,
//     WindowsDispatcher: PropTypes.object,
//   }

//   // NOTE: anything which mobx should reactively depend on should be part of this
//   // component's state, which is why ConnectionManager and NotificationManager are
//   // here even though they're globally accessible as singletons.
//   state = {
//     ConnectionManager,
//     NotificationManager,
//     EventManager,
//     imageUtils: ImageUtils,
//     ReactGA,
//     muiTheme: EkoTheme,
//     client: EkoClientProxy,
//     store: new EkoStore(EkoClientProxy),
//     pushManager: new EkoPushManager(ConnectionManager),
//     AppVisibility,
//     ekoVoip: new EkoVoipProxy({ client: EkoClientProxy, connection: ConnectionManager }),
//     FeatureControl,
//   }

//   getChildContext() {
//     return {
//       ConnectionManager,

//       ServiceWorkerHandler,

//       WindowsDispatcher,

//       AppVisibility,

//       NotificationManager,

//       EventManager,

//       ImageUtils,

//       ReactGA,

//       debug,

//       EkoVoip: this.state.ekoVoip,

//       // global theme
//       muiTheme: this.state.muiTheme,

//       client: this.state.client,

//       store: this.state.store,

//       FeatureControl,

//       ClientUtil,

//       appVersion: process.env.APP_VERSION || version,

//       // utility method to return correct route for a given model
//       getRoute: (model) => {
//         if (model && model._key === 'user') {
//           const currentUser = this.state.client.session.user;
//           const user = model;

//           if (currentUser && user.id === currentUser.id) {
//             return '/profile';
//           }
//           return `/users/${user.id}`;
//         }

//         return '/';
//       },
//     };
//   }

  componentWillMount() {
    // TODO
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

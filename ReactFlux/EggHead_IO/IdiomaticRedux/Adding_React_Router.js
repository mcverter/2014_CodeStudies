
// `Root.js` Before
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

// After

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import {Router, Route, browserHistory} from 'react-router'


const Root = ({ store }) => (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    </Provider>
);

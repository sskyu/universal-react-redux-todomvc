import React from 'react';
import { Router, Route, IndexRoute, browserHistory, createMemoryHistory } from 'react-router';

import AppContainer from '../containers/AppContainer';
import App from '../containers/App';
import Comment from '../containers/Comment';
import NotFound from '../containers/NotFound';

const history = __CLIENT__ ? browserHistory : createMemoryHistory();

export default (
  <Router history={history}>
    <Route path='/' component={AppContainer}>
      <IndexRoute component={App} />
      <Route path='comment' component={Comment} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
);

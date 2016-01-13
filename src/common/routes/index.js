import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { history } from 'history';

import AppContainer from '../containers/AppContainer';
import App from '../containers/App';
import Comment from '../containers/Comment';
import NotFound from '../containers/NotFound';

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={App} />
    <Route path='comment' component={Comment} />
    <Route path='*' component={NotFound} />
  </Route>
);

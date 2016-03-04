import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import Html from '../common/containers/Html';
import { fetchTodos } from '../common/api/todos';

/**
 * get initial state
 * @param  {Object}  params
 * @return {Promise}
 */
function getInitialState(params) {
  if (__CLIENT__) {
    return Promise.resolve({});
  }

  return fetchTodos();
}

/**
 * render initial page
 * @param  {Object} renderProps
 * @param  {Object} params
 * @return {Promise}
 */
export default function (renderProps, params = {}) {
  return getInitialState(params)
    .then(todos => {
      const store = configureStore({ todos });
      const component = (
        <Provider store={store}>
          <RouterContext { ...renderProps} />
        </Provider>
      );

      return '<!doctype html>\n' +
        renderToString(
          <Html
            component={component}
            store={store}
          />
        );
    })
    .catch(e => Promise.reject(e));
};

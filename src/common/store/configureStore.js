import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createMemoryHistory, browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const history = __CLIENT__ ? browserHistory : createMemoryHistory();
  const reduxRouterMiddleware = routerMiddleware(history);

  let middlewares = [
    thunkMiddleware,
    reduxRouterMiddleware
  ];

  if (__DEVELOPMENT__) {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });
    middlewares.push(logger);
  }

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (__DEVELOPMENT__) {
    // for debugging
    window.store = store;
  }

  return store;
}

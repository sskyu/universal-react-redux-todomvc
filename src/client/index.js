import 'babel-polyfill';
import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from '../common/containers/App';
import configureStore from '../common/store/configureStore';
import 'todomvc-app-css/index.css';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

reactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

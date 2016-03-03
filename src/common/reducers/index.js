import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import todos from './todos';

const rootReducer = combineReducers({
  routing: routeReducer,
  todos
});

export default rootReducer;

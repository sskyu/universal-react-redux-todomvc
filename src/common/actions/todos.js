import * as types from '../constants/actionTypes';
import { fetchTodos as fetchTodosApi } from '../api/todos';

export function fetchTodos() {
  return dispatch => fetchTodosApi()
    .then(todos => dispatch({
      type: types.FETCH_TODOS_SUCCESS,
      todos
    }))
    .catch(e => dispatch({
      type: types.FETCH_TODOS_FAILURE
    }));
}

export function addTodo(text) {
  return {
    type: types.ADD_TODO,
    text
  };
}

export function deleteTodo(id) {
  return {
    type: types.DELETE_TODO,
    id
  };
}

export function editTodo(id, text) {
  return {
    type: types.EDIT_TODO,
    id,
    text
  };
}

export function completeTodo(id) {
  return {
    type: types.COMPLETE_TODO,
    id
  };
}

export function completeAll() {
  return {
    type: types.COMPLETE_ALL
  };
}

export function clearCompleted() {
  return {
    type: types.CLEAR_COMPLETED
  }
}

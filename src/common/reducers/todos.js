import * as types from '../constants/actionTypes';

export const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TODOS_SUCCESS:
      const todos = action.todos;
      return [
        ...state,
        ...todos
      ];

    case types.ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ];

    case types.DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case types.EDIT_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, { text: action.text });
        } else {
          return todo;
        }
      });

    case types.COMPLETE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, { completed: !todo.completed });
        } else {
          return todo;
        }
      });

    case types.COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => {
        return Object.assign({}, todo, { completed: !areAllMarked })
      });

    case types.CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    default:
      return state;
  }
};

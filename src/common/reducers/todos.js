import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from '../constants/actionTypes';

const initialState = [
  {
    id: 0,
    completed: true,
    text: 'Use Redux'
  }
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case EDIT_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, { text: action.text });
        } else {
          return todo;
        }
      });

    case COMPLETE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, { completed: !todo.completed });
        } else {
          return todo;
        }
      });

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => {
        return Object.assign({}, todo, { complated: !areAllMarked })
      });

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    default:
      return state;
  }
};

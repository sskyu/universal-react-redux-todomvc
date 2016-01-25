import assert from 'power-assert';
import * as types from '../../src/common/constants/actionTypes';
import * as actions from '../../src/common/actions/todos';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    assert.deepEqual(actions.addTodo('Use Redux'), {
      type: types.ADD_TODO,
      text: 'Use Redux'
    });
  });

  it('deleteTodo should create DELETE_TODO action', () => {
    assert.deepEqual(actions.deleteTodo(1), {
      type: types.DELETE_TODO,
      id: 1
    });
  });

  it('editTodo should create EDIT_TODO action', () => {
    assert.deepEqual(actions.editTodo(1, 'Fix text'), {
      type: types.EDIT_TODO,
      id: 1,
      text: 'Fix text'
    });
  });

  it('completeTodo should create COMPLETE_TODO action', () => {
    assert.deepEqual(actions.completeTodo(1), {
      type: types.COMPLETE_TODO,
      id: 1
    });
  });

  it('completeAll should create COMPLETE_TODO action', () => {
    assert.deepEqual(actions.completeAll(), {
      type: types.COMPLETE_ALL
    });
  });

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    assert.deepEqual(actions.clearCompleted(), {
      type: types.CLEAR_COMPLETED
    });
  });
});

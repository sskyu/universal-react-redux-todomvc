import assert from 'power-assert';
import todos, { initialState } from '../../src/common/reducers/todos.js';
import * as types from '../../src/common/constants/actionTypes';

describe('todos reducer', () => {
  const testState = [
    {
      id: 1,
      completed: true,
      text: 'test state'
    }
  ];

  describe(types.ADD_TODO, () => {
    it('Can add a todo', () => {
      const result = todos(testState, { type: types.ADD_TODO });
      assert(result[1].id === testState[0].id);
      assert(result[1].completed === testState[0].completed);
      assert(result[1].text === testState[0].text);
    });
  });

  describe(types.DELETE_TODO, () => {
    it('');
  });

  describe(types.EDIT_TODO, () => {
    it('');
  });

  describe(types.COMPLETE_TODO, () => {
    it('');
  });

  describe(types.COMPLETE_ALL, () => {
    it('');
  });

  describe(types.CLEAR_COMPLETED, () => {
    it('');
  });
});

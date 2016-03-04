import assert from 'power-assert';
import todos, { initialState } from '../../src/common/reducers/todos.js';
import * as types from '../../src/common/constants/actionTypes';

describe('todos reducer', () => {
  describe('initial state', () => {
    it('should handle initial state', () => {
      const result = todos(undefined, {});
      assert.deepEqual(result, []);
    });
  });

  describe(types.ADD_TODO, () => {
    it('should handle ADD_TODO', () => {
      assert.deepEqual(todos([], {
        type: types.ADD_TODO,
        text: 'test text'
      }), [{
        id: 0,
        completed: false,
        text: 'test text'
      }]);

      assert.deepEqual(todos([{
        id: 0,
        completed: false,
        text: 'Use Redux'
      }], {
        type: types.ADD_TODO,
        text: 'test text'
      }), [
        {
          id: 1,
          completed: false,
          text: 'test text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ]);
    });
  });

  describe(types.DELETE_TODO, () => {
    it('should handle DELETE_TODO', () => {
      const result = todos([
        {
          id: 1,
          completed: false,
          text: 'test text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ], {
        type: types.DELETE_TODO,
        id: 1
      });

      assert.deepEqual(result, [
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ]);
    });
  });

  describe(types.EDIT_TODO, () => {
    it('should handle EDIT_TODO', () => {
      const result = todos([
        {
          id: 1,
          completed: false,
          text: 'test text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ], {
        type: types.EDIT_TODO,
        text: 'Fix todo text',
        id: 1
      });

      assert.deepEqual(result, [
        {
          id: 1,
          completed: false,
          text: 'Fix todo text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ]);
    });
  });

  describe(types.COMPLETE_TODO, () => {
    it('should handle COMPLETE_TODO', () => {
      const result = todos([
        {
          id: 1,
          completed: false,
          text: 'test text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ], {
        type: types.COMPLETE_TODO,
        id: 1
      });

      assert.deepEqual(result, [
        {
          id: 1,
          completed: true,
          text: 'test text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ]);
    });
  });

  describe(types.COMPLETE_ALL, () => {
    it('should handle COMPLETE_ALL', () => {
      const result = todos([
        {
          id: 1,
          completed: true,
          text: 'test text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ], {
        type: types.COMPLETE_ALL
      });

      assert.deepEqual(result, [
        {
          id: 1,
          completed: true,
          text: 'test text'
        },
        {
          id: 0,
          completed: true,
          text: 'Use Redux'
        }
      ]);
    });

    it('should change completed:false when all todos are completed:true', () => {
      const result = todos([
        {
          id: 1,
          completed: true,
          text: 'test text'
        },
        {
          id: 0,
          completed: true,
          text: 'Use Redux'
        }
      ], {
        type: types.COMPLETE_ALL
      });

      assert.deepEqual(result, [
        {
          id: 1,
          completed: false,
          text: 'test text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ]);
    });
  });

  describe(types.CLEAR_COMPLETED, () => {
    it('should handle CLEAR_COMPLETED', () => {
      const result = todos([
        {
          id: 1,
          completed: true,
          text: 'test text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ], {
        type: types.CLEAR_COMPLETED
      });

      assert.deepEqual(result, [
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ]);
    });

    it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
      const initialState = [
        {
          id: 1,
          completed: false,
          text: 'test text'
        },
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }
      ];
      const actions = [
        {
          type: types.COMPLETE_TODO,
          id: 0
        },
        {
          type: types.CLEAR_COMPLETED
        },
        {
          type: types.ADD_TODO,
          text: 'New Todo'
        }
      ];
      const result = actions.reduce(todos, initialState);

      assert.deepEqual(result, [
        {
          id: 2,
          completed: false,
          text: 'New Todo'
        },
        {
          id: 1,
          completed: false,
          text: 'test text'
        }
      ]);
    });
  });
});

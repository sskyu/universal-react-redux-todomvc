import assert from 'power-assert';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import MainSection from '../../src/common/components/MainSection';
import TodoItem from '../../src/common/components/TodoItem';
import Footer from '../../src/common/components/Footer';
import * as actions from '../../src/common/actions/todos';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../../src/common/constants/todoFilters';
import style from '../../src/common/styles/components/mainSection.css';

function setup(propOverrides) {
  const spyActions = {};
  Object.keys(actions).map((actionName) => spyActions[actionName] = sinon.spy());
  const props = Object.assign({
    todos: [
      {
        id: 0,
        completed: false,
        text: 'Use Redux'
      },
      {
        id: 1,
        completed: true,
        text: 'Test in mocha'
      }
    ],
    actions: spyActions
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<MainSection {...props} />);
  const output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const { output } = setup();
      assert(output.type === 'section');
      assert(output.props.className === style.main);
    });

    describe('toggle all input', () => {
      it('should render', () => {
        const { output } = setup();
        const toggle = output.props.children[0];
        assert(toggle.type === 'input');
        assert(toggle.props.type === 'checkbox');
        assert(toggle.props.checked === false);
      });

      it('should be checked if all todos completed', () => {
        const { output } = setup({
          todos: [
            {
              id: 0,
              completed: true,
              text: 'test'
            }
          ]
        });
        const toggle = output.props.children[0];
        assert(toggle.props.checked === true);
      });

      it('should call completeAll on change', () => {
        const { output, props } = setup();
        const toggle = output.props.children[0];
        toggle.props.onChange({});
        assert(props.actions.completeAll.called === true);
      });
    });

    describe('footer', () => {
      it('should render', () => {
        const { output } = setup();
        const footer = output.props.children[2];
        assert(footer.type === Footer);
        assert(footer.props.completedCount === 1);
        assert(footer.props.activeCount === 1);
        assert(footer.props.filter === SHOW_ALL);
      });

      it('onShow should set the filter', () => {
        const { output, renderer } = setup();
        const footer = output.props.children[2];
        footer.props.onShow(SHOW_COMPLETED);
        const updated = renderer.getRenderOutput();
        const updatedFooter = updated.props.children[2];
        assert(updatedFooter.props.filter === SHOW_COMPLETED);
      });

      it('onClearCompleted should call clearCompleted', () => {
        const { output, props } = setup();
        const footer = output.props.children[2];
        footer.props.onClearCompleted();
        assert(props.actions.clearCompleted.called === true);
      });

      it('onClearCompleted should not call clearCompleted if no todos completed', () => {
        const { output, props } = setup({
          todos: [
            {
              id: 0,
              completed: false,
              text: 'test'
            }
          ]
        });
        const footer = output.props.children[2];
        footer.props.onClearCompleted();
        assert(props.actions.clearCompleted.called === false);
      });
    });

    describe('todo list', () => {
      it('should render', () => {
        const { output, props } = setup();
        const list = output.props.children[1];
        assert(list.type === 'ul');
        assert(list.props.children.length === 2);

        list.props.children.map((item, i) => {
          assert(item.type === TodoItem);
          assert(item.props.todo === props.todos[i]);
        });
      });

      it('should filter items', () => {
        const { output, renderer, props } = setup();
        const footer = output.props.children[2];
        footer.props.onShow(SHOW_COMPLETED);
        const updated = renderer.getRenderOutput();
        const updatedList = updated.props.children[1];
        assert(updatedList.props.children.length === 1);
        assert(updatedList.props.children[0].props.todo === props.todos[1]);
      });
    });
  });
});

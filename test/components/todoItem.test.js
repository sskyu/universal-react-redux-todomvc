import assert from 'power-assert';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoItem from '../../src/common/components/TodoItem';
import TodoTextInput from '../../src/common/components/TodoTextInput';
import style from '../../src/common/styles/components/todoItem.scss';

function setup(editing = false) {
  const props = {
    todo: {
      id: 0,
      completed: false,
      text: 'test'
    },
    editTodo: sinon.spy(),
    deleteTodo: sinon.spy(),
    completeTodo: sinon.spy()
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<TodoItem {...props} />);

  let output = renderer.getRenderOutput();
  if (editing) {
    const label = output.props.children.props.children[1];
    label.props.onDoubleClick({});
    output = renderer.getRenderOutput()
  }

  return { props, output, renderer };
}

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      const { output } = setup();
      assert(output.type === 'li');
      assert(output.props.className === '');

      const div = output.props.children;
      assert(div.type === 'div');
      assert(div.props.className === '');

      const [input, label, button] = div.props.children;
      assert(input.type === 'input');
      assert(input.props.checked === false);
      assert(label.type === 'label');
      assert(label.props.children === 'test');
      assert(button.type === 'button');
      assert(button.props.className === style.destroy);
    });

    it('input onChange should call completeTodo', () => {
      const { output, props } = setup();
      const input = output.props.children.props.children[0];
      input.props.onChange({});
      assert(props.completeTodo.called === true);
    });

    it('button onClick should call deleteTodo', () => {
      const { output, props } = setup();
      const button = output.props.children.props.children[2];
      button.props.onClick({});
      assert(props.deleteTodo.called === true);
    });

    it('label onDoubleClick should put component in edit state', () => {
      const { output, renderer } = setup();
      const label = output.props.children.props.children[1];
      label.props.onDoubleClick({});
      const updated = renderer.getRenderOutput();
      assert(updated.type === 'li');
      assert(updated.props.className === style.editing);
    });

    it('edit state render', () => {
      const { output } = setup(true);
      assert(output.type === 'li');
      assert(output.props.className === style.editing);

      const input = output.props.children;
      assert(input.type === TodoTextInput);
      assert(input.props.text === 'test');
      assert(input.props.editing === true);
    });

    it('TodoTextInput onSave should call editTodo', () => {
      const { output, props } = setup(true);
      output.props.children.props.onSave('update text');
      assert(props.editTodo.calledWith(0, 'update text') === true);
    });

    it('TodoTextInput onSave should call deleteTodo if text is empty', () => {
      const { output, props } = setup(true);
      output.props.children.props.onSave('');
      assert(props.deleteTodo.called === true);
    });

    it('TodoTextInput onSave should exit component from edit state', () => {
      const { output, renderer } = setup(true);
      output.props.children.props.onSave('update text');
      const updated = renderer.getRenderOutput();
      assert(updated.type === 'li');
      assert(updated.props.className === '');
    });
  });
});

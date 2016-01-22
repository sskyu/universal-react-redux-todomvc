import assert from 'power-assert';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from '../../src/common/components/Header';
import TodoTextInput from '../../src/common/components/TodoTextInput';

function setup() {
  const props = {
    addTodo: sinon.spy()
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Header {...props} />);
  const output = renderer.getRenderOutput();

  return { props, output }
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup();
      assert(output.type === 'header');
      assert(output.props.className === 'header');

      const [ h1, input ] = output.props.children;

      assert(h1.type === 'h1');
      assert(h1.props.children === 'todos');

      assert(input.type === TodoTextInput);
      assert(input.props.newTodo === true);
      assert(input.props.placeholder === 'What needs to be done?');
    });

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup();
      const input = output.props.children[1];
      input.props.onSave('');

      assert(props.addTodo.called === false);
      input.props.onSave('Use Redux');
      assert(props.addTodo.called === true);
    });
  });
});

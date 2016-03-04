import assert from 'power-assert';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoTextInput from '../../src/common/components/TodoTextInput';
import style from '../../src/common/styles/components/todoTextInput.css';

function setup(propOverrides) {
  const props = Object.assign({
    onSave: sinon.spy(),
    text: 'Use Redux',
    placeholder: 'What needs to be done?',
    editing: false,
    newTodo: false
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<TodoTextInput {...props} />);
  const output = renderer.getRenderOutput();

  return { props, output, renderer }
}

describe('components', () => {
  describe('TodoTextInput', () => {
    it('should render correctly', () => {
      const { output } = setup();
      assert(output.props.placeholder === 'What needs to be done?');
      assert(output.props.value === 'Use Redux');
      assert(output.props.className === '');
    });

    it('should render correctly when editing=true', () => {
      const { output } = setup({ editing: true });
      assert(output.props.className === style.edit);
    });

    it('should render correctly when newTodo=true', () => {
      const { output } = setup({ newTodo: true });
      assert(output.props.className === style.newTodo);
    });

    it('should update value on change', () => {
      const { output, renderer } = setup();
      output.props.onChange({ target: { value: 'Change text' } });
      const updated = renderer.getRenderOutput();
      assert(updated.props.value === 'Change text');
    });

    it('should call onSave on return key press', () => {
      const { output, props } = setup();
      output.props.onKeyDown({ which: 13, target: { value: 'pressed enter key'} });
      assert(props.onSave.calledWith('pressed enter key'));
    });

    it('should reset state on return key press if newTodo', () => {
      const { output, renderer } = setup({ newTodo: true });
      output.props.onKeyDown({ which: 13, target: { value: 'create new todo'} });
      const updated = renderer.getRenderOutput();
      assert(updated.props.value === '');
    });

    it('should call onSave on blur', () => {
      const { output, props } = setup();
      output.props.onBlur({ target: { value: 'on blur' } });
      assert(props.onSave.calledWith('on blur'));
    });

    it('should not call onSave on blur if newTodo', () => {
      const { output, props } = setup({ newTodo: true });
      output.props.onBlur({ target: { value: 'on blur'} });
      assert(props.onSave.called === false);
    });
  });
});

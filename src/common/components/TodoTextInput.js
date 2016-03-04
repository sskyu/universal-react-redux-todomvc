import React, { Component, PropTypes } from 'react';
import style from '../styles/components/todoTextInput.css';

export default class TodoTextInput extends Component {
  static propTypes = {
    onSave      : PropTypes.func.isRequired,
    text        : PropTypes.string,
    placeholder : PropTypes.string,
    editing     : PropTypes.bool,
    newTodo     : PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    }
  }

  render() {
    const className = [
      this.props.editing ? style.edit : '',
      this.props.newTodo ? style.newTodo : ''
    ].join(' ').trim();

    return (
      <input
        className={className}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
      />
    );
  }

  handleBlur(e) {
    if (this.props.newTodo) {
      return;
    }
    this.props.onSave(e.target.value);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleKeyDown(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }
}

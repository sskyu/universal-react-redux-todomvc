import React, { Component, PropTypes } from 'react';
import TodoTextInput from './TodoTextInput';
import style from '../styles/components/todoItem.css';

export default class TodoItem extends Component {
  static propTypes = {
    todo         : PropTypes.object.isRequired,
    editTodo     : PropTypes.func.isRequired,
    deleteTodo   : PropTypes.func.isRequired,
    completeTodo : PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    }
  }

  render() {
    const { todo } = this.props;
    const className = [
      todo.completed ? style.completed : '',
      this.state.editing ? style.editing : ''
    ].join(' ').trim();

    return (
      <li className={className}>
        {this.state.editing ? this._renderEditElement() : this._renderViewElement()}
      </li>
    );
  }

  _renderEditElement() {
    const { todo } = this.props;

    return (
      <TodoTextInput
        text={todo.text}
        editing={this.state.editing}
        onSave={(text) => this.handleSave(todo.id, text)}
      />
    );
  }

  _renderViewElement() {
    const { todo, completeTodo, deleteTodo } = this.props;
    const className = this.state.editing ? style.displayNone : '';

    return (
      <div className={className}>
        <input
          className={style.toggle}
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
        <label onDoubleClick={this.handleDoubleClick.bind(this)}>
          {todo.text}
        </label>
        <button
          className={style.destroy}
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    );
  }

  handleSave(id, text) {
    if (!text.length) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }
}

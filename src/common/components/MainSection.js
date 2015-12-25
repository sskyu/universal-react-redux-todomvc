import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETE, SHOW_ACTIVE } from '../constants/todoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]      : () => true,
  [SHOW_ACTIVE]   : todo => !todo.completed,
  [SHOW_COMPLETE] : todo => todo.completed
};

export default class MainSection extends Component {
  static propTypes = {
    todos   : PropTypes.array.isRequired,
    actions : PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = this._getFilteredTodos();
    const completedCount = this._getCompletedCount();

    return (
      <section className="main">
        {this._renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this._renderFooter(completedCount)}
      </section>
    );
  }

  _renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      );
    }
  }

  _renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this._onClearCompleted.bind(this)}
          onShow={this._onShow.bind(this)}
        />
      );
    }
  }

  _onClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  _onShow(filter) {
    this.setState({ filter });
  }

  _getFilteredTodos() {
    const { todos } = this.props;
    const { filter } = this.state;

    return todos.filter(TODO_FILTERS[filter]);
  }

  _getCompletedCount() {
    const { todos } = this.props;

    return todos.reduce((count, todo) => {
      if (todo.completed) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }
}

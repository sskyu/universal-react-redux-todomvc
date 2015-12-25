import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/todoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]       : 'All',
  [SHOW_ACTIVE]    : 'Active',
  [SHOW_COMPLETED] : 'Completed'
};

export default class Footer extends Component {
  static propTypes = {
    completedCount   : PropTypes.number.isRequired,
    activeCount      : PropTypes.number.isRequired,
    filter           : PropTypes.string.isRequired,
    onClearCompleted : PropTypes.func.isRequired,
    onShow           : PropTypes.func.isRequired
  };

  render() {
    return (
      <footer className="footer">
        {this._renderTodoCount()}
        <ul className="filters">
          {/*this._renderFilters()*/}
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this._renderFilterLink()}
            </li>
          )}
        </ul>
        {this._renderClearButton()}
      </footer>
    );
  }

  _renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  _renderFilters() {
    const filters = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED];

    return filters.map(filter => {
      <li key={filter}>
        {this._renderFilterLink(filter)}
      </li>
    });
  }

  _renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;
    const className = classnames({
      'selected': filter === selectedFilter
    });

    return (
      <a
        className={className}
        style={{cursor: 'pointer'}}
        onClick={() => onShow(filter)}
      >
        {title}
      </a>
    );
  }

  _renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount) {
      return (
        <button
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      );
    }
  }
}

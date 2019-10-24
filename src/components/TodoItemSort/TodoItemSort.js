import React, { Component } from 'react';
import classNames from 'classnames';
import { todoItemSortProps } from '../../constants/proptypes';

import './TodoItemSort.css';

class TodoItemSort extends Component {
  buttons = [
    { name: 'default', label: 'Default' },
    { name: 'title', label: 'Title' },
    { name: 'status', label: 'Status' },
    { name: 'user', label: 'User' },
  ];

  render() {
    const { sortMethod, sortType } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = sortMethod === name;

      const sortBtnClasses = classNames({
        'btn-info': isActive,
        'btn-outline-secondary': !isActive,
      });

      return (
        <button
          type="button"
          className={`btn ${sortBtnClasses}`}
          key={name}
          onClick={() => sortType(name)}
        >
          {label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}

TodoItemSort.propTypes = todoItemSortProps;

export default TodoItemSort;

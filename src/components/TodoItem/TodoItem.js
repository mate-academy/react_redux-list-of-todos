import React from 'react';

import PropTypes from 'prop-types';
import './TodoItem.css';
import User from '../User/User';

const TodoItem = ({ todo, handleRemove }) => {
  const {
    id, title, completed, user,
  } = todo;

  return (
    <div className={completed ? 'todo-item completed' : 'todo-item'}>
      <p className="todo-item__title">
        <span className="digit">{id}</span>
        <button
          onClick={() => handleRemove(id)}
          type="button"
          className="remove"
        >
          ✕
        </button>
      </p>
      <p className="todo-item__main-title">{title}</p>
      <User user={user} />
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.shape({}).isRequired,
  }).isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default TodoItem;

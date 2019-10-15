import React from 'react';
import PropTypes from 'prop-types';

import './TodoItem.css';
import User from '../User/User';

const TodoItem = ({ todo, deleteTodos }) => {
  const { title, user } = todo;

  return (
    <div className="ui card todo-item">
      <div className="content">
        <h2 className="header todo-item__title">{title}</h2>
        <p>User info:</p>
        <User user={user} />
        <button onClick={deleteTodos} type="button">Delete</button>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
  deleteTodos: PropTypes.func.isRequired,
};

export default TodoItem;

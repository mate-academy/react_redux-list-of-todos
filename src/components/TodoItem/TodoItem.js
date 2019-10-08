import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import './TodoItem.css';

function TodoItem({ todo }) {
  return (
    <div
      className={todo.completed
        ? 'todo-item__complete'
        : 'todo-item__not-complete'}
    >
      <h2>{todo.title}</h2>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
      <User user={todo.user} />
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    user: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;

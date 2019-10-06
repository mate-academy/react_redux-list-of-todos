import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <div className={todo.completed
    ? 'card text-white bg-success mb-3'
    : 'card bg-light mb-3'}
  >
    <h2 className="card-header">{todo.title}</h2>
    <p className="cardbody mt-3">
      { todo.completed ? '\u2714' : '\u2718' }
    </p>
    <p>{todo.user}</p>
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.string,
  }).isRequired,
};

export default TodoItem;

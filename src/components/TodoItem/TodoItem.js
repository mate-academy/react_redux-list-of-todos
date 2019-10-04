import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import './TodoItem.css';

function TodoItem({ todo }) {
  return (
    <div className="todo-item">
      <h2>{todo.title}</h2>
      <p>{todo.completed ? 'completed' : 'not completed'}</p>

      <User user={todo.user} />
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }).isRequired,

};

export default TodoItem;

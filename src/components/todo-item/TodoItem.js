import React from 'react';
import PropTypes from 'prop-types';
import User from '../user/User';
import './TodoItem.css';

function TodoItem({ todo, deleteTodo }) {
  return (
    <span >
      <a href="#">
        <h2>{todo.title}</h2>
        <p>
          Completed:
        </p>
        <div>
          <User user={todo.user} />
          <button type="button" onClick={() => deleteTodo(todo.id)}>Delete Todo</button>
        </div>
      </a>
    </span>
  );
}

const shape = PropTypes.shape({
  name: PropTypes.string,
  email: PropTypes.string,
});

TodoItem.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: shape.isRequired,
  }).isRequired,
};

export default TodoItem;

import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ todo, deleteTodo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <User user={todo.user} />
    <td>{todo.completed ? 'completed' : 'not completed'}</td>
    <td>
      <button
        type="button"
        className="delete-button"
        onClick={() => deleteTodo(todo.id)}
      >
      X
      </button>
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;

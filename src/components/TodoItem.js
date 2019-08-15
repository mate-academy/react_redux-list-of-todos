import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const TodoItem = ({ todo, deleteTodo }) => (
  <tr>
    <User currentUser={todo.user} />
    <td className="todo-list-table__task">
      {todo.title}
      {todo.completed
        ? <input type="checkbox" checked />
        : <input type="checkbox" /> }
    </td>
    <td className="delete-btn-td">
      <button
        type="button"
        className="todo-list-table__detele-btn"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete Todo
      </button>
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;

import React from 'react';
import PropTypes from 'prop-types';
import { titles } from './store';
import User from './User';

const TodoItem = ({ todo, removeTodo }) => (
  <tr>
    {titles.map((title) => {
      switch (title) {
        case 'completed':
          return (
            <td key={`${title}${todo.id}`}>{todo.completed ? '+' : '-'}</td>
          );
        case 'user':
          return <User key={`${title}${todo.id}`} user={todo.user} />;
        case 'remove':
          return (
            <td key={`${title}${todo.id}`}>
              <button
                type="button"
                className="table__remove-button"
                onClick={() => {
                  removeTodo(todo.id);
                }}
              >
                x
              </button>
            </td>
          );
        default:
          return (<td key={`${title}${todo.id}`}>{todo[title]}</td>);
      }
    })}
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoItem;

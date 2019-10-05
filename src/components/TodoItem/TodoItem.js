import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import './TodoItem.css';

function TodoItem({ todo, deleteItem }) {
  return (
    <div className="todo-item">
      <h2>{todo.title}</h2>
      <p>{todo.completed ? 'completed' : 'not completed'}</p>

      <User user={todo.user} />
      <button
        onClick={() => deleteItem(todo.id)}
        className="item-button"
        type="submit"
      >
        delete
      </button>
    </div>
  );
}

TodoItem.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;

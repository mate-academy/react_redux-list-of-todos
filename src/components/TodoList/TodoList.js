import React from 'react';

import PropTypes from 'prop-types';
import './TodoList.css';
import { TodoItem } from '../TodoItem/index';

const TodoList = ({ todos }) => (
  <div className="todos-list">
    { todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
};

export default TodoList;

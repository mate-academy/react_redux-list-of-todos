import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li key={todo.id} className="list-item">
        <TodoItem todo={todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes
  = { todos: PropTypes.arrayOf(PropTypes.object).isRequired };

export default TodoList;

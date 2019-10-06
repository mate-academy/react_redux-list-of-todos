import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos }) => (
  <div className="todo-list">
    {todos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
      completed: PropTypes.bool,
      user: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default TodoList;

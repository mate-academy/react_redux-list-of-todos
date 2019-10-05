import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/Index';
import './TodoList.css';

const TodoList = ({ todos }) => (
  <div className="todos-list">
    <h2>{`todos: ${todos.length}`}</h2>
    {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default TodoList;

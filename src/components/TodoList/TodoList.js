import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos }) => (
  <div className="ui cards">
    {todos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;

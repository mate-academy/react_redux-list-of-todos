import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => todos.map(todo => (
  <TodoItem
    key={todo.id}
    id={todo.id}
    title={todo.title}
    completed={todo.completed}
    userName={todo.user.name}
    userEmail={todo.user.email}
  />
));

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  })).isRequired,
};

export default TodoList;

import React from 'react';
import TodoItem from '../containers/TodoItem';

const TodoList = ({ preparedTodos }) => (
  preparedTodos.map(todo => <TodoItem todo={todo} key={todo.id} />));

export default TodoList;

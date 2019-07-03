import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos }) {
  return (
    <>
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </>
  );
}

export default TodoList;

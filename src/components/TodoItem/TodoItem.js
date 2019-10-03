import React from 'react';
import User from '../User/User';
import './TodoItem.css';

function TodoItem({ todo }) {
  return (
    <div className={todo.completed ? 'todo-item__complete' : 'todo-item__not-complete'}>
      <h2>{todo.title}</h2>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
      <User user={todo.user} />
    </div>
  );
}

export default TodoItem;

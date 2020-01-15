/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';

const Todo = ({ todos, deleteTodo }) => (
  todos.map(todo => (
    <li key={todo.id} className="listTodos__todo" type="none">
      <h2>
        <span className="listTodos__todo__label">
          {`Todo: `}
        </span>
        {todo.title}
      </h2>
      <h3>
        <span className="listTodos__todo__label">
          {`Name: `}
        </span>
        {todo.user.name}
      </h3>
      <h3>
        <span className="listTodos__todo__label">
          {`Todo completed: `}
        </span>
        {todo.completed ? '✅' : '❌'}
      </h3>
      <button
        className="button--delete"
        type="button"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  ))
);

export default Todo;

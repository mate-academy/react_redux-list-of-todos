import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTodo, getTodos } from '../store';
import Button from './Button';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  return (
    <ul className="list-group">
      {todos.map(todo => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={todo.id}
        >
          <span className="badge badge-primary badge-pill">{todo.id}</span>
          {todo.title}
          <span className="users">{todo.user?.name}</span>
          <input
            type="checkbox"
            defaultChecked={todo.completed}
          />
          <Button
            text="delete"
            onClick={() => {
              dispatch(deleteTodo(todo.id));
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

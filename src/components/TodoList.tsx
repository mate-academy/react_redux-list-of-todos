import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTodo, getTodos } from '../store';
import Button from './Button';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  return (
    <table className="table">
      {todos.map(todo => (
        <tr key={todo.id}>
          <th>{todo.id}</th>
          <th>{todo.title}</th>
          <th>{todo.user?.name}</th>
          <Button
            text="delete"
            onClick={() => {
              dispatch(deleteTodo(todo.id));
            }}
          />
        </tr>
      ))}
    </table>
  );
};

export default TodoList;

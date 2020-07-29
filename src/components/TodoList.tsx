import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTodo, getTodos } from '../store/index';
import Button from './Button';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  return (
    <table className="table box table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Button remove</th>
        </tr>
      </thead>
      {todos.map(todo => (
        <tr key={todo.id}>
          <th>{todo.id}</th>
          <th>{todo.title}</th>
          <th>{todo.user?.name}</th>
          <th>
            {todo.completed
              ? 'done'
              : 'in process'}
          </th>
          <Button
            text="Remove"
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

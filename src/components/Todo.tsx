import React from 'react';
import { User } from './User';
import { PreparedTodo } from './types';

export const Todo:
React.FC< {todo: PreparedTodo; deleteItem: (id: number) => void } > = ({ todo, deleteItem }) => (

  <tr>
    <td>
      <input type="checkbox" name="" id="" checked={todo.completed} />
    </td>
    <td>{todo.title}</td>
    <User name={todo.user ? todo.user.name : 'user is not found'} />
    <td>
      <button
        onClick={() => deleteItem(todo.id)}
        type="button"
      >
        delete
      </button>
    </td>
  </tr>
);

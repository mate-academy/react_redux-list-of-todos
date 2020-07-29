import React from 'react';
import { User } from './User';
import { PreparedTodo } from './types';

interface Props {
  deleteItem: (id: number) => void;
  todo: PreparedTodo;
}

export const Todo:
React.FC<Props> = ({ todo, deleteItem }) => (

  <tr>
    <td>
      <input
        type="checkbox"
        name="input"
        id="input"
        checked={todo.completed}
        readOnly
      />
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

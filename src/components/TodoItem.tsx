import React, { FC } from 'react';
import { PreparedTodoType } from '../utils/interfaces';

interface Props {
  todo: PreparedTodoType;
  deleteTodo: (value: number) => void;
}

export const TodoItem: FC<Props> = ({ todo }, deleteTodo) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <tr className="table__row">
      <td className="table__cell">{id}</td>
      <td className="table__cell">{user.name}</td>
      <td className="table__cell">{title}</td>
      <td className="table__cell">{completed ? 'Yes' : 'No'}</td>
      <td className="table__cell">
        <button
          type="button"
          onClick={() => deleteTodo(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

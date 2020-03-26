import React, { FC } from 'react';

interface Props {
  todo: TodoWithUser;
  deleteTodo: (id: number) => void;
}

export const TodoTemplate: FC<Props> = ({ todo, deleteTodo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <tr>
      <th>{id}</th>
      <th>{user?.name}</th>
      <th>{title}</th>
      <th>{completed ? 'complete' : 'active'}</th>
      <th>
        <button
          className="button"
          type="button"
          onClick={() => deleteTodo(id)}
        >
          delete
        </button>
      </th>
    </tr>
  );
};

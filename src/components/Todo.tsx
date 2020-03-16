import React, { FC } from 'react';
import { TodoWithUser } from '../utils/types';

interface Props {
  todo: TodoWithUser;
  onDelete: (value: number) => void;
}

export const Todo: FC<Props> = (props) => {
  const {
    todo: {
      id, title, user, completed,
    }, onDelete,
  } = props;

  const handler = () => {
    onDelete(id);
  };

  return (
    <tr>
      <td className="cell">{id}</td>
      <td className="cell">{title}</td>
      <td className="cell">{user ? user.name : ' - '}</td>
      <td className="cell">{completed ? 'pending' : 'completed'}</td>
      <td className="cell">
        <button
          type="button"
          onClick={handler}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

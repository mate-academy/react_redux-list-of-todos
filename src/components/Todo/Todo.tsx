import React, { FC } from 'react';
import { PreparedTodo } from '../../types';

import '../../App.css';

interface Props {
  todo: PreparedTodo
}

export const Todo: FC<Props> = ({ todo }) => {
  const { user, title, completed } = todo;

  return (
    <tr>
      {user && (<td className="table__cell">{user.name}</td>)}
      <td className="table__cell table__cell">{title}</td>
      <td className="table__cell table__cell-completed">{completed ? 'Done' : 'Don\'t do'}</td>
    </tr>
  );
}

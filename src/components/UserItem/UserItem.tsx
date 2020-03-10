import React, { FC } from 'react';

interface Props {
  todo: TodoWithUser;
}

export const UserItem: FC<Props> = ({ todo }) => {
  return (
    <tr key={todo.id} className="user-item">
      <td
        className="user-item"
        style={{ backgroundColor: 'darkorange' }}
      >
        {todo.user.name}
      </td>
      <td
        className="user-item"
        style={{ backgroundColor: 'aquamarine' }}
      >
        {todo.title}
      </td>
      <td
        className={todo.completed ? 'succes-load user-item' : 'faild-load user-item'}
      >
        {todo.completed.toString()}
      </td>
    </tr>
  );
};

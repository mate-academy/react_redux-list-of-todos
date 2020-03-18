import React, { FC } from 'react';

interface Props {
  todo: TodoWithUser;
  deleteTodo: (value: number) => void;
}

export const Todo: FC<Props> = (props) => {
  const { todo, deleteTodo } = props;

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <tr>
      <td className="cell">{todo.user.name}</td>
      <td className="cell">{todo.title}</td>
      <td className="cell">{`${todo.completed}`}</td>
      <td className="cell">
        <button
          type="button"
          onClick={handleDelete}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TodoWithUser } from '../../constants/types';
import { deleteTodo } from '../../store';

interface Props {
  todo: TodoWithUser;
  deleteTodo: (id: number) => void;
}

export const TodoItemTemplate: FC<Props> = (props) => {
  const {
    id,
    user,
    title,
    completed,
  } = props.todo;

  return (
    <tr className="tr">
      <td className="td">{id}</td>
      <td className="td">{title}</td>
      <td className="td">{completed ? 'YES' : 'NO'}</td>
      <td className="td">{user.name}</td>
      <td className="td">
        <button
          type="button"
          className="button button-delete"
          onClick={() => props.deleteTodo(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const mapDispatchToProps = { deleteTodo };

export const TodoItem = connect(null, mapDispatchToProps)(TodoItemTemplate);

import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import { TodoWithUser } from '../../constants/types';
import { deleteTodo } from '../../store/actionCreators';

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

  const handleDelete = useCallback(() => {
    props.deleteTodo(id);
  },
  [deleteTodo, id]);

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
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const mapDispatchToProps = { deleteTodo };

export const TodoItem = connect(null, mapDispatchToProps)(TodoItemTemplate);

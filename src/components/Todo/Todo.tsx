import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../../store/store';

interface Props{
  todo: TodoWithUsers;
  deleteTodo: (id: number) => void;
}

export const TodoItem: FC<Props> = (props) => {
  const {
    id,
    title,
    completed,
    user,
  } = props.todo;

  const { deleteTodo: deleteTodoItem } = props;

  const handleDelete = useCallback(() => {
    deleteTodoItem(id);
  },
  [deleteTodoItem, id]);

  return (
    <>
      <td className="table__cell">{id}</td>
      <td className="table__cell">{user ? user.name : ''}</td>
      <td className="table__cell">{title}</td>
      <td className="table__cell">{completed ? 'done' : 'not done'}</td>
      <td className="table__cell">
        <button
          type="button"
          className="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </>
  );
};

const mapDispatchToProps = { deleteTodo };

export const Todo = connect(null, mapDispatchToProps)(TodoItem);

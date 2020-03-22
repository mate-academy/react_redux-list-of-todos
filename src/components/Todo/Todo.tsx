import React, { FC } from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../../store/actionCreators';

interface Props {
  todo: PreparedTodo;
  deleteTodo: (id: number) => void;
}

// eslint-disable-next-line no-shadow
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

const mapDispatch = {
  deleteTodo,
};

export const Todo = connect(null, mapDispatch)(TodoTemplate);

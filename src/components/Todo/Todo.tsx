import React, { FC } from 'react';
import { connect } from 'react-redux';
import { PreparedTodo } from '../../constants_types/types';
import { deleteTask } from '../../redux/actionCreators';

import '../../App.css';

interface Props {
  todo: PreparedTodo;
  removeTodo: (id: number) => void;
}

export const TodoTemplate: FC<Props> = ({ todo, removeTodo }) => {
  const {
    user,
    title,
    completed,
    id,
  } = todo;

  return (
    <tr>
      {user && (<td className="table__cell">{user.name}</td>)}
      <td className="table__cell">{title}</td>
      <td className="table__cell table__cell-completed">
        {completed ? 'Done' : 'Don\'t do'}
      </td>
      <td className="table__cell">
        <button
          type="button"
          className="deleted_button"
          onClick={() => removeTodo(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const mapDispatchToProps = {
  removeTodo: deleteTask,
};

export const Todo = connect(
  null,
  mapDispatchToProps,
)(TodoTemplate);

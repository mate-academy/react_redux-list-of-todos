import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PreparedTodo } from '../../types';

import '../../App.css';

interface Props {
  todo: PreparedTodo
  setDeleted: (id: number) => void
}

export const TodoTemplate: FC<Props> = ({ todo, setDeleted }) => {
  const { user, title, completed, id } = todo;

  return (
    <tr>
      {user && (<td className="table__cell">{user.name}</td>)}
      <td className="table__cell">{title}</td>
      <td className="table__cell table__cell-completed">{completed ? 'Done' : 'Don\'t do'}</td>
      <td className="table__cell">
        <button
          type="button"
          className="deleted_button"
          onClick={() => setDeleted(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setDeleted: (id: number) => dispatch({ type: 'DELETE_TASK', id: id})
  }
}

export const Todo = connect(
  null,
  mapDispatchToProps,
)(TodoTemplate)

import React, { FC } from 'react';
/* import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteTodo } from '../../store/store'; */

interface Props {
  todo: PreparedTodo;
  /* delTodo: (id: number) => void; */
}

export const Todo: FC<Props> = ({ todo /* delTodo */ }) => {
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
      {/* <th>
        <button
          type="button"
          onClick={() => delTodo(id)}
        >
          delete
        </button>
      </th> */}
    </tr>
  );
};
/*
const mapDispatch = (dispatch: Dispatch) => ({
  deleteTodo: (id: number) => dispatch(deleteTodo(id)),
});

export const Todo = connect(null, mapDispatch)(TodoTemplate); */

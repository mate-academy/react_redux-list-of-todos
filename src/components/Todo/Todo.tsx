import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { onDeleteAction } from '../../actionCreators';

interface Props {
  todo: PreparedTodo;
  onDelete: (id: number) => void;
}

const Todo: FC<Props> = ({ todo, onDelete }) => (
  <tr>
    <td>{todo.user.username}</td>
    <td>{todo.title}</td>
    <td>{todo.completed ? 'completed' : 'uncompleted'}</td>
    <td>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
      >
        x
      </button>
    </td>
  </tr>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDelete: (id: number) => dispatch(onDeleteAction(id)),
});

export default connect(null, mapDispatchToProps)(Todo);

import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TodoWithUser } from '../types';
import './Todo.css';

interface Props {
  todo: TodoWithUser;
  onRemoveTodo: (id: number) => void;
}

const Todo: FC<Props> = ({ todo, onRemoveTodo }) => {
  return (
    <tr>
      <td>{todo.user.name}</td>
      <td>{todo.title}</td>
      <td>{todo.completed ? 'Complete' : 'Do it!'}</td>
      <td>
        <button
          type="button"
          className="table__button table__button-remove"
          onClick={() => onRemoveTodo(todo.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRemoveTodo: (id: number) => dispatch({
    type: 'REMOVE_TODO',
    id,
  }),
});

export default connect(null, mapDispatchToProps)(Todo);

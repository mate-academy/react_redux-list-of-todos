import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { REMOVE_TODO } from '../../constants';
import './Todo.css';

interface Props {
  todo: TodoWithUser;
  removeTodo: (id: number) => void;
}

const Todo: FC<Props> = ({ todo, removeTodo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.user ? todo.user.name : ''}</td>
    <td className="table__cell">
      {todo.title}
      <button
        type="button"
        className="btn-remove"
        onClick={() => removeTodo(todo.id)}
      >
        <img
          src="https://img.icons8.com/color/48/000000/delete-sign.png"
          alt="remove todo"
          className="remove-icon"
        />
      </button>
    </td>
    <td>{todo.completed ? 'Complete' : 'Incomplete'}</td>
  </tr>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTodo: (id: number) => dispatch({
    type: REMOVE_TODO,
    value: id,
  }),
});

export default connect(null, mapDispatchToProps)(Todo);

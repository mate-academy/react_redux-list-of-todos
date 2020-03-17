import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TodoWithUser } from '../types';
import { removeTodo } from '../actionCreators';
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

const mapDispatchToProps = ({ onRemoveTodo: removeTodo });

export default connect(null, mapDispatchToProps)(Todo);

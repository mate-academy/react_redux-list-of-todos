import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteTask as removeTask } from '../actions/actionCreator';

interface Props {
  todo: PreparedTodo;
  deleteTask: (id: number) => void;
}

const Todo: React.FC<Props> = ({ todo, deleteTask }) => {
  return (
    <tr className="table-info">
      <td>{todo.title}</td>
      <td>{todo.completed ? 'OK' : 'KO'}</td>
      <td>
        {todo.user && (<p>{todo.user.name}</p>)}
      </td>
      <td>
        <button
          type="button"
          onClick={() => deleteTask(todo.id)}
        >
          🗑
        </button>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteTask: (id: number) => dispatch(removeTask(id)),
});

export default connect(null, mapDispatchToProps)(Todo);

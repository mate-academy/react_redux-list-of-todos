import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  RootState, getVisibleTodos, setVisibleTodos,
} from '../store';

const mapState = (state: RootState) => {
  return {
    todosList: getVisibleTodos(state),
  };
};

const mapDispatch = {
  setVisible: setVisibleTodos,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {};

const TodoList: React.FC<Props> = ({ todosList, setVisible }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">
            <button
              className="sort_btn"
              type="button"
              onClick={() => setVisible('completed')}
            >
              Completed
            </button>
          </th>
          <th scope="col">
            <button
              type="button"
              className="sort_btn"
              onClick={() => setVisible('title')}
            >
              Title
            </button>
          </th>
          <th scope="col">
            <button
              type="button"
              className="sort_btn"
              onClick={() => setVisible('user')}
            >
              User
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          todosList.map(todo => (
            <tr key={todo.id}>
              <td><input type="checkbox" readOnly checked={todo.completed} /></td>
              <td>{todo.title}</td>
              <td>{todo.user}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default connector(TodoList);

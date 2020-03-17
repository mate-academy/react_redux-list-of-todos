import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TodosWithUsers } from '../types';
import Todo from '../Todo/Todo';
import { setSortField } from '../actionCreators';
import './TodoList.css';

interface Props {
  todos: TodosWithUsers;
  setSorted: (sortField: string) => void;
}

const TodoList: FC<Props> = (props) => {
  const {
    todos,
    setSorted,
  } = props;

  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          <th>
            <button
              type="button"
              className="table__button table__button-header"
              onClick={() => setSorted('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              className="table__button table__button-header"
              onClick={() => setSorted('title')}
            >
              Todo
            </button>
          </th>
          <th>
            <button
              type="button"
              className="table__button table__button-header"
              onClick={() => setSorted('completed')}
            >
              Status
            </button>
          </th>
          <th>
            <span />
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        {todos.map(todo => (
          <Todo
            todo={todo}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSorted: (sortField: string) => dispatch(setSortField(sortField)),
});

export default connect(null, mapDispatchToProps)(TodoList);

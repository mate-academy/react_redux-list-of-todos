import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Todo from '../Todo/Todo';
import { SORT_BY_TITLE, SORT_BY_NAME, SORT_BY_STATUS } from '../../constants';

interface Props{
  todos: Todos;
  onSortTask: () => void;
  onSortName: () => void;
  onSortStatus: () => void;
}

const TodosList: FC<Props> = ({
  todos,
  onSortTask,
  onSortName,
  onSortStatus,
}) => (
  <table className="table">
    <thead className="table__header">
      <tr>
        <th>ID</th>
        <th>
          User
          <button
            type="button"
            onClick={onSortName}
            className="btn"
          >
            <img
              src="https://img.icons8.com/metro/26/000000/sort.png"
              className="table__icon"
              alt="Sort icon"
            />
          </button>
        </th>
        <th>
          <button
            type="button"
            onClick={onSortTask}
            className="btn"
          >
            <img
              src="https://img.icons8.com/metro/26/000000/sort.png"
              className="table__icon"
              alt="Sort icon"
            />
          </button>
          Task
        </th>
        <th>
          Status
          <button
            type="button"
            onClick={onSortStatus}
            className="btn"
          >
            <img
              src="https://img.icons8.com/metro/26/000000/sort.png"
              className="table__icon"
              alt="Sort icon"
            />
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </tbody>
  </table>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSortName: () => dispatch({
    type: SORT_BY_NAME,
  }),
  onSortTask: () => dispatch({
    type: SORT_BY_TITLE,
  }),
  onSortStatus: () => dispatch({
    type: SORT_BY_STATUS,
  }),
});

export default connect(null, mapDispatchToProps)(TodosList);

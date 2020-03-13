import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Todo from './Todo';
import { sortByName, sortByTitle, sortByComplete } from '../actions/actionCreator';


interface Props {
  todos: PreparedTodo[];
  sortByTitle: () => void;
  sortByName: () => void;
  sortByComplete: () => void;
}


const TodoList: FC<Props> = ({
  todos,
  sortByTitle,
  sortByComplete,
  sortByName,
}) => {
  return (
    <>
      <div>
        <button
          className="btn btn-info button-margin"
          type="button"
          onClick={sortByTitle}
        >
          sort by title
        </button>
        <button
          className="btn btn-info button-margin"
          type="button"
          onClick={sortByComplete}
        >
          show completed
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={sortByName}
        >
          by user name
        </button>
      </div>
      <table className="table-bordered table-center">
        <thead>
          <tr className="bg-danger">
            <th>Todo</th>
            <th>Status</th>
            <th>UserName</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(item => <Todo key={item.id} todo={item} />)}
        </tbody>
      </table>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sortByName: () => dispatch(sortByName()),
  sortByTitle: () => dispatch(sortByTitle()),
  sortByComplete: () => dispatch(sortByComplete()),
});

export default connect(null, mapDispatchToProps)(TodoList);

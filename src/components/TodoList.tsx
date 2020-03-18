import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Todo from './Todo';
import { setSortField as setSort, Type } from '../actions/actionCreator';


interface Props {
  todos: PreparedTodo[];
  setSortField: (field: string) => void;
}


const TodoList: FC<Props> = ({
  todos,
  setSortField,
}) => (
  <>
    <div>
      <button
        className="btn btn-info button-margin"
        type="button"
        onClick={() => setSortField(Type.SORT_BY_TITLE)}
      >
        sort by title
      </button>
      <button
        className="btn btn-info button-margin"
        type="button"
        onClick={() => setSortField(Type.SORT_BY_COMPLETE)}
      >
        show completed
      </button>
      <button
        className="btn btn-info"
        type="button"
        onClick={() => setSortField(Type.SORT_BY_NAME)}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSortField: (field: string) => dispatch(setSort(field)),
});

export default connect(null, mapDispatchToProps)(TodoList);

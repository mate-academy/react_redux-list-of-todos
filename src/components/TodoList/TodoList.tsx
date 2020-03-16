import React, { FC, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import Todo from '../Todo/Todo';
import { InitialState } from '../../store';
import {
  SORT_BY_COMPLETED,
  SORT_BY_TITLE,
  SORT_BY_NAME,
} from '../../constants';


interface Props {
  todos: PreparedTodo[];
  sortByTitle: () => void;
  sortByName: () => void;
  sortByCompleted: () => void;
}

const TodoList: FC<Props> = ({
  todos,
  sortByTitle,
  sortByName,
  sortByCompleted,
}) => {
  return (
    <div className="table-wrapper">
      <table className="table table-striped w-100 w-50">
        <thead className="thead-dark">
          <tr>
            <th>
              <button
                className="btn btn-info"
                type="button"
                onClick={() => sortByName()}
              >
                Name
              </button>
            </th>
            <th>
              <button
                className="btn btn-info"
                type="button"
                onClick={() => sortByTitle()}
              >
                Todo
              </button>
            </th>
            <th>
              <button
                className="btn btn-info"
                type="button"
                onClick={() => sortByCompleted()}
              >
                Status
              </button>
            </th>
            <th>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map(item => <Todo key={item.id} todo={item} />)}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: InitialState) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  sortByTitle: () => dispatch({
    type: SORT_BY_TITLE,
  }),
  sortByName: () => dispatch({
    type: SORT_BY_NAME,
  }),
  sortByCompleted: () => dispatch({
    type: SORT_BY_COMPLETED,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

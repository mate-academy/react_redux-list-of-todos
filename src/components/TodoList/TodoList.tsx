import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SORT_BY_NAME, SORT_BY_TITLE, SORT_BY_COMPLETE } from '../../store';
import Todo from '../Todo/Todo';

interface Props {
  todos: TodosWithUser;
  sortByName: () => void;
  sortByTitle: () => void;
  sortByComplete: () => void;
}

const TodoList: FC<Props> = ({
  todos,
  sortByName,
  sortByTitle,
  sortByComplete,
}) => (
  <table className="table">
    <thead>
      <tr className="row">
        <th className="head-column">
          <button
            type="button"
            value="Name"
            className="button-sort button"
            onClick={sortByName}
          >
            Name
          </button>
        </th>
        <th>
          <button
            type="button"
            value="Todos"
            className="button-sort button"
            onClick={sortByTitle}
          >
            Todos
          </button>
        </th>
        <th>
          <button
            type="button"
            value="Status"
            className="button-sort button"
            onClick={sortByComplete}
          >
            Status
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </tbody>
  </table>
);

const mapStateToProps = (state: InitialState) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sortByName: () => dispatch({
    type: SORT_BY_NAME,
  }),
  sortByTitle: () => dispatch({
    type: SORT_BY_TITLE,
  }),
  sortByComplete: () => dispatch({
    type: SORT_BY_COMPLETE,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

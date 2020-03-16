import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  sortByName as sortByNameStore,
  sortByTitle as sortByTitleStore,
  sortByComplete as sortByCompleteStore,
  InitialState,
} from '../../store';
import Todo from '../Todo/Todo';

interface Props {
  todos: TodoWithUser[];
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

const mapDispatchToProps = {
  sortByName: sortByNameStore,
  sortByTitle: sortByTitleStore,
  sortByComplete: sortByCompleteStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TodoItem } from './TodoItem';
import { StoreType, PreparedTodoType } from '../utils/interfaces';
import { getTodos, setDeleteTodoAC } from '../store';

interface OwnProps {
  sortTodos: (sortBy: string) => void;
}

interface StateProps {
  todos: PreparedTodoType[];
}

interface DispatchProps {
  deleteTodo: (value: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

export const TodoList: FC<Props> = ({ todos, sortTodos, deleteTodo }) => (
  <table className="table">
    <thead className="table__head">
      <tr className="table__row">
        <th className="table__heading" onClick={() => sortTodos('id')}>
          No
        </th>
        <th className="table__heading" onClick={() => sortTodos('username')}>
          Name
        </th>
        <th className="table__heading" onClick={() => sortTodos('title')}>
          Title
        </th>
        <th className="table__heading" onClick={() => sortTodos('completed')}>
          Status
        </th>
        <th className="table__heading">
          Delete
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />)}
    </tbody>
  </table>
);

const mapStateToProps = (state: StoreType) => ({
  todos: getTodos(state),
});

const mapDispatchToProps = {
  deleteTodo: setDeleteTodoAC,
};

export default connect<StateProps, DispatchProps, OwnProps, StoreType>(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

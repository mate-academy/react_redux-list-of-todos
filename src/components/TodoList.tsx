import React, { FC } from 'react';
import { TodoItem } from './TodoItem';
import { PreparedTodoType } from '../utils/interfaces';

interface Props {
  todos: PreparedTodoType[];
  sortTodos: (sortBy: string) => void;
  deleteTodo: (value: number) => void;
}

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

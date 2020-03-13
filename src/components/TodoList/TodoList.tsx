import React, { FC } from 'react';
import Todo from '../Todo/Todo';
import './TodoList.css';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <table className="table">
      <thead>
        <tr className="table__row table__row_thead">
          <th className="table__cell">#</th>
          <th className="table__cell">Name</th>
          <th className="table__cell">Title</th>
          <th className="table__cell">Status</th>
          <th className="table__cell">-</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};

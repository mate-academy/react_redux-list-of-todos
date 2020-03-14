import React, { FC } from 'react';
import './TodoList.css';

import { Todo } from '../Todo/Todo';

interface Props{
  todos: TodoWithUsers[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <>
      <table className="table">
        <thead className="table__title">
          <tr>
            <th className="table__cell" scope="col">ID</th>
            <th className="table__cell" scope="col">User</th>
            <th className="table__cell" scope="col">Title</th>
            <th className="table__cell" scope="col">Status</th>
            <th className="table__cell" scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr
              className="table__row"
              key={todo.id}
            >
              <Todo todo={todo} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

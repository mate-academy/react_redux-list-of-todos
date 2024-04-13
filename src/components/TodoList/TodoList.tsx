/* eslint-disable */
import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

import { getPreparedTodos } from '../../utils/getPreparedTodos';
import { useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const preparedTodos = getPreparedTodos(todos, query, status);

  return (
    <>
      {preparedTodos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>

              <th> </th>
            </tr>
          </thead>

          <tbody>
            {preparedTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

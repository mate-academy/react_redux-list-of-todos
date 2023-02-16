/* eslint-disable max-len */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { getVisibleTodos } from '../../utils';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const visibleTodos = getVisibleTodos(todos, status, query);

  return (
    <>
      {visibleTodos.length === 0 ? (
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
            {visibleTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

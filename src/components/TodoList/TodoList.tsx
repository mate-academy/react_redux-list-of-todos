/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { getFilteredTodos } from '../../utils/filterTodos';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = getFilteredTodos(todos, query, status);

  return (
    <>
      {!filteredTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!filteredTodos.length && (
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

            {filteredTodos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';

import { useAppSelector } from '../../app/hooks';
import { getFilteredTodos } from '../../helpers/getFilteredTodos';

import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todoItems = useAppSelector(state => state.todos);
  const filters = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(
    () => getFilteredTodos(todoItems, filters),
    [todoItems, filters],
  );

  return (
    <>
      {!filteredTodos.length
        ? (
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
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};

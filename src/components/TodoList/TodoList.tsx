/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { TodoItem } from '../TodoItem';
import { FilterBy } from '../../types/FilterBy';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const filteredTodos = todos.filter(todo => {
    const trimmedQuery = query.trim();

    if (!todo.title.toLowerCase().includes(trimmedQuery)) {
      return false;
    }

    if (status === FilterBy.All) {
      return true;
    }

    const isActive = status === FilterBy.Active;

    return isActive === !todo.completed;
  });

  return (
    <>
      {!!filteredTodos.length ? (
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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};

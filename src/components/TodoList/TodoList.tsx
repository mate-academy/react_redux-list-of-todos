/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { TodoItem } from '../TodoItem';
import { FilterBy } from '../../types/FilterBy';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const filteredTodos = todos.filter(todo => {
    let passedQuery = false;

    const trimmedQuery = query.trim();

    if (todo.title.toLowerCase().includes(trimmedQuery)) {
      passedQuery = true;
    }

    if (status === FilterBy.All) {
      return passedQuery;
    }

    const isActive = status === FilterBy.Active;

    return isActive === !todo.completed && passedQuery;
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

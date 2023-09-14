import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';
import { Filters, Status, Todo } from '../../types';

const getFilteredTodos = (todos: Todo[], filters: Filters) => {
  let filteredTodos = [...todos];
  const { status, query } = filters;

  if (query) {
    filteredTodos = filteredTodos.filter((todo) => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedTitle = todo.title.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  if (status === Status.Active) {
    filteredTodos = filteredTodos.filter((todo) => todo.completed === false);
  }

  if (status === Status.Completed) {
    filteredTodos = filteredTodos.filter((todo) => todo.completed === true);
  }

  return filteredTodos;
};

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector((state) => state);
  const { filter } = useAppSelector((state) => state);

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length > 0 && (
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
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

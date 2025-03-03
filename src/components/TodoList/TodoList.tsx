/* eslint-disable */

import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  filters: {
    query: string;
    status: string;
  };
  currentTodo: Todo | null;
  onCurrentTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  filters,
  currentTodo,
  onCurrentTodo,
}) => {
  const filteredTodos = useMemo(() => {
    const { query, status } = filters;
    let updatedTodos: Todo[] = todos;

    switch (status) {
      case 'active':
        updatedTodos = updatedTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        updatedTodos = updatedTodos.filter(todo => todo.completed);
        break;
    }

    if (query) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return updatedTodos;
  }, [todos, filters]);

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        {filteredTodos.length > 0 && (
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
        )}

        <tbody>
          {filteredTodos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <tr data-cy="todo" key={id}>
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => onCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          currentTodo?.id === id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

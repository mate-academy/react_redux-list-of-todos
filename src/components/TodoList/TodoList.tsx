import React, { useCallback, useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const {
    query,
    status,
  } = useAppSelector<{ query: string, status: Status }>(state => state.filter);

  const getFilteredTodos = useCallback(() => {
    let filteredTodos = todos;

    switch (status) {
      case Status.active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case Status.completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      case Status.all:
      default:
        filteredTodos = todos;
    }

    return filteredTodos.filter(todo => {
      const lowerCaseTitle = todo.title.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();

      return lowerCaseTitle.includes(lowerCaseQuery);
    });
  }, [todos, status, query]);

  const filteredTodos = useMemo(getFilteredTodos, [todos, status, query]);

  return (
    <>
      {!filteredTodos.length && query
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
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};

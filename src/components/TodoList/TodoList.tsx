/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from './TodoItem';

type Filters = {
  query: string,
  status: Status,
};
const getVisibleTodos = (todos: Todo[], filters: Filters) => {
  let visibleTodos = [...todos];

  if (filters.query) {
    visibleTodos = visibleTodos.filter(({ title }) => {
      return title.toLowerCase().includes(filters.query.toLowerCase());
    });
  }

  if (filters.status) {
    switch (filters.status) {
      case 'active':
        visibleTodos = visibleTodos.filter(({ completed }) => !completed);
        break;
      case 'completed':
        visibleTodos = visibleTodos.filter(({ completed }) => completed);
        break;

      case 'all':
      default:
        break;
    }
  }

  return visibleTodos;
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const filters = useAppSelector(state => state.filter);
  const visibleTodos = useMemo(() => getVisibleTodos(todos, filters), [filters]);

  return (
    <>
      {visibleTodos.length === 0
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
                <th aria-label="eye" />
              </tr>
            </thead>

            <tbody>
              {visibleTodos.map(todo => (
                <TodoItem todo={todo} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};

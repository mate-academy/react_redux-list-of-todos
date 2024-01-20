/* eslint-disable max-len */
import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const todoList = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const normalisedQuery = filter.query.trim().toLowerCase();

  const filteredTodos = todoList.filter(todo => {
    if (normalisedQuery.length) {
      if (filter.status === 'active') {
        return todo.title.toLowerCase().includes(normalisedQuery)
          && !todo.completed;
      }

      if (filter.status === 'completed') {
        return todo.title.toLowerCase().includes(normalisedQuery)
          && todo.completed;
      }

      return todo.title.toLowerCase().includes(normalisedQuery);
    }

    if (filter.status === 'active') {
      return !todo.completed;
    }

    if (filter.status === 'completed') {
      return todo.completed;
    }

    return todo;
  });

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
                <th aria-label="check icon">
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                </th>
                <th>Title</th>
                <th aria-label="view icon"> </th>
              </tr>
            </thead>

            <tbody>
              {filteredTodos.map(todo => {
                return (
                  <TodoItem todo={todo} key={todo.id} />
                );
              })}
            </tbody>
          </table>
        )}
    </>
  );
};

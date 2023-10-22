/* eslint-disable max-len */
import React from 'react';
import { useAppSelector } from '../../app/hooks';

import { SearchField } from '../../types/SearchField';
import { CurrentTodo } from '../Todo/CurrentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const preparedTodos = todos.filter(todo => {
    const normalTodo = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (status) {
      case SearchField.ALL:
        return normalTodo;

      case SearchField.ACTIVE:
        return normalTodo && !todo.completed;

      case SearchField.COMPLETED:
        return normalTodo && todo.completed;

      default:
        return todo;
    }
  });

  return (
    <>
      {!preparedTodos.length ? (
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
            {preparedTodos.map(todo => (
              <CurrentTodo key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

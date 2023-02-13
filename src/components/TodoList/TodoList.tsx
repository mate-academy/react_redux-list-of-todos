/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from './TodoItem/TodoItem';
import { getVisibleTodos } from '../../utils/getVisibleTodos';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, query, status),
    [todos, query, status],
  );

  if (!visibleTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
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
          {visibleTodos.map(todo => {
            const isCurrent = currentTodo?.id === todo.id;

            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                isCurrent={isCurrent}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

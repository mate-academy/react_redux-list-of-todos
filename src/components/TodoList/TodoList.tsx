/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);

  const query = useAppSelector(state => state.filter.query);
  const filter = useAppSelector(state => state.filter.status);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'all') {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      }

      return (
        todo.title.toLowerCase().includes(query.toLowerCase()) &&
        todo.completed === (filter === 'completed')
      );
    });
  }, [todos, query, filter]);

  const isShowEmptyFilterMessage =
    todos.length > 0 && filteredTodos.length === 0;

  return (
    <>
      {isShowEmptyFilterMessage && (
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
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoRow } from '../TodoRow';
import { filterTodo } from '../../utils/filter';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    return filterTodo(todos, query, status);
  }, [query, status, todos]);

  return (
    <>
      {!filteredTodos.length ? (
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
              <TodoRow key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { useAppSelector } from '../../app/hooks';
import { getFilteredTodos } from '../../features/filterTodos';

export const TodoList: React.FC = () => {
  const {
    todos,
    filter,
  } = useAppSelector(state => state);

  const { query, status } = filter;

  const filteredTodos = getFilteredTodos(todos, status, query);

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
              <TodoInfo
                key={todo.id}
                todo={todo}
              />
            ))}

          </tbody>
        </table>
      )}

    </>
  );
};

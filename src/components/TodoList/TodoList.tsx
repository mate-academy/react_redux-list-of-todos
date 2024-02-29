import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoInfo } from '../Todo/Todo';
import { filterTodos } from '../../utils/filterTodos';
import { filterByQuery } from '../../utils/filterByQuery';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filterStatus = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const selectedTodos = filterTodos(todos, filterStatus);
  const hasNoMatches = filterByQuery(query, selectedTodos).length === 0;
  const filteredTodos = filterByQuery(query, selectedTodos);

  return (
    <>
      {hasNoMatches ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th aria-label="icon">
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th aria-label="icon"> </th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map(todo => {
              return <TodoInfo key={todo.id} todo={todo} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

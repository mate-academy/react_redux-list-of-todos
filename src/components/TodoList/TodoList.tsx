/* eslint-disable */
import { FC } from 'react';

import { useAppSelector } from '../../app/hooks';
import { getVisibleTodos } from '../../utils/getVisibleTodos';
import { selectTodos } from '../../features/todos';
import { selectFilter } from '../../features/filter';

import { TodoItem } from '../TodoItem';

export const TodoList: FC = () => {
  const todos = useAppSelector(selectTodos);
  const { query, status } = useAppSelector(selectFilter);

  const visibleTodos = getVisibleTodos(todos, status, query);

  return (
    <>
      {!visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
    </>
  );
};

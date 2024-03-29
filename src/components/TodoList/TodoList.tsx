/* eslint-disable */
import React from 'react';
import { TodoItem } from '../TodoItem';
import { useAppSelector } from '../../app/hooks';
import { getPreparedTodos } from '../../utils/getPrepearedTodos';

export const TodoList: React.FC = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const filteredTodos = getPreparedTodos(todos, status, query);

  return (
    <>
      {!filteredTodos.length && (
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
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
    </>
  );
};

/* eslint-disable */
import React from 'react';
import { TodoItem } from './TodoItem';
import { filterTodos } from '../filterTodos';
import { useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);
  const { query, status } = useAppSelector((state) => state.filter);
  const filteredTodos = filterTodos(todos, query, status);

  const noMatchesMessage = (
    <p className="notification is-warning">
      There are no todos matching current filter criteria
    </p>
  );

  return (
    <>
      {filteredTodos.length < 1 ? (
        noMatchesMessage
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
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

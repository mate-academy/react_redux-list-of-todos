/* eslint-disable max-len */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';
import { filterTodos } from '../../helpers/filterTodos';

export const TodoList: React.FC = () => {
  const { todos: todosFromStore, filter } = useAppSelector(state => state);
  const todos = filterTodos(todosFromStore, filter);

  return (
    <>
      {todos.length === 0 ? (
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
            {todos.map(todo => {
              return (
                <TodoItem todo={todo} />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

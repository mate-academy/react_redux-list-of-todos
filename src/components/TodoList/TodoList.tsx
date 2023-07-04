/* eslint-disable max-len */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const filteredTodos = todos.filter((todo) => {
    const titleLower = todo.title.toLowerCase();
    const queryLower = query.toLowerCase();
    const todoStasus = status === 'all' ? true : todo.completed === (status === 'completed');

    return titleLower.includes(queryLower) && todoStasus;
  });

  const isTodosEmpty = filteredTodos.length === 0;

  return (
    <>
      {isTodosEmpty
        ? (
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
              {filteredTodos.map((todo) => (
                <TodoItem
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

import React, { Fragment } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Statuses } from '../../types/Status';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const newTodos = todos.filter(({ completed }) => {
    switch (status) {
      case Statuses.Active:
        return !completed;

      case Statuses.Completed:
        return completed;

      case Statuses.All:
        return true;

      default:
        return false;
    }
  }).filter((todo) => {
    if (!query) {
      return todo;
    }

    const lowerQuery = query.toLowerCase().trim();
    const lowerTitle = todo.title.toLowerCase();

    return lowerTitle.includes(lowerQuery);
  });

  return (
    <>
      {newTodos.length === 0 ? (
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
            {newTodos.map(todo => (
              <Fragment key={todo.id}>
                <TodoItem todo={todo} />
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

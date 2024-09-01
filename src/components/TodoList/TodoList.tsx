import React from 'react';
import { useAppSelector } from '../../hooks';
import { TodoItem } from '../TodoItem';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = todos.filter(todo => {
    let queryRes = true;

    if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
      queryRes = false;
    }

    const statusRes = (() => {
      switch (status) {
        case Status.completed:
          return todo.completed;
        case Status.active:
          return !todo.completed;
        case Status.all:
          return true;
        default:
          return false;
      }
    })();

    return queryRes && statusRes;
  });

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
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

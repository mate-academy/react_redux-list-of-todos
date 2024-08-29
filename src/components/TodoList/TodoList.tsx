import React from 'react';
import { useAppSelector } from '../../hooks';
import { TodoItem } from '../TodoItem';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = todos.filter(todo => {
    let queryRes = true;
    let statusRes = true;

    if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
      queryRes = false;
    }

    switch (true) {
      case status === Status.completed && todo.completed:
        statusRes = true;
        break;
      case status === Status.active && !todo.completed:
        statusRes = true;
        break;
      case status === Status.all:
        statusRes = true;
        break;
      default:
        statusRes = false;
    }

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
            {filteredTodos.map(todo => {
              return <TodoItem key={todo.id} todo={todo} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

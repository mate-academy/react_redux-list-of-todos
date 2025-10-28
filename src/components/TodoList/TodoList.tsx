import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { items: allTodos, error } = useAppSelector(state => state.todos);

  const filter = useAppSelector(state => state.filter);

  const filteredTodos = allTodos.filter(todo => {
    const statusMatch =
      filter.status === 'all' ||
      (filter.status === 'completed' && todo.completed) ||
      (filter.status === 'active' && !todo.completed);

    const queryMatch = todo.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    return statusMatch && queryMatch;
  });

  return (
    <>
      {error && <p className="notification is-warning">Data loading failure</p>}

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
    </>
  );
};

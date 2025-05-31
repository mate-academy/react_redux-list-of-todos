/* eslint-disable */
import React from 'react';
import { TodoItem } from '../TodoItem';
import { useAppSelector } from '../../app/hooks';

type Props = {
  query: string;
  status: string;
};

export const TodoList: React.FC<Props> = ({ query, status }) => {
  const todos = useAppSelector(state => state.todos);
  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    if (status === 'all') {
      return matchesQuery;
    }

    const isCompleted = status === 'completed';
    return matchesQuery && todo.completed === isCompleted;
  })

  return (
    <>
      {filteredTodos.length === 0 ? (<p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>) : (
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
            <TodoItem
              todo={todo}
              key={todo.id}
            />
          ))}
        </tbody>
      </table>
    )}
    </>
  );
};

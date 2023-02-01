import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);

  return todos.length ? (
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
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  ) : (
    <p className="notification is-warning">
      There are no todos matching current filter criteria
    </p>
  );
};

import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const displayedTodos = todos.filter(todo => {
    const queryFilter = todo.title
      .toLowerCase()
      .trim()
      .includes(query.toLowerCase().trim());
    let statusFilter: boolean;

    switch (status) {
      case 'all':
        statusFilter = true;
        break;

      case 'active':
        statusFilter = !todo.completed;
        break;

      case 'completed':
        statusFilter = todo.completed;
        break;
    }

    return queryFilter && statusFilter;
  });

  return !displayedTodos.length ? (
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
        {displayedTodos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
};

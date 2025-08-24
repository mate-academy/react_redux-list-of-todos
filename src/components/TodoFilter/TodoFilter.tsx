import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filterSlice';
import { Todo } from '../../types/Todo';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);
  const todos: Todo[] = useAppSelector(state => state.todos.items);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <div>
      <input
        data-cy="searchInput"
        value={query}
        onChange={e => dispatch(setQuery(e.target.value))}
      />
      {query && (
        <button
          className="delete"
          data-cy="clearSearchButton"
          onClick={() => dispatch(setQuery(''))}
        />
      )}

      <select
        data-cy="statusSelect"
        value={status}
        onChange={e =>
          dispatch(setStatus(e.target.value as 'all' | 'active' | 'completed'))
        }
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <ul data-cy="filtered-todos">
        {filteredTodos.map(todo => (
          <li key={todo.id} data-cy="filtered-todo">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

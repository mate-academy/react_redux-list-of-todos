import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { actions as todosActions } from '../../features/todos';
import { Status } from '../../types/Status';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(allTodos => setTodos(allTodos));
  }, []);

  const filteredTodos = (newFilter: string, newQuery: string) => {
    return todos.filter(todo => {
      const lowerQuery = newQuery.toLowerCase();
      const hasTitle = todo.title.toLowerCase().includes(lowerQuery);

      if (!hasTitle) {
        return false;
      }

      switch (newFilter) {
        case 'all':
          return true;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          throw new Error('wrong filter selected');
      }
    });
  };

  const handleReset = () => {
    dispatch(filterActions.setQuery(''));
    dispatch(todosActions.setTodos(filteredTodos(filter.status, '')));
  };

  const handleSelectedFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value as Status;

    dispatch(filterActions.setStatus(newFilter));
    dispatch(todosActions.setTodos(filteredTodos(newFilter, filter.query)));
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = String(event.target.value);

    dispatch(filterActions.setQuery(newQuery));
    dispatch(todosActions.setTodos(filteredTodos(filter.status, newQuery)));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={handleSelectedFilter}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={(event) => handleFilter(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleReset()}
            />
          </span>
        )}
      </p>
    </form>
  );
};

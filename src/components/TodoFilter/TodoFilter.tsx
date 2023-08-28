import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const dispatch = useAppDispatch();

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(filterActions.filterTodos(debouncedQuery, status));
    }, 700);

    return () => {
      clearTimeout(delay);
    };
  }, [debouncedQuery, status, dispatch]);

  const handleQuery = (newQuery: string) => {
    setDebouncedQuery(newQuery);
  };

  const handleSelectStatus = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(filterActions.filterTodos(debouncedQuery, event.target.value));
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
            onChange={handleSelectStatus}
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
          value={debouncedQuery}
          onChange={(event) => handleQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};

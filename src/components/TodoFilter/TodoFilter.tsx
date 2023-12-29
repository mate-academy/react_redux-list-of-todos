import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as filtersActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [status, setStatus] = useState<string>(Status.ALL);
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setStatus(event.target.value);
    dispatch(filtersActions.setStatus(event.target.value));
  };

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
    dispatch(filtersActions.setQuery(event.target.value));
  };

  const handleClear = () => {
    setQuery('');
    dispatch(filtersActions.setQuery(''));
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
            value={status}
            onChange={handleStatusChange}
          >
            <option
              value={Status.ALL}
            >
              All
            </option>

            <option
              value={Status.ACTIVE}
            >
              Active
            </option>

            <option
              value={Status.COMPLETED}
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear-search"
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};

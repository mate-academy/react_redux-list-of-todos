import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterAction } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const setQuery = (query: string) => dispatch(filterAction.setQuery(query));
  const setStatus = (status: Status) =>
    dispatch(filterAction.setStatus(status));
  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSetStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Status);
  };

  const handleClear = () => {
    setQuery('');
  };

  const statuses = ['All', 'Active', 'Completed'];

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSetStatus}
            value={filter.status}
          >
            {statuses.map(status => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
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
          onChange={handleSetQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filter.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};

import React, { useCallback } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { actions: filterActions } = filterSlice;
  const { query, status } = useAppSelector(state => state.filter);

  const setFilter = useCallback(
    (newStatus: Status) => dispatch(filterActions.setStatus(newStatus)),
    [dispatch, filterActions],
  );

  const setQuery = useCallback(
    (newQuery: string) => dispatch(filterActions.setQuery(newQuery)),
    [dispatch, filterActions],
  );

  const capitalizeStr = useCallback(
    (str: string) => `${str.charAt(0).toUpperCase()}${str.substring(1)}`,
    [],
  );

  const statusOptions: Status[] = ['all', 'active', 'completed'];

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
            onChange={e => setFilter(e.target.value as Status)}
          >
            {statusOptions.map(option => (
              <option value={option} key={option}>
                {capitalizeStr(option)}
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
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};

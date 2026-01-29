import React, { useCallback } from 'react';
import { store, useAppSelector } from '../../app/store';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filters.query);

  const handleStatusChange = useCallback((newStatus: Status) => {
    store.dispatch(filterActions.updateStatus(newStatus));
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    store.dispatch(filterActions.updateQuery(newQuery.toLowerCase()));
  }, []);

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              handleStatusChange(e.currentTarget.value as Status);
            }}
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
          value={query}
          onChange={e => {
            handleQueryChange(e.currentTarget.value);
          }}
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
              onClick={() => handleQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};

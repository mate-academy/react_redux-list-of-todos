/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const setFilter = (newStatus: string) => dispatch(filterActions.setStatus(newStatus));
  const setQuery = (newQuery: string) => dispatch(filterActions.setQuery(newQuery));

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
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={(event) => setQuery(event.target.value)}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};

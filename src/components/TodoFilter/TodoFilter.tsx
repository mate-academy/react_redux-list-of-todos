import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Status } from '../../types/Status';
import { actions as actionsFilter } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const setFilter = useCallback(
    (filterStatus: Status) => dispatch(actionsFilter.setStatus(filterStatus)),
    [dispatch],
  );

  const setQuery = useCallback(
    (filterQuery: string) => dispatch(actionsFilter.setQuery(filterQuery)),
    [dispatch],
  );

  return (
    <form
      className="field has-addons"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            value={filter.status}
            onChange={event => setFilter(event.target.value as Status)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={filter.query}
          onChange={event => setQuery(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filter.query && (
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

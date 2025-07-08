import React from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  filterByStatus,
  setSearchQuery,
  clearSearchQuery,
} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterByStatus(event.target.value as Status));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleQueryClear = () => {
    dispatch(clearSearchQuery());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          onChange={handleQueryChange}
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
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};

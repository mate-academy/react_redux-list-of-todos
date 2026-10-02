import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setQuery,
  setStatus,
  clearFilter,
  FilterStatus,
} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  return (
    <form className="field is-grouped">
      <div className="control has-icons-left">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => dispatch(setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>
      </div>

      {query && (
        <div className="control">
          <button
            data-cy="clearSearchButton"
            className="button is-small is-danger is-light"
            type="button"
            onClick={() => dispatch(clearFilter())}
          >
            <span className="icon">
              <i className="fas fa-times" />
            </span>
          </button>
        </div>
      )}

      <div className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => dispatch(setStatus(e.target.value as FilterStatus))}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </form>
  );
};
